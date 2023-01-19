import * as fs from 'fs';
import * as path from 'path';
import { ActionsSecret } from '@cdktf/provider-github/lib/actions-secret';
import { Construct } from 'constructs';
import { Job } from './job';
import { JobData } from './job-data';
import { WorkflowTriggers } from './triggers';
import { YamlFile } from '../file/yaml-file';
import { SnakeCaseKeys } from '../private/snakecase';

export interface WorkflowProps {
  readonly repoName: string;
  /**
   * File path where the workflow should be synthesized.
   *
   * @default ".github/workflows/deploy.yml"
   */
  readonly workflowPath?: string;

  /**
   * Name of the workflow file.
   *
   * @default "deploy"
   */
  readonly workflowName?: string;

  /**
   * GitHub workflow triggers.
   *
   * @default - By default, workflow is triggered on push to the `main` branch
   * and can also be triggered manually (`workflow_dispatch`).
   */
  readonly workflowTriggers?: WorkflowTriggers;

  readonly jobs?: Job[];
}

export class Workflow extends Construct {
  readonly repoName: string;
  readonly workflowPath: string;
  readonly workflowFile: YamlFile;
  readonly workflowName: string;
  readonly workflowTriggers: WorkflowTriggers;
  readonly jobs: Job[] = [];
  constructor(scope: Construct, id: string, props: WorkflowProps) {
    super(scope, id);
    this.node.addValidation({
      validate: () => {
        if (this.jobs.length === 0) {
          return [
            'No jobs were added to the workflow. At least one job is required.',
          ];
        }
        this.buildWorkflow();
        return [];
      },
    });

    this.repoName = props.repoName;

    this.workflowPath = props.workflowPath ?? '.github/workflows/deploy.yml';
    if (!this.workflowPath.endsWith('.yml') && !this.workflowPath.endsWith('.yaml')) {
      throw new Error('workflow file is expected to be a yaml file');
    }
    if (!this.workflowPath.includes('.github/workflows/')) {
      throw new Error('workflow files must be stored in the \'.github/workflows\' directory of your repository');
    }

    this.workflowFile = new YamlFile(this.workflowPath);
    this.workflowName = props.workflowName ?? 'deploy';
    this.workflowTriggers = props.workflowTriggers ?? {
      push: { branches: ['main'] },
      workflowDispatch: {},
    };

    if (props.jobs) {
      for (const job of props.jobs) {
        this.addJob(job);
      }
    }
  }

  addJob(job: Job) {
    this.jobs.push(job);
    if (job.secrets.length != 0) {
      for (const secret of job.secrets) {
        this.createSecret(secret.secretName, secret.secretValue);
      }
    }
  }

  private createSecret(name: string, value: string) {
    new ActionsSecret(this, `${name}-secret`, {
      repository: this.repoName,
      secretName: name,
      plaintextValue: value,
    });
  }

  private validateJobs() {
    const jobIds = this.jobs.map((job) => job.id);
    const duplicateJobIds = jobIds.filter((id, index) => jobIds.indexOf(id) !== index);
    if (duplicateJobIds.length > 0) {
      throw new Error(`Duplicate job ids found: ${duplicateJobIds.join(', ')}`);
    }

    const jobNames: string[] = this.jobs
      .map( (job) => job.name)
      .filter((name) => name !== undefined) as string[];
    const duplicateJobNames = jobNames.filter((name, index) => jobNames.indexOf(name) !== index);
    if (duplicateJobNames.length > 0) {
      throw new Error(`Duplicate job names found: ${duplicateJobNames.join(', ')}`);
    }

    for (const job of this.jobs) {
      if (job.dependsOn.length > 0) {
        for (const need of job.dependsOn) {
          if (!jobIds.includes(need)) {
            throw new Error(`Job '${job.id}' needs job '${need}', but '${need}' is not defined`);
          }
        }
      }
    }
  }

  private jobsToRecords() {
    const j: Record<string, JobData> = {};
    this.jobs.forEach((job) => {
      j[job.id] = job.toObject();
    });
    return j;
  }

  private buildWorkflow() {
    var dirname = path.dirname(this.workflowPath);
    if (!fs.existsSync(this.workflowPath)) {
      fs.mkdirSync(dirname, { recursive: true });
    }

    this.validateJobs();

    const file = new YamlFile(this.workflowPath);

    file.update({
      name: this.workflowName,
      on: SnakeCaseKeys(this.workflowTriggers, '_'),
      jobs: this.jobsToRecords(),
    });

    file.writeFile();
  }
}