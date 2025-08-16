# Skyshard Calendar 项目部署流程

## 1. 本地打包项目

### 使用 7z 命令行打包

```bash
# 在项目根目录执行（排除不必要的文件夹）
7z a -tzip skyshard-calendar.zip . "-x!node_modules" "-x!.cache" "-x!dist" "-x!.DS_Store" "-x!*.log" "-x!.git" "-x!*.tmp"
```

### 验证打包结果
```bash
# 查看压缩包内容
7z l skyshard-calendar.zip

# 查看压缩包大小
dir skyshard-calendar.zip
```

## 2. 上传到云服务器

### 使用 SCP 上传
```bash
cat ~/.ssh/id_ed25519.pub

# 上传压缩包到服务器的 /data 目录
scp skyshard-calendar.zip root@us-hudiyun.vincentzyu233.cn:/data/sky-shard-calendar-frontend

# 如果需要指定端口（默认22）
# scp -P 22 skyshard-calendar.zip root@us-hudiyun.vincentzyu233.cn:/data/
```
## 3. 在云服务器上部署

### 连接到服务器
```bash
ssh root@us-hudiyun.vincentzyu233.cn
```

### 解压和部署
```bash
# 切换到 /data 目录
cd /data/sky-shard-calendar-frontend

# 解压项目文件
unzip *.zip

# 查看解压结果
cd /data
ls -la sky-shard-calendar-frontend
# 设置正确的文件权限
chmod -R 755 sky-shard-calendar-frontend/
chown -R www-data:www-data sky-shard-calendar-frontend/
```

### 配置 Nginx
```bash
# 创建 Nginx 配置文件
cat /etc/nginx/sites-available/frontend_pages
nano /etc/nginx/sites-available/frontend_pages
```

添加以下配置内容：
```nginx
server {
    listen 80;
    listen [::]:80;
    server_name us-hudiyun.vincentzyu233.cn;

    # skyshard-calendar 应用路径
    location /skyshard/ {
        alias /data/sky-shard-calendar-frontend/;
        index index.html;
        try_files $uri $uri/ =404;

        # 静态资源缓存
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|otf)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # 根路径重定向到 skyshard 应用
    location = /skyshard {
        return 301 /skyshard/;
    }

    # gemini_frontend 应用路径
    location /gemini_frontend/ {
        alias /data/gemini_request_frontend/;
        index index.html;
        try_files $uri $uri/ =404;

        # 静态资源缓存
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|otf)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # 根路径重定向到 gemini_frontend 应用
    location = /gemini_frontend {
        return 301 /gemini_frontend/;
    }

    # 错误页面
    error_page 404 /404.html;
}
```

### 启用站点并重启服务
```bash
# 创建软链接启用站点
ln -s /etc/nginx/sites-available/frontend_pages /etc/nginx/sites-enabled/

# 测试 Nginx 配置
nginx -t
# 重启 Nginx
systemctl restart nginx
# 检查 Nginx 状态
systemctl status nginx
```

## 4. 验证部署

### 检查文件结构
```bash
# 查看部署的文件结构
tree /data/sky-shard-calendar-frontend/ -L 2

# 或使用 ls
ls -la /data/sky-shard-calendar-frontend/

# 检查字体文件是否存在
ls -la /data/sky-shard-calendar-frontend/fonts/
ls -la /data/sky-shard-calendar-frontend/fonts/San-Francisco/
ls -la /data/sky-shard-calendar-frontend/fonts/PingFang/
```

### 测试访问
```bash
# 在服务器上测试本地访问
curl -I http://localhost/skyshard/

# 测试字体文件访问
curl -I http://localhost/skyshard/fonts/San-Francisco/SanFranciscoDisplay-Heavy-5.otf
curl -I http://localhost/skyshard/fonts/PingFang/PingFang_SC_Semibold.ttf

# 查看 Nginx 访问日志
tail -f /var/log/nginx/access.log

# 查看 Nginx 错误日志
tail -f /var/log/nginx/error.log
```

### 浏览器访问
打开浏览器访问：`http://us-hudiyun.vincentzyu233.cn/skyshard/`

### 测试访问
```bash
# 在服务器上测试本地访问
curl -I http://localhost/skyshard/

# 查看 Nginx 访问日志
tail -f /var/log/nginx/access.log

# 查看 Nginx 错误日志
tail -f /var/log/nginx/error.log
```

### 浏览器访问
打开浏览器访问：`http://us-hudiyun.vincentzyu233.cn/skyshard/`

## 5. 更新部署流程

当需要更新项目时，重复以下步骤：

```bash
# 1. 本地重新打包
7z a -tzip skyshard-calendar-update.zip . -x!node_modules -x!.cache -x!dist -x!.DS_Store -x!*.log

# 2. 上传新版本
scp skyshard-calendar-update.zip root@us-hudiyun.vincentzyu233.cn:/data/

# 3. 在服务器上备份旧版本并更新
ssh root@us-hudiyun.vincentzyu233.cn
cd /data
mv skyshard_calendar_frontend skyshard_calendar_frontend_backup_$(date +%Y%m%d_%H%M%S)
unzip skyshard-calendar-update.zip -d skyshard_calendar_frontend
chmod -R 755 skyshard_calendar_frontend/
chown -R www-data:www-data skyshard_calendar_frontend/

# 4. 重启 Nginx（如果需要）
systemctl reload nginx
```

## 6. 字体加载问题排查

### 问题现象
页面可以正常加载，但是字体显示不正确，使用系统默认字体。

### 排查步骤

#### 1. 检查字体文件是否存在
```bash
# 在服务器上检查字体文件
ls -la /data/sky-shard-calendar-frontend/fonts/San-Francisco/SanFranciscoDisplay-Heavy-5.otf
ls -la /data/sky-shard-calendar-frontend/fonts/PingFang/PingFang_SC_Semibold.ttf
```

#### 2. 测试字体文件HTTP访问
```bash
# 测试字体文件是否可以通过HTTP访问
curl -I http://us-hudiyun.vincentzyu233.cn/skyshard/fonts/San-Francisco/SanFranciscoDisplay-Heavy-5.otf
curl -I http://us-hudiyun.vincentzyu233.cn/skyshard/fonts/PingFang/PingFang_SC_Semibold.ttf
```

#### 3. 检查浏览器开发者工具
- 打开浏览器开发者工具 (F12)
- 查看 Network 标签页
- 刷新页面，查看字体文件请求状态
- 如果字体文件返回 404 或其他错误，说明路径有问题

#### 4. 解决方案

**方案一：修复Nginx配置中的字体MIME类型**
```bash
# 编辑Nginx配置
nano /etc/nginx/sites-available/frontend_pages
```

在server块中添加字体文件的MIME类型支持：
```nginx
server {
    listen 80;
    listen [::]:80;
    server_name us-hudiyun.vincentzyu233.cn;

    # 添加字体文件MIME类型支持
    location ~* \.(ttf|otf|eot|woff|woff2)$ {
        add_header Access-Control-Allow-Origin *;
        add_header Cache-Control "public, max-age=31536000";
        expires 1y;
    }

    # skyshard-calendar 应用路径
    location /skyshard/ {
        alias /data/sky-shard-calendar-frontend/;
        index index.html;
        try_files $uri $uri/ =404;

        # 静态资源缓存
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|otf)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
            add_header Access-Control-Allow-Origin *;
        }
    }
    # ... 其他配置保持不变
}
```

**方案二：检查文件名中的空格问题**

`PingFang SC Semibold.ttf` 文件名包含空格，可能导致访问问题。

如果你已经将文件重命名为 `PingFang_SC_Semibold.ttf`（使用下划线），则无需执行以下重命名操作：
```bash
# 重命名文件，去掉空格（如果还未重命名）
cd /data/sky-shard-calendar-frontend/fonts/PingFang/
mv "PingFang SC Semibold.ttf" "PingFang_SC_Semibold.ttf"
```

然后修改HTML中的字体引用：
```html
@font-face {
  font-family: 'PingFang-Semibold';
  src: url('fonts/PingFang/PingFang_SC_Semibold.ttf') format('truetype');
}
```

**方案三：使用相对路径检查**

确保HTML中的字体路径是相对于网站根目录的：
```html
@font-face {
  font-family: 'San Francisco';
  src: url('./fonts/San-Francisco/SanFranciscoDisplay-Heavy-5.otf') format('opentype');
}

@font-face {
  font-family: 'PingFang-Semibold';
  src: url('./fonts/PingFang/PingFang_SC_Semibold.ttf') format('truetype');
}
```

#### 5. 重启服务并测试
```bash
# 重启Nginx
systemctl restart nginx

# 清除浏览器缓存后重新测试
# 或使用无痕模式访问页面
```

## 7. 故障排除

### 常见问题
1. **403 Forbidden**: 检查文件权限和 Nginx 配置
2. **404 Not Found**: 检查文件路径和 alias 配置
3. **静态资源加载失败**: 检查相对路径和缓存配置
4. **字体加载失败**: 检查字体文件路径、MIME类型和CORS设置

### 日志查看
```bash
# Nginx 错误日志
tail -f /var/log/nginx/error.log

# Nginx 访问日志
tail -f /var/log/nginx/access.log

# 系统日志
journalctl -u nginx -f
```

## 7. 安全建议

1. 定期备份项目文件
2. 使用 HTTPS（配置 SSL 证书）
3. 限制文件上传大小
4. 定期更新服务器系统和 Nginx

---

**部署完成后访问地址**: `http://us-hudiyun.vincentzyu233.cn/skyshard/`

**注意**: 确保云服务器的防火墙已开放 80 端口（和 443 端口如果使用 HTTPS）。