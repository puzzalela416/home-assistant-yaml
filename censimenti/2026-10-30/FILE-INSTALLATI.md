# File installati e versioni autorevoli

| File sul server | Origine operativa |
|---|---|
| `/homeassistant/packages/filtrazione_v2.yaml` | [Regia filtrazione](https://github.com/puzzalela416/home-assistant-yaml/blob/main/filtrazione-acque/versioni/2026-10-29_191041_regia-comando/packages/filtrazione_v2.yaml) |
| `/homeassistant/packages/pr205_diagnostica.yaml` | [Diagnostica corrente](https://github.com/puzzalela416/home-assistant-yaml/blob/main/filtrazione-acque/versioni/2026-10-29_191041_regia-comando/packages/pr205_diagnostica.yaml) |
| `/homeassistant/packages/telecamere_fotocellule_v1.yaml` | [Versione coordinata con il programma luci](https://github.com/puzzalela416/home-assistant-yaml/blob/main/luci-esterno/versioni/2026-10-29_222520_programma-luci-casuale/packages/telecamere_fotocellule_v1.yaml) |
| `/homeassistant/packages/programma_luci_esterno_v1.yaml` | [Programma casuale](https://github.com/puzzalela416/home-assistant-yaml/blob/main/luci-esterno/versioni/2026-10-29_222520_programma-luci-casuale/packages/programma_luci_esterno_v1.yaml) |
| Automazione allarme ID 1790034489277 | [Correzione bersagli Sonoff](https://github.com/puzzalela416/home-assistant-yaml/blob/main/telecamere-luci/versioni/2026-10-29_211150_allarme-esterno/allarme-DOPO.yaml) |
| `automations.yaml` principale | [Snapshot attuale](snapshot-ha/automations.yaml), con 43 definizioni |

Il package telecamere del primo rilascio resta nello storico, ma non contiene ancora le guardie del programma luci. Ripristinare insieme i moduli compatibili, evitando controller concorrenti.

## Hash rilevati

- `packages/filtrazione_v2.yaml`: `9c17475425236c5a6a9020088d3e00a72d7aa3d04613537252efca32dd211efa` — coincide con ultimo salvataggio.
- `packages/pr205_diagnostica.yaml`: `b703609b7bf7b518604f7ef244714b15626bc30f79ef598cac1fc7af775897bc` — coincide con ultimo salvataggio.
- `packages/telecamere_fotocellule_v1.yaml`: `8ad6d04b870b56331b279175328cf1ea47fd2310ea0d6d45c9be84e279010acf` — coincide con ultimo salvataggio.
- `packages/programma_luci_esterno_v1.yaml`: `9b86aca30ac916f5c8cac5c65797d8ba4880dbaf9ef5fcf8c2e1a17fd466d0b2` — coincide con ultimo salvataggio.
- `configuration.yaml`: `0f6d22b78c37841f5f413708e682a84787165f78ce18562fb0746878a2694ff5` — coincide con ultimo salvataggio.
