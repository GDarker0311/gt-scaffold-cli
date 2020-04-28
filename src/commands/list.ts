import DB from '../db/db' // 数据库
import listTable from '../lib/table' // unicode表格

/**
 * 模版列表
 */
async function listTemplates () {
  const tplList:any = await DB.find({})

  listTable(tplList, '')
}

export default listTemplates
