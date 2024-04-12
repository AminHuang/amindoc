# 使用 tree 生成目录树

1. 安装
`brew install tree`

2. 参数选项
```
-a # 显示所有文件，包括隐藏文件（以  “.” 点开头的文件 ）
-d # 只显示目录
-f # 只显示每个文件的全路径
-i # 不显示树枝，常与-f参数配合使用
-L # level 遍历目录的最大层数，level 为大于0的正整数
-F # 在执行文件、目录、Socket符号链接、管道名称等不同类型文件的结尾，各自加上“*”、 "/"、"="、"@"、"|"号、类似ls命令的-F选项
```

3. 例子
当然了，我们的需求肯定不止列出所有文件这么简单。下面介绍几个常用的命令
* tree -d 只显示文件夹；
* tree -L n 显示项目的层级。n表示层级数。比如想要显示项目三层结构，可以用tree -l 3；
* tree -I pattern 用于过滤不想要显示的文件或者文件夹。比如你想要过滤项目中的node_modules文件夹，可以使用tree -I "node_modules"；
* tree > tree.md 将项目结构输出到tree.md这个文件。

举个例子，如果我们要显示某个项目下3层的所有文件结构，同时又过滤node_modules文件夹，最后输出到tree.md

`tree -d -L 3 -I "node_modules" > tree.md`

忽略多个文件夹：
`tree -I "build|libs"`