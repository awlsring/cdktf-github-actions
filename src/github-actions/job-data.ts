// yoinked from https://github.com/cdklabs/cdk-pipelines-github/blob/main/src/workflows-model.ts
// reference https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions

/**
 * A GitHub Workflow job definition.
 */
export interface JobData {
  /**
   * The type of machine to run the job on. The machine can be either a
   * GitHub-hosted runner or a self-hosted runner.
   *
   * @example ["ubuntu-latest"]
   */
  readonly runsOn: string[] | string;

  /**
   * A job contains a sequence of tasks called steps. Steps can run commands,
   * run setup tasks, or run an action in your repository, a public repository,
   * or an action published in a Docker registry. Not all steps run actions,
   * but all actions run as a step. Each step runs in its own process in the
   * runner environment and has access to the workspace and filesystem.
   * Because steps run in their own process, changes to environment variables
   * are not preserved between steps. GitHub provides built-in steps to set up
   * and complete a job.
   */
  readonly steps: JobStepData[];

  /**
   * The name of the job displayed on GitHub.
   */
  readonly name?: string;

  /**
   * Identifies any jobs that must complete successfully before this job will
   * run. It can be a string or array of strings. If a job fails, all jobs
   * that need it are skipped unless the jobs use a conditional expression
   * that causes the job to continue.
   */
  readonly needs?: string[];

  /**
   * You can modify the default permissions granted to the GITHUB_TOKEN, adding
   * or removing access as required, so that you only allow the minimum required
   * access.
   *
   * Use `{ contents: READ }` if your job only needs to clone code.
   *
   * This is intentionally a required field since it is required in order to
   * allow workflows to run in GitHub repositories with restricted default
   * access.
   *
   * @see https://docs.github.com/en/actions/reference/authentication-in-a-workflow#permissions-for-the-github_token
   */
  readonly permissions: JobPermissions;

  /**
   * The environment that the job references. All environment protection rules
   * must pass before a job referencing the environment is sent to a runner.
   *
   * @see https://docs.github.com/en/actions/reference/environments
   */
  readonly environment?: unknown;

  /**
   * Concurrency ensures that only a single job or workflow using the same
   * concurrency group will run at a time. A concurrency group can be any
   * string or expression. The expression can use any context except for the
   * secrets context.
   *
   * @experimental
   */
  readonly concurrency?: unknown;

  /**
   * A map of outputs for a job. Job outputs are available to all downstream
   * jobs that depend on this job.
   */
  readonly outputs?: Record<string, string>;

  /**
   * A map of environment variables that are available to all steps in the
   * job. You can also set environment variables for the entire workflow or an
   * individual step.
   */
  readonly env?: Record<string, string>;

  /**
   * A map of default settings that will apply to all steps in the job. You
   * can also set default settings for the entire workflow.
   */
  readonly defaults?: JobDefaults;

  /**
   * You can use the if conditional to prevent a job from running unless a
   * condition is met. You can use any supported context and expression to
   * create a conditional.
   */
  readonly if?: string;

  /**
   * The maximum number of minutes to let a job run before GitHub
   * automatically cancels it.
   *
   * @default 360
   */
  readonly timeoutMinutes?: number;

  /**
   * A strategy creates a build matrix for your jobs. You can define different
   * variations to run each job in.
   */
  readonly strategy?: JobStrategy;

  /**
   * Prevents a workflow run from failing when a job fails. Set to true to
   * allow a workflow run to pass when this job fails.
   */
  readonly continueOnError?: boolean;

  /**
   * A container to run any steps in a job that don't already specify a
   * container. If you have steps that use both script and container actions,
   * the container actions will run as sibling containers on the same network
   * with the same volume mounts.
   */
  readonly container?: ContainerOptions;

  /**
   * Used to host service containers for a job in a workflow. Service
   * containers are useful for creating databases or cache services like Redis.
   * The runner automatically creates a Docker network and manages the life
   * cycle of the service containers.
   */
  readonly services?: Record<string, ContainerOptions>;
}

/**
 * The available scopes and access values for workflow permissions. If you
 * specify the access for any of these scopes, all those that are not
 * specified are set to `JobPermission.NONE`, instead of the default behavior
 * when none is specified.
 */
export interface JobPermissions {
  readonly actions?: JobPermission;
  readonly checks?: JobPermission;
  readonly contents?: JobPermission;
  readonly deployments?: JobPermission;
  readonly idToken?: JobPermission;
  readonly issues?: JobPermission;
  readonly discussions?: JobPermission;
  readonly packages?: JobPermission;
  readonly pullRequests?: JobPermission;
  readonly repositoryProjects?: JobPermission;
  readonly securityEvents?: JobPermission;
  readonly statuses?: JobPermission;
}

/**
 * Access level for workflow permission scopes.
 */
export enum JobPermission {
  /** Read-only access */
  READ = 'read',

  /** Read-write access */
  WRITE = 'write',

  /** No access at all */
  NONE = 'none',
}

/**
 * Default settings for all steps in the job.
 */
export interface JobDefaults {
  /** Default run settings. */
  readonly run?: RunSettings;
}

/**
 * Run settings for a job.
 */
export interface RunSettings {
  /**
   * Which shell to use for running the step.
   *
   * @example "bash"
   */
  readonly shell?: string;

  /**
   * Working directory to use when running the step.
   */
  readonly workingDirectory?: string;
}

/**
 * A strategy creates a build matrix for your jobs. You can define different
 * variations to run each job in.
 */
export interface JobStrategy {
  /**
   * You can define a matrix of different job configurations. A matrix allows
   * you to create multiple jobs by performing variable substitution in a
   * single job definition. For example, you can use a matrix to create jobs
   * for more than one supported version of a programming language, operating
   * system, or tool. A matrix reuses the job's configuration and creates a
   * job for each matrix you configure.
   *
   * A job matrix can generate a maximum of 256 jobs per workflow run. This
   * limit also applies to self-hosted runners.
   */
  readonly matrix?: JobMatrix;

  /**
   * When set to true, GitHub cancels all in-progress jobs if any matrix job
   * fails. Default: true
   */
  readonly failFast?: boolean;

  /**
   * The maximum number of jobs that can run simultaneously when using a
   * matrix job strategy. By default, GitHub will maximize the number of jobs
   * run in parallel depending on the available runners on GitHub-hosted
   * virtual machines.
   */
  readonly maxParallel?: number;
}

/**
 * A job matrix.
 */
export interface JobMatrix {
  /**
   * Each option you define in the matrix has a key and value. The keys you
   * define become properties in the matrix context and you can reference the
   * property in other areas of your workflow file. For example, if you define
   * the key os that contains an array of operating systems, you can use the
   * matrix.os property as the value of the runs-on keyword to create a job
   * for each operating system.
   */
  readonly domain?: Record<string, string[]>;

  /**
   * You can add additional configuration options to a build matrix job that
   * already exists. For example, if you want to use a specific version of npm
   * when the job that uses windows-latest and version 8 of node runs, you can
   * use include to specify that additional option.
   */
  readonly include?: Array<Record<string, string>>;

  /**
   * You can remove a specific configurations defined in the build matrix
   * using the exclude option. Using exclude removes a job defined by the
   * build matrix.
   */
  readonly exclude?: Array<Record<string, string>>;
}

/**
 * A job step.
 */
export interface JobStepData {
  /**
   * A unique identifier for the step. You can use the id to reference the
   * step in contexts.
   */
  readonly id?: string;

  /**
   * You can use the if conditional to prevent a job from running unless a
   * condition is met. You can use any supported context and expression to
   * create a conditional.
   */
  readonly if?: string;

  /**
   * A name for your step to display on GitHub.
   */
  readonly name?: string;

  /**
   * Selects an action to run as part of a step in your job. An action is a
   * reusable unit of code. You can use an action defined in the same
   * repository as the workflow, a public repository, or in a published Docker
   * container image.
   */
  readonly uses?: string;

  /**
   * Runs command-line programs using the operating system's shell. If you do
   * not provide a name, the step name will default to the text specified in
   * the run command.
   */
  readonly run?: string;

  /**
   * A map of the input parameters defined by the action. Each input parameter
   * is a key/value pair. Input parameters are set as environment variables.
   * The variable is prefixed with INPUT_ and converted to upper case.
   */
  readonly with?: Record<string, any>;

  /**
   * Sets environment variables for steps to use in the runner environment.
   * You can also set environment variables for the entire workflow or a job.
   */
  readonly env?: Record<string, string>;

  /**
   * Prevents a job from failing when a step fails. Set to true to allow a job
   * to pass when this step fails.
   */
  readonly continueOnError?: boolean;

  /**
   * The maximum number of minutes to run the step before killing the process.
   */
  readonly timeoutMinutes?: number;
}

/**
 * Options petaining to container environments.
 */
export interface ContainerOptions {
  /**
   * The Docker image to use as the container to run the action. The value can
   * be the Docker Hub image name or a registry name.
   */
  readonly image: string;

  /**
   * f the image's container registry requires authentication to pull the
   * image, you can use credentials to set a map of the username and password.
   * The credentials are the same values that you would provide to the docker
   * login command.
   */
  readonly credentials?: ContainerCredentials;

  /**
   * Sets a map of environment variables in the container.
   */
  readonly env?: Record<string, string>;

  /**
   * Sets an array of ports to expose on the container.
   */
  readonly ports?: number[];

  /**
   * Sets an array of volumes for the container to use. You can use volumes to
   * share data between services or other steps in a job. You can specify
   * named Docker volumes, anonymous Docker volumes, or bind mounts on the
   * host.
   *
   * To specify a volume, you specify the source and destination path:
   * `<source>:<destinationPath>`.
   */
  readonly volumes?: string[];

  /**
   * Additional Docker container resource options.
   *
   * @see https://docs.docker.com/engine/reference/commandline/create/#options
   */
  readonly options?: string[];
}

/**
 * Credentials to use to authenticate to Docker registries.
 */
export interface ContainerCredentials {
  /** The username. */
  readonly username: string;

  /** The password. */
  readonly password: string;
}