import datastore from 'nedb' // node嵌入式数据库
import { resolve } from 'path' // 路径

const db = new datastore({
  filename: resolve(__dirname, './db'),
  autoload: true
})

class DB {
  // 查询
  static find (condition:Object) {
    return new Promise((resolve, reject) => {
      db.find(null, condition, (err: TypeError, docs: Array<any>) => {
        if (err) reject(err)
        resolve(docs)
      })
    })
  }
  // 插入
  static insert (doc: Object) {
    return new Promise((resolve, reject) => {
      db.insert(doc, (err: TypeError, newDoc: Array<any>) => {
        if (err) reject(err)
        resolve(newDoc)
      })
    })
  }
  // 删除
  static remove (condition:Object) {
    return new Promise((resolve, reject) => {
      db.remove(condition, (err: Error, newDoc: any) => {
        if (err) reject(err)
        resolve(newDoc)
      })
    })
  }
}

export default DB
