#!/usr/bin/env bash
# Re-syncs the vendored skills in skills/ from their upstream GitHub repos.
# Usage: scripts/update-skills.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

clone() { git clone --depth 1 "https://github.com/$1.git" "$WORK/$2" >/dev/null 2>&1; git -C "$WORK/$2" rev-parse HEAD; }

# blader/humanizer
HUM=$(clone blader/humanizer humanizer)
rm -rf "$ROOT/skills/humanizer"
mkdir -p "$ROOT/skills/humanizer"
(cd "$WORK/humanizer" && tar --exclude=.git --exclude=.github --exclude=.claude-plugin --exclude=.cursor-plugin -cf - .) \
  | (cd "$ROOT/skills/humanizer" && tar xf -)

# Imbad0202/academic-research-skills (the four skill folders, upstream's "project skills" install)
ARS=$(clone Imbad0202/academic-research-skills ars)
for s in academic-paper academic-paper-reviewer academic-pipeline deep-research; do
  rm -rf "$ROOT/skills/$s"
  cp -R "$WORK/ars/$s" "$ROOT/skills/$s"
  cp "$WORK/ars/LICENSE" "$ROOT/skills/$s/LICENSE"
done

# linshenkx/prompt-optimizer (templates only; SKILL.md is maintained here)
PO=$(clone linshenkx/prompt-optimizer po)
rm -rf "$ROOT/skills/prompt-optimizer/references"
node --experimental-strip-types --no-warnings "$ROOT/scripts/extract-prompt-optimizer.mjs" \
  "$WORK/po" "$ROOT/skills/prompt-optimizer/references"
cp "$WORK/po/LICENSE" "$ROOT/skills/prompt-optimizer/LICENSE"

echo
echo "Upstream commits (update UPSTREAM.md):"
echo "  blader/humanizer                    $HUM"
echo "  Imbad0202/academic-research-skills  $ARS"
echo "  linshenkx/prompt-optimizer          $PO"
