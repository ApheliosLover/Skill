# Skill collection

This repo is a collection of Claude Code skills. Each skill lives in `skills/<name>/` with a `SKILL.md`.

## Installing a skill into another repo

When asked to take a skill from this repo into another project:

1. Clone this repo somewhere temporary: `git clone --depth 1 https://github.com/ApheliosLover/Skill.git <tmp>`.
2. Copy the whole folder, not just `SKILL.md`: `cp -R <tmp>/skills/<name> <project>/.claude/skills/<name>`. Skills reference files beside them (`references/`, `templates/`, `agents/`, `scripts/`).
3. `academic-pipeline` orchestrates `deep-research`, `academic-paper` and `academic-paper-reviewer`; copy all four together.
4. Skills load at session start, so tell the user to start a new session to use them.
5. Mention the license if relevant: academic skills are CC BY-NC 4.0 (non-commercial), prompt-optimizer templates are AGPL-3.0, humanizer is MIT.

## Maintaining this repo

- `scripts/update-skills.sh` re-syncs every vendored skill from upstream; afterwards update the commits in `UPSTREAM.md`.
- Don't hand-edit vendored skill files; changes are lost on the next sync. `skills/prompt-optimizer/SKILL.md` is the exception (maintained here).
- When adding a skill, add a row to the table in `README.md` and to `UPSTREAM.md` if it comes from elsewhere.
