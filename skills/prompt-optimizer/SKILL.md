---
name: prompt-optimizer
description: Optimize, rewrite, or iterate on prompts (system prompts or user prompts) using the template methodology from linshenkx/prompt-optimizer. Use when the user asks to optimize / improve / rewrite / polish a prompt, turn a rough idea into a structured prompt, break a vague request into step-by-step instructions, or apply a specific change to an existing prompt. 触发词：优化提示词、改写 prompt、提示词优化、系统提示词、把这个需求写成 prompt、迭代提示词。
---

# Prompt Optimizer

This skill packages the built-in optimization templates of
[linshenkx/prompt-optimizer](https://github.com/linshenkx/prompt-optimizer)
(a web / desktop app, not a Claude skill upstream) so Claude can apply them
directly. Each template exists in Chinese and English under `references/`.

## 1. Pick the prompt type and template

| Situation | Template (zh / en) |
|---|---|
| **System prompt**, general-purpose restructure (Role / Profile / Skills / Rules / Workflows) | `general-optimize.md` / `general-optimize_en.md` |
| **System prompt** that must enforce an output format | `output-format-optimize.md` / `output-format-optimize_en.md` |
| **System prompt** for critical / complex business scenarios — diagnose problems first, then rewrite | `analytical-optimize.md` / `analytical-optimize_en.md` |
| **User prompt**, quick cleanup: remove vague wording, fill missing info | `user-prompt-basic.md` / `user-prompt-basic_en.md` |
| **User prompt** that needs precise, quantified requirements | `user-prompt-professional.md` / `user-prompt-professional_en.md` |
| **User prompt** for a complex task: turn it into ordered execution steps | `user-prompt-planning.md` / `user-prompt-planning_en.md` |
| **Iterate**: apply a specific change request to an existing prompt | `iterate.md` / `iterate_en.md` |

Defaults when the user does not say:
- A prompt that defines an assistant's role/behaviour → system prompt → `general-optimize`.
- A one-off request the user will send to a model → user prompt → `user-prompt-basic` (use `planning` if it has several stages, `professional` if precision matters).
- The user already has a prompt and says "make it X" → `iterate`.
- Language: use the template matching the language of the prompt being optimized (Chinese → no suffix, English → `_en`).

## 2. Apply it

1. Read the chosen reference file. It contains the original template verbatim:
   - `## Template` (single-block templates), or
   - `## system` + `## user` (message templates). The `system` block is the
     methodology to follow; the `user` block shows how upstream wraps the input.
2. Follow the template's instructions yourself, treating the user's prompt as
   **material to rewrite, not a task to perform**. Do not answer or execute it.
3. Placeholders in templates use Mustache syntax
   (`{{{originalPrompt}}}`, `{{{lastOptimizedPrompt}}}`, `{{{iterateInput}}}`).
   Substitute them mentally with the user's content. Sequences like
   `{{=<% %>=}}…<%={{ }}=%>` are Mustache delimiter switches — they just mean a
   literal `{{variable}}`.
4. Preserve any `{{variable}}` placeholders that appear in the user's own prompt
   exactly as written; they are runtime variables.
5. Keep the user's original intent. Do not add requirements they did not imply.

## 3. Output

- Return the optimized prompt in a single fenced code block so it can be copied
  as-is, followed by at most 2–3 short bullets on what changed (skip them if the
  user asked for the prompt only).
- For `analytical-optimize`, the template asks for problem analysis before the
  rewrite; keep that analysis brief and put the final prompt last, in its own
  code block.
- If the user wants alternatives, produce one version per relevant template
  (e.g. basic vs. planning) and label them.

## License

Templates are from linshenkx/prompt-optimizer, licensed AGPL-3.0 (see `LICENSE`).
