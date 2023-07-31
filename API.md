# cdktf-github-actions

This is a library to help define GitHub Actions workflows using CDKTF. This package vends constructs for defining a workflow that will be synthesized to a workflow yaml file in your repos `.github/workflows` directory.

## Development

This project is in early development. The constructs are likely to change as the needs of the project evolve.

A few items I'm currently working towards:

- [ ] More github resource synthesis
- [ ] Higher test coverage
- [ ] More indepth documentation

## Usage

### Example

```ts
import { Construct } from 'constructs';
import { App, TerraformStack } from 'cdktf';
import { Workflow, Job } from 'cdktf-github-actions';

const app = new App();

class MyWorkflowStack executes TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    let echoJob = new Job(this, 'build-job', {
      steps: [
        {
          name: 'echo',
          run: 'echo "Hello World"',
        },
      ],
    });

    const wf = new Workflow(this, 'workflow', {
      repoName: 'my-repo',
      jobs: [echoJob],
    });
  }
}

const stack = new MyWorkflowStack(app, 'test');
app.synth();
```

The constructs support the ability to define github resources and create them using the github terrafrom provider. The following example shows how to create a create a workflow with secrets that will be stored in the repository.

```ts
import { Construct } from 'constructs';
import { App, TerraformStack } from 'cdktf';
import { Workflow, Job } from 'cdktf-github-actions';

const app = new App();

class MyWorkflowStack executes TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    let echoJob = new Job(this, 'build-job', {
      steps: [
        {
          name: 'echo',
          run: 'echo "Hello World"',
          withSecrets: [
            {
              referencedName: 'token',
              secretName: 'MY_SECRET',
              secretValue: '123',
            },
          ],
        },
      ],
    });

    const wf = new Workflow(this, 'workflow', {
      repoName: 'my-repo',
      jobs: [echoJob],
    });
  }
}

const stack = new MyWorkflowStack(app, 'test');
app.synth();
```

The example above will create a secret with the name `MY_SECRET` and the value `123` in the repository. The secret will be referenced in the workflow using the name `token`.
# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### Job <a name="Job" id="@awlsring/cdktf-github-actions.Job"></a>

#### Initializers <a name="Initializers" id="@awlsring/cdktf-github-actions.Job.Initializer"></a>

```typescript
import { Job } from '@awlsring/cdktf-github-actions'

new Job(scope: Construct, id: string, props: JobProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@awlsring/cdktf-github-actions.Job.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@awlsring/cdktf-github-actions.Job.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@awlsring/cdktf-github-actions.Job.Initializer.parameter.props">props</a></code> | <code><a href="#@awlsring/cdktf-github-actions.JobProps">JobProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@awlsring/cdktf-github-actions.Job.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@awlsring/cdktf-github-actions.Job.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@awlsring/cdktf-github-actions.Job.Initializer.parameter.props"></a>

- *Type:* <a href="#@awlsring/cdktf-github-actions.JobProps">JobProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@awlsring/cdktf-github-actions.Job.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@awlsring/cdktf-github-actions.Job.addDependency">addDependency</a></code> | *No description.* |
| <code><a href="#@awlsring/cdktf-github-actions.Job.toObject">toObject</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="@awlsring/cdktf-github-actions.Job.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addDependency` <a name="addDependency" id="@awlsring/cdktf-github-actions.Job.addDependency"></a>

```typescript
public addDependency(job: Job): void
```

###### `job`<sup>Required</sup> <a name="job" id="@awlsring/cdktf-github-actions.Job.addDependency.parameter.job"></a>

- *Type:* <a href="#@awlsring/cdktf-github-actions.Job">Job</a>

---

##### `toObject` <a name="toObject" id="@awlsring/cdktf-github-actions.Job.toObject"></a>

```typescript
public toObject(): JobData
```

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@awlsring/cdktf-github-actions.Job.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@awlsring/cdktf-github-actions.Job.isConstruct"></a>

```typescript
import { Job } from '@awlsring/cdktf-github-actions'

Job.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@awlsring/cdktf-github-actions.Job.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@awlsring/cdktf-github-actions.Job.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@awlsring/cdktf-github-actions.Job.property.dependsOn">dependsOn</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#@awlsring/cdktf-github-actions.Job.property.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@awlsring/cdktf-github-actions.Job.property.permissions">permissions</a></code> | <code><a href="#@awlsring/cdktf-github-actions.JobPermissions">JobPermissions</a></code> | *No description.* |
| <code><a href="#@awlsring/cdktf-github-actions.Job.property.runsOn">runsOn</a></code> | <code>string \| string[]</code> | *No description.* |
| <code><a href="#@awlsring/cdktf-github-actions.Job.property.secrets">secrets</a></code> | <code><a href="#@awlsring/cdktf-github-actions.SecretsOptions">SecretsOptions</a>[]</code> | *No description.* |
| <code><a href="#@awlsring/cdktf-github-actions.Job.property.steps">steps</a></code> | <code><a href="#@awlsring/cdktf-github-actions.JobStep">JobStep</a>[]</code> | *No description.* |
| <code><a href="#@awlsring/cdktf-github-actions.Job.property.timeoutMinutes">timeoutMinutes</a></code> | <code>number</code> | *No description.* |
| <code><a href="#@awlsring/cdktf-github-actions.Job.property.concurrency">concurrency</a></code> | <code>any</code> | *No description.* |
| <code><a href="#@awlsring/cdktf-github-actions.Job.property.container">container</a></code> | <code><a href="#@awlsring/cdktf-github-actions.ContainerOptions">ContainerOptions</a></code> | *No description.* |
| <code><a href="#@awlsring/cdktf-github-actions.Job.property.continueOnError">continueOnError</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#@awlsring/cdktf-github-actions.Job.property.defaults">defaults</a></code> | <code><a href="#@awlsring/cdktf-github-actions.JobDefaults">JobDefaults</a></code> | *No description.* |
| <code><a href="#@awlsring/cdktf-github-actions.Job.property.env">env</a></code> | <code>{[ key: string ]: string}</code> | *No description.* |
| <code><a href="#@awlsring/cdktf-github-actions.Job.property.environment">environment</a></code> | <code>any</code> | *No description.* |
| <code><a href="#@awlsring/cdktf-github-actions.Job.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@awlsring/cdktf-github-actions.Job.property.outputs">outputs</a></code> | <code>{[ key: string ]: string}</code> | *No description.* |
| <code><a href="#@awlsring/cdktf-github-actions.Job.property.runIf">runIf</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@awlsring/cdktf-github-actions.Job.property.services">services</a></code> | <code>{[ key: string ]: <a href="#@awlsring/cdktf-github-actions.ContainerOptions">ContainerOptions</a>}</code> | *No description.* |
| <code><a href="#@awlsring/cdktf-github-actions.Job.property.strategy">strategy</a></code> | <code><a href="#@awlsring/cdktf-github-actions.JobStrategy">JobStrategy</a></code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@awlsring/cdktf-github-actions.Job.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `dependsOn`<sup>Required</sup> <a name="dependsOn" id="@awlsring/cdktf-github-actions.Job.property.dependsOn"></a>

```typescript
public readonly dependsOn: string[];
```

- *Type:* string[]

---

##### `id`<sup>Required</sup> <a name="id" id="@awlsring/cdktf-github-actions.Job.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

---

##### `permissions`<sup>Required</sup> <a name="permissions" id="@awlsring/cdktf-github-actions.Job.property.permissions"></a>

```typescript
public readonly permissions: JobPermissions;
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.JobPermissions">JobPermissions</a>

---

##### `runsOn`<sup>Required</sup> <a name="runsOn" id="@awlsring/cdktf-github-actions.Job.property.runsOn"></a>

```typescript
public readonly runsOn: string | string[];
```

- *Type:* string | string[]

---

##### `secrets`<sup>Required</sup> <a name="secrets" id="@awlsring/cdktf-github-actions.Job.property.secrets"></a>

```typescript
public readonly secrets: SecretsOptions[];
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.SecretsOptions">SecretsOptions</a>[]

---

##### `steps`<sup>Required</sup> <a name="steps" id="@awlsring/cdktf-github-actions.Job.property.steps"></a>

```typescript
public readonly steps: JobStep[];
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.JobStep">JobStep</a>[]

---

##### `timeoutMinutes`<sup>Required</sup> <a name="timeoutMinutes" id="@awlsring/cdktf-github-actions.Job.property.timeoutMinutes"></a>

```typescript
public readonly timeoutMinutes: number;
```

- *Type:* number

---

##### `concurrency`<sup>Optional</sup> <a name="concurrency" id="@awlsring/cdktf-github-actions.Job.property.concurrency"></a>

```typescript
public readonly concurrency: any;
```

- *Type:* any

---

##### `container`<sup>Optional</sup> <a name="container" id="@awlsring/cdktf-github-actions.Job.property.container"></a>

```typescript
public readonly container: ContainerOptions;
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.ContainerOptions">ContainerOptions</a>

---

##### `continueOnError`<sup>Optional</sup> <a name="continueOnError" id="@awlsring/cdktf-github-actions.Job.property.continueOnError"></a>

```typescript
public readonly continueOnError: boolean;
```

- *Type:* boolean

---

##### `defaults`<sup>Optional</sup> <a name="defaults" id="@awlsring/cdktf-github-actions.Job.property.defaults"></a>

```typescript
public readonly defaults: JobDefaults;
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.JobDefaults">JobDefaults</a>

---

##### `env`<sup>Optional</sup> <a name="env" id="@awlsring/cdktf-github-actions.Job.property.env"></a>

```typescript
public readonly env: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

---

##### `environment`<sup>Optional</sup> <a name="environment" id="@awlsring/cdktf-github-actions.Job.property.environment"></a>

```typescript
public readonly environment: any;
```

- *Type:* any

---

##### `name`<sup>Optional</sup> <a name="name" id="@awlsring/cdktf-github-actions.Job.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `outputs`<sup>Optional</sup> <a name="outputs" id="@awlsring/cdktf-github-actions.Job.property.outputs"></a>

```typescript
public readonly outputs: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

---

##### `runIf`<sup>Optional</sup> <a name="runIf" id="@awlsring/cdktf-github-actions.Job.property.runIf"></a>

```typescript
public readonly runIf: string;
```

- *Type:* string

---

##### `services`<sup>Optional</sup> <a name="services" id="@awlsring/cdktf-github-actions.Job.property.services"></a>

```typescript
public readonly services: {[ key: string ]: ContainerOptions};
```

- *Type:* {[ key: string ]: <a href="#@awlsring/cdktf-github-actions.ContainerOptions">ContainerOptions</a>}

---

##### `strategy`<sup>Optional</sup> <a name="strategy" id="@awlsring/cdktf-github-actions.Job.property.strategy"></a>

```typescript
public readonly strategy: JobStrategy;
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.JobStrategy">JobStrategy</a>

---


### Workflow <a name="Workflow" id="@awlsring/cdktf-github-actions.Workflow"></a>

#### Initializers <a name="Initializers" id="@awlsring/cdktf-github-actions.Workflow.Initializer"></a>

```typescript
import { Workflow } from '@awlsring/cdktf-github-actions'

new Workflow(scope: Construct, id: string, props: WorkflowProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@awlsring/cdktf-github-actions.Workflow.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@awlsring/cdktf-github-actions.Workflow.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@awlsring/cdktf-github-actions.Workflow.Initializer.parameter.props">props</a></code> | <code><a href="#@awlsring/cdktf-github-actions.WorkflowProps">WorkflowProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@awlsring/cdktf-github-actions.Workflow.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@awlsring/cdktf-github-actions.Workflow.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@awlsring/cdktf-github-actions.Workflow.Initializer.parameter.props"></a>

- *Type:* <a href="#@awlsring/cdktf-github-actions.WorkflowProps">WorkflowProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@awlsring/cdktf-github-actions.Workflow.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@awlsring/cdktf-github-actions.Workflow.addJob">addJob</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="@awlsring/cdktf-github-actions.Workflow.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addJob` <a name="addJob" id="@awlsring/cdktf-github-actions.Workflow.addJob"></a>

```typescript
public addJob(job: Job): void
```

###### `job`<sup>Required</sup> <a name="job" id="@awlsring/cdktf-github-actions.Workflow.addJob.parameter.job"></a>

- *Type:* <a href="#@awlsring/cdktf-github-actions.Job">Job</a>

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@awlsring/cdktf-github-actions.Workflow.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@awlsring/cdktf-github-actions.Workflow.isConstruct"></a>

```typescript
import { Workflow } from '@awlsring/cdktf-github-actions'

Workflow.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@awlsring/cdktf-github-actions.Workflow.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@awlsring/cdktf-github-actions.Workflow.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@awlsring/cdktf-github-actions.Workflow.property.jobs">jobs</a></code> | <code><a href="#@awlsring/cdktf-github-actions.Job">Job</a>[]</code> | *No description.* |
| <code><a href="#@awlsring/cdktf-github-actions.Workflow.property.repoName">repoName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@awlsring/cdktf-github-actions.Workflow.property.workflowFile">workflowFile</a></code> | <code><a href="#@awlsring/cdktf-github-actions.YamlFile">YamlFile</a></code> | *No description.* |
| <code><a href="#@awlsring/cdktf-github-actions.Workflow.property.workflowName">workflowName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@awlsring/cdktf-github-actions.Workflow.property.workflowPath">workflowPath</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@awlsring/cdktf-github-actions.Workflow.property.workflowTriggers">workflowTriggers</a></code> | <code><a href="#@awlsring/cdktf-github-actions.WorkflowTriggers">WorkflowTriggers</a></code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@awlsring/cdktf-github-actions.Workflow.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `jobs`<sup>Required</sup> <a name="jobs" id="@awlsring/cdktf-github-actions.Workflow.property.jobs"></a>

```typescript
public readonly jobs: Job[];
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.Job">Job</a>[]

---

##### `repoName`<sup>Required</sup> <a name="repoName" id="@awlsring/cdktf-github-actions.Workflow.property.repoName"></a>

```typescript
public readonly repoName: string;
```

- *Type:* string

---

##### `workflowFile`<sup>Required</sup> <a name="workflowFile" id="@awlsring/cdktf-github-actions.Workflow.property.workflowFile"></a>

```typescript
public readonly workflowFile: YamlFile;
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.YamlFile">YamlFile</a>

---

##### `workflowName`<sup>Required</sup> <a name="workflowName" id="@awlsring/cdktf-github-actions.Workflow.property.workflowName"></a>

```typescript
public readonly workflowName: string;
```

- *Type:* string

---

##### `workflowPath`<sup>Required</sup> <a name="workflowPath" id="@awlsring/cdktf-github-actions.Workflow.property.workflowPath"></a>

```typescript
public readonly workflowPath: string;
```

- *Type:* string

---

##### `workflowTriggers`<sup>Required</sup> <a name="workflowTriggers" id="@awlsring/cdktf-github-actions.Workflow.property.workflowTriggers"></a>

```typescript
public readonly workflowTriggers: WorkflowTriggers;
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.WorkflowTriggers">WorkflowTriggers</a>

---


## Structs <a name="Structs" id="Structs"></a>

### CheckRunOptions <a name="CheckRunOptions" id="@awlsring/cdktf-github-actions.CheckRunOptions"></a>

Check run options.

#### Initializer <a name="Initializer" id="@awlsring/cdktf-github-actions.CheckRunOptions.Initializer"></a>

```typescript
import { CheckRunOptions } from '@awlsring/cdktf-github-actions'

const checkRunOptions: CheckRunOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@awlsring/cdktf-github-actions.CheckRunOptions.property.types">types</a></code> | <code>string[]</code> | Which activity types to trigger on. |

---

##### `types`<sup>Optional</sup> <a name="types" id="@awlsring/cdktf-github-actions.CheckRunOptions.property.types"></a>

```typescript
public readonly types: string[];
```

- *Type:* string[]

Which activity types to trigger on.

---

### CheckSuiteOptions <a name="CheckSuiteOptions" id="@awlsring/cdktf-github-actions.CheckSuiteOptions"></a>

Check suite options.

#### Initializer <a name="Initializer" id="@awlsring/cdktf-github-actions.CheckSuiteOptions.Initializer"></a>

```typescript
import { CheckSuiteOptions } from '@awlsring/cdktf-github-actions'

const checkSuiteOptions: CheckSuiteOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@awlsring/cdktf-github-actions.CheckSuiteOptions.property.types">types</a></code> | <code>string[]</code> | Which activity types to trigger on. |

---

##### `types`<sup>Optional</sup> <a name="types" id="@awlsring/cdktf-github-actions.CheckSuiteOptions.property.types"></a>

```typescript
public readonly types: string[];
```

- *Type:* string[]

Which activity types to trigger on.

---

### ContainerCredentials <a name="ContainerCredentials" id="@awlsring/cdktf-github-actions.ContainerCredentials"></a>

Credentials to use to authenticate to Docker registries.

#### Initializer <a name="Initializer" id="@awlsring/cdktf-github-actions.ContainerCredentials.Initializer"></a>

```typescript
import { ContainerCredentials } from '@awlsring/cdktf-github-actions'

const containerCredentials: ContainerCredentials = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@awlsring/cdktf-github-actions.ContainerCredentials.property.password">password</a></code> | <code>string</code> | The password. |
| <code><a href="#@awlsring/cdktf-github-actions.ContainerCredentials.property.username">username</a></code> | <code>string</code> | The username. |

---

##### `password`<sup>Required</sup> <a name="password" id="@awlsring/cdktf-github-actions.ContainerCredentials.property.password"></a>

```typescript
public readonly password: string;
```

- *Type:* string

The password.

---

##### `username`<sup>Required</sup> <a name="username" id="@awlsring/cdktf-github-actions.ContainerCredentials.property.username"></a>

```typescript
public readonly username: string;
```

- *Type:* string

The username.

---

### ContainerOptions <a name="ContainerOptions" id="@awlsring/cdktf-github-actions.ContainerOptions"></a>

Options petaining to container environments.

#### Initializer <a name="Initializer" id="@awlsring/cdktf-github-actions.ContainerOptions.Initializer"></a>

```typescript
import { ContainerOptions } from '@awlsring/cdktf-github-actions'

const containerOptions: ContainerOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@awlsring/cdktf-github-actions.ContainerOptions.property.image">image</a></code> | <code>string</code> | The Docker image to use as the container to run the action. |
| <code><a href="#@awlsring/cdktf-github-actions.ContainerOptions.property.credentials">credentials</a></code> | <code><a href="#@awlsring/cdktf-github-actions.ContainerCredentials">ContainerCredentials</a></code> | f the image's container registry requires authentication to pull the image, you can use credentials to set a map of the username and password. |
| <code><a href="#@awlsring/cdktf-github-actions.ContainerOptions.property.env">env</a></code> | <code>{[ key: string ]: string}</code> | Sets a map of environment variables in the container. |
| <code><a href="#@awlsring/cdktf-github-actions.ContainerOptions.property.options">options</a></code> | <code>string[]</code> | Additional Docker container resource options. |
| <code><a href="#@awlsring/cdktf-github-actions.ContainerOptions.property.ports">ports</a></code> | <code>number[]</code> | Sets an array of ports to expose on the container. |
| <code><a href="#@awlsring/cdktf-github-actions.ContainerOptions.property.volumes">volumes</a></code> | <code>string[]</code> | Sets an array of volumes for the container to use. |

---

##### `image`<sup>Required</sup> <a name="image" id="@awlsring/cdktf-github-actions.ContainerOptions.property.image"></a>

```typescript
public readonly image: string;
```

- *Type:* string

The Docker image to use as the container to run the action.

The value can
be the Docker Hub image name or a registry name.

---

##### `credentials`<sup>Optional</sup> <a name="credentials" id="@awlsring/cdktf-github-actions.ContainerOptions.property.credentials"></a>

```typescript
public readonly credentials: ContainerCredentials;
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.ContainerCredentials">ContainerCredentials</a>

f the image's container registry requires authentication to pull the image, you can use credentials to set a map of the username and password.

The credentials are the same values that you would provide to the docker
login command.

---

##### `env`<sup>Optional</sup> <a name="env" id="@awlsring/cdktf-github-actions.ContainerOptions.property.env"></a>

```typescript
public readonly env: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

Sets a map of environment variables in the container.

---

##### `options`<sup>Optional</sup> <a name="options" id="@awlsring/cdktf-github-actions.ContainerOptions.property.options"></a>

```typescript
public readonly options: string[];
```

- *Type:* string[]

Additional Docker container resource options.

> [https://docs.docker.com/engine/reference/commandline/create/#options](https://docs.docker.com/engine/reference/commandline/create/#options)

---

##### `ports`<sup>Optional</sup> <a name="ports" id="@awlsring/cdktf-github-actions.ContainerOptions.property.ports"></a>

```typescript
public readonly ports: number[];
```

- *Type:* number[]

Sets an array of ports to expose on the container.

---

##### `volumes`<sup>Optional</sup> <a name="volumes" id="@awlsring/cdktf-github-actions.ContainerOptions.property.volumes"></a>

```typescript
public readonly volumes: string[];
```

- *Type:* string[]

Sets an array of volumes for the container to use.

You can use volumes to
share data between services or other steps in a job. You can specify
named Docker volumes, anonymous Docker volumes, or bind mounts on the
host.

To specify a volume, you specify the source and destination path:
`<source>:<destinationPath>`.

---

### CreateOptions <a name="CreateOptions" id="@awlsring/cdktf-github-actions.CreateOptions"></a>

The Create event accepts no options.

#### Initializer <a name="Initializer" id="@awlsring/cdktf-github-actions.CreateOptions.Initializer"></a>

```typescript
import { CreateOptions } from '@awlsring/cdktf-github-actions'

const createOptions: CreateOptions = { ... }
```


### CronScheduleOptions <a name="CronScheduleOptions" id="@awlsring/cdktf-github-actions.CronScheduleOptions"></a>

CRON schedule options.

#### Initializer <a name="Initializer" id="@awlsring/cdktf-github-actions.CronScheduleOptions.Initializer"></a>

```typescript
import { CronScheduleOptions } from '@awlsring/cdktf-github-actions'

const cronScheduleOptions: CronScheduleOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@awlsring/cdktf-github-actions.CronScheduleOptions.property.cron">cron</a></code> | <code>string</code> | *No description.* |

---

##### `cron`<sup>Required</sup> <a name="cron" id="@awlsring/cdktf-github-actions.CronScheduleOptions.property.cron"></a>

```typescript
public readonly cron: string;
```

- *Type:* string

> [https://pubs.opengroup.org/onlinepubs/9699919799/utilities/crontab.html#tag_20_25_07](https://pubs.opengroup.org/onlinepubs/9699919799/utilities/crontab.html#tag_20_25_07)

---

### DeleteOptions <a name="DeleteOptions" id="@awlsring/cdktf-github-actions.DeleteOptions"></a>

The Delete event accepts no options.

#### Initializer <a name="Initializer" id="@awlsring/cdktf-github-actions.DeleteOptions.Initializer"></a>

```typescript
import { DeleteOptions } from '@awlsring/cdktf-github-actions'

const deleteOptions: DeleteOptions = { ... }
```


### DeploymentOptions <a name="DeploymentOptions" id="@awlsring/cdktf-github-actions.DeploymentOptions"></a>

The Deployment event accepts no options.

#### Initializer <a name="Initializer" id="@awlsring/cdktf-github-actions.DeploymentOptions.Initializer"></a>

```typescript
import { DeploymentOptions } from '@awlsring/cdktf-github-actions'

const deploymentOptions: DeploymentOptions = { ... }
```


### DeploymentStatusOptions <a name="DeploymentStatusOptions" id="@awlsring/cdktf-github-actions.DeploymentStatusOptions"></a>

The Deployment status event accepts no options.

#### Initializer <a name="Initializer" id="@awlsring/cdktf-github-actions.DeploymentStatusOptions.Initializer"></a>

```typescript
import { DeploymentStatusOptions } from '@awlsring/cdktf-github-actions'

const deploymentStatusOptions: DeploymentStatusOptions = { ... }
```


### ForkOptions <a name="ForkOptions" id="@awlsring/cdktf-github-actions.ForkOptions"></a>

The Fork event accepts no options.

#### Initializer <a name="Initializer" id="@awlsring/cdktf-github-actions.ForkOptions.Initializer"></a>

```typescript
import { ForkOptions } from '@awlsring/cdktf-github-actions'

const forkOptions: ForkOptions = { ... }
```


### GollumOptions <a name="GollumOptions" id="@awlsring/cdktf-github-actions.GollumOptions"></a>

The Gollum event accepts no options.

#### Initializer <a name="Initializer" id="@awlsring/cdktf-github-actions.GollumOptions.Initializer"></a>

```typescript
import { GollumOptions } from '@awlsring/cdktf-github-actions'

const gollumOptions: GollumOptions = { ... }
```


### IssueCommentOptions <a name="IssueCommentOptions" id="@awlsring/cdktf-github-actions.IssueCommentOptions"></a>

Issue comment options.

#### Initializer <a name="Initializer" id="@awlsring/cdktf-github-actions.IssueCommentOptions.Initializer"></a>

```typescript
import { IssueCommentOptions } from '@awlsring/cdktf-github-actions'

const issueCommentOptions: IssueCommentOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@awlsring/cdktf-github-actions.IssueCommentOptions.property.types">types</a></code> | <code>string[]</code> | Which activity types to trigger on. |

---

##### `types`<sup>Optional</sup> <a name="types" id="@awlsring/cdktf-github-actions.IssueCommentOptions.property.types"></a>

```typescript
public readonly types: string[];
```

- *Type:* string[]

Which activity types to trigger on.

---

### IssuesOptions <a name="IssuesOptions" id="@awlsring/cdktf-github-actions.IssuesOptions"></a>

Issues options.

#### Initializer <a name="Initializer" id="@awlsring/cdktf-github-actions.IssuesOptions.Initializer"></a>

```typescript
import { IssuesOptions } from '@awlsring/cdktf-github-actions'

const issuesOptions: IssuesOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@awlsring/cdktf-github-actions.IssuesOptions.property.types">types</a></code> | <code>string[]</code> | Which activity types to trigger on. |

---

##### `types`<sup>Optional</sup> <a name="types" id="@awlsring/cdktf-github-actions.IssuesOptions.property.types"></a>

```typescript
public readonly types: string[];
```

- *Type:* string[]

Which activity types to trigger on.

---

### JobData <a name="JobData" id="@awlsring/cdktf-github-actions.JobData"></a>

A GitHub Workflow job definition.

#### Initializer <a name="Initializer" id="@awlsring/cdktf-github-actions.JobData.Initializer"></a>

```typescript
import { JobData } from '@awlsring/cdktf-github-actions'

const jobData: JobData = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@awlsring/cdktf-github-actions.JobData.property.permissions">permissions</a></code> | <code><a href="#@awlsring/cdktf-github-actions.JobPermissions">JobPermissions</a></code> | You can modify the default permissions granted to the GITHUB_TOKEN, adding or removing access as required, so that you only allow the minimum required access. |
| <code><a href="#@awlsring/cdktf-github-actions.JobData.property.runsOn">runsOn</a></code> | <code>string \| string[]</code> | The type of machine to run the job on. |
| <code><a href="#@awlsring/cdktf-github-actions.JobData.property.steps">steps</a></code> | <code><a href="#@awlsring/cdktf-github-actions.JobStepData">JobStepData</a>[]</code> | A job contains a sequence of tasks called steps. |
| <code><a href="#@awlsring/cdktf-github-actions.JobData.property.concurrency">concurrency</a></code> | <code>any</code> | Concurrency ensures that only a single job or workflow using the same concurrency group will run at a time. |
| <code><a href="#@awlsring/cdktf-github-actions.JobData.property.container">container</a></code> | <code><a href="#@awlsring/cdktf-github-actions.ContainerOptions">ContainerOptions</a></code> | A container to run any steps in a job that don't already specify a container. |
| <code><a href="#@awlsring/cdktf-github-actions.JobData.property.continueOnError">continueOnError</a></code> | <code>boolean</code> | Prevents a workflow run from failing when a job fails. |
| <code><a href="#@awlsring/cdktf-github-actions.JobData.property.defaults">defaults</a></code> | <code><a href="#@awlsring/cdktf-github-actions.JobDefaults">JobDefaults</a></code> | A map of default settings that will apply to all steps in the job. |
| <code><a href="#@awlsring/cdktf-github-actions.JobData.property.env">env</a></code> | <code>{[ key: string ]: string}</code> | A map of environment variables that are available to all steps in the job. |
| <code><a href="#@awlsring/cdktf-github-actions.JobData.property.environment">environment</a></code> | <code>any</code> | The environment that the job references. |
| <code><a href="#@awlsring/cdktf-github-actions.JobData.property.if">if</a></code> | <code>string</code> | You can use the if conditional to prevent a job from running unless a condition is met. |
| <code><a href="#@awlsring/cdktf-github-actions.JobData.property.name">name</a></code> | <code>string</code> | The name of the job displayed on GitHub. |
| <code><a href="#@awlsring/cdktf-github-actions.JobData.property.needs">needs</a></code> | <code>string[]</code> | Identifies any jobs that must complete successfully before this job will run. |
| <code><a href="#@awlsring/cdktf-github-actions.JobData.property.outputs">outputs</a></code> | <code>{[ key: string ]: string}</code> | A map of outputs for a job. |
| <code><a href="#@awlsring/cdktf-github-actions.JobData.property.services">services</a></code> | <code>{[ key: string ]: <a href="#@awlsring/cdktf-github-actions.ContainerOptions">ContainerOptions</a>}</code> | Used to host service containers for a job in a workflow. |
| <code><a href="#@awlsring/cdktf-github-actions.JobData.property.strategy">strategy</a></code> | <code><a href="#@awlsring/cdktf-github-actions.JobStrategy">JobStrategy</a></code> | A strategy creates a build matrix for your jobs. |
| <code><a href="#@awlsring/cdktf-github-actions.JobData.property.timeoutMinutes">timeoutMinutes</a></code> | <code>number</code> | The maximum number of minutes to let a job run before GitHub automatically cancels it. |

---

##### `permissions`<sup>Required</sup> <a name="permissions" id="@awlsring/cdktf-github-actions.JobData.property.permissions"></a>

```typescript
public readonly permissions: JobPermissions;
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.JobPermissions">JobPermissions</a>

You can modify the default permissions granted to the GITHUB_TOKEN, adding or removing access as required, so that you only allow the minimum required access.

Use `{ contents: READ }` if your job only needs to clone code.

This is intentionally a required field since it is required in order to
allow workflows to run in GitHub repositories with restricted default
access.

> [https://docs.github.com/en/actions/reference/authentication-in-a-workflow#permissions-for-the-github_token](https://docs.github.com/en/actions/reference/authentication-in-a-workflow#permissions-for-the-github_token)

---

##### `runsOn`<sup>Required</sup> <a name="runsOn" id="@awlsring/cdktf-github-actions.JobData.property.runsOn"></a>

```typescript
public readonly runsOn: string | string[];
```

- *Type:* string | string[]

The type of machine to run the job on.

The machine can be either a
GitHub-hosted runner or a self-hosted runner.

---

*Example*

```typescript
["ubuntu-latest"]
```


##### `steps`<sup>Required</sup> <a name="steps" id="@awlsring/cdktf-github-actions.JobData.property.steps"></a>

```typescript
public readonly steps: JobStepData[];
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.JobStepData">JobStepData</a>[]

A job contains a sequence of tasks called steps.

Steps can run commands,
run setup tasks, or run an action in your repository, a public repository,
or an action published in a Docker registry. Not all steps run actions,
but all actions run as a step. Each step runs in its own process in the
runner environment and has access to the workspace and filesystem.
Because steps run in their own process, changes to environment variables
are not preserved between steps. GitHub provides built-in steps to set up
and complete a job.

---

##### `concurrency`<sup>Optional</sup> <a name="concurrency" id="@awlsring/cdktf-github-actions.JobData.property.concurrency"></a>

```typescript
public readonly concurrency: any;
```

- *Type:* any

Concurrency ensures that only a single job or workflow using the same concurrency group will run at a time.

A concurrency group can be any
string or expression. The expression can use any context except for the
secrets context.

---

##### `container`<sup>Optional</sup> <a name="container" id="@awlsring/cdktf-github-actions.JobData.property.container"></a>

```typescript
public readonly container: ContainerOptions;
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.ContainerOptions">ContainerOptions</a>

A container to run any steps in a job that don't already specify a container.

If you have steps that use both script and container actions,
the container actions will run as sibling containers on the same network
with the same volume mounts.

---

##### `continueOnError`<sup>Optional</sup> <a name="continueOnError" id="@awlsring/cdktf-github-actions.JobData.property.continueOnError"></a>

```typescript
public readonly continueOnError: boolean;
```

- *Type:* boolean

Prevents a workflow run from failing when a job fails.

Set to true to
allow a workflow run to pass when this job fails.

---

##### `defaults`<sup>Optional</sup> <a name="defaults" id="@awlsring/cdktf-github-actions.JobData.property.defaults"></a>

```typescript
public readonly defaults: JobDefaults;
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.JobDefaults">JobDefaults</a>

A map of default settings that will apply to all steps in the job.

You
can also set default settings for the entire workflow.

---

##### `env`<sup>Optional</sup> <a name="env" id="@awlsring/cdktf-github-actions.JobData.property.env"></a>

```typescript
public readonly env: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

A map of environment variables that are available to all steps in the job.

You can also set environment variables for the entire workflow or an
individual step.

---

##### `environment`<sup>Optional</sup> <a name="environment" id="@awlsring/cdktf-github-actions.JobData.property.environment"></a>

```typescript
public readonly environment: any;
```

- *Type:* any

The environment that the job references.

All environment protection rules
must pass before a job referencing the environment is sent to a runner.

> [https://docs.github.com/en/actions/reference/environments](https://docs.github.com/en/actions/reference/environments)

---

##### `if`<sup>Optional</sup> <a name="if" id="@awlsring/cdktf-github-actions.JobData.property.if"></a>

```typescript
public readonly if: string;
```

- *Type:* string

You can use the if conditional to prevent a job from running unless a condition is met.

You can use any supported context and expression to
create a conditional.

---

##### `name`<sup>Optional</sup> <a name="name" id="@awlsring/cdktf-github-actions.JobData.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The name of the job displayed on GitHub.

---

##### `needs`<sup>Optional</sup> <a name="needs" id="@awlsring/cdktf-github-actions.JobData.property.needs"></a>

```typescript
public readonly needs: string[];
```

- *Type:* string[]

Identifies any jobs that must complete successfully before this job will run.

It can be a string or array of strings. If a job fails, all jobs
that need it are skipped unless the jobs use a conditional expression
that causes the job to continue.

---

##### `outputs`<sup>Optional</sup> <a name="outputs" id="@awlsring/cdktf-github-actions.JobData.property.outputs"></a>

```typescript
public readonly outputs: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

A map of outputs for a job.

Job outputs are available to all downstream
jobs that depend on this job.

---

##### `services`<sup>Optional</sup> <a name="services" id="@awlsring/cdktf-github-actions.JobData.property.services"></a>

```typescript
public readonly services: {[ key: string ]: ContainerOptions};
```

- *Type:* {[ key: string ]: <a href="#@awlsring/cdktf-github-actions.ContainerOptions">ContainerOptions</a>}

Used to host service containers for a job in a workflow.

Service
containers are useful for creating databases or cache services like Redis.
The runner automatically creates a Docker network and manages the life
cycle of the service containers.

---

##### `strategy`<sup>Optional</sup> <a name="strategy" id="@awlsring/cdktf-github-actions.JobData.property.strategy"></a>

```typescript
public readonly strategy: JobStrategy;
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.JobStrategy">JobStrategy</a>

A strategy creates a build matrix for your jobs.

You can define different
variations to run each job in.

---

##### `timeoutMinutes`<sup>Optional</sup> <a name="timeoutMinutes" id="@awlsring/cdktf-github-actions.JobData.property.timeoutMinutes"></a>

```typescript
public readonly timeoutMinutes: number;
```

- *Type:* number
- *Default:* 360

The maximum number of minutes to let a job run before GitHub automatically cancels it.

---

### JobDefaults <a name="JobDefaults" id="@awlsring/cdktf-github-actions.JobDefaults"></a>

Default settings for all steps in the job.

#### Initializer <a name="Initializer" id="@awlsring/cdktf-github-actions.JobDefaults.Initializer"></a>

```typescript
import { JobDefaults } from '@awlsring/cdktf-github-actions'

const jobDefaults: JobDefaults = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@awlsring/cdktf-github-actions.JobDefaults.property.run">run</a></code> | <code><a href="#@awlsring/cdktf-github-actions.RunSettings">RunSettings</a></code> | Default run settings. |

---

##### `run`<sup>Optional</sup> <a name="run" id="@awlsring/cdktf-github-actions.JobDefaults.property.run"></a>

```typescript
public readonly run: RunSettings;
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.RunSettings">RunSettings</a>

Default run settings.

---

### JobMatrix <a name="JobMatrix" id="@awlsring/cdktf-github-actions.JobMatrix"></a>

A job matrix.

#### Initializer <a name="Initializer" id="@awlsring/cdktf-github-actions.JobMatrix.Initializer"></a>

```typescript
import { JobMatrix } from '@awlsring/cdktf-github-actions'

const jobMatrix: JobMatrix = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@awlsring/cdktf-github-actions.JobMatrix.property.domain">domain</a></code> | <code>{[ key: string ]: string[]}</code> | Each option you define in the matrix has a key and value. |
| <code><a href="#@awlsring/cdktf-github-actions.JobMatrix.property.exclude">exclude</a></code> | <code>{[ key: string ]: string}[]</code> | You can remove a specific configurations defined in the build matrix using the exclude option. |
| <code><a href="#@awlsring/cdktf-github-actions.JobMatrix.property.include">include</a></code> | <code>{[ key: string ]: string}[]</code> | You can add additional configuration options to a build matrix job that already exists. |

---

##### `domain`<sup>Optional</sup> <a name="domain" id="@awlsring/cdktf-github-actions.JobMatrix.property.domain"></a>

```typescript
public readonly domain: {[ key: string ]: string[]};
```

- *Type:* {[ key: string ]: string[]}

Each option you define in the matrix has a key and value.

The keys you
define become properties in the matrix context and you can reference the
property in other areas of your workflow file. For example, if you define
the key os that contains an array of operating systems, you can use the
matrix.os property as the value of the runs-on keyword to create a job
for each operating system.

---

##### `exclude`<sup>Optional</sup> <a name="exclude" id="@awlsring/cdktf-github-actions.JobMatrix.property.exclude"></a>

```typescript
public readonly exclude: {[ key: string ]: string}[];
```

- *Type:* {[ key: string ]: string}[]

You can remove a specific configurations defined in the build matrix using the exclude option.

Using exclude removes a job defined by the
build matrix.

---

##### `include`<sup>Optional</sup> <a name="include" id="@awlsring/cdktf-github-actions.JobMatrix.property.include"></a>

```typescript
public readonly include: {[ key: string ]: string}[];
```

- *Type:* {[ key: string ]: string}[]

You can add additional configuration options to a build matrix job that already exists.

For example, if you want to use a specific version of npm
when the job that uses windows-latest and version 8 of node runs, you can
use include to specify that additional option.

---

### JobPermissions <a name="JobPermissions" id="@awlsring/cdktf-github-actions.JobPermissions"></a>

The available scopes and access values for workflow permissions.

If you
specify the access for any of these scopes, all those that are not
specified are set to `JobPermission.NONE`, instead of the default behavior
when none is specified.

#### Initializer <a name="Initializer" id="@awlsring/cdktf-github-actions.JobPermissions.Initializer"></a>

```typescript
import { JobPermissions } from '@awlsring/cdktf-github-actions'

const jobPermissions: JobPermissions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@awlsring/cdktf-github-actions.JobPermissions.property.actions">actions</a></code> | <code><a href="#@awlsring/cdktf-github-actions.JobPermission">JobPermission</a></code> | *No description.* |
| <code><a href="#@awlsring/cdktf-github-actions.JobPermissions.property.checks">checks</a></code> | <code><a href="#@awlsring/cdktf-github-actions.JobPermission">JobPermission</a></code> | *No description.* |
| <code><a href="#@awlsring/cdktf-github-actions.JobPermissions.property.contents">contents</a></code> | <code><a href="#@awlsring/cdktf-github-actions.JobPermission">JobPermission</a></code> | *No description.* |
| <code><a href="#@awlsring/cdktf-github-actions.JobPermissions.property.deployments">deployments</a></code> | <code><a href="#@awlsring/cdktf-github-actions.JobPermission">JobPermission</a></code> | *No description.* |
| <code><a href="#@awlsring/cdktf-github-actions.JobPermissions.property.discussions">discussions</a></code> | <code><a href="#@awlsring/cdktf-github-actions.JobPermission">JobPermission</a></code> | *No description.* |
| <code><a href="#@awlsring/cdktf-github-actions.JobPermissions.property.idToken">idToken</a></code> | <code><a href="#@awlsring/cdktf-github-actions.JobPermission">JobPermission</a></code> | *No description.* |
| <code><a href="#@awlsring/cdktf-github-actions.JobPermissions.property.issues">issues</a></code> | <code><a href="#@awlsring/cdktf-github-actions.JobPermission">JobPermission</a></code> | *No description.* |
| <code><a href="#@awlsring/cdktf-github-actions.JobPermissions.property.packages">packages</a></code> | <code><a href="#@awlsring/cdktf-github-actions.JobPermission">JobPermission</a></code> | *No description.* |
| <code><a href="#@awlsring/cdktf-github-actions.JobPermissions.property.pullRequests">pullRequests</a></code> | <code><a href="#@awlsring/cdktf-github-actions.JobPermission">JobPermission</a></code> | *No description.* |
| <code><a href="#@awlsring/cdktf-github-actions.JobPermissions.property.repositoryProjects">repositoryProjects</a></code> | <code><a href="#@awlsring/cdktf-github-actions.JobPermission">JobPermission</a></code> | *No description.* |
| <code><a href="#@awlsring/cdktf-github-actions.JobPermissions.property.securityEvents">securityEvents</a></code> | <code><a href="#@awlsring/cdktf-github-actions.JobPermission">JobPermission</a></code> | *No description.* |
| <code><a href="#@awlsring/cdktf-github-actions.JobPermissions.property.statuses">statuses</a></code> | <code><a href="#@awlsring/cdktf-github-actions.JobPermission">JobPermission</a></code> | *No description.* |

---

##### `actions`<sup>Optional</sup> <a name="actions" id="@awlsring/cdktf-github-actions.JobPermissions.property.actions"></a>

```typescript
public readonly actions: JobPermission;
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.JobPermission">JobPermission</a>

---

##### `checks`<sup>Optional</sup> <a name="checks" id="@awlsring/cdktf-github-actions.JobPermissions.property.checks"></a>

```typescript
public readonly checks: JobPermission;
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.JobPermission">JobPermission</a>

---

##### `contents`<sup>Optional</sup> <a name="contents" id="@awlsring/cdktf-github-actions.JobPermissions.property.contents"></a>

```typescript
public readonly contents: JobPermission;
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.JobPermission">JobPermission</a>

---

##### `deployments`<sup>Optional</sup> <a name="deployments" id="@awlsring/cdktf-github-actions.JobPermissions.property.deployments"></a>

```typescript
public readonly deployments: JobPermission;
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.JobPermission">JobPermission</a>

---

##### `discussions`<sup>Optional</sup> <a name="discussions" id="@awlsring/cdktf-github-actions.JobPermissions.property.discussions"></a>

```typescript
public readonly discussions: JobPermission;
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.JobPermission">JobPermission</a>

---

##### `idToken`<sup>Optional</sup> <a name="idToken" id="@awlsring/cdktf-github-actions.JobPermissions.property.idToken"></a>

```typescript
public readonly idToken: JobPermission;
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.JobPermission">JobPermission</a>

---

##### `issues`<sup>Optional</sup> <a name="issues" id="@awlsring/cdktf-github-actions.JobPermissions.property.issues"></a>

```typescript
public readonly issues: JobPermission;
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.JobPermission">JobPermission</a>

---

##### `packages`<sup>Optional</sup> <a name="packages" id="@awlsring/cdktf-github-actions.JobPermissions.property.packages"></a>

```typescript
public readonly packages: JobPermission;
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.JobPermission">JobPermission</a>

---

##### `pullRequests`<sup>Optional</sup> <a name="pullRequests" id="@awlsring/cdktf-github-actions.JobPermissions.property.pullRequests"></a>

```typescript
public readonly pullRequests: JobPermission;
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.JobPermission">JobPermission</a>

---

##### `repositoryProjects`<sup>Optional</sup> <a name="repositoryProjects" id="@awlsring/cdktf-github-actions.JobPermissions.property.repositoryProjects"></a>

```typescript
public readonly repositoryProjects: JobPermission;
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.JobPermission">JobPermission</a>

---

##### `securityEvents`<sup>Optional</sup> <a name="securityEvents" id="@awlsring/cdktf-github-actions.JobPermissions.property.securityEvents"></a>

```typescript
public readonly securityEvents: JobPermission;
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.JobPermission">JobPermission</a>

---

##### `statuses`<sup>Optional</sup> <a name="statuses" id="@awlsring/cdktf-github-actions.JobPermissions.property.statuses"></a>

```typescript
public readonly statuses: JobPermission;
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.JobPermission">JobPermission</a>

---

### JobProps <a name="JobProps" id="@awlsring/cdktf-github-actions.JobProps"></a>

#### Initializer <a name="Initializer" id="@awlsring/cdktf-github-actions.JobProps.Initializer"></a>

```typescript
import { JobProps } from '@awlsring/cdktf-github-actions'

const jobProps: JobProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@awlsring/cdktf-github-actions.JobProps.property.steps">steps</a></code> | <code><a href="#@awlsring/cdktf-github-actions.JobStep">JobStep</a>[]</code> | *No description.* |
| <code><a href="#@awlsring/cdktf-github-actions.JobProps.property.concurrency">concurrency</a></code> | <code>any</code> | *No description.* |
| <code><a href="#@awlsring/cdktf-github-actions.JobProps.property.container">container</a></code> | <code><a href="#@awlsring/cdktf-github-actions.ContainerOptions">ContainerOptions</a></code> | *No description.* |
| <code><a href="#@awlsring/cdktf-github-actions.JobProps.property.continueOnError">continueOnError</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#@awlsring/cdktf-github-actions.JobProps.property.defaults">defaults</a></code> | <code><a href="#@awlsring/cdktf-github-actions.JobDefaults">JobDefaults</a></code> | *No description.* |
| <code><a href="#@awlsring/cdktf-github-actions.JobProps.property.dependsOn">dependsOn</a></code> | <code><a href="#@awlsring/cdktf-github-actions.Job">Job</a>[]</code> | *No description.* |
| <code><a href="#@awlsring/cdktf-github-actions.JobProps.property.env">env</a></code> | <code>{[ key: string ]: string}</code> | *No description.* |
| <code><a href="#@awlsring/cdktf-github-actions.JobProps.property.environment">environment</a></code> | <code>any</code> | *No description.* |
| <code><a href="#@awlsring/cdktf-github-actions.JobProps.property.jobRefereneName">jobRefereneName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@awlsring/cdktf-github-actions.JobProps.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@awlsring/cdktf-github-actions.JobProps.property.outputs">outputs</a></code> | <code>{[ key: string ]: string}</code> | *No description.* |
| <code><a href="#@awlsring/cdktf-github-actions.JobProps.property.permissions">permissions</a></code> | <code><a href="#@awlsring/cdktf-github-actions.JobPermissions">JobPermissions</a></code> | *No description.* |
| <code><a href="#@awlsring/cdktf-github-actions.JobProps.property.runIf">runIf</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@awlsring/cdktf-github-actions.JobProps.property.runsOn">runsOn</a></code> | <code>string \| string[]</code> | *No description.* |
| <code><a href="#@awlsring/cdktf-github-actions.JobProps.property.services">services</a></code> | <code>{[ key: string ]: <a href="#@awlsring/cdktf-github-actions.ContainerOptions">ContainerOptions</a>}</code> | *No description.* |
| <code><a href="#@awlsring/cdktf-github-actions.JobProps.property.strategy">strategy</a></code> | <code><a href="#@awlsring/cdktf-github-actions.JobStrategy">JobStrategy</a></code> | *No description.* |
| <code><a href="#@awlsring/cdktf-github-actions.JobProps.property.timeoutMinutes">timeoutMinutes</a></code> | <code>number</code> | *No description.* |

---

##### `steps`<sup>Required</sup> <a name="steps" id="@awlsring/cdktf-github-actions.JobProps.property.steps"></a>

```typescript
public readonly steps: JobStep[];
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.JobStep">JobStep</a>[]

---

##### `concurrency`<sup>Optional</sup> <a name="concurrency" id="@awlsring/cdktf-github-actions.JobProps.property.concurrency"></a>

```typescript
public readonly concurrency: any;
```

- *Type:* any

---

##### `container`<sup>Optional</sup> <a name="container" id="@awlsring/cdktf-github-actions.JobProps.property.container"></a>

```typescript
public readonly container: ContainerOptions;
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.ContainerOptions">ContainerOptions</a>

---

##### `continueOnError`<sup>Optional</sup> <a name="continueOnError" id="@awlsring/cdktf-github-actions.JobProps.property.continueOnError"></a>

```typescript
public readonly continueOnError: boolean;
```

- *Type:* boolean

---

##### `defaults`<sup>Optional</sup> <a name="defaults" id="@awlsring/cdktf-github-actions.JobProps.property.defaults"></a>

```typescript
public readonly defaults: JobDefaults;
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.JobDefaults">JobDefaults</a>

---

##### `dependsOn`<sup>Optional</sup> <a name="dependsOn" id="@awlsring/cdktf-github-actions.JobProps.property.dependsOn"></a>

```typescript
public readonly dependsOn: Job[];
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.Job">Job</a>[]

---

##### `env`<sup>Optional</sup> <a name="env" id="@awlsring/cdktf-github-actions.JobProps.property.env"></a>

```typescript
public readonly env: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

---

##### `environment`<sup>Optional</sup> <a name="environment" id="@awlsring/cdktf-github-actions.JobProps.property.environment"></a>

```typescript
public readonly environment: any;
```

- *Type:* any

---

##### `jobRefereneName`<sup>Optional</sup> <a name="jobRefereneName" id="@awlsring/cdktf-github-actions.JobProps.property.jobRefereneName"></a>

```typescript
public readonly jobRefereneName: string;
```

- *Type:* string

---

##### `name`<sup>Optional</sup> <a name="name" id="@awlsring/cdktf-github-actions.JobProps.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `outputs`<sup>Optional</sup> <a name="outputs" id="@awlsring/cdktf-github-actions.JobProps.property.outputs"></a>

```typescript
public readonly outputs: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

---

##### `permissions`<sup>Optional</sup> <a name="permissions" id="@awlsring/cdktf-github-actions.JobProps.property.permissions"></a>

```typescript
public readonly permissions: JobPermissions;
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.JobPermissions">JobPermissions</a>

---

##### `runIf`<sup>Optional</sup> <a name="runIf" id="@awlsring/cdktf-github-actions.JobProps.property.runIf"></a>

```typescript
public readonly runIf: string;
```

- *Type:* string

---

##### `runsOn`<sup>Optional</sup> <a name="runsOn" id="@awlsring/cdktf-github-actions.JobProps.property.runsOn"></a>

```typescript
public readonly runsOn: string | string[];
```

- *Type:* string | string[]

---

##### `services`<sup>Optional</sup> <a name="services" id="@awlsring/cdktf-github-actions.JobProps.property.services"></a>

```typescript
public readonly services: {[ key: string ]: ContainerOptions};
```

- *Type:* {[ key: string ]: <a href="#@awlsring/cdktf-github-actions.ContainerOptions">ContainerOptions</a>}

---

##### `strategy`<sup>Optional</sup> <a name="strategy" id="@awlsring/cdktf-github-actions.JobProps.property.strategy"></a>

```typescript
public readonly strategy: JobStrategy;
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.JobStrategy">JobStrategy</a>

---

##### `timeoutMinutes`<sup>Optional</sup> <a name="timeoutMinutes" id="@awlsring/cdktf-github-actions.JobProps.property.timeoutMinutes"></a>

```typescript
public readonly timeoutMinutes: number;
```

- *Type:* number

---

### JobStep <a name="JobStep" id="@awlsring/cdktf-github-actions.JobStep"></a>

#### Initializer <a name="Initializer" id="@awlsring/cdktf-github-actions.JobStep.Initializer"></a>

```typescript
import { JobStep } from '@awlsring/cdktf-github-actions'

const jobStep: JobStep = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@awlsring/cdktf-github-actions.JobStep.property.continueOnError">continueOnError</a></code> | <code>boolean</code> | Prevents a job from failing when a step fails. |
| <code><a href="#@awlsring/cdktf-github-actions.JobStep.property.env">env</a></code> | <code>{[ key: string ]: string}</code> | Sets environment variables for steps to use in the runner environment. |
| <code><a href="#@awlsring/cdktf-github-actions.JobStep.property.id">id</a></code> | <code>string</code> | A unique identifier for the step. |
| <code><a href="#@awlsring/cdktf-github-actions.JobStep.property.if">if</a></code> | <code>string</code> | You can use the if conditional to prevent a job from running unless a condition is met. |
| <code><a href="#@awlsring/cdktf-github-actions.JobStep.property.name">name</a></code> | <code>string</code> | A name for your step to display on GitHub. |
| <code><a href="#@awlsring/cdktf-github-actions.JobStep.property.run">run</a></code> | <code>string</code> | Runs command-line programs using the operating system's shell. |
| <code><a href="#@awlsring/cdktf-github-actions.JobStep.property.timeoutMinutes">timeoutMinutes</a></code> | <code>number</code> | The maximum number of minutes to run the step before killing the process. |
| <code><a href="#@awlsring/cdktf-github-actions.JobStep.property.uses">uses</a></code> | <code>string</code> | Selects an action to run as part of a step in your job. |
| <code><a href="#@awlsring/cdktf-github-actions.JobStep.property.with">with</a></code> | <code>{[ key: string ]: any}</code> | A map of the input parameters defined by the action. |
| <code><a href="#@awlsring/cdktf-github-actions.JobStep.property.withSecrets">withSecrets</a></code> | <code><a href="#@awlsring/cdktf-github-actions.SecretsOptions">SecretsOptions</a>[]</code> | *No description.* |

---

##### `continueOnError`<sup>Optional</sup> <a name="continueOnError" id="@awlsring/cdktf-github-actions.JobStep.property.continueOnError"></a>

```typescript
public readonly continueOnError: boolean;
```

- *Type:* boolean

Prevents a job from failing when a step fails.

Set to true to allow a job
to pass when this step fails.

---

##### `env`<sup>Optional</sup> <a name="env" id="@awlsring/cdktf-github-actions.JobStep.property.env"></a>

```typescript
public readonly env: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

Sets environment variables for steps to use in the runner environment.

You can also set environment variables for the entire workflow or a job.

---

##### `id`<sup>Optional</sup> <a name="id" id="@awlsring/cdktf-github-actions.JobStep.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

A unique identifier for the step.

You can use the id to reference the
step in contexts.

---

##### `if`<sup>Optional</sup> <a name="if" id="@awlsring/cdktf-github-actions.JobStep.property.if"></a>

```typescript
public readonly if: string;
```

- *Type:* string

You can use the if conditional to prevent a job from running unless a condition is met.

You can use any supported context and expression to
create a conditional.

---

##### `name`<sup>Optional</sup> <a name="name" id="@awlsring/cdktf-github-actions.JobStep.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

A name for your step to display on GitHub.

---

##### `run`<sup>Optional</sup> <a name="run" id="@awlsring/cdktf-github-actions.JobStep.property.run"></a>

```typescript
public readonly run: string;
```

- *Type:* string

Runs command-line programs using the operating system's shell.

If you do
not provide a name, the step name will default to the text specified in
the run command.

---

##### `timeoutMinutes`<sup>Optional</sup> <a name="timeoutMinutes" id="@awlsring/cdktf-github-actions.JobStep.property.timeoutMinutes"></a>

```typescript
public readonly timeoutMinutes: number;
```

- *Type:* number

The maximum number of minutes to run the step before killing the process.

---

##### `uses`<sup>Optional</sup> <a name="uses" id="@awlsring/cdktf-github-actions.JobStep.property.uses"></a>

```typescript
public readonly uses: string;
```

- *Type:* string

Selects an action to run as part of a step in your job.

An action is a
reusable unit of code. You can use an action defined in the same
repository as the workflow, a public repository, or in a published Docker
container image.

---

##### `with`<sup>Optional</sup> <a name="with" id="@awlsring/cdktf-github-actions.JobStep.property.with"></a>

```typescript
public readonly with: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}

A map of the input parameters defined by the action.

Each input parameter
is a key/value pair. Input parameters are set as environment variables.
The variable is prefixed with INPUT_ and converted to upper case.

---

##### `withSecrets`<sup>Optional</sup> <a name="withSecrets" id="@awlsring/cdktf-github-actions.JobStep.property.withSecrets"></a>

```typescript
public readonly withSecrets: SecretsOptions[];
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.SecretsOptions">SecretsOptions</a>[]

---

### JobStepData <a name="JobStepData" id="@awlsring/cdktf-github-actions.JobStepData"></a>

A job step.

#### Initializer <a name="Initializer" id="@awlsring/cdktf-github-actions.JobStepData.Initializer"></a>

```typescript
import { JobStepData } from '@awlsring/cdktf-github-actions'

const jobStepData: JobStepData = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@awlsring/cdktf-github-actions.JobStepData.property.continueOnError">continueOnError</a></code> | <code>boolean</code> | Prevents a job from failing when a step fails. |
| <code><a href="#@awlsring/cdktf-github-actions.JobStepData.property.env">env</a></code> | <code>{[ key: string ]: string}</code> | Sets environment variables for steps to use in the runner environment. |
| <code><a href="#@awlsring/cdktf-github-actions.JobStepData.property.id">id</a></code> | <code>string</code> | A unique identifier for the step. |
| <code><a href="#@awlsring/cdktf-github-actions.JobStepData.property.if">if</a></code> | <code>string</code> | You can use the if conditional to prevent a job from running unless a condition is met. |
| <code><a href="#@awlsring/cdktf-github-actions.JobStepData.property.name">name</a></code> | <code>string</code> | A name for your step to display on GitHub. |
| <code><a href="#@awlsring/cdktf-github-actions.JobStepData.property.run">run</a></code> | <code>string</code> | Runs command-line programs using the operating system's shell. |
| <code><a href="#@awlsring/cdktf-github-actions.JobStepData.property.timeoutMinutes">timeoutMinutes</a></code> | <code>number</code> | The maximum number of minutes to run the step before killing the process. |
| <code><a href="#@awlsring/cdktf-github-actions.JobStepData.property.uses">uses</a></code> | <code>string</code> | Selects an action to run as part of a step in your job. |
| <code><a href="#@awlsring/cdktf-github-actions.JobStepData.property.with">with</a></code> | <code>{[ key: string ]: any}</code> | A map of the input parameters defined by the action. |

---

##### `continueOnError`<sup>Optional</sup> <a name="continueOnError" id="@awlsring/cdktf-github-actions.JobStepData.property.continueOnError"></a>

```typescript
public readonly continueOnError: boolean;
```

- *Type:* boolean

Prevents a job from failing when a step fails.

Set to true to allow a job
to pass when this step fails.

---

##### `env`<sup>Optional</sup> <a name="env" id="@awlsring/cdktf-github-actions.JobStepData.property.env"></a>

```typescript
public readonly env: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

Sets environment variables for steps to use in the runner environment.

You can also set environment variables for the entire workflow or a job.

---

##### `id`<sup>Optional</sup> <a name="id" id="@awlsring/cdktf-github-actions.JobStepData.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

A unique identifier for the step.

You can use the id to reference the
step in contexts.

---

##### `if`<sup>Optional</sup> <a name="if" id="@awlsring/cdktf-github-actions.JobStepData.property.if"></a>

```typescript
public readonly if: string;
```

- *Type:* string

You can use the if conditional to prevent a job from running unless a condition is met.

You can use any supported context and expression to
create a conditional.

---

##### `name`<sup>Optional</sup> <a name="name" id="@awlsring/cdktf-github-actions.JobStepData.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

A name for your step to display on GitHub.

---

##### `run`<sup>Optional</sup> <a name="run" id="@awlsring/cdktf-github-actions.JobStepData.property.run"></a>

```typescript
public readonly run: string;
```

- *Type:* string

Runs command-line programs using the operating system's shell.

If you do
not provide a name, the step name will default to the text specified in
the run command.

---

##### `timeoutMinutes`<sup>Optional</sup> <a name="timeoutMinutes" id="@awlsring/cdktf-github-actions.JobStepData.property.timeoutMinutes"></a>

```typescript
public readonly timeoutMinutes: number;
```

- *Type:* number

The maximum number of minutes to run the step before killing the process.

---

##### `uses`<sup>Optional</sup> <a name="uses" id="@awlsring/cdktf-github-actions.JobStepData.property.uses"></a>

```typescript
public readonly uses: string;
```

- *Type:* string

Selects an action to run as part of a step in your job.

An action is a
reusable unit of code. You can use an action defined in the same
repository as the workflow, a public repository, or in a published Docker
container image.

---

##### `with`<sup>Optional</sup> <a name="with" id="@awlsring/cdktf-github-actions.JobStepData.property.with"></a>

```typescript
public readonly with: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}

A map of the input parameters defined by the action.

Each input parameter
is a key/value pair. Input parameters are set as environment variables.
The variable is prefixed with INPUT_ and converted to upper case.

---

### JobStrategy <a name="JobStrategy" id="@awlsring/cdktf-github-actions.JobStrategy"></a>

A strategy creates a build matrix for your jobs.

You can define different
variations to run each job in.

#### Initializer <a name="Initializer" id="@awlsring/cdktf-github-actions.JobStrategy.Initializer"></a>

```typescript
import { JobStrategy } from '@awlsring/cdktf-github-actions'

const jobStrategy: JobStrategy = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@awlsring/cdktf-github-actions.JobStrategy.property.failFast">failFast</a></code> | <code>boolean</code> | When set to true, GitHub cancels all in-progress jobs if any matrix job fails. |
| <code><a href="#@awlsring/cdktf-github-actions.JobStrategy.property.matrix">matrix</a></code> | <code><a href="#@awlsring/cdktf-github-actions.JobMatrix">JobMatrix</a></code> | You can define a matrix of different job configurations. |
| <code><a href="#@awlsring/cdktf-github-actions.JobStrategy.property.maxParallel">maxParallel</a></code> | <code>number</code> | The maximum number of jobs that can run simultaneously when using a matrix job strategy. |

---

##### `failFast`<sup>Optional</sup> <a name="failFast" id="@awlsring/cdktf-github-actions.JobStrategy.property.failFast"></a>

```typescript
public readonly failFast: boolean;
```

- *Type:* boolean

When set to true, GitHub cancels all in-progress jobs if any matrix job fails.

Default: true

---

##### `matrix`<sup>Optional</sup> <a name="matrix" id="@awlsring/cdktf-github-actions.JobStrategy.property.matrix"></a>

```typescript
public readonly matrix: JobMatrix;
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.JobMatrix">JobMatrix</a>

You can define a matrix of different job configurations.

A matrix allows
you to create multiple jobs by performing variable substitution in a
single job definition. For example, you can use a matrix to create jobs
for more than one supported version of a programming language, operating
system, or tool. A matrix reuses the job's configuration and creates a
job for each matrix you configure.

A job matrix can generate a maximum of 256 jobs per workflow run. This
limit also applies to self-hosted runners.

---

##### `maxParallel`<sup>Optional</sup> <a name="maxParallel" id="@awlsring/cdktf-github-actions.JobStrategy.property.maxParallel"></a>

```typescript
public readonly maxParallel: number;
```

- *Type:* number

The maximum number of jobs that can run simultaneously when using a matrix job strategy.

By default, GitHub will maximize the number of jobs
run in parallel depending on the available runners on GitHub-hosted
virtual machines.

---

### LabelOptions <a name="LabelOptions" id="@awlsring/cdktf-github-actions.LabelOptions"></a>

label options.

#### Initializer <a name="Initializer" id="@awlsring/cdktf-github-actions.LabelOptions.Initializer"></a>

```typescript
import { LabelOptions } from '@awlsring/cdktf-github-actions'

const labelOptions: LabelOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@awlsring/cdktf-github-actions.LabelOptions.property.types">types</a></code> | <code>string[]</code> | Which activity types to trigger on. |

---

##### `types`<sup>Optional</sup> <a name="types" id="@awlsring/cdktf-github-actions.LabelOptions.property.types"></a>

```typescript
public readonly types: string[];
```

- *Type:* string[]

Which activity types to trigger on.

---

### MilestoneOptions <a name="MilestoneOptions" id="@awlsring/cdktf-github-actions.MilestoneOptions"></a>

Milestone options.

#### Initializer <a name="Initializer" id="@awlsring/cdktf-github-actions.MilestoneOptions.Initializer"></a>

```typescript
import { MilestoneOptions } from '@awlsring/cdktf-github-actions'

const milestoneOptions: MilestoneOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@awlsring/cdktf-github-actions.MilestoneOptions.property.types">types</a></code> | <code>string[]</code> | Which activity types to trigger on. |

---

##### `types`<sup>Optional</sup> <a name="types" id="@awlsring/cdktf-github-actions.MilestoneOptions.property.types"></a>

```typescript
public readonly types: string[];
```

- *Type:* string[]

Which activity types to trigger on.

---

### PageBuildOptions <a name="PageBuildOptions" id="@awlsring/cdktf-github-actions.PageBuildOptions"></a>

The Page build event accepts no options.

#### Initializer <a name="Initializer" id="@awlsring/cdktf-github-actions.PageBuildOptions.Initializer"></a>

```typescript
import { PageBuildOptions } from '@awlsring/cdktf-github-actions'

const pageBuildOptions: PageBuildOptions = { ... }
```


### ProjectCardOptions <a name="ProjectCardOptions" id="@awlsring/cdktf-github-actions.ProjectCardOptions"></a>

Project card options.

#### Initializer <a name="Initializer" id="@awlsring/cdktf-github-actions.ProjectCardOptions.Initializer"></a>

```typescript
import { ProjectCardOptions } from '@awlsring/cdktf-github-actions'

const projectCardOptions: ProjectCardOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@awlsring/cdktf-github-actions.ProjectCardOptions.property.types">types</a></code> | <code>string[]</code> | Which activity types to trigger on. |

---

##### `types`<sup>Optional</sup> <a name="types" id="@awlsring/cdktf-github-actions.ProjectCardOptions.property.types"></a>

```typescript
public readonly types: string[];
```

- *Type:* string[]

Which activity types to trigger on.

---

### ProjectColumnOptions <a name="ProjectColumnOptions" id="@awlsring/cdktf-github-actions.ProjectColumnOptions"></a>

Probject column options.

#### Initializer <a name="Initializer" id="@awlsring/cdktf-github-actions.ProjectColumnOptions.Initializer"></a>

```typescript
import { ProjectColumnOptions } from '@awlsring/cdktf-github-actions'

const projectColumnOptions: ProjectColumnOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@awlsring/cdktf-github-actions.ProjectColumnOptions.property.types">types</a></code> | <code>string[]</code> | Which activity types to trigger on. |

---

##### `types`<sup>Optional</sup> <a name="types" id="@awlsring/cdktf-github-actions.ProjectColumnOptions.property.types"></a>

```typescript
public readonly types: string[];
```

- *Type:* string[]

Which activity types to trigger on.

---

### ProjectOptions <a name="ProjectOptions" id="@awlsring/cdktf-github-actions.ProjectOptions"></a>

Project options.

#### Initializer <a name="Initializer" id="@awlsring/cdktf-github-actions.ProjectOptions.Initializer"></a>

```typescript
import { ProjectOptions } from '@awlsring/cdktf-github-actions'

const projectOptions: ProjectOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@awlsring/cdktf-github-actions.ProjectOptions.property.types">types</a></code> | <code>string[]</code> | Which activity types to trigger on. |

---

##### `types`<sup>Optional</sup> <a name="types" id="@awlsring/cdktf-github-actions.ProjectOptions.property.types"></a>

```typescript
public readonly types: string[];
```

- *Type:* string[]

Which activity types to trigger on.

---

### PublicOptions <a name="PublicOptions" id="@awlsring/cdktf-github-actions.PublicOptions"></a>

The Public event accepts no options.

#### Initializer <a name="Initializer" id="@awlsring/cdktf-github-actions.PublicOptions.Initializer"></a>

```typescript
import { PublicOptions } from '@awlsring/cdktf-github-actions'

const publicOptions: PublicOptions = { ... }
```


### PullRequestOptions <a name="PullRequestOptions" id="@awlsring/cdktf-github-actions.PullRequestOptions"></a>

Pull request options.

#### Initializer <a name="Initializer" id="@awlsring/cdktf-github-actions.PullRequestOptions.Initializer"></a>

```typescript
import { PullRequestOptions } from '@awlsring/cdktf-github-actions'

const pullRequestOptions: PullRequestOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@awlsring/cdktf-github-actions.PullRequestOptions.property.types">types</a></code> | <code>string[]</code> | Which activity types to trigger on. |

---

##### `types`<sup>Optional</sup> <a name="types" id="@awlsring/cdktf-github-actions.PullRequestOptions.property.types"></a>

```typescript
public readonly types: string[];
```

- *Type:* string[]

Which activity types to trigger on.

---

### PullRequestReviewCommentOptions <a name="PullRequestReviewCommentOptions" id="@awlsring/cdktf-github-actions.PullRequestReviewCommentOptions"></a>

Pull request review comment options.

#### Initializer <a name="Initializer" id="@awlsring/cdktf-github-actions.PullRequestReviewCommentOptions.Initializer"></a>

```typescript
import { PullRequestReviewCommentOptions } from '@awlsring/cdktf-github-actions'

const pullRequestReviewCommentOptions: PullRequestReviewCommentOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@awlsring/cdktf-github-actions.PullRequestReviewCommentOptions.property.types">types</a></code> | <code>string[]</code> | Which activity types to trigger on. |

---

##### `types`<sup>Optional</sup> <a name="types" id="@awlsring/cdktf-github-actions.PullRequestReviewCommentOptions.property.types"></a>

```typescript
public readonly types: string[];
```

- *Type:* string[]

Which activity types to trigger on.

---

### PullRequestReviewOptions <a name="PullRequestReviewOptions" id="@awlsring/cdktf-github-actions.PullRequestReviewOptions"></a>

Pull request review options.

#### Initializer <a name="Initializer" id="@awlsring/cdktf-github-actions.PullRequestReviewOptions.Initializer"></a>

```typescript
import { PullRequestReviewOptions } from '@awlsring/cdktf-github-actions'

const pullRequestReviewOptions: PullRequestReviewOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@awlsring/cdktf-github-actions.PullRequestReviewOptions.property.types">types</a></code> | <code>string[]</code> | Which activity types to trigger on. |

---

##### `types`<sup>Optional</sup> <a name="types" id="@awlsring/cdktf-github-actions.PullRequestReviewOptions.property.types"></a>

```typescript
public readonly types: string[];
```

- *Type:* string[]

Which activity types to trigger on.

---

### PullRequestTargetOptions <a name="PullRequestTargetOptions" id="@awlsring/cdktf-github-actions.PullRequestTargetOptions"></a>

Pull request target options.

#### Initializer <a name="Initializer" id="@awlsring/cdktf-github-actions.PullRequestTargetOptions.Initializer"></a>

```typescript
import { PullRequestTargetOptions } from '@awlsring/cdktf-github-actions'

const pullRequestTargetOptions: PullRequestTargetOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@awlsring/cdktf-github-actions.PullRequestTargetOptions.property.branches">branches</a></code> | <code>string[]</code> | When using the push and pull_request events, you can configure a workflow to run on specific branches or tags. |
| <code><a href="#@awlsring/cdktf-github-actions.PullRequestTargetOptions.property.paths">paths</a></code> | <code>string[]</code> | When using the push and pull_request events, you can configure a workflow to run when at least one file does not match paths-ignore or at least one modified file matches the configured paths. |
| <code><a href="#@awlsring/cdktf-github-actions.PullRequestTargetOptions.property.tags">tags</a></code> | <code>string[]</code> | When using the push and pull_request events, you can configure a workflow to run on specific branches or tags. |
| <code><a href="#@awlsring/cdktf-github-actions.PullRequestTargetOptions.property.types">types</a></code> | <code>string[]</code> | Which activity types to trigger on. |

---

##### `branches`<sup>Optional</sup> <a name="branches" id="@awlsring/cdktf-github-actions.PullRequestTargetOptions.property.branches"></a>

```typescript
public readonly branches: string[];
```

- *Type:* string[]

When using the push and pull_request events, you can configure a workflow to run on specific branches or tags.

For a pull_request event, only
branches and tags on the base are evaluated. If you define only tags or
only branches, the workflow won't run for events affecting the undefined
Git ref.

> [https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#filter-pattern-cheat-sheet](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#filter-pattern-cheat-sheet)

---

##### `paths`<sup>Optional</sup> <a name="paths" id="@awlsring/cdktf-github-actions.PullRequestTargetOptions.property.paths"></a>

```typescript
public readonly paths: string[];
```

- *Type:* string[]

When using the push and pull_request events, you can configure a workflow to run when at least one file does not match paths-ignore or at least one modified file matches the configured paths.

Path filters are not
evaluated for pushes to tags.

> [https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#filter-pattern-cheat-sheet](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#filter-pattern-cheat-sheet)

---

##### `tags`<sup>Optional</sup> <a name="tags" id="@awlsring/cdktf-github-actions.PullRequestTargetOptions.property.tags"></a>

```typescript
public readonly tags: string[];
```

- *Type:* string[]

When using the push and pull_request events, you can configure a workflow to run on specific branches or tags.

For a pull_request event, only
branches and tags on the base are evaluated. If you define only tags or
only branches, the workflow won't run for events affecting the undefined
Git ref.

> [https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#filter-pattern-cheat-sheet](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#filter-pattern-cheat-sheet)

---

##### `types`<sup>Optional</sup> <a name="types" id="@awlsring/cdktf-github-actions.PullRequestTargetOptions.property.types"></a>

```typescript
public readonly types: string[];
```

- *Type:* string[]

Which activity types to trigger on.

---

### PushOptions <a name="PushOptions" id="@awlsring/cdktf-github-actions.PushOptions"></a>

Options for push-like events.

#### Initializer <a name="Initializer" id="@awlsring/cdktf-github-actions.PushOptions.Initializer"></a>

```typescript
import { PushOptions } from '@awlsring/cdktf-github-actions'

const pushOptions: PushOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@awlsring/cdktf-github-actions.PushOptions.property.branches">branches</a></code> | <code>string[]</code> | When using the push and pull_request events, you can configure a workflow to run on specific branches or tags. |
| <code><a href="#@awlsring/cdktf-github-actions.PushOptions.property.paths">paths</a></code> | <code>string[]</code> | When using the push and pull_request events, you can configure a workflow to run when at least one file does not match paths-ignore or at least one modified file matches the configured paths. |
| <code><a href="#@awlsring/cdktf-github-actions.PushOptions.property.tags">tags</a></code> | <code>string[]</code> | When using the push and pull_request events, you can configure a workflow to run on specific branches or tags. |

---

##### `branches`<sup>Optional</sup> <a name="branches" id="@awlsring/cdktf-github-actions.PushOptions.property.branches"></a>

```typescript
public readonly branches: string[];
```

- *Type:* string[]

When using the push and pull_request events, you can configure a workflow to run on specific branches or tags.

For a pull_request event, only
branches and tags on the base are evaluated. If you define only tags or
only branches, the workflow won't run for events affecting the undefined
Git ref.

> [https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#filter-pattern-cheat-sheet](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#filter-pattern-cheat-sheet)

---

##### `paths`<sup>Optional</sup> <a name="paths" id="@awlsring/cdktf-github-actions.PushOptions.property.paths"></a>

```typescript
public readonly paths: string[];
```

- *Type:* string[]

When using the push and pull_request events, you can configure a workflow to run when at least one file does not match paths-ignore or at least one modified file matches the configured paths.

Path filters are not
evaluated for pushes to tags.

> [https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#filter-pattern-cheat-sheet](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#filter-pattern-cheat-sheet)

---

##### `tags`<sup>Optional</sup> <a name="tags" id="@awlsring/cdktf-github-actions.PushOptions.property.tags"></a>

```typescript
public readonly tags: string[];
```

- *Type:* string[]

When using the push and pull_request events, you can configure a workflow to run on specific branches or tags.

For a pull_request event, only
branches and tags on the base are evaluated. If you define only tags or
only branches, the workflow won't run for events affecting the undefined
Git ref.

> [https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#filter-pattern-cheat-sheet](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#filter-pattern-cheat-sheet)

---

### RegistryPackageOptions <a name="RegistryPackageOptions" id="@awlsring/cdktf-github-actions.RegistryPackageOptions"></a>

Registry package options.

#### Initializer <a name="Initializer" id="@awlsring/cdktf-github-actions.RegistryPackageOptions.Initializer"></a>

```typescript
import { RegistryPackageOptions } from '@awlsring/cdktf-github-actions'

const registryPackageOptions: RegistryPackageOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@awlsring/cdktf-github-actions.RegistryPackageOptions.property.types">types</a></code> | <code>string[]</code> | Which activity types to trigger on. |

---

##### `types`<sup>Optional</sup> <a name="types" id="@awlsring/cdktf-github-actions.RegistryPackageOptions.property.types"></a>

```typescript
public readonly types: string[];
```

- *Type:* string[]

Which activity types to trigger on.

---

### ReleaseOptions <a name="ReleaseOptions" id="@awlsring/cdktf-github-actions.ReleaseOptions"></a>

Release options.

#### Initializer <a name="Initializer" id="@awlsring/cdktf-github-actions.ReleaseOptions.Initializer"></a>

```typescript
import { ReleaseOptions } from '@awlsring/cdktf-github-actions'

const releaseOptions: ReleaseOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@awlsring/cdktf-github-actions.ReleaseOptions.property.types">types</a></code> | <code>string[]</code> | Which activity types to trigger on. |

---

##### `types`<sup>Optional</sup> <a name="types" id="@awlsring/cdktf-github-actions.ReleaseOptions.property.types"></a>

```typescript
public readonly types: string[];
```

- *Type:* string[]

Which activity types to trigger on.

---

### RepositoryDispatchOptions <a name="RepositoryDispatchOptions" id="@awlsring/cdktf-github-actions.RepositoryDispatchOptions"></a>

Repository dispatch options.

#### Initializer <a name="Initializer" id="@awlsring/cdktf-github-actions.RepositoryDispatchOptions.Initializer"></a>

```typescript
import { RepositoryDispatchOptions } from '@awlsring/cdktf-github-actions'

const repositoryDispatchOptions: RepositoryDispatchOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@awlsring/cdktf-github-actions.RepositoryDispatchOptions.property.types">types</a></code> | <code>string[]</code> | Which activity types to trigger on. |

---

##### `types`<sup>Optional</sup> <a name="types" id="@awlsring/cdktf-github-actions.RepositoryDispatchOptions.property.types"></a>

```typescript
public readonly types: string[];
```

- *Type:* string[]

Which activity types to trigger on.

---

### RunSettings <a name="RunSettings" id="@awlsring/cdktf-github-actions.RunSettings"></a>

Run settings for a job.

#### Initializer <a name="Initializer" id="@awlsring/cdktf-github-actions.RunSettings.Initializer"></a>

```typescript
import { RunSettings } from '@awlsring/cdktf-github-actions'

const runSettings: RunSettings = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@awlsring/cdktf-github-actions.RunSettings.property.shell">shell</a></code> | <code>string</code> | Which shell to use for running the step. |
| <code><a href="#@awlsring/cdktf-github-actions.RunSettings.property.workingDirectory">workingDirectory</a></code> | <code>string</code> | Working directory to use when running the step. |

---

##### `shell`<sup>Optional</sup> <a name="shell" id="@awlsring/cdktf-github-actions.RunSettings.property.shell"></a>

```typescript
public readonly shell: string;
```

- *Type:* string

Which shell to use for running the step.

---

*Example*

```typescript
"bash"
```


##### `workingDirectory`<sup>Optional</sup> <a name="workingDirectory" id="@awlsring/cdktf-github-actions.RunSettings.property.workingDirectory"></a>

```typescript
public readonly workingDirectory: string;
```

- *Type:* string

Working directory to use when running the step.

---

### SecretsOptions <a name="SecretsOptions" id="@awlsring/cdktf-github-actions.SecretsOptions"></a>

#### Initializer <a name="Initializer" id="@awlsring/cdktf-github-actions.SecretsOptions.Initializer"></a>

```typescript
import { SecretsOptions } from '@awlsring/cdktf-github-actions'

const secretsOptions: SecretsOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@awlsring/cdktf-github-actions.SecretsOptions.property.referencedName">referencedName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@awlsring/cdktf-github-actions.SecretsOptions.property.secretName">secretName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@awlsring/cdktf-github-actions.SecretsOptions.property.secretValue">secretValue</a></code> | <code>string</code> | *No description.* |

---

##### `referencedName`<sup>Required</sup> <a name="referencedName" id="@awlsring/cdktf-github-actions.SecretsOptions.property.referencedName"></a>

```typescript
public readonly referencedName: string;
```

- *Type:* string

---

##### `secretName`<sup>Required</sup> <a name="secretName" id="@awlsring/cdktf-github-actions.SecretsOptions.property.secretName"></a>

```typescript
public readonly secretName: string;
```

- *Type:* string

---

##### `secretValue`<sup>Required</sup> <a name="secretValue" id="@awlsring/cdktf-github-actions.SecretsOptions.property.secretValue"></a>

```typescript
public readonly secretValue: string;
```

- *Type:* string

---

### StatusOptions <a name="StatusOptions" id="@awlsring/cdktf-github-actions.StatusOptions"></a>

The Status event accepts no options.

#### Initializer <a name="Initializer" id="@awlsring/cdktf-github-actions.StatusOptions.Initializer"></a>

```typescript
import { StatusOptions } from '@awlsring/cdktf-github-actions'

const statusOptions: StatusOptions = { ... }
```


### WatchOptions <a name="WatchOptions" id="@awlsring/cdktf-github-actions.WatchOptions"></a>

Watch options.

#### Initializer <a name="Initializer" id="@awlsring/cdktf-github-actions.WatchOptions.Initializer"></a>

```typescript
import { WatchOptions } from '@awlsring/cdktf-github-actions'

const watchOptions: WatchOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@awlsring/cdktf-github-actions.WatchOptions.property.types">types</a></code> | <code>string[]</code> | Which activity types to trigger on. |

---

##### `types`<sup>Optional</sup> <a name="types" id="@awlsring/cdktf-github-actions.WatchOptions.property.types"></a>

```typescript
public readonly types: string[];
```

- *Type:* string[]

Which activity types to trigger on.

---

### WorkflowDispatchOptions <a name="WorkflowDispatchOptions" id="@awlsring/cdktf-github-actions.WorkflowDispatchOptions"></a>

The Workflow dispatch event accepts no options.

#### Initializer <a name="Initializer" id="@awlsring/cdktf-github-actions.WorkflowDispatchOptions.Initializer"></a>

```typescript
import { WorkflowDispatchOptions } from '@awlsring/cdktf-github-actions'

const workflowDispatchOptions: WorkflowDispatchOptions = { ... }
```


### WorkflowProps <a name="WorkflowProps" id="@awlsring/cdktf-github-actions.WorkflowProps"></a>

#### Initializer <a name="Initializer" id="@awlsring/cdktf-github-actions.WorkflowProps.Initializer"></a>

```typescript
import { WorkflowProps } from '@awlsring/cdktf-github-actions'

const workflowProps: WorkflowProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@awlsring/cdktf-github-actions.WorkflowProps.property.repoName">repoName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@awlsring/cdktf-github-actions.WorkflowProps.property.jobs">jobs</a></code> | <code><a href="#@awlsring/cdktf-github-actions.Job">Job</a>[]</code> | *No description.* |
| <code><a href="#@awlsring/cdktf-github-actions.WorkflowProps.property.workflowName">workflowName</a></code> | <code>string</code> | Name of the workflow file. |
| <code><a href="#@awlsring/cdktf-github-actions.WorkflowProps.property.workflowPath">workflowPath</a></code> | <code>string</code> | File path where the workflow should be synthesized. |
| <code><a href="#@awlsring/cdktf-github-actions.WorkflowProps.property.workflowTriggers">workflowTriggers</a></code> | <code><a href="#@awlsring/cdktf-github-actions.WorkflowTriggers">WorkflowTriggers</a></code> | GitHub workflow triggers. |

---

##### `repoName`<sup>Required</sup> <a name="repoName" id="@awlsring/cdktf-github-actions.WorkflowProps.property.repoName"></a>

```typescript
public readonly repoName: string;
```

- *Type:* string

---

##### `jobs`<sup>Optional</sup> <a name="jobs" id="@awlsring/cdktf-github-actions.WorkflowProps.property.jobs"></a>

```typescript
public readonly jobs: Job[];
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.Job">Job</a>[]

---

##### `workflowName`<sup>Optional</sup> <a name="workflowName" id="@awlsring/cdktf-github-actions.WorkflowProps.property.workflowName"></a>

```typescript
public readonly workflowName: string;
```

- *Type:* string
- *Default:* "deploy"

Name of the workflow file.

---

##### `workflowPath`<sup>Optional</sup> <a name="workflowPath" id="@awlsring/cdktf-github-actions.WorkflowProps.property.workflowPath"></a>

```typescript
public readonly workflowPath: string;
```

- *Type:* string
- *Default:* ".github/workflows/deploy.yml"

File path where the workflow should be synthesized.

---

##### `workflowTriggers`<sup>Optional</sup> <a name="workflowTriggers" id="@awlsring/cdktf-github-actions.WorkflowProps.property.workflowTriggers"></a>

```typescript
public readonly workflowTriggers: WorkflowTriggers;
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.WorkflowTriggers">WorkflowTriggers</a>
- *Default:* By default, workflow is triggered on push to the `main` branch and can also be triggered manually (`workflow_dispatch`).

GitHub workflow triggers.

---

### WorkflowRunOptions <a name="WorkflowRunOptions" id="@awlsring/cdktf-github-actions.WorkflowRunOptions"></a>

Workflow run options.

#### Initializer <a name="Initializer" id="@awlsring/cdktf-github-actions.WorkflowRunOptions.Initializer"></a>

```typescript
import { WorkflowRunOptions } from '@awlsring/cdktf-github-actions'

const workflowRunOptions: WorkflowRunOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@awlsring/cdktf-github-actions.WorkflowRunOptions.property.types">types</a></code> | <code>string[]</code> | Which activity types to trigger on. |

---

##### `types`<sup>Optional</sup> <a name="types" id="@awlsring/cdktf-github-actions.WorkflowRunOptions.property.types"></a>

```typescript
public readonly types: string[];
```

- *Type:* string[]

Which activity types to trigger on.

---

### WorkflowTriggers <a name="WorkflowTriggers" id="@awlsring/cdktf-github-actions.WorkflowTriggers"></a>

The set of available triggers for GitHub Workflows.

> [https://docs.github.com/en/actions/reference/events-that-trigger-workflows](https://docs.github.com/en/actions/reference/events-that-trigger-workflows)

#### Initializer <a name="Initializer" id="@awlsring/cdktf-github-actions.WorkflowTriggers.Initializer"></a>

```typescript
import { WorkflowTriggers } from '@awlsring/cdktf-github-actions'

const workflowTriggers: WorkflowTriggers = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@awlsring/cdktf-github-actions.WorkflowTriggers.property.checkRun">checkRun</a></code> | <code><a href="#@awlsring/cdktf-github-actions.CheckRunOptions">CheckRunOptions</a></code> | Runs your workflow anytime the check_run event occurs. |
| <code><a href="#@awlsring/cdktf-github-actions.WorkflowTriggers.property.checkSuite">checkSuite</a></code> | <code><a href="#@awlsring/cdktf-github-actions.CheckSuiteOptions">CheckSuiteOptions</a></code> | Runs your workflow anytime the check_suite event occurs. |
| <code><a href="#@awlsring/cdktf-github-actions.WorkflowTriggers.property.create">create</a></code> | <code><a href="#@awlsring/cdktf-github-actions.CreateOptions">CreateOptions</a></code> | Runs your workflow anytime someone creates a branch or tag, which triggers the create event. |
| <code><a href="#@awlsring/cdktf-github-actions.WorkflowTriggers.property.delete">delete</a></code> | <code><a href="#@awlsring/cdktf-github-actions.DeleteOptions">DeleteOptions</a></code> | Runs your workflow anytime someone deletes a branch or tag, which triggers the delete event. |
| <code><a href="#@awlsring/cdktf-github-actions.WorkflowTriggers.property.deployment">deployment</a></code> | <code><a href="#@awlsring/cdktf-github-actions.DeploymentOptions">DeploymentOptions</a></code> | Runs your workflow anytime someone creates a deployment, which triggers the deployment event. |
| <code><a href="#@awlsring/cdktf-github-actions.WorkflowTriggers.property.deploymentStatus">deploymentStatus</a></code> | <code><a href="#@awlsring/cdktf-github-actions.DeploymentStatusOptions">DeploymentStatusOptions</a></code> | Runs your workflow anytime a third party provides a deployment status, which triggers the deployment_status event. |
| <code><a href="#@awlsring/cdktf-github-actions.WorkflowTriggers.property.fork">fork</a></code> | <code><a href="#@awlsring/cdktf-github-actions.ForkOptions">ForkOptions</a></code> | Runs your workflow anytime when someone forks a repository, which triggers the fork event. |
| <code><a href="#@awlsring/cdktf-github-actions.WorkflowTriggers.property.gollum">gollum</a></code> | <code><a href="#@awlsring/cdktf-github-actions.GollumOptions">GollumOptions</a></code> | Runs your workflow when someone creates or updates a Wiki page, which triggers the gollum event. |
| <code><a href="#@awlsring/cdktf-github-actions.WorkflowTriggers.property.issueComment">issueComment</a></code> | <code><a href="#@awlsring/cdktf-github-actions.IssueCommentOptions">IssueCommentOptions</a></code> | Runs your workflow anytime the issue_comment event occurs. |
| <code><a href="#@awlsring/cdktf-github-actions.WorkflowTriggers.property.issues">issues</a></code> | <code><a href="#@awlsring/cdktf-github-actions.IssuesOptions">IssuesOptions</a></code> | Runs your workflow anytime the issues event occurs. |
| <code><a href="#@awlsring/cdktf-github-actions.WorkflowTriggers.property.label">label</a></code> | <code><a href="#@awlsring/cdktf-github-actions.LabelOptions">LabelOptions</a></code> | Runs your workflow anytime the label event occurs. |
| <code><a href="#@awlsring/cdktf-github-actions.WorkflowTriggers.property.milestone">milestone</a></code> | <code><a href="#@awlsring/cdktf-github-actions.MilestoneOptions">MilestoneOptions</a></code> | Runs your workflow anytime the milestone event occurs. |
| <code><a href="#@awlsring/cdktf-github-actions.WorkflowTriggers.property.pageBuild">pageBuild</a></code> | <code><a href="#@awlsring/cdktf-github-actions.PageBuildOptions">PageBuildOptions</a></code> | Runs your workflow anytime someone pushes to a GitHub Pages-enabled branch, which triggers the page_build event. |
| <code><a href="#@awlsring/cdktf-github-actions.WorkflowTriggers.property.project">project</a></code> | <code><a href="#@awlsring/cdktf-github-actions.ProjectOptions">ProjectOptions</a></code> | Runs your workflow anytime the project event occurs. |
| <code><a href="#@awlsring/cdktf-github-actions.WorkflowTriggers.property.projectCard">projectCard</a></code> | <code><a href="#@awlsring/cdktf-github-actions.ProjectCardOptions">ProjectCardOptions</a></code> | Runs your workflow anytime the project_card event occurs. |
| <code><a href="#@awlsring/cdktf-github-actions.WorkflowTriggers.property.projectColumn">projectColumn</a></code> | <code><a href="#@awlsring/cdktf-github-actions.ProjectColumnOptions">ProjectColumnOptions</a></code> | Runs your workflow anytime the project_column event occurs. |
| <code><a href="#@awlsring/cdktf-github-actions.WorkflowTriggers.property.public">public</a></code> | <code><a href="#@awlsring/cdktf-github-actions.PublicOptions">PublicOptions</a></code> | Runs your workflow anytime someone makes a private repository public, which triggers the public event. |
| <code><a href="#@awlsring/cdktf-github-actions.WorkflowTriggers.property.pullRequest">pullRequest</a></code> | <code><a href="#@awlsring/cdktf-github-actions.PullRequestOptions">PullRequestOptions</a></code> | Runs your workflow anytime the pull_request event occurs. |
| <code><a href="#@awlsring/cdktf-github-actions.WorkflowTriggers.property.pullRequestReview">pullRequestReview</a></code> | <code><a href="#@awlsring/cdktf-github-actions.PullRequestReviewOptions">PullRequestReviewOptions</a></code> | Runs your workflow anytime the pull_request_review event occurs. |
| <code><a href="#@awlsring/cdktf-github-actions.WorkflowTriggers.property.pullRequestReviewComment">pullRequestReviewComment</a></code> | <code><a href="#@awlsring/cdktf-github-actions.PullRequestReviewCommentOptions">PullRequestReviewCommentOptions</a></code> | Runs your workflow anytime a comment on a pull request's unified diff is modified, which triggers the pull_request_review_comment event. |
| <code><a href="#@awlsring/cdktf-github-actions.WorkflowTriggers.property.pullRequestTarget">pullRequestTarget</a></code> | <code><a href="#@awlsring/cdktf-github-actions.PullRequestTargetOptions">PullRequestTargetOptions</a></code> | This event runs in the context of the base of the pull request, rather than in the merge commit as the pull_request event does. |
| <code><a href="#@awlsring/cdktf-github-actions.WorkflowTriggers.property.push">push</a></code> | <code><a href="#@awlsring/cdktf-github-actions.PushOptions">PushOptions</a></code> | Runs your workflow when someone pushes to a repository branch, which triggers the push event. |
| <code><a href="#@awlsring/cdktf-github-actions.WorkflowTriggers.property.registryPackage">registryPackage</a></code> | <code><a href="#@awlsring/cdktf-github-actions.RegistryPackageOptions">RegistryPackageOptions</a></code> | Runs your workflow anytime a package is published or updated. |
| <code><a href="#@awlsring/cdktf-github-actions.WorkflowTriggers.property.release">release</a></code> | <code><a href="#@awlsring/cdktf-github-actions.ReleaseOptions">ReleaseOptions</a></code> | Runs your workflow anytime the release event occurs. |
| <code><a href="#@awlsring/cdktf-github-actions.WorkflowTriggers.property.repositoryDispatch">repositoryDispatch</a></code> | <code><a href="#@awlsring/cdktf-github-actions.RepositoryDispatchOptions">RepositoryDispatchOptions</a></code> | You can use the GitHub API to trigger a webhook event called repository_dispatch when you want to trigger a workflow for activity that happens outside of GitHub. |
| <code><a href="#@awlsring/cdktf-github-actions.WorkflowTriggers.property.schedule">schedule</a></code> | <code><a href="#@awlsring/cdktf-github-actions.CronScheduleOptions">CronScheduleOptions</a>[]</code> | You can schedule a workflow to run at specific UTC times using POSIX cron syntax. |
| <code><a href="#@awlsring/cdktf-github-actions.WorkflowTriggers.property.status">status</a></code> | <code><a href="#@awlsring/cdktf-github-actions.StatusOptions">StatusOptions</a></code> | Runs your workflow anytime the status of a Git commit changes, which triggers the status event. |
| <code><a href="#@awlsring/cdktf-github-actions.WorkflowTriggers.property.watch">watch</a></code> | <code><a href="#@awlsring/cdktf-github-actions.WatchOptions">WatchOptions</a></code> | Runs your workflow anytime the watch event occurs. |
| <code><a href="#@awlsring/cdktf-github-actions.WorkflowTriggers.property.workflowDispatch">workflowDispatch</a></code> | <code><a href="#@awlsring/cdktf-github-actions.WorkflowDispatchOptions">WorkflowDispatchOptions</a></code> | You can configure custom-defined input properties, default input values, and required inputs for the event directly in your workflow. |
| <code><a href="#@awlsring/cdktf-github-actions.WorkflowTriggers.property.workflowRun">workflowRun</a></code> | <code><a href="#@awlsring/cdktf-github-actions.WorkflowRunOptions">WorkflowRunOptions</a></code> | This event occurs when a workflow run is requested or completed, and allows you to execute a workflow based on the finished result of another workflow. |

---

##### `checkRun`<sup>Optional</sup> <a name="checkRun" id="@awlsring/cdktf-github-actions.WorkflowTriggers.property.checkRun"></a>

```typescript
public readonly checkRun: CheckRunOptions;
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.CheckRunOptions">CheckRunOptions</a>

Runs your workflow anytime the check_run event occurs.

---

##### `checkSuite`<sup>Optional</sup> <a name="checkSuite" id="@awlsring/cdktf-github-actions.WorkflowTriggers.property.checkSuite"></a>

```typescript
public readonly checkSuite: CheckSuiteOptions;
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.CheckSuiteOptions">CheckSuiteOptions</a>

Runs your workflow anytime the check_suite event occurs.

---

##### `create`<sup>Optional</sup> <a name="create" id="@awlsring/cdktf-github-actions.WorkflowTriggers.property.create"></a>

```typescript
public readonly create: CreateOptions;
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.CreateOptions">CreateOptions</a>

Runs your workflow anytime someone creates a branch or tag, which triggers the create event.

---

##### `delete`<sup>Optional</sup> <a name="delete" id="@awlsring/cdktf-github-actions.WorkflowTriggers.property.delete"></a>

```typescript
public readonly delete: DeleteOptions;
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.DeleteOptions">DeleteOptions</a>

Runs your workflow anytime someone deletes a branch or tag, which triggers the delete event.

---

##### `deployment`<sup>Optional</sup> <a name="deployment" id="@awlsring/cdktf-github-actions.WorkflowTriggers.property.deployment"></a>

```typescript
public readonly deployment: DeploymentOptions;
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.DeploymentOptions">DeploymentOptions</a>

Runs your workflow anytime someone creates a deployment, which triggers the deployment event.

Deployments created with a commit SHA may not have
a Git ref.

---

##### `deploymentStatus`<sup>Optional</sup> <a name="deploymentStatus" id="@awlsring/cdktf-github-actions.WorkflowTriggers.property.deploymentStatus"></a>

```typescript
public readonly deploymentStatus: DeploymentStatusOptions;
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.DeploymentStatusOptions">DeploymentStatusOptions</a>

Runs your workflow anytime a third party provides a deployment status, which triggers the deployment_status event.

Deployments created with a
commit SHA may not have a Git ref.

---

##### `fork`<sup>Optional</sup> <a name="fork" id="@awlsring/cdktf-github-actions.WorkflowTriggers.property.fork"></a>

```typescript
public readonly fork: ForkOptions;
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.ForkOptions">ForkOptions</a>

Runs your workflow anytime when someone forks a repository, which triggers the fork event.

---

##### `gollum`<sup>Optional</sup> <a name="gollum" id="@awlsring/cdktf-github-actions.WorkflowTriggers.property.gollum"></a>

```typescript
public readonly gollum: GollumOptions;
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.GollumOptions">GollumOptions</a>

Runs your workflow when someone creates or updates a Wiki page, which triggers the gollum event.

---

##### `issueComment`<sup>Optional</sup> <a name="issueComment" id="@awlsring/cdktf-github-actions.WorkflowTriggers.property.issueComment"></a>

```typescript
public readonly issueComment: IssueCommentOptions;
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.IssueCommentOptions">IssueCommentOptions</a>

Runs your workflow anytime the issue_comment event occurs.

---

##### `issues`<sup>Optional</sup> <a name="issues" id="@awlsring/cdktf-github-actions.WorkflowTriggers.property.issues"></a>

```typescript
public readonly issues: IssuesOptions;
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.IssuesOptions">IssuesOptions</a>

Runs your workflow anytime the issues event occurs.

---

##### `label`<sup>Optional</sup> <a name="label" id="@awlsring/cdktf-github-actions.WorkflowTriggers.property.label"></a>

```typescript
public readonly label: LabelOptions;
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.LabelOptions">LabelOptions</a>

Runs your workflow anytime the label event occurs.

---

##### `milestone`<sup>Optional</sup> <a name="milestone" id="@awlsring/cdktf-github-actions.WorkflowTriggers.property.milestone"></a>

```typescript
public readonly milestone: MilestoneOptions;
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.MilestoneOptions">MilestoneOptions</a>

Runs your workflow anytime the milestone event occurs.

---

##### `pageBuild`<sup>Optional</sup> <a name="pageBuild" id="@awlsring/cdktf-github-actions.WorkflowTriggers.property.pageBuild"></a>

```typescript
public readonly pageBuild: PageBuildOptions;
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.PageBuildOptions">PageBuildOptions</a>

Runs your workflow anytime someone pushes to a GitHub Pages-enabled branch, which triggers the page_build event.

---

##### `project`<sup>Optional</sup> <a name="project" id="@awlsring/cdktf-github-actions.WorkflowTriggers.property.project"></a>

```typescript
public readonly project: ProjectOptions;
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.ProjectOptions">ProjectOptions</a>

Runs your workflow anytime the project event occurs.

---

##### `projectCard`<sup>Optional</sup> <a name="projectCard" id="@awlsring/cdktf-github-actions.WorkflowTriggers.property.projectCard"></a>

```typescript
public readonly projectCard: ProjectCardOptions;
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.ProjectCardOptions">ProjectCardOptions</a>

Runs your workflow anytime the project_card event occurs.

---

##### `projectColumn`<sup>Optional</sup> <a name="projectColumn" id="@awlsring/cdktf-github-actions.WorkflowTriggers.property.projectColumn"></a>

```typescript
public readonly projectColumn: ProjectColumnOptions;
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.ProjectColumnOptions">ProjectColumnOptions</a>

Runs your workflow anytime the project_column event occurs.

---

##### `public`<sup>Optional</sup> <a name="public" id="@awlsring/cdktf-github-actions.WorkflowTriggers.property.public"></a>

```typescript
public readonly public: PublicOptions;
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.PublicOptions">PublicOptions</a>

Runs your workflow anytime someone makes a private repository public, which triggers the public event.

---

##### `pullRequest`<sup>Optional</sup> <a name="pullRequest" id="@awlsring/cdktf-github-actions.WorkflowTriggers.property.pullRequest"></a>

```typescript
public readonly pullRequest: PullRequestOptions;
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.PullRequestOptions">PullRequestOptions</a>

Runs your workflow anytime the pull_request event occurs.

---

##### `pullRequestReview`<sup>Optional</sup> <a name="pullRequestReview" id="@awlsring/cdktf-github-actions.WorkflowTriggers.property.pullRequestReview"></a>

```typescript
public readonly pullRequestReview: PullRequestReviewOptions;
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.PullRequestReviewOptions">PullRequestReviewOptions</a>

Runs your workflow anytime the pull_request_review event occurs.

---

##### `pullRequestReviewComment`<sup>Optional</sup> <a name="pullRequestReviewComment" id="@awlsring/cdktf-github-actions.WorkflowTriggers.property.pullRequestReviewComment"></a>

```typescript
public readonly pullRequestReviewComment: PullRequestReviewCommentOptions;
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.PullRequestReviewCommentOptions">PullRequestReviewCommentOptions</a>

Runs your workflow anytime a comment on a pull request's unified diff is modified, which triggers the pull_request_review_comment event.

---

##### `pullRequestTarget`<sup>Optional</sup> <a name="pullRequestTarget" id="@awlsring/cdktf-github-actions.WorkflowTriggers.property.pullRequestTarget"></a>

```typescript
public readonly pullRequestTarget: PullRequestTargetOptions;
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.PullRequestTargetOptions">PullRequestTargetOptions</a>

This event runs in the context of the base of the pull request, rather than in the merge commit as the pull_request event does.

This prevents
executing unsafe workflow code from the head of the pull request that
could alter your repository or steal any secrets you use in your workflow.
This event allows you to do things like create workflows that label and
comment on pull requests based on the contents of the event payload.

WARNING: The `pull_request_target` event is granted read/write repository
token and can access secrets, even when it is triggered from a fork.
Although the workflow runs in the context of the base of the pull request,
you should make sure that you do not check out, build, or run untrusted
code from the pull request with this event. Additionally, any caches
share the same scope as the base branch, and to help prevent cache
poisoning, you should not save the cache if there is a possibility that
the cache contents were altered.

> [https://securitylab.github.com/research/github-actions-preventing-pwn-requests](https://securitylab.github.com/research/github-actions-preventing-pwn-requests)

---

##### `push`<sup>Optional</sup> <a name="push" id="@awlsring/cdktf-github-actions.WorkflowTriggers.property.push"></a>

```typescript
public readonly push: PushOptions;
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.PushOptions">PushOptions</a>

Runs your workflow when someone pushes to a repository branch, which triggers the push event.

---

##### `registryPackage`<sup>Optional</sup> <a name="registryPackage" id="@awlsring/cdktf-github-actions.WorkflowTriggers.property.registryPackage"></a>

```typescript
public readonly registryPackage: RegistryPackageOptions;
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.RegistryPackageOptions">RegistryPackageOptions</a>

Runs your workflow anytime a package is published or updated.

---

##### `release`<sup>Optional</sup> <a name="release" id="@awlsring/cdktf-github-actions.WorkflowTriggers.property.release"></a>

```typescript
public readonly release: ReleaseOptions;
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.ReleaseOptions">ReleaseOptions</a>

Runs your workflow anytime the release event occurs.

---

##### `repositoryDispatch`<sup>Optional</sup> <a name="repositoryDispatch" id="@awlsring/cdktf-github-actions.WorkflowTriggers.property.repositoryDispatch"></a>

```typescript
public readonly repositoryDispatch: RepositoryDispatchOptions;
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.RepositoryDispatchOptions">RepositoryDispatchOptions</a>

You can use the GitHub API to trigger a webhook event called repository_dispatch when you want to trigger a workflow for activity that happens outside of GitHub.

---

##### `schedule`<sup>Optional</sup> <a name="schedule" id="@awlsring/cdktf-github-actions.WorkflowTriggers.property.schedule"></a>

```typescript
public readonly schedule: CronScheduleOptions[];
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.CronScheduleOptions">CronScheduleOptions</a>[]

You can schedule a workflow to run at specific UTC times using POSIX cron syntax.

Scheduled workflows run on the latest commit on the default or
base branch. The shortest interval you can run scheduled workflows is
once every 5 minutes.

> [https://pubs.opengroup.org/onlinepubs/9699919799/utilities/crontab.html#tag_20_25_07](https://pubs.opengroup.org/onlinepubs/9699919799/utilities/crontab.html#tag_20_25_07)

---

##### `status`<sup>Optional</sup> <a name="status" id="@awlsring/cdktf-github-actions.WorkflowTriggers.property.status"></a>

```typescript
public readonly status: StatusOptions;
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.StatusOptions">StatusOptions</a>

Runs your workflow anytime the status of a Git commit changes, which triggers the status event.

---

##### `watch`<sup>Optional</sup> <a name="watch" id="@awlsring/cdktf-github-actions.WorkflowTriggers.property.watch"></a>

```typescript
public readonly watch: WatchOptions;
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.WatchOptions">WatchOptions</a>

Runs your workflow anytime the watch event occurs.

---

##### `workflowDispatch`<sup>Optional</sup> <a name="workflowDispatch" id="@awlsring/cdktf-github-actions.WorkflowTriggers.property.workflowDispatch"></a>

```typescript
public readonly workflowDispatch: WorkflowDispatchOptions;
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.WorkflowDispatchOptions">WorkflowDispatchOptions</a>

You can configure custom-defined input properties, default input values, and required inputs for the event directly in your workflow.

When the
workflow runs, you can access the input values in the github.event.inputs
context.

---

##### `workflowRun`<sup>Optional</sup> <a name="workflowRun" id="@awlsring/cdktf-github-actions.WorkflowTriggers.property.workflowRun"></a>

```typescript
public readonly workflowRun: WorkflowRunOptions;
```

- *Type:* <a href="#@awlsring/cdktf-github-actions.WorkflowRunOptions">WorkflowRunOptions</a>

This event occurs when a workflow run is requested or completed, and allows you to execute a workflow based on the finished result of another workflow.

A workflow run is triggered regardless of the result of the
previous workflow.

---

### YamlFileOptions <a name="YamlFileOptions" id="@awlsring/cdktf-github-actions.YamlFileOptions"></a>

Options for `YamlFile`.

#### Initializer <a name="Initializer" id="@awlsring/cdktf-github-actions.YamlFileOptions.Initializer"></a>

```typescript
import { YamlFileOptions } from '@awlsring/cdktf-github-actions'

const yamlFileOptions: YamlFileOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@awlsring/cdktf-github-actions.YamlFileOptions.property.obj">obj</a></code> | <code>any</code> | The object that will be serialized. |

---

##### `obj`<sup>Optional</sup> <a name="obj" id="@awlsring/cdktf-github-actions.YamlFileOptions.property.obj"></a>

```typescript
public readonly obj: any;
```

- *Type:* any
- *Default:* {} an empty object

The object that will be serialized.

You can modify the object's contents
before synthesis.

---

## Classes <a name="Classes" id="Classes"></a>

### YamlFile <a name="YamlFile" id="@awlsring/cdktf-github-actions.YamlFile"></a>

#### Initializers <a name="Initializers" id="@awlsring/cdktf-github-actions.YamlFile.Initializer"></a>

```typescript
import { YamlFile } from '@awlsring/cdktf-github-actions'

new YamlFile(filePath: string, options?: YamlFileOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@awlsring/cdktf-github-actions.YamlFile.Initializer.parameter.filePath">filePath</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@awlsring/cdktf-github-actions.YamlFile.Initializer.parameter.options">options</a></code> | <code><a href="#@awlsring/cdktf-github-actions.YamlFileOptions">YamlFileOptions</a></code> | *No description.* |

---

##### `filePath`<sup>Required</sup> <a name="filePath" id="@awlsring/cdktf-github-actions.YamlFile.Initializer.parameter.filePath"></a>

- *Type:* string

---

##### `options`<sup>Optional</sup> <a name="options" id="@awlsring/cdktf-github-actions.YamlFile.Initializer.parameter.options"></a>

- *Type:* <a href="#@awlsring/cdktf-github-actions.YamlFileOptions">YamlFileOptions</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@awlsring/cdktf-github-actions.YamlFile.toYaml">toYaml</a></code> | Returns the patched yaml file. |
| <code><a href="#@awlsring/cdktf-github-actions.YamlFile.update">update</a></code> | Update the output object. |
| <code><a href="#@awlsring/cdktf-github-actions.YamlFile.writeFile">writeFile</a></code> | Write the patched yaml file to the specified location. |

---

##### `toYaml` <a name="toYaml" id="@awlsring/cdktf-github-actions.YamlFile.toYaml"></a>

```typescript
public toYaml(): string
```

Returns the patched yaml file.

##### `update` <a name="update" id="@awlsring/cdktf-github-actions.YamlFile.update"></a>

```typescript
public update(obj: any): void
```

Update the output object.

###### `obj`<sup>Required</sup> <a name="obj" id="@awlsring/cdktf-github-actions.YamlFile.update.parameter.obj"></a>

- *Type:* any

---

##### `writeFile` <a name="writeFile" id="@awlsring/cdktf-github-actions.YamlFile.writeFile"></a>

```typescript
public writeFile(): void
```

Write the patched yaml file to the specified location.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@awlsring/cdktf-github-actions.YamlFile.property.commentAtTop">commentAtTop</a></code> | <code>string</code> | A comment to be added to the top of the YAML file. |

---

##### `commentAtTop`<sup>Optional</sup> <a name="commentAtTop" id="@awlsring/cdktf-github-actions.YamlFile.property.commentAtTop"></a>

```typescript
public readonly commentAtTop: string;
```

- *Type:* string

A comment to be added to the top of the YAML file.

Can be multiline. All non-empty line are pefixed with '# '. Empty lines are kept, but not

---



## Enums <a name="Enums" id="Enums"></a>

### JobPermission <a name="JobPermission" id="@awlsring/cdktf-github-actions.JobPermission"></a>

Access level for workflow permission scopes.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@awlsring/cdktf-github-actions.JobPermission.READ">READ</a></code> | Read-only access. |
| <code><a href="#@awlsring/cdktf-github-actions.JobPermission.WRITE">WRITE</a></code> | Read-write access. |
| <code><a href="#@awlsring/cdktf-github-actions.JobPermission.NONE">NONE</a></code> | No access at all. |

---

##### `READ` <a name="READ" id="@awlsring/cdktf-github-actions.JobPermission.READ"></a>

Read-only access.

---


##### `WRITE` <a name="WRITE" id="@awlsring/cdktf-github-actions.JobPermission.WRITE"></a>

Read-write access.

---


##### `NONE` <a name="NONE" id="@awlsring/cdktf-github-actions.JobPermission.NONE"></a>

No access at all.

---

