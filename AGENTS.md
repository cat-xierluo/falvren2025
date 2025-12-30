# 项目协作指南（AI/自动化代理）

本文件用于约束 AI/自动化代理在本仓库中的行为，确保改动可追踪、可维护、可回滚。

## 基本约定
- 全程使用中文回复与写作。
- 变更须可追踪：重要决策记录到 `docs/DECISIONS.md`。
- 用户可见变更必须写入 `status/CHANGELOG.md`。
- 完成目标后在 `status/TASKS.md` 勾选并更新 `status/JOURNAL.md` 记录。

## 标准流程（SOP）
1) 读取 `status/TASKS.md`，从上到下选择第一个未完成目标。
2) 若发现涌现任务：先在 `docs/DECISIONS.md` 记录原因与方案，再执行。
3) 完成代码/文档修改后，更新 `status/CHANGELOG.md`。
4) 勾选任务完成并在 `status/JOURNAL.md` 顶部追加日志。

## 编辑规范
- 尽量小步提交、明确 commit message。
- 不回滚或覆盖非本次产生的改动。
- 不使用破坏性命令（如 `git reset --hard`），除非用户明确要求。
- 导出截图尺寸严格固定为手机比例（例如 390×844），不得改为其他比例或动态计算。

## 文件清单
- 目标与任务：`status/TASKS.md`
- 变更日志：`status/CHANGELOG.md`
- 决策记录：`docs/DECISIONS.md`
- 工作日志：`status/JOURNAL.md`
- 路线图：`docs/ROADMAP.md`
