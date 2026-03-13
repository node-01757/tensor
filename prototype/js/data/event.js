// TENSOR — Event: La Settimana
// Fatti condivisi, entità presenti, timeline oggettiva
// Questo file è la fonte di verità su cosa succede. I POV sono come lo vedi.
// I fatti esistono indipendentemente da chi li osserva.
// Alcuni fatti sono invisibili da certi angoli — questo è il punto.

export const EVENT = {
  event_id: 'settimana',
  title: 'La settimana',

  scenes: [
    {
      scene_id: 'parco_lunedi',
      title: 'Lunedì',
      subtitle: 'Il parco',
      setting: 'Parco pubblico, lunedì sera, luce bassa, fine giornata',
      shared_facts: [
        'Martina si arrampica sulla struttura alta',
        'Il figlio di Marco le prende il cappellino e lo butta giù',
        'Un cane randagio con un orecchio piegato dorme vicino ai giochi',
        'Marco è al telefono — gli stanno chiedendo dei numeri del trimestrale',
        'Enrico osserva Martina dalla panchina',
        'Una berlina scura è parcheggiata dietro il parco, nel parcheggio secondario',
        'Sara esce dalla berlina, si sistema i capelli, attraversa il parco senza fermarsi',
        'Il presidente è nella berlina. Non scende.',
        'Nessuno nota Sara tranne il cane, che alza la testa un secondo'
      ],
      entities_present: ['martina', 'marco', 'il_cane', 'monete', 'giacca_sbottonata', 'sara', 'presidente', 'la_macchina']
    },
    {
      scene_id: 'riunione_mercoledi',
      title: 'Mercoledì',
      subtitle: 'La riunione',
      setting: 'Sala riunioni, mercoledì mattina, luce al neon, caffè freddo',
      shared_facts: [
        'Sara presenta risultati trimestrali — metà del lavoro è di Luca',
        'Luca è seduto in fondo e non parla',
        'Marco ed Enrico sanno entrambi che il lavoro è di Luca',
        'Il presidente osserva dal vetro della sala',
        'Marco dà una gomitata a Enrico',
        'Arriva una mail anonima durante la riunione — una riga, nessuna firma',
        'Il capo complimenta Sara',
        'Sara ha le mani fredde sotto il tavolo',
        'Il presidente annuisce dal vetro quando Sara presenta'
      ],
      entities_present: ['marco', 'la_mail', 'sara', 'luca', 'presidente']
    },
    {
      scene_id: 'audit_venerdi',
      title: 'Venerdì',
      subtitle: 'I numeri',
      setting: 'Ufficio, venerdì mattina, audit imminente',
      shared_facts: [
        'Nel report di Marco ci sono numeri aggiustati intenzionalmente',
        'Luca ha trovato l\'anomalia e l\'ha segnalata in una nota interna',
        'La nota di Luca non è stata letta da nessuno',
        'Marco sa che qualcuno troverà i numeri',
        'Sara chiede di firmare la revisione',
        'L\'audit è lunedì',
        'Marco ha salvato il posto a Enrico tre anni fa',
        'La tecnica di aggiustamento dei numeri è la stessa che il presidente ha insegnato a Sara l\'anno scorso',
        'Sara riconosce la tecnica nel file di Marco'
      ],
      entities_present: ['marco', 'la_mail', 'il_cane', 'luca', 'sara', 'presidente']
    },
    {
      scene_id: 'fermata_domenica',
      title: 'Domenica',
      subtitle: 'La fermata',
      setting: 'Fermata dell\'autobus, domenica mattina, sole basso',
      shared_facts: [
        'Un ragazzo con le mani sporche di terra raccoglie monete',
        'Le monete gliele ha date il padre — il presidente — perché non ha tempo di portarlo',
        'Il ragazzo ha sentito una telefonata del padre con un\'amante. Non sa con chi.',
        'Un gruppo di ragazzi ride',
        'Nessuno aiuta, nessuno è crudele',
        'Un uomo con giacca sbottonata aspetta — non è Marco',
        'Il cane segue il ragazzo',
        'Sara è alla fermata. Non aspetta l\'autobus.',
        'L\'autobus arriva'
      ],
      entities_present: ['martina', 'il_cane', 'giacca_sbottonata', 'monete', 'ragazzo_monete', 'sara']
    }
  ]
};
