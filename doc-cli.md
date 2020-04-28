一. Commadnder.js 中文文档  cli必备
    
    node.js 命令行接口的完整解决方案，灵感来自 Ruby 的 commander。 
    gitLab 地址： https://github.com/tj/commander.js/blob/master/Readme_zh-CN.md

## 这里只做简化版教程  具体查看官网gitlab

# 1.安装
  npm install commander

# 2.声明program变量
  Commander为了方便快速编程导出了一个[全局对象]。为简洁起见，本README中的示例中使用了它。 

  const { program } = require('commander');
  program.version('0.0.1');

  对于可能以多种方式使用[commander的大型程序，包括单元测试]，最好创建一个本地Command对象来使用。

  const { Command } = require('commander');
  const program = new Command();
  program.version('0.0.1'); 

# 3.选项 
  1  .option() 方法用来[定义带选项的commander]，同时也用于[这些选项的文档]。 每个选项可以有一个短标识(单个字符)和一个长名字，它们之间用[逗号或空格或'|'分开]。
  2. 选项会被放到 Commander 对象的属性上， [多词选项如"--template-engine"]会被转为[驼峰法program.templateEngine]。另请参看可选的新功能避免选项命名冲突 - 见下
  3. [多个短标识]可以组合为[一个破折号开头的参数：布尔标识和值]，并且最后一个标识可以附带一个值。 例如，-a -b -p 80 也可以写作 -ab -p80 甚至 -abp80。
  4. 你可以使用[--]来指示[选项的结束]，任何剩余的参数会正常使用，而不会被命令解释 这点对于通过另一个命令来传递选项值的情况尤其适用，如:do -- git --version
  5. 命令行中的选项位置不是固定的，可以在别的[命令参数之前或之后指定] 

  # 3.1 常用选项类型，boolean和值
    最常用的两个选项类型是boolean(选项后面不跟值)和选项跟一个值（使用尖括号声明）。除非在命令行中指定，否则两者都是undefined。
  # 3.2 默认选项值
    program
       .option('定义', '解释', '默认值');
    示例代码：
    const program = require('commander');
    program
       .option('-c, --cheese <type>', 'add the specified type of cheese', 'blue');
    program.parse(process.argv);
    console.log(`cheese: ${program.cheese}`);
  # 3.3 其他选项类型，可忽略的布尔值和标志值  
    1. 选项的值为boolean类型时，可以在其长名字前加[no-规定这个选项值为false]。 单独定义同样使选项默认为true。
    2. 如果你先定义了--foo，再加上--no-foo[并不会改变它本来的默认值]。你可以为一个boolean类型的标识(flag)指定一个默认的布尔值，从命令行里可以重写它的值。
    3. 你可以指定一个用作标志的选项，它可以接受值[使用方括号声明，即传值不是必须的]。
    program
      .option('-c, --cheese [type]', 'Add cheese with optional type');
  # 3.4 自定义选项处理    
    1. 你可以指定一个函数来处理选项的值，接收两个参数：[用户传入的值]、[上一个值](previous value)，它会返回新的选项值。
    2. 你可以将选项值强制转换为所需类型，或累积值，或完全自定义处理。
    3. 你可以在函数后面指定选项的默认或初始值。



二、 chalk
三、 yargs
四、 inquirer