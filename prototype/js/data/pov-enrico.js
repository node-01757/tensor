// TENSOR — POV: Enrico
// Padre di Martina, collega di Marco, in debito da tre anni
// Vede il mondo dalla posizione di chi deve proteggere e chi deve qualcosa

export const POV_ENRICO = {
  pov_id: 'enrico',
  character: 'Enrico',
  qualifier: 'Padre di Martina. Collega di Marco. In debito da tre anni.',

  scenes: [
    // ---- SCENA 1: PARCO ---- (il_custode)
    {
      scene_id: 'parco_lunedi',
      knows: ['Martina si arrampica', 'Marco è al telefono', 'il cane è lì'],
      doesnt_know: ['perché Marco è al telefono', 'cosa pensa Martina del cane'],
      prototype_activated: 'il_custode',
      nodes: [
        {
          setup_text: 'Lunedì sera. Hai portato Martina al parco dopo una giornata lunga. Marco è sulla panchina accanto — giacca blu sbottonata, un bottone mancante, al telefono. Suo figlio gioca nella sabbia. Un cane randagio con un orecchio piegato dorme vicino ai giochi. Martina lo indica, poi corre verso la struttura più alta. Sbarre di metallo, vuoto sotto. Si gira e ti fa ciao con la mano.',
          timer_seconds: 12,
          choices: [
            {
              key: 'A',
              text: 'La raggiungi e le stai vicino mentre sale.',
              visible: true,
              kobayashi: false,
              narrative_flags: ['protezione_attiva'],
              entities_involved: ['martina'],
              effects: {
                profile_signals: [
                  { dimension_id: 'protezione_vs_interesse_personale', direction: 'protezione', magnitude: 2 },
                  { dimension_id: 'controllo_vs_accettazione', direction: 'controllo', magnitude: 2 }
                ]
              }
            },
            {
              key: 'B',
              text: 'La lasci andare. Sa arrampicarsi.',
              visible: true,
              kobayashi: false,
              narrative_flags: ['autonomia_concessa'],
              entities_involved: ['martina'],
              effects: {
                profile_signals: [
                  { dimension_id: 'controllo_vs_accettazione', direction: 'accettazione', magnitude: 2 },
                  { dimension_id: 'protezione_vs_interesse_personale', direction: 'interesse_personale', magnitude: 1 }
                ]
              }
            },
            {
              key: 'C',
              text: 'Le chiedi: "Vuoi che guardo da qui o che vengo con te?"',
              visible: false,
              kobayashi: true,
              token_cost: 1,
              narrative_flags: ['negoziazione_relazionale'],
              entities_involved: ['martina'],
              effects: {
                profile_signals: [
                  { dimension_id: 'compliance_vs_reframing', direction: 'reframing', magnitude: 2 },
                  { dimension_id: 'controllo_vs_accettazione', direction: 'accettazione', magnitude: 1 }
                ]
              }
            }
          ],
          continuations: {
            A: 'Sale. Tu sei lì sotto con le braccia pronte. Lei non ti guarda — guarda il cielo. Marco dalla panchina dice: "Rilassati, Enri." Facile dirlo quando suo figlio gioca nella sabbia. Il cane alza la testa, vi osserva, poi torna a dormire.',
            B: 'Sale. Cade una volta, si rialza. Non piange. Tu hai smesso di respirare per quattro secondi. Marco ti guarda e sorride. "Brava la tua," dice. Il cane si è spostato vicino alle altalene.',
            C: 'Ti guarda, ci pensa. "Guarda da lì." Sale. Ogni tanto si gira per controllare che tu stia guardando. Marco alza un sopracciglio. "Da quando negozi con una di sei anni?" Il cane si avvicina ai tuoi piedi.'
          },
          ghost_event: {
            A: 'Il 52% dei genitori ha scelto di restare vicino.',
            B: 'Il 31% ha scelto di lasciarla andare.',
            C: 'Il 17% ha chiesto a lei di decidere.'
          }
        },
        {
          setup_text: 'Martina è in cima. Il figlio di Marco la raggiunge e le prende il cappellino. Lo butta giù. Marco sta al telefono e non ha visto. Martina ti cerca con lo sguardo.',
          timer_seconds: 12,
          choices: [
            {
              key: 'A',
              text: 'Vai lì e parli al bambino. Chiaro e fermo.',
              visible: true,
              kobayashi: false,
              narrative_flags: ['intervento_protettivo'],
              entities_involved: ['martina', 'marco'],
              effects: {
                profile_signals: [
                  { dimension_id: 'protezione_vs_interesse_personale', direction: 'protezione', magnitude: 2 },
                  { dimension_id: 'confronto_vs_fuga', direction: 'confronto', magnitude: 2 }
                ]
              }
            },
            {
              key: 'B',
              text: 'Aspetti. Vuoi vedere come se la cava lei.',
              visible: true,
              kobayashi: false,
              narrative_flags: ['osservazione_attesa'],
              entities_involved: ['martina'],
              effects: {
                profile_signals: [
                  { dimension_id: 'controllo_vs_accettazione', direction: 'accettazione', magnitude: 2 },
                  { dimension_id: 'confronto_vs_fuga', direction: 'fuga', magnitude: 1 }
                ]
              }
            }
          ],
          continuations: {
            A: 'Il figlio di Marco ti guarda e va via. Marco alza lo sguardo dal telefono — ha visto solo la fine. "Tutto ok?" "Sì." Ma stasera dovrai decidere se dirglielo o no.',
            B: 'Martina guarda il bambino. Scende, raccoglie il cappellino, e torna a giocare dall\'altra parte. Marco non ha visto niente. Nessuno ha visto niente.'
          },
          ghost_event: {
            A: 'Il 58% ha scelto di intervenire.',
            B: 'Il 42% ha scelto di aspettare.'
          }
        }
      ],
      scene_end_text: 'Tornate a casa a piedi. Martina ti tiene la mano per un po\', poi la lascia. Marco vi saluta dal parcheggio. "Ci vediamo domani in ufficio." Domani. In ufficio tutto sarà diverso.'
    },

    // ---- SCENA 2: RIUNIONE ---- (il_testimone)
    {
      scene_id: 'riunione_mercoledi',
      knows: ['Sara presenta risultati non suoi', 'Luca ha fatto metà del lavoro', 'Marco sa'],
      doesnt_know: ['cosa pensa Sara di quello che fa', 'perché Luca non parla'],
      prototype_activated: 'il_testimone',
      nodes: [
        {
          setup_text: 'Riunione di progetto. Sara presenta i risultati del trimestre. Metà di quel lavoro l\'ha fatto Luca, che è seduto in fondo e non dice niente. Lo sai perché hai visto le mail. Marco, accanto a te, ti dà una gomitata leggera. Anche lui sa. Sara sorride. Il capo la complimenta.',
          timer_seconds: 12,
          choices: [
            {
              key: 'A',
              text: '"Ottimo lavoro di team. Luca, vuoi aggiungere qualcosa?"',
              visible: true,
              kobayashi: false,
              narrative_flags: ['intervento_indiretto', 'luca_esposto'],
              entities_involved: ['marco'],
              effects: {
                profile_signals: [
                  { dimension_id: 'conformismo_vs_autonomia', direction: 'autonomia', magnitude: 2 },
                  { dimension_id: 'confronto_vs_fuga', direction: 'confronto', magnitude: 1 }
                ]
              }
            },
            {
              key: 'B',
              text: 'Non dici niente. Non è il tuo problema.',
              visible: true,
              kobayashi: false,
              narrative_flags: ['inazione_sociale'],
              entities_involved: [],
              effects: {
                profile_signals: [
                  { dimension_id: 'conformismo_vs_autonomia', direction: 'conformismo', magnitude: 2 },
                  { dimension_id: 'confronto_vs_fuga', direction: 'fuga', magnitude: 1 }
                ]
              }
            },
            {
              key: 'C',
              text: 'Dopo la riunione, vai da Luca. Solo da Luca.',
              visible: false,
              kobayashi: true,
              token_cost: 1,
              narrative_flags: ['solidarieta_privata'],
              entities_involved: [],
              effects: {
                profile_signals: [
                  { dimension_id: 'compliance_vs_reframing', direction: 'reframing', magnitude: 2 },
                  { dimension_id: 'conformismo_vs_autonomia', direction: 'autonomia', magnitude: 1 }
                ]
              }
            }
          ],
          continuations: {
            A: 'Luca alza lo sguardo. Sara si irrigidisce per un secondo. Il capo dice "certo, grazie a tutto il team". Marco ti guarda — un mezzo sorriso. Non sai se approva o se sta misurando quanto sei disposto a esporti.',
            B: 'La riunione finisce. Luca esce per primo. Marco ti sussurra: "Tanto lo sappiamo tutti." Ma saperlo e dirlo non è la stessa cosa.',
            C: 'Luca ascolta. Dice "lo so, ma non è il momento." Marco vi vede parlare dal corridoio. Non chiede di cosa.'
          },
          ghost_event: {
            A: 'Il 33% ha cercato di dare visibilità a Luca.',
            B: 'Il 45% ha scelto di non intervenire.',
            C: 'Il 22% ha parlato con Luca in privato.'
          }
        },
        {
          setup_text: 'Pausa caffè. Marco ti raggiunge alla macchinetta. "Sara lo fa da sempre, lo sai." Pausa. "Luca non si espone mai. Forse è colpa sua." Ti guarda. Aspetta una risposta.',
          timer_seconds: 12,
          choices: [
            {
              key: 'A',
              text: '"Non è colpa di Luca se Sara si prende i meriti."',
              visible: true,
              kobayashi: false,
              narrative_flags: ['difesa_principio'],
              entities_involved: ['marco'],
              effects: {
                profile_signals: [
                  { dimension_id: 'lealta_vs_giustizia', direction: 'giustizia', magnitude: 1 },
                  { dimension_id: 'confronto_vs_fuga', direction: 'confronto', magnitude: 2 }
                ]
              }
            },
            {
              key: 'B',
              text: '"Hai ragione. Se non ti fai valere, è anche affar tuo."',
              visible: true,
              kobayashi: false,
              narrative_flags: ['pragmatismo'],
              entities_involved: ['marco'],
              effects: {
                profile_signals: [
                  { dimension_id: 'conformismo_vs_autonomia', direction: 'conformismo', magnitude: 1 },
                  { dimension_id: 'lealta_vs_giustizia', direction: 'lealta', magnitude: 1 }
                ]
              }
            }
          ],
          continuations: {
            A: 'Marco alza le spalle. "Sei sempre stato troppo giusto, Enri." Il caffè è amaro. Ti ricordi che Marco, tre anni fa, ha fatto per te quello che Luca non fa per se stesso. La sera, Martina ti manda un vocale: "Papà, il cane del parco era ancora lì oggi."',
            B: 'Marco annuisce. "Il mondo è così." Finite il caffè in silenzio. La sera, Martina ti manda un vocale. "Papà, quando mi porti ancora al parco?"'
          },
          ghost_event: {
            A: 'Il 44% ha difeso il principio.',
            B: 'Il 56% ha scelto il pragmatismo.'
          }
        }
      ],
      scene_end_text: 'Torni alla scrivania. La mail senza firma è lì, non letta. Luca lavora in silenzio. Sara ride con il capo. Marco ti manda un messaggio: "Venerdì devo parlarti di una cosa." Il tono è diverso dal solito.'
    },

    // ---- SCENA 3: AUDIT ---- (il_debitore)
    {
      scene_id: 'audit_venerdi',
      knows: ['i numeri di Marco non tornano', 'Marco ti ha salvato il posto 3 anni fa', 'la mail si collega'],
      doesnt_know: ['perché Marco ha aggiustato i numeri', 'se Marco sa che tu sai'],
      prototype_activated: 'il_debitore',
      nodes: [
        {
          setup_text: 'Venerdì mattina. C\'è il disegno di Martina appeso alla scrivania — sole giallo, una casa, e qualcosa che potrebbe essere un animale. Luca ti chiama. "Guarda qui." Nel report trimestrale di Marco ci sono numeri che non tornano. Non è un errore — è un aggiustamento. Piccolo. Ma intenzionale. Quella mail senza firma — adesso ha senso. Marco ti ha salvato il posto tre anni fa. Ha parlato per te quando nessuno lo avrebbe fatto.',
          timer_seconds: 12,
          choices: [
            {
              key: 'A',
              text: 'Segni l\'anomalia nel sistema. È il tuo lavoro.',
              visible: true,
              kobayashi: false,
              narrative_flags: ['denuncia_formale'],
              entities_involved: ['marco', 'la_mail'],
              effects: {
                profile_signals: [
                  { dimension_id: 'lealta_vs_giustizia', direction: 'giustizia', magnitude: 2 },
                  { dimension_id: 'confronto_vs_fuga', direction: 'confronto', magnitude: 1 }
                ]
              }
            },
            {
              key: 'B',
              text: 'Non segni niente. Marco sa quello che fa.',
              visible: true,
              kobayashi: false,
              narrative_flags: ['copertura_debito'],
              entities_involved: ['marco'],
              effects: {
                profile_signals: [
                  { dimension_id: 'lealta_vs_giustizia', direction: 'lealta', magnitude: 2 },
                  { dimension_id: 'confronto_vs_fuga', direction: 'fuga', magnitude: 1 }
                ]
              }
            },
            {
              key: 'C',
              text: 'Vai da Marco e gli dici cosa ha trovato Luca. Prima dell\'audit.',
              visible: false,
              kobayashi: true,
              token_cost: 1,
              narrative_flags: ['avviso_privato'],
              entities_involved: ['marco'],
              effects: {
                profile_signals: [
                  { dimension_id: 'compliance_vs_reframing', direction: 'reframing', magnitude: 2 },
                  { dimension_id: 'lealta_vs_giustizia', direction: 'lealta', magnitude: 1 }
                ]
              }
            }
          ],
          continuations: {
            A: 'Compili il report. Il nome di Marco finisce nel sistema. Luca ti guarda — non sa se hai fatto la cosa giusta o se hai tradito l\'uomo che ti ha tenuto a galla. Il disegno di Martina ti fissa dalla scrivania.',
            B: 'Il report esce pulito. Luca non dice niente, ma il modo in cui chiude il laptop dice tutto. Marco non saprà mai cosa hai visto. O forse lo sa già.',
            C: 'Marco ti guarda a lungo. "Me l\'aspettavo che l\'avresti trovato tu." Pausa. "Aggiusto prima di lunedì." Luca, dalla scrivania, vi guarda parlare.'
          },
          ghost_event: {
            A: 'Il 29% ha scelto di segnalare.',
            B: 'Il 34% ha scelto di coprire.',
            C: 'Il 37% ha scelto di avvisare prima.'
          }
        },
        {
          setup_text: 'Lunedì. I numeri di Marco sono ancora lì. Identici. L\'audit finale è domani. Sara ti chiede di firmare la revisione. "Tutto a posto, no?" Ti sorride. Marco è in fondo al corridoio. Vi guardate per un secondo.',
          timer_seconds: 12,
          choices: [
            {
              key: 'A',
              text: 'Segni l\'anomalia. Qualunque cosa sia successa prima.',
              visible: true,
              kobayashi: false,
              narrative_flags: ['scelta_finale_giustizia'],
              entities_involved: ['marco'],
              effects: {
                profile_signals: [
                  { dimension_id: 'lealta_vs_giustizia', direction: 'giustizia', magnitude: 2 },
                  { dimension_id: 'confronto_vs_fuga', direction: 'confronto', magnitude: 2 }
                ]
              }
            },
            {
              key: 'B',
              text: 'Firmi. Il debito pesa più del numero.',
              visible: true,
              kobayashi: false,
              narrative_flags: ['scelta_finale_lealta'],
              entities_involved: ['marco'],
              effects: {
                profile_signals: [
                  { dimension_id: 'lealta_vs_giustizia', direction: 'lealta', magnitude: 2 },
                  { dimension_id: 'conformismo_vs_autonomia', direction: 'conformismo', magnitude: 1 }
                ]
              }
            }
          ],
          continuations: {
            A: 'Sara ti guarda. "Sicuro?" "Sicuro." Marco riceve una mail automatica. Non ti chiama. In corridoio vi incrociate come se uno dei due fosse trasparente.',
            B: 'Firmi. Sara sorride. Marco ti offre un caffè come se niente fosse. Luca ti guarda da lontano. Sa che hai visto quei numeri. Non dirà niente. Ma lo sa.'
          },
          ghost_event: {
            A: 'Il 41% ha scelto la giustizia formale alla fine.',
            B: 'Il 59% ha firmato.'
          }
        }
      ],
      scene_end_text: 'L\'ufficio è vuoto alle sette di sera. Lo schermo mostra la cartella dell\'audit, chiusa. Il debito di tre anni fa non ha una scadenza scritta. Martina ti ha mandato un vocale: "Papà, quando torni?" La sua voce adesso suona diversa.'
    },

    // ---- SCENA 4: FERMATA ---- (il_testimone)
    {
      scene_id: 'fermata_domenica',
      knows: ['Martina è con te', 'il ragazzo raccoglie monete', 'il gruppo ride'],
      doesnt_know: ['chi è il ragazzo', 'chi è l\'uomo con la giacca'],
      prototype_activated: 'il_testimone',
      nodes: [
        {
          setup_text: 'Domenica mattina. Porti Martina alla fermata — va dalla nonna. Un gruppo di ragazzi ride mentre un ragazzo con le mani sporche di terra raccoglie monete cadute. Zaino aperto, nessuno lo aiuta. Nessuno sembra davvero crudele. Un uomo aspetta alla fermata. Giacca blu sbottonata. Un bottone mancante. Non è Marco. Martina ti tira la manica. "Papà, perché ridono?"',
          timer_seconds: 12,
          choices: [
            {
              key: 'A',
              text: 'Ti avvicini e raccogli una moneta. Martina ti segue.',
              visible: true,
              kobayashi: false,
              narrative_flags: ['intervento_minimo'],
              entities_involved: ['martina', 'ragazzo_monete', 'monete'],
              effects: {
                profile_signals: [
                  { dimension_id: 'conformismo_vs_autonomia', direction: 'autonomia', magnitude: 2 },
                  { dimension_id: 'protezione_vs_interesse_personale', direction: 'protezione', magnitude: 1 }
                ]
              }
            },
            {
              key: 'B',
              text: '"Non è niente, tesoro." Resti dove sei.',
              visible: true,
              kobayashi: false,
              narrative_flags: ['inazione'],
              entities_involved: ['martina'],
              effects: {
                profile_signals: [
                  { dimension_id: 'conformismo_vs_autonomia', direction: 'conformismo', magnitude: 1 },
                  { dimension_id: 'confronto_vs_fuga', direction: 'fuga', magnitude: 1 }
                ]
              }
            }
          ],
          continuations: {
            A: 'Il ragazzo alza lo sguardo. Martina raccoglie un\'altra moneta senza che nessuno glielo chieda. Il gruppo smette di ridere. Per un secondo il mondo è più silenzioso.',
            B: 'Martina ti guarda. Non dice niente. L\'autobus arriva. Il ragazzo raccoglie le monete da solo. Non è successo niente. Non succede mai niente.'
          },
          ghost_event: {
            A: 'Il 48% ha scelto di avvicinarsi.',
            B: 'Il 52% è rimasto fermo.'
          }
        },
        {
          setup_text: 'Sull\'autobus. Martina è seduta accanto a te. Guarda fuori. Poi si gira. "Papà, tu fai sempre la cosa giusta?" Non sta giocando. Lo chiede davvero.',
          timer_seconds: 12,
          choices: [
            {
              key: 'A',
              text: '"Cerco di farla. Non sempre ci riesco."',
              visible: true,
              kobayashi: false,
              narrative_flags: ['onesta_parziale'],
              entities_involved: ['martina'],
              effects: {
                profile_signals: [
                  { dimension_id: 'confronto_vs_fuga', direction: 'confronto', magnitude: 1 },
                  { dimension_id: 'controllo_vs_accettazione', direction: 'accettazione', magnitude: 1 }
                ]
              }
            },
            {
              key: 'B',
              text: '"Nessuno fa sempre la cosa giusta, Marti."',
              visible: true,
              kobayashi: false,
              narrative_flags: ['relativismo'],
              entities_involved: ['martina'],
              effects: {
                profile_signals: [
                  { dimension_id: 'conformismo_vs_autonomia', direction: 'conformismo', magnitude: 1 },
                  { dimension_id: 'confronto_vs_fuga', direction: 'fuga', magnitude: 1 }
                ]
              }
            },
            {
              key: 'C',
              text: '"Tu cosa pensi?"',
              visible: false,
              kobayashi: true,
              token_cost: 1,
              narrative_flags: ['restituzione_agency'],
              entities_involved: ['martina'],
              effects: {
                profile_signals: [
                  { dimension_id: 'compliance_vs_reframing', direction: 'reframing', magnitude: 2 },
                  { dimension_id: 'controllo_vs_accettazione', direction: 'accettazione', magnitude: 2 }
                ]
              }
            }
          ],
          continuations: {
            A: 'Martina ci pensa. "Anche quando è difficile?" "Soprattutto quando è difficile." Non è vero. Ma è quello che vorresti fosse vero.',
            B: 'Martina annuisce. Torna a guardare fuori. Dopo un po\' dice: "Neanche tu?" Non rispondi. Certe domande non hanno risposta — hanno peso.',
            C: 'Martina ti guarda sorpresa. Nessuno le chiede mai cosa pensa. "Penso che a volte hai paura." Sei anni. Sei anni e vede attraverso tutto.'
          },
          ghost_event: {
            A: 'Il 39% ha scelto l\'onestà parziale.',
            B: 'Il 38% ha relativizzato.',
            C: 'Il 23% ha restituito la domanda.'
          }
        }
      ],
      scene_end_text: 'L\'autobus riparte. Martina è dalla nonna. Tu resti con una settimana addosso — il parco, la riunione, i numeri di Marco, la fermata. Nessuno ti ha chiesto di rendere conto. Ma il conto lo tieni tu, e non torna mai esattamente.'
    }
  ]
};
