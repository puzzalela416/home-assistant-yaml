# Censimento generale del lavoro — 30 ottobre 2026

Rilevazione sul vero Home Assistant, senza modificare automazioni o attuatori durante il censimento. Tutti gli aggiornamenti GitHub di questo censimento sono **nuovi file datati**: nessun file precedente viene sovrascritto o cancellato.

## Stato del server

| Misura | Totale |
|---|---:|
| Automazioni nell’inventario iniziale del 29/10 | 57 |
| Automazioni caricate oggi | 55 |
| Attive | 44 |
| Disattivate | 11 |
| Nuove automazioni create nel lavoro | 9 |
| Originali non presenti nel runtime odierno | 11 |

Il conto è **57 originali − 11 oggi non caricate + 9 nuove = 55 attuali**. Non confondere “non caricata” con “disabilitata”. Le undici assenze sono rispetto all’inventario iniziale, **non una nuova differenza dall’ultimo salvataggio**: i file attuali corrispondono alle ultime revisioni conservate. Il censimento non attribuisce a una persona o a un intervento la rimozione di una definizione senza evidenza.

## Sezioni e versioni operative

| Sezione | Lavoro effettuato | Versione/documenti |
|---|---|---|
| Filtrazione e HA | Regia 40–110 / 70–159 cm, energia solo all’avvio, supervisione e diagnostiche | [Regia e prove](https://github.com/puzzalela416/home-assistant-yaml/tree/main/filtrazione-acque/versioni/2026-10-29_191041_regia-comando) · [Sezione aggiornata](../../filtrazione-acque/censimenti/2026-10-30/README.md) |
| https://github.com/puzzalela416/test/tree/codex-cisterne-potabile40-20261022/plc/filtrazione-v2/versioni | Progetto autonomo v2.0.1, massimi e watchdog, Q3/Q4 solidali a Q2 | [Storico https://github.com/puzzalela416/test/tree/codex-cisterne-potabile40-20261022/plc/filtrazione-v2/versioni](https://github.com/puzzalela416/test/tree/codex-cisterne-potabile40-20261022/plc/filtrazione-v2/versioni) |
| Telecamere e fotocellule | Sensibilità indipendente su 11 camere, 4 fotocellule e Philips corretto | [Versione iniziale](https://github.com/puzzalela416/home-assistant-yaml/tree/main/telecamere-luci/versioni/2026-10-29_203022_telecamere-fotocellule-v1) · [Sezione aggiornata](../../telecamere-luci/censimenti/2026-10-30/README.md) |
| Allarme esterno | Solo cinque uscite di potenza, esclusi i parametri Sonoff | [Correzione](https://github.com/puzzalela416/home-assistant-yaml/tree/main/telecamere-luci/versioni/2026-10-29_211150_allarme-esterno) |
| Programma luci | Coppie variabili ogni 30 minuti, due luci fisse e fotocellule coordinate | [Versione operativa](https://github.com/puzzalela416/home-assistant-yaml/tree/main/luci-esterno/versioni/2026-10-29_222520_programma-luci-casuale) · [Sezione aggiornata](../../luci-esterno/censimenti/2026-10-30/README.md) |

**File telecamere corrente:** dopo il coordinamento luci va usato il package nella versione del programma luci, non quello precedente della sola revisione telecamere. Le versioni vecchie restano documenti storici.

## Regole correnti riassunte

- **Filtrazione:** HA anticipa sotto 40/70 cm e rilascia a 110/159 cm. Avvii 10–16 con SOC totale banco >=35% e nessun prelievo dei due inverter, compresa carica da rete; consenso controllato soltanto all’avvio. Un ciclo già iniziato può finire dopo le 16 o se cambia l’energia. https://github.com/puzzalela416/test/tree/codex-cisterne-potabile40-20261022/plc/filtrazione-v2/versioni conserva autonomia, emergenze, filtri e massimi 115/160 cm.
- **Ricircolo/cloratore:** Q3 e Q4 seguono Q2 nella https://github.com/puzzalela416/test/tree/codex-cisterne-potabile40-20261022/plc/filtrazione-v2/versioni, **nessuno spegnimento ritardato**.
- **Controlavaggi:** calendario dei timer UTC+02 fisso, quindi filtro 2 alle 09 inverno/10 estate e filtro 3 alle 13/14; allarme dopo 40 minuti se il ciclo non è riconosciuto.
- **Sensibilità:** una automazione con 11 conteggi/finestre indipendenti, >=10 cambi in 5 minuti riducono di 2 fino al minimo; profili giorno 42/notte 5. Il minimo 1 non garantisce assenza di falsi.
- **Fotocellule:** Cancello→Giardino, Ingresso→Torre ingresso, Piscine→Capanno, Orto→Torre Orto; due minuti dalla cessazione dell’ultimo movimento, di notte. Faretti nativi, Parcheggio/Ciabatta senza fotocellula. Pulsante Philips breve ON/lungo OFF per Torre Orto e Ciabatta.
- **Programma luci:** Parcheggio/Ciabatta tramonto-alba; Giardino/Ingresso fino 21:30; coppia casuale di due fra quattro ogni 30 minuti fino 02:00, diversa dalla precedente e memorizzata. **Alle 02 termina il programma delle quattro luci, ma restano abilitate le fotocellule fino all’alba.** Nessun blocco delle fotocellule è stato installato: la bozza diversa è stata scartata dopo il chiarimento dell’utente.
- **Allarme:** mantiene sequenza e notifiche originali, con bersagli corretti alle sole cinque uscite di potenza. Ha priorità sui programmi. “Spegni esterno all’alba” resta invariata su richiesta esplicita.

## Verifiche eseguite e loro limiti

| Ambito | Evidenza | Limite |
|---|---|---|
| Progetto https://github.com/puzzalela416/test/tree/codex-cisterne-potabile40-20261022/plc/filtrazione-v2/versioni | 13 gruppi logici, 880 combinazioni ai limiti, 12.000 scansioni del modello FBD; protocollo 2 letto | Non certifica il cablaggio o tutti i cicli idraulici reali |
| HA filtrazione | 182 scenari regia +46 energetici; presenza/rilascio e watchdog provati realmente su HA e registri https://github.com/puzzalela416/test/tree/codex-cisterne-potabile40-20261022/plc/filtrazione-v2/versioni | Nessun avvio forzato di pompe/riempimenti, collaudo fisico pendente |
| Diagnostica | 12 spie in 40 scenari, calendario in 441 casi | Non sono stati provocati guasti o falsificati ingressi fisici |
| Telecamere | 11 scritture reali con rilettura; 11 dispatch reali delle finestre a conteggio zero | Condizioni meteo/rilevamento da valutare sul campo |
| Fotocellule | Quattro scadenze native da 120 s; 1024 combinazioni con coordinamento del programma | Non provate artificialmente tutte le accensioni da movimento |
| Allarme esterno | Differenza dei bersagli, sequenza e altri blocchi invariati, validazione HA | Allarme e notifiche non forzati nei test |
| Programma luci | 232 scenari, uscite verificate sul server, memoria stabile; cambi reali di più fasce osservati | Non significa collaudo completo di ogni notte/stagione |

Non viene dichiarato un “100% funzionale” dell’impianto fisico. Le automazioni non toccate restano da ottimizzare; le quattro automazioni allarme assenti sotto vanno valutate prima di un eventuale ripristino.

## Documenti consultabili

- [57 automazioni originali con stato aggiornato](#le-57-automazioni-originali).
- [CSV](AUTOMAZIONI-ORIGINALI-57.csv) e [JSON completo](CENSIMENTO.json).
- [Analisi dettagliata iniziale del 29/10](report-iniziale/INVENTARIO-AUTOMAZIONI.md): fotografia storica, non descrizione attuale.
- [File operativi fotografati oggi](snapshot-ha/README.md).
- [Cronologia degli interventi](CRONOLOGIA.md).
- [File e versione autorevole per ogni sezione](FILE-INSTALLATI.md).
- `CENSIMENTO-GENERALE.html`: copia autonoma da scaricare e aprire nel browser.

## Automazioni originali oggi non caricate

| N. | Nome | Nota |
|---:|---|---|
| 8 | Arm alarm | Non riscritta nel lavoro; originale nel backup iniziale |
| 9 | Arm alarm porta | Non riscritta nel lavoro; originale nel backup iniziale |
| 27 | Movimento cancello accende giardino | Sostituita dai nuovi moduli |
| 28 | Movimento esterno accende torre ingresso | Sostituita dai nuovi moduli |
| 30 | Movimento orto accende luci | Sostituita dai nuovi moduli |
| 31 | Piscine - riduci sensibilità per continui cambi movimento | Sostituita dai nuovi moduli |
| 45 | spegnimento torre ingresso spegne faretto telecamer aingresso | Sostituita dai nuovi moduli |
| 48 | Spia allarme | Non riscritta nel lavoro; originale nel backup iniziale |
| 49 | Spia allarme disinserito | Non riscritta nel lavoro; originale nel backup iniziale |
| 55 | Telecamere - Sensibilità Giorno | Sostituita dai nuovi moduli |
| 56 | Telecamere - Sensibilità Notte | Sostituita dai nuovi moduli |

## Le 57 automazioni originali

| N. | Nome | Stato HA oggi | Lavoro/stato |
|---:|---|---|---|
| 1 | Allarme casa - Contatti perimetrali + notifica | on | da ottimizzare |
| 2 | Allarme innescato scatta foto | on | da ottimizzare |
| 3 | Allarme innescato spia letto | on | da ottimizzare |
| 4 | Allarme innescato= esterno acceso | on | corretta: bersagli limitati a cinque uscite potenza; sequenza e notifiche invariate; verifica configurazione superata, nessun allarme forzato |
| 5 | Allarme notte - Inserimento automatico e controllo aperture | on | da ottimizzare |
| 6 | allarme suona sirena | on | da ottimizzare |
| 7 | areazione con velux tutti i giorni | on | da ottimizzare |
| 8 | Arm alarm | non caricata | non presente nella lettura attuale; non riscritta in questo lavoro, originale disponibile nel backup iniziale |
| 9 | Arm alarm porta | non caricata | non presente nella lettura attuale; non riscritta in questo lavoro, originale disponibile nel backup iniziale |
| 10 | Arma allarme double | on | da ottimizzare |
| 11 | betatest sirena | on | da ottimizzare |
| 12 | Caldo fuori apre velux | on | da ottimizzare |
| 13 | Chiusura velux | on | da ottimizzare |
| 14 | Cortesia bagno | on | da ottimizzare |
| 15 | Cortesia da fumo | on | da ottimizzare |
| 16 | Cortesia letto | on | da ottimizzare |
| 17 | Cortesia scale | on | da ottimizzare |
| 18 | Disarm alarm | on | da ottimizzare |
| 19 | disarm double allarm | on | da ottimizzare |
| 20 | faretto telecamera ingresso accende fari torre ingresso | on | conservata disabilitata: faretti gestiti nativamente dalle telecamere |
| 21 | finestre aperte | on | da ottimizzare |
| 22 | Growatt - Allarmi e comunicazione USB | on | da ottimizzare |
| 23 | Ingresso apre, luce  accende | on | da ottimizzare |
| 24 | Interruttore ingresso accende luci | on | da ottimizzare |
| 25 | Interruttore sonoff | on | corretta: Philips breve ON/lungo OFF, sole uscite potenza, priorità manuale Torre Orto |
| 26 | Luci parcheggio al tramonto | off | sostituita dal programma notturno casuale, conservata disabilitata |
| 27 | Movimento cancello accende giardino | non caricata | sostituita da nuovi moduli; definizione non caricata nel runtime attuale, originale archiviata |
| 28 | Movimento esterno accende torre ingresso | non caricata | sostituita da nuovi moduli; definizione non caricata nel runtime attuale, originale archiviata |
| 29 | movimento interno trigger alarm | off | da ottimizzare |
| 30 | Movimento orto accende luci | non caricata | sostituita da nuovi moduli; definizione non caricata nel runtime attuale, originale archiviata |
| 31 | Piscine - riduci sensibilità per continui cambi movimento | non caricata | sostituita da nuovi moduli; definizione non caricata nel runtime attuale, originale archiviata |
| 32 | PR205 DIAG - Fine finestra controlavaggio | on | diagnostica attiva e verificata nei percorsi disponibili; collaudo fisico dei cicli pendente |
| 33 | PR205 DIAG - Inizio controlavaggio multi-stadio | on | diagnostica attiva e verificata nei percorsi disponibili; collaudo fisico dei cicli pendente |
| 34 | PR205 DIAG - Memoria chiusura Q2 per Q3 | on | diagnostica attiva e verificata nei percorsi disponibili; collaudo fisico dei cicli pendente |
| 35 | Ptz cancello | on | da ottimizzare |
| 36 | ptz loggiato | on | da ottimizzare |
| 37 | Ricircolo cisterna pozzo | off | sostituita dalla regia centrale HA 40–110 / 70–159, energia solo avvio; originale disabilitata e archiviata; collaudo fisico pendente |
| 38 | Riempimento cisterna potabile | off | sostituita dalla regia centrale HA 40–110 / 70–159, energia solo avvio; originale disabilitata e archiviata; collaudo fisico pendente |
| 39 | riempimento cisterna pozzo | off | sostituita dalla regia centrale HA 40–110 / 70–159, energia solo avvio; originale disabilitata e archiviata; collaudo fisico pendente |
| 40 | Sensibilità telecamera ridotta | off | sostituita dalla sensibilità adattiva unica per 11 camere; originale conservata disabilitata |
| 41 | Spegni esterno all' Alba | on | analizzata; invariata su richiesta esplicita dell’utente |
| 42 | Spegni riempimento potabile | off | sostituita dalla regia centrale HA 40–110 / 70–159, energia solo avvio; originale disabilitata e archiviata; collaudo fisico pendente |
| 43 | Spegnimenti riempimento cisterna pozzo | off | sostituita dalla regia centrale HA 40–110 / 70–159, energia solo avvio; originale disabilitata e archiviata; collaudo fisico pendente |
| 44 | spegnimento automatico cloratore | off | sostituita dalla regia centrale HA 40–110 / 70–159, energia solo avvio; originale disabilitata e archiviata; collaudo fisico pendente |
| 45 | spegnimento torre ingresso spegne faretto telecamer aingresso | non caricata | sostituita da nuovi moduli; definizione non caricata nel runtime attuale, originale archiviata |
| 46 | Spengi cortesia casa | on | da ottimizzare |
| 47 | Spengi sonoff con pulsante philips | on | corretta: Philips breve ON/lungo OFF, sole uscite potenza, priorità manuale Torre Orto |
| 48 | Spia allarme | non caricata | non presente nella lettura attuale; non riscritta in questo lavoro, originale disponibile nel backup iniziale |
| 49 | Spia allarme disinserito | non caricata | non presente nella lettura attuale; non riscritta in questo lavoro, originale disponibile nel backup iniziale |
| 50 | Spia allarme scale | on | da ottimizzare |
| 51 | Spia esterno - Settori | on | da ottimizzare |
| 52 | Switch andrea accende letto | on | da ottimizzare |
| 53 | switch hue Spegni luci sala | on | da ottimizzare |
| 54 | Switch lucia accende letto | on | da ottimizzare |
| 55 | Telecamere - Sensibilità Giorno | non caricata | sostituita da nuovi moduli; definizione non caricata nel runtime attuale, originale archiviata |
| 56 | Telecamere - Sensibilità Notte | non caricata | sostituita da nuovi moduli; definizione non caricata nel runtime attuale, originale archiviata |
| 57 | Test | off | da ottimizzare |

## Le nove automazioni aggiunte

| Nome | Entità | Stato |
|---|---|---|
| Filtrazione v2 - Presenza HA | `automation.filtrazione_v2_presenza_ha` | on |
| Filtrazione v2 - Rilascio supervisione | `automation.filtrazione_v2_rilascio_supervisione` | on |
| Filtrazione v2 - Regia automatica cisterne | `automation.filtrazione_v2_regia_automatica_cisterne` | on |
| Telecamere - Sensibilità adattiva e profili giorno notte | `automation.telecamere_sensibilita_adattiva_e_profili_giorno_notte` | on |
| Fotocellula - Cancello → Giardino - 2 minuti | `automation.fotocellula_cancello_giardino_2_minuti` | on |
| Fotocellula - Ingresso → Torre ingresso - 2 minuti | `automation.fotocellula_ingresso_torre_ingresso_2_minuti` | off |
| Fotocellula - Piscine → Capanno - 2 minuti | `automation.fotocellula_piscine_capanno_2_minuti` | on |
| Fotocellula - Orto → Torre Orto - 2 minuti | `automation.fotocellula_orto_torre_orto_2_minuti` | on |
| Luci esterno - Programma notturno e coppie casuali | `automation.luci_esterno_programma_notturno_e_coppie_casuali` | on |

## Cambi luci osservati realmente

| Ora locale | Fascia della notte | Coppia programmata |
|---|---|---|
| 29/10/2026 22:22:40 | `2026-10-29#1` | orto + giardino |
| 29/10/2026 22:30:00 | `2026-10-29#2` | orto + capanno |
| 29/10/2026 23:00:00 | `2026-10-29#3` | giardino + ingresso |
| 29/10/2026 23:30:00 | `2026-10-29#4` | ingresso + capanno |
| 30/10/2026 00:00:00 | `2026-10-29#5` | orto + capanno |

## Backup e conservazione

Backup completo iniziale e inventario originali conservati sul PC. La coppia locale PRIMA.zip/DOPO.zip segue l’ultimo intervento di configurazione; questo censimento è in sola lettura e non sostituisce la coppia con un finto intervento. Le fotografie private attuali restano sul PC. Su GitHub tutte le versioni precedenti sono mantenute; questo aggiornamento aggiunge solo nuovi documenti/copie datati. Nessuna automazione ripristinata o rimossa dal censimento.
