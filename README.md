# Node.js Plugin for Utilizing DeepL Translation API in GoldenDict/GoldenDict-ng

[中文版](#部署和使用步骤)

---
## Deployment and Usage Guide

### 1. Environment Setup

#### System Requirements
- Operating System: Windows, macOS, or Linux
- Node.js: Version 14.0 or higher
- GoldenDict or GoldenDict-ng

#### Install Node.js
If you haven't installed Node.js yet, please visit the [Node.js official website](https://nodejs.org/) to download and install the version suitable for your system.

### 2. Get Project Code

Use either of the following methods to obtain the project:

#### Method 1: Git Clone (Recommended)
```bash
git clone https://github.com/DevJogger/GoldenDict-DeepL.git
cd GoldenDict-DeepL
```

#### Method 2: Direct Download
1. Visit the project's GitHub page
2. Click the "Code" button and select "Download ZIP"
3. Extract to your chosen directory

### 3. Install Dependencies

Run the following command in the project root directory:

```bash
npm ci
```

### 4. Configure DeepL API

#### Get DeepL API Key
1. Visit [DeepL API official website](https://www.deepl.com/pro-api)
2. Register for a free account (500,000 characters per month free quota)
3. Obtain your API key (AUTH_KEY)

#### Create Environment Variable File
Create a `.env` file in the project root directory:

```bash
touch .env
```

Add your API key to the `.env` file:

```
DEEPL_AUTH_KEY=your_deepl_api_key
```

### 5. Configure GoldenDict/GoldenDict-ng

#### Open Program Settings
1. Launch GoldenDict or GoldenDict-ng
2. Press `F3` key or open "Dictionaries" settings through the menu

#### Add Program Configuration
Add the following configuration in the "Programs" panel:

| Field | Value |
|-------|--------|
| **Type** | `Html` |
| **Name** | `DeepL Translation` |
| **Command Line** | `node "/path/to/GoldenDict-DeepL/DeepL.js" %GDWORD%` |

**Important:** Replace `/path/to/GoldenDict-DeepL/` with your actual project path.

```bash
# Windows Example
node "C:\Users\YourName\GoldenDict-DeepL\DeepL.js" %GDWORD%
```

### 6. Usage

#### Translation Features
- **Chinese → English:** Input Chinese content, automatically translates to English
- **Other Languages → Chinese:** Input non-Chinese content, automatically translates to Chinese

### 7. Troubleshooting

#### Common Issues

**Issue 1:** "Please set DEEPL_AUTH_KEY in .env file"
- **Solution:** Check if the `.env` file exists and contains the correct API key

**Issue 2:** Node.js command not recognized
- **Solution:** Ensure Node.js is properly installed and added to the system PATH

**Issue 3:** The program has returned exit code 255. on Mac
- **Solution:** Due to conflicts in your development environment, please use the full `node` path in the **Command Line** in step 5

#### Test Installation
Run the following command in the project directory to test:

```bash
node DeepL.js "Hello World"
```

If configured correctly, you should see the Chinese translation result and usage information.

---

## 部署和使用步骤

### 1. 环境准备

#### 系统要求
- 操作系统：Windows、macOS 或 Linux
- Node.js：版本 14.0 或更高
- GoldenDict 或 GoldenDict-ng

#### 安装 Node.js
如果您还没有安装 Node.js，请访问 [Node.js 官网](https://nodejs.org/) 下载并安装适合您系统的版本。

### 2. 获取项目代码

使用以下任一方式获取项目：

#### 方式一：Git 克隆（推荐）
```bash
git clone https://github.com/DevJogger/GoldenDict-DeepL.git
cd GoldenDict-DeepL
```

#### 方式二：直接下载
1. 访问项目的 GitHub 页面
2. 点击 "Code" 按钮，选择 "Download ZIP"
3. 解压缩到您选择的目录

### 3. 安装依赖包

在项目根目录下运行：

```bash
npm ci
```

### 4. 配置 DeepL API

#### 获取 DeepL API 密钥
1. 访问 [DeepL API 官网](https://www.deepl.com/pro-api)
2. 注册免费账户（每月有 500,000 字符的免费额度）
3. 获取您的 API 密钥（AUTH_KEY）

#### 创建环境变量文件
在项目根目录下创建 `.env` 文件：

```bash
touch .env
```

在 `.env` 文件中添加您的 API 密钥：

```
DEEPL_AUTH_KEY=你的DeepL_API密钥
```

### 5. 配置 GoldenDict/GoldenDict-ng

#### 打开程序设置
1. 启动 GoldenDict 或 GoldenDict-ng
2. 按 `F3` 键或通过菜单打开 "Dictionaries" 设置

#### 添加程序配置
在 "Programs" 面板中添加以下配置：

| 字段 | 值 |
|------|-----|
| **Type** | `Html` |
| **Name** | `DeepL Translation` |
| **Command Line** | `node "/path/to/GoldenDict-DeepL/DeepL.js" %GDWORD%` |

**重要：** 将 `/path/to/GoldenDict-DeepL/` 替换为您实际的项目路径。

```bash
# Windows 示例
node "C:\Users\YourName\GoldenDict-DeepL\DeepL.js" %GDWORD%
```

### 6. 使用方法

#### 翻译功能
- **中文 → 英文：** 输入中文内容，自动翻译为英文
- **其他语言 → 中文：** 输入非中文内容，自动翻译为中文

### 7. 故障排除

#### 常见问题

**问题 1：** "Please set DEEPL_AUTH_KEY in .env file"
- **解决方案：** 检查 `.env` 文件是否存在且包含正确的 API 密钥

**问题 2：** Node.js 命令无法识别
- **解决方案：** 确保 Node.js 已正确安装并添加到系统 PATH 中

**问题 3：** The program has returned exit code 255. on Mac
- **解决方案：** 由于你的开发环境存在冲突，请在步骤5的**Command Line**中使用完整的`node`地址

#### 测试安装
在项目目录下运行以下命令测试：

```bash
node DeepL.js "Hello World"
```

如果配置正确，应该会看到中文翻译结果和使用量信息。
