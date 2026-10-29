# Cronologia documentata

1. Backup completo HA e analisi iniziale delle 57 automazioni, con report HTML/Markdown/CSV e sorgenti di riferimento.
2. Definizione di PLC autonomo e HA supervisore; individuazione del vero sorgente OWLE indicato dall’utente.
3. Generazione PLC v2.0, errore ALP dovuto ai metadati, correzione v2.0.1 senza cambiare logica/registri. Caricamento confermato dall’utente; protocollo 2 verificato.
4. Migrazione HA al watchdog e alle richieste specifiche; vecchi comandi globali ritirati.
5. Prima plancia e confronto basati su fonte errata, conservati come SUPERATI; copia corretta della vista online `dashboard-casa/filtrazione-acque`, poi pubblicazione e occultamento delle vecchie viste senza cancellarle.
6. Correzione del calendario controlavaggi per timer UTC+02 fisso; riclassificazione dei cicli realmente osservati.
7. Regia centrale filtrazione con soglie richieste 40–110 / 70–159, SOC>=35% e zero rete solo all’avvio; prove sul server senza avviare pompe.
8. Sensibilità adattiva indipendente per 11 telecamere e quattro fotocellule; recupero Orto e correzione della sua scheda, Philips corretto, faretti nativi conservati.
9. Correzione dell’allarme esterno: stessi cinque fari, senza LED/inching Sonoff; sequenza e notifiche conservate.
10. Programma notturno con coppie variabili ogni mezz’ora e memoria persistente; protezione dei timer fotocellule, Parcheggio/Ciabatta fissi.
11. Chiarimento del 30/10: dopo le 02 termina la programmazione delle quattro luci, restano abilitate le fotocellule. Una bozza di blocco delle fotocellule è stata preparata localmente e scartata, **mai applicata**. Il programma già installato è quello richiesto.
12. Censimento generale con lettura corrente del server, riconciliazione delle 11 assenze rispetto all’inventario iniziale e verifica dei cambi reali attraverso mezzanotte. Nessun ripristino o cancellazione effettuato durante il censimento.

Le revisioni GitHub sono consultabili nelle cartelle `filtrazione-acque/versioni`, `telecamere-luci/versioni`, `luci-esterno/versioni` e nello storico PLC del ramo `codex-cisterne-potabile40-20261022`. I file temporanei non conservati in origine non vengono ricostruiti artificialmente.
