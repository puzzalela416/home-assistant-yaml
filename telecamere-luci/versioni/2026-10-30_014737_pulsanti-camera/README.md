# Comandi cancello e luci nella plancia telecamere

Pagina: http://192.168.0.124/dashboard-casa/controllo-telecamere

Sotto il video Cancello, sette pulsanti in ordine di lettura: Cancello, Giardino, Parcheggio, Torre ingresso, Torre orto, Ciabatta volante, Capanno. Cancello chiama switch.turn_on sul solo relè power; il dispositivo ha già inching abilitato, che non è stato modificato. Gli altri sei pulsanti chiamano switch.toggle sul solo relè power. Nessun comando a LED, inching, impostazioni o interi dispositivi.

Negli angoli vuoti del PTZ Tracking: faretto Tracking in alto a sinistra, faretto Ingresso in alto a destra. Nel PTZ Piazzale: proprio faretto in alto a sinistra. Un tocco chiama light.toggle; icona gialla quando acceso. Pressione lunga e doppio tocco disabilitati sui nuovi pulsanti. I comandi direzionali precedenti sono invariati.

La modifica parte dalla plancia online corrente, conservando il nuovo ordine delle telecamere e la sezione di pulsanti aggiunta dall’utente. Nessuna modifica ad automazioni, pacchetti o risorse.

Backup PRIMA/DOPO sul PC in /home/dedroid/ottimizzazione-automazioni-ha/backup-corrente/. Le copie della vista prima/dopo sono conservate in questa nuova cartella GitHub; nessun file storico sovrascritto.

Verifica: lettura della configurazione salvata dal server, controllo entità e test browser dei dieci pulsanti con chiamate intercettate prima dell’invio. Nessun azionamento reale di cancello o luci. Risultati nel verbale JSON. Screenshot con soli riquadri video oscurati nella copia documentale.
