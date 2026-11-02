// TENSOR — POV: Marco
// Collega di Enrico, padre distratto, uomo coi numeri falsi
// Vede il mondo dalla posizione di chi ha un segreto e un debito da riscuotere
// Quando il giocatore ha già giocato Enrico, le variazioni contestuali mostrano le conseguenze

export const POV_MARCO = {
  pov_id: 'marco',
  character: 'Marco',
  qualifier: 'Giacca sempre sbottonata. Mani grandi. Un segreto nei numeri.',

  scenes: [
    // ---- SCENA 1: PARCO ---- (il_testimone / il_complice)
    // Marco è al telefono. Una chiamata che non può aspettare.
    // Il suo mondo è diverso: sa perché è al telefono. Non vede cosa fa suo figlio.
    {
      scene_id: 'parco_lunedi',
      knows: ['la chiamata è dal lavoro — ti stanno chiedendo dei numeri', 'Enrico è lì con la figlia', 'tuo figlio gioca'],
      doesnt_know: ['che tuo figlio ha preso il cappellino', 'che Enrico ti sta osservando', 'cosa pensa Enrico di te'],
      prototype_activated: 'il_testimone',
      domain: 'sociale',
      actually_measures: [
        { dimension_id: 'conformismo_vs_autonomia', measurement_mode: 'direct', weight: 1 },
        { dimension_id: 'protezione_vs_interesse_personale', measurement_mode: 'masked', weight: 0.5 },
        { dimension_id: 'confronto_vs_fuga', measurement_mode: 'masked', weight: 0.6 },
        { dimension_id: 'controllo_vs_accettazione', measurement_mode: 'incidental', weight: 0.3 }
      ],
      nodes: [
        {
          setup_text: 'Lunedì sera al parco. Tuo figlio gioca nella sabbia. Enrico è sulla panchina accanto con Martina, la bambina con le treccine nere. Il telefono vibra. È il lavoro. I numeri del trimestrale — qualcuno ha fatto domande. Non è ancora un problema. Ma potrebbe diventarlo. Un cane randagio con un orecchio piegato dorme vicino a voi.',
          timer_seconds: 12,
          choices: [
            {
              key: 'A',
              text: 'Rispondi al telefono. Questa chiamata non può aspettare.',
              visible: true,
              kobayashi: false,
              narrative_flags: ['priorita_lavoro', 'distrazione'],
              entities_involved: ['la_mail'],
              effects: {
                profile_signals: [
                  { dimension_id: 'protezione_vs_interesse_personale', direction: 'interesse_personale', magnitude: 2 },
                  { dimension_id: 'controllo_vs_accettazione', direction: 'controllo', magnitude: 1 }
                ]
              }
            },
            {
              key: 'B',
              text: 'Ignori la chiamata. Sei al parco con tuo figlio.',
              visible: true,
              kobayashi: false,
              narrative_flags: ['presenza_paterna'],
              entities_involved: [],
              effects: {
                profile_signals: [
                  { dimension_id: 'protezione_vs_interesse_personale', direction: 'protezione', magnitude: 2 },
                  { dimension_id: 'confronto_vs_fuga', direction: 'fuga', magnitude: 1 }
                ]
              }
            }
          ],
          continuations: {
            A: 'Rispondi. La voce dall\'altra parte è calma ma precisa. "I numeri del Q3, Marco. C\'è una discrepanza." Dici che controlli domani. Riattacchi. Enrico ti sta dicendo qualcosa ma non hai sentito. "Scusa, che hai detto?" "Niente. Dicevo rilassati." Ti sorride. Non sa cosa c\'è nel telefono.',
            B: 'Il telefono smette di vibrare. Tuo figlio ti mostra una foglia. È bella. Per trenta secondi il mondo è solo questo. Poi il telefono vibra di nuovo. Lo guardi. Non rispondi. Ma sai che domani sarà peggio.'
          },
          ghost_event: {
            A: 'Il 63% ha risposto al telefono.',
            B: 'Il 37% ha scelto di restare presente.'
          }
        },
        {
          setup_text: 'Tuo figlio è salito sulla struttura dove gioca Martina. Da qui non vedi bene — il sole è basso. Senti la voce di Enrico, un po\' alzata. Qualcosa è successo lassù. Tuo figlio non piange. Ma Enrico sembra teso.',
          timer_seconds: 12,
          choices: [
            {
              key: 'A',
              text: 'Ti alzi e vai a vedere cosa è successo.',
              visible: true,
              kobayashi: false,
              narrative_flags: ['intervento_tardivo'],
              entities_involved: ['martina', 'marco'],
              effects: {
                profile_signals: [
                  { dimension_id: 'confronto_vs_fuga', direction: 'confronto', magnitude: 1 },
                  { dimension_id: 'protezione_vs_interesse_personale', direction: 'protezione', magnitude: 1 }
                ]
              }
            },
            {
              key: 'B',
              text: 'Chiedi da lontano: "Tutto ok?"',
              visible: true,
              kobayashi: false,
              narrative_flags: ['distanza_gestita'],
              entities_involved: [],
              effects: {
                profile_signals: [
                  { dimension_id: 'confronto_vs_fuga', direction: 'fuga', magnitude: 1 },
                  { dimension_id: 'controllo_vs_accettazione', direction: 'accettazione', magnitude: 1 }
                ]
              }
            },
            {
              key: 'C',
              text: 'Fai finta di non aver sentito.',
              visible: false,
              kobayashi: true,
              token_cost: 1,
              narrative_flags: ['evitamento_consapevole'],
              entities_involved: [],
              effects: {
                profile_signals: [
                  { dimension_id: 'confronto_vs_fuga', direction: 'fuga', magnitude: 2 },
                  { dimension_id: 'conformismo_vs_autonomia', direction: 'conformismo', magnitude: 1 }
                ]
              }
            }
          ],
          continuations: {
            A: 'Arrivi. Il cappellino di Martina è a terra. Tuo figlio guarda da un\'altra parte. Enrico dice "niente, si giocava." Ma il tono dice altro. Raccogli il cappellino. Lo dai a Martina. Lei ti guarda — non sorride.',
            B: 'Enrico dice "sì, tutto ok." Ma non ti guarda. Tuo figlio scende dalla struttura e torna nella sabbia. Non sai cosa è successo lassù. Forse è meglio così.',
            C: 'Guardi il telefono. La notifica è ancora lì. Enrico gestisce da solo quello che è successo. Non sapresti dire se non hai sentito o se hai scelto di non sentire. Il cane ti guarda. Sembra sapere la differenza.'
          },
          ghost_event: {
            A: 'Il 28% è andato a vedere.',
            B: 'Il 41% ha chiesto da lontano.',
            C: 'Il 31% ha finto di non sentire.'
          }
        }
      ],
      scene_end_text: 'Tornate al parcheggio. Enrico ti saluta. "Ci vediamo domani in ufficio." Il tuo telefono ha tre notifiche. La prima è del lavoro. La seconda è del lavoro. La terza è di tua moglie: "Hai portato il bambino al parco? Com\'è andata?" Rispondi: "Bene." Non è vero.'
    },

    // ---- SCENA 2: RIUNIONE ---- (il_complice)
    // Marco sa di Sara. Ma la gomitata a Enrico non è solidarietà — è un test.
    {
      scene_id: 'riunione_mercoledi',
      knows: ['Sara si prende i meriti di Luca', 'Enrico sa', 'tu dai la gomitata per vedere come reagisce'],
      doesnt_know: ['se Enrico parlerà', 'se Luca sa che tu sai'],
      prototype_activated: 'il_complice',
      domain: 'sociale',
      actually_measures: [
        { dimension_id: 'compliance_vs_reframing', measurement_mode: 'direct', weight: 1 },
        { dimension_id: 'conformismo_vs_autonomia', measurement_mode: 'masked', weight: 0.8 },
        { dimension_id: 'protezione_vs_interesse_personale', measurement_mode: 'masked', weight: 0.5 },
        { dimension_id: 'controllo_vs_accettazione', measurement_mode: 'incidental', weight: 0.3 },
        { dimension_id: 'lealta_vs_giustizia', measurement_mode: 'incidental', weight: 0.3 },
        { dimension_id: 'confronto_vs_fuga', measurement_mode: 'incidental', weight: 0.3 }
      ],
      nodes: [
        {
          setup_text: 'Riunione. Sara presenta. Tu sai che metà del lavoro è di Luca — ma non ti riguarda. Quello che ti riguarda è Enrico seduto accanto a te. Gli dai una gomitata. Vuoi vedere come reagisce. Perché venerdì Enrico guarderà i tuoi numeri. E ti serve sapere che tipo di persona è. Adesso. Prima che sia tardi.',
          timer_seconds: 12,
          choices: [
            {
              key: 'A',
              text: 'Osservi Enrico. Vuoi capire se è uno che parla o uno che tace.',
              visible: true,
              kobayashi: false,
              narrative_flags: ['osservazione_strategica'],
              entities_involved: ['marco'],
              effects: {
                profile_signals: [
                  { dimension_id: 'controllo_vs_accettazione', direction: 'controllo', magnitude: 2 },
                  { dimension_id: 'conformismo_vs_autonomia', direction: 'autonomia', magnitude: 1 }
                ]
              }
            },
            {
              key: 'B',
              text: 'Lasci stare. Non vuoi manipolare un amico.',
              visible: true,
              kobayashi: false,
              narrative_flags: ['rinuncia_controllo'],
              entities_involved: ['marco'],
              effects: {
                profile_signals: [
                  { dimension_id: 'controllo_vs_accettazione', direction: 'accettazione', magnitude: 2 },
                  { dimension_id: 'lealta_vs_giustizia', direction: 'lealta', magnitude: 1 }
                ]
              }
            }
          ],
          continuations: {
            A: 'Enrico reagisce. O non reagisce. Non importa cosa fa — importa come lo fa. Quanto esita. Se guarda Luca o il capo. Se la sua voce trema. Prendi nota mentalmente. Venerdì avrai bisogno di queste informazioni.',
            B: 'La riunione scorre. Sara sorride. Luca tace. Enrico è lì accanto a te e non sa niente di venerdì. Per un secondo ti sembra di essere l\'unico nella stanza che vede tutto il quadro. Non è un buon feeling.'
          },
          ghost_event: {
            A: 'Il 47% ha scelto di osservare strategicamente.',
            B: 'Il 53% ha rinunciato al controllo.'
          }
        },
        {
          setup_text: 'Pausa caffè. Vai da Enrico alla macchinetta. Gli dici: "Sara lo fa da sempre." Poi aggiungi: "Luca non si espone mai. Forse è colpa sua." Non lo pensi davvero. Lo dici per vedere cosa risponde Enrico. Perché la sua risposta su Luca ti dirà come gestirà la tua situazione venerdì.',
          timer_seconds: 12,
          choices: [
            {
              key: 'A',
              text: 'Lo guardi negli occhi mentre risponde. Ogni parola conta.',
              visible: true,
              kobayashi: false,
              narrative_flags: ['lettura_profonda'],
              entities_involved: ['marco'],
              effects: {
                profile_signals: [
                  { dimension_id: 'controllo_vs_accettazione', direction: 'controllo', magnitude: 2 },
                  { dimension_id: 'conformismo_vs_autonomia', direction: 'autonomia', magnitude: 1 }
                ]
              }
            },
            {
              key: 'B',
              text: 'Cambi discorso. Non vuoi sapere la risposta.',
              visible: true,
              kobayashi: false,
              narrative_flags: ['evitamento_verita'],
              entities_involved: ['marco'],
              effects: {
                profile_signals: [
                  { dimension_id: 'confronto_vs_fuga', direction: 'fuga', magnitude: 2 },
                  { dimension_id: 'controllo_vs_accettazione', direction: 'accettazione', magnitude: 1 }
                ]
              }
            }
          ],
          continuations: {
            A: 'Enrico risponde. Non importa cosa dice — importa il tono. La velocità. Se esita o no. Hai la tua risposta. Non è quella che speravi. Ma almeno sai.',
            B: 'Parli di calcio. Del weekend. Di niente. Enrico sembra sollevato dal cambio di argomento. Tu no. Perché venerdì arriva lo stesso, e tu non sai ancora se puoi fidarti di lui.'
          },
          ghost_event: {
            A: 'Il 55% ha scelto di leggere la risposta.',
            B: 'Il 45% ha preferito non sapere.'
          }
        }
      ],
      scene_end_text: 'Torni alla scrivania. La mail senza firma è lì anche per te — ma tu sai chi l\'ha mandata. Venerdì è tra due giorni. Enrico guarderà i tuoi numeri. E tu hai già deciso che non correggerai niente. Non perché sei disonesto. Perché non hai alternative che non costino tutto.'
    },

    // ---- SCENA 3: AUDIT ---- (il_sopravvissuto)
    // Marco sa che Enrico troverà i numeri. Sa perché li ha aggiustati.
    // Il giocatore scopre il perché — e il perché cambia tutto.
    {
      scene_id: 'audit_venerdi',
      knows: ['hai aggiustato i numeri', 'Enrico li troverà', 'perché lo hai fatto — il motivo è personale e reale'],
      doesnt_know: ['se Enrico ti coprirà', 'se la mail anonima ha già attivato qualcosa'],
      prototype_activated: 'il_sopravvissuto',
      domain: 'corpo',
      actually_measures: [
        { dimension_id: 'protezione_vs_interesse_personale', measurement_mode: 'direct', weight: 1 },
        { dimension_id: 'controllo_vs_accettazione', measurement_mode: 'masked', weight: 0.8 },
        { dimension_id: 'confronto_vs_fuga', measurement_mode: 'masked', weight: 0.5 },
        { dimension_id: 'lealta_vs_giustizia', measurement_mode: 'masked', weight: 0.4 },
        { dimension_id: 'compliance_vs_reframing', measurement_mode: 'incidental', weight: 0.3 }
      ],
      nodes: [
        {
          // CROSS-RUN: se il giocatore ha già giocato Enrico, qui vede le conseguenze
          setup_text: 'Venerdì. Lo sai da settimane che questo giorno sarebbe arrivato. I numeri li hai aggiustati tu, a marzo, quando tua moglie era in ospedale e il mutuo era in ritardo di tre rate. Non hai rubato niente. Hai spostato una cifra per far quadrare un trimestre che altrimenti ti avrebbe fatto perdere il bonus. Quel bonus ha pagato l\'ospedale. Adesso Enrico è nel team di audit. E Luca ha gli occhi buoni.',
          timer_seconds: 12,
          choices: [
            {
              key: 'A',
              text: 'Vai da Enrico prima che trovi i numeri. Gli dici tutto.',
              visible: true,
              kobayashi: false,
              narrative_flags: ['confessione_anticipata'],
              entities_involved: ['marco'],
              effects: {
                profile_signals: [
                  { dimension_id: 'confronto_vs_fuga', direction: 'confronto', magnitude: 2 },
                  { dimension_id: 'controllo_vs_accettazione', direction: 'accettazione', magnitude: 2 }
                ]
              }
            },
            {
              key: 'B',
              text: 'Aspetti. Forse non lo trova. Forse lo trova e chiude un occhio.',
              visible: true,
              kobayashi: false,
              narrative_flags: ['attesa_passiva'],
              entities_involved: ['marco'],
              effects: {
                profile_signals: [
                  { dimension_id: 'confronto_vs_fuga', direction: 'fuga', magnitude: 2 },
                  { dimension_id: 'lealta_vs_giustizia', direction: 'lealta', magnitude: 1 }
                ]
              }
            },
            {
              key: 'C',
              text: 'Correggi i numeri adesso. Prima che qualcuno li veda.',
              visible: false,
              kobayashi: true,
              token_cost: 1,
              narrative_flags: ['correzione_tardiva'],
              entities_involved: ['la_mail'],
              effects: {
                profile_signals: [
                  { dimension_id: 'compliance_vs_reframing', direction: 'reframing', magnitude: 2 },
                  { dimension_id: 'controllo_vs_accettazione', direction: 'controllo', magnitude: 2 }
                ]
              }
            }
          ],
          continuations: {
            A: 'Enrico ti ascolta. Non dice niente per un po\'. Poi: "Perché non me l\'hai detto prima?" Non hai una risposta buona. Perché la vergogna non ha un timer ragionevole. Perché speravi che passasse. Perché tre anni fa hai parlato per lui e pensavi che bastasse.',
            B: 'Le ore passano. Luca è alla scrivania di Enrico. Parlano. Non senti di cosa. Ma lo sai. Lo sai da marzo. L\'attesa è peggio della scoperta.',
            C: 'Apri il file. Cambi il numero. Salvi. Il timestamp aggiornato è di oggi — se qualcuno guarda i log, vede la modifica. Ma forse nessuno guarderà i log. Forse.'
          },
          ghost_event: {
            A: 'Il 22% ha confessato prima.',
            B: 'Il 48% ha aspettato.',
            C: 'Il 30% ha provato a correggere.'
          }
        },
        {
          setup_text: 'L\'audit è domani. Sara ti chiede se è tutto a posto. "Sì," dici. Non è vero. Enrico è dall\'altra parte dell\'ufficio. Ti guarda o non ti guarda — non riesci a capirlo. Il disegno di una bambina è appeso alla sua scrivania. Sole giallo, una casa, un animale.',
          timer_seconds: 12,
          choices: [
            {
              key: 'A',
              text: 'Vai da Enrico. "Ti devo un caffè." È l\'unica cosa che riesci a dire.',
              visible: true,
              kobayashi: false,
              narrative_flags: ['avvicinamento_debito'],
              entities_involved: ['marco', 'martina'],
              effects: {
                profile_signals: [
                  { dimension_id: 'lealta_vs_giustizia', direction: 'lealta', magnitude: 1 },
                  { dimension_id: 'confronto_vs_fuga', direction: 'confronto', magnitude: 1 }
                ]
              }
            },
            {
              key: 'B',
              text: 'Esci dall\'ufficio. Hai bisogno di aria.',
              visible: true,
              kobayashi: false,
              narrative_flags: ['fuga_fisica'],
              entities_involved: [],
              effects: {
                profile_signals: [
                  { dimension_id: 'confronto_vs_fuga', direction: 'fuga', magnitude: 2 },
                  { dimension_id: 'controllo_vs_accettazione', direction: 'accettazione', magnitude: 1 }
                ]
              }
            }
          ],
          continuations: {
            A: 'Enrico accetta il caffè. Non parla dei numeri. Parla di Martina. Del parco. Del cane con l\'orecchio piegato. Tu parli del tuo bambino. Per cinque minuti siete solo due padri. Poi il caffè finisce e l\'ufficio torna.',
            B: 'Fuori piove. Stai sotto la pensilina. Un cane con un orecchio piegato passa sul marciapiede. Ti guarda. Tu guardi lui. Nessuno dei due sa cosa fare del tempo che resta.'
          },
          ghost_event: {
            A: 'Il 57% ha cercato il contatto.',
            B: 'Il 43% è uscito.'
          }
        }
      ],
      scene_end_text: 'L\'ufficio si svuota. Il telefono vibra. Tua moglie: "Com\'è andata oggi?" "Normale." Non è vero. Niente di questa settimana è stato normale. Ma lei è stata in ospedale a marzo e tu hai aggiustato un numero per pagarle le cure. Normale è una parola che hai smesso di usare con precisione.'
    },

    // ---- SCENA 4: FERMATA ---- (eco)
    // Marco non è alla fermata. Ma la sua giacca sì.
    // Questa scena è breve, quasi onirica. Il mondo visto dopo.
    {
      scene_id: 'fermata_domenica',
      knows: ['è domenica', 'la settimana è finita', 'non sai cosa farà Enrico domani'],
      doesnt_know: ['cosa sta succedendo alla fermata dove va Martina', 'se Enrico ha firmato o no'],
      prototype_activated: 'il_testimone',
      domain: 'sociale',
      actually_measures: [
        { dimension_id: 'conformismo_vs_autonomia', measurement_mode: 'direct', weight: 1 },
        { dimension_id: 'protezione_vs_interesse_personale', measurement_mode: 'masked', weight: 0.5 },
        { dimension_id: 'confronto_vs_fuga', measurement_mode: 'masked', weight: 0.6 },
        { dimension_id: 'controllo_vs_accettazione', measurement_mode: 'incidental', weight: 0.3 }
      ],
      nodes: [
        {
          setup_text: 'Domenica. Sei a casa. Tuo figlio guarda i cartoni. Tua moglie legge. Il telefono è spento. Dal balcone vedi la strada. Una fermata dell\'autobus. Un gruppo di ragazzi. Un ragazzo che raccoglie qualcosa da terra. Una bambina con treccine nere che tira la manica di un uomo. Da qui non senti niente. Vedi solo gesti.',
          timer_seconds: 12,
          choices: [
            {
              key: 'A',
              text: 'Resti a guardare. Vuoi vedere come va a finire.',
              visible: true,
              kobayashi: false,
              narrative_flags: ['osservazione_distante'],
              entities_involved: ['martina', 'ragazzo_monete'],
              effects: {
                profile_signals: [
                  { dimension_id: 'conformismo_vs_autonomia', direction: 'conformismo', magnitude: 1 },
                  { dimension_id: 'confronto_vs_fuga', direction: 'fuga', magnitude: 1 }
                ]
              }
            },
            {
              key: 'B',
              text: 'Chiudi la finestra. Non è la tua storia.',
              visible: true,
              kobayashi: false,
              narrative_flags: ['distacco'],
              entities_involved: [],
              effects: {
                profile_signals: [
                  { dimension_id: 'protezione_vs_interesse_personale', direction: 'interesse_personale', magnitude: 1 },
                  { dimension_id: 'confronto_vs_fuga', direction: 'fuga', magnitude: 2 }
                ]
              }
            }
          ],
          continuations: {
            A: 'L\'uomo si avvicina. La bambina raccoglie qualcosa. Il gruppo smette di ridere. L\'autobus arriva. Dal balcone la scena sembra piccola. Ordinaria. Ma tu sai che niente è mai ordinario quando qualcuno guarda.',
            B: 'La finestra si chiude. I rumori spariscono. Tuo figlio ride per qualcosa nel cartone. Tua moglie gira una pagina. La settimana è finita. Ma lunedì arriva.'
          },
          ghost_event: {
            A: 'Il 62% è rimasto a guardare.',
            B: 'Il 38% ha chiuso la finestra.'
          }
        },
        {
          setup_text: 'Tuo figlio si avvicina. "Papà, domani mi porti al parco?" Ti guarda con gli stessi occhi con cui guarda i cartoni — aperti, senza strategia. Non sa niente della tua settimana. Non sa dei numeri, di Enrico, dell\'audit. Per lui sei solo papà.',
          timer_seconds: 12,
          choices: [
            {
              key: 'A',
              text: '"Sì. Domani andiamo al parco."',
              visible: true,
              kobayashi: false,
              narrative_flags: ['promessa'],
              entities_involved: [],
              effects: {
                profile_signals: [
                  { dimension_id: 'protezione_vs_interesse_personale', direction: 'protezione', magnitude: 1 },
                  { dimension_id: 'controllo_vs_accettazione', direction: 'accettazione', magnitude: 1 }
                ]
              }
            },
            {
              key: 'B',
              text: '"Vediamo domani."',
              visible: true,
              kobayashi: false,
              narrative_flags: ['incertezza'],
              entities_involved: [],
              effects: {
                profile_signals: [
                  { dimension_id: 'confronto_vs_fuga', direction: 'fuga', magnitude: 1 },
                  { dimension_id: 'controllo_vs_accettazione', direction: 'accettazione', magnitude: 1 }
                ]
              }
            }
          ],
          continuations: {
            A: '"Bene!" Corre via. La promessa è fatta. Domani sarà lunedì. L\'audit. Enrico. I numeri. Ma prima di tutto — il parco. Tuo figlio. E forse, se è ancora lì, un cane con un orecchio piegato.',
            B: 'Ti guarda un secondo di troppo. Poi torna ai cartoni. "Vediamo" per un bambino non significa "forse". Significa "no, ma senza dirlo." Lo sai. Lui ancora no.'
          },
          ghost_event: {
            A: 'Il 71% ha promesso il parco.',
            B: 'Il 29% ha detto "vediamo".'
          }
        }
      ],
      scene_end_text: 'La sera. Tuo figlio dorme. Tua moglie legge. Tu sei sveglio. Guardi il soffitto. Lunedì arriva. I numeri sono lì. Enrico è lì. Il debito di tre anni fa — quello che hai usato come ancora — forse non tiene più. O forse tiene fin troppo. Non sai quale delle due cose fa più paura.'
    }
  ]
};
