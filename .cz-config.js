'use strict'

module.exports = {
  types: [
    { value: 'feat', name: 'feat:     A new feature' },
    { value: 'fix', name: 'fix:      A bug fix' },
    { value: 'docs', name: 'docs:     仅文档更改' },
    {
      value: 'style',
      name: 'style:    不影响代码含义的更改（空格、格式、缺少分号等)'
    },
    {
      value: 'refactor',
      name: 'refactor: 既不修复错误也不添加功能的代码更改'
    },
    {
      value: 'perf',
      name: 'perf:     A code change that improves performance[性能]'
    },
    { value: 'test', name: 'test:     Adding missing tests' },
    {
      value: 'build',
      name: 'build:    影响构建系统或外部依赖项的更改'
    },
    {
      value: 'ci',
      name: 'ci:       对我们的 CI 配置文件和脚本的更改'
    },
    {
      value: 'chore',
      name: 'chore:    [零星工作]对构建过程或辅助工具的更改和诸如文档生成之类的库'
    },
    { value: 'revert', name: 'revert:   Revert to a commit' }
  ],
  scopes: [],
  // it needs to match the value for field type. Eg.: 'fix'
  /*
  scopeOverrides: {
    fix: [
      {name: 'merge'},
      {name: 'style'},
      {name: 'e2eTest'},
      {name: 'unitTest'}
    ]
  },
  */
  // override the messages, defaults are as follows
  messages: {
    type: '选择一种你的提交类型:',
    scope: '选择一个scope (可选):',
    // used if allowCustomScopes is true
    customScope: 'Denote the SCOPE of this change:',
    subject: '写一个简短的、重要的变化描述:\n',
    body: '提供更长时间的更改描述（可选）。使用“|”来打破新行：\n',
    breaking: '列出任何重大更改 (可选):\n',
    footer: '关联关闭的issue，例如：#31, #34(可选):\n',
    confirmCommit: '确定提交说明?'
  },

  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],

  // limit subject length
  subjectLimit: 100
}
