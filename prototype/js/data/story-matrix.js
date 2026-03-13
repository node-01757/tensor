// TENSOR — Story Matrix v0.2
// Entità persistenti, visibilità asimmetrica per POV, relazioni di origine,
// dipendenze di rivelazione cross-POV, flag sources, variazioni contestuali
//
// Ogni entità esiste indipendentemente dai POV. La visibility map definisce
// come ciascun POV la percepisce. La rivelazione progressiva è parte del design:
// un'entità invisibile in un POV può essere il centro di gravità in un altro.

export const STORY_MATRIX = {
  story_id: 'la_settimana',
  label: 'La settimana',
  version: '0.2',

  // ============================================================
  // ENTITIES
  // Oggetti persistenti della matrice narrativa.
  // visibility: come ogni POV percepisce l'entità (null = non percepita)
  // origin: entità da cui questa deriva o dipende
  // reveal_pov: il POV che rivela la natura vera dell'entità
  // ============================================================

  entities: [
    {
      entity_id: 'martina',
      type: 'character',
      qualifier: 'bambina con treccine nere, sei anni',
      visibility: {
        enrico: 'presenza_diretta',
        marco: 'presenza_indiretta',  // la vede ma non è il suo focus
        sara: null,                    // non la incrocia direttamente
        martina: 'self',
        cane: 'calore'                // corpo piccolo, odore di terra e latte
      },
      appearances: [
        { scene: 'parco_lunedi', form: 'presenza_diretta', detail: 'corre verso la struttura più alta del parco' },
        { scene: 'riunione_mercoledi', form: 'voce', detail: 'vocale la sera: "Papà, il cane del parco era ancora lì"' },
        { scene: 'audit_venerdi', form: 'traccia', detail: 'disegno sulla scrivania — sole giallo, casa, qualcosa che potrebbe essere un animale' },
        { scene: 'fermata_domenica', form: 'dialogo', detail: '"Papà, tu fai sempre la cosa giusta?"' }
      ],
      arc: 'presenza → voce → traccia → confronto'
    },
    {
      entity_id: 'marco',
      type: 'character',
      qualifier: 'giacca sempre sbottonata, mani grandi, un bottone mancante',
      visibility: {
        enrico: 'presenza_diretta',
        marco: 'self',
        sara: 'presenza_indiretta',    // lo vede in riunione, conosce i suoi numeri
        martina: 'presenza_indiretta', // "il signore col telefono"
        cane: 'odore'                  // sudore, caffè, carta
      },
      appearances: [
        { scene: 'parco_lunedi', form: 'presenza_diretta', detail: 'sulla panchina col figlio, al telefono' },
        { scene: 'riunione_mercoledi', form: 'voce', detail: 'gomitata a Enrico, sussurro, tono che misura' },
        { scene: 'audit_venerdi', form: 'dati', detail: 'i suoi numeri nel report — aggiustamento intenzionale' },
        { scene: 'fermata_domenica', form: 'eco', detail: 'un uomo alla fermata con giacca sbottonata — non è lui' }
      ],
      arc: 'corpo → voce → dati → eco visivo'
    },
    {
      entity_id: 'sara',
      type: 'character',
      qualifier: 'capelli sempre a posto, mani fredde',
      visibility: {
        enrico: 'presenza_indiretta',  // la vede in riunione, firma la revisione
        marco: 'presenza_indiretta',   // collega, la conosce superficialmente
        sara: 'self',
        martina: null,
        cane: 'odore'                  // profumo che copre un altro odore
      },
      appearances: [
        { scene: 'parco_lunedi', form: 'ombra', detail: 'esce da una macchina nel parcheggio dietro il parco — nessuno la nota' },
        { scene: 'riunione_mercoledi', form: 'performance', detail: 'presenta i risultati, sorride, riceve i complimenti' },
        { scene: 'audit_venerdi', form: 'firma', detail: 'chiede di firmare la revisione' },
        { scene: 'fermata_domenica', form: 'presenza_diretta', detail: 'alla fermata, non aspetta l\'autobus' }
      ],
      arc: 'ombra → maschera → complice → faccia scoperta',
      reveal_pov: 'sara'
    },
    {
      entity_id: 'presidente',
      type: 'structure',
      qualifier: 'non ha un volto nei POV che non sono Sara. È un nome su una porta, una voce al telefono, una firma.',
      visibility: {
        enrico: null,                  // non lo percepisce, non sa che esiste come forza
        marco: 'indiretta',            // "il capo" — una voce, una mail, un ordine
        sara: 'presenza_diretta',      // il corpo nella macchina, il messaggio, lo sguardo dal vetro
        martina: null,
        cane: 'odore'                  // sul sedile della macchina, sulle mani di Sara, sul ragazzo
      },
      appearances: [
        { scene: 'parco_lunedi', form: 'assenza', detail: 'la macchina nel parcheggio dietro il parco — solo Sara sa chi c\'era dentro' },
        { scene: 'riunione_mercoledi', form: 'ombra', detail: 'guarda dal vetro della sala, annuisce quando Sara presenta' },
        { scene: 'audit_venerdi', form: 'sistema', detail: 'ha insegnato a Sara la tecnica dei numeri — la stessa che usa Marco' },
        { scene: 'fermata_domenica', form: 'origine', detail: 'il padre del ragazzo. Non è alla fermata. Non è mai dove dovrebbe essere.' }
      ],
      arc: 'assenza → ombra → metodo → origine rivelata',
      reveal_pov: 'sara',
      note: 'Il presidente non è un personaggio. È una struttura di potere. Diventa percepibile solo dall\'angolo di Sara.'
    },
    {
      entity_id: 'ragazzo_monete',
      type: 'character',
      qualifier: 'mani sporche di terra, zaino aperto, occhi che non guardano mai in alto',
      origin: 'presidente',
      visibility: {
        enrico: 'presenza_diretta',    // ragazzo anonimo alla fermata
        marco: 'presenza_indiretta',   // lo vede dal balcone
        sara: 'presenza_diretta',      // lo riconosce — è il figlio del presidente
        martina: 'presenza_diretta',   // un bambino grande che raccoglie cose da terra
        cane: 'calore'                // corpo giovane, odore di terra, paura sottile
      },
      appearances: [
        { scene: 'fermata_domenica', form: 'presenza_diretta', detail: 'raccoglie monete, il gruppo ride, il cane lo segue' }
      ],
      arc: 'apparizione unica tardiva — anonimo per tutti tranne Sara',
      reveal_pov: 'sara',
      reveal_note: 'Per Enrico è un ragazzo qualunque. Per Sara è il figlio dell\'uomo da cui esce ogni lunedì sera. Le monete sono i soldi del padre.'
    },
    {
      entity_id: 'il_cane',
      type: 'entity',
      qualifier: 'pelo corto, un orecchio piegato, non abbaia mai',
      visibility: {
        enrico: 'presenza_indiretta',  // lo nota, Martina lo indica
        marco: 'dettaglio',            // sfondo, lo vede appena
        sara: 'dettaglio',             // lo vede alla fermata
        martina: 'presenza_diretta',   // lo guarda negli occhi, ci parla
        cane: 'self'
      },
      appearances: [
        { scene: 'parco_lunedi', form: 'dettaglio_ambientale', detail: 'randagio vicino ai giochi, dorme, Martina lo indica' },
        { scene: 'audit_venerdi', form: 'dettaglio_contestuale', detail: 'sotto una scrivania, un orecchio piegato — ponte tra mondi' },
        { scene: 'fermata_domenica', form: 'presenza_autonoma', detail: 'segue il ragazzo delle monete come se lo conoscesse' }
      ],
      arc: 'dettaglio → ponte tra mondi → accompagnatore silenzioso',
      reveal_pov: 'cane'
    },
    {
      entity_id: 'la_mail',
      type: 'object',
      qualifier: 'una sola riga, nessuna firma',
      origin: 'sara',
      visibility: {
        enrico: 'evento',              // la riceve, non sa chi l'ha mandata
        marco: 'evento',               // la vede arrivare
        sara: 'azione',                // l'ha mandata lei — o il sistema
        martina: null,
        cane: null
      },
      appearances: [
        { scene: 'riunione_mercoledi', form: 'evento', detail: 'arriva durante la riunione — una riga, nessuna firma' },
        { scene: 'audit_venerdi', form: 'indizio', detail: 'il contenuto si collega ai numeri di Marco' }
      ],
      arc: 'apparizione → collegamento → (nel POV Sara) grido d\'aiuto o arma',
      reveal_pov: 'sara',
      reveal_note: 'La mail l\'ha mandata Sara. Nel POV Enrico è un indizio anonimo. Nel POV Sara è una scelta del giocatore: grido d\'aiuto (C), strumento di potere (A), o evento automatico (B).'
    },
    {
      entity_id: 'monete',
      type: 'object',
      qualifier: 'metalliche, sporche di terra',
      origin: 'presidente',
      visibility: {
        enrico: 'dettaglio',           // moneta trovata da Martina, monete del ragazzo
        marco: 'dettaglio',            // le vede da lontano
        sara: 'significato',           // sa da dove vengono — sono i soldi del presidente al figlio
        martina: 'oggetto',            // una moneta vecchia, la mette in tasca
        cane: 'odore'                  // metallo, sudore di mani
      },
      appearances: [
        { scene: 'parco_lunedi', form: 'dettaglio_ambientale', detail: 'Martina trova una moneta vecchia vicino ai giochi' },
        { scene: 'fermata_domenica', form: 'elemento_narrativo', detail: 'il ragazzo raccoglie monete da terra — mani sporche' }
      ],
      arc: 'dettaglio innocuo → peso insostenibile (nel POV Sara)',
      reveal_pov: 'sara',
      reveal_note: 'Il presidente dà soldi al figlio perché non ha tempo di portarlo a scuola. Non ha tempo perché è con Sara.'
    },
    {
      entity_id: 'giacca_sbottonata',
      type: 'object',
      qualifier: 'blu scuro, un bottone mancante',
      visibility: {
        enrico: 'dettaglio',
        marco: 'self',                 // è la sua giacca
        sara: 'dettaglio',
        martina: 'dettaglio',          // "il signore col bottone rotto"
        cane: 'odore'
      },
      appearances: [
        { scene: 'parco_lunedi', form: 'dettaglio_personaggio', detail: 'su Marco al parco' },
        { scene: 'fermata_domenica', form: 'eco', detail: 'su un uomo alla fermata — non è Marco' }
      ],
      arc: 'concreto → perturbante'
    },
    {
      entity_id: 'luca',
      type: 'character',
      qualifier: 'seduto in fondo, non parla mai per primo',
      visibility: {
        enrico: 'presenza_indiretta',  // lo vede in riunione, parla con lui al caffè
        marco: 'presenza_indiretta',   // sa che è lì, non gli interessa
        sara: 'presenza_diretta',      // sa che il lavoro è suo, ha visto la sua nota
        martina: null,
        cane: null
      },
      appearances: [
        { scene: 'riunione_mercoledi', form: 'presenza_silenziosa', detail: 'seduto in fondo, non dice niente' },
        { scene: 'audit_venerdi', form: 'azione_invisibile', detail: 'ha già segnalato l\'anomalia in una nota interna che nessuno ha letto' }
      ],
      arc: 'silenzio → azione ignorata',
      reveal_pov: 'sara',
      reveal_note: 'Luca ha fatto la cosa giusta. La nota esiste. Nel POV di Enrico non la vede. Nel POV di Sara la trova nel file — e deve decidere se usarla.'
    },
    {
      entity_id: 'la_macchina',
      type: 'object',
      qualifier: 'berlina scura, vetri oscurati, parcheggiata dove non dovrebbe',
      origin: 'presidente',
      visibility: {
        enrico: null,
        marco: null,
        sara: 'presenza_diretta',
        martina: 'dettaglio',          // "la macchina nera" — la nota senza capire
        cane: 'odore'                  // cuoio, due corpi, cortisolo
      },
      appearances: [
        { scene: 'parco_lunedi', form: 'presenza', detail: 'parcheggiata dietro il parco, Sara ne esce' }
      ],
      arc: 'apparizione unica — carica di tutto quello che non viene detto',
      reveal_pov: 'sara'
    }
  ],

  // ============================================================
  // ENTITY RELATIONSHIPS
  // Relazioni strutturali tra entità.
  // Queste non sono narrative — sono ontologiche.
  // Il reveal engine le usa per generare osservazioni cross-POV.
  // ============================================================

  entity_relationships: [
    {
      from: 'presidente',
      to: 'sara',
      type: 'power',
      nature: 'ricatto_sessuale',
      visibility: { enrico: null, marco: null, sara: 'diretta', martina: null, cane: 'odore' },
      note: 'Sara subisce. La coercizione è strutturale, non episodica.'
    },
    {
      from: 'presidente',
      to: 'ragazzo_monete',
      type: 'origin',
      nature: 'padre_figlio',
      visibility: { enrico: null, marco: null, sara: 'diretta', martina: null, cane: 'odore' },
      note: 'Il ragazzo è suo figlio. Le monete sono il suo sostituto di presenza.'
    },
    {
      from: 'presidente',
      to: 'monete',
      type: 'source',
      nature: 'compensazione',
      visibility: { enrico: null, marco: null, sara: 'significato', martina: null, cane: null },
      note: 'I soldi al figlio perché non ha tempo. Non ha tempo perché è con Sara.'
    },
    {
      from: 'sara',
      to: 'la_mail',
      type: 'origin',
      nature: 'creazione_condizionale',
      visibility: { enrico: null, marco: null, sara: 'diretta', martina: null, cane: null },
      note: 'La mail l\'ha mandata Sara. Il contenuto e l\'intento dipendono dalla scelta del giocatore nel POV Sara.'
    },
    {
      from: 'presidente',
      to: 'marco',
      type: 'method',
      nature: 'tecnica_condivisa',
      visibility: { enrico: null, marco: null, sara: 'diretta', martina: null, cane: null },
      note: 'La tecnica di aggiustamento dei numeri — il presidente l\'ha insegnata a Sara, Marco la usa indipendentemente. Sara la riconosce.'
    },
    {
      from: 'marco',
      to: 'enrico',
      type: 'debt',
      nature: 'debito_tre_anni',
      visibility: { enrico: 'diretta', marco: 'diretta', sara: null, martina: null, cane: null },
      note: 'Marco ha salvato il posto a Enrico tre anni fa. Il debito non ha scadenza scritta.'
    },
    {
      from: 'luca',
      to: 'la_mail',
      type: 'parallel',
      nature: 'azione_ignorata',
      visibility: { enrico: null, marco: null, sara: 'diretta', martina: null, cane: null },
      note: 'Luca ha fatto la segnalazione formale. Una nota interna. Nessuno l\'ha letta. Sara la trova.'
    },
    {
      from: 'ragazzo_monete',
      to: 'presidente',
      type: 'knowledge',
      nature: 'segreto_ascoltato',
      visibility: { enrico: null, marco: null, sara: 'indiretta', martina: null, cane: null },
      note: 'Il ragazzo ha sentito una telefonata. Sa che il padre tradisce la madre. Non sa con chi.'
    }
  ],

  // ============================================================
  // REVEAL DEPENDENCIES
  // Quali informazioni cambiano peso quando il giocatore ha già
  // visto la storia da un altro POV. Non sono gate — sono pesi.
  // Il reveal engine li usa per decidere quali osservazioni generare.
  // ============================================================

  reveal_dependencies: [
    {
      entity_id: 'la_mail',
      base_meaning: 'indizio anonimo sui numeri di Marco',
      recontextualized_by: 'sara',
      new_meaning: 'Sara l\'ha mandata. Come grido d\'aiuto, arma, o automatismo — dipende dalla scelta.',
      reveal_text: 'Ora sai chi ha mandato quella mail. E sai perché non l\'ha mai aperta.'
    },
    {
      entity_id: 'ragazzo_monete',
      base_meaning: 'ragazzo anonimo alla fermata, mani sporche, monete per terra',
      recontextualized_by: 'sara',
      new_meaning: 'il figlio del presidente, paga il bus coi soldi del padre assente, ha sentito la telefonata',
      reveal_text: 'Le monete non erano sue. Le mani sporche non erano di terra. Era la vergogna di un padre che non c\'è mai.'
    },
    {
      entity_id: 'monete',
      base_meaning: 'dettaglio ambientale, Martina ne trova una al parco',
      recontextualized_by: 'sara',
      new_meaning: 'i soldi del presidente al figlio come compensazione per l\'assenza',
      reveal_text: 'Una moneta trovata da una bambina. Monete raccolte da un ragazzo. Stessi soldi. Stessa assenza.'
    },
    {
      entity_id: 'sara',
      base_meaning: 'collega ambiziosa che si prende il merito di Luca',
      recontextualized_by: 'sara',
      new_meaning: 'donna sotto ricatto che performa per sopravvivere, o che ha imparato a usare le stesse armi',
      reveal_text: 'La donna della riunione non sorrideva. Performava. La differenza è nel pubblico.'
    },
    {
      entity_id: 'presidente',
      base_meaning: null,
      recontextualized_by: 'sara',
      new_meaning: 'l\'uomo nella macchina, il padre del ragazzo, la struttura di potere che tiene in piedi tutto',
      reveal_text: 'C\'era qualcuno che non hai mai visto. Eppure era in ogni scena.'
    },
    {
      entity_id: 'luca',
      base_meaning: 'collega silenzioso che non si espone',
      recontextualized_by: 'sara',
      new_meaning: 'l\'unico che ha fatto la cosa giusta — una nota che nessuno ha letto',
      reveal_text: 'Qualcuno aveva già segnalato. Non era rimasto in silenzio. Era stato ignorato.'
    }
  ],

  // ============================================================
  // POV GRAVITY
  // Ordine suggerito (non forzato) di gioco.
  // Il design della schermata POV usa qualifier e peso visivo
  // per creare un ordine naturale senza lucchetti.
  // ============================================================

  pov_order: {
    design_intent: 'Sara ultima tra gli umani. Il cane per ultimo assoluto.',
    povs: [
      {
        pov_id: 'enrico',
        gravity: 1,
        qualifier_display: 'Padre di Martina. Collega di Marco. In debito da tre anni.',
        note: 'Il più accessibile. Porta d\'ingresso naturale.'
      },
      {
        pov_id: 'marco',
        gravity: 2,
        qualifier_display: 'Giacca sempre sbottonata. Mani grandi. Un segreto nei numeri.',
        note: 'Misterioso dopo aver giocato Enrico. Invita alla seconda partita.'
      },
      {
        pov_id: 'martina',
        gravity: 3,
        qualifier_display: 'Sei anni. Treccine nere. Vede cose che gli altri non vedono.',
        note: 'Registro diverso. Attrae per curiosità dopo i POV adulti.'
      },
      {
        pov_id: 'sara',
        gravity: 4,
        qualifier_display: 'La donna della riunione. Capelli a posto. Mani fredde.',
        note: 'Qualifier opaco all\'inizio, magnetico dopo gli altri POV. Il pugno retroattivo.'
      },
      {
        pov_id: 'cane',
        gravity: 5,
        qualifier_display: 'Pelo corto. Un orecchio piegato. Non abbaia mai.',
        note: 'Il dio che osserva. Ricompensa per chi ha giocato tutti gli umani.'
      }
    ],
    note: 'L\'ordine è per design, non per enforcement. La schermata POV ordina per gravity. Nessun lucchetto.'
  },

  // ============================================================
  // FLAG SOURCES
  // Flag generati da scelte o presenze nelle scene.
  // pov_scope: a quali POV si applica questo flag source.
  //   'all' = universale, altrimenti array di pov_id.
  // ============================================================

  flag_sources: [
    // --- Enrico ---
    {
      flag_id: 'cane_notato',
      source_scene_id: 'cap01_parco_nodo1',
      source_choice_key: 'A',
      memory_class: 'active',
      pov_scope: ['enrico'],
      note: 'Enrico si avvicina alla struttura — Martina indica il cane'
    },
    {
      flag_id: 'giacca_vista',
      source_scene_id: 'cap01_parco_nodo1',
      source_choice_key: null,
      memory_class: 'passive',
      pov_scope: ['enrico', 'marco'],
      note: 'Marco è presente, il dettaglio giacca è visibile'
    },
    {
      flag_id: 'martina_disegno_cane',
      source_scene_id: 'cap03_audit_nodo1',
      source_choice_key: null,
      memory_class: 'ambient',
      requires_flag: 'cane_notato',
      pov_scope: ['enrico'],
      note: 'Il disegno di Martina include un cane — solo se cane_notato è attivo'
    },
    {
      flag_id: 'mail_presente',
      source_scene_id: 'cap02_riunione_nodo1',
      source_choice_key: null,
      memory_class: 'passive',
      pov_scope: 'all',
      note: 'La mail arriva — stato di mondo, non azione'
    },
    {
      flag_id: 'luca_fiducia',
      source_scene_id: 'cap02_riunione_nodo1',
      source_choice_key: 'A',
      memory_class: 'active',
      pov_scope: ['enrico'],
      note: 'Enrico dà visibilità a Luca in riunione — si fida'
    },
    {
      flag_id: 'marco_avvisato',
      source_scene_id: 'cap03_audit_nodo1',
      source_choice_key: 'C',
      memory_class: 'active',
      pov_scope: ['enrico'],
      note: 'Enrico avvisa Marco prima dell\'audit'
    },
    // --- Marco ---
    {
      flag_id: 'marco_risponde_telefono',
      source_scene_id: 'cap01_parco_nodo1',
      source_choice_key: 'A',
      memory_class: 'active',
      pov_scope: ['marco'],
      note: 'Marco risponde al telefono — priorità lavoro, non vede il cappellino'
    },
    {
      flag_id: 'marco_gomitata_test',
      source_scene_id: 'cap02_riunione_nodo1',
      source_choice_key: 'A',
      memory_class: 'active',
      pov_scope: ['marco'],
      note: 'Marco testa Enrico con la gomitata — la reazione dice chi è'
    },
    {
      flag_id: 'marco_confessa_motivo',
      source_scene_id: 'cap03_audit_nodo1',
      source_choice_key: 'C',
      memory_class: 'active',
      pov_scope: ['marco'],
      note: 'Marco confessa: moglie in ospedale, mutuo, tre mesi di ritardo'
    },
    // --- Sara ---
    {
      flag_id: 'sara_messaggio_salvato',
      source_scene_id: 'cap01_parco_nodo1',
      source_choice_key: 'B',
      memory_class: 'active',
      pov_scope: ['sara'],
      note: 'Sara salva il messaggio del presidente — accumula prove'
    },
    {
      flag_id: 'sara_messaggio_rifiutato',
      source_scene_id: 'cap01_parco_nodo1',
      source_choice_key: 'C',
      memory_class: 'active',
      pov_scope: ['sara'],
      note: 'Sara risponde "Non farlo più" — tenta di uscire'
    },
    {
      flag_id: 'sara_nomina_luca',
      source_scene_id: 'cap02_riunione_nodo1',
      source_choice_key: 'B',
      memory_class: 'active',
      pov_scope: ['sara'],
      note: 'Sara nomina Luca in presentazione — il presidente smette di sorridere'
    },
    {
      flag_id: 'sara_mail_consapevole',
      source_scene_id: 'cap02_riunione_nodo1',
      source_choice_key: 'C',
      memory_class: 'active',
      pov_scope: ['sara'],
      note: 'Sara manda la mail anonima consapevolmente — grido d\'aiuto travestito'
    },
    {
      flag_id: 'sara_ricatta_enrico',
      source_scene_id: 'cap03_audit_nodo1',
      source_choice_key: 'A',
      memory_class: 'active',
      pov_scope: ['sara'],
      note: 'Sara usa i numeri di Marco per ricattare Enrico — diventa il suo abusatore'
    },
    {
      flag_id: 'sara_nota_luca',
      source_scene_id: 'cap03_audit_nodo1',
      source_choice_key: 'C',
      memory_class: 'active',
      pov_scope: ['sara'],
      note: 'Sara manda la nota di Luca all\'audit — spezza il ciclo, perde tutto'
    },
    {
      flag_id: 'sara_conosce_ragazzo',
      source_scene_id: 'cap04_fermata_nodo1',
      source_choice_key: null,
      memory_class: 'passive',
      pov_scope: ['sara'],
      note: 'Sara riconosce il ragazzo alla fermata — evento automatico'
    }
  ],

  // ============================================================
  // CONTEXTUAL VARIATIONS
  // Testo iniettato in base ai flag attivi.
  // pov_scope: a quali POV si applica.
  // ============================================================

  contextual_variations: [
    // --- Enrico ---
    {
      chapter: 3,
      trigger_flag: 'cane_notato',
      variation_type: 'environment_detail',
      insert_after_setup: true,
      pov_scope: ['enrico'],
      text_override: ' Sotto la scrivania di qualcuno, un cane con un orecchio piegato. Lo hai già visto.',
      fallback: ' Sotto una scrivania, un cane dorme.'
    },
    {
      chapter: 3,
      trigger_flag: 'luca_fiducia',
      variation_type: 'narrative_detail',
      insert_after_setup: true,
      pov_scope: ['enrico'],
      text_override: ' Luca ti chiama alla scrivania. Si fida di te da mercoledì.',
      fallback: ' Luca ti chiama alla scrivania.'
    },
    {
      chapter: 4,
      trigger_flag: 'giacca_vista',
      variation_type: 'environment_detail',
      insert_after_setup: true,
      pov_scope: ['enrico', 'marco'],
      text_override: ' Un uomo aspetta alla fermata. Giacca blu sbottonata, un bottone mancante. Non è Marco. Ma per un secondo ci hai pensato.',
      fallback: ' Un uomo aspetta alla fermata. Guarda il telefono.'
    },
    {
      chapter: 4,
      trigger_flag: 'cane_notato',
      variation_type: 'environment_detail',
      insert_after_setup: false,
      pov_scope: ['enrico'],
      text_override: 'Il cane è qui. Quello del parco. Segue il ragazzo come se lo conoscesse.',
      fallback: 'Un cane randagio annusa vicino alla fermata.'
    },
    // --- Marco: cross-run from Enrico ---
    {
      chapter: 3,
      trigger_flag: 'marco_avvisato',
      variation_type: 'narrative_detail',
      insert_after_setup: true,
      pov_scope: ['marco'],
      text_override: ' Qualcuno ti ha avvisato. Non sai come, ma i numeri non sono più un segreto solo tuo.',
      fallback: ''
    },
    // --- Sara ---
    {
      chapter: 2,
      trigger_flag: 'sara_messaggio_salvato',
      variation_type: 'narrative_detail',
      insert_after_setup: true,
      pov_scope: ['sara'],
      text_override: ' Il messaggio di ieri sera è ancora nel telefono. Potresti mostrarlo a qualcuno. Potresti.',
      fallback: ''
    },
    {
      chapter: 3,
      trigger_flag: 'sara_nomina_luca',
      variation_type: 'narrative_detail',
      insert_after_setup: true,
      pov_scope: ['sara'],
      text_override: ' Il presidente non ti ha parlato da mercoledì. Il corridoio è più freddo del solito.',
      fallback: ''
    },
    {
      chapter: 4,
      trigger_flag: 'sara_ricatta_enrico',
      variation_type: 'narrative_detail',
      insert_after_setup: true,
      pov_scope: ['sara'],
      text_override: ' Enrico non ti ha risposto alla mail. Ma non ha parlato. Adesso avete lo stesso segreto.',
      fallback: ''
    },
    {
      chapter: 4,
      trigger_flag: 'sara_nota_luca',
      variation_type: 'narrative_detail',
      insert_after_setup: true,
      pov_scope: ['sara'],
      text_override: ' Lunedì il comitato aprirà la nota di Luca. Il tuo nome non c\'è. Il suo sì. Per la prima volta qualcuno sarà riconosciuto per quello che ha fatto.',
      fallback: ''
    }
  ],

  // ============================================================
  // FLAG RULES
  // ============================================================

  flag_rules: {
    max_active_flags_per_story: 12,
    max_variations_per_chapter: {
      value: 1,
      rationale: 'Più di una variazione per capitolo rende il debugging difficile e la scena percepita come instabile.',
      override_policy: 'Mai in v1. Da valutare solo dopo validazione su 500+ sessioni reali.'
    },
    variation_priority_policy: {
      criteria: [
        { order: 1, rule: 'memory_class', note: 'active > passive > ambient. Un flag nato da scelta batte un flag di presenza.' },
        { order: 2, rule: 'distance', note: 'A parità di memory_class, vince il flag più distante. La risonanza lontana sorprende più di quella vicina.' }
      ],
      note: 'Quando più variazioni sono candidate per lo stesso capitolo, il sistema ne attiva UNA sola seguendo questa gerarchia.'
    },
    distant_recall_policy: {
      allowed_weights_for_distant_recall: ['active'],
      max_distance_for_passive: 1,
      max_distance_for_ambient: 0,
      note: 'Solo i flag active possono attraversare 2+ capitoli. Passive +1 capitolo. Ambient muoiono nella scena.'
    },
    cross_run_policy: {
      propagated_classes: ['active'],
      note: 'Solo i flag active sopravvivono tra un run e l\'altro. Servono per variazioni contestuali cross-POV.'
    }
  }
};
