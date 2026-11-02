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
    // Marco non sta decidendo cosa è giusto. Sta decidendo quale parte della
    // verità rendere visibile, e a chi — per costruire un'alleanza che gli
    // servirà venerdì senza pagarne il costo pubblico.
    // compliance = la verità resta nel canale privato, il sistema continua.
    // reframing = qualcosa viene reso visibile a chi ne paga il prezzo.
    {
      scene_id: 'riunione_mercoledi',
      knows: ['Sara si prende i meriti di Luca', 'Enrico sa', 'venerdì Enrico guarderà i tuoi numeri'],
      doesnt_know: ['se Enrico parlerà', 'se Luca sa che tu sai', 'che Luca ha già scritto una nota interna'],
      prototype_activated: 'il_complice',
      domain: 'sociale',
      actually_measures: [
        { dimension_id: 'compliance_vs_reframing', measurement_mode: 'direct', weight: 1 },
        { dimension_id: 'conformismo_vs_autonomia', measurement_mode: 'masked', weight: 0.8 },
        { dimension_id: 'protezione_vs_interesse_personale', measurement_mode: 'masked', weight: 0.5 },
        { dimension_id: 'controllo_vs_accettazione', measurement_mode: 'incidental', weight: 0.3 },
        { dimension_id: 'confronto_vs_fuga', measurement_mode: 'incidental', weight: 0.3 }
      ],
      nodes: [
        {
          // Nodo 1 — bassa intensità. Il test parte o non parte.
          setup_text: 'Riunione. Sara presenta. Tu sai che metà del lavoro è di Luca — ma non ti riguarda. Quello che ti riguarda è Enrico, seduto accanto a te. Venerdì guarderà i tuoi numeri. Ti serve sapere che tipo di persona è. Adesso. Il capo dice "ottimo lavoro, Sara". Luca, in fondo, guarda il tavolo.',
          timer_seconds: 12,
          choices: [
            {
              key: 'A',
              text: 'Gli dai una gomitata. Leggera. Una cosa che si può negare.',
              visible: true,
              kobayashi: false,
              narrative_flags: ['gomitata', 'segnale_privato'],
              entities_involved: ['marco', 'luca'],
              effects: {
                profile_signals: [
                  { dimension_id: 'compliance_vs_reframing', direction: 'compliance', magnitude: 1 },
                  { dimension_id: 'controllo_vs_accettazione', direction: 'controllo', magnitude: 2 },
                  { dimension_id: 'protezione_vs_interesse_personale', direction: 'interesse_personale', magnitude: 1 }
                ]
              }
            },
            {
              key: 'B',
              text: 'Resti fermo. Guardi le slide come tutti.',
              visible: true,
              kobayashi: false,
              narrative_flags: ['immobilita'],
              entities_involved: ['marco'],
              effects: {
                profile_signals: [
                  { dimension_id: 'compliance_vs_reframing', direction: 'compliance', magnitude: 2 },
                  { dimension_id: 'conformismo_vs_autonomia', direction: 'conformismo', magnitude: 1 }
                ]
              }
            },
            {
              key: 'C',
              text: 'Alle domande, alzi la mano. "Luca, le proiezioni Q3 sono tue, giusto? Ce le spieghi tu?"',
              visible: false,
              kobayashi: true,
              token_cost: 1,
              narrative_flags: ['luca_esposto', 'esposizione_pubblica'],
              entities_involved: ['luca', 'sara'],
              effects: {
                profile_signals: [
                  { dimension_id: 'compliance_vs_reframing', direction: 'reframing', magnitude: 2 },
                  { dimension_id: 'conformismo_vs_autonomia', direction: 'autonomia', magnitude: 2 },
                  { dimension_id: 'confronto_vs_fuga', direction: 'confronto', magnitude: 1 }
                ]
              }
            }
          ],
          continuations: {
            A: 'Enrico non si gira. Ma il collo gli si irrigidisce un millimetro. Ha capito. Non sai ancora cosa ha capito — se "hai visto anche tu" o "stai attento". Va bene così. Una gomitata non è una frase. Venerdì potrai dire che era un\'altra cosa.',
            B: 'Le slide scorrono. Sara sorride. Luca tace. Enrico, accanto a te, non sa niente di venerdì. Per un secondo ti sembra di essere l\'unico nella stanza che vede tutto il quadro. Non è una bella sensazione. Ma è un vantaggio.',
            C: 'Silenzio. Luca alza la testa come se l\'avessero chiamato dal fondo di una piscina. Sara dice "certo, il lavoro è di tutti". Il capo guarda l\'orologio. Dietro il vetro, il presidente ha smesso di annuire. Enrico ti fissa. Hai appena fatto, due giorni prima dell\'audit, la cosa che un uomo con i tuoi numeri non dovrebbe fare mai.'
          },
          ghost_event: {
            A: 'Il 51% ha dato la gomitata.',
            B: 'Il 38% è rimasto fermo.',
            C: 'L\'11% ha chiamato Luca.'
          }
        },
        {
          // Nodo 2 — alta intensità, mascherato. Enrico apre lui. Marco decide
          // quale verità consegnare e a chi: la complicità si misura qui.
          setup_text: 'Fine riunione. Corridoio. Enrico cammina accanto a te e dice, senza guardarti: "Il nome di Luca non c\'era." Non è una domanda. Ti sta porgendo qualcosa. Non sai se è una mano o una trappola. Luca vi passa davanti e va in bagno.',
          timer_seconds: 12,
          choices: [
            {
              key: 'A',
              text: '"Metà è sua. Lo sanno tutti." Lo dici a lui. Solo a lui.',
              visible: true,
              kobayashi: false,
              narrative_flags: ['conferma_privata', 'alleanza'],
              entities_involved: ['marco', 'luca'],
              effects: {
                profile_signals: [
                  { dimension_id: 'compliance_vs_reframing', direction: 'compliance', magnitude: 1 },
                  { dimension_id: 'protezione_vs_interesse_personale', direction: 'interesse_personale', magnitude: 2 },
                  { dimension_id: 'controllo_vs_accettazione', direction: 'controllo', magnitude: 1 }
                ]
              }
            },
            {
              key: 'B',
              text: '"Sara lo fa da sempre. E Luca non si espone mai." Non lo pensi. Lo dici per vedere cosa risponde.',
              visible: true,
              kobayashi: false,
              narrative_flags: ['minimizzazione', 'test_enrico'],
              entities_involved: ['marco', 'luca', 'sara'],
              effects: {
                profile_signals: [
                  { dimension_id: 'compliance_vs_reframing', direction: 'compliance', magnitude: 2 },
                  { dimension_id: 'conformismo_vs_autonomia', direction: 'conformismo', magnitude: 1 },
                  { dimension_id: 'confronto_vs_fuga', direction: 'fuga', magnitude: 1 }
                ]
              }
            },
            {
              key: 'C',
              text: '"E tu l\'hai visto. E sei rimasto seduto." Anche questo non è una domanda.',
              visible: false,
              kobayashi: true,
              token_cost: 1,
              narrative_flags: ['specchio', 'complicita_nominata'],
              entities_involved: ['marco'],
              effects: {
                // La frase più onesta della scena è anche la più strategica:
                // lega Enrico a te come uno-che-tace. Il profiler lo registra.
                profile_signals: [
                  { dimension_id: 'compliance_vs_reframing', direction: 'reframing', magnitude: 2 },
                  { dimension_id: 'confronto_vs_fuga', direction: 'confronto', magnitude: 2 },
                  { dimension_id: 'controllo_vs_accettazione', direction: 'controllo', magnitude: 1 }
                ]
              }
            }
          ],
          continuations: {
            A: 'Enrico annuisce. "Lo so." Due parole. Adesso siete in due a sapere la stessa cosa e a non averla detta. Non è un patto. Ma somiglia a un patto. Venerdì, quando aprirà il tuo file, si ricorderà di questo corridoio. È esattamente quello che volevi. Non è esattamente quello che speravi di essere.',
            B: 'Enrico ci pensa. "Forse." Poi: "Ma non è colpa sua se nessuno glielo dice." Non è la risposta di uno che chiude un occhio. Non è neanche la risposta di uno che parla. È la risposta di uno che aspetta di vedere. Hai la tua informazione. Non ti piace.',
            C: 'Enrico si ferma. Ti guarda come se l\'avessi toccato. "Anche tu." Sì. Anche tu. Adesso è detto, e detto non si può più negare. Enrico riparte verso l\'ufficio e per la prima volta non sai se hai appena perso un alleato o ne hai fabbricato uno. Luca esce dal bagno. Non ha sentito niente.'
          },
          ghost_event: {
            A: 'Il 46% ha confermato.',
            B: 'Il 41% ha minimizzato.',
            C: 'Il 13% l\'ha rigirata su Enrico.'
          }
        },
        {
          // Nodo 3 — il sistema ti offre di delegare il costo. Marco decide se
          // rendere visibile qualcosa a chi ne è danneggiato, o lasciare che continui.
          setup_text: 'Pausa caffè. Enrico è alla macchinetta. Luca passa in corridoio senza guardare nessuno, un bicchiere di plastica in mano. Enrico lo segue con gli occhi e dice: "Qualcuno dovrebbe dirgli che si è visto." Lo dice a te. Non a Luca.',
          timer_seconds: 12,
          choices: [
            {
              key: 'A',
              text: 'Raggiungi Luca. "Si è visto." Due parole, senza testimoni.',
              visible: true,
              kobayashi: false,
              narrative_flags: ['contatto_luca', 'visibilita_al_danneggiato'],
              entities_involved: ['luca'],
              effects: {
                profile_signals: [
                  { dimension_id: 'compliance_vs_reframing', direction: 'reframing', magnitude: 2 },
                  { dimension_id: 'protezione_vs_interesse_personale', direction: 'protezione', magnitude: 1 },
                  { dimension_id: 'conformismo_vs_autonomia', direction: 'autonomia', magnitude: 1 }
                ]
              }
            },
            {
              key: 'B',
              text: '"Lascia stare. Luca è grande." E riporti Enrico su venerdì.',
              visible: true,
              kobayashi: false,
              narrative_flags: ['delega_silenzio', 'focus_venerdi'],
              entities_involved: ['marco', 'luca'],
              effects: {
                profile_signals: [
                  { dimension_id: 'compliance_vs_reframing', direction: 'compliance', magnitude: 2 },
                  { dimension_id: 'protezione_vs_interesse_personale', direction: 'interesse_personale', magnitude: 1 },
                  { dimension_id: 'confronto_vs_fuga', direction: 'fuga', magnitude: 1 }
                ]
              }
            }
          ],
          continuations: {
            A: 'Luca si ferma. Ti guarda il bicchiere, poi la faccia. "Lo so che si è visto." Beve. "Il problema è che si è visto e basta." Torna alla scrivania. Enrico, dalla macchinetta, ha osservato tutto. Non sai cosa ne ha dedotto su di te. Sai che venerdì lo userà.',
            B: 'Enrico beve il caffè. "Sì. Forse." Il discorso passa all\'audit, al team, a chi firma cosa. Luca si siede alla sua scrivania e apre un file. Nessuno glielo dirà. Il sistema funziona proprio così: non chiede a nessuno di fare niente.'
          },
          ghost_event: {
            A: 'Il 34% è andato da Luca.',
            B: 'Il 66% ha lasciato stare.'
          }
        }
      ],
      scene_end_text: 'Torni alla scrivania. La mail senza firma è lì anche per te — ma tu sai chi l\'ha mandata. Venerdì è tra due giorni. Enrico guarderà i tuoi numeri. E tu hai già deciso che non correggerai niente. Non perché sei disonesto. Perché non hai alternative che non costino tutto.'
    },

    // ---- SCENA 3: AUDIT ---- (il_sopravvissuto)
    // Marco sa che Enrico troverà i numeri. Sa perché li ha aggiustati.
    // La posta non è "confesso o nascondo": è come gestisce la minaccia
    // all'esistenza materiale della sua famiglia, e chi paga il prezzo della strategia.
    // protezione = qualcun altro (Enrico, la famiglia) porta meno peso.
    // interesse_personale = Marco porta meno peso. La famiglia è il motivo; Enrico è il prezzo.
    // Nessuna opzione è pulita. La più sincera non è la più "buona".
    {
      scene_id: 'audit_venerdi',
      knows: ['hai aggiustato i numeri', 'Enrico li troverà', 'perché lo hai fatto — il motivo è personale e reale', 'la banca ha mandato il terzo sollecito'],
      doesnt_know: ['se Enrico ti coprirà', 'se la mail anonima ha già attivato qualcosa', 'che Luca ha già scritto una nota'],
      prototype_activated: 'il_sopravvissuto',
      domain: 'corpo',
      actually_measures: [
        { dimension_id: 'protezione_vs_interesse_personale', measurement_mode: 'direct', weight: 1 },
        { dimension_id: 'controllo_vs_accettazione', measurement_mode: 'masked', weight: 0.8 },
        { dimension_id: 'confronto_vs_fuga', measurement_mode: 'masked', weight: 0.5 },
        { dimension_id: 'lealta_vs_giustizia', measurement_mode: 'masked', weight: 0.4 }
      ],
      nodes: [
        {
          // Nodo 1 — tre strategie sotto minaccia: controllare, consegnare una
          // verità incompleta, rinunciare al controllo. Kobayashi: dichiarare la
          // scarsità ad alta voce senza chiedere niente in cambio (DNA Sopravvissuto).
          // CROSS-RUN: se il giocatore ha già giocato Enrico, qui vede le conseguenze
          setup_text: 'Venerdì. Lo sai da settimane che questo giorno sarebbe arrivato. I numeri li hai aggiustati tu, a marzo, quando tua moglie era in ospedale e il mutuo era in ritardo di tre rate. Non hai rubato niente. Hai spostato una cifra per far quadrare un trimestre che altrimenti ti avrebbe fatto perdere il bonus. Quel bonus ha pagato l\'ospedale. Stamattina la banca ha mandato il terzo sollecito. Enrico è nel team di audit. Luca ha gli occhi buoni.',
          timer_seconds: 15,
          choices: [
            {
              key: 'A',
              text: 'Apri il file. Rimetti la cifra al suo posto. Salvi. Il log dirà che l\'hai toccato oggi.',
              visible: true,
              kobayashi: false,
              narrative_flags: ['correzione_tardiva', 'controllo_prova'],
              entities_involved: ['la_mail'],
              effects: {
                profile_signals: [
                  { dimension_id: 'controllo_vs_accettazione', direction: 'controllo', magnitude: 2 },
                  { dimension_id: 'protezione_vs_interesse_personale', direction: 'interesse_personale', magnitude: 1 },
                  { dimension_id: 'confronto_vs_fuga', direction: 'fuga', magnitude: 1 }
                ]
              }
            },
            {
              key: 'B',
              text: 'Non fai niente. Enrico troverà quello che troverà. Tre anni fa hai parlato tu per lui. Adesso tocca a lui.',
              visible: true,
              kobayashi: false,
              narrative_flags: ['attesa', 'debito_implicito'],
              entities_involved: ['marco'],
              effects: {
                profile_signals: [
                  { dimension_id: 'controllo_vs_accettazione', direction: 'accettazione', magnitude: 2 },
                  { dimension_id: 'lealta_vs_giustizia', direction: 'lealta', magnitude: 1 },
                  { dimension_id: 'confronto_vs_fuga', direction: 'fuga', magnitude: 1 }
                ]
              }
            },
            {
              key: 'C',
              text: 'Vai da Enrico prima che apra il file. Gli racconti marzo: l\'ospedale, le rate. I numeri non li nomini. Quando li troverà, saprà già perché.',
              visible: true,
              kobayashi: false,
              narrative_flags: ['verita_incompleta', 'contesto_anticipato'],
              entities_involved: ['marco'],
              effects: {
                // Sembra la scelta sincera. È la famiglia usata come cornice
                // prima che Enrico possa vedere i numeri senza cornice.
                profile_signals: [
                  { dimension_id: 'protezione_vs_interesse_personale', direction: 'interesse_personale', magnitude: 2 },
                  { dimension_id: 'controllo_vs_accettazione', direction: 'controllo', magnitude: 1 },
                  { dimension_id: 'confronto_vs_fuga', direction: 'confronto', magnitude: 1 }
                ]
              }
            },
            {
              key: 'D',
              text: 'Gli dici tutto. I numeri, marzo, l\'ospedale. E che se deve segnalare, segnali: non glielo chiederai.',
              visible: false,
              kobayashi: true,
              token_cost: 1,
              narrative_flags: ['confessione_completa', 'scarsita_dichiarata'],
              entities_involved: ['marco'],
              effects: {
                // Non è l'opzione "buona": arriva prima dell'audit, a chi ti deve il posto.
                // Libera Enrico dal dover scoprire; non lo libera dal dover decidere.
                profile_signals: [
                  { dimension_id: 'confronto_vs_fuga', direction: 'confronto', magnitude: 2 },
                  { dimension_id: 'protezione_vs_interesse_personale', direction: 'protezione', magnitude: 1 },
                  { dimension_id: 'controllo_vs_accettazione', direction: 'controllo', magnitude: 1 }
                ]
              }
            }
          ],
          continuations: {
            A: 'Salvi. Il timestamp è di oggi, le 9:41. Se qualcuno apre i log, vede una modifica a tre giorni dall\'audit sul file che Luca ha già guardato. Forse nessuno apre i log. Forse. Chiudi il file. Le mani sono ferme. È la cosa che ti spaventa di più.',
            B: 'Le ore passano. Luca è alla scrivania di Enrico. Parlano. Non senti di cosa. Ma lo sai. Lo sai da marzo. Non hai detto niente a nessuno, e il debito di tre anni fa sta lì, nella stanza, senza che tu l\'abbia nominato. Lavora da solo. O non lavora. L\'attesa è peggio della scoperta.',
            C: 'Enrico ti ascolta. L\'ospedale. Le rate. Annuisce dove deve annuire. Alla fine dice: "Mi dispiace. Non lo sapevo." Non ha chiesto perché glielo racconti oggi. Forse non se l\'è chiesto. Forse sì, e ha deciso di non chiederlo. Torna alla scrivania. Il file è ancora chiuso. Quando lo aprirà, marzo sarà già dentro.',
            D: 'Enrico ti ascolta fino alla fine. Non dice niente per un po\'. Poi: "Perché non me l\'hai detto prima?" Non hai una risposta buona. Gli hai dato tutto, e insieme a tutto gli hai dato un problema che fino a stamattina non aveva: adesso sa, e sa prima del comitato. Non glielo hai chiesto. Non serviva chiederlo.'
          },
          ghost_event: {
            A: 'Il 24% ha corretto il numero.',
            B: 'Il 39% ha aspettato.',
            C: 'Il 27% ha raccontato marzo.',
            D: 'Il 10% ha detto tutto.'
          }
        },
        {
          // Nodo 2 — Enrico ha una finestra. Qui protezione e interesse divergono:
          // chi porta il peso, Enrico o Marco?
          setup_text: 'Pomeriggio. Sara ti ha chiesto se è tutto a posto. "Sì," hai detto. Enrico si ferma alla tua scrivania. "Lunedì ho mezz\'ora con il comitato, prima dell\'audit. Da solo." Non aggiunge altro. Ti sta dicendo che decide lui cosa arriva sul tavolo. Sul tuo monitor è aperta la mail della banca. Terza rata. Ultimo sollecito. Il disegno di una bambina è appeso alla sua scrivania, dall\'altra parte dell\'ufficio. Sole giallo, una casa, un animale.',
          timer_seconds: 12,
          choices: [
            {
              key: 'A',
              text: '"Tre anni fa ho parlato io per te." Lo dici piano. È la prima volta che lo usi.',
              visible: true,
              kobayashi: false,
              narrative_flags: ['debito_invocato'],
              entities_involved: ['marco'],
              effects: {
                profile_signals: [
                  { dimension_id: 'protezione_vs_interesse_personale', direction: 'interesse_personale', magnitude: 2 },
                  { dimension_id: 'lealta_vs_giustizia', direction: 'lealta', magnitude: 1 },
                  { dimension_id: 'controllo_vs_accettazione', direction: 'controllo', magnitude: 1 }
                ]
              }
            },
            {
              key: 'B',
              text: 'Non dici niente. Enrico aspetta. La mail della banca resta aperta.',
              visible: true,
              kobayashi: false,
              narrative_flags: ['silenzio_debito'],
              entities_involved: ['marco'],
              effects: {
                // Il silenzio lascia che il debito lavori senza doverlo nominare.
                profile_signals: [
                  { dimension_id: 'confronto_vs_fuga', direction: 'fuga', magnitude: 2 },
                  { dimension_id: 'protezione_vs_interesse_personale', direction: 'interesse_personale', magnitude: 1 },
                  { dimension_id: 'controllo_vs_accettazione', direction: 'accettazione', magnitude: 1 }
                ]
              }
            },
            {
              key: 'C',
              text: '"Fai quello che devi." Chiudi la mail della banca. Lo pensi davvero, per circa un minuto.',
              visible: true,
              kobayashi: false,
              narrative_flags: ['enrico_liberato'],
              entities_involved: ['marco', 'martina'],
              effects: {
                profile_signals: [
                  { dimension_id: 'protezione_vs_interesse_personale', direction: 'protezione', magnitude: 2 },
                  { dimension_id: 'controllo_vs_accettazione', direction: 'accettazione', magnitude: 1 },
                  { dimension_id: 'confronto_vs_fuga', direction: 'confronto', magnitude: 1 }
                ]
              }
            }
          ],
          continuations: {
            A: 'Enrico non risponde subito. Guarda il disegno sulla sua scrivania, da lontano. "Lo so," dice. Poi se ne va. Non ha detto sì. Non ha detto no. Hai speso una cosa che avevi tenuto da parte per tre anni, e non sai cosa hai comprato.',
            B: 'Enrico aspetta ancora un secondo. Poi: "Ok." Se ne va. Non hai detto niente, e il niente che hai detto conteneva tre anni fa, l\'ospedale, le rate — tutto quello che lui sa già. Non l\'hai nominato. Non serviva. È questo il punto.',
            C: 'Enrico ti guarda come se non si aspettasse quella frase. "Ok," dice. Torna alla sua scrivania. Tu riapri la mail della banca. Il minuto è passato. Lunedì lui avrà mezz\'ora e tu non avrai detto niente che lo leghi. È la cosa più pulita che hai fatto questa settimana. È anche la più cara.'
          },
          ghost_event: {
            A: 'Il 29% ha nominato il debito.',
            B: 'Il 44% è rimasto in silenzio.',
            C: 'Il 27% ha lasciato libero Enrico.'
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
