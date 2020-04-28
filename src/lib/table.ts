import Table from 'cli-table' // CLI漂亮的unicode表格
import chalk from 'chalk' // 文字着色效果

// 画表格
const table:any = new Table({
  head: ['Template Name', 'Owner/Name', 'Branch', 'From'],
  style: {
    head: ['green']
  }
})

export default (tplList: Array<any>, lyric?: string, autoExit: boolean = true) => {
  tplList.forEach(({ name, path, branch, from }) => {
    table.push([name, path, branch, from])
    if (table.length === tplList.length) {
      console.log(table.toString())
      if (lyric) {
        console.log(chalk.green(`\u2714 ${lyric}`))
      }
      autoExit && process.exit()
    }
  })
}
