# TENSOR
## Game Design Document — v0.4
*Documento di lavoro confidenziale*

> **"Ogni scelta dice chi sei."**

---

## Indice

1. [Identità del Prodotto](#1-identità-del-prodotto)
2. [Concept Fondamentale](#2-concept-fondamentale)
3. [Struttura di Gioco](#3-struttura-di-gioco)
4. [Esempio di Storia Decostruita](#4-esempio-di-storia-decostruita)
5. [Multiplayer — Matrice Narrativa Condivisa](#5-multiplayer--matrice-narrativa-condivisa)
6. [Modello di Produzione](#6-modello-di-produzione)
7. [Profilazione e Progressione](#7-profilazione-e-progressione)
8. [Monetizzazione](#8-monetizzazione)
9. [KPI di Successo](#9-kpi-di-successo)
10. [Criticità Non Risolte](#10-criticità-non-risolte)
11. [Note di Lavoro](#11-note-di-lavoro)
- [Appendice 1 — Tuning dei Modelli per la Scrittura](#appendice-1--tuning-dei-modelli-per-la-scrittura)
- [Appendice 2 — Stack Tecnologico](#appendice-2--stack-tecnologico)
- [Appendice 3 — Evoluzioni Possibili](#appendice-3--evoluzioni-possibili)
- [Appendice 4 — DNA del Sistema: Schema Ontologico](#appendice-4--dna-del-sistema-schema-ontologico)

---

## 1. Identità del Prodotto

| Campo | Valore |
|---|---|
| **Nome** | TENSOR *(working title)* |
| **Genere** | Narrative Experience / Moral Drama |
| **Piattaforma** | Mobile (iOS + Android), espandibile |
| **Modello** | Free to Play — ADV + Token economy |
| **Sessione tipo** | 3–5 min (single player) / 5–8 min (multiplayer) |
| **Audience** | 18–40 anni, casual con profilo riflessivo |
| **Tagline** | *"Ogni scelta dice chi sei."* |

---

## 2. Concept Fondamentale

### 2.1 Il Nucleo

TENSOR è un librogame digitale emotivo in cui il giocatore attraversa situazioni morali reali — dalla scala personale alla planetaria — attraverso scelte binarie o ternarie sotto pressione di tempo. Non esiste una risposta giusta. Il gioco non misura moralità. Misura la coerenza tra chi pensi di essere e come agisci sotto pressione.

La tensione non viene dalla difficoltà. Viene dall'incertezza narrativa: non sai dove sta andando la storia. Ogni scelta ha peso causale reale sul finale — e sui finali degli altri giocatori.

### 2.2 Il Principio Psicologico

Gli esseri umani rivelano chi sono con più onestà in quello che fanno senza pensare di essere osservati che in quello che dichiarano consapevolmente. TENSOR sfrutta questo principio: le scelte sotto pressione di tempo impediscono la razionalizzazione. Risponde l'istinto, non la persona che vuoi sembrare.

> **Riferimento teorico:** Self-Determination Theory (Ryan & Deci, 2006) — la soddisfazione del bisogno di autonomia, competenza e relazionalità come motore dell'engagement intrinseco.

### 2.3 Differenziazione di Mercato

Il mercato dei narrative games (Detroit Become Human, Until Dawn, Telltale) richiede budget enormi per produzione audiovisiva. TENSOR risolve il problema diversamente: il carico emotivo non viene dalla grafica ma dalla qualità della situazione iniziale e dalla responsabilità condivisa tra giocatori.

Il mercato casual usa il cervello del giocatore come patata. TENSOR gli chiede di scegliere chi è. Non è un gioco più difficile — è un gioco più onesto.

---

## 3. Struttura di Gioco

### 3.1 Il Loop Fondamentale

```
Situazione emotiva
       ↓
Scelte sotto timer
       ↓
Conseguenze narrative
       ↓
Reveal del finale
       ↓
Profilo aggiornato
       ↓
Nuova situazione
```

### 3.2 Anatomia di una Sessione

| Fase | Descrizione | Durata |
|---|---|---|
| **Setup** | Situazione rivelata. Pochi secondi di testo denso. Nessun tutorial. | 10–15 sec |
| **Nodo 1** | Prima scelta. Due opzioni (o tre con token). Timer visibile. | 10–15 sec |
| **Sviluppo** | La storia avanza in base alla scelta. Nuovo nodo. | 10–15 sec |
| **Nodo 2–3** | Scelte successive. La tensione cresce. | 20–30 sec |
| **Climax** | Scelta finale. La più pesante. Nessuna indicazione di quale sia. | 15 sec |
| **Finale** | Risoluzione narrativa coerente con il percorso fatto. | 20–30 sec |
| **Reveal** | Profilo aggiornato. Distribuzione scelte degli altri giocatori. | 10–15 sec |

### 3.3 Pacing — La Triade dei Motori

Ogni sessione attiva tre motori cerebrali distinti. La proporzione tra loro determina se il gioco è coinvolgente o faticoso.

| Motore | Meccanismo | Costo cognitivo |
|---|---|---|
| **Curiosità narrativa** | Vuoi sapere dove va la storia | Basso |
| **Introspezione identitaria** | Rifletti su chi sei attraverso la scelta | Alto |
| **Posizionamento sociale** | Vedi dove ti collochi rispetto agli altri | Quasi zero |

**Regole di pacing obbligatorie:**

- Nessuna sessione può richiedere introspezione intensa su ogni nodo. Ogni storia deve avere almeno un nodo narrativamente leggero che mantiene il flusso senza pesare sull'identità.
- Ogni sessione deve contenere almeno un momento di posizionamento sociale leggibile — la distribuzione delle scelte degli altri giocatori su quel nodo, visibile subito dopo la scelta. Questo è il motore meno costoso cognitivamente e tra i più coinvolgenti biologicamente: il cervello umano è cablato per calibrare continuamente la propria posizione rispetto al gruppo.
- Il motore di introspezione va usato con parsimonia e concentrato sui nodi climax. Se ogni nodo lo attiva, il giocatore abbandona dopo 4–5 sessioni non perché il gioco sia brutto, ma perché è metabolicamente costoso.

> *Il cinema funziona sul carico passivo — ti fa sentire qualcosa senza chiederti di pensare troppo. TENSOR deve alternare carico attivo (introspezione) e passivo (curiosità narrativa, posizionamento sociale). Non ogni scena può essere il climax.*

### 3.4 La Terza Risposta — Kobayashi Maru

Su ogni nodo critico esiste una terza opzione non visibile di default. Costa 1 token.

**Non è la scelta migliore.** Non è la scelta peggiore. È la scelta più vera: quella che una persona specifica, con una storia specifica, potrebbe voler fare. Le prime due scelte sono quelle socialmente comprensibili. La terza è quella di chi rifiuta il binario imposto dalla situazione.

Chi la compra non la compra per vincere di più. La compra per accedere a una storia che non esiste per chi non la cerca.

Il gioco ricorda che hai rifiutato il binario. Prima o poi te lo fa pesare.

> *Esempio: padre al lavoro vs festa del figlio → terza opzione: portare il figlio al lavoro. Non risolve il dilemma. Lo trasforma. Ha conseguenze proprie, più complesse.*

### 3.4 Principi di Pacing — La Triade dei Motori

Ogni sessione attiva tre motori cognitivi distinti con costi energetici diversi:

| Motore | Descrizione | Costo cognitivo | Frequenza nella sessione |
|---|---|---|---|
| **Curiosità narrativa** | Voglio sapere come va a finire | Basso | Ogni nodo |
| **Introspezione identitaria** | Cosa dice di me questa scelta | Alto | Max 1–2 nodi per sessione |
| **Posizionamento sociale** | Come mi colloco rispetto agli altri | Quasi zero | Almeno 1 momento per sessione |

**Regole operative di pacing:**

- Nessuna sessione chiede introspezione intensa a ogni nodo. Il cervello evita attività cognitivamente costose se non obbligato — il carico identitario distribuito su ogni scelta produce abbandono, non profondità.
- Ogni sessione contiene almeno un momento di posizionamento sociale leggibile. Questo motore è quasi irresistibile per gli esseri umani e costa pochissimo. Va usato come respiro cognitivo tra i nodi ad alta intensità.
- I nodi di item masking sono preferibilmente i nodi a bassa intensità apparente — quelli in cui il giocatore non sente il peso della scelta sono esattamente quelli in cui risponde con l'istinto più puro.

**Esempio di sessione ben ritmata:**

```
Nodo 1 — curiosità narrativa (setup, bassa intensità)
Nodo 2 — introspezione identitaria (alta intensità, nodo mascherato)
Nodo 3 — posizionamento sociale ("il 71% ha scelto diversamente da te")
Climax — introspezione identitaria (alta intensità, dichiarata)
Reveal — posizionamento sociale + profilo aggiornato
```

---

## 4. Esempio di Storia Decostruita

### "Il Compleanno" — Analisi della logica narrativa

#### Situazione Iniziale

> *È il compleanno di tuo figlio. Compie otto anni. Hai promesso la festa da sei mesi. Ventiquattro bambini invitati. Il clown prenotato. La torta con i dinosauri. Stamattina ti hanno chiamato dal lavoro. C'è un problema. Solo tu puoi risolverlo. Devi essere lì entro un'ora. Tuo figlio è in pigiama sul divano. Sta guardando i palloncini che avete gonfiato ieri sera insieme. Non sa ancora niente.*

#### Mappa dei Nodi

| Nodo | Testo | Scelte | Conseguenze |
|---|---|---|---|
| **N1** | Cosa fai? | A: Chiami il lavoro / B: Parli al figlio | A → guadagni tempo / B → chiude subito |
| **N2** *(da A)* | Il collega può farcela ma rischi tu | A: Accetti il rischio / B: Vai al lavoro | A → resti / B → vai |
| **N3** *(da A→A)* | Cosa fai mentre aspetti? | A: Cerchi ancora / B: Vai in salotto | Qualità del finale |
| **CLIMAX** | Marco dice ok ma sei responsabile | A: Resti / B: Vai | Determina il finale |
| **FINALE A** | Sei alla festa. Tuo figlio ti fa ciao. | — | Profilo: protezione |
| **FINALE B** | Vai al lavoro. La festa si fa senza di te. | — | Profilo: responsabilità |

#### Logiche di Design nei Nodi

- → Nessun nodo ha una scelta ovviamente giusta. Ogni opzione ha una logica morale difendibile.
- → Il personaggio secondario (il figlio) non parla mai direttamente al giocatore nei nodi. La sua presenza è obliqua — più potente.
- → Il collega Marco è introdotto come soluzione parziale per generare un secondo livello di rischio: non solo morale ma professionale.
- → Il climax non è dichiarato come tale. Il giocatore non sa quale scelta è l'ultima.
- → Il finale A non è "il finale buono". È il finale di chi ha scelto il figlio accettando un rischio professionale reale.
- → Il reveal mostra la distribuzione delle scelte degli altri giocatori. Questo momento è il loop di retention più forte del sistema.

#### Il Profilo Estratto

Dalle scelte di questa storia il sistema registra silenziosamente:

- Hai cercato alternative prima di arrenderti: `+resilienza`
- Hai accettato il rischio professionale per restare: `+protezione familiare`
- Non hai mentito al figlio: `+coerenza dichiarata`

Nessuna di queste etichette viene mostrata durante la partita. Emergono nel profilo cumulativo dopo N sessioni.

---

## 5. Multiplayer — Matrice Narrativa Condivisa

### 5.1 Il Principio

Le scelte di un giocatore diventano eventi nell'esperienza di un altro. Non in tempo reale: le azioni registrate nel pool asincrono vengono inserite come elementi narrativi nelle sessioni successive di altri giocatori.

Il giocatore non sa di essere in una storia condivisa finché i rami non si incrociano visibilmente.

> *Il padre che è andato al lavoro non è in strada in tempo reale nell'horror notturno di un altro giocatore. Ma la sua scelta ha alimentato il pool degli eventi che il sistema ha inserito in quella storia. Da qualche parte, qualcuno ha vissuto una storia più sola perché lui ha scelto il lavoro.*

### 5.2 Reveal Asincrono — Ghost Events (obbligatori)

La matrice narrativa condivisa esiste tecnicamente dal giorno 1. Ma una feature che esiste nel codice e non nell'esperienza del giocatore non esiste.

**Il cervello non collega autonomamente** "qualcun altro ha fatto una scelta che ha influenzato questa scena" senza una forma di rivelazione esplicita. Senza questa rivelazione, tutto il sistema multiplayer è invisibile psicologicamente — indipendentemente da quanto sia elegante tecnicamente.

I ghost events sono la meccanica obbligatoria del reveal asincrono. Tre formati, tutti necessari in proporzioni diverse:

| Formato | Esempio | Quando usarlo |
|---|---|---|
| **Traccia diretta** | *"Qualcuno prima di te ha scelto di non denunciare."* | Sui nodi influenzati da scelte di altri giocatori |
| **Dato aggregato** | *"Il 64% ha scelto di restare. Tu eri nel 36%."* | Nel reveal post-finale, su ogni storia |
| **Evento indiretto** | Un personaggio si comporta diversamente perché "qualcuno" ha scelto qualcosa in una sessione precedente — senza spiegarlo | Per creare il senso di mondo vivo |

Il formato più potente è il dato aggregato perché attiva il posizionamento sociale — terzo motore della triade — con costo cognitivo quasi zero. Vedere che il 6% ha scelto come te su una situazione in cui ti sentivi ovvio è un colpo allo stomaco lieve che genera una domanda: *perché quasi nessuno ha scelto come me?* Quella domanda non si risolve senza un'altra sessione.

**Regola operativa:** ogni storia deve avere almeno un ghost event visibile nel reveal finale. Non è opzionale. È il minimo per rendere il multiplayer percepibile.

### 5.3 Sincronizzazione

In fase di maturità del prodotto: timer per ogni nodo critico. Quando tutti i giocatori attivi in quella finestra temporale hanno risposto, l'engine avanza la storia in modalità sincrona.

Chi non risponde entro il timer: risposta casuale con malus narrativo (non di punteggio — di coerenza della storia).

**L'attesa di sincronizzazione è il momento più ricettivo psicologicamente per un rewarded ad.** Non stai interrompendo il gioco — stai monetizzando la suspense.

### 5.3 Engine Narrativo — Architettura Agenti

| Agente | Funzione |
|---|---|
| **Tono** | Mantiene il registro emotivo della sessione. Impedisce slittamenti di genere. |
| **Coerenza** | Traccia le variabili narrative attive. Garantisce causalità credibile tra scelte ed eventi. |
| **Sincronizzazione** | Gestisce i rami multipli. Gestisce la convergenza tra percorsi di giocatori diversi. |
| **Climax** | Monitora la tensione drammaturgica. Innesca il momento di incrocio quando le variabili sono mature. |

**L'AI lavora in pre-produzione, non in runtime.** In runtime il sistema seleziona e combina atomi narrativi pre-prodotti. La qualità emotiva è garantita dalla pre-produzione, non dalla generazione.

---

## 6. Modello di Produzione

### 6.1 Contenuto Atomico

Non si scrivono storie. Si scrivono unità narrative minime — scene, eventi, micro-momenti — ognuna con ingressi e uscite definiti.

| Componente | Descrizione | Volume iniziale |
|---|---|---|
| **Situazioni** | Setup narrativi (100–200 parole) | 50 al lancio |
| **Nodi** | Biforcazioni con 2–3 scelte | 200+ al lancio |
| **Finali** | Risoluzioni coerenti per percorso | 4–5 per storia |
| **Varianti atmosferiche** | Tono, stagione, registro emotivo | 3 set al lancio |
| **Stagioni tematiche** | Personale / Relazioni / Potere / Planetario | 1 al lancio |

### 6.2 Comparto Visivo

Il carico emotivo non viene dalla grafica. Viene dalla qualità della situazione.

- Pixel art o illustrazioni statiche stilizzate
- Palette cromatica per registro emotivo (non per storia)
- Tipografia come elemento narrativo primario
- Suono e musica ambientale come layer emotivo — mai didascalico

> *Riferimento estetico: Another World, Disco Elysium (UI), Device 6. Non Detroit Become Human.*

### 6.3 Fasi di Sviluppo

| Fase | Obiettivo | Razionale |
|---|---|---|
| **Fase 1** | Single player, storie pre-scritte, zero AI generativa | Valida loop emotivo, monetizzazione ads, retention. Costo minimo. Insegna tutto. |
| **Fase 2** | AI come co-autore su strutture fisse | L'albero esiste — l'AI riempie dettagli, adatta il tono. Errori contenuti. |
| **Fase 3** | Sincronizzazione multiplayer + pool agenti | Solo quando la base è validata dal mercato. Non bruciare le fasi. |

---

## 7. Profilazione e Progressione — Lo Specchio Adattivo

### 7.1 Il Principio Fondamentale

TENSOR non interpreta il giocatore. Lo osserva mentre si interpreta da solo.

La differenza non è cosmetics. È la linea che separa un sistema che giudica da uno che riflette. Gli esseri umani tollerano meglio gli specchi che i giudici — anche quando temono entrambi.

Il sistema non dice mai "sei così". Dice "hai fatto così". L'interpretazione appartiene al giocatore. Il sistema fornisce solo il dato.

### 7.2 Il Profilo Silenzioso

Il sistema non assegna ruoli dichiarati. Osserva. Dopo tre o quattro sessioni il pattern di scelte ha già una forma — ma non viene mostrato.

Il profilo non è una statistica. È il vero arco narrativo del giocatore. Le storie sono episodi. Il racconto reale è il pattern che emerge attraverso di esse. È una struttura più vicina alla serialità televisiva che al librogame: ogni episodio è autonomo, ma accumula informazioni su chi sei.

### 7.3 Il Mondo che Ti Osserva — Lo Specchio Adattivo

Dopo 5–6 sessioni il sistema smette di presentare dilemmi neutri. Inizia a costruire situazioni che conoscono già il tuo pattern.

**Esempio:** hai scelto spesso protezione familiare. La storia successiva inizia così:

> *"Tuo figlio si è accorto che menti quando dici che andrà tutto bene."*

Il sistema non sta giudicando. Sta usando il tuo profilo come materiale narrativo.

---

## 5.3-bis Ghost Events — Meccanica Obbligatoria del Reveal Asincrono

La matrice narrativa condivisa esiste tecnicamente dal giorno 1. Ma una feature che esiste nel codice e non è percepibile psicologicamente non esiste per il giocatore.

**Regola:** ogni punto di incrocio tra rami narrativi di giocatori diversi deve produrre un ghost event visibile. Non opzionale, non decorativo — strutturale.

**Formati obbligatori:**

| Formato | Esempio | Quando usarlo |
|---|---|---|
| **Ghost diretto** | *"Qualcuno prima di te ha scelto di non denunciare."* | Quando la scelta di un altro giocatore ha alimentato questo nodo |
| **Statistica narrativa** | *"Il 62% dei giocatori in questa situazione ha scelto di restare."* | Al reveal finale di ogni sessione |
| **Traccia indiretta** | Un evento accade senza spiegazione — il giocatore intuisce che è causato da qualcun altro | Nei nodi multiplayer di Fase 3 |

**Perché è obbligatorio e non opzionale:**

Il cervello umano non collega automaticamente "qualcun altro ha fatto una scelta che ha influenzato questa scena" senza un segnale esplicito. Senza ghost events visibili, la feature della matrice condivisa non produce nessun effetto psicologico — né curiosità, né senso di connessione, né viralità. Esiste solo nell'architettura.

Il ghost event trasforma una feature tecnica in un'esperienza.

Questo crea una tensione nuova. Il giocatore sente: *"il gioco mi sta leggendo."* Non torna per vedere la storia. Torna per vedere cosa il gioco dirà di lui la prossima volta.

Gli esseri umani sono curiosi di due cose: gli altri e se stessi. La prima genera gossip. La seconda genera ossessione.

### 7.4 Linguaggio Osservativo — Regola Critica

Il sistema parla sempre in termini di osservazioni, mai di diagnosi.

| ❌ Diagnosi — non usare | ✅ Osservazione — usare sempre |
|---|---|
| "Quando qualcuno dipende da te, scappi." | "In sette situazioni su dieci, quando qualcuno dipendeva da te, hai scelto di allontanarti." |
| "Sei un protettore." | "In nove sessioni su dodici hai scelto di proteggere qualcun altro." |
| "Eviti il conflitto." | "Finora hai scelto il confronto diretto due volte su undici." |

**Perché questo è fondamentale:** un'osservazione è contestabile. Una diagnosi attiva difesa identitaria. Se il sistema sbaglia una diagnosi, perde credibilità permanentemente. Se sbaglia un'osservazione, il giocatore può correggere — e questa correzione è essa stessa un dato narrativo.

La credibilità non nasce dall'accuratezza assoluta. Nasce dall'umiltà del sistema.

### 7.5 Soglie Progressive di Confidenza

Il sistema non produce reveal prima di avere dati sufficienti.

| Sessioni | Comportamento del sistema |
|---|---|
| 1–4 | Nessun reveal. Il sistema osserva in silenzio. |
| 5–9 | Osservazioni leggere su pattern emergenti. Formulate come ipotesi. |
| 10–19 | Pattern consolidati. Il sistema inizia a costruire storie calibrate sul giocatore. |
| 20+ | Contraddizioni interne. Il sistema rivela tensioni tra scelte diverse. |

**Le contraddizioni sono narrativamente più potenti dei pattern coerenti:**

> *"In molte storie proteggi gli altri. In alcune li lasci soli. Il gioco non sa quale dei due sia più vero."*

Questo non rompe la fiducia — la rafforza. È più vicino alla complessità reale delle persone di qualsiasi etichetta.

### 7.6 Il Momento Meta — Una Volta Sola

A un punto preciso della storia di ogni giocatore — non programmato rigidamente, ma emergente quando il sistema ha abbastanza materiale — compare questo:

> *"Questa situazione è stata costruita usando le tue scelte precedenti."*

Nessuna spiegazione. Nessun calcolo mostrato. Solo quella frase.

Regole operative:

- **Una volta sola** per giocatore. Se si ripete diventa un meccanismo, perde l'effetto.
- **Non programmato a sessione fissa.** Deve emergere quando il profilo è sufficientemente ricco da giustificarlo — altrimenti sembra teatrale.
- **Mai spiegato.** Il sistema non mostra il calcolo. L'ambiguità è il punto.

La differenza tra usarlo una volta e usarlo spesso è la differenza tra una rivelazione e un trucco.

### 7.7 La Card Virale

Il reveal condivisibile non è un achievement. È un'osservazione che sorprende il giocatore su se stesso.

> *"Il gioco ha notato che quando qualcuno dipende da me, spesso me ne vado. Non sa perché. Nemmeno io."*

Questa card funziona perché:
- Non è una vittoria da mostrare — è una domanda aperta
- Genera immediatamente "come hai risposto tu?" negli amici
- È condivisibile alle 11 di sera, non alle 3 del pomeriggio
- L'ambiguità è più umana della certezza — e più onesta

### 7.8 Dimensioni del Profilo Silenzioso

- Protezione vs Interesse personale
- Confronto vs Fuga
- Lealtà verticale (gerarchia) vs Laterale (pari)
- Rischio accettato vs Rischio evitato
- Coerenza dichiarata vs comportamento effettivo
- **Contraddizioni interne** — pattern che si contraddicono nel tempo
- **Compliance vs Reframing** — dimensione autonoma, descritta sotto

**Compliance vs Reframing — dimensione autonoma:**

Alimentata da tre variabili combinate:

| Variabile | Cosa misura |
|---|---|
| **Frequenza** | Quante volte il giocatore sceglie la terza opzione rispetto al totale delle sessioni |
| **Timing** | In quali nodi la sceglie — nei momenti ad alta tensione o nei momenti neutri |
| **Contesto** | Su quali dimensioni narrative ricorre — protezione, potere, identità, relazioni |

Chi sceglie la C raramente e solo su nodi ad alta posta in gioco ha un profilo diverso da chi la sceglie sistematicamente su ogni tipo di nodo. Il primo rifiuta il binario quando la posta è alta. Il secondo ha un rapporto strutturalmente critico con qualsiasi sistema di regole imposto.

Entrambi i profili sono narrativamente potenti. Nessuno dei due è "migliore".

Questa dimensione non viene mai formulata come etichetta. Viene restituita come osservazione contestuale:

> *"In undici sessioni hai rifiutato le opzioni proposte quattro volte. Tre di queste riguardavano situazioni in cui qualcuno con più potere ti chiedeva di scegliere."*

### 7.9 Specchio o Crisi di Identità — Principio di Progressione

Non è una scelta binaria di design. È una progressione temporale.

**Fase specchio (sessioni 1–9):** il sistema è osservatore neutro. Riconoscibile, non minaccioso. Il giocatore deve sentire il sistema come affidabile prima di potersi fidare abbastanza da accettare una destabilizzazione. Se inizi con la crisi, perdi il 70% prima che il sistema abbia materiale sufficiente per renderla vera.

**Fase crepa (sessioni 10+):** il sistema inizia a rivelare contraddizioni. Non giudizi — tensioni. *"In molte storie proteggi gli altri. In alcune li lasci soli. Il gioco non sa quale dei due sia più vero."* Questo è il momento in cui il sistema smette di essere uno specchio e diventa un interlocutore.

**Regola:** la crepa deve essere guadagnata — dal sistema che ha abbastanza dati, e dal giocatore che ha abbastanza fiducia nel sistema.

Uno specchio rassicura. Una crisi di identità intriga ma può spaventare. La sequenza corretta è: specchio prima, crepa poi. La crisi non programmata è teatrale. La crisi guadagnata è il momento che genera ossessione.

### 7.10 La Menzogna come Strato

TENSOR non chiede vero/falso. Registra la coerenza tra le scelte nel tempo. Non puoi mentire al sistema — puoi solo performare un'identità diversa dalla tua. Ma il pattern emerge comunque.

Il reveal non dice se hai mentito. Dice come hai scelto. La differenza, spesso, è la stessa cosa.

---

## 8. Monetizzazione

### 8.1 Principio Guida

Non si vende vantaggio competitivo. Non si vende contenuto bloccato. **Si vende impazienza e agency narrativa.**

Il giocatore che non paga mai ha un'esperienza completa. Il giocatore che paga ha più controllo sulla propria storia.

> *Modello di riferimento: Duolingo. Il conversion point è emotivo: sei dentro una storia, sei investito, hai finito i token. Lì la frizione diventa conversione naturale.*

### 8.2 Sistema Token

| Utilizzo | Costo | Effetto |
|---|---|---|
| **Terza risposta (Kobayashi)** | 1 token | Sblocca opzione alternativa sul nodo corrente |
| **Rigiocare un nodo** | 1 token | Esplora il ramo alternativo |
| **Accelerare sincronizzazione** | 1 token | Non aspetti gli altri giocatori |
| **Profilo completo** | 2 token | Visualizza profilo cumulativo esteso |
| **Ramo alternativo post-finale** | 1 token | Vedi come sarebbe andata altrimenti |

### 8.3 Economia Token

- **Ricarica naturale:** N token ogni 24 ore. Sufficienti per una sessione completa standard.
- **Accumulo:** I token non spesi si accumulano fino a un massimo di 10. Il giocatore occasionale non si sente mai in debito.
- **Rewarded ads:** 1 ad = 1 token. Scelta consapevole, mai forzata.
- **Subscription:** Token illimitati + accesso anticipato a nuove stagioni.

### 8.4 Integrazione Ads

- **Interstitial:** solo tra sessioni complete. Mai durante. Mai nella prima sessione (honeymoon period).
- **Rewarded:** durante l'attesa di sincronizzazione multiplayer — momento di massima ricettività psicologica.
- **Formato:** rewarded > interstitial > banner. Il banner non esiste in questo prodotto.

---

## 9. KPI di Successo

| Metrica | Target | Soglia critica |
|---|---|---|
| Retention D1 | ≥ 40% | < 30% = redesign onboarding |
| Retention D7 | ≥ 15% | < 10% = problema core loop |
| Retention D30 | ≥ 10% | < 5% = no LTV |
| Session length | 3–5 min | < 2 min = narrativa piatta |
| Sessions/day | ≥ 2 | 1 = rischio churn |
| Rewarded ad opt-in | ≥ 60% | < 40% = reward poco appetibile |
| Token spend rate | ≥ 30% utenti attivi | < 15% = token non percepiti come valore |
| Profilo reveal rate | ≥ 50% dopo 5 sessioni | < 30% = loop identità non funziona |

---

## 10. Criticità Non Risolte

### Criticità #1 — Il Primo Minuto

Il concept è forte dopo 2–3 sessioni. Il giocatore casual decide se restare nei primi 60 secondi.

**La regola:** la prima storia di ogni sessione deve avere una situazione in cui il giocatore è già dentro il problema quando lo schermo si accende. Nessun setup, nessuna costruzione. In medias res, già compromesso.

> *Esempio di apertura forte: "Stai guidando. Hai bevuto due bicchieri. Davanti a te un controllo."*
>
> Questa apertura funziona perché mette il giocatore in una situazione illegale prima della prima scelta. Non sta scegliendo se fare qualcosa di sbagliato — sta scegliendo come gestire qualcosa di sbagliato che ha già fatto. Non pathos. Adrenalina morale.

**Regola operativa per il primo minuto:**
- Il giocatore deve essere già implicato alla parola 10
- La prima scelta deve arrivare entro 15 secondi dall'apertura
- Nessuna introduzione di personaggi, contesto, backstory prima della prima scelta

### Criticità #2 — L'Architettura del Dilemma Efficace

Il problema non è scrivere bene. È scrivere dilemmi che non abbiano una risposta socialmente visibile.

**Il dilemma ovvio fallisce** perché ha una risposta "giusta" implicita. Chi sceglie diversamente si sente giudicato, non sfidato. Il gioco perde.

**Il dilemma efficace:** entrambe le scelte sono difendibili e entrambe costano qualcosa di reale.

| Sbagliato | Giusto |
|---|---|
| "Scopri che il tuo collega ruba. Lo denunci o no?" | "Il tuo collega ruba per pagare le cure di suo figlio. Domani ti chiedono di firmare un audit." |
| Risposta ovvia, nessuna tensione reale | Entrambe le scelte costano qualcosa. Non c'è via pulita. |

**Checklist pre-produzione per ogni dilemma:**

- [ ] La scelta A ha un costo reale per chi la fa?
- [ ] La scelta B ha un costo reale diverso ma equivalente?
- [ ] Esiste una risposta socialmente ovvia? Se sì, va eliminata o capovolta.
- [ ] Il giocatore può difendere entrambe le scelte davanti a qualcuno che ha scelto l'altra?
- [ ] **Item masking:** almeno un nodo ha una dimensione osservata che non coincide con la dimensione apparente?

**Item masking — criterio obbligatorio:**

Ogni storia deve contenere almeno un nodo in cui la dimensione che il giocatore pensa di stare dimostrando è diversa da quella che il sistema sta effettivamente tracciando.

Esempio: uno scenario apparentemente su *protezione familiare* misura in realtà *tolleranza al rischio reputazionale*. Il giocatore non lo sa. Il sistema sì.

Questo serve a rendere il profilo resistente alla manipolazione strategica. Il giocatore che ha capito il sistema e inizia a costruire consapevolmente il proprio profilo è esattamente il giocatore più coinvolto — e il più pericoloso per l'integrità del sistema. Il masking non punisce questo comportamento: lo rende semplicemente impossibile da eseguire con precisione.

Il masking non deve essere segnalato nel documento pubblico del dilemma. Solo nella metadata interna al pool narrativo.

Se passa tutti e cinque i criteri, il dilemma è in produzione. Altrimenti torna in scrittura.

### Criticità #3 — Il Bilanciamento della Kobayashi Maru

**Il paradosso:** se la terza scelta è sempre migliore, rompe il sistema (pay-to-win narrativo). Se è sempre peggiore o uguale, nessuno paga token.

**La soluzione:** la terza scelta non deve essere migliore o peggiore. Deve essere **più vera**.

Le prime due scelte sono quelle socialmente comprensibili — le opzioni che chiunque farebbe. La terza è quella che una persona specifica, con una storia specifica, potrebbe voler fare. Non più intelligente. Non più morale. Più personale.

Il valore del token non è il vantaggio. È **l'accesso a una storia che non esiste per chi non la cerca**.

Il sistema ricorda la scelta. Le conseguenze della C arrivano più tardi, più complicate. Il giocatore non sfugge al dilemma — entra in un dilemma diverso.

---

## 11. Note di Lavoro

- Questo documento è il risultato di una sessione di co-design esplorativo. Non è un documento definitivo. È uno strumento di pensiero.
- Il passo successivo non è scrivere codice. È scrivere dieci storie complete con albero narrativo decostruito e verificare se reggono il test: *"ci giocherei sul treno alle 8 di mattina?"*
- La prima sessione deve essere guidata. Il giocatore capisce il sistema vivendo il sistema, non leggendo le sue regole.
- Il profilo silenzioso è il prodotto più potente del sistema. Va progettato come funzione primaria, non come feature secondaria.
- Non fare la fase 3 prima che la fase 1 sia validata dal mercato.

---

---

# Appendice 1 — Tuning dei Modelli per la Scrittura

## Il Problema Centrale

Un LLM generico produce dilemmi morali mediocri per default. Tende verso il melodrammatico, il moralistico, o l'ovvio — esattamente i tre difetti letali per TENSOR. Il motivo è strutturale: i modelli sono addestrati su testi che tendono a risolvere le tensioni morali, non a mantenerle aperte.

Il tuning non è un'opzione — è un requisito di produzione.

## Approcci di Tuning

### Fine-tuning supervisionato (SFT)

Addestri il modello su un dataset curato di dilemmi efficaci. Il dataset deve contenere:

- Situazioni con split reale nelle risposte umane (nessuna risposta ovvia)
- Esempi negativi etichettati (dilemmi melodrammatici, moralistici, ovvi) — il modello impara cosa NON fare
- Variazioni tonali della stessa situazione (registro freddo, caldo, neutro)

**Fonti per il dataset:**
- Trolley problem variants dalla letteratura di filosofia morale applicata (Judith Jarvis Thomson, Peter Singer)
- Esperimenti di psicologia morale (Jonathan Haidt, moral foundations theory)
- Trascrizioni di casi etici reali anonimizzati (medicina, diritto, giornalismo)
- Testi letterari con dilemmi non risolti (Dostoevskij, Camus, McCarthy) — non per lo stile, per la struttura del conflitto
- Dataset negativi: soap opera, reality TV, film moralistici hollywoodiani — etichettati come contro-esempi

**Volume minimo stimato:** 500–1000 esempi curati manualmente prima di un ciclo SFT utile.

### RLHF — Reinforcement Learning from Human Feedback

Dopo SFT, il modello genera dilemmi che vengono valutati da rater umani su dimensioni specifiche:

| Dimensione | Domanda al rater |
|---|---|
| **Ambiguità** | "Esiste una risposta ovviamente giusta?" (1–5, dove 5 = nessuna) |
| **Costo reale** | "Entrambe le scelte costano qualcosa di reale?" (1–5) |
| **Riconoscibilità** | "Questa situazione potrebbe capitarti?" (1–5) |
| **Non melodrammaticità** | "La situazione sembra esagerata?" (1–5, dove 5 = per nulla) |
| **Tensione sostenuta** | "Vorresti sapere come va a finire?" (1–5) |

Il reward model viene addestrato su questi score. I dilemmi con score bassi su qualsiasi dimensione vengono filtrati automaticamente.

### Constitutional AI / RLAIF

Alternativa o complemento all'RLHF umano: definisci una costituzione editoriale del dilemma — le regole che un dilemma deve rispettare — e usi il modello stesso per autovalutarsi rispetto a essa.

**Bozza di costituzione editoriale TENSOR:**

```
1. Il dilemma non ha una risposta moralmente ovvia.
2. Entrambe le scelte hanno un costo reale e difendibile.
3. La situazione è riconoscibile nella vita quotidiana.
4. Non ci sono villain espliciti — solo persone in situazioni difficili.
5. Il registro non è mai predicatorio o moralistico.
6. La tensione rimane aperta anche dopo la scelta.
7. Il personaggio principale è già implicato quando la storia inizia.
```

### Bilanciamento della Crudezza — Registro Variabile

Uno dei requisiti non ovvi: il sistema deve saper scrivere a registri diversi di intensità morale, non solo a un tono medio.

**Livelli proposti:**

| Livello | Descrizione | Esempio |
|---|---|---|
| **L1 — Everyday** | Tensioni quotidiane, bassa posta in gioco percepita | Coprire un ritardo di un collega |
| **L2 — Personal** | Relazioni, lealtà, identità personale | Il compleanno del figlio |
| **L3 — Social** | Potere, denaro, giustizia | L'audit sul collega che ruba per il figlio |
| **L4 — Extreme** | Vite, sopravvivenza, scelte irreversibili | "Stai guidando. Hai bevuto due bicchieri." |
| **L5 — Systemic** | Dilemmi planetari, etici su larga scala | Stagione 4+ |

Il giocatore dovrebbe poter scegliere o il sistema dovrebbe profilare la soglia di intensità preferita. Un giocatore che sceglie sistematicamente L1 probabilmente non vuole L4. Rispettare questo è cruciale per la retention.

**Implementazione tecnica del registro:**

```
system_prompt_prefix = f"""
Scrivi un dilemma morale a registro {livello}/5.
Livello 1: situazioni quotidiane, posta in gioco bassa ma reale.
Livello 5: situazioni estreme, posta in gioco alta, scelte irreversibili.
Regole invarianti a tutti i livelli: [COSTITUZIONE EDITORIALE]
"""
```

## Pipeline di Produzione Consigliata

```
Idea grezza (umano)
        ↓
Draft automatico (modello tuned)
        ↓
Valutazione automatica (checklist costituzione)
        ↓
Review umana (editor narrativo)
        ↓
Score RLHF
        ↓
Approvazione / rework / scarto
        ↓
Pool di produzione
```

Non eliminare il review umano nella pipeline. L'AI è il generatore di volume, l'umano è il filtro di qualità. Il rapporto ottimale: 1 editor per ogni 50–100 dilemmi generati.

---

---

# Appendice 2 — Stack Tecnologico

## Premessa

Lo stack è progettato per la Fase 1 con scalabilità verso Fase 3. Ogni componente è sostituibile senza riscrivere il sistema. L'unico lock-in accettabile è sul database narrativo — che è un asset proprietario, non un vendor.

## Frontend

```
React Native (Expo)
├── Cross-platform iOS + Android da codebase unica
├── OTA updates via Expo EAS (no store review per hotfix)
├── Reanimated 3 per animazioni narrative (transizioni, timer)
└── Zustand per state management locale
```

**Alternativa valutabile:** Flutter — performance migliori su animazioni complesse, ma ecosistema più rigido e team più raro sul mercato.

## Backend

```
Node.js + TypeScript
├── API Layer: Fastify (più performante di Express, stesso ecosistema)
├── Auth: Clerk o Supabase Auth (passwordless, social login)
├── Realtime (Fase 3): Supabase Realtime o Ably per sincronizzazione nodi
└── Queue: BullMQ per gestione timer sincronizzazione multiplayer
```

## Database

```
PostgreSQL (via Supabase)
├── Profili utente e sessioni
├── Storia delle scelte (append-only, non modificabile)
├── Pool narrativo (atomi, nodi, finali, varianti)
└── Metriche comportamentali per profilazione

Redis
└── Cache sessioni attive, timer sincronizzazione, leaderboard temporanee
```

**Schema critico — Tabella Scelte:**

```sql
choices (
  id          UUID PRIMARY KEY,
  user_id     UUID REFERENCES users,
  session_id  UUID REFERENCES sessions,
  node_id     UUID REFERENCES nodes,
  choice_key  VARCHAR(4),        -- 'A', 'B', 'C'
  is_kobayashi BOOLEAN DEFAULT false,
  response_ms INTEGER,           -- tempo di risposta in ms
  created_at  TIMESTAMPTZ DEFAULT now()
)
```

Il tempo di risposta è un dato di profilazione silenzioso: chi risponde sotto 2 secondi sta operando con l'istinto. Chi impiega 8+ secondi sta razionalizzando. Entrambi i pattern sono informativi.

## Engine Narrativo

```
Pool narrativo
├── JSON strutturato per ogni storia
│   ├── metadata (genere, registro, livello intensità, tags)
│   ├── nodi con ingressi/uscite
│   ├── variabili di stato tracciabili
│   └── finali con condizioni di attivazione
│
├── Selector Service
│   ├── Sceglie la prossima storia in base al profilo utente
│   ├── Evita ripetizioni recenti
│   └── Bilancia registri emotivi nella sessione
│
└── State Tracker
    ├── Traccia variabili attive nella sessione corrente
    ├── Aggiorna profilo utente dopo ogni sessione
    └── Alimenta il pool eventi multiplayer (Fase 3)
```

## AI Layer

**Fase 1 — Pre-produzione:**

```
OpenAI API (GPT-4o) o Anthropic API (Claude)
└── Generazione draft dilemmi con system prompt tuned
    └── Output: JSON strutturato validato contro schema

Fine-tuning (quando dataset è maturo):
└── OpenAI fine-tuning API su GPT-4o-mini
    └── Più economico in produzione, qualità sufficiente per L1-L3
```

**Fase 2 — Runtime limitato:**

```
Claude API o GPT-4o
└── Riempimento varianti testuali su struttura fissa
    └── Mai generazione libera — sempre su template con slot
```

**Fase 3 — Multi-agente:**

```
Architettura a agenti specializzati
├── Agente Tono: modello leggero (GPT-4o-mini) con system prompt di registro
├── Agente Coerenza: retrieval su stato narrativo corrente (RAG su sessione)
├── Agente Sincronizzazione: logic rule-based + LLM per edge cases
└── Agente Climax: classifier trained su pattern di tensione narrativa
```

**Nota:** In Fase 3, la maggior parte delle decisioni dell'engine è rule-based. L'LLM interviene solo per edge cases e per la generazione di micro-varianti testuali. Non affidare la coerenza narrativa a un modello — affidala a un sistema di stato deterministico.

## Monetizzazione

```
RevenueCat
├── Gestione subscription cross-platform
├── Analytics acquisti
└── A/B testing offerte

AdMob (Google) + Unity Ads
├── Interstitial tra sessioni
├── Rewarded ads per token
└── Mediation via MAX (AppLovin) per ottimizzare eCPM
```

## Analytics e Profilazione

```
PostHog (self-hosted o cloud)
├── Event tracking comportamentale
├── Funnel analysis (dove si perde il D1)
├── Session recordings per UX research
└── Feature flags per A/B test narrativi

Mixpanel (alternativa)
└── Più potente per cohort analysis e retention curves
```

**Events critici da trackare dal giorno 1:**

```javascript
track('story_started', { story_id, register_level, session_number })
track('node_choice', { node_id, choice, response_ms, is_kobayashi })
track('story_completed', { story_id, path_taken, finale_id })
track('profile_viewed', { session_number, trigger })
track('token_spent', { reason, tokens_remaining })
track('ad_rewarded_completed', { placement, tokens_earned })
track('session_abandoned', { node_id, time_in_session })
```

## Infrastruttura

```
Vercel (backend API serverless)
└── Supabase (database + auth + realtime)
    └── Cloudflare CDN (assets statici, audio, immagini)

Costo stimato Fase 1 (fino a 10k DAU):
├── Supabase Pro: ~$25/mese
├── Vercel Pro: ~$20/mese
├── OpenAI API (pre-produzione): ~$50–200/mese variabile
└── Totale: < $300/mese fino a scala significativa
```

---

---

# Appendice 3 — Evoluzioni Possibili

*Questa sezione è speculativa. Non sono state discusse in dettaglio nella sessione di design. Sono direzioni aperte, non impegni.*

## Evoluzione 1 — Stagioni Tematiche

La struttura a stagioni è già nel modello. L'evoluzione naturale è rendere ogni stagione un evento culturale autonomo.

**Stagione 1 — Personale:** dilemmi quotidiani, relazioni, famiglia. Registro basso-medio. Onboarding del sistema.

**Stagione 2 — Potere:** lavoro, denaro, gerarchia, lealtà istituzionale. Registro medio-alto.

**Stagione 3 — Corpo:** salute, sessualità, identità fisica. Registro alto. Richiede gestione contenuti attenta.

**Stagione 4 — Pianeta:** dilemmi sistemici, ambientali, politici. Registro massimo. Potenziale virale alto ma gestione complessa.

Ogni stagione ha estetica propria, palette, musica, set di situazioni dedicate. Chi ha giocato la stagione precedente porta con sé il profilo accumulato — che diventa rilevante nelle nuove situazioni.

## Evoluzione 2 — Profilo Condivisibile

Il profilo silenzioso come oggetto sociale. Dopo N sessioni il sistema genera una card condivisibile — non un'etichetta psicologica, una storia.

Non "sei un protettore". Ma:

> *"In 20 sessioni hai scelto di rischiare per qualcun altro 14 volte. Hai mentito una volta. Era per proteggere tuo figlio."*

Questa card è condivisibile, leggibile in pochi secondi, emotivamente caricata, e genera immediatamente la domanda "come hai risposto tu?". È la struttura virale di Wordle applicata all'identità invece che a una parola.

## Evoluzione 3 — Storie Vere

Collaborazioni con giornalismo narrativo, true crime, casi etici reali anonimizzati. Le situazioni di TENSOR diventano adattamenti di casi reali con l'esito originale svelato dopo il finale.

*"Hai scelto di non denunciare. Nella storia vera, il protagonista ha fatto lo stesso. Tre anni dopo..."*

Questo aggiunge un layer di realtà che amplifica il pathos senza aumentare i costi di produzione narrativa — i casi reali sono già scritti.

Richiede partnership editoriali e gestione attenta dei diritti e dell'anonimizzazione.

## Evoluzione 4 — Modalità Asincrona Sociale

Due giocatori noti (amici, partner, colleghi) giocano la stessa storia separatamente. Poi vedono come ha scelto l'altro.

Non in tempo reale. Non competitivo. Solo: *"ecco come ha scelto lui/lei sulla stessa situazione."*

Questo è potenzialmente il formato più intimo e discusso del sistema. Apre conversazioni reali su valori e identità tra persone che si conoscono. Il word-of-mouth organico di questo formato è difficile da replicare con qualsiasi campagna paid.

Richiede sistema di inviti, gestione privacy, e UI dedicata per il reveal comparativo.

## Evoluzione 5 — White Label / B2B

Il sistema di dilemmi morali con profilazione silenziosia ha applicazioni in formazione aziendale, selezione del personale, training etico professionale (medicina, diritto, giornalismo).

Il white label non è una deriva — è un mercato parallelo con willingness to pay molto più alta rispetto al consumer. Una enterprise che usa TENSOR per onboarding etico paga ordini di grandezza di più rispetto a un abbonamento consumer.

Richiede prodotto consumer maturo come proof of concept e team commerciale dedicato. Non Fase 1, non Fase 2. Ma da tenere a mente nell'architettura del sistema fin dall'inizio.

## Evoluzione 7 — Il Mondo che Ascolta

*(vedi Sezione 7 aggiornata — questa evoluzione è già nel sistema)*

---

## Evoluzione 6 — Input Libero con AI

La Kobayashi Maru in forma estrema: il giocatore scrive liberamente la propria risposta al dilemma. L'AI valuta se la risposta è coerente con le regole della situazione e genera il ramo narrativo conseguente.

È la feature più affascinante e più rischiosa. La qualità emotiva non è garantibile. Va trattata come modalità opt-in premium, mai come default.

**Condizione di attivazione:** solo dopo che il sistema ha un profilo solido del giocatore (10+ sessioni) e può usare quel profilo per vincolare l'engine narrativo verso risposte coerenti con la storia personale del giocatore stesso.

---

## Appendice 4 — DNA del Sistema: Schema Ontologico

> Il documento completo degli schemi vive in `TENSOR_schemas_v1.md`.
> Questa appendice definisce la relazione tra lo schema e il GDD, per evitare ambiguità operative.

### Cos'è lo schema ontologico

Lo schema ontologico è l'infrastruttura epistemica del content engine. Non è un archivio di etichette psicologiche — è una matrice di produzione e osservazione. Definisce come il sistema vede, non cosa il sistema dice.

È composto da tre file separati con responsabilità distinte e non sovrapponibili.

### Tripartizione fondamentale

| File | Responsabilità | Non contiene |
|---|---|---|
| `profile_dimensions.json` | Vocabolario osservativo — quali assi esistono, come si misurano, quando sono stabili | Storie, prototipi, logica narrativa |
| `prototype.json` | Forme morali ricorrenti — struttura archetipica, dimensioni mobilitate, failure modes | Istanze concrete, testo giocabile |
| `scene.json` | Istanze giocabili — testo, scelte, segnali, flag narrativi | Teoria, relazioni astratte tra dimensioni |

**Regola di separazione:** ogni concetto vive in un file solo. Se lo stesso dato appare in due file, uno dei due è una vista editoriale — dichiarare esplicitamente quale è la fonte di verità.

### Relazione con il Modello di Produzione (Sezione 6)

Il modello atomico descritto in Sezione 6 — unità narrative minime con input/output definiti — si implementa attraverso lo schema ontologico. Una "unità narrativa" nel senso produttivo è una `scene.json` popolata. Un "prototipo" nel senso produttivo è un `prototype.json` che referenzia dimensioni già definite in `profile_dimensions.json`.

**Ordine di produzione obbligatorio:**
1. Definire la dimensione in `profile_dimensions.json`
2. Costruire il prototipo in `prototype.json` referenziando le dimensioni
3. Scrivere la scena in `scene.json` referenziando il prototipo

Invertire l'ordine produce incoerenza ben formattata.

### Relazione con il Profilo Silenzioso (Sezione 7)

Le dimensioni descritte in Sezione 7.8 corrispondono agli oggetti in `profile_dimensions.json`. Le regole di linguaggio osservativo (Sezione 7.4), le soglie di confidenza progressiva (Sezione 7.5), e il criterio di item masking (Sezione 7 — Criticità #2) sono operative solo se implementate nei campi `stability_requirement`, `reveal_policy`, e `bias_risk` di ogni dimensione.

**In caso di conflitto tra il testo del GDD e lo schema:** lo schema è la fonte di verità. Il GDD descrive l'intenzione. Lo schema implementa i vincoli.

### Prototipi definiti a oggi

| ID | Label | Famiglia | Versione | Stato |
|---|---|---|---|---|
| `il_testimone` | Il Testimone | sociale | 0.1 | approvato |
| `il_custode` | Il Custode | sociale | 0.1 | approvato |
| `il_debitore` | Il Debitore | sociale | 0.1 | approvato |

### Tredici prototipi del pool narrativo

Tre territori, undici prototipi nominati, due in sviluppo:

**Territorio sociale:**
Il Custode, Il Debitore, Il Testimone, Il Traditore, Il Giudice, Il Complice, Il Ribelle, Il Solitario

**Territorio sistemi:**
Il Figlio, Il Soldato *(da sviluppare)*

**Territorio corpo:**
Il Sopravvissuto, Il Corpo Mortale, Il Limite *(da sviluppare)*

### Regole trasversali operative

Queste regole non appartengono a nessun singolo file — governano tutti e tre.

**Response time:** non può mai stabilizzare da solo una dimensione. È un modulatore, non una base.

**Linguaggio dei reveal:** esclusivamente osservativo e frequenziale. Mai diagnostico. Mai etichette identitarie.

**max_masked_only_ratio:** una dimensione non è stabile se oltre il 70% delle osservazioni proviene da nodi mascherati.

**Soglie di confidenza progressiva:**

| Sessioni | Comportamento |
|---|---|
| 1–4 | Osservazione silenziosa |
| 5–9 | Ipotesi leggere, formule frequenziali |
| 10–19 | Storie calibrate, contraddizioni nominabili |
| 20+ | Contraddizioni interne, momento meta (una volta sola) |

### Nota etica

Lo schema ontologico è uno strumento di osservazione, non di diagnosi. La distinzione non è retorica — ha conseguenze dirette su come vengono scritti i reveal, su come vengono comunicate le dimensioni al giocatore, e su come il sistema risponde a pattern che potrebbero indicare distress.

Il sistema non sa chi è il giocatore. Sa come ha scelto, quante volte, in quali contesti. La differenza deve essere mantenuta in ogni strato del prodotto: tecnico, editoriale, comunicativo.

---

*TENSOR GDD v0.4 — Documento di lavoro*
