// Regenerates skills/prompt-optimizer/references/*.md from a checkout of
// linshenkx/prompt-optimizer.
// Usage: node --experimental-strip-types --no-warnings scripts/extract-prompt-optimizer.mjs <prompt-optimizer-checkout> <out-dir>
import fs from 'fs';
import os from 'os';
import path from 'path';
import { pathToFileURL } from 'url';

const [repo, outDir] = process.argv.slice(2);
if (!repo || !outDir) {
  console.error('usage: extract-prompt-optimizer.mjs <prompt-optimizer-checkout> <out-dir>');
  process.exit(1);
}

const base = path.join(repo, 'packages/core/src/services/template/default-templates');
const files = [
  'optimize/general-optimize',
  'optimize/analytical-optimize',
  'optimize/output-format-optimize',
  'user-optimize/user-prompt-basic',
  'user-optimize/user-prompt-professional',
  'user-optimize/user-prompt-planning',
  'iterate/iterate',
];

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'po-extract-'));
fs.mkdirSync(outDir, { recursive: true });

for (const f of files) {
  for (const lang of ['', '_en']) {
    const name = path.basename(f) + lang;
    // Template files only import types; drop the imports so they load standalone.
    const src = fs.readFileSync(path.join(base, f + lang + '.ts'), 'utf8').replace(/^import .*$/gm, '');
    const tmp = path.join(tmpDir, name + '.ts');
    fs.writeFileSync(tmp, src);
    const t = Object.values(await import(pathToFileURL(tmp).href))[0];

    const zh = lang === '';
    const md = [
      `# ${t.name}`,
      '',
      `> ${t.metadata?.description ?? ''}`,
      '',
      `> ${zh ? '来源' : 'Source'}: linshenkx/prompt-optimizer — packages/core/src/services/template/default-templates (id: \`${t.id}\`, type: \`${t.metadata?.templateType}\`)`,
      '',
    ];
    if (typeof t.content === 'string') {
      md.push('## Template', '', '````markdown', t.content.trim(), '````');
    } else {
      for (const m of t.content) md.push(`## ${m.role}`, '', '````markdown', m.content.trim(), '````', '');
    }
    fs.writeFileSync(path.join(outDir, name + '.md'), md.join('\n').trimEnd() + '\n');
    console.log('wrote', name + '.md');
  }
}

fs.rmSync(tmpDir, { recursive: true, force: true });
