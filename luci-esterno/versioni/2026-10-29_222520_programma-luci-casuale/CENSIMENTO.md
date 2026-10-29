# Censimento programma luci — 2026-10-29_222520_programma-luci-casuale

Automazione: **Luci esterno - Programma notturno e coppie casuali**, attiva. Controllo: `input_boolean.programma_luci_esterno`.

| Chiave | Luce | Uscita | Fotocellula |
|---|---|---|---|
| parcheggio | Parcheggio | `switch.10001119b3_power` | `nessuna` |
| ciabatta | Ciabatta volante | `switch.100185132f_power` | `nessuna` |
| orto | Torre Orto | `switch.1002963641_power` | `input_boolean.fotocellula_orto_torre_gestisce` |
| giardino | Giardino | `switch.1000111b06_power` | `input_boolean.fotocellula_cancello_giardino_gestisce` |
| ingresso | Torre ingresso | `switch.100184e599_power` | `input_boolean.fotocellula_ingresso_torre_gestisce` |
| capanno | Capanno | `switch.100184e742_power` | `input_boolean.fotocellula_piscine_capanno_gestisce` |

Accensione fissa Parcheggio/Ciabatta tramonto-alba. Giardino/Ingresso fino 21:30; coppie variabili ogni 30 minuti fino 02:00. Allarme prioritario; altre luci disponibili al movimento.

Stato rilevato: Coppia casuale: orto,giardino. Memoria: `2026-10-29#1|orto,giardino`.

Nessuna automazione eliminata; vecchio Parcheggio conservato disabilitato.
