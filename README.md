# 🌟 Sky: Children of the Light - 碎片事件查询工具

[![English](https://img.shields.io/badge/Language-English-blue?style=flat-square)](./README_EN.md) [![中文](https://img.shields.io/badge/语言-中文-red?style=flat-square)](./README.md)

> 一个专为《光遇》国服玩家设计的碎片事件时间查询与进度跟踪工具

这是一个精美的 Web 应用程序，用于查询《光遇》国服碎片事件的详细信息。它采用现代化的毛玻璃设计风格，帮助玩家精确追踪游戏中的碎片事件，合理规划游戏时间，确保不错过任何重要的碎片收集机会。

![应用预览](250815效果图.png)

## ✨ 功能特性

### 🗓️ 智能日历系统
- **月视图日历**: 清晰显示整月的碎片事件分布
- **交互式日期选择**: 点击任意日期查看该日的详细碎片信息
- **月份导航**: 快速切换到不同月份查看未来或过去的事件
- **今日快速定位**: 一键返回当前日期
- **视觉化事件标识**: 不同颜色标识不同类型的碎片事件

### ⏰ 实时进度跟踪
- **当日进度条**: 实时显示当天碎片事件的时间进度
- **多时段展示**: 清晰区分红色碎片和黑色碎片的时间段
- **选定日期进度**: 查看任意选中日期的碎片时间安排
- **实时时钟**: 显示当前时间和日期，精确到秒
- **动态更新**: 进度条每分钟自动更新，时钟每秒更新

### 📍 详细地点信息
- **碎片地点提示**: 显示每日碎片事件发生的具体地点
- **地图区域标识**: 按照游戏内地图区域分类（云野、雨林、霞谷、暮土、禁阁）
- **蜡烛类型显示**: 显示对应的蜡烛图标和数量信息
- **背景图片联动**: 根据地点自动切换相应的场景背景图

### 🎨 现代化界面设计
- **毛玻璃效果**: 采用 backdrop-filter 实现的现代毛玻璃视觉效果
- **Apple 风格设计**: 借鉴 Apple 设计语言的圆角、阴影和动画效果
- **渐变色彩**: 精心调配的渐变色彩搭配
- **流畅动画**: CSS3 动画提供丝滑的交互体验
- **悬停效果**: 丰富的鼠标悬停和点击反馈

### 📱 全平台兼容
- **响应式设计**: 完美适配手机、平板和桌面设备
- **触摸友好**: 针对移动设备优化的触摸体验
- **高分辨率支持**: 支持 Retina 显示屏和 4K 显示器
- **跨浏览器兼容**: 兼容主流浏览器（Chrome、Firefox、Safari、Edge）

### 🔧 高级功能
- **Cookie 记忆**: 记住用户选择的日期，下次访问时自动恢复
- **智能算法**: 基于游戏内规律的碎片时间计算算法
- **性能优化**: 延迟加载和图片预加载提升用户体验
- **错误处理**: 完善的错误处理和用户提示机制

## 🛠️ 技术栈

### 前端核心技术
- **HTML5**: 语义化标签和现代 Web 标准
- **CSS3**: Flexbox 布局、CSS Grid、动画和毛玻璃效果
- **JavaScript ES6+**: 模块化编程、Promise、箭头函数等现代特性
- **jQuery 3.7.1**: DOM 操作和事件处理简化

### 开发工具链
- **Webpack 5**: 模块打包和构建工具
- **Webpack Dev Server**: 开发环境热重载
- **npm**: 依赖管理和脚本运行

### 设计与用户体验
- **Apple Human Interface Guidelines**: 遵循 Apple 设计规范
- **毛玻璃设计**: backdrop-filter 和半透明效果
- **SF Pro Display 字体**: Apple 系统字体和 PingFang 中文字体
- **响应式布局**: 移动优先的设计理念

### 浏览器 API
- **Date API**: 日期时间处理和计算
- **LocalStorage/Cookie**: 用户偏好设置存储
- **Canvas API**: 图形绘制和动画效果
- **Web Fonts**: 自定义字体加载

## 🚀 快速开始

### 环境要求
- Node.js 16.0+ 
- npm 8.0+
- 现代浏览器（支持 ES6+ 和 CSS3）

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```
启动开发服务器，支持热重载，默认在 http://localhost:8080 访问

### 生产构建
```bash
npm run build
```
生成优化后的生产版本文件到 `dist` 目录

## 📁 项目结构

```
skyshard-calendar/
├── src/                    # 源代码目录
├── js/                     # JavaScript 文件
│   ├── main.js            # 主逻辑和日历功能
│   ├── progressBar.js     # 进度条和时间跟踪
│   └── location_hint.js   # 地点信息和蜡烛显示
├── css/                   # 样式文件
├── images/                # 图片资源
├── fonts/                 # 字体文件
├── dist/                  # 构建输出目录
├── index.html            # 主页面
├── package.json          # 项目配置
└── webpack.config.js     # Webpack 配置
```

## 🎯 核心算法

### 碎片时间计算
应用基于《光遇》游戏内的碎片规律，实现了精确的时间计算算法：

- **地点轮换规律**: 根据日期计算对应的地图区域
- **时间段分配**: 红色碎片和黑色碎片的精确时间分布
- **动态更新**: 实时计算当前进度和剩余时间

### 性能优化
- **图片懒加载**: 减少初始加载时间
- **防抖处理**: 避免频繁的重复计算
- **内存管理**: 及时清理定时器和事件监听器

## 📊 浏览器兼容性

| 浏览器 | 版本支持 | 备注 |
|--------|----------|------|
| Chrome | 88+ | 完全支持 |
| Firefox | 85+ | 完全支持 |
| Safari | 14+ | 完全支持 |
| Edge | 88+ | 完全支持 |
| 移动浏览器 | iOS 14+, Android 8+ | 完全支持 |

## 🔗 项目链接

- **🌟 在线预览**: [光遇国服碎片时间查询](https://ichozero.github.io/skyshard_calendar/)
- **📱 GitHub 仓库**: [ichozero/skyshard-query](https://github.com/ichozero/skyshard_calendar)
- **📋 问题反馈**: [Issues](https://github.com/ichozero/skyshard-query/issues)

## 📸 功能截图

![主界面](250815效果图.png)
*主界面展示：实时时钟、进度条和交互式日历*

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request 来改进这个项目！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request


⭐ 如果这个项目对你有帮助，请给个 Star 支持一下！

