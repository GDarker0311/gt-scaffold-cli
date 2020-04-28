'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var inquirer = require('inquirer');
var datastore = _interopDefault(require('nedb'));
var path = require('path');
var Table = _interopDefault(require('cli-table'));
var chalk = _interopDefault(require('chalk'));
var ora = _interopDefault(require('ora'));

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var db = new datastore({
    filename: path.resolve(__dirname, './db'),
    autoload: true
});
var DB = /** @class */ (function () {
    function DB() {
    }
    // 查询
    DB.find = function (condition) {
        return new Promise(function (resolve, reject) {
            db.find(null, condition, function (err, docs) {
                if (err)
                    reject(err);
                resolve(docs);
            });
        });
    };
    // 插入
    DB.insert = function (doc) {
        return new Promise(function (resolve, reject) {
            db.insert(doc, function (err, newDoc) {
                if (err)
                    reject(err);
                resolve(newDoc);
            });
        });
    };
    // 删除
    DB.remove = function (condition) {
        return new Promise(function (resolve, reject) {
            db.remove(condition, function (err, newDoc) {
                if (err)
                    reject(err);
                resolve(newDoc);
            });
        });
    };
    return DB;
}());

// 画表格
var table = new Table({
    head: ['Template Name', 'Owner/Name', 'Branch', 'From'],
    style: {
        head: ['green']
    }
});
var listTable = (function (tplList, lyric, autoExit) {
    if (autoExit === void 0) { autoExit = true; }
    tplList.forEach(function (_a) {
        var name = _a.name, path = _a.path, branch = _a.branch, from = _a.from;
        table.push([name, path, branch, from]);
        if (table.length === tplList.length) {
            console.log(table.toString());
            if (lyric) {
                console.log(chalk.green("\u2714 " + lyric));
            }
            autoExit && process.exit();
        }
    });
});

/**
 * 增加模版
 */
function addTemplate() {
    return __awaiter(this, void 0, void 0, function () {
        var tplList, questions;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, DB.find({})];
                case 1:
                    tplList = _a.sent();
                    questions = [{
                            type: 'input',
                            name: 'name',
                            message: 'Set the custom name of the template:',
                            validate: function (val) {
                                var result = true;
                                if (!val) {
                                    result = 'Template name cannot be empty.';
                                }
                                else if (tplList.some(function (_a) {
                                    var name = _a.name;
                                    return name === val;
                                })) {
                                    result = "Template with name \"" + val + "\" is exist.";
                                }
                                return result;
                            }
                        },
                        {
                            type: 'list',
                            name: 'from',
                            message: 'Where is the template from?',
                            choices: ['GitHub', 'GitLab', 'Bitbucket', 'Others']
                        },
                        {
                            type: 'input',
                            name: 'from',
                            when: function (_a) {
                                var from = _a.from;
                                if (from === 'Others') {
                                    return true;
                                }
                            },
                            filter: function (val) {
                                if (val.startsWith('.')) {
                                    val = process.cwd() + '/' + val;
                                }
                                return val;
                            }
                        },
                        {
                            type: 'input',
                            name: 'path',
                            message: 'Owner/name of the template:',
                            when: function (_a) {
                                var from = _a.from;
                                if (!['GitHub', 'GitLab', 'Bitbucket'].includes(from)) {
                                    return false;
                                }
                                else {
                                    return true;
                                }
                            },
                            validate: function (val) {
                                if (val !== '') {
                                    return true;
                                }
                                return 'Path is required!';
                            }
                        },
                        {
                            type: 'input',
                            name: 'branch',
                            message: 'Branch of the template:',
                            default: 'master',
                            when: function (_a) {
                                var from = _a.from;
                                if (!['GitHub', 'GitLab', 'Bitbucket'].includes(from)) {
                                    return false;
                                }
                                else {
                                    return true;
                                }
                            },
                        }];
                    inquirer.prompt(questions).then(function (_a) {
                        var name = _a.name, _b = _a.path, path = _b === void 0 ? '---' : _b, _c = _a.branch, branch = _c === void 0 ? '---' : _c, from = _a.from;
                        return __awaiter(_this, void 0, void 0, function () {
                            var template, newList;
                            return __generator(this, function (_d) {
                                switch (_d.label) {
                                    case 0:
                                        template = {
                                            name: name,
                                            path: path,
                                            branch: branch,
                                            from: from
                                        };
                                        return [4 /*yield*/, DB.insert(template)];
                                    case 1:
                                        _d.sent();
                                        return [4 /*yield*/, DB.find({})];
                                    case 2:
                                        newList = _d.sent();
                                        listTable(newList, 'New template has been added successfully!');
                                        return [2 /*return*/];
                                }
                            });
                        });
                    });
                    return [2 /*return*/];
            }
        });
    });
}

/**
 * 模版列表
 */
function listTemplates() {
    return __awaiter(this, void 0, void 0, function () {
        var tplList;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, DB.find({})];
                case 1:
                    tplList = _a.sent();
                    listTable(tplList, '');
                    return [2 /*return*/];
            }
        });
    });
}

/**
 * 删除模版
 */
function deleteTemplate() {
    return __awaiter(this, void 0, void 0, function () {
        var tplList, questions;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, DB.find({})];
                case 1:
                    tplList = _a.sent();
                    questions = [{
                            type: 'rawlist',
                            name: 'name',
                            message: 'Select a template to delete:',
                            choices: function () { return tplList.map(function (tpl) {
                                return {
                                    name: tpl.name,
                                    value: tpl.name,
                                };
                            }); }
                        }];
                    inquirer.prompt(questions).then(function (_a) {
                        var name = _a.name;
                        return __awaiter(_this, void 0, void 0, function () {
                            var newList;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4 /*yield*/, DB.remove({ name: name })];
                                    case 1:
                                        _b.sent();
                                        return [4 /*yield*/, DB.find({})];
                                    case 2:
                                        newList = _b.sent();
                                        listTable(newList, 'New templates has been updated successfully!');
                                        return [2 /*return*/];
                                }
                            });
                        });
                    });
                    return [2 /*return*/];
            }
        });
    });
}

var download = require('download-git-repo'); // 用于下载项目模板
var ncp = require('ncp').ncp; // 异步递归文件和目录复制
var spinner = ora('Downloading template...');
// 下载
var doDownload = function (from, dist) {
    console.log(from, dist);
    spinner.start();
    return new Promise(function (resolve, reject) {
        download(from, dist, function (err) {
            if (err) {
                reject({
                    status: 0,
                    msg: err
                });
            }
            spinner.stop();
            resolve({
                status: 1,
                msg: "New project has been initialized successfully! Locate in \n" + dist
            });
        });
    });
};
// 复制
var doCopy = function (from, dist) {
    console.log(from, dist);
    spinner.start();
    return new Promise(function (resolve, reject) {
        ncp(from, dist, function (err) {
            if (err) {
                reject({
                    status: 0,
                    msg: err
                });
            }
            spinner.stop();
            resolve({
                status: 1,
                msg: "New project has been initialized successfully! Locate in \n" + dist
            });
        });
    });
};
// 发起
var initiator = function (_a) {
    var path = _a.path, branch = _a.branch, from = _a.from, dist = _a.dist;
    return __awaiter(void 0, void 0, void 0, function () {
        var dlFrom, result;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    dlFrom = '';
                    if (!(from === 'GitHub' || from === 'GitLab' || from === 'Bitbucket')) return [3 /*break*/, 2];
                    dlFrom = from.toLocaleLowerCase() + ':' + path + '#' + branch;
                    return [4 /*yield*/, doDownload(dlFrom, dist)];
                case 1:
                    result = _b.sent();
                    return [3 /*break*/, 6];
                case 2:
                    if (!from.startsWith('http')) return [3 /*break*/, 4];
                    dlFrom = 'direct:' + from;
                    return [4 /*yield*/, doDownload(dlFrom, dist)];
                case 3:
                    result = _b.sent();
                    return [3 /*break*/, 6];
                case 4:
                    dlFrom = 'others:' + from;
                    return [4 /*yield*/, doCopy(dlFrom.replace('others:', ''), dist)];
                case 5:
                    result = _b.sent();
                    _b.label = 6;
                case 6:
                    console.log(result.status ? chalk.green(result.msg) : chalk.red(result.msg));
                    return [2 /*return*/];
            }
        });
    });
};

/**
 * 模版初始化
 */
function initTemplate() {
    return __awaiter(this, void 0, void 0, function () {
        var tplList, questions;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, DB.find({})];
                case 1:
                    tplList = _a.sent();
                    listTable(tplList, '', false);
                    questions = [{
                            type: 'rawlist',
                            name: 'tplName',
                            message: 'Select a template:',
                            choices: function () { return tplList.map(function (tpl) {
                                return {
                                    name: tpl.name,
                                    value: tpl.name,
                                };
                            }); }
                        }, {
                            type: 'input',
                            name: 'project',
                            message: 'Project name:',
                            default: function (lastAnswer) {
                                return lastAnswer.tplName;
                            }
                        }];
                    inquirer.prompt(questions).then(function (_a) {
                        var tplName = _a.tplName, project = _a.project;
                        return __awaiter(_this, void 0, void 0, function () {
                            var tpl, path, branch, from, pwd;
                            return __generator(this, function (_b) {
                                tpl = tplList.filter(function (_a) {
                                    var name = _a.name;
                                    return name === tplName;
                                })[0];
                                path = tpl.path, branch = tpl.branch, from = tpl.from;
                                pwd = process.cwd();
                                initiator({ path: path, branch: branch, from: from, dist: pwd + "/" + project });
                                return [2 /*return*/];
                            });
                        });
                    });
                    return [2 /*return*/];
            }
        });
    });
}

exports.add = addTemplate;
exports.del = deleteTemplate;
exports.init = initTemplate;
exports.list = listTemplates;
