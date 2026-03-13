// TENSOR — Reveal Templates
// Observational language only. Never diagnostic. Never identity labels.

export const REVEAL_TEMPLATES = {
  // Per-dimension observation templates
  // {count} = times this direction was chosen, {total} = total relevant observations
  // {action} = description of the tendency

  conformismo_vs_autonomia: {
    autonomia: [
      'In {count} situazioni su {total}, hai scelto di agire in modo indipendente dal gruppo.',
      'Quando il gruppo restava fermo, hai scelto di muoverti. {count} volte su {total}.',
      'Hai agito fuori dal consenso del gruppo in {count} occasioni su {total}.'
    ],
    conformismo: [
      'In {count} situazioni su {total}, hai scelto di allinearti a ciò che il contesto rendeva più semplice.',
      'Hai scelto la via più condivisa {count} volte su {total}.',
      'Quando esisteva un\'opzione di gruppo, l\'hai seguita {count} volte su {total}.'
    ]
  },

  protezione_vs_interesse_personale: {
    protezione: [
      'Quando qualcuno aveva bisogno, hai scelto di avvicinarti {count} volte su {total}.',
      'Hai messo qualcun altro davanti a te in {count} situazioni su {total}.',
      'In {count} occasioni su {total}, hai scelto la prossimità invece della distanza.'
    ],
    interesse_personale: [
      'In {count} situazioni su {total}, hai mantenuto la tua posizione.',
      'Hai scelto di preservare il tuo spazio {count} volte su {total}.',
      'Quando la protezione aveva un costo, hai scelto di non pagarlo {count} volte su {total}.'
    ]
  },

  lealta_vs_giustizia: {
    lealta: [
      'Quando le regole e le persone confliggevano, hai scelto le persone {count} volte su {total}.',
      'Il debito personale ha pesato più della norma in {count} situazioni su {total}.',
      'In {count} occasioni su {total}, hai protetto chi conoscevi sopra il principio.'
    ],
    giustizia: [
      'Hai scelto la regola sopra la relazione in {count} situazioni su {total}.',
      'Quando il debito personale e la norma confliggevano, hai scelto la norma {count} volte su {total}.',
      'In {count} occasioni su {total}, il principio ha contato più della persona.'
    ]
  },

  confronto_vs_fuga: {
    confronto: [
      'Di fronte al conflitto, hai scelto di restare {count} volte su {total}.',
      'Hai affrontato la situazione direttamente in {count} occasioni su {total}.',
      'Non ti sei tirato indietro {count} volte su {total}.'
    ],
    fuga: [
      'In {count} situazioni su {total}, hai scelto di evitare il confronto diretto.',
      'Hai scelto la distanza dal conflitto {count} volte su {total}.',
      'Quando la tensione saliva, hai scelto di non alimentarla {count} volte su {total}.'
    ]
  },

  controllo_vs_accettazione: {
    controllo: [
      'Quando qualcuno dipendeva da te, hai scelto di gestire la situazione {count} volte su {total}.',
      'Hai mantenuto il controllo in {count} situazioni su {total} in cui potevi lasciare andare.',
      'In {count} occasioni su {total}, hai scelto di intervenire su ciò che poteva evolvere da solo.'
    ],
    accettazione: [
      'Hai lasciato spazio a ciò che non potevi controllare {count} volte su {total}.',
      'In {count} situazioni su {total}, hai accettato l\'incertezza invece di gestirla.',
      'Hai scelto di osservare invece di agire in {count} occasioni su {total}.'
    ]
  },

  compliance_vs_reframing: {
    reframing: [
      'Hai rifiutato le opzioni proposte {count} volte su {total}. Cercavi una terza strada.',
      'In {count} occasioni su {total}, hai cambiato le regole invece di seguirle.',
      'Non hai accettato il binario imposto {count} volte su {total}.'
    ],
    compliance: [
      'Hai scelto tra le opzioni proposte {count} volte su {total}.',
      'In {count} situazioni su {total}, hai operato dentro la cornice data.'
    ]
  },

  // Generic early-game templates (few observations)
  early: [
    'Il gioco osserva. Non ha ancora abbastanza per dirti qualcosa di vero.',
    'Una scelta non è un pattern. Il sistema aspetta.',
    'Troppo presto per un\'osservazione. Ma il gioco ricorda.'
  ],

  // Contradiction templates (for when opposite tendencies emerge)
  contradiction: [
    'In alcune situazioni hai scelto {action_a}. In altre, {action_b}. Non è incoerenza — è complessità.',
    'Il gioco ha notato una tensione: {action_a} e {action_b} coesistono nelle tue scelte.',
    'Le tue scelte non vanno in una direzione sola. {action_a}, ma anche {action_b}. Il gioco non sa quale sia più vera.'
  ]
};
