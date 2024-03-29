import { AwlsringCdktfLibrary } from '@awlsring/projen-commons';

const project = new AwlsringCdktfLibrary({
  cdktfVersion: '^0.14.0',
  constructsVersion: '^10.0.25',
  name: 'cdktf-github-actions',
  repositoryUrl: 'https://github.com/awlsring/cdktf-github-actions.git',
  bundledDeps: ['yaml', 'decamelize'],
  deps: [
    'decamelize@^5.0.1',
  ],
  peerDeps: [
    '@cdktf/provider-github@^5.0.0',
  ],
  publish: true,
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
  tsconfigDev: {
    compilerOptions: {
      esModuleInterop: false,
    },
  },
});

project.synth();