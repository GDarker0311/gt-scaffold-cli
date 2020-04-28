#!/usr/bin/env node
const { resolve } = require('path')
const program = require('commander') // 命令行解析
const commands = require(resolve(__dirname, '../dist/index.js'))
const { version } = require(resolve(__dirname, '../package.json'))

process.env.NODE_PATH = __dirname + '/../node_modules/'  // 定义脚手架的文件路径

// 初始化
program
  // 版本信息-通过这些选项打印出版本号
  .version(version)
  // 用法说明
  .usage('<command> [options]')
  // 项目描述
  .description('Node.js Web Service  React App 项目初始化工具')
// 创建模版  
program
  .command('init')
  .description('Generate a new project')
  .alias('i')
  .action(commands.init)
// 添加模版  
program
  .command('add')
  .description('Add a new template')
  .alias('a')
  .action(commands.add)
// 罗列模版  
program
  .command('list')
  .description('List all the templates')
  .alias('l')
  .action(commands.list)  
// 删除模版  
program
  .command('del')
  .description('Delete a template')
  .alias('d')
  .action(commands.del)

program.parse(process.argv)

if(!program.args.length){
  program.help()
}