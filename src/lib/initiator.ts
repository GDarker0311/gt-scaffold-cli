import { Download, DownloadResult } from "./types" // 定义变量
import chalk from 'chalk' // 文字着色效果
import ora from 'ora' // spinner效果

const download = require('download-git-repo') // 用于下载项目模板
const ncp = require('ncp').ncp // 异步递归文件和目录复制
const spinner = ora('Downloading template...')

// 下载
const doDownload = (from:string, dist:string):Promise<DownloadResult> => {
  console.log(from, dist)
  spinner.start()
  return new Promise((resolve, reject) => {
    download(from, dist, err => {
      if (err) {
        reject({
          status: 0,
          msg: err
        })
      }
      spinner.stop()
      resolve({
        status: 1,
        msg: `New project has been initialized successfully! Locate in \n${dist}`
      })
    })
  })
}

// 复制
const doCopy = (from:string, dist:string):Promise<DownloadResult> => {
  console.log(from, dist)
  spinner.start()
  return new Promise((resolve, reject) => {
    ncp(from, dist, err => {
      if (err) {
        reject({
          status: 0,
          msg: err
        })
      }
      spinner.stop()
      resolve({
        status: 1,
        msg: `New project has been initialized successfully! Locate in \n${dist}`
      })
    })
  })
}

// 发起
const initiator = async ({ path, branch, from, dist }: Download) => {
  let dlFrom = ''
  let result:DownloadResult
  if (from === 'GitHub' || from === 'GitLab' || from === 'Bitbucket') {
    dlFrom = from.toLocaleLowerCase() + ':' + path + '#' + branch
    result = await doDownload(dlFrom, dist)
  } else if (from.startsWith('http')) {
    dlFrom = 'direct:' + from
    result = await doDownload(dlFrom, dist)
  } else {
    dlFrom = 'others:' + from
    result = await doCopy(dlFrom.replace('others:', ''), dist)
  }

  console.log(result.status ? chalk.green(result.msg) : chalk.red(result.msg))
}

export default initiator
