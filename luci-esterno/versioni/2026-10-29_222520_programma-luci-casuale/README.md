# Programma luci esterno casuale — 2026-10-29_222520_programma-luci-casuale

Automazione **Luci esterno - Programma notturno e coppie casuali** (`automation.luci_esterno_programma_notturno_e_coppie_casuali`). Attiva a fine installazione.

## Programma concordato

| Fascia | Accensioni programmate |
|---|---|
| Giorno | Nessuna |
| Tramonto–21:30 | Parcheggio, Ciabatta volante, Giardino, Torre ingresso |
| 21:30–02:00 | Parcheggio e Ciabatta fissi; una coppia casuale tra Torre Orto, Giardino, Torre ingresso, Capanno |
| 02:00–alba | Parcheggio e Ciabatta fissi; le altre disponibili alle fotocellule |

Coppie variabili: due luci su quattro, sei combinazioni possibili. Una nuova coppia a ogni fascia dell’orologio di 30 minuti, a partire dalle 21:30; la stessa coppia precedente viene esclusa. Non sono due gruppi fissi per tutta la notte. La prima estrazione esclude la coppia Giardino/Ingresso già prevista prima delle 21:30. Se installato o riavviato a metà fascia, applica quella in corso.

**Memoria atomica e persistente**: chiave data-notte/fascia e coppia in un solo `input_text`. Riconciliare ogni minuto o riavviare HA non provoca una nuova estrazione nella medesima fascia. Dopo mezzanotte la chiave resta associata alla sera precedente. Lo stato del programma è `sensor.programma_luci_esterno_stato`; la memoria è `input_text.programma_luci_estrazione`.

## Convivenza con fotocellule e allarme

Le quattro fotocellule restano separate. Un flag per luce impedisce ai loro timer di spegnere un’accensione programmata. Quando una luce esce dal programma: se c’è movimento passa alla sua fotocellula; se il movimento è terminato da meno di 120 secondi riceve solo il tempo residuo; altrimenti si spegne se era gestita dal programma. Una luce non selezionata può quindi accendersi per movimento: non si impone un buio rigido.

L’allarme ha priorità: il programma non ripristina luci durante lampeggi o sequenza d’allarme e si riconcilia dopo. Nessun comando ai faretti nativi. La sensibilità adattiva non cambia. L’automazione generale all’alba resta identica per la scelta precedente dell’utente; le sole uscite del nuovo programma sono le sei luci indicate.

Con programma attivo i suoi target previsti accesi vengono ripristinati se spenti manualmente. **Per sospenderlo usare il controllo `input_boolean.programma_luci_esterno` (“Programma luci esterno”)**, che rilascia correttamente le proprietà alle fotocellule. Non usare la disabilitazione della singola automazione come normale pulsante di pausa.

## File e ripristino

- `packages/programma_luci_esterno_v1.yaml`: nuovo coordinatore, controllo, memoria, flag e stato.
- `packages/telecamere_fotocellule_v1.yaml`: stessa sensibilità adattiva; quattro fotocellule con guardie per il programma.
- `prima/telecamere_fotocellule_v1.yaml`: versione prima del coordinamento.
- `parcheggio-DOPO.yaml`: vecchia accensione a tramonto +15 minuti conservata disabilitata; integrare per ID `1790704217806`, non aggiungere duplicati.
- `parcheggio-PRIMA.yaml`: definizione precedente.
- `docs/`: prove e configurazione delle sei luci.

Gli altri blocchi di `automations.yaml`, inclusa la correzione dell’allarme, sono identici. Nessuna definizione eliminata. I backup completi PRIMA/DOPO rimangono sul PC perché comprendono anche configurazioni private della casa. In caso di ripristino, coordinare il vecchio package delle fotocellule e disabilitare quello del nuovo programma prima di riattivare la vecchia accensione Parcheggio.

## Verifiche

232 scenari su fasi, confini, mezzanotte, memoria invalida, ripartenza e coppie senza ripetizione, eseguiti sul motore template del vero HA. 1024 combinazioni delle fotocellule usando le sequenze YAML e condizioni renderizzate sul server, incluse le nuove guardie del programma. Configurazione validata e ricaricata senza riavvio.

Programma attivato realmente nella fascia in corso, uscite previste rilette da HA, flag e timer delle fotocellule verificati. Due riconciliazioni reali nella stessa fascia mantengono la coppia; nessun allarme forzato e nessuna modifica alla sensibilità. Queste prove non sostituiscono l’osservazione sul posto di tutti i passaggi dell’intera notte.
