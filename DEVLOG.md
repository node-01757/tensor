# TENSOR — Development Log

## Stato attuale: v0.3 — Profiler v1 + binding scene↔DNA

**Ultimo aggiornamento:** 2026-11-02

---

## Architettura

### Stack
- Vanilla HTML/CSS/JS, ES modules, no framework, no server
- Prototipo giocabile in `prototype/index.html` (servire con HTTP server locale)

### Struttura file

```
TENSOR/
├── TENSOR_GDD.md              # Game Design Document completo
├── TENSOR_schemas_v1.md       # Schema canonico per tutti i JSON
├── DEVLOG.md                  # ← questo file
│
├── [13 DNA prototipi].json    # Pool completo archetipi (vedi sotto)
│
└── prototype/
    ├── index.html
    ├── css/
    │   ├── main.css
    │   ├── reveal.css
    │   └── timer.css
    ├── js/
    │   ├── app.js             # Entry point, init, localStorage
    │   ├── data/
    │   │   ├── scenes.js      # Router POV → chapter format
    │   │   ├── event.js       # Fatti condivisi della settimana
    │   │   ├── story-matrix.js # v0.2: entità, relazioni, reveal deps
    │   │   ├── dimensions.js  # 6 dimensioni morali
    │   │   ├── reveal-templates.js
    │   │   ├── pov-enrico.js  # POV Enrico (4 scene)
    │   │   ├── pov-marco.js   # POV Marco (4 scene)
    │   │   └── pov-sara.js    # POV Sara (4 scene, arco oscuro)
    │   ├── engine/
    │   │   ├── scene-engine.js    # Core: flusso multi-POV, cross-run flags
    │   │   ├── profiler.js        # Profiler v1: run + profilo cumulativo persistente
    │   │   ├── reveal-engine.js   # Reveal cross-POV + Sara-specific
    │   │   ├── flag-engine.js     # Gestione flag narrative
    │   │   ├── ghost-events.js    # Eventi fantasma
    │   │   ├── timer.js           # Timer scelte
    │   │   └── token-manager.js   # Gestione token (3 per run)
    │   └── ui/
    │       ├── screens.js         # Rendering schermate + POV cards
    │       └── typewriter.js      # Effetto typewriter
│
├── tools/
│   ├── validate.mjs           # Validatore scene ↔ DNA ↔ dimensioni
│   └── test-profiler.mjs      # Test unitari profiler (node:test)
└── package.json               # Solo script di sviluppo, zero dipendenze
```

### Comandi di sviluppo

```bash
npm run validate          # errori → exit 1; warning editoriali stampati
npm run validate:strict   # anche i warning fanno fallire
npm test                  # test profiler
npm run serve             # http://localhost:8000
```

### Concetti chiave

- **Multi-POV**: 1 evento → N punti di vista → 4 scene ciascuno. Stessa settimana da prospettive diverse
- **POV gravity**: ordine suggerito (non forzato) — Enrico(1) → Marco(2) → Sara(4). Qualifiers guidano il giocatore
- **Cross-run flags**: flag attive da run completati si propagano nei run successivi
- **Entity visibility**: ogni entità ha visibilità diversa per POV (null, indiretta, presenza_diretta, voce, odore)
- **Entity relationships**: legami ontologici (power, origin, method, debt, knowledge) con visibilità per POV
- **Reveal dependencies**: stessa informazione cambia significato in base ai POV completati
- **Kobayashi Maru**: terza scelta nascosta, costa 1 token (3 token totali per run)
- **Silent moral profiling**: 6 dimensioni tracciate senza che il giocatore lo sappia

### 6 dimensioni morali
1. `lealta_vs_giustizia`
2. `protezione_vs_interesse_personale`
3. `confronto_vs_fuga`
4. `controllo_vs_accettazione`
5. `compliance_vs_reframing`
6. `conformismo_vs_autonomia`

---

## DNA Prototipi — 13 file

> Nota v0.3: il DEVLOG v0.2.1 diceva "13/13" ma i file erano 12 e mancava proprio `il_testimone`,
> il prototipo più usato dalle scene (4 su 12). Ora estratto dall'esempio canonico in
> `TENSOR_schemas_v1.md §3` (status: draft). `la_maschera` scritta in v0.3 (draft).

### Territorio sociale (9)
| File | ID | Dimensione primaria |
|------|-----|---------------------|
| TESTIMONE.json | il_testimone | conformismo_vs_autonomia *(draft, da schema)* |
| MASCHERA.json | la_maschera | confronto_vs_fuga + controllo_vs_accettazione *(draft)* |
| CUSTODE.json | il_custode | protezione_vs_interesse_personale |
| DEBITORE.json | il_debitore | lealta_vs_giustizia |
| TRADITORE.json | il_traditore | lealta_vs_giustizia |
| GIUDICE.json | il_giudice | lealta_vs_giustizia |
| COMPLICE.json | il_complice | compliance_vs_reframing |
| RIBELLE.json | il_ribelle | compliance_vs_reframing + conformismo_vs_autonomia |
| SOLITARIO.json | il_solitario | confronto_vs_fuga (masked) + controllo_vs_accettazione |

### Territorio sistemi (3)
| File | ID | Dimensione primaria |
|------|-----|---------------------|
| SOLDATO.json | il_soldato | compliance_vs_reframing |
| FIGLIO.json | il_figlio | controllo_vs_accettazione |
| *(+ Custode e Debitore cross-territory)* | | |

### Territorio corpo (3)
| File | ID | Dimensione primaria |
|------|-----|---------------------|
| SOPRAVVISSUTO.json | il_sopravvissuto | protezione_vs_interesse_personale |
| CORPO_MORTALE.json | il_corpo_mortale | controllo_vs_accettazione |
| LIMITE.json | il_limite | controllo_vs_accettazione + protezione_vs_interesse_personale |

---

## Story matrix v0.2 — "La Settimana"

### Entità
cane, panchina, monete, telefono_marco, busta, ragazzo_monete, berlina, sara, presidente, luca, la_macchina

### POV implementati
- **Enrico** — dirigente, scopre numeri falsificati, riceve busta anonima
- **Marco** — impiegato sotto pressione, falsifica numeri per necessità
- **Sara** — arco oscuro: coercizione sessuale dal presidente, ciclo di abuso di potere. Scelte: diventare il nuovo presidente (ricattare Enrico) o spezzare il ciclo (perdere tutto)

### Arco narrativo Sara (dettaglio)
- Presidente = padre del ragazzo_monete
- Sara ha subito coercizione, ha falsificato numeri con la tecnica insegnata dal presidente
- Scena audit: trova i numeri di Marco (stessa tecnica) + nota ignorata di Luca
- Scelta Kobayashi: inoltrare la nota di Luca al comitato audit (spezzare il ciclo, perdere tutto)
- Il ragazzo al parco con le monete è il figlio del presidente — Sara lo riconosce

---

## Cosa è stato fatto

### v0.3 — Profiler v1 e binding scene↔DNA
- **Bug critico risolto**: `selectPov()` chiamava `profiler.reset()` → il profilo veniva cancellato a ogni run. Ora c'è un profilo di *run* (azzerato a ogni POV, alimenta il reveal) e un profilo *cumulativo* persistente (`localStorage: tensor_profile_v1`)
- **Profiler v1** (`profiler.js`):
  - segnali pesati da `actually_measures` della scena (`weight` × modulazione response time)
  - dimensioni non dichiarate dalla scena → `incidental`, peso 0.3
  - tracking per dimensione: modi (direct/masked/incidental), prototipi, domini
  - stabilità secondo schema §2: min 4 osservazioni, ≥2 prototipi, ≥2 domini, masked ratio ≤ 0.7
  - fasi di confidenza schema §5 (`silent` / `light` / `calibrated` / `meta`) su sessioni completate
  - `getContradictions()` cumulativo, solo su dimensioni stabili
  - **timeout ≠ scelta**: registrato a parte, non sposta più i punteggi (prima attribuiva i segnali dell'opzione B)
- **Scene annotate**: tutte le 12 scene hanno `domain` + `actually_measures` (derivati dal DNA; dimensioni extra → incidental)
- **ID prototipi normalizzati**: `la_sopravvissuta/la_complice/la_testimone` → `il_*` (il DNA è unico, il genere è del personaggio)
- **Reveal**: fix bug `'Lealtà'.toLowerCase() !== 'lealta'` (conteggio sbagliato e label contraddizione mancante); rimosso il fallback `Math.ceil(total*0.6)` che inventava frequenze
- **Validatore** `tools/validate.mjs` + test `tools/test-profiler.mjs` (11 test)

### Warning aperti dal validatore (decisioni editoriali, non bug)
- `marco/riunione_mercoledi` (il_complice): la primaria `compliance_vs_reframing` non riceve segnali
- `marco/audit_venerdi` (il_sopravvissuto): la primaria `protezione_vs_interesse_personale` non riceve segnali
- Tutte le 12 scene sono dominio `sociale` → con "La Settimana" da sola **nessuna dimensione può diventare stabile** (serve ≥2 domini). È coerente con lo schema, ma va saputo

### v0.1 (commit iniziale)
- Prototipo lineare con POV Enrico
- Engine base: scene, scelte, flag, timer, token, reveal
- UI: typewriter, schermate, reveal

### v0.2 (commit b661663)
- **Multi-POV engine**: selezione POV → capitoli → nodi → scelte → reveal
- **POV Marco**: 4 scene, prospettiva dell'impiegato
- **POV Sara**: 4 scene, arco oscuro completo
- **Story matrix v0.2**: entità con visibilità per POV, relazioni, reveal dependencies, pov_order, flag_sources con pov_scope
- **Cross-run persistence**: `tensor_runs` in localStorage, propagazione flag
- **Reveal engine cross-POV**: confronto tendenze morali tra POV, reveal Sara-specific
- **UI multi-POV**: selezione POV con cards, badge "giocato", "Altro sguardo" al posto di "Ricomincia"

### v0.2.1 (commit a90ca65)
- **13/13 DNA prototipi**: pool completo archetipi morali
- Sociale: Custode, Debitore, Traditore, Giudice, Complice, Ribelle, Solitario
- Sistemi: Soldato, Figlio
- Corpo: Sopravvissuto, Corpo Mortale, Limite

---

## Cosa manca — Roadmap

### Fase 1: Profiling engine (PRIORITÀ)
> v0.3: punti 1 e 2 fatti (✅), punto 3 parziale. Restano: selezione adattiva,
> contraddizioni basate su `for_contradiction_reveal` dei DNA, gating del reveal per fase di confidenza.

1. ✅ **Profiling engine** (`profiler.js`)
   - Leggere le scelte del giocatore
   - Aggiornare punteggi sulle 6 dimensioni morali
   - Gestire measurement_mode (direct vs masked)
   - Applicare pesi per prototipo e dimensione
   - Persistere il profilo tra sessioni

2. ✅ **Scene-DNA binding**
   - Mapping tra scelte nei POV e prototipi che attivano
   - Ogni scelta deve sapere quale dimensione misura, con quale peso, in quale modo
   - Annotare le scene esistenti (Enrico, Marco, Sara) con metadata DNA

3. ◐ **Profilo persistente (tensor del giocatore)** — persistenza e stabilità fatte; selezione adattiva e contraddizioni DNA-based da fare
   - Struttura dati per il profilo morale cumulativo
   - Cross-story persistence (il profilo sopravvive tra storie settimanali)
   - Selezione adattiva dei prototipi basata sul profilo
   - Rilevamento contraddizioni (come definito nei DNA `for_contradiction_reveal`)

### Fase 2: Pipeline di generazione scene
> Scalare la produzione di contenuti — ogni settimana una nuova storia.

4. **Agent pool per la scrittura**
   - Sistema di prompt specializzati che usano i DNA come vincoli
   - Ogni agente conosce: regole editoriali, failure modes, bias da evitare
   - Input: DNA prototipo + contesto narrativo → Output: scena completa
   - Validazione automatica contro lo schema e i vincoli del DNA

5. ◐ **Validatore scene** — v0.3 copre struttura e coerenza scene↔DNA; mancano tone_constraints e parole proibite
   - Verifica che le scene rispettino tone_constraints e hard_exclusions
   - Check editorial_notes (parole proibite, frame valoriali)
   - Verifica copertura dimensionale (ogni scena misura quello che deve misurare)

### Fase 3: Storie aggiuntive
6. **Nuove storie settimanali** con cast diversi (max 5 personaggi per storia)
7. **POV mancanti** per "La Settimana": Martina, Cane (struttura esoterica per Martina)
8. **Sistema adattivo**: selezione prototipi e intensità basata sul profilo accumulato

---

## Note di design

### Principi editoriali
- Scrivere come un autore, non come un assistente. Benchmark: Black Mirror
- Mai parole valoriali nel testo delle scene (forte/debole, eroe, sacrificio, crescere)
- Il narratore non giudica. Le conseguenze sono fisiologiche, non morali
- Il finale non premia e non punisce
- Il limite mostrato, non dichiarato (mani che tremano, voce che cede)

### Vincoli tecnici
- Vanilla JS, no framework, no server
- Ogni storia è autocontenuta (JSON + JS)
- Il profilo è l'unico stato persistente cross-story
- Fine-tuning prematuro — servono 50-100 scene validate per training data

### Repo
- GitHub: https://github.com/node-01757/tensor
- Branch: main
