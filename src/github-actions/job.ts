import { Construct } from 'constructs';
import { JobData, ContainerOptions, JobDefaults, JobPermission, JobPermissions, JobStepData, JobStrategy } from './job-data';

export interface SecretsOptions {
  readonly referencedName: string;
  readonly secretName: string;
  readonly secretValue: string;
}

export interface JobStep extends JobStepData {
  readonly withSecrets?: SecretsOptions[];
}

export interface JobProps {
  readonly jobRefereneName?: string;
  readonly steps: JobStep[];
  readonly runsOn?: string | string[];
  readonly name?: string;
  readonly dependsOn?: Job[];
  readonly permissions?: JobPermissions;
  readonly environment?: unknown;
  readonly concurrency?: unknown;
  readonly strategy?: JobStrategy;
  readonly outputs?: Record<string, string>;
  readonly env?: Record<string, string>;
  readonly defaults?: JobDefaults;
  readonly runIf?: string;
  readonly timeoutMinutes?: number;
  readonly continueOnError?: boolean;
  readonly container?: ContainerOptions;
  readonly services?: Record<string, ContainerOptions>;
}

export class Job extends Construct {
  readonly id: string;
  readonly steps: JobStep[];
  readonly runsOn: string | string[] = 'ubuntu-latest';
  readonly dependsOn: string[] = [];
  readonly permissions: JobPermissions = { contents: JobPermission.WRITE };
  readonly timeoutMinutes: number = 3600;
  readonly name?: string;
  readonly environment?: unknown;
  readonly concurrency?: unknown;
  readonly strategy?: JobStrategy;
  readonly outputs?: Record<string, string>;
  readonly env?: Record<string, string>;
  readonly defaults?: JobDefaults;
  readonly runIf?: string;
  readonly continueOnError?: boolean;
  readonly container?: ContainerOptions;
  readonly services?: Record<string, ContainerOptions>;
  readonly secrets: SecretsOptions[] = [];
  constructor(scope: Construct, id: string, props: JobProps) {
    super(scope, id);

    if (props.jobRefereneName) {
      this.id = props.jobRefereneName;
    } else {
      this.id = id;
    }

    if (props.steps.length === 0) {
      throw new Error('Job must have at least one step');
    }
    for (const step of props.steps) {
      if (step.withSecrets) {
        this.secrets.push(...step.withSecrets);
      }
    }
    this.steps = props.steps;

    if (props.runsOn) {
      this.runsOn = props.runsOn;
    }

    if (props.dependsOn) {
      for (const job of props.dependsOn) {
        this.dependsOn.push(job.id);
      }
    }

    if (props.permissions) {
      this.permissions = props.permissions;
    }

    if (props.timeoutMinutes) {
      this.timeoutMinutes = props.timeoutMinutes;
    }

    if (props.name) {
      this.name = props.name;
    }

    if (props.environment) {
      this.environment = props.environment;
    }

    if (props.concurrency) {
      this.concurrency = props.concurrency;
    }

    if (props.strategy) {
      this.strategy = props.strategy;
    }

    if (props.outputs) {
      this.outputs = props.outputs;
    }

    if (props.env) {
      this.env = props.env;
    }

    if (props.defaults) {
      this.defaults = props.defaults;
    }

    if (props.runIf) {
      this.runIf = props.runIf;
    }

    if (props.continueOnError) {
      this.continueOnError = props.continueOnError;
    }

    if (props.container) {
      this.container = props.container;
    }

    if (props.services) {
      this.services = props.services;
    }
  }

  addDependency(job: Job) {
    this.dependsOn.push(job.id);
  }

  toObject(): JobData {
    return {
      runsOn: this.runsOn,
      steps: this.steps,
      name: this.name,
      needs: this.dependsOn,
      permissions: this.permissions,
      environment: this.environment,
      concurrency: this.concurrency,
      outputs: this.outputs,
      env: this.env,
      defaults: this.defaults,
      if: this.runIf,
      timeoutMinutes: this.timeoutMinutes,
      strategy: this.strategy,
      continueOnError: this.continueOnError,
      container: this.container,
      services: this.services,
    };
  }
}