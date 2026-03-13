# TENSOR — Schema Ontologici v1
## DNA del Sistema di Osservazione Narrativa

> Documento destinato allo sviluppo.
> Contiene gli schemi canonici dei tre file fondamentali del sistema.
> Non popolare prima di aver fissato la grammatica — questo documento è la grammatica.

---

## Indice

1. [Principi generali](#1-principi-generali)
2. [profile_dimensions.json](#2-profile_dimensionsjson)
3. [prototype.json](#3-prototypejson)
4. [scene.json](#4-scenejson)
5. [Regole trasversali](#5-regole-trasversali)

---

## 1. Principi generali

### Tripartizione fondamentale

| File | Risponde a | Utente principale |
|---|---|---|
| `profile_dimensions.json` | Come il sistema osserva | Motore di profiling, reveal engine |
| `prototype.json` | Quali forme morali esistono | Editor narrativo, content pipeline |
| `scene.json` | Come una forma diventa esperienza giocabile | Runtime, editor scena |

### Regola di separazione

- `profile_dimensions.json` definisce il **vocabolario osservativo**. Se non sai quali dimensioni esistono, i prototipi inventano assi morali a caso.
- `prototype.json` viene dopo perché ogni prototipo deve dichiarare quali dimensioni mobilita, quali maschera, quali richiede.
- `scene.json` viene per ultimo. Non inventa teoria — la usa.

### Regola anti-ridondanza

Ogni concetto vive in un posto solo. Se lo stesso dato appare in due file, uno dei due è una vista editoriale, non una fonte di verità. Dichiarare esplicitamente quale è quale.

---

## 2. profile_dimensions.json

### Schema canonico v1

```json
{
  "id": "protezione_vs_interesse_personale",
  "label": "Protezione vs Interesse personale",
  "domain": "sociale",
  "description": "Misura la tendenza a sostenere o sacrificare l'altro rispetto al proprio vantaggio immediato.",
  "polarity_a": "protezione",
  "polarity_b": "interesse_personale",
  "observation_type": "behavioral",

  "derived_from": [
    "choice_path",
    "response_time",
    "kobayashi_usage"
  ],

  "contextual_role": {
    "sociale": "primary",
    "corpo": "secondary",
    "sistemi": "secondary"
  },
  "contextual_weight": {
    "sociale": 1.0,
    "corpo": 0.45,
    "sistemi": 0.7
  },

  "dimension_relations": [
    {
      "dimension_id": "lealta_vs_giustizia",
      "relation_type": "interference",
      "note": "La protezione di un individuo può apparire come lealtà anche quando il motore principale è auto-conservazione relazionale."
    },
    {
      "dimension_id": "confronto_vs_fuga",
      "relation_type": "modulator",
      "note": "L'evitamento del conflitto può mascherare una scelta di protezione apparente."
    },
    {
      "dimension_id": "controllo_vs_accettazione",
      "relation_type": "interference",
      "note": "In scenari corporei, proteggere può essere un esercizio di controllo, non di cura."
    }
  ],

  "bias_risk": [
    {
      "type": "social_desirability",
      "severity": "high",
      "note": "I giocatori tendono a scegliere protezione in scene dichiarate. Response time basso può indicare automatismo performativo, non convinzione.",
      "mitigation": [
        "item_masking",
        "cross_domain_validation",
        "delayed_reveal"
      ]
    },
    {
      "type": "framing_effect",
      "severity": "medium",
      "note": "Il framing della scena orienta la scelta prima che il conflitto morale sia attivo.",
      "mitigation": [
        "alternate_declared_axes",
        "response_time_weighting"
      ]
    }
  ],

  "stability_requirement": {
    "min_total_observations": 4,
    "min_distinct_prototypes": 2,
    "min_distinct_domains": 2,
    "max_masked_only_ratio": 0.7,
    "bias_adjusted_threshold": true
  },

  "reveal_policy": {
    "allow_direct_reveal": true,
    "allow_contradiction_reveal": true,
    "reveal_style": "observational"
  },

  "editorial_notes": [
    "non formulare mai come tratto fisso",
    "preferire formule comparative o frequenziali",
    "nelle scene corporee verificare che la dimensione non sia ombra di controllo_vs_accettazione prima di attribuire peso pieno"
  ]
}
```

### Note di schema

**`contextual_role` vs `contextual_weight`** — ruolo e peso non sono la stessa cosa. Il ruolo è qualitativo (dice al sistema *come* interpretare l'osservazione). Il peso è quantitativo (dice *quanto* conta nell'aggregato). Comprimerli produce ambiguità garantita.

**`dimension_relations`** — tre tipi di relazione ammessi:
- `interference` — due dimensioni si contaminano, il segnale di una può essere causato dall'altra
- `modulator` — una dimensione altera l'intensità del segnale di un'altra senza causarla
- `amplifier` — una dimensione rinforza il segnale di un'altra quando entrambe sono attive

**`bias_risk` come campo obbligatorio** — non nelle note editoriali. Una dimensione senza bias dichiarati presume neutralità osservativa. Quella è una fantasia da spreadsheet, non un sistema psicologico.

**`max_masked_only_ratio: 0.7`** — regola anti-overfitting da masking. Una dimensione non può essere considerata stabile se oltre il 70% delle osservazioni che la alimentano proviene da nodi in cui quella stessa dimensione è misurata solo in forma latente o mascherata. Questo impedisce che il profilo venga costruito quasi interamente su segnali indiretti, riducendo il rischio di gaming e di falsa coerenza statistica.

**`response_time` in `derived_from`** — il tempo di risposta non può mai contribuire da solo alla stabilizzazione di una dimensione. È un modulatore, non una base. Regola trasversale a tutte le dimensioni.

**`allow_direct_reveal: true`** — "direct" significa che la dimensione può comparire come osservazione esplicita nel reveal. Non significa formulazione diagnostica. Il reveal style `observational` è obbligatorio: mai etichette identitarie, sempre formule comparative o frequenziali.

---

## 3. prototype.json

### Schema canonico v1

```json
{
  "id": "il_testimone",
  "label": "Il Testimone",
  "archetype_family": "sociale",
  "version": "0.1",

  "editorial_identity": {
    "description": "Il giocatore vede qualcosa che non dovrebbe vedere. Non è parte del conflitto. Può scegliere se diventarlo.",
    "anthropological_roots": [
      "bystander effect (Latané & Darley)",
      "diffusione di responsabilità",
      "psicologia della conformità (Asch)"
    ],
    "narrative_signature": "la presenza senza obbligo formale — il costo dell'azione è volontario, il costo dell'inazione è invisibile"
  },

  "moral_structure": {
    "apparent_conflict": "intervenire vs non intervenire",
    "real_conflict": "responsabilità auto-attribuita vs responsabilità delegata al gruppo",
    "apparent_dimension": "coraggio_vs_invisibilita",
    "dominant_latent_dimension": "conformismo_vs_autonomia"
  },

  "dimensions_mobilized": [
    {
      "dimension_id": "conformismo_vs_autonomia",
      "role": "primary",
      "measurement_mode": "direct",
      "weight": 1.0
    },
    {
      "dimension_id": "protezione_vs_interesse_personale",
      "role": "secondary",
      "measurement_mode": "masked",
      "weight": 0.5
    },
    {
      "dimension_id": "confronto_vs_fuga",
      "role": "secondary",
      "measurement_mode": "masked",
      "weight": 0.6
    }
  ],

  "requires": {
    "description": "Questo prototipo può essere usato da sessione 1 per osservazione grezza. Non contribuisce al profiling stabile finché le dipendenze non sono soddisfatte.",
    "for_profiling": [],
    "for_contradiction_reveal": [
      {
        "prototype_id": "il_custode",
        "min_observations": 2,
        "rationale": "La contraddizione tra proteggere attivamente un individuo e ignorare un estraneo in difficoltà è il reveal più potente di questo prototipo."
      }
    ]
  },

  "intensity_range": {
    "min": 1,
    "max": 4,
    "default": 2,
    "note": "Intensità 5 riservata a scene con conseguenze irreversibili visibili — usare solo dopo sessione 8."
  },

  "tone_constraints": {
    "preferred_contexts": ["quotidiano", "sociale_pubblico"],
    "allowed_contexts": ["lavorativo"],
    "hard_exclusions": ["horror", "violenza esplicita", "contesti di guerra"],
    "note": "Il Testimone funziona meglio in contesti ordinari dove l'inazione è socialmente accettabile. La straordinarietà riduce il segnale — il giocatore reagisce all'eccezionalità, non al pattern."
  },

  "kobayashi_compatible": true,
  "kobayashi_note": "La terza scelta non è eroismo alternativo. È un'azione che ridefinisce il ruolo del testimone — esempio: documentare invece di intervenire, chiamare qualcuno invece di agire direttamente. Il valore è nel rifiuto della dicotomia agisco/non agisco.",

  "trigger_conditions": [
    "il giocatore ha almeno una sessione completata",
    "nessun altro prototipo del territorio sociale nella stessa sessione già a intensità alta",
    "non usare consecutivamente con il_complice — sovrapposizione semantica troppo alta"
  ],

  "contraindications": [
    "giocatore con profilo emergente di alto distress su conformismo — rischio di attivazione difensiva invece di osservazione",
    "non usare come primo prototipo se il profilo ha zero osservazioni — segnale troppo debole senza contesto"
  ],

  "failure_modes": [
    {
      "type": "editorial",
      "severity": "high",
      "detectability": "high",
      "description": "La scena diventa troppo ovvia — il contesto segnala chiaramente quale scelta è giusta. Il giocatore risponde per desiderabilità sociale, non per pattern reale.",
      "mitigation": "Eliminare antagonista visibile. Il gruppo che ride deve sembrare normale, non malvagio."
    },
    {
      "type": "profiling",
      "severity": "high",
      "detectability": "low",
      "description": "Il sistema interpreta inazione come conformismo quando può essere dissociazione, stanchezza, o non identificazione con la vittima.",
      "mitigation": "Richiedere min_distinct_domains 2 prima di stabilizzare conformismo_vs_autonomia su questo segnale."
    },
    {
      "type": "narrative",
      "severity": "medium",
      "detectability": "medium",
      "description": "Il finale diventa moralizzante — il sistema punisce narrativamente l'inazione in modo leggibile.",
      "mitigation": "I finali del Testimone non mostrano conseguenze dirette dell'inazione. Mostrano il mondo che continua uguale."
    }
  ],

  "bias_expected": [
    {
      "type": "social_desirability",
      "severity": "high",
      "note": "In scene dichiarate il giocatore interviene quasi sempre. Il segnale reale emerge solo in scene mascherate o ad alta diffusione di responsabilità."
    },
    {
      "type": "context_collapse",
      "severity": "medium",
      "note": "Il giocatore trasferisce esperienze personali di bullismo o esclusione sulla scena, producendo risposte atipiche non generalizzabili al pattern."
    }
  ],

  "editorial_notes": [
    "la scena più efficace non ha antagonista visibile — ha un gruppo neutro che fa una cosa normale e sbagliata",
    "non usare mai la parola 'coraggio' nel testo della scena",
    "il peso del Testimone sta nell'ordinarietà, non nell'eccezionalità"
  ]
}
```

### Note di schema

**`moral_structure` a quattro campi** — `apparent_conflict` e `real_conflict` appartengono al livello narrativo-strutturale. `apparent_dimension` e `dominant_latent_dimension` appartengono al livello osservativo. Non coincidono sempre e non devono coincidere. Comprimerli perde la possibilità di variare le scene mantenendo il prototipo stabile.

**`dominant_latent_dimension`** — indica l'asse latente dominante del prototipo, non l'unico. La pluralità degli assi latenti vive in `dimensions_mobilized`.

**`requires` con `for_profiling` vs `for_contradiction_reveal`** — attivare un prototipo e usarlo per generare una contraddizione sono due cose diverse. Questa distinzione salva il sistema più avanti.

**`failure_modes` distinti per tipo** — tre tipi con cicli di vita diversi:
- `editorial` — accade prima che la scena viva, è un difetto di progettazione
- `profiling` — accade quando un dato plausibile viene letto male dal sistema
- `narrative` — accade nell'esperienza del giocatore, rompe fiducia senza distorcere necessariamente il profilo

La combinazione `severity: high` + `detectability: low` identifica i failure mode più pericolosi: invalidano dati silenziosamente.

**Perimetro di prototype.json** — deve rispondere solo a: cos'è questo archetipo, quale tensione morale organizza, quali dimensioni mobilita, quando è lecito usarlo, come può fallire. Non deve contenere logica di runtime, relazioni astratte tra dimensioni (quelle stanno in `profile_dimensions.json`), o principi narrativi generali.

---

## 4. scene.json

### Schema canonico v1

```json
{
  "id": "testimone_fermata_01",
  "prototype_id": "il_testimone",
  "title": "La Fermata",
  "version": "0.1",

  "editorial_context": {
    "intensity": 2,
    "domain": "sociale",
    "context_tags": ["spazio_pubblico", "gruppo", "umiliazione_leggera"],
    "tone": "quotidiano",
    "register_level": 2
  },

  "availability": {
    "min_session": 2,
    "max_session": null,
    "requires_prototype_state": [],
    "blocked_if_recent_scene_ids": [],
    "blocked_if_recent_prototype_ids": ["il_complice"]
  },

  "setup": {
    "text": "Alla fermata dell'autobus un gruppo ride mentre un ragazzo cerca di recuperare le monete cadute a terra. Nessuno lo aiuta. Nessuno sembra davvero crudele.",
    "word_count_target": 35,
    "must_start_in_medias_res": true
  },

  "declared_conflict": "intervenire vs restare fuori",
  "player_facing_axis": "coraggio_vs_invisibilita",

  "actually_measures": [
    {
      "dimension_id": "conformismo_vs_autonomia",
      "measurement_mode": "direct",
      "weight": 1.0
    },
    {
      "dimension_id": "protezione_vs_interesse_personale",
      "measurement_mode": "masked",
      "weight": 0.4
    },
    {
      "dimension_id": "confronto_vs_fuga",
      "measurement_mode": "masked",
      "weight": 0.6
    }
  ],

  "choices": [
    {
      "key": "A",
      "text": "Ti avvicini e raccogli una moneta.",
      "visible_by_default": true,
      "kobayashi": false,
      "narrative_flags": ["intervento_minimo"],
      "effects": {
        "profile_signals": [
          {
            "dimension_id": "conformismo_vs_autonomia",
            "direction": "autonomia",
            "magnitude": 2
          },
          {
            "dimension_id": "protezione_vs_interesse_personale",
            "direction": "protezione",
            "magnitude": 1
          }
        ]
      }
    },
    {
      "key": "B",
      "text": "Resti dove sei e aspetti l'autobus.",
      "visible_by_default": true,
      "kobayashi": false,
      "narrative_flags": ["inazione"],
      "effects": {
        "profile_signals": [
          {
            "dimension_id": "conformismo_vs_autonomia",
            "direction": "conformismo",
            "magnitude": 1
          },
          {
            "dimension_id": "confronto_vs_fuga",
            "direction": "fuga",
            "magnitude": 1
          }
        ]
      }
    },
    {
      "key": "C",
      "text": "Chiami ad alta voce il gruppo senza avvicinarti.",
      "visible_by_default": false,
      "kobayashi": true,
      "narrative_flags": ["reframing_sociale"],
      "unlock": {
        "type": "token",
        "cost": 1
      },
      "effects": {
        "profile_signals": [
          {
            "dimension_id": "conformismo_vs_autonomia",
            "direction": "autonomia",
            "magnitude": 1
          },
          {
            "dimension_id": "compliance_vs_reframing",
            "direction": "reframing",
            "magnitude": 2
          },
          {
            "dimension_id": "confronto_vs_fuga",
            "direction": "confronto",
            "magnitude": 1
          }
        ]
      }
    }
  ],

  "response_model": {
    "timer_seconds": 12,
    "response_time_modulation": {
      "fast_threshold_ms": 2200,
      "slow_threshold_ms": 7000,
      "note": "Il tempo di risposta modula il segnale ma non stabilizza mai da solo una dimensione."
    }
  },

  "narrative_continuation": {
    "continuation_hooks": [
      {
        "flag": "intervento_minimo",
        "hook_type": "cost_of_partial_involvement",
        "note": "Scene successive possono introdurre il costo del coinvolgimento parziale."
      },
      {
        "flag": "inazione",
        "hook_type": "silent_world_continues",
        "note": "Nessuna conseguenza diretta visibile — il mondo continua uguale."
      },
      {
        "flag": "reframing_sociale",
        "hook_type": "contradiction_seed",
        "note": "Disponibile come riferimento in reveal di contraddizione con il_custode."
      }
    ]
  },

  "reveal_hooks": {
    "eligible_for_profile_observation": true,
    "eligible_for_contradiction_reveal": true,
    "eligible_for_share_card": false,
    "ghost_event_compatible": true,
    "ghost_event_text": "Qualcuno prima di te ha guardato senza muoversi."
  },

  "risk_controls": {
    "masked_ratio_classification": "mixed",
    "expected_biases": ["social_desirability", "context_collapse"],
    "manual_review_required": true
  },

  "status": {
    "editorial_status": "draft",
    "qa_status": "untested"
  }
}
```

### Note di schema

**`narrative_flags` come fonte di verità** — i flag vivono nelle scelte. `narrative_continuation` non li rideclara: li referenzia per nome e aggiunge solo semantica editoriale. Il dato vive in un posto solo.

**`declared_conflict` vs `player_facing_axis`** — il conflitto è narrativo. L'asse è la dimensione che il giocatore percepisce di stare attraversando. Non coincidono per design — questa è la superficie del masking a livello scena.

**`profile_signals` come array di oggetti** — separare `direction` e `magnitude` rende ogni segnale autodescrittivo. La mappa numerica con segno implicito è elegante finché nessuno sbaglia il segno. Qualcuno lo sbaglia sempre.

**`kobayashi: true` come campo esplicito** — non è solo un meccanismo di sblocco. È una classificazione editoriale con conseguenze sul profiling di `compliance_vs_reframing`. Renderlo esplicito permette query tipo: *"tutte le scene con almeno una opzione kobayashi nel dominio corpo"*.

**Perimetro di scene.json** — non reintroduce teoria. Non contiene note antropologiche, teoria morale generale, relazioni astratte tra dimensioni. Risponde solo a: che scena è, da quale prototipo deriva, cosa mostra al giocatore, quali scelte offre, quali dimensioni osserva davvero, quando è disponibile, che tipo di reveal può alimentare.

---

## 5. Regole trasversali

### Regola anti-overfitting da masking

Una dimensione non può essere considerata stabile se oltre il 70% delle osservazioni che la alimentano proviene da nodi in cui quella stessa dimensione è misurata solo in forma latente o mascherata (`max_masked_only_ratio: 0.7`).

Per calcolare questo ratio correttamente, ogni `actually_measures` in `scene.json` deve dichiarare `measurement_mode` per ciascuna dimensione. I tre valori ammessi sono:
- `direct` — la dimensione è quella che il giocatore percepisce di stare attraversando
- `masked` — la dimensione è osservata tramite item masking intenzionale
- `incidental` — segnale collaterale debole, non primario

`masked` e `incidental` non sono equivalenti. Non tutte le osservazioni non-dirette hanno lo stesso peso epistemico.

### Regola sul response_time

Il tempo di risposta non può mai contribuire da solo alla stabilizzazione di una dimensione. È un modulatore, non una base. Questa regola è trasversale a tutti e tre i file e non va dichiarata in ogni record — vive qui.

### Regola sul linguaggio dei reveal

Il sistema non diagnostica mai. Usa esclusivamente linguaggio osservativo e frequenziale.

- ❌ *"Quando qualcuno dipende da te, ti allontani."*
- ✅ *"In sette sessioni su dieci in cui qualcuno dipendeva da te, hai scelto di distanziarti."*

Questa regola si applica a qualsiasi testo generato dal motore di reveal, indipendentemente dalla dimensione o dal prototipo.

### Soglie di confidenza progressiva

| Sessioni | Comportamento del sistema |
|---|---|
| 1–4 | Osservazione silenziosa, nessun reveal |
| 5–9 | Ipotesi leggere, formule frequenziali semplici |
| 10–19 | Storie calibrate sul profilo, contraddizioni nominabili |
| 20+ | Contraddizioni interne rivelabili, momento meta (una volta sola) |

Il momento meta — *"questa situazione è stata costruita usando le tue scelte precedenti"* — viene usato una volta sola per giocatore, mai ripetuto, mai spiegato.

---

*TENSOR Schema Ontologici v1 — uso interno*
*Aggiornato in sessione di co-design*
