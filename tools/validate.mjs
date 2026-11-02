#!/usr/bin/env node
// TENSOR — Validatore scene ↔ DNA ↔ dimensioni
// Uso: node tools/validate.mjs [--strict]
//   errori   → exit 1 (struttura rotta: il profiler leggerebbe dati sbagliati)
//   warning  → exit 0, oppure exit 1 con --strict (incoerenze editoriali)

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA = path.join(ROOT, 'prototype/js/data');
const MODES = ['direct', 'masked', 'incidental'];
const FAMILIES = ['sociale', 'sistemi', 'corpo'];

const errors = [];
const warnings = [];
const err = (where, msg) => errors.push(`${where}: ${msg}`);
const warn = (where, msg) => warnings.push(`${where}: ${msg}`);

const { DIMENSIONS } = await import(pathToFileURL(path.join(DATA, 'dimensions.js')));
const DIM = Object.fromEntries(DIMENSIONS.map(d => [d.id, d]));

// ---- DNA ----
const dnas = {};
for (const f of fs.readdirSync(ROOT).filter(f => f.endsWith('.json'))) {
  let d;
  try {
    d = JSON.parse(fs.readFileSync(path.join(ROOT, f), 'utf8'));
  } catch (e) {
    err(f, `JSON non valido (${e.message})`);
    continue;
  }
  if (!d.id || !d.dimensions_mobilized) continue; // non è un DNA
  if (dnas[d.id]) err(f, `id duplicato '${d.id}'`);
  dnas[d.id] = d;

  for (const k of ['label', 'archetype_family', 'moral_structure', 'requires', 'failure_modes', 'editorial_notes']) {
    if (d[k] === undefined) err(f, `campo obbligatorio mancante '${k}'`);
  }
  if (d.archetype_family && !FAMILIES.includes(d.archetype_family)) {
    err(f, `archetype_family '${d.archetype_family}' non in ${FAMILIES.join('/')}`);
  }
  for (const m of d.dimensions_mobilized) {
    if (!DIM[m.dimension_id]) err(f, `dimensione sconosciuta '${m.dimension_id}'`);
    if (!MODES.includes(m.measurement_mode)) err(f, `measurement_mode '${m.measurement_mode}' non valido`);
    if (!(m.weight > 0 && m.weight <= 1)) err(f, `weight ${m.weight} fuori da (0,1] per ${m.dimension_id}`);
  }
}

// ---- Scene ----
const povFiles = fs.readdirSync(DATA).filter(f => /^pov-.*\.js$/.test(f));
let sceneCount = 0;

for (const f of povFiles) {
  const mod = await import(pathToFileURL(path.join(DATA, f)));
  const pov = Object.values(mod).find(v => v && Array.isArray(v.scenes));
  if (!pov) {
    err(f, 'nessun export con scenes[]');
    continue;
  }

  for (const scene of pov.scenes) {
    sceneCount++;
    const where = `${pov.pov_id}/${scene.scene_id}`;
    const dna = dnas[scene.prototype_activated];

    if (!dna) warn(where, `prototipo '${scene.prototype_activated}' senza file DNA — misure non verificabili`);
    if (!FAMILIES.includes(scene.domain)) err(where, `domain '${scene.domain}' mancante o non valido`);
    if (dna && scene.domain !== dna.archetype_family) {
      warn(where, `domain '${scene.domain}' ≠ archetype_family del DNA '${dna.archetype_family}'`);
    }

    // actually_measures
    const measures = scene.actually_measures;
    if (!Array.isArray(measures) || measures.length === 0) {
      err(where, 'actually_measures mancante: il profiler non sa con che peso leggere i segnali');
      continue;
    }
    const M = {};
    for (const m of measures) {
      if (!DIM[m.dimension_id]) err(where, `actually_measures: dimensione sconosciuta '${m.dimension_id}'`);
      if (!MODES.includes(m.measurement_mode)) err(where, `actually_measures: mode '${m.measurement_mode}' non valido`);
      if (!(m.weight > 0 && m.weight <= 1)) err(where, `actually_measures: weight ${m.weight} fuori da (0,1]`);
      if (M[m.dimension_id]) err(where, `actually_measures: '${m.dimension_id}' dichiarata due volte`);
      M[m.dimension_id] = m;
    }
    if (dna) {
      for (const dm of dna.dimensions_mobilized) {
        const m = M[dm.dimension_id];
        if (!m) warn(where, `il DNA mobilita '${dm.dimension_id}' ma la scena non la dichiara`);
        else if (m.measurement_mode !== dm.measurement_mode || m.weight !== dm.weight) {
          warn(where, `'${dm.dimension_id}' dichiarata ${m.measurement_mode}/${m.weight}, il DNA dice ${dm.measurement_mode}/${dm.weight}`);
        }
      }
    }

    // Segnali
    const signalled = {};
    for (const [ni, node] of scene.nodes.entries()) {
      const nwhere = `${where}#nodo${ni + 1}`;
      const keys = node.choices.map(c => c.key);
      if (new Set(keys).size !== keys.length) err(nwhere, `chiavi di scelta duplicate (${keys.join(',')})`);
      if (!keys.includes('B')) err(nwhere, "manca la scelta 'B' (default al timeout)");
      if (!(node.timer_seconds > 0)) warn(nwhere, 'timer_seconds mancante: si usa il default 12s');

      for (const c of node.choices) {
        const cwhere = `${nwhere}/${c.key}`;
        if (!node.continuations?.[c.key]) warn(cwhere, 'nessuna continuation');
        if (c.kobayashi && c.visible !== false) warn(cwhere, 'kobayashi ma visibile di default');
        if (!c.kobayashi && c.visible === false) warn(cwhere, 'nascosta ma non kobayashi: irraggiungibile');

        const sigs = c.effects?.profile_signals || [];
        if (sigs.length === 0) warn(cwhere, 'scelta senza profile_signals');
        for (const s of sigs) {
          const d = DIM[s.dimension_id];
          if (!d) {
            err(cwhere, `segnale su dimensione sconosciuta '${s.dimension_id}'`);
            continue;
          }
          if (s.direction !== d.polarity_a && s.direction !== d.polarity_b) {
            err(cwhere, `direction '${s.direction}' non è un polo di ${s.dimension_id} (${d.polarity_a}/${d.polarity_b})`);
          }
          if (!(typeof s.magnitude === 'number' && s.magnitude > 0)) err(cwhere, `magnitude ${s.magnitude} non valida`);
          if (!M[s.dimension_id]) err(cwhere, `segnale su '${s.dimension_id}' non dichiarata in actually_measures`);
          signalled[s.dimension_id] = (signalled[s.dimension_id] || 0) + 1;
        }
      }
    }

    // La scena misura ciò che il suo prototipo dice di misurare?
    const primary = new Set((dna?.dimensions_mobilized || []).filter(x => x.role === 'primary').map(x => x.dimension_id));
    for (const m of measures) {
      if (signalled[m.dimension_id]) continue;
      if (primary.has(m.dimension_id)) warn(where, `dimensione PRIMARIA del DNA '${m.dimension_id}' non riceve nessun segnale`);
      else warn(where, `'${m.dimension_id}' dichiarata ma mai segnalata`);
    }
  }
}

// ---- Report ----
console.log(`TENSOR validate — ${Object.keys(dnas).length} DNA, ${sceneCount} scene`);
for (const e of errors) console.log(`  ✗ ${e}`);
for (const w of warnings) console.log(`  ⚠ ${w}`);
console.log(`${errors.length} errori, ${warnings.length} warning`);

const strict = process.argv.includes('--strict');
process.exit(errors.length > 0 || (strict && warnings.length > 0) ? 1 : 0);
