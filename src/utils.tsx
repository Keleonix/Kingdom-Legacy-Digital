import { EFFECT_KEYWORDS } from "./types";

export function parseEffects(raw: string) {
  if (!raw) return { before: "", effects: [] as { text: string; keyword: string }[] };

  const pattern = new RegExp(`\\b(${EFFECT_KEYWORDS.join("|")})`, "gi");

  const matches: Array<{ index: number; keyword: string }> = [];
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(raw)) !== null) {
    matches.push({ index: match.index, keyword: match[0].toLowerCase() });
  }

  if (matches.length === 0) {
    return { before: raw.trim(), effects: [] };
  }

  const validMatches = matches.filter(m => {
    let depth = 0;
    for (let i = 0; i < m.index; i++) {
      if (raw[i] === '(') depth++;
      else if (raw[i] === ')') depth--;
    }
    if (depth !== 0) return false;

    let lastPeriodIndex = -1;
    for (let i = m.index - 1; i >= 0; i--) {
      if (raw[i] === '.') { lastPeriodIndex = i; break; }
    }
    const textBefore = raw.slice(lastPeriodIndex + 1, m.index);
    return /^\s*$/.test(textBefore);
  });

  if (validMatches.length === 0) {
    return { before: raw.trim(), effects: [] };
  }

  const before = raw.slice(0, validMatches[0].index).trim();
  const effects: { text: string; keyword: string }[] = [];

  for (let i = 0; i < validMatches.length; i++) {
    const start = validMatches[i].index;
    let effectText = "";
    let depth = 0;
    let foundEnd = false;

    for (let j = start; j < raw.length; j++) {
      const ch = raw[j];

      if (ch === '(') depth++;
      else if (ch === ')') depth--;
      else if (ch === '.' && depth === 0) {
        const nextKeywordIndex = i < validMatches.length - 1 ? validMatches[i + 1].index : Infinity;

        let hasParenAfter = false;
        let parenStart = -1;
        for (let k = j + 1; k < nextKeywordIndex && k < raw.length; k++) {
          if (raw[k] === '(') { hasParenAfter = true; parenStart = k; break; }
          else if (raw[k].trim() && validMatches.some(vm => vm.index === k)) { break; }
        }

        if (hasParenAfter && parenStart < nextKeywordIndex) {
          let parenDepth = 1;
          let parenEnd = -1;
          for (let k = parenStart + 1; k < raw.length; k++) {
            if (raw[k] === '(') parenDepth++;
            else if (raw[k] === ')') {
              parenDepth--;
              if (parenDepth === 0) { parenEnd = k; break; }
            }
          }
          if (parenEnd !== -1) {
            effectText = raw.slice(start, parenEnd + 1).trim();
            foundEnd = true;
            break;
          }
        } else {
          effectText = raw.slice(start, j + 1).trim();
          foundEnd = true;
          break;
        }
      }
    }

    if (!foundEnd) {
      const end = i < validMatches.length - 1 ? validMatches[i + 1].index : raw.length;
      effectText = raw.slice(start, end).trim();
    }

    if (effectText) {
      effects.push({ text: effectText, keyword: validMatches[i].keyword });
    }
  }

  return { before, effects };
}
