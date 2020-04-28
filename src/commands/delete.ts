import { prompt } from 'inquirer' // 命令行交互
import DB from '../nedb/db' // 数据库
import listTable from '../lib/table' // unicode表格

/**
 * 删除模版
 */
async function deleteTemplate () {
  const tplList:any = await DB.find({})

  const questions = [{
    type: 'rawlist',
    name: 'name',
    message: 'Select a template to delete:',
    choices: () => tplList.map(tpl => {
      return {
        name: tpl.name,
        value: tpl.name,
      }
    })
  }]

  prompt(questions).then(async ({ name }) => {
    await DB.remove({ name })
    const newList:any = await DB.find({})
    listTable(newList, 'New templates has been updated successfully!')
  })
}

export default deleteTemplate
