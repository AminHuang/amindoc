'use strict'

const fs = require('fs')
const os = require('os')

const path = require('path')

const ignoreFiles = ['_navbar', '_coverpage', '_sidebar']

// eslint-disable-next-line
function test (docpath = '', sidebar) {

  const clipath = '/Users/huangjiamin/.nvm/versions/node/v16.13.1/lib/node_modules/docsify-cli/lib'
  // const clipath = '/Users/huangjiamin/.nvm/versions/node/v16.13.1/lib/node_modules/docsify-cli/lib'
  const utilPath = path.join(clipath, './util')
  const loggerPath = path.join(clipath, './util/logger')
  const {cwd, exists} = require(utilPath)
  const logger = require(loggerPath)

  // 获取当前目录
  const cwdPath = cwd(docpath || '.')

  // console.log('cwdPath', cwdPath, !!exists(cwdPath));

  // console.log('///////', cwdPath, path, cwd(path || '.'))
  if (exists(cwdPath)) {
    if (sidebar) {
      const sidebarPath = cwdPath + '/' + sidebar || '_sidebar.md';

      // if (!exists(sidebarPath)) {
      // 不管存在不存在都复写
      if (true) {
        genSidebar(cwdPath, sidebarPath)
        logger.success(`Successfully generated the sidebar file '${sidebar}'.`)
        return true
      }

      logger.error(`The sidebar file '${sidebar}' already exists.`)
      process.exitCode = 1
      return false
    }
    return false;
  }

  logger.error(`${cwdPath} directory does not exist.`)
}

let tree = '';
function genSidebar(cwdPath, sidebarPath) {
  // let tree = '';
  let lastPath = ''
  let nodeName = ''
  let blankspace = '';
  let test = 0;

  const files = getFiles(cwdPath);
  console.log(JSON.stringify(files));
  getTree(files);

  fs.writeFile(sidebarPath, tree, 'utf8', err => {
    if (err) {
      logger.error(`Couldn't generate the sidebar file, error: ${err.message}`)
    }
  })

  return;

  getDirFiles(cwdPath, function (pathname) {
    path.relative(pathname, cwdPath) // 找cwdPath的相对路径
    pathname = pathname.replace(cwdPath + '/', '')
    let filename = path.basename(pathname, '.md') // 文件名
    let splitPath = pathname.split(path.sep) // 路径分割成数组
    let blankspace = '';

    if (ignoreFiles.indexOf(filename) !== -1) {
      return true
    }

    nodeName = '- [' + toCamelCase(filename) + '](' + pathname + ')' + os.EOL

    if (splitPath.length > 1) {
      if (splitPath[0] !== lastPath) {
        lastPath = splitPath[0]
        tree += os.EOL + '- ' + toCamelCase(splitPath[0]) + os.EOL
      }
      tree += '  ' + nodeName
      // console.error('tree=====', tree, splitPath, splitPath.length);
    } else {
      if (lastPath !== '') {
        lastPath = ''
        tree += os.EOL
      }

      tree += nodeName
    }
  })
  fs.writeFile(sidebarPath, tree, 'utf8', err => {
    if (err) {
      logger.error(`Couldn't generate the sidebar file, error: ${err.message}`)
    }
  })
}

function getFiles (dir) {
  // let path = require('path');
  // let fs = require('fs');
  let rootDir = dir;
  var filesNameArr = []
  let cur = 0
  // 用个hash队列保存每个目录的深度
  var mapDeep = {}
  mapDeep[dir] = 0
  // 先遍历一遍给其建立深度索引
  function getMap(dir, curIndex) {
    var files = fs.readdirSync(dir) //同步拿到文件目录下的所有文件名
    files.map(function (file) {
      //var subPath = path.resolve(dir, file) //拼接为绝对路径
      var subPath = path.join(dir, file) //拼接为相对路径
      var stats = fs.statSync(subPath) //拿到文件信息对象
      // 必须过滤掉node_modules文件夹
      if (file != 'node_modules') {
        mapDeep[file] = curIndex + 1
        if (stats.isDirectory()) { //判断是否为文件夹类型
          return getMap(subPath, mapDeep[file]) //递归读取文件夹
        }
      }
    })
  }
  getMap(dir, mapDeep[dir])
  function readdirs(dir, folderName, myroot) {
    var result = { //构造文件夹数据
      path: dir,
      title: path.basename(dir),
      type: 'directory',
      deep: mapDeep[folderName]
    }
    var files = fs.readdirSync(dir) //同步拿到文件目录下的所有文件名
    result.children = files.map(function (file) {
      //var subPath = path.resolve(dir, file) //拼接为绝对路径
      var subPath = path.join(dir, file) //拼接为相对路径
      var stats = fs.statSync(subPath) //拿到文件信息对象
      if (stats.isDirectory()) { //判断是否为文件夹类型
        return readdirs(subPath, file, file) //递归读取文件夹
      }
      if (path.extname(file) === '.md') {
        const filepath =  subPath.replace(rootDir + '/', '');
        let filename = path.basename(file, '.md') // 文件名
        // console.log(subPath, rootDir, '========', path);
        return { //构造文件数据
          path: filepath,
          // name: file,
          name: filename,
          type: 'file',
          deep: mapDeep[folderName] + 1,
        }
      }
    }).filter(Boolean)
    return result //返回数据
  }
  filesNameArr.push(readdirs(dir, dir))
  return filesNameArr
}

function getTree(files) {
  for (let i=0; i<files.length;i++) {
    const item = files[i];
    if (item) {
      if (item.deep === 0) {
        if (item.children) {
          getTree(item.children)
        }
      } else {
        let blankspace = ''
        for (let i = 1; i < item.deep; i++) {
          blankspace += '  '
        }
        // console.log('-' + blankspace + '-', item.deep)
        if (item.type === 'directory' && item?.children?.length > 0) {
          tree += os.EOL + blankspace + '- ' + toCamelCase(item.title) + os.EOL
        } else if (item.type === 'file') {
          if (!ignoreFiles.includes(item.name)) {
            tree += os.EOL + blankspace + '- [' + item.name + '](' + item.path + ')' + os.EOL
          }
          
          // console.log('tree', tree);
        }
        if (item.children) {
          getTree(item.children)
        }
      }
    }
  }
}

function getDirFiles(dir, callback) {
  fs.readdirSync(dir).forEach(function (file) {
    let pathname = path.join(dir, file)

    if (fs.statSync(pathname).isDirectory()) {
      getDirFiles(pathname, callback)
    } else if (path.extname(file) === '.md') {
      callback(pathname)
    }
  })
}

function toCamelCase(str) {
  return str.replace(/\b(\w)/g, function (match, capture) {
    return capture.toUpperCase()
  }).replace(/-|_/g, ' ')
}

// test("/Users/huangjiamin/git/amindoc/docs/", "_sidebar.md");
test("/Users/huangjiamin/git/amindoc/docs/", "_sidebar.md");