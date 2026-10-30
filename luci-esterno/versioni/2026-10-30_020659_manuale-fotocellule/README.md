# Correzione spegnimento manuale anche dopo 00:30

La precedente esclusione manuale proteggeva solo le luci selezionate dal programma temporale. Dopo le 00:30 la fotocellula Ingresso poteva riaccendere Torre ingresso al successivo movimento, anche pochi secondi dopo uno spegnimento manuale. Le tracce del 30/10 alle 02:05:29–02:05:30 locali confermano questo percorso.

La memoria di esclusione adesso registra gli spegnimenti manuali notturni di tutte e sei le luci, anche quando non sono selezionate dal programma. Le quattro fotocellule verificano la stessa memoria prima di accendere. L’esclusione scade all’intervallo di 30 minuti successivo: ad esempio, uno spegnimento alle 02:07 resta prioritario fino alle 02:30. Non disabilita la fotocellula; non crea blocchi permanenti. La priorità dell’allarme rimane. La distinzione manuale/automatico usa i contesti di HA, con il limite già documentato per dispositivi che non conservano il contesto.

Disattivata esplicitamente la vecchia automation.faretto_telecamera_ingresso_accende_fari_torre_ingresso: risultava ancora attiva ed è sostituita dalla nuova fotocellula. Nessuna automazione cancellata. Prima/dopo ricarica controllati gli stati delle altre automazioni disattivate e preservati.

Conservati gli orari autorizzati: coppie casuali 21:30–00:30; quattro luci su movimento fino alba; Parcheggio/Ciabatta dal tramonto all’alba. Nessuna modifica a sensibilità, allarme, impianto acqua o plance.

Modificati i due package programma_luci_esterno_v1.yaml e telecamere_fotocellule_v1.yaml in /homeassistant/packages/. Configurazione HA validata e automazioni ricaricate via WebSocket. Test delle 16 combinazioni di esclusione/fascia per le quattro guardie. Prova reale di spegnimento Torre ingresso; successivo movimento reale alle 02:07:06 bloccato dalla guardia, luce rimasta spenta (verbale allegato). Nessun movimento telecamera simulato e nessuna impostazione dell’orologio modificata.

Backup PRIMA/DOPO aggiornati sul PC, /home/dedroid/ottimizzazione-automazioni-ha/backup-corrente/. Questa cartella GitHub aggiunge una versione distinta senza sovrascrivere i file precedenti.
