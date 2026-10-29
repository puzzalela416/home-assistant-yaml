# Censimento telecamere e luci — 2026-10-29_203022_telecamere-fotocellule-v1

**Una sensibilità adattiva, quattro fotocellule separate. Nessuna automazione eliminata.**

## Automazioni pertinenti

| Nome | Entità | Stato |
|---|---|---|
| Interruttore sonoff | `automation.interruttore_sonoff` | on |
| Spengi sonoff con pulsante philips | `automation.spengi_sonoff` | on |
| Allarme innescato= esterno acceso | `automation.allarme_innescato_esterno_acceso` | on |
| Spegni esterno all' Alba | `automation.spegni_esterno_all_alba` | on |
| Luci parcheggio al tramonto | `automation.luci_parcheggio_al_tramonto` | on |
| Movimento esterno accende torre ingresso | `automation.movimento_esterno_accende_torre_ingresso` | off |
| Movimento orto accende luci | `automation.movimento_orto_accende_luci` | off |
| Movimento cancello accende giardino | `automation.movimento_cancello_accende_giardino` | off |
| Telecamere - Sensibilità Giorno | `automation.sensibilita_telecamere_giorno_notte` | off |
| Telecamere - Sensibilità Notte | `automation.telecamere_sensibilita_notte` | off |
| faretto telecamera ingresso accende fari torre ingresso | `automation.faretto_telecamera_ingresso_accende_fari_torre_ingresso` | off |
| spegnimento torre ingresso spegne faretto telecamer aingresso | `automation.spegnimento_torre_ingresso_spegne_faretto_telecamer_aingresso` | off |
| Piscine - riduci sensibilità per continui cambi movimento | `automation.piscine_riduci_sensibilita_per_continui_cambi_movimento_2` | off |
| Sensibilità telecamera ridotta | `automation.sensibilita_telecamera_ridotta` | off |
| Telecamere - Sensibilità adattiva e profili giorno notte | `automation.telecamere_sensibilita_adattiva_e_profili_giorno_notte` | on |
| Fotocellula - Cancello → Giardino - 2 minuti | `automation.fotocellula_cancello_giardino_2_minuti` | on |
| Fotocellula - Ingresso → Torre ingresso - 2 minuti | `automation.fotocellula_ingresso_torre_ingresso_2_minuti` | on |
| Fotocellula - Piscine → Capanno - 2 minuti | `automation.fotocellula_piscine_capanno_2_minuti` | on |
| Fotocellula - Orto → Torre Orto - 2 minuti | `automation.fotocellula_orto_torre_orto_2_minuti` | on |

## Collegamenti fotocellule

| Movimento | Uscita |
|---|---|
| `binary_sensor.cancello_movimento` | `switch.1000111b06_power` |
| `binary_sensor.esterno_ingresso_movimento` | `switch.100184e599_power` |
| `binary_sensor.piscine_movimento` | `switch.100184e742_power` |
| `binary_sensor.piscina_orto_movimento` | `switch.1002963641_power` |

Solo notte; 120 secondi dalla cessazione dell’ultimo movimento. Movimento ancora attivo mantiene la luce; nuovo movimento annulla il conto alla rovescia. Le accensioni preesistenti o manuali non vengono adottate automaticamente. Il pulsante Philips rilascia la proprietà del timer Torre Orto. Le fotocellule cedono il controllo all’allarme.

## Telecamere indipendenti

| Camera | Movimento | Sensibilità | Valore rilevato |
|---|---|---|---|
| Cancello | `binary_sensor.cancello_movimento` | `number.cancello_cancello_sensibilita_al_movimento` | 5 |
| Ingresso | `binary_sensor.esterno_ingresso_movimento` | `number.esterno_ingresso_sensibilita_al_movimento` | 1 |
| Piazzale | `binary_sensor.piazzale_movimento` | `number.piazzale_sensibilita_al_movimento` | 5 |
| Tracking / Giardino | `binary_sensor.tracking_movimento` | `number.tracking_sensibilita_al_movimento` | 5 |
| Loggiato | `binary_sensor.loggiato_movimento` | `number.loggiato_sensibilita_al_movimento` | 5 |
| Piscine | `binary_sensor.piscine_movimento` | `number.piscine_sensibilita_al_movimento` | 1 |
| Orto | `binary_sensor.piscina_orto_movimento` | `number.piscina_orto_sensibilita_al_movimento` | 5 |
| Officina | `binary_sensor.parco_movimento` | `number.parco_sensibilita_al_movimento` | 5 |
| Auto | `binary_sensor.cucina_movimento_2` | `number.cucina_sensibilita_al_movimento_2` | 5 |
| Cucina / posteriore | `binary_sensor.cucina_movimento` | `number.cucina_sensibilita_al_movimento` | 5 |
| Sala | `binary_sensor.sala_movimento` | `number.sala_sensibilita_al_movimento` | 5 |

## Conflitti rilevati e decisioni

- Vecchia n.40: movimenti di più camere sommati sul solo contatore Piscine e riduzione del solo parametro Piscine. Due trigger errati puntavano a `number` invece che a sensori di movimento.
- Vecchie n.31/40 e profili n.55/56 sostituiti da un coordinamento unico; definizioni conservate disabilitate.
- Vecchia fotocellula Orto accendeva anche Capanno: ora sono due zone indipendenti.
- Torre ingresso rimossa dall’accensione fissa di Parcheggio al tramonto; Parcheggio resta a tramonto +15 minuti.
- Due automazioni vecchie faretto Ingresso↔Torre ingresso restano disabilitate: i faretti Ingresso, Piazzale e Tracking/Giardino sono nativi.
- Pulsante Philips: breve ON e lunga OFF per le sole uscite di potenza Torre Orto e Ciabatta; eliminato il toggle contraddittorio, conservate entrambe le definizioni.
- Parametro Orto prima disabilitato: riabilitato sul suo collegamento Reolink, valore letto 37 e impostato al profilo notturno 5.
- Plancia: la scheda Piscina Orto puntava a Cucina; corretta la sola entità verso Orto.
- Spegni esterno all’alba resta integralmente invariata per richiesta esplicita, inclusi i suoi bersagli per area/dispositivo.
- Allarme esistente resta invariato; proposta separata di restringere i comandi alle sole uscite di potenza in attesa di risposta. Le nuove fotocellule non interferiscono durante la sua esecuzione.

## Verifica e limiti

11 servizi reali di scrittura sensibilità accettati e valori riletti. Undici dispatch della finestra adattiva provati realmente con contatori zero, senza simulare movimento. Quattro scadenze native da 120 secondi verificate sul server nel percorso senza proprietà della luce. 512 combinazioni delle sequenze fotocellule analizzate con condizioni renderizzate sul motore HA. Nessuna accensione artificiale e nessuna simulazione di pioggia/vento.

Il conteggio non distingue persone da falsi eventi: riduce la sensibilità, non certifica l’assenza di falsi. Al minimo hardware 1 non scende ulteriormente e segnala il limite. La prova sul campo resta necessaria per valutare inquadrature, vento e pioggia.
