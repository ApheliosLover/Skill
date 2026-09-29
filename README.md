# Skill 合集

个人收集的 Claude Code skill。每个 skill 是 `skills/` 下的一个文件夹，里面有一个 `SKILL.md`。在别的仓库里使用时，把需要的文件夹复制到那个仓库的 `.claude/skills/`（只对该项目生效）或 `~/.claude/skills/`（对所有项目生效）即可。

## 收录的 skill

| Skill | 用途 | 来源 | 许可证 |
|---|---|---|---|
| [`humanizer`](skills/humanizer/) | 去掉文本里的 “AI 味”，保持原意 | [blader/humanizer](https://github.com/blader/humanizer) | MIT |
| [`prompt-optimizer`](skills/prompt-optimizer/) | 优化 / 改写 / 迭代系统提示词和用户提示词 | 根据 [linshenkx/prompt-optimizer](https://github.com/linshenkx/prompt-optimizer) 的内置模板改写 | AGPL-3.0 |
| [`deep-research`](skills/deep-research/) | 学术深度调研、文献综述、事实核查 | [Imbad0202/academic-research-skills](https://github.com/Imbad0202/academic-research-skills) | CC BY-NC 4.0 |
| [`academic-paper`](skills/academic-paper/) | 学术论文写作流程（大纲、初稿、修改、引用检查等） | 同上 | CC BY-NC 4.0 |
| [`academic-paper-reviewer`](skills/academic-paper-reviewer/) | 多角色模拟论文审稿 | 同上 | CC BY-NC 4.0 |
| [`academic-pipeline`](skills/academic-pipeline/) | 串联 调研 → 写作 → 审稿 → 修改 的完整流程 | 同上 | CC BY-NC 4.0 |
| [`shared`](skills/shared/) | 不是 skill：上面四个学术 skill 共用的协议、合同模板、schema 等 | 同上 | CC BY-NC 4.0 |

上游版本见 [UPSTREAM.md](UPSTREAM.md)。

### 说明

- **prompt-optimizer**：上游是一个网页 / 桌面应用，本身不是 skill。这里的 `SKILL.md` 是新写的，`references/` 里是从上游源码原样提取的 14 个优化模板（7 种 × 中英文）。
- **学术四件套**：四个 skill 文件夹加上游的 `shared/` 目录。`shared/` 放在和 skill 同级的位置，复制后在 `.claude/skills/shared/`，SKILL.md 里 `../shared/...` 的链接可以直接找到。仍然不包含的：上游 `scripts/`（引用校验等 Python 功能）、`/ars-*` 斜杠命令和 hooks。需要这些时改用上游插件安装：
  ```text
  /plugin marketplace add Imbad0202/academic-research-skills
  /plugin install academic-research-skills
  ```
- CC BY-NC 4.0 不允许商用；AGPL-3.0 对再分发有开源要求。

## 在别的仓库中使用

手动复制：

```bash
git clone --depth 1 https://github.com/ApheliosLover/Skill.git /tmp/skill-collection
mkdir -p .claude/skills
cp -R /tmp/skill-collection/skills/humanizer .claude/skills/
```

学术四件套要五个文件夹一起复制，并在目标仓库的 `CLAUDE.md` 里加一行导入上游的路由规则（决定请求交给哪个 skill、不确定时先问你）：

```bash
for s in deep-research academic-paper academic-paper-reviewer academic-pipeline shared; do
  cp -R /tmp/skill-collection/skills/$s .claude/skills/
done
echo '@.claude/skills/shared/ARS_PROJECT_CLAUDE.md' >> CLAUDE.md
```

或者直接告诉 Claude：

> 从 https://github.com/ApheliosLover/Skill 把 humanizer 和 prompt-optimizer 这两个 skill 复制到本仓库的 .claude/skills/

Claude Code 会话启动时加载 skill，复制后新开一个会话（或重启）即可使用。

## 更新

```bash
./scripts/update-skills.sh   # 从上游重新拉取，然后更新 UPSTREAM.md 里的 commit
```

脚本需要 `git` 和 Node.js 22+（用于从 prompt-optimizer 的 TypeScript 源码中提取模板）。`skills/prompt-optimizer/SKILL.md` 是本仓库自己维护的，不会被脚本覆盖。

## 新增 skill

在 `skills/<名字>/` 下放一个 `SKILL.md`（YAML frontmatter 里要有 `name` 和 `description`），然后在上面的表格里加一行。
