#!/usr/bin/env node
// TENSOR — Genera prototype/js/data/dna.js dai file DNA JSON nella root.
// Il prototipo è vanilla JS senza server: i JSON vengono inlineati in un modulo.
// Si esporta solo ciò che serve al runtime (il resto dei DNA è editoriale).
//
// Uso: node tools/build-dna.mjs          (scrive il file)
//      node tools/build-dna.mjs --check  (exit 1 se il file è fuori sync)

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'prototype/js/data/dna.js');

export function buildDnaModule() {
  const dnas = [];
  for (const f of fs.readdirSync(ROOT).filter(f => f.endsWith('.json')).sort()) {
    const d = JSON.parse(fs.readFileSync(path.join(ROOT, f), 'utf8'));
    if (!d.id || !d.dimensions_mobilized) continue;
    dnas.push({
      id: d.id,
      label: d.label,
      archetype_family: d.archetype_family,
      moral_structure: d.moral_structure,
      dimensions_mobilized: d.dimensions_mobilized.map(({ dimension_id, role, measurement_mode, weight }) =>
        ({ dimension_id, role, measurement_mode, weight })),
      requires: {
        for_profiling: (d.requires?.for_profiling || []).map(({ condition, value }) => ({ condition, value })),
        for_contradiction_reveal: (d.requires?.for_contradiction_reveal || []).map(({ prototype_id, min_observations }) =>
          ({ prototype_id, min_observations }))
      }
    });
  }
  const body = JSON.stringify(Object.fromEntries(dnas.map(d => [d.id, d])), null, 2);
  return `// TENSOR — DNA prototipi (GENERATO da tools/build-dna.mjs, non modificare a mano)
// Sorgente: i file *.json nella root del repo. Rigenerare con: npm run build:dna

export const DNA = ${body};
`;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const next = buildDnaModule();
  const current = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : null;
  if (process.argv.includes('--check')) {
    if (current !== next) {
      console.error('dna.js fuori sync con i JSON: esegui `npm run build:dna`');
      process.exit(1);
    }
    console.log('dna.js in sync');
  } else {
    fs.writeFileSync(OUT, next);
    console.log(`scritto ${path.relative(ROOT, OUT)}`);
  }
}
