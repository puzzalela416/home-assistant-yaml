# Avanzamento ottimizzazione

Regia centrale filtrazione installata e abilitata: **40–110 cm potabile, 70–159 cm pozzo; avvii 10–16, SOC >=35% e zero rete solo all’avvio**. Fine fascia non interrompe i cicli già avviati.

Plancia: http://192.168.0.124/sistema-filtrazione-v2/filtrazione-acque. Censimento: /home/dedroid/ottimizzazione-automazioni-ha/impianto-acqua/riscrittura-regia/CENSIMENTO.md.

PLC v2 invariato; Q3/Q4 seguono Q2 senza spegnimento ritardato. Collaudo idraulico e attuatori ancora da completare. DAB monitorata, non comandata.

GitHub: versioni datate aggiunte senza sovrascrivere file esistenti. Backup locali PRIMA/DOPO aggiornati per ciascun intervento.

| N. | Automazione originale | Stato |
|---:|---|---|
| 1 | Allarme casa - Contatti perimetrali + notifica | da ottimizzare |
| 2 | Allarme innescato scatta foto | da ottimizzare |
| 3 | Allarme innescato spia letto | da ottimizzare |
| 4 | Allarme innescato= esterno acceso | da ottimizzare |
| 5 | Allarme notte - Inserimento automatico e controllo aperture | da ottimizzare |
| 6 | allarme suona sirena | da ottimizzare |
| 7 | areazione con velux tutti i giorni | da ottimizzare |
| 8 | Arm alarm | da ottimizzare |
| 9 | Arm alarm porta | da ottimizzare |
| 10 | Arma allarme double | da ottimizzare |
| 11 | betatest sirena | da ottimizzare |
| 12 | Caldo fuori apre velux | da ottimizzare |
| 13 | Chiusura velux | da ottimizzare |
| 14 | Cortesia bagno | da ottimizzare |
| 15 | Cortesia da fumo | da ottimizzare |
| 16 | Cortesia letto | da ottimizzare |
| 17 | Cortesia scale | da ottimizzare |
| 18 | Disarm alarm | da ottimizzare |
| 19 | disarm double allarm | da ottimizzare |
| 20 | faretto telecamera ingresso accende fari torre ingresso | da ottimizzare |
| 21 | finestre aperte | da ottimizzare |
| 22 | Growatt - Allarmi e comunicazione USB | da ottimizzare |
| 23 | Ingresso apre, luce  accende | da ottimizzare |
| 24 | Interruttore ingresso accende luci | da ottimizzare |
| 25 | Interruttore sonoff | da ottimizzare |
| 26 | Luci parcheggio al tramonto | da ottimizzare |
| 27 | Movimento cancello accende giardino | da ottimizzare |
| 28 | Movimento esterno accende torre ingresso | da ottimizzare |
| 29 | movimento interno trigger alarm | da ottimizzare |
| 30 | Movimento orto accende luci | da ottimizzare |
| 31 | Piscine - riduci sensibilità per continui cambi movimento | da ottimizzare |
| 32 | PR205 DIAG - Fine finestra controlavaggio | diagnostica attiva e verificata nei percorsi disponibili; collaudo fisico dei cicli pendente |
| 33 | PR205 DIAG - Inizio controlavaggio multi-stadio | diagnostica attiva e verificata nei percorsi disponibili; collaudo fisico dei cicli pendente |
| 34 | PR205 DIAG - Memoria chiusura Q2 per Q3 | diagnostica attiva e verificata nei percorsi disponibili; collaudo fisico dei cicli pendente |
| 35 | Ptz cancello | da ottimizzare |
| 36 | ptz loggiato | da ottimizzare |
| 37 | Ricircolo cisterna pozzo | sostituita dalla regia centrale HA 40–110 / 70–159, energia solo avvio; originale disabilitata e archiviata; collaudo fisico pendente |
| 38 | Riempimento cisterna potabile | sostituita dalla regia centrale HA 40–110 / 70–159, energia solo avvio; originale disabilitata e archiviata; collaudo fisico pendente |
| 39 | riempimento cisterna pozzo | sostituita dalla regia centrale HA 40–110 / 70–159, energia solo avvio; originale disabilitata e archiviata; collaudo fisico pendente |
| 40 | Sensibilità telecamera ridotta | da ottimizzare |
| 41 | Spegni esterno all' Alba | da ottimizzare |
| 42 | Spegni riempimento potabile | sostituita dalla regia centrale HA 40–110 / 70–159, energia solo avvio; originale disabilitata e archiviata; collaudo fisico pendente |
| 43 | Spegnimenti riempimento cisterna pozzo | sostituita dalla regia centrale HA 40–110 / 70–159, energia solo avvio; originale disabilitata e archiviata; collaudo fisico pendente |
| 44 | spegnimento automatico cloratore | sostituita dalla regia centrale HA 40–110 / 70–159, energia solo avvio; originale disabilitata e archiviata; collaudo fisico pendente |
| 45 | spegnimento torre ingresso spegne faretto telecamer aingresso | da ottimizzare |
| 46 | Spengi cortesia casa | da ottimizzare |
| 47 | Spengi sonoff con pulsante philips | da ottimizzare |
| 48 | Spia allarme | da ottimizzare |
| 49 | Spia allarme disinserito | da ottimizzare |
| 50 | Spia allarme scale | da ottimizzare |
| 51 | Spia esterno - Settori | da ottimizzare |
| 52 | Switch andrea accende letto | da ottimizzare |
| 53 | switch hue Spegni luci sala | da ottimizzare |
| 54 | Switch lucia accende letto | da ottimizzare |
| 55 | Telecamere - Sensibilità Giorno | da ottimizzare |
| 56 | Telecamere - Sensibilità Notte | da ottimizzare |
| 57 | Test | da ottimizzare |

## Pubblicazione verificata

- Regia HA: https://github.com/puzzalela416/home-assistant-yaml/tree/main/filtrazione-acque/versioni/2026-10-29_191041_regia-comando
- Storico HA: https://github.com/puzzalela416/home-assistant-yaml/blob/main/filtrazione-acque/STORICO-VERSIONI-2026-10-29.md
- Storico PLC: https://github.com/puzzalela416/test/blob/codex-cisterne-potabile40-20261022/plc/filtrazione-v2/STORICO-VERSIONI-2026-10-29.md

69 aggiunte HA e 20 PLC; tutti i file preesistenti conservano il proprio hash. Verificati anche i 48 file locali caricati.

## Telecamere e luci — 2026-10-29_203022_telecamere-fotocellule-v1

Una sensibilità adattiva (11 camere), quattro fotocellule separate, timer 120 s dall’ultimo movimento. Nove definizioni conservate disabilitate; Philips breve ON/lungo OFF, Parcheggio solo programmato, faretti nativi. Alba generale invariata. Censimento: /home/dedroid/ottimizzazione-automazioni-ha/telecamere-luci/revisione-2026-10-29/CENSIMENTO.md. Nessuna automazione eliminata.
