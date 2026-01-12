# 贡献指南 / Contributing Guide

感谢您对 YAPI MCP Server 项目的关注！我们欢迎所有形式的贡献。

Thank you for your interest in contributing to YAPI MCP Server! We welcome all forms of contributions.

## 如何贡献 / How to Contribute

### 报告 Bug / Reporting Bugs

如果您发现了 bug，请通过 GitHub Issues 报告，并包含以下信息：
If you find a bug, please report it via GitHub Issues with the following information:

- 问题描述 / Description of the issue
- 复现步骤 / Steps to reproduce
- 预期行为 / Expected behavior
- 实际行为 / Actual behavior
- 环境信息 / Environment information (Node.js version, OS, etc.)

### 提出新功能 / Suggesting Features

我们欢迎新功能建议！请在 Issues 中：
We welcome feature suggestions! Please:

- 详细描述功能需求 / Describe the feature in detail
- 说明使用场景 / Explain the use case
- 如果可能，提供示例 / Provide examples if possible

### 提交代码 / Submitting Code

1. **Fork 项目 / Fork the repository**

2. **创建分支 / Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **开发和测试 / Develop and test**
   - 遵循现有代码风格 / Follow existing code style
   - 添加必要的注释 / Add necessary comments
   - 确保 TypeScript 编译通过 / Ensure TypeScript compiles without errors
   ```bash
   npm run typecheck
   ```

4. **提交更改 / Commit changes**
   ```bash
   git commit -m "feat: add your feature description"
   ```
   
   提交信息格式 / Commit message format:
   - `feat:` 新功能 / New feature
   - `fix:` Bug 修复 / Bug fix
   - `docs:` 文档更新 / Documentation update
   - `refactor:` 代码重构 / Code refactoring
   - `test:` 测试相关 / Test related
   - `chore:` 其他修改 / Other changes

5. **推送到您的 Fork / Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **创建 Pull Request / Create a Pull Request**

## 代码规范 / Code Standards

- 使用 TypeScript / Use TypeScript
- 所有函数需要类型注解 / All functions need type annotations
- 注释使用简体中文 / Comments in Simplified Chinese
- 变量/函数命名使用英文 / Variable/function names in English
- 遵循 ESLint 规则 / Follow ESLint rules

## 开发环境设置 / Development Setup

```bash
# 安装依赖 / Install dependencies
npm install

# 运行类型检查 / Run type check
npm run typecheck

# 运行开发服务器 / Run development server
npm run dev
```

## 问题和讨论 / Questions and Discussions

如有任何问题，欢迎通过以下方式联系：
For any questions, feel free to reach out via:

- GitHub Issues
- GitHub Discussions（如果启用 / if enabled）

再次感谢您的贡献！🎉
Thank you again for your contribution! 🎉
