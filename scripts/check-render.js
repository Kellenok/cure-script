#!/usr/bin/env node
/**
 * Рендер-проверка markdown в config/docs:
 *   1) непарные <code>...</code>
 *   2) **, которые остаются звёздочками после рендера
 *      (классические ловушки flanking-правил: ** вплотную к ( ) ' и т.п.)
 *   3) [X]{y} — фуригана, которая не превратилась в <ruby>
 *      (плагин не установлен/не подключён, либо синтаксис внутри literal-кода)
 *
 * Запуск: npm run docs:check   (код выхода 1 — если найдены ошибки)
 */
"use strict";

const fs = require("fs");
const path = require("path");

let MarkdownIt;
try {
  MarkdownIt = require("markdown-it");
} catch {
  console.error("markdown-it не найден — сначала выполните npm install");
  process.exit(2);
}

const md = new MarkdownIt({ html: true });
let furiganaInstalled = false;
try {
  md.use(require("furigana-markdown-it"));
  furiganaInstalled = true;
} catch {
  // плагина нет — если [X]{y} встречается в тексте, чек даст на это ошибку
}

const root = path.resolve(__dirname, "..");
const roots = ["config/docs/en", "config/docs/ru"];
const FENCE = /^\s*```/;
const FURIGANA = /\[[^\]\n]{1,60}\]\{[^}\n]{1,60}\}/;

const strip = (html) => html.replace(/<[^>]*>/g, "");
const snippet = (s) => {
  const t = s.trim();
  return t.length > 100 ? t.slice(0, 100) + "…" : t;
};

const errors = [];
let files = 0;
let linesTotal = 0;

for (const relRoot of roots) {
  const dir = path.join(root, relRoot);
  if (!fs.existsSync(dir)) continue;

  for (const name of fs.readdirSync(dir).sort()) {
    if (!name.endsWith(".md")) continue;
    files++;

    const rel = (relRoot + "/" + name).replace(/\\/g, "/");
    const src = fs.readFileSync(path.join(dir, name), "utf8");
    const lines = src.split("\n");

    // --- 1. парность <code> (построчно; fenced-блоки пропускаем) ---
    let inFence = false;
    lines.forEach((line, i) => {
      linesTotal++;
      if (FENCE.test(line)) inFence = !inFence;
      if (inFence) return;
      const open = (line.match(/<code>/g) || []).length;
      const close = (line.match(/<\/code>/g) || []).length;
      if (open !== close) {
        errors.push(
          `${rel}:${i + 1} непарный <code> (открытых: ${open}, закрытых: ${close}): ${snippet(line)}`
        );
      }
    });

    // --- 2/3. рендер файла целиком ---
    let html;
    try {
      html = md.render(src);
    } catch (e) {
      errors.push(`${rel} ошибка рендера: ${e.message}`);
      continue;
    }
    const text = strip(html);
    const badBold = text.includes("**");
    const badFuri = FURIGANA.test(text);
    if (!badBold && !badFuri) continue;

    // локализация по абзацам (в markdown пары ** живут в рамках абзаца,
    // поэтому проверяем блоки, разделённые пустыми строками, а не строки)
    let found = 0;
    let blockStart = 1;
    let block = [];
    const flushBlock = () => {
      if (!block.length) return;
      const blockSrc = block.join("\n");
      // источник может содержать и экранированные звёздочки (\*\*\* → в выводе ***) —
      // их матчит только рендер, поэтому фильтруем и по ним
      const needsBold = badBold && /(\*\*|\\\*)/.test(blockSrc);
      const needsFuri = badFuri && FURIGANA.test(blockSrc);
      if (needsBold || needsFuri) {
        let blockText = "";
        try {
          blockText = strip(md.render(blockSrc));
        } catch {
          /* ignore, остаётся пустым — тогда не флагаем */
        }
        if (needsBold && blockText.includes("**")) {
          found++;
          errors.push(
            `${rel}:${blockStart} ** остался звёздочками (flanking: скобки/кавычки рядом с **, либо непарные ** в абзаце): ${snippet(blockSrc)}`
          );
        }
        if (needsFuri && FURIGANA.test(blockText)) {
          found++;
          errors.push(
            `${rel}:${blockStart} [X]{y} не превратился в <ruby>${furiganaInstalled ? "" : " — furigana-markdown-it не установлен"}: ${snippet(blockSrc)}`
          );
        }
      }
      block = [];
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (/^\s*$/.test(line)) {
        flushBlock();
        blockStart = i + 2; // следующая непустая строка (1-based)
        continue;
      }
      if (!block.length) blockStart = i + 1;
      block.push(line);
    }
    flushBlock();

    if (found === 0) {
      errors.push(
        `${rel} ** или [X]{y} не рендерятся — контекстная проблема (пары ** уходят за границы абзаца?) или экранированные звёздочки \* в выводе, проверь файл вручную`
      );
    }
  }
}

if (errors.length) {
  console.log(`\n❌ Рендер-проверка: ошибок — ${errors.length}`);
  errors.forEach((e) => console.log("  " + e));
  console.log("");
  process.exit(1);
}

console.log(
  `✅ Рендер-проверка пройдена: ${files} файлов, ${linesTotal} строк, ошибок нет` +
    (furiganaInstalled ? " (furigana-markdown-it: активен)" : "")
);
