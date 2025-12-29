# Falvren 2025 - 律师年度报告生成器

> 一个有趣的律师年度工作回顾生成器，通过可视化的方式展示律师一年的工作状态。

## ✨ 功能特性

- 📊 **数据可视化展示**
  - 12368 热线拨打统计
  - 深夜工作记录
  - Word 文档创建统计
  - 高频话术分析
  - 职业信心变化曲线
  - 工作日与休息统计

- 🎨 **精美 UI 设计**
  - 基于 shadcn-ui 的现代化组件库
  - Tailwind CSS 响应式布局
  - 流畅的页面过渡动画
  - 支持深色/浅色主题

- 📱 **移动端优化**
  - 完美适配手机屏幕
  - 触摸友好的交互体验

- 💾 **分享功能**
  - 支持生成年度报告海报
  - 一键分享到社交媒体

## 🚀 快速开始

### 环境要求

- Node.js >= 18.x
- npm 或 yarn 或 pnpm

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173 查看应用

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 🛠️ 技术栈

### 核心框架
- **[Vite](https://vitejs.dev/)** - 新一代前端构建工具
- **[React 18](https://react.dev/)** - UI 框架
- **[TypeScript](https://www.typescriptlang.org/)** - 类型安全

### UI 组件库
- **[shadcn/ui](https://ui.shadcn.com/)** - 高质量的 React 组件库
- **[Tailwind CSS](https://tailwindcss.com/)** - 实用优先的 CSS 框架
- **[Radix UI](https://www.radix-ui.com/)** - 无样式的可访问组件
- **[Framer Motion](https://www.framer.com/motion/)** - 动画库
- **[Lucide React](https://lucide.dev/)** - 图标库

### 数据可视化
- **[Recharts](https://recharts.org/)** - 图表库

### 状态管理
- **[TanStack Query](https://tanstack.com/query)** - 数据获取与缓存

### 路由
- **[React Router](https://reactrouter.com/)** - 客户端路由

### 表单处理
- **[React Hook Form](https://react-hook-form.com/)** - 高性能表单库
- **[Zod](https://zod.dev/)** - TypeScript 优先的模式验证

## 📁 项目结构

```
falvren2025/
├── src/
│   ├── components/
│   │   ├── report/          # 报告页面组件
│   │   └── ui/              # shadcn-ui 基础组件
│   ├── hooks/               # 自定义 React Hooks
│   ├── lib/                 # 工具函数和数据
│   ├── pages/               # 页面组件
│   ├── App.tsx              # 根组件
│   └── main.tsx             # 应用入口
├── public/                  # 静态资源
├── index.html               # HTML 模板
├── vite.config.ts           # Vite 配置
├── tailwind.config.ts       # Tailwind 配置
└── tsconfig.json            # TypeScript 配置
```

## 📝 主要页面

### 报告生成流程

1. **StartPage** - 启动页面，介绍报告功能
2. **IdentityPage** - 身份信息录入
3. **PhonePage** - 12368 热线数据
4. **LateNightPage** - 深夜工作记录
5. **WordPage** - 文档统计
6. **PhrasesPage** - 高频话术
7. **ConfidencePage** - 职业信心曲线
8. **ScenePage** - 场景图库
9. **PromotePage** - 推广页面
10. **ConclusionPage** - 总结与分享

## 🎨 自定义配置

### 修改报告数据

编辑 `src/lib/reportData.ts` 文件可以自定义报告生成的数据范围和内容。

### 添加新的 UI 组件

使用 shadcn-ui CLI 添加新组件：

```bash
npx shadcn@latest add [component-name]
```

### 修改主题颜色

编辑 `src/index.css` 文件中的 CSS 变量来自定义主题颜色。

## 🔧 开发脚本

```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 构建开发版本
npm run build:dev

# 代码检查
npm run lint

# 预览生产构建
npm run preview
```

## 📄 License

MIT

## 👤 作者

Created with ❤️ using [Lovable](https://lovable.dev)
