# 光遇国服碎片时间查询 - 开发文档

## 项目简介
这是一个光遇国服碎片时间查询工具，帮助玩家查看每日碎片降临地点和时间。项目使用 HTML、CSS、JavaScript 和 Webpack 构建。

## 环境要求
- Node.js (推荐 v16 或更高版本)
- npm (Node.js 自带)

## 快速开始

### 1. 克隆项目
```bash
git clone <repository-url>
cd skyshard-calendar
```

### 2. 安装依赖
```bash
npm install
```

### 3. 构建项目
```bash
npx webpack
```

### 4. 启动本地服务器
```bash
# 使用 http-server (推荐)
npx http-server . -p 3000

# 或者使用 Python (如果已安装)
python -m http.server 3000
```

### 5. 访问项目
打开浏览器访问：`http://localhost:3000`

## 开发模式

### 开启热重载
项目目前使用基础的 Webpack 配置，要开启热重载，可以使用以下方法：

#### 方法一：使用 webpack-dev-server
1. 安装 webpack-dev-server：
```bash
npm install --save-dev webpack-dev-server
```

2. 在 `package.json` 中添加脚本：
```json
{
  "scripts": {
    "dev": "webpack serve --mode development --open",
    "build": "webpack --mode production"
  }
}
```

3. 启动开发服务器：
```bash
npm run dev
```

#### 方法二：使用 webpack --watch
```bash
# 监听文件变化并自动重新构建
npx webpack --watch

# 在另一个终端启动服务器
npx http-server . -p 3000
```

## 重新安装依赖

如果 `node_modules` 文件夹被删除，按以下步骤重新安装：

### 1. 清理缓存（可选）
```bash
npm cache clean --force
```

### 2. 重新安装依赖
```bash
npm install
```

### 3. 重新构建项目
```bash
npx webpack
```

### 4. 启动服务器
```bash
npx http-server . -p 3000
```

## 项目结构

```
skyshard-calendar/
├── css/                    # 样式文件
│   ├── bootstrap.min.css
│   └── style.css
├── fonts/                  # 字体文件
├── images/                 # 图片资源
│   └── LocationImages/     # 地点地图图片
├── js/                     # JavaScript 文件
│   ├── main.js            # 主要逻辑
│   ├── location_hint.js   # 碎片信息逻辑
│   └── progressBar.js     # 进度条逻辑
├── src/                    # 源码目录
│   └── index.js           # Webpack 入口文件
├── dist/                   # 构建输出目录
├── index.html             # 主页面
├── package.json           # 项目配置
├── webpack.config.js      # Webpack 配置
└── .gitignore            # Git 忽略文件
```

## 开发说明

### 主要功能模块

1. **日历显示** (`js/main.js`)
   - 渲染月历
   - 标记碎片日期（黑色/红色背景）
   - 处理日期点击事件
   - 显示对应地点地图

2. **碎片信息** (`js/location_hint.js`)
   - 计算每日碎片降临地点
   - 确定蜡烛类型和数量
   - 更新页面显示信息

3. **进度条** (`js/progressBar.js`)
   - 显示碎片时间进度
   - 实时更新时间信息

### 碎片规律

- **前半月（1-15日）**：
  - 周二：黑碎片（白蜡烛）
  - 周六、周日：红碎片（升华蜡烛）

- **后半月（16-31日）**：
  - 周三：黑碎片（白蜡烛）
  - 周五、周日：红碎片（升华蜡烛）

- **无碎片日**：周一、周四

### 图片资源

所有地点地图图片存放在 `images/LocationImages/` 目录下，支持以下地点：
- 蝴蝶平原、幽光山洞、云中仙乡、云顶浮岛
- 圣岛、荧光森林、秘密花园、密林遗迹
- 大树屋、神殿后花园、滑冰场、圆梦村
- 雪隐峰、边陲荒漠、巨兽荒原、黑水港湾
- 远古战场、星光沙漠、水母港湾、遗忘方舟

## 常见问题

### Q: 图片无法显示？
A: 确保使用 HTTP 服务器访问项目，不要直接打开 HTML 文件（file:// 协议）。

### Q: 点击日期没有反应？
A: 只有有颜色背景的日期（黑色/红色）才会显示地图，这些是有碎片事件的日期。

### Q: 如何修改碎片信息？
A: 编辑 `js/location_hint.js` 文件中的 `shardInfo_*` 数组。

### Q: 如何添加新的地点图片？
A: 
1. 将图片放入 `images/LocationImages/` 目录
2. 在 `js/main.js` 的 `imageUrlMapping` 对象中添加对应条目
3. 重新构建项目

## 部署

### 生产环境构建
```bash
npm run build  # 如果配置了 build 脚本
# 或者
npx webpack --mode production
```

### 静态文件部署
构建完成后，可以将整个项目目录部署到任何静态文件服务器（如 Nginx、Apache、GitHub Pages 等）。

## 贡献指南

1. Fork 项目
2. 创建功能分支：`git checkout -b feature/new-feature`
3. 提交更改：`git commit -am 'Add new feature'`
4. 推送分支：`git push origin feature/new-feature`
5. 创建 Pull Request

## 许可证

[在此添加许可证信息]