import * as fs from 'fs';
import * as path from 'path';
import { ActionsSecret } from '@cdktf/provider-github/lib/actions-secret';
import { GithubProvider } from '@cdktf/provider-github/lib/provider';
import { Testing, App, TerraformStack } from 'cdktf';
import { Job } from '../src/github-actions/job';
import { Workflow } from '../src/github-actions/workflow';
import 'cdktf/lib/testing/adapters/jest';

Testing.setupJest();

describe('Workflow generation ', () => {
  const CDKTF_OUT = 'test/tmp/cdktf.out';
  let app: App;
  let stack: TerraformStack;
  let synthedOutputJSON: string;

  let testIter = 0;
  beforeAll(() => {
    // make CDKTF out dir
    var dirname = path.dirname(CDKTF_OUT);
    if (!fs.existsSync(CDKTF_OUT)) {
      fs.mkdirSync(dirname, { recursive: true });
    }
    app = Testing.app({
      outdir: CDKTF_OUT,
    });
  });

  beforeEach(() => {
    testIter++;
    stack = new TerraformStack(app, `test${testIter}`);
  });

  test('Standard creation', () => {
    const workflowPath = 'test/tmp/.github/workflows/manual.yml';
    let echoJob = new Job(stack, 'build-job', {
      steps: [
        {
          name: 'echo',
          run: 'echo "Hello World"',
        },
      ],
    });

    const wf = new Workflow(stack, 'workflow', {
      repoName: 'test',
      workflowPath: workflowPath,
      jobs: [echoJob],
    });

    expect(wf).toBeDefined();

    app.synth();
    expect(fs.existsSync(workflowPath)).toBe(true);
  });

  test('Job with dependent job', () => {
    let workflowPath = 'test/tmp/.github/workflows/builder.yml';
    let echoJob = new Job(stack, 'build-job', {
      steps: [
        {
          name: 'echo hello',
          run: 'echo "Hello"',
        },
      ],
    });

    let echoJob2 = new Job(stack, 'build-job2', {
      steps: [
        {
          name: 'echo world',
          run: 'echo "World"',
        },
      ],
      dependsOn: [echoJob],
    });

    const wf = new Workflow(stack, 'workflow', {
      repoName: 'test',
      workflowPath: workflowPath,
      jobs: [echoJob, echoJob2],
    });

    expect(wf).toBeDefined();

    app.synth();
    expect(fs.existsSync(workflowPath)).toBe(true);
  });

  test('With defined secrets', () => {
    new GithubProvider(stack, 'github', {
      token: '123',
    });

    let echoJob = new Job(stack, 'build-job', {
      steps: [
        {
          name: 'echo hello',
          run: 'echo "Hello"',
          withSecrets: [
            {
              referencedName: 'token',
              secretName: 'PROJEN_GITHUB_TOKEN',
              secretValue: '123',
            },
          ],
        },
      ],
    });

    let workflowPath = 'test/tmp/.github/workflows/builder-with-secret.yml';
    const wf = new Workflow(stack, 'workflow', {
      repoName: 'test',
      workflowPath: workflowPath,
      jobs: [echoJob],
    });

    expect(wf).toBeDefined();

    // validate synth resources
    app.synth();
    synthedOutputJSON = Testing.synth(stack);
    expect(Testing.toHaveProvider(synthedOutputJSON, 'github')).toBeTruthy();
    expect(synthedOutputJSON).toHaveResource(ActionsSecret);
    expect(synthedOutputJSON).toHaveResourceWithProperties(ActionsSecret, {
      repository: 'test',
      secret_name: 'PROJEN_GITHUB_TOKEN',
      plaintext_value: '123',
    });

    // validate file exists
    expect(fs.existsSync(workflowPath)).toBe(true);
    // later think of a way to validate the file contents
  });

  test('Dependent job not referenced', () => {
    let echoJob = new Job(stack, 'job', {
      steps: [
        {
          name: 'echo hello',
          run: 'echo "Hello"',
        },
      ],
    });

    let echoJob2 = new Job(stack, 'job2', {
      steps: [
        {
          name: 'echo world',
          run: 'echo "World"',
        },
      ],
      dependsOn: [echoJob],
    });

    new Workflow(stack, 'workflow', {
      repoName: 'test',
      workflowPath: 'test/tmp/.github/workflows/builder.yml',
      jobs: [echoJob2],
    });

    expect(() => {
      app.synth();
    }).toThrowError(
      `Job \'${echoJob2.id}\' needs job \'${echoJob.id}\', but \'${echoJob.id}\' is not defined`,
    );

  });


  afterAll(() => {
    fs.rmSync('test/tmp', { recursive: true, force: true });
  });
});
