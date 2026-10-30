# Luci esterno: limite 00:30 e precedenza allo spegnimento manuale

## Regole attive

- Parcheggio e Ciabatta volante: dal tramonto all’alba.
- Giardino e Torre ingresso: dal tramonto alle 21:30.
- Dalle 21:30 alle 00:30: una coppia casuale di Giardino, Torre ingresso, Torre Orto, Capanno ogni 30 minuti; nessuna ripetizione consecutiva della stessa coppia.
- Dalle 00:30 all’alba: le quattro luci non sono più mantenute accese dal programma; restano attive le quattro fotocellule delle telecamere (Cancello→Giardino, Ingresso→Torre ingresso, Orto→Torre Orto, Piscine→Capanno). Il timer scatta alla fine del movimento e spegne dopo due minuti senza altri rilevamenti.
- All’alba termina il funzionamento notturno. Le automazioni restano abilitate per poter ripartire autonomamente al tramonto; durante il giorno le condizioni solari impediscono le accensioni delle fotocellule. Il comando generale non viene spento ogni mattina.
- Priorità allarme conservata.

Alle 00:30 il programma cede la gestione alle fotocellule: una luce può restare accesa se c’è movimento o se sono ancora in corso i due minuti dall’ultimo rilevamento. Questo non è più una richiesta del programma temporale.

## Conflitto risolto

Prima, ogni passaggio di una delle sei luci a off avviava immediatamente il programma che riaccendeva le uscite previste dalla fascia. La traccia di Torre ingresso delle 01:49:02 del 30/10 lo confermava.

Adesso uno spegnimento manuale salva una esclusione per la luce e per l’attuale intervallo di 30 minuti. La luce resta sotto gestione del programma, ma la sua accensione viene saltata: anche la fotocellula rispetta la proprietà del programma. Alla fascia successiva l’esclusione scade. Parcheggio e Ciabatta hanno la stessa eccezione manuale, senza cambiare il loro orario ordinario.

Il contesto dello stato distingue comandi con utente e cambiamenti diretti senza parent_id dagli spegnimenti figli di automazioni. Gli spegnimenti automatici con contesto collegato non creano esclusioni. Un dispositivo che perde il contesto del comando può apparire come cambiamento diretto: è il limite dell’identificazione tramite contesti HA.

La memoria è input_text.programma_luci_esclusioni, persistente e legata alla data/notte e fascia; la memoria delle coppie casuali resta separata. Esecuzioni accodate, così gli eventi di spegnimento non vengono scartati durante un’esecuzione già in corso.

## Modifiche sul server

Aggiornato solo /homeassistant/packages/programma_luci_esterno_v1.yaml. Creato il nuovo helper mediante input_text.reload; ricaricati automation e template, senza riavviare HA. Riabilitata automation.fotocellula_ingresso_torre_ingresso_2_minuti, trovata disabilitata. La vecchia automazione faretto Ingresso→Torre ingresso resta disabilitata. Nessuna modifica alle automazioni di allarme o alla plancia telecamere.

## Verifiche e ripristino

Configurazione verificata da HA. Test sulle regole effettive: nove confini orari, spegnimento manuale utente/fisico, distinzione da automazione, persistenza e scadenza esclusione, blocco accensione di una luce esclusa. Otto casi renderizzati anche dal motore template del server, senza azionare uscite per simulare orari. Tracce runtime e stati sono conservati localmente; verbali sintetici allegati. Prova reale: Torre ingresso si è spenta alle 01:59:32 e riaccesa alle 01:59:36 per un nuovo movimento, confermato dalla traccia della fotocellula. Il programma temporale non ha forzato la riaccensione. L’esclusione durante la fascia casuale è stata verificata sui template e sul codice, senza cambiare l’ora del server.

Per ripristinare il codice: rimettere il file PRIMA nel percorso package e ricaricare i domini. Lo stato iniziale della fotocellula Ingresso era off; il DOPO è on. Backup completi delle configurazioni prima/dopo in /home/dedroid/ottimizzazione-automazioni-ha/backup-corrente/. Il backup integrale HA originale è conservato separatamente.

Pubblicazione GitHub in una nuova cartella datata, senza modificare o cancellare file precedenti.
