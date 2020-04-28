// 声明变量
// 模版
export interface Template {
  name: string,
  path?: string,
  branch?: string,
  from?: string
}
// 下载
export interface Download {
  path: string,
  branch: string,
  from: string,
  dist: string
}
// 下载结果
export interface DownloadResult {
  status: number,
  msg: string
}