# Censimento sistema filtrazione — 2026-10-29_191041_regia-comando

Regia installata e abilitata su Home Assistant. **12 automazioni censite: 6 attive e 6 storiche disabilitate; 4 script di comando; 12 diagnostiche.**

| Automazione | Gruppo | Stato |
|---|---|---|
| Ricircolo cisterna pozzo | archivio_disabilitato | off |
| riempimento cisterna pozzo | archivio_disabilitato | off |
| spegnimento automatico cloratore | archivio_disabilitato | off |
| Spegnimenti riempimento cisterna pozzo | archivio_disabilitato | off |
| Riempimento cisterna potabile | archivio_disabilitato | off |
| Spegni riempimento potabile | archivio_disabilitato | off |
| Filtrazione v2 - Presenza HA | comando_ha | on |
| Filtrazione v2 - Rilascio supervisione | comando_ha | on |
| Filtrazione v2 - Regia automatica cisterne | comando_ha | on |
| PR205 DIAG - Inizio controlavaggio multi-stadio | diagnostica | on |
| PR205 DIAG - Fine finestra controlavaggio | diagnostica | on |
| PR205 DIAG - Memoria chiusura Q2 per Q3 | diagnostica | on |

## Script di comando

| Script | Funzione |
|---|---|
| script.filtrazione_v2_avvia_potabile | Filtrazione v2 - Richiedi potabile |
| script.filtrazione_v2_rilascia_potabile | Filtrazione v2 - Rilascia potabile |
| script.filtrazione_v2_avvia_pozzo | Filtrazione v2 - Richiedi pozzo |
| script.filtrazione_v2_rilascia_pozzo | Filtrazione v2 - Rilascia pozzo |

## Diagnostiche

- PR205 DIAG Scarico oltre un ora
- PR205 DIAG Filtro 2 non partito
- PR205 DIAG Filtro 3 non partito
- PR205 DIAG Q2 senza ricircolo Q3
- PR205 DIAG Q2 senza cloratore Q4
- PR205 DIAG Cloratore Q4 senza Q2
- PR205 DIAG Ricircolo non mantenuto
- PR205 DIAG Pozzo non sale con Q2
- PR205 DIAG Potabile non sale con Q1
- PR205 DIAG Calo pozzo ingiustificato
- PR205 DIAG Calo potabile ingiustificato
- PR205 DIAG Dati PLC non disponibili

Verificati 79 riferimenti a entità sul server: nessuno mancante o senza dati. Stato finale: **Fuori fascia 10–16**. Richieste HA e Q1/Q2/Q3/Q4 a zero durante le prove.

## Limiti del collaudo

Condizioni verificate sul motore HA e comandi realmente eseguiti nei percorsi bloccati/rilascio. Watchdog provato leggendo direttamente i registri PLC. Non avviati riempimenti o pompe, non alterati livelli o emergenze reali. Restano da collaudare gli attuatori, i cicli completi e gli arresti fisici ai livelli obiettivo.
