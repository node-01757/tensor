// TENSOR — DNA prototipi (GENERATO da tools/build-dna.mjs, non modificare a mano)
// Sorgente: i file *.json nella root del repo. Rigenerare con: npm run build:dna

export const DNA = {
  "il_complice": {
    "id": "il_complice",
    "label": "Il Complice",
    "archetype_family": "sociale",
    "moral_structure": {
      "apparent_conflict": "restare dentro il sistema vs uscirne",
      "real_conflict": "complicità passiva come scelta attiva — il beneficio ricevuto trasforma l'inazione in partecipazione",
      "apparent_dimension": "coraggio_vs_quieto_vivere",
      "dominant_latent_dimension": "compliance_vs_reframing"
    },
    "dimensions_mobilized": [
      {
        "dimension_id": "compliance_vs_reframing",
        "role": "primary",
        "measurement_mode": "direct",
        "weight": 1
      },
      {
        "dimension_id": "conformismo_vs_autonomia",
        "role": "primary",
        "measurement_mode": "masked",
        "weight": 0.8
      },
      {
        "dimension_id": "protezione_vs_interesse_personale",
        "role": "secondary",
        "measurement_mode": "masked",
        "weight": 0.5
      }
    ],
    "requires": {
      "for_profiling": [
        {
          "condition": "min_sessions_completed",
          "value": 2
        }
      ],
      "for_contradiction_reveal": [
        {
          "prototype_id": "il_ribelle",
          "min_observations": 2
        },
        {
          "prototype_id": "il_testimone",
          "min_observations": 2
        }
      ]
    }
  },
  "il_corpo_mortale": {
    "id": "il_corpo_mortale",
    "label": "Il Corpo Mortale",
    "archetype_family": "corpo",
    "moral_structure": {
      "apparent_conflict": "arrendersi al limite vs superarlo",
      "real_conflict": "controllo come illusione di immortalità vs accettazione come inizio di una relazione con il proprio limite",
      "apparent_dimension": "forza_vs_debolezza",
      "dominant_latent_dimension": "controllo_vs_accettazione"
    },
    "dimensions_mobilized": [
      {
        "dimension_id": "controllo_vs_accettazione",
        "role": "primary",
        "measurement_mode": "direct",
        "weight": 1
      },
      {
        "dimension_id": "confronto_vs_fuga",
        "role": "secondary",
        "measurement_mode": "masked",
        "weight": 0.6
      },
      {
        "dimension_id": "protezione_vs_interesse_personale",
        "role": "secondary",
        "measurement_mode": "masked",
        "weight": 0.4
      }
    ],
    "requires": {
      "for_profiling": [
        {
          "condition": "min_sessions_completed",
          "value": 4
        }
      ],
      "for_contradiction_reveal": [
        {
          "prototype_id": "il_custode",
          "min_observations": 2
        },
        {
          "prototype_id": "il_sopravvissuto",
          "min_observations": 2
        }
      ]
    }
  },
  "il_custode": {
    "id": "il_custode",
    "label": "Il Custode",
    "archetype_family": "sociale",
    "moral_structure": {
      "apparent_conflict": "proteggere vs lasciare andare",
      "real_conflict": "cura autentica per l'altro vs bisogno di controllo mascherato da cura",
      "apparent_dimension": "protezione_vs_abbandono",
      "dominant_latent_dimension": "controllo_vs_autonomia_relazionale"
    },
    "dimensions_mobilized": [
      {
        "dimension_id": "protezione_vs_interesse_personale",
        "role": "primary",
        "measurement_mode": "direct",
        "weight": 1
      },
      {
        "dimension_id": "controllo_vs_accettazione",
        "role": "primary",
        "measurement_mode": "masked",
        "weight": 0.9
      },
      {
        "dimension_id": "conformismo_vs_autonomia",
        "role": "secondary",
        "measurement_mode": "masked",
        "weight": 0.4
      }
    ],
    "requires": {
      "for_profiling": [
        {
          "condition": "min_sessions_completed",
          "value": 1
        }
      ],
      "for_contradiction_reveal": [
        {
          "prototype_id": "il_testimone",
          "min_observations": 2
        },
        {
          "prototype_id": "il_figlio",
          "min_observations": 2
        }
      ]
    }
  },
  "il_debitore": {
    "id": "il_debitore",
    "label": "Il Debitore",
    "archetype_family": "sociale",
    "moral_structure": {
      "apparent_conflict": "coprire chi ti ha aiutato vs fare la cosa giusta",
      "real_conflict": "lealtà personale come obbligo privato vs giustizia come norma collettiva che non conosce il debito",
      "apparent_dimension": "lealta_vs_tradimento",
      "dominant_latent_dimension": "obbligo_relazionale_vs_norma_collettiva"
    },
    "dimensions_mobilized": [
      {
        "dimension_id": "lealta_vs_giustizia",
        "role": "primary",
        "measurement_mode": "direct",
        "weight": 1
      },
      {
        "dimension_id": "protezione_vs_interesse_personale",
        "role": "secondary",
        "measurement_mode": "masked",
        "weight": 0.6
      },
      {
        "dimension_id": "conformismo_vs_autonomia",
        "role": "secondary",
        "measurement_mode": "masked",
        "weight": 0.5
      },
      {
        "dimension_id": "confronto_vs_fuga",
        "role": "secondary",
        "measurement_mode": "masked",
        "weight": 0.4
      }
    ],
    "requires": {
      "for_profiling": [
        {
          "condition": "min_sessions_completed",
          "value": 2
        }
      ],
      "for_contradiction_reveal": [
        {
          "prototype_id": "il_testimone",
          "min_observations": 2
        },
        {
          "prototype_id": "il_custode",
          "min_observations": 2
        },
        {
          "prototype_id": "il_ribelle",
          "min_observations": 2
        }
      ]
    }
  },
  "il_figlio": {
    "id": "il_figlio",
    "label": "Il Figlio",
    "archetype_family": "sistemi",
    "moral_structure": {
      "apparent_conflict": "obbedire all'autorità formativa vs seguire la propria valutazione",
      "real_conflict": "autonomia come emancipazione vs autonomia come illusione — quanto di quello che chiami 'io' è tuo e quanto è stato messo lì",
      "apparent_dimension": "rispetto_vs_ribellione",
      "dominant_latent_dimension": "controllo_vs_accettazione"
    },
    "dimensions_mobilized": [
      {
        "dimension_id": "controllo_vs_accettazione",
        "role": "primary",
        "measurement_mode": "direct",
        "weight": 1
      },
      {
        "dimension_id": "conformismo_vs_autonomia",
        "role": "primary",
        "measurement_mode": "direct",
        "weight": 0.9
      },
      {
        "dimension_id": "compliance_vs_reframing",
        "role": "secondary",
        "measurement_mode": "masked",
        "weight": 0.6
      },
      {
        "dimension_id": "lealta_vs_giustizia",
        "role": "secondary",
        "measurement_mode": "masked",
        "weight": 0.4
      }
    ],
    "requires": {
      "for_profiling": [
        {
          "condition": "min_sessions_completed",
          "value": 3
        }
      ],
      "for_contradiction_reveal": [
        {
          "prototype_id": "il_custode",
          "min_observations": 2
        },
        {
          "prototype_id": "il_ribelle",
          "min_observations": 2
        }
      ]
    }
  },
  "il_giudice": {
    "id": "il_giudice",
    "label": "Il Giudice",
    "archetype_family": "sociale",
    "moral_structure": {
      "apparent_conflict": "giudicare vs sospendere il giudizio",
      "real_conflict": "bisogno di coerenza narrativa interna vs tolleranza dell'ambiguità morale nell'altro",
      "apparent_dimension": "giustizia_vs_indulgenza",
      "dominant_latent_dimension": "controllo_vs_accettazione"
    },
    "dimensions_mobilized": [
      {
        "dimension_id": "lealta_vs_giustizia",
        "role": "primary",
        "measurement_mode": "direct",
        "weight": 1
      },
      {
        "dimension_id": "controllo_vs_accettazione",
        "role": "primary",
        "measurement_mode": "masked",
        "weight": 0.8
      },
      {
        "dimension_id": "conformismo_vs_autonomia",
        "role": "secondary",
        "measurement_mode": "masked",
        "weight": 0.5
      }
    ],
    "requires": {
      "for_profiling": [
        {
          "condition": "min_sessions_completed",
          "value": 2
        }
      ],
      "for_contradiction_reveal": [
        {
          "prototype_id": "il_custode",
          "min_observations": 2
        },
        {
          "prototype_id": "il_testimone",
          "min_observations": 2
        }
      ]
    }
  },
  "il_limite": {
    "id": "il_limite",
    "label": "Il Limite",
    "archetype_family": "corpo",
    "moral_structure": {
      "apparent_conflict": "andare oltre vs fermarsi",
      "real_conflict": "il confine come identità vs il confine come paura — non sai se ti fermi perché sei arrivato al tuo limite o perché hai paura di quello che c'è dopo",
      "apparent_dimension": "generosita_vs_egoismo",
      "dominant_latent_dimension": "controllo_vs_accettazione"
    },
    "dimensions_mobilized": [
      {
        "dimension_id": "controllo_vs_accettazione",
        "role": "primary",
        "measurement_mode": "direct",
        "weight": 1
      },
      {
        "dimension_id": "protezione_vs_interesse_personale",
        "role": "primary",
        "measurement_mode": "direct",
        "weight": 0.8
      },
      {
        "dimension_id": "confronto_vs_fuga",
        "role": "secondary",
        "measurement_mode": "masked",
        "weight": 0.6
      },
      {
        "dimension_id": "compliance_vs_reframing",
        "role": "secondary",
        "measurement_mode": "masked",
        "weight": 0.4
      }
    ],
    "requires": {
      "for_profiling": [
        {
          "condition": "min_sessions_completed",
          "value": 5
        }
      ],
      "for_contradiction_reveal": [
        {
          "prototype_id": "il_corpo_mortale",
          "min_observations": 2
        },
        {
          "prototype_id": "il_custode",
          "min_observations": 2
        },
        {
          "prototype_id": "il_sopravvissuto",
          "min_observations": 2
        }
      ]
    }
  },
  "la_maschera": {
    "id": "la_maschera",
    "label": "La Maschera",
    "archetype_family": "sociale",
    "moral_structure": {
      "apparent_conflict": "mantenere la performance vs lasciarla incrinare",
      "real_conflict": "la maschera protegge chi la porta ma è anche il meccanismo che tiene in funzione ciò che la rende necessaria — proteggersi significa alimentare la propria gabbia",
      "apparent_dimension": "forza_vs_fragilita",
      "dominant_latent_dimension": "confronto_vs_fuga"
    },
    "dimensions_mobilized": [
      {
        "dimension_id": "confronto_vs_fuga",
        "role": "primary",
        "measurement_mode": "direct",
        "weight": 1
      },
      {
        "dimension_id": "controllo_vs_accettazione",
        "role": "primary",
        "measurement_mode": "masked",
        "weight": 0.8
      },
      {
        "dimension_id": "conformismo_vs_autonomia",
        "role": "secondary",
        "measurement_mode": "masked",
        "weight": 0.5
      },
      {
        "dimension_id": "protezione_vs_interesse_personale",
        "role": "secondary",
        "measurement_mode": "masked",
        "weight": 0.4
      }
    ],
    "requires": {
      "for_profiling": [
        {
          "condition": "min_sessions_completed",
          "value": 3
        }
      ],
      "for_contradiction_reveal": [
        {
          "prototype_id": "il_giudice",
          "min_observations": 2
        },
        {
          "prototype_id": "il_testimone",
          "min_observations": 2
        }
      ]
    }
  },
  "il_ribelle": {
    "id": "il_ribelle",
    "label": "Il Ribelle",
    "archetype_family": "sociale",
    "moral_structure": {
      "apparent_conflict": "obbedire vs disobbedire",
      "real_conflict": "autonomia autentica vs reattanza — rifiuti perché hai valutato, o rifiuti perché qualcuno ti ha detto di accettare",
      "apparent_dimension": "coraggio_vs_conformismo",
      "dominant_latent_dimension": "compliance_vs_reframing"
    },
    "dimensions_mobilized": [
      {
        "dimension_id": "compliance_vs_reframing",
        "role": "primary",
        "measurement_mode": "direct",
        "weight": 1
      },
      {
        "dimension_id": "conformismo_vs_autonomia",
        "role": "primary",
        "measurement_mode": "direct",
        "weight": 0.9
      },
      {
        "dimension_id": "confronto_vs_fuga",
        "role": "secondary",
        "measurement_mode": "masked",
        "weight": 0.6
      }
    ],
    "requires": {
      "for_profiling": [
        {
          "condition": "min_sessions_completed",
          "value": 2
        }
      ],
      "for_contradiction_reveal": [
        {
          "prototype_id": "il_complice",
          "min_observations": 2
        },
        {
          "prototype_id": "il_debitore",
          "min_observations": 2
        }
      ]
    }
  },
  "il_soldato": {
    "id": "il_soldato",
    "label": "Il Soldato",
    "archetype_family": "sistemi",
    "moral_structure": {
      "apparent_conflict": "eseguire l'ordine vs rifiutarlo",
      "real_conflict": "identità di ruolo vs identità personale — quando il ruolo ti ha formato così profondamente che rifiutarlo è rifiutare te stesso",
      "apparent_dimension": "obbedienza_vs_coscienza",
      "dominant_latent_dimension": "compliance_vs_reframing"
    },
    "dimensions_mobilized": [
      {
        "dimension_id": "compliance_vs_reframing",
        "role": "primary",
        "measurement_mode": "direct",
        "weight": 1
      },
      {
        "dimension_id": "conformismo_vs_autonomia",
        "role": "primary",
        "measurement_mode": "masked",
        "weight": 0.7
      },
      {
        "dimension_id": "confronto_vs_fuga",
        "role": "secondary",
        "measurement_mode": "masked",
        "weight": 0.6
      },
      {
        "dimension_id": "lealta_vs_giustizia",
        "role": "secondary",
        "measurement_mode": "direct",
        "weight": 0.5
      }
    ],
    "requires": {
      "for_profiling": [
        {
          "condition": "min_sessions_completed",
          "value": 4
        }
      ],
      "for_contradiction_reveal": [
        {
          "prototype_id": "il_ribelle",
          "min_observations": 2
        },
        {
          "prototype_id": "il_figlio",
          "min_observations": 2
        }
      ]
    }
  },
  "il_solitario": {
    "id": "il_solitario",
    "label": "Il Solitario",
    "archetype_family": "sociale",
    "moral_structure": {
      "apparent_conflict": "restare nel gruppo vs andarsene",
      "real_conflict": "capacità di intimità vs paura della dipendenza — la solitudine è libertà o è il muro che hai costruito per non dover avere bisogno di nessuno",
      "apparent_dimension": "indipendenza_vs_bisogno",
      "dominant_latent_dimension": "confronto_vs_fuga"
    },
    "dimensions_mobilized": [
      {
        "dimension_id": "confronto_vs_fuga",
        "role": "primary",
        "measurement_mode": "masked",
        "weight": 1
      },
      {
        "dimension_id": "controllo_vs_accettazione",
        "role": "primary",
        "measurement_mode": "direct",
        "weight": 0.8
      },
      {
        "dimension_id": "conformismo_vs_autonomia",
        "role": "secondary",
        "measurement_mode": "masked",
        "weight": 0.5
      }
    ],
    "requires": {
      "for_profiling": [
        {
          "condition": "min_sessions_completed",
          "value": 3
        }
      ],
      "for_contradiction_reveal": [
        {
          "prototype_id": "il_custode",
          "min_observations": 2
        },
        {
          "prototype_id": "il_complice",
          "min_observations": 2
        }
      ]
    }
  },
  "il_sopravvissuto": {
    "id": "il_sopravvissuto",
    "label": "Il Sopravvissuto",
    "archetype_family": "corpo",
    "moral_structure": {
      "apparent_conflict": "salvare X vs salvare Y",
      "real_conflict": "gerarchia implicita dei valori — la scarsità rende visibile l'ordine in cui hai messo le cose, un ordine che in abbondanza non avresti mai dovuto dichiarare",
      "apparent_dimension": "altruismo_vs_pragmatismo",
      "dominant_latent_dimension": "protezione_vs_interesse_personale"
    },
    "dimensions_mobilized": [
      {
        "dimension_id": "protezione_vs_interesse_personale",
        "role": "primary",
        "measurement_mode": "direct",
        "weight": 1
      },
      {
        "dimension_id": "controllo_vs_accettazione",
        "role": "primary",
        "measurement_mode": "masked",
        "weight": 0.8
      },
      {
        "dimension_id": "confronto_vs_fuga",
        "role": "secondary",
        "measurement_mode": "masked",
        "weight": 0.5
      },
      {
        "dimension_id": "lealta_vs_giustizia",
        "role": "secondary",
        "measurement_mode": "masked",
        "weight": 0.4
      }
    ],
    "requires": {
      "for_profiling": [
        {
          "condition": "min_sessions_completed",
          "value": 3
        }
      ],
      "for_contradiction_reveal": [
        {
          "prototype_id": "il_custode",
          "min_observations": 2
        },
        {
          "prototype_id": "il_solitario",
          "min_observations": 2
        }
      ]
    }
  },
  "il_testimone": {
    "id": "il_testimone",
    "label": "Il Testimone",
    "archetype_family": "sociale",
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
        "weight": 1
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
      "for_profiling": [],
      "for_contradiction_reveal": [
        {
          "prototype_id": "il_custode",
          "min_observations": 2
        }
      ]
    }
  },
  "il_traditore": {
    "id": "il_traditore",
    "label": "Il Traditore",
    "archetype_family": "sociale",
    "moral_structure": {
      "apparent_conflict": "mantenere il patto vs rompere il patto",
      "real_conflict": "identità relazionale vs identità autonoma — chi sei quando il legame non ti conviene più",
      "apparent_dimension": "lealta_vs_opportunismo",
      "dominant_latent_dimension": "protezione_vs_interesse_personale"
    },
    "dimensions_mobilized": [
      {
        "dimension_id": "lealta_vs_giustizia",
        "role": "primary",
        "measurement_mode": "direct",
        "weight": 1
      },
      {
        "dimension_id": "protezione_vs_interesse_personale",
        "role": "primary",
        "measurement_mode": "masked",
        "weight": 0.8
      },
      {
        "dimension_id": "confronto_vs_fuga",
        "role": "secondary",
        "measurement_mode": "masked",
        "weight": 0.5
      }
    ],
    "requires": {
      "for_profiling": [
        {
          "condition": "min_sessions_completed",
          "value": 3
        }
      ],
      "for_contradiction_reveal": [
        {
          "prototype_id": "il_debitore",
          "min_observations": 2
        },
        {
          "prototype_id": "il_complice",
          "min_observations": 2
        }
      ]
    }
  }
};
