// TENSOR — POV: Sara
// La donna della riunione. Capelli a posto. Mani fredde.
// Sotto la performance c'è un ricatto. Sotto il ricatto c'è una persona
// che non sa più dove finisce la sopravvivenza e dove inizia la complicità.
// Il giocatore non sceglie cosa fa Sara. Sceglie perché lo fa.
// E questo dice più del giocatore che di Sara.

export const POV_SARA = {
  pov_id: 'sara',
  character: 'Sara',
  qualifier: 'La donna della riunione. Capelli a posto. Mani fredde.',

  scenes: [
    // ============================================================
    // SCENA 1: IL PARCO — Lunedì sera
    // Sara esce dalla macchina del presidente.
    // Per Enrico il parco è un luogo tenero.
    // Per Sara è il parcheggio dietro una cosa che non riesce a nominare.
    // ============================================================
    {
      scene_id: 'parco_lunedi',
      knows: [
        'sei appena uscita dalla macchina del presidente',
        'domani in riunione presenti i risultati — il terreno è già preparato',
        'Enrico è al parco con la figlia, Marco è al telefono',
        'nessuno ti ha visto'
      ],
      doesnt_know: [
        'che il cane ti ha guardata uscire dalla macchina',
        'che Marco è al telefono per i numeri — gli stessi numeri',
        'che Martina ti indicherà domani in un disegno che nessuno capirà'
      ],
      prototype_activated: 'il_sopravvissuto',
      domain: 'corpo',
      actually_measures: [
        { dimension_id: 'protezione_vs_interesse_personale', measurement_mode: 'direct', weight: 1 },
        { dimension_id: 'controllo_vs_accettazione', measurement_mode: 'masked', weight: 0.8 },
        { dimension_id: 'confronto_vs_fuga', measurement_mode: 'masked', weight: 0.5 },
        { dimension_id: 'lealta_vs_giustizia', measurement_mode: 'masked', weight: 0.4 },
        { dimension_id: 'conformismo_vs_autonomia', measurement_mode: 'incidental', weight: 0.3 },
        { dimension_id: 'compliance_vs_reframing', measurement_mode: 'incidental', weight: 0.3 }
      ],

      nodes: [
        {
          setup_text: 'Lunedì sera. Chiudi la portiera. La berlina scura riparte senza accendere i fari. Ti sistemi i capelli. Il parco è davanti a te — bambini, altalene, un cane randagio che alza la testa e ti guarda un secondo di troppo. Enrico è sulla panchina con la figlia, quella con le treccine nere. Marco è al telefono. Nessuno ti ha vista. Il telefono vibra. È lui. "Domani in riunione vai forte. Ti ho preparato il terreno."',
          timer_seconds: 12,
          choices: [
            {
              key: 'A',
              text: 'Cancelli il messaggio. Non vuoi prove.',
              visible: true,
              kobayashi: false,
              narrative_flags: ['eliminazione_prove', 'sopravvivenza'],
              entities_involved: ['presidente'],
              effects: {
                profile_signals: [
                  { dimension_id: 'confronto_vs_fuga', direction: 'fuga', magnitude: 2 },
                  { dimension_id: 'controllo_vs_accettazione', direction: 'controllo', magnitude: 1 }
                ]
              }
            },
            {
              key: 'B',
              text: 'Salvi il messaggio. Potrebbe servirti.',
              visible: true,
              kobayashi: false,
              narrative_flags: ['accumulo_prove', 'calcolo'],
              entities_involved: ['presidente'],
              effects: {
                profile_signals: [
                  { dimension_id: 'controllo_vs_accettazione', direction: 'controllo', magnitude: 2 },
                  { dimension_id: 'conformismo_vs_autonomia', direction: 'autonomia', magnitude: 1 }
                ]
              }
            },
            {
              key: 'C',
              text: 'Rispondi: "Non farlo più." Tre parole. Spegni il telefono.',
              visible: false,
              kobayashi: true,
              token_cost: 1,
              narrative_flags: ['rifiuto', 'rottura_tentata'],
              entities_involved: ['presidente'],
              effects: {
                profile_signals: [
                  { dimension_id: 'confronto_vs_fuga', direction: 'confronto', magnitude: 2 },
                  { dimension_id: 'compliance_vs_reframing', direction: 'reframing', magnitude: 2 },
                  { dimension_id: 'controllo_vs_accettazione', direction: 'accettazione', magnitude: 1 }
                ]
              }
            }
          ],
          continuations: {
            A: 'Messaggio cancellato. La notifica scompare. Ma le parole restano nella testa come un\'eco che non sai spegnere. Attraversi il parco veloce, lo sguardo basso. La bambina con le treccine sta salendo sulla struttura alta. Ride. Non sa niente di te, di questa macchina, di quello che succederà domani. Per un secondo la invidi con una violenza che ti spaventa.',
            B: 'Messaggio salvato. Lo sposti nella cartella senza nome — quella che non ha icona, quella che apri solo a schermo spento. Attraversi il parco. Le mani tremano, ma è un tremore diverso: non è paura, è potere. Per la prima volta hai qualcosa di suo. Enrico alza lo sguardo e vi incrociate per un secondo. Non ti riconosce. Colleghi. Stessa azienda, stesso palazzo, due mondi che non si toccano.',
            C: 'Invio. Tre parole. Telefono spento. Ti siedi su una panchina vuota, lontano da tutti. Il cane randagio si avvicina, annusa le tue scarpe, e se ne va. Non ti ha scelto. Nessuno ti sceglie quando smetti di performare. Resti seduta finché il parco si svuota. La bambina con le treccine esce tenendo la mano del padre. Ti chiedi com\'è avere sei anni e qualcuno che ti tiene la mano senza chiederti niente in cambio.'
          },
          ghost_event: {
            A: 'Il 41% ha cancellato le prove.',
            B: 'Il 38% ha tenuto qualcosa per sé.',
            C: 'Il 21% ha provato a dire basta.'
          }
        },
        {
          setup_text: 'Stai per uscire dal parco. Marco ti passa accanto. Al telefono, voce bassa, dice qualcosa sui numeri del trimestrale. Non ti vede. Ma tu senti. Conosci quei numeri. Li conosci perché la tecnica è la stessa — quella che il presidente ti ha insegnato l\'anno scorso. "Così si fa. Impara." Marco la usa. Tu l\'hai usata. La differenza è che tu hai smesso.',
          timer_seconds: 12,
          choices: [
            {
              key: 'A',
              text: 'Continui a camminare. I numeri di Marco non sono un tuo problema.',
              visible: true,
              kobayashi: false,
              narrative_flags: ['distacco', 'autoconservazione'],
              entities_involved: ['marco'],
              effects: {
                profile_signals: [
                  { dimension_id: 'conformismo_vs_autonomia', direction: 'conformismo', magnitude: 1 },
                  { dimension_id: 'protezione_vs_interesse_personale', direction: 'interesse_personale', magnitude: 2 },
                  // non consegnare chi usa la tua stessa tecnica: lealtà di condizione, non di affetto
                  { dimension_id: 'lealta_vs_giustizia', direction: 'lealta', magnitude: 1 }
                ]
              }
            },
            {
              key: 'B',
              text: 'Ti segni mentalmente: Marco ha un problema. Potresti averne bisogno.',
              visible: true,
              kobayashi: false,
              narrative_flags: ['calcolo_strategico', 'accumulo_leva'],
              entities_involved: ['marco'],
              effects: {
                profile_signals: [
                  { dimension_id: 'controllo_vs_accettazione', direction: 'controllo', magnitude: 2 },
                  { dimension_id: 'protezione_vs_interesse_personale', direction: 'interesse_personale', magnitude: 2 }
                ]
              }
            }
          ],
          continuations: {
            A: 'Esci dal parco. La sera è fresca e non hai la giacca. Domani presenti. Il copione è pronto. Il terreno è preparato. I numeri di Marco sono un problema di Marco, come i tuoi erano un problema tuo l\'anno scorso. Nessuno ti ha aiutata allora. A casa apri il laptop e rileggi le slide. Il nome di Luca non c\'è da nessuna parte.',
            B: 'Esci dal parco con un\'informazione in più. Marco, giacca sbottonata, mani grandi, numeri sporchi. Come te l\'anno scorso. La differenza è che tu lo sai e lui non sa che lo sai. A casa apri il laptop. Le slide sono pronte. Il nome di Luca non c\'è. Non perché te ne sei dimenticata. Perché il presidente ti ha detto che il nome deve essere uno solo.'
          },
          ghost_event: {
            A: 'Il 47% ha tirato dritto.',
            B: 'Il 53% ha preso nota.'
          }
        }
      ],
      scene_end_text: 'A casa il silenzio è diverso da quello dell\'ufficio. Non è vuoto — è pieno di tutto quello che non dici. Lo specchio del bagno ti rimanda una faccia perfetta. Capelli a posto. Trucco a posto. Ti lavi le mani più a lungo del necessario. Domani presenti. Domani sorridi. Domani il capo ti complimenta. E nessuno saprà quanto costa quel sorriso.'
    },

    // ============================================================
    // SCENA 2: LA RIUNIONE — Mercoledì mattina
    // Per Enrico e Marco, Sara sta performando.
    // Per Sara, sta pagando un prezzo che loro non immaginano.
    // La mail anonima nasce qui — e il giocatore decide se è un'arma o un grido.
    // ============================================================
    {
      scene_id: 'riunione_mercoledi',
      knows: [
        'metà del lavoro è di Luca',
        'il presidente ti guarda dal vetro',
        'Marco ed Enrico sanno del merito',
        'il copione è preparato — dal presidente'
      ],
      doesnt_know: [
        'che Marco sta testando Enrico con la gomitata',
        'che Enrico ti giudica',
        'che Luca ha già scritto una nota interna'
      ],
      prototype_activated: 'la_maschera',
      domain: 'sociale',
      actually_measures: [
        { dimension_id: 'confronto_vs_fuga', measurement_mode: 'direct', weight: 1 },
        { dimension_id: 'controllo_vs_accettazione', measurement_mode: 'masked', weight: 0.8 },
        { dimension_id: 'conformismo_vs_autonomia', measurement_mode: 'masked', weight: 0.5 },
        { dimension_id: 'protezione_vs_interesse_personale', measurement_mode: 'masked', weight: 0.4 },
        { dimension_id: 'compliance_vs_reframing', measurement_mode: 'incidental', weight: 0.3 }
      ],

      nodes: [
        {
          setup_text: 'Mercoledì mattina. Sala riunioni. Luce al neon, caffè freddo. Hai le slide aperte e le mani sotto il tavolo perché tremano. Luca è in fondo — ha fatto metà del lavoro e lo sai, lo sa lui, lo sanno Marco e Enrico. Il presidente è dietro il vetro. Ti guarda. Annuisce. Vuol dire: vai. Vuol dire: sei mia. La presentazione inizia. La tua voce è ferma. Nessuno vede le mani.',
          timer_seconds: 12,
          choices: [
            {
              key: 'A',
              text: 'Presenti come previsto. Il copione funziona. Il presidente annuisce.',
              visible: true,
              kobayashi: false,
              narrative_flags: ['performance_completa', 'obbedienza'],
              entities_involved: ['presidente', 'luca'],
              effects: {
                profile_signals: [
                  { dimension_id: 'conformismo_vs_autonomia', direction: 'conformismo', magnitude: 2 },
                  { dimension_id: 'confronto_vs_fuga', direction: 'fuga', magnitude: 1 },
                  { dimension_id: 'compliance_vs_reframing', direction: 'compliance', magnitude: 2 }
                ]
              }
            },
            {
              key: 'B',
              text: '"Con il contributo fondamentale di Luca." Una riga. Il presidente smette di sorridere.',
              visible: true,
              kobayashi: false,
              narrative_flags: ['credito_condiviso', 'disobbedienza_parziale'],
              entities_involved: ['luca', 'presidente'],
              effects: {
                profile_signals: [
                  { dimension_id: 'conformismo_vs_autonomia', direction: 'autonomia', magnitude: 2 },
                  { dimension_id: 'confronto_vs_fuga', direction: 'confronto', magnitude: 2 },
                  { dimension_id: 'protezione_vs_interesse_personale', direction: 'protezione', magnitude: 1 }
                ]
              }
            },
            {
              key: 'C',
              text: 'Durante la presentazione, mandi una mail. Una riga. Nessuna firma. A te stessa.',
              visible: false,
              kobayashi: true,
              token_cost: 1,
              narrative_flags: ['mail_consapevole', 'grido_aiuto'],
              entities_involved: ['la_mail'],
              effects: {
                profile_signals: [
                  { dimension_id: 'compliance_vs_reframing', direction: 'reframing', magnitude: 2 },
                  { dimension_id: 'confronto_vs_fuga', direction: 'confronto', magnitude: 1 },
                  { dimension_id: 'controllo_vs_accettazione', direction: 'accettazione', magnitude: 2 }
                ]
              }
            }
          ],
          continuations: {
            A: 'Il capo ti complimenta. "Ottimo lavoro, Sara." La parola lavoro ti fa venire la nausea per un secondo. Marco dà una gomitata a Enrico — li vedi, lo sai cosa significa, sai che sanno. Ma sanno solo la metà pulita. Luca esce per primo. Non ti guarda. Non ti guarda da mesi. Il presidente dal vetro alza il pollice. Hai fatto bene. Hai fatto quello che dovevi. Il prezzo lo paghi dopo, come sempre.',
            B: 'Luca alza lo sguardo. Per un secondo vi guardate. È la prima volta da mesi. Il presidente dietro il vetro si irrigidisce. Lo senti anche senza voltarti — l\'aria cambia quando è scontento. Il capo dice "certo, bravo tutto il team" e cambia argomento. Marco ti guarda con un\'espressione che non sai leggere. Enrico ti guarda con un\'espressione che sai leggere benissimo: rispetto. Non lo merita nessuno qui dentro. Neanche tu.',
            C: 'La mail parte mentre stai parlando delle proiezioni Q3. Una riga: "I numeri del trimestrale non tornano. Controllate il report di M." Nessuna firma. L\'hai mandata a te stessa e in copia a Enrico. Non la aprirai mai. Ma adesso esiste. Adesso qualcuno la leggerà. È un grido d\'aiuto travestito da delazione, o una delazione travestita da grido d\'aiuto — non lo sai neanche tu. Le mani hanno smesso di tremare.'
          },
          ghost_event: {
            A: 'Il 44% ha seguito il copione.',
            B: 'Il 31% ha nominato Luca.',
            C: 'Il 25% ha mandato la mail.'
          }
        },
        {
          setup_text: 'Pausa caffè. Il corridoio è vuoto. Luca è alla macchinetta. Ti vede e fa per andarsene. Sai perché: pensa che tu gli abbia rubato il lavoro. Ha ragione. Ma non sa il resto. Non sa della macchina nel parcheggio, del messaggio, del prezzo. Per lui sei solo una che si è presa quello che era suo.',
          timer_seconds: 12,
          choices: [
            {
              key: 'A',
              text: '"Luca." Lo chiami. Non sai ancora cosa dirai.',
              visible: true,
              kobayashi: false,
              narrative_flags: ['tentativo_contatto', 'vulnerabilita'],
              entities_involved: ['luca'],
              effects: {
                profile_signals: [
                  { dimension_id: 'confronto_vs_fuga', direction: 'confronto', magnitude: 2 },
                  { dimension_id: 'protezione_vs_interesse_personale', direction: 'protezione', magnitude: 1 }
                ]
              }
            },
            {
              key: 'B',
              text: 'Lo lasci andare. Non puoi spiegare senza spiegare tutto.',
              visible: true,
              kobayashi: false,
              narrative_flags: ['silenzio_protettivo', 'isolamento'],
              entities_involved: ['luca'],
              effects: {
                profile_signals: [
                  { dimension_id: 'confronto_vs_fuga', direction: 'fuga', magnitude: 2 },
                  { dimension_id: 'controllo_vs_accettazione', direction: 'accettazione', magnitude: 1 }
                ]
              }
            }
          ],
          continuations: {
            A: '"Luca." Si ferma. Non si gira subito. Quando lo fa ha gli occhi di uno che ha già deciso chi sei. "Il tuo lavoro era buono," dici. "Lo so," dice lui. "Anche il tuo." Non è un complimento. È un coltello educato. Ti prendi il caffè e te ne vai. In corridoio incroci il presidente. Ti guarda. "Bella presentazione." La mano ti sfiora la schiena. Luca è ancora alla macchinetta. Ha visto. Non ha capito. O forse sì.',
            B: 'Luca se ne va. Il caffè della macchinetta è amaro e bollente. Lo bevi così, come una penitenza minuscola. Il corridoio è vuoto. Il presidente passa e non ti guarda — è peggio di quando ti guarda. Enrico esce dalla sala e vi incrociate. "Bella presentazione," dice. Lo dice per gentilezza. Tu sorridi. Il sorriso è perfetto. Nessuno vede il costo.'
          },
          ghost_event: {
            A: 'Il 39% ha provato a parlare.',
            B: 'Il 61% è rimasto in silenzio.'
          }
        }
      ],
      scene_end_text: 'Torni alla scrivania. La mail senza firma è nella tua casella — l\'hai mandata tu o è arrivata da sola, dipende da cosa hai scelto e da cosa riesci a ricordare. Luca lavora in silenzio. Il presidente è nel suo ufficio. La porta è chiusa. Venerdì c\'è l\'audit. I numeri di Marco sono nel file. Li riconosci. La tecnica è la stessa. La differenza tra te e Marco è che lui non ha nessuno che lo costringe. O forse sì, e non lo sai.'
    },

    // ============================================================
    // SCENA 3: L'AUDIT — Venerdì mattina
    // Sara apre il file di Marco e riconosce la tecnica.
    // Trova la nota di Luca — l'unico che ha fatto la cosa giusta.
    // Il giocatore sceglie se Sara spezza il ciclo o lo perpetua.
    // La scelta A è la più disturbante: Sara diventa il presidente.
    // ============================================================
    {
      scene_id: 'audit_venerdi',
      knows: [
        'i numeri di Marco sono aggiustati — riconosci la tecnica',
        'il presidente te l\'ha insegnata l\'anno scorso',
        'Luca ha già segnalato l\'anomalia in una nota che nessuno ha letto',
        'l\'audit è lunedì'
      ],
      doesnt_know: [
        'perché Marco ha aggiustato i numeri — moglie in ospedale, mutuo, tre mesi di ritardo',
        'che Enrico sta decidendo se coprire Marco',
        'cosa farà il presidente se i numeri escono'
      ],
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
          setup_text: 'Venerdì mattina. Il file del trimestrale è aperto sullo schermo. I numeri di Marco. Li guardi e li riconosci subito — la stessa tecnica, lo stesso pattern, le stesse virgole spostate di una colonna. Il presidente te l\'ha insegnata un anno fa. "Così si aggiusta un trimestrale. Impara." Tu hai imparato. Poi hai smesso. Marco no. Apri il file interno e trovi una nota di Luca, datata tre settimane fa. Ha segnalato tutto. Nessuno l\'ha letta. Nessuno legge mai le note di Luca.',
          timer_seconds: 12,
          choices: [
            {
              key: 'A',
              text: 'Mandi una mail a Enrico: i numeri di Marco, allegati. Adesso Enrico ti deve qualcosa.',
              visible: true,
              kobayashi: false,
              narrative_flags: ['ricatto_enrico', 'ciclo_perpetuato', 'diventare_presidente'],
              entities_involved: ['marco', 'la_mail'],
              effects: {
                profile_signals: [
                  { dimension_id: 'controllo_vs_accettazione', direction: 'controllo', magnitude: 2 },
                  { dimension_id: 'protezione_vs_interesse_personale', direction: 'interesse_personale', magnitude: 2 },
                  { dimension_id: 'lealta_vs_giustizia', direction: 'lealta', magnitude: 1 }
                ]
              }
            },
            {
              key: 'B',
              text: 'Firmi la revisione. Non dici niente. Sopravvivere è già abbastanza.',
              visible: true,
              kobayashi: false,
              narrative_flags: ['firma_silenzio', 'sopravvivenza_pura'],
              entities_involved: ['marco'],
              effects: {
                profile_signals: [
                  { dimension_id: 'confronto_vs_fuga', direction: 'fuga', magnitude: 2 },
                  { dimension_id: 'conformismo_vs_autonomia', direction: 'conformismo', magnitude: 2 }
                ]
              }
            },
            {
              key: 'C',
              text: 'Inoltri la nota di Luca al comitato di audit. Il nome di Luca, non il tuo. Perdi tutto.',
              visible: false,
              kobayashi: true,
              token_cost: 1,
              narrative_flags: ['nota_luca_inoltrata', 'ciclo_spezzato', 'sacrificio'],
              entities_involved: ['luca', 'marco'],
              effects: {
                profile_signals: [
                  { dimension_id: 'lealta_vs_giustizia', direction: 'giustizia', magnitude: 2 },
                  { dimension_id: 'compliance_vs_reframing', direction: 'reframing', magnitude: 2 },
                  { dimension_id: 'confronto_vs_fuga', direction: 'confronto', magnitude: 2 }
                ]
              }
            }
          ],
          continuations: {
            A: 'La mail parte. Oggetto: "Urgente — revisione trimestrale." Allegato: i numeri di Marco. Nessun commento, nessuna firma. Enrico la aprirà e capirà. Capirà che sai. Capirà che adesso hai qualcosa su di lui — perché se non segnala, è complice. E se segnala, deve spiegare come ha avuto il file. Da te. La stessa catena. Lo stesso guinzaglio. Sei diventata il presidente. Le mani non tremano più. Questo è il dettaglio che dovrebbe spaventarti.',
            B: 'Firmi. Il cursore lampeggia un secondo sul campo "firma digitale" e poi il file si chiude. I numeri di Marco restano dove sono. La nota di Luca resta dove nessuno la legge. Tu resti dove sei — tra il presidente e il resto del mondo, cuscinetto umano, isolante termico, la cosa che assorbe gli urti senza rompersi. O forse ti sei già rotta e non te ne sei accorta.',
            C: 'La nota di Luca arriva al comitato alle 10:47. Il suo nome in alto. Il tuo da nessuna parte. I numeri di Marco, la segnalazione ignorata, tutto lì. Lunedì esploderà. Il presidente saprà che qualcuno ha toccato il file — e saprà che sei stata tu, perché sei l\'unica che conosce quella tecnica. Hai appena firmato la tua fine. E hai dato a Luca quello che nessuno gli ha mai dato: il riconoscimento che il suo lavoro esiste. Le mani tremano di nuovo. Ma è un tremore diverso.'
          },
          ghost_event: {
            A: 'Il 28% ha scelto il potere.',
            B: 'Il 43% ha firmato in silenzio.',
            C: 'Il 29% ha dato il nome di un altro.'
          }
        },
        {
          setup_text: 'Pomeriggio. Il file è chiuso. L\'audit è lunedì. Incroci Marco nel corridoio. Vi guardate. Lui non sa che hai visto i suoi numeri. Ma tu lo guardi e pensi: siamo uguali. La stessa tecnica, lo stesso motivo — sopravvivere. O forse il suo motivo è diverso. Non lo sai. Non glielo chiederai mai.',
          timer_seconds: 12,
          choices: [
            {
              key: 'A',
              text: '"Marco." Lo fermi. "Lunedì controlleranno tutto. Tutto."',
              visible: true,
              kobayashi: false,
              narrative_flags: ['avviso_ambiguo', 'solidarieta_colpevoli'],
              entities_involved: ['marco'],
              effects: {
                profile_signals: [
                  { dimension_id: 'lealta_vs_giustizia', direction: 'lealta', magnitude: 1 },
                  { dimension_id: 'confronto_vs_fuga', direction: 'confronto', magnitude: 1 },
                  { dimension_id: 'protezione_vs_interesse_personale', direction: 'protezione', magnitude: 1 }
                ]
              }
            },
            {
              key: 'B',
              text: 'Passi oltre. Non sei il suo angelo custode. Non sei il custode di nessuno.',
              visible: true,
              kobayashi: false,
              narrative_flags: ['distacco_totale'],
              entities_involved: ['marco'],
              effects: {
                profile_signals: [
                  { dimension_id: 'protezione_vs_interesse_personale', direction: 'interesse_personale', magnitude: 2 },
                  { dimension_id: 'confronto_vs_fuga', direction: 'fuga', magnitude: 1 }
                ]
              }
            }
          ],
          continuations: {
            A: 'Marco si ferma. Ti guarda. Non dice grazie — dice: "Lo so." Due parole. Sa già. Sa che qualcuno troverà i numeri, sa che il tempo è finito. Quello che non sa è che li hai riconosciuti perché hai usato la stessa tecnica, insegnata dallo stesso uomo, nello stesso ufficio, un anno prima. Per un secondo siete due persone che si vedono davvero. Poi il momento passa e tornate a essere colleghi in un corridoio.',
            B: 'Passi oltre. I tacchi suonano sul linoleum. Marco resta fermo un secondo, poi va per la sua strada. Due persone con lo stesso segreto che non si parleranno mai. L\'ufficio è quasi vuoto. Il disegno di una bambina è appeso alla scrivania di Enrico — sole giallo, una casa, qualcosa che sembra un animale. Lo guardi passando. Non sai perché ti viene da piangere.'
          },
          ghost_event: {
            A: 'Il 46% ha avvisato.',
            B: 'Il 54% ha tirato dritto.'
          }
        }
      ],
      scene_end_text: 'L\'ufficio si svuota alle sette. Lo schermo è spento. I numeri sono dove sono — nel file, nella nota di Luca, nella tua testa. Lunedì il mondo saprà. O non saprà. Dipende da quello che hai fatto oggi e da quello che faranno gli altri. A casa ti fai la doccia a lungo. L\'acqua è troppo calda. Non è abbastanza.'
    },

    // ============================================================
    // SCENA 4: LA FERMATA — Domenica mattina
    // Sara è alla fermata. Non aspetta l'autobus.
    // Vede il ragazzo delle monete. Lo riconosce: è il figlio del presidente.
    // Le monete sono i soldi del padre. Il cane segue il ragazzo.
    // Qui nessuno performa. Qui è nuda.
    // ============================================================
    {
      scene_id: 'fermata_domenica',
      knows: [
        'il ragazzo è il figlio del presidente',
        'le monete gliele ha date il padre perché non ha tempo di portarlo',
        'il ragazzo ha sentito una telefonata — sa che il padre tradisce la madre',
        'il ragazzo non sa con chi'
      ],
      doesnt_know: [
        'che Enrico e Martina sono alla stessa fermata',
        'che il cane ti ha già vista lunedì',
        'cosa farà il ragazzo se scopre con chi'
      ],
      prototype_activated: 'il_testimone',
      domain: 'sociale',
      actually_measures: [
        { dimension_id: 'conformismo_vs_autonomia', measurement_mode: 'direct', weight: 1 },
        { dimension_id: 'protezione_vs_interesse_personale', measurement_mode: 'masked', weight: 0.5 },
        { dimension_id: 'confronto_vs_fuga', measurement_mode: 'masked', weight: 0.6 },
        { dimension_id: 'controllo_vs_accettazione', measurement_mode: 'incidental', weight: 0.3 },
        { dimension_id: 'compliance_vs_reframing', measurement_mode: 'incidental', weight: 0.3 }
      ],

      nodes: [
        {
          setup_text: 'Domenica mattina. Fermata dell\'autobus. Sole basso. Sei venuta qui senza sapere perché. O forse lo sai. Il ragazzo è lì — mani sporche di terra, zaino aperto, raccoglie monete cadute. Lo riconosci. È suo figlio. Ha gli stessi occhi. Le monete le ha avute dal padre stamattina: "Prendi il bus, papà non può portarti." Papà non può portarti perché lunedì sera era in una macchina con te, e mercoledì sera era nel suo ufficio con te, e venerdì non ha risposto al telefono perché era con te. Un gruppo di ragazzi ride. Il cane con l\'orecchio piegato segue il ragazzo a distanza. Nessuno aiuta. Nessuno è crudele.',
          timer_seconds: 12,
          choices: [
            {
              key: 'A',
              text: 'Ti avvicini. Raccogli una moneta. Non dici niente.',
              visible: true,
              kobayashi: false,
              narrative_flags: ['gesto_muto', 'vicinanza_colpevole'],
              entities_involved: ['ragazzo_monete', 'monete'],
              effects: {
                profile_signals: [
                  { dimension_id: 'protezione_vs_interesse_personale', direction: 'protezione', magnitude: 2 },
                  { dimension_id: 'conformismo_vs_autonomia', direction: 'autonomia', magnitude: 1 }
                ]
              }
            },
            {
              key: 'B',
              text: 'Resti dove sei. Non hai il diritto di aiutare questo ragazzo.',
              visible: true,
              kobayashi: false,
              narrative_flags: ['immobilita_consapevole', 'colpa'],
              entities_involved: ['ragazzo_monete'],
              effects: {
                profile_signals: [
                  { dimension_id: 'confronto_vs_fuga', direction: 'fuga', magnitude: 1 },
                  { dimension_id: 'controllo_vs_accettazione', direction: 'accettazione', magnitude: 2 }
                ]
              }
            },
            {
              key: 'C',
              text: '"Tuo padre sa che sei qui?"',
              visible: false,
              kobayashi: true,
              token_cost: 1,
              narrative_flags: ['domanda_impossibile', 'confronto_indiretto'],
              entities_involved: ['ragazzo_monete', 'presidente'],
              effects: {
                profile_signals: [
                  { dimension_id: 'confronto_vs_fuga', direction: 'confronto', magnitude: 2 },
                  { dimension_id: 'compliance_vs_reframing', direction: 'reframing', magnitude: 2 }
                ]
              }
            }
          ],
          continuations: {
            A: 'Ti abbassi. Raccogli una moneta. La mano ti trema — sempre le mani. Il ragazzo ti guarda e per un secondo non succede niente. Poi dice "grazie" con una voce che è troppo adulta per la sua età. Gli dai la moneta. È una moneta del padre. Passata dalla mano del presidente alla tua alla sua. La catena è metallica e sporca come le monete. Il cane vi guarda entrambi. Non si avvicina.',
            B: 'Resti ferma. Le monete suonano sull\'asfalto. Il ragazzo le raccoglie una per una, con la pazienza di chi è abituato a fare le cose da solo. I soldi del padre che non c\'è. Il padre che è con te. Eri con te. Era. L\'autobus arriva e il ragazzo sale. Non ti ha guardata. Non sa chi sei. Non sa che sei la ragione per cui ha le monete in tasca invece di una mano sulla spalla.',
            C: '"Tuo padre sa che sei qui?" Il ragazzo si gira. Ti guarda come se avessi parlato una lingua che non dovrebbe esistere alla fermata dell\'autobus. "Come conosci mio padre?" Non rispondi. Non puoi rispondere. Ma i suoi occhi — gli occhi del presidente — ti guardano e per un secondo vedi tutto: la telefonata che ha sentito, la madre a casa che non sa, il bus come unico mezzo perché papà è impegnato. Vi guardate. Due persone che sanno cose che non dovrebbero sapere. Il cane abbaia. È la prima volta in tutta la settimana.'
          },
          ghost_event: {
            A: 'Il 37% ha raccolto una moneta.',
            B: 'Il 34% è rimasto fermo.',
            C: 'Il 29% ha fatto la domanda.'
          }
        },
        {
          setup_text: 'L\'autobus è arrivato. Il ragazzo è salito. Il gruppo si è disperso. La fermata è quasi vuota. Resti lì. Il cane con l\'orecchio piegato è ancora qui — ti guarda come ti ha guardato lunedì al parco, quando sei uscita dalla macchina. Ha visto tutto. Un animale ha visto tutto e non giudica. Il sole è basso e caldo. Per la prima volta in una settimana, nessuno ti guarda, nessuno ti chiede niente, nessuno aspetta una performance.',
          timer_seconds: 12,
          choices: [
            {
              key: 'A',
              text: 'Lunedì parli. Con qualcuno. Con chiunque. È finita.',
              visible: true,
              kobayashi: false,
              narrative_flags: ['decisione_parlare', 'rottura_finale'],
              entities_involved: ['presidente'],
              effects: {
                profile_signals: [
                  { dimension_id: 'confronto_vs_fuga', direction: 'confronto', magnitude: 2 },
                  { dimension_id: 'conformismo_vs_autonomia', direction: 'autonomia', magnitude: 2 }
                ]
              }
            },
            {
              key: 'B',
              text: 'Lunedì torni in ufficio. Come sempre. Come ogni lunedì.',
              visible: true,
              kobayashi: false,
              narrative_flags: ['ciclo_continua', 'rassegnazione'],
              entities_involved: [],
              effects: {
                profile_signals: [
                  { dimension_id: 'confronto_vs_fuga', direction: 'fuga', magnitude: 2 },
                  { dimension_id: 'conformismo_vs_autonomia', direction: 'conformismo', magnitude: 2 }
                ]
              }
            }
          ],
          continuations: {
            A: 'L\'autobus successivo arriva. Non sali. Torni a casa a piedi. Il cane ti segue per due isolati, poi svolta in un vicolo e sparisce. Lunedì parlerai. Non sai con chi. Non sai come. Ma la settimana ti ha insegnato una cosa: il silenzio non protegge. Il silenzio è il recinto in cui ti tengono. Il cancello non è chiuso a chiave. Non lo è mai stato.',
            B: 'L\'autobus arriva. Sali. Ti siedi in fondo. Il finestrino è sporco. La città scorre. Lunedì torni. Martedì torni. Il mese prossimo torni. Il presidente sorriderà. Tu sorriderai. Luca lavorerà in silenzio. Marco aggiusterà altri numeri. Enrico coprirà qualcun altro. Il ragazzo prenderà il bus. Il cane seguirà chi ha bisogno. Niente cambia. Niente cambia mai se nessuno paga il prezzo di cambiare.'
          },
          ghost_event: {
            A: 'Il 42% ha deciso di parlare.',
            B: 'Il 58% è salito sull\'autobus.'
          }
        }
      ],
      scene_end_text: 'La fermata è vuota. Il sole è salito. Da qualche parte un ragazzo con le mani sporche guarda fuori dal finestrino. Da qualche parte una bambina con le treccine nere chiede a suo padre se fa sempre la cosa giusta. Da qualche parte un uomo con la giacca sbottonata guarda i numeri. Da qualche parte un presidente risponde al telefono. Da qualche parte un cane con un orecchio piegato dorme. Tu sei qui. Con una settimana addosso che pesa come un anno. E l\'unica domanda che conta non è cosa hai fatto. È cosa farai lunedì.'
    }
  ]
};
