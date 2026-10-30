# Centro controllo telecamere — 30 ottobre 2026

Pagina live: http://192.168.0.124/dashboard-casa/controllo-telecamere

11 telecamere attive, un riquadro con streaming live per ciascuna. Layout nativo a sezioni: aprire la matita e trascinare le sezioni per cambiarne l’ordine, senza modificare YAML. Le colonne si adattano allo schermo. Nessuna didascalia o regolazione della sensibilità.

Tracking, Piazzale e Sala hanno quattro frecce, arresto centrale e selezione delle posizioni preimpostate già presenti nelle telecamere. Tenere premuta una freccia avvia il movimento; rilasciarla invia l’arresto. Nessuna azione more-info sulla pressione lunga. Gli script arrestano comunque dopo 15 secondi se il rilascio non arriva al server. Tracking/Piazzale usano reolink.ptz_move a velocità 10; Sala usa button.press perché non espone il controllo della velocità. Il selettore può mostrare unknown finché non viene richiamata una posizione: le opzioni disponibili sono presenti.

## File e installazione

- VISTA-CONTROLLO-PRIMA.json: vista precedente conservata.
- VISTA-CONTROLLO.json: nuova vista da inserire nel dashboard-casa, percorso controllo-telecamere.
- centro_controllo_telecamere.yaml: package installato in /homeassistant/packages/; sei script PTZ. Richiede inclusione packages già configurata sul server.
- MAPPA-CAMERE.json: entità effettive e capacità PTZ, senza token dei flussi.
- INSTALLAZIONE.json, VERIFICA-HA.json, TEST-BROWSER.json: verbali di pubblicazione e controlli.
- plancia-frame-oscurati.png: screenshot del layout con immagini oscurate solo nella copia documentale.

La risorsa button-card era già installata ed è stata riutilizzata. Le altre viste, scripts.yaml e le automazioni di sensibilità, luci e filtrazione non sono stati modificati.

## Verifica

Browser collegato al server reale: 11/11 video in riproduzione con tempo che avanza; nessuna scheda di errore e nessun errore JavaScript. Provate tutte le 12 frecce con pressione di 900 ms e rilascio. I comandi di movimento sono stati intercettati nel browser: test delle azioni dell’interfaccia, senza ruotare fisicamente le telecamere. I tre script STOP sono stati eseguiti realmente e hanno risposto senza errori. Preset ed entità controllati senza richiamare posizioni. Non è stata eseguita una prova fisica della rotazione né una prova nell’app Android.

Backup locali PRIMA.zip e DOPO.zip in /home/dedroid/ottimizzazione-automazioni-ha/backup-corrente/. Versione GitHub aggiunta in una nuova cartella datata, senza sovrascrivere i file precedenti.
