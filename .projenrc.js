const { cdktf } = require('projen');
const project = new cdktf.ConstructLibraryCdktf({
  author: 'awlsring',
  authorAddress: 'mattcanemail@gmail.com',
  cdktfVersion: '^0.14.3',
  constructsVersion: '^10.1.52',
  defaultReleaseBranch: 'main',
  name: 'cdktf-github-actions',
  repositoryUrl: 'https://github.com/awlsring/cdktf-github-actions.git',
  bundledDeps: ['yaml', 'decamelize'],
  packageName: '@awlsring/cdktf-github-actions',
  deps: [
    '@cdktf/provider-github',
    'decamelize@^5.0.1',
  ],
  peerDeps: [
    '@cdktf/provider-github',
  ],
  autoApproveUpgrades: true,
  autoApproveOptions: {
    secret: 'GITHUB_TOKEN',
    allowedUsernames: ['awlsring', 'mergify[bot]'],
  },
  projenUpgradeSecret: 'PROJEN_GITHUB_TOKEN',
  gitignore: [
    '.DS_Store',
    '**/*.js',
    '**/*.d.ts',
    'package-lock.json',
    'yarn.lock',
    '/test/__snapshots__/',
    '.gen',
    '.vscode',
    'cdktf.out',
    'terraform*',
    '.terraform*',
    'cdktf.json',
  ],
  // release
  npmAccess: NpmAccess.PUBLIC,
  releaseToNpm: true,
  publishToPypi: {
    distName: 'cdktf-github-actions',
    module: 'cdktf_github_actions',
  },
});

project.tsconfigDev.compilerOptions.esModuleInterop = false;
project.synth();