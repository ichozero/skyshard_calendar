const path = require('path');

module.exports = {
	mode: 'development',
	entry: './src/index.js', // 入口文件
	output: {
		path: path.resolve(__dirname, 'dist'), // 输出目录
		filename: 'bundle.js' // 输出文件名
	},
	devServer: {
		static: {
			directory: path.join(__dirname, './'), // 服务整个项目根目录
		},
		compress: true,
		port: 8080,
		hot: true, // 启用热重载
		liveReload: true, // 启用实时重载
		watchFiles: ['*.html', 'css/**/*', 'js/**/*', 'fonts/**/*', 'images/**/*'], // 监听文件变化
	},
	// 其他配置选项
	//....
};