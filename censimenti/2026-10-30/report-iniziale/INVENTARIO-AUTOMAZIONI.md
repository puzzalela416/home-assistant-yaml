> FOTOGRAFIA STORICA DEL 29 OTTOBRE 2026, prima degli interventi. Le parti modificate sono superate: [censimento aggiornato](../README.md). Non ripristinare questi sorgenti come configurazione corrente.

# Inventario e revisione delle 57 automazioni Home Assistant

Rilevazione: **29 ottobre 2026, circa 09:45–09:48 CET**. Server: `http://192.168.0.124`, versione **2026.10.2**. Orari operativi espressi nel fuso di HA: `Europe/Berlin`, coincidente con Roma alle date considerate.

**Sola lettura su Home Assistant.** Sono state eseguite letture REST, consultazioni WebSocket di registri/tracce/errori ed estrazioni dal backup già presente sul PC. Nessun servizio invocato, nessuna automazione attivata, disattivata, eseguita o ricaricata; nessuna impostazione del server modificata. I file di questa analisi sono stati scritti soltanto sul PC.

## Come leggere i risultati

- **VERIFICATO / ERRORE DI LOGICA:** conseguenza dimostrabile dalla configurazione o dai registri, senza comandare dispositivi.
- **OSSERVATO:** stato, traccia o messaggio realmente letto, riferito al momento indicato. Uno stato `unknown` non dimostra da solo un guasto; `unavailable` indica indisponibilità al momento dello snapshot.
- **RISCHIO:** scenario plausibile derivato dalla logica, non incidente dimostrato. Le protezioni interne PLC e dispositivi non sono state provate.
- **DA CONCORDARE:** scelta funzionale che dipende da come vuoi usare la casa; non viene trattata automaticamente come bug.
- **P1:** prima revisione per impatto su allarme, acqua, chiusure o comandi in conflitto. **P2:** affidabilità/coerenza funzionale. **P3:** pulizia, storico e test; le automazioni disabilitate mantengono rischi latenti se riattivate.

## Copertura e limiti delle prove

Il conteggio corretto è **47 abilitate e 10 disabilitate** (il precedente riepilogo in chat 46/11 era un errore di conteggio). Tutte le 57 sono incluse nelle schede numerate come l’elenco iniziale. 54 configurazioni provengono dall’API dell’editor e corrispondono esattamente alle 54 nel backup. Tre automazioni PR205 sono nel package YAML: l’API dell’editor restituisce 404 per queste, ma il contenuto estratto dal backup coincide esattamente con le configurazioni delle ultime tracce disponibili.

Le modalità sono **53 single, 3 queued, 1 restart**. Sono state raccolte **150 tracce**: 80 finished, 61 failed_conditions, 7 failed_single, 1 cancelled, 1 ancora running nello snapshot. Non ci sono esiti error nelle 150 tracce conservate, ma il registro errori contiene guasti Tuya reali sulle automazioni scale. `failed_conditions` è normalmente una corretta esclusione; `failed_single` è un evento ignorato perché una sequenza era già in corso. `finished` non dimostra che ogni attuatore abbia fisicamente eseguito il comando. Le tracce sono una finestra limitata, non uno storico completo.

**Due versioni storiche differenti:** #37 Ricircolo cisterna pozzo aveva trigger Q4 off e condizioni differenti; #39 Riempimento cisterna pozzo aveva condizioni differenti. Le tracce di queste due non dimostrano il comportamento del file attuale. Non è stata eseguita una ricarica per forzare l’allineamento, coerentemente con la richiesta di sola lettura. Il fatto che l’API dell’editor legga un file non prova da solo che una modifica recente sia già stata ricaricata.

Cinque automazioni hanno last_triggered nullo: #34, #38, #39, #42, #43. Questo non significa necessariamente “mai ricevuto un evento”: #34 e #39 hanno tracce con condizioni non soddisfatte. Non sono state create prove controllate, allarmi, foto, movimenti artificiali né simulazioni hardware. Il programma PLC e le protezioni elettromeccaniche restano fuori dalla verifica operativa.

## Risultati prioritari

| Riferimento | Evidenza | Implicazione |
|---|---|---|
| #43 | Trigger su stato di `automation.riempimento_cisterna_pozzo`, anziché sul livello | Il raggiungimento del pieno non avvia questo spegnimento HA. |
| #37–#44 | Quattro automazioni possono spegnere il medesimo Manuale PLC; #44 lo spegne appena Q2 cade | Le fasi riempimento/clorazione/post-ricircolo non hanno una proprietà comune chiaramente definita. Effetto fisico da verificare nel PLC. |
| #38/#39 | Solo attraversamento soglia più condizioni di fascia/interblocco, senza trigger quando queste tornano valide | Può mancare il riempimento a inizio fascia se il livello era già basso. |
| #25/#47 | Lo stesso long_press accende e spegne; #47 aggiunge un toggle dopo lo spegnimento | Stato finale ambiguo di CIABATTA e TORRE ORTO. |
| #40 | Somma movimenti di più telecamere, corregge solo Piscine e include number nei trigger on/off | Adattamento non attribuito alla telecamera che genera gli eventi. |
| #1/#5/#10 | Porta taverna controllata pre-inserimento ma assente dal trigger perimetrale; sincronizzazione forza home/away senza controllo aperture | Copertura e percorsi d’inserimento diversi. Va concordato il perimetro reale. |
| #4 | Notifica collocata dopo oltre 15 minuti e soltanto di notte | Questa automazione non fornisce un avviso immediato e indipendente. |
| #7/#12/#13 | Aperture Velux indipendenti e chiusura dopo 4 ore basata su delay | Possibile riapertura dopo tramonto o perdita della chiusura al riavvio; una cancellazione è osservata. |
| #17/#50 | Errori reali Tuya e stesso comando luce su stesso evento movimento | Ripristino e stato finale delle scale possono essere incoerenti. |
| #35/#36/#51/#55/#56 | Riferimenti a entità disabilitate/assenti | Parte delle funzioni PTZ e della copertura telecamere non è operativa sullo snapshot. |

## Indice completo

| N. | Automazione | Stato | Area | Priorità |
|---:|---|---|---|---|
| 1 | [Allarme casa - Contatti perimetrali + notifica](#a01) | abilitata | Allarme | P1 |
| 2 | [Allarme innescato scatta foto](#a02) | abilitata | Allarme | P2 |
| 3 | [Allarme innescato spia letto](#a03) | abilitata | Allarme | P2 |
| 4 | [Allarme innescato= esterno acceso](#a04) | abilitata | Allarme / luci esterne | P1 |
| 5 | [Allarme notte - Inserimento automatico e controllo aperture](#a05) | abilitata | Allarme | P1 |
| 6 | [allarme suona sirena](#a06) | abilitata | Allarme | P1 |
| 7 | [areazione con velux tutti i giorni](#a07) | abilitata | Velux | P1 |
| 8 | [Arm alarm](#a08) | disabilitata | Allarme | P3 — disabilitata |
| 9 | [Arm alarm porta](#a09) | disabilitata | Allarme | P3 — disabilitata |
| 10 | [Arma allarme double](#a10) | abilitata | Allarme | P1 |
| 11 | [betatest sirena](#a11) | abilitata | Allarme | P3 |
| 12 | [Caldo fuori apre velux](#a12) | abilitata | Velux | P1 |
| 13 | [Chiusura velux](#a13) | abilitata | Velux | P2 |
| 14 | [Cortesia bagno](#a14) | abilitata | Luci interne | P2 |
| 15 | [Cortesia da fumo](#a15) | abilitata | Luci interne | P2 |
| 16 | [Cortesia letto](#a16) | abilitata | Luci interne | P2 |
| 17 | [Cortesia scale](#a17) | abilitata | Luci interne | P1 |
| 18 | [Disarm alarm](#a18) | abilitata | Allarme | P1 |
| 19 | [disarm double allarm](#a19) | abilitata | Allarme | P2 |
| 20 | [faretto telecamera ingresso accende fari torre ingresso](#a20) | disabilitata | Luci esterne / telecamere | P2 — disabilitata |
| 21 | [finestre aperte](#a21) | abilitata | Allarme | P2 |
| 22 | [Growatt - Allarmi e comunicazione USB](#a22) | abilitata | Energia | P2 |
| 23 | [Ingresso apre, luce  accende](#a23) | abilitata | Luci interne | P2 |
| 24 | [Interruttore ingresso accende luci](#a24) | abilitata | Pulsanti / luci interne | P2 |
| 25 | [Interruttore sonoff](#a25) | abilitata | Pulsanti / luci esterne | P1 |
| 26 | [Luci parcheggio al tramonto](#a26) | abilitata | Luci esterne | P2 |
| 27 | [Movimento cancello accende giardino](#a27) | abilitata | Luci esterne | P2 |
| 28 | [Movimento esterno accende torre ingresso](#a28) | abilitata | Luci esterne | P1 |
| 29 | [movimento interno trigger alarm](#a29) | disabilitata | Allarme | P2 — disabilitata |
| 30 | [Movimento orto accende luci](#a30) | disabilitata | Luci esterne | P3 — disabilitata |
| 31 | [Piscine - riduci sensibilità per continui cambi movimento](#a31) | disabilitata | Telecamere | P3 — disabilitata |
| 32 | [PR205 DIAG - Fine finestra controlavaggio](#a32) | abilitata | PLC / diagnostica | P2 |
| 33 | [PR205 DIAG - Inizio controlavaggio multi-stadio](#a33) | abilitata | PLC / diagnostica | P2 |
| 34 | [PR205 DIAG - Memoria chiusura Q2 per Q3](#a34) | abilitata | PLC / diagnostica | P2 |
| 35 | [Ptz cancello](#a35) | abilitata | Telecamere / PTZ | P1 |
| 36 | [ptz loggiato](#a36) | abilitata | Telecamere / PTZ | P1 |
| 37 | [Ricircolo cisterna pozzo](#a37) | abilitata | Cisterne / PLC | P1 |
| 38 | [Riempimento cisterna potabile](#a38) | abilitata | Cisterne / PLC | P1 |
| 39 | [riempimento cisterna pozzo](#a39) | abilitata | Cisterne / PLC | P1 |
| 40 | [Sensibilità telecamera ridotta](#a40) | abilitata | Telecamere | P1 |
| 41 | [Spegni esterno all' Alba](#a41) | abilitata | Luci esterne | P2 |
| 42 | [Spegni riempimento potabile](#a42) | abilitata | Cisterne / PLC | P1 |
| 43 | [Spegnimenti riempimento cisterna pozzo](#a43) | abilitata | Cisterne / PLC | P1 |
| 44 | [spegnimento automatico cloratore](#a44) | abilitata | Cisterne / PLC | P1 |
| 45 | [spegnimento torre ingresso spegne faretto telecamer aingresso](#a45) | disabilitata | Luci esterne / telecamere | P3 — disabilitata |
| 46 | [Spengi cortesia casa](#a46) | abilitata | Luci interne | P2 |
| 47 | [Spengi sonoff con pulsante philips](#a47) | abilitata | Pulsanti / luci esterne | P1 |
| 48 | [Spia allarme](#a48) | disabilitata | Allarme / luci | P3 — disabilitata |
| 49 | [Spia allarme disinserito](#a49) | disabilitata | Allarme / luci | P3 — disabilitata |
| 50 | [Spia allarme scale](#a50) | abilitata | Allarme / luci | P1 |
| 51 | [Spia esterno - Settori](#a51) | abilitata | Allarme / segnalazioni esterne | P2 |
| 52 | [Switch andrea accende letto](#a52) | abilitata | Pulsanti / luci interne | P2 |
| 53 | [switch hue Spegni luci sala](#a53) | abilitata | Pulsanti / luci interne | P2 |
| 54 | [Switch lucia accende letto](#a54) | abilitata | Pulsanti / luci interne | P2 |
| 55 | [Telecamere - Sensibilità Giorno](#a55) | abilitata | Telecamere | P2 |
| 56 | [Telecamere - Sensibilità Notte](#a56) | abilitata | Telecamere | P2 |
| 57 | [Test](#a57) | disabilitata | Allarme / presenza | P3 — disabilitata |

## Schede di dettaglio

<a id="a01"></a>
### 01. Allarme casa - Contatti perimetrali + notifica

**Stato:** abilitata. **Area:** Allarme. **Priorità:** P1. **Modalità:** `single`.
**Identità:** `automation.allarme_casa_contatti_perimetrali`; ID YAML `1791060890626`.
**Fonte:** [config-backup/automations.yaml, riga 886](config-backup/automations.yaml) · [YAML individuale](schede-yaml/01-allarme_casa_contatti_perimetrali.yaml). Ultima azione avviata registrata: **23/10/2026 17:31:33 CEST**.

**Cosa la attiva.** Apertura (stato on) di uno dei 10 contatti perimetrali elencati. Non serve un from: off.

**Condizioni.** Allarme Casa deve essere armed_home oppure armed_away.

**Comportamento e tempi.** Memorizza il nome del contatto in input_text.ultimo_allarme_casa, scrive nel registro, crea una notifica persistente e solo alla fine invia alarm_trigger ad Allarme Casa.

**Errori, rischi e interazioni.** VERIFICATO: Porta taverna (contatto f1e9) non compare fra i 10 ingressi, pur essendo controllata prima dell’inserimento da #5. Porta camera è anch’essa esclusa, ma sembra interna: esclusione da concordare. RISCHIO: se un’azione informativa precedente fallisce, l’allarme non viene innescato. Un contatto già aperto prima dell’inserimento non genera da solo un nuovo evento; unknown/unavailable→on può invece attivare questo trigger.

**Preparazione dell’ottimizzazione.** Concordare il perimetro protetto e la politica sui sensori non disponibili; separare l’innesco essenziale dalle notifiche. Nessuna correzione applicata.

**Prove disponibili.** 5 tracce conservate: failed_conditions=5.

| Comando previsto | Destinazioni esplicite o risolte da dispositivo/area |
|---|---|
| `input_text.set_value` | `input_text.ultimo_allarme_casa` — Ultimo allarme |
| `logbook.log` | Nessuna entità target: dati, template o chiamata informativa (vedi YAML). |
| `persistent_notification.create` | Nessuna entità target: dati, template o chiamata informativa (vedi YAML). |
| `alarm_control_panel.alarm_trigger` | `alarm_control_panel.allarme_casa` — Allarme Casa |

<details><summary>Entità coinvolte e stato al momento della lettura</summary>

| Entità | Nome | Stato | Registro |
|---|---|---|---|
| `alarm_control_panel.allarme_casa` | Allarme Casa | disarmed | presente |
| `binary_sensor.door_and_window_sensor_146f_contact_sensor_146f_2` | Finestra TV | off | presente |
| `binary_sensor.door_and_window_sensor_2602_contact_sensor_2602` | Velux | on | presente |
| `binary_sensor.door_and_window_sensor_8343_contact_sensor_8343` | Portone ingresso | off | presente |
| `binary_sensor.door_and_window_sensor_8371_contact_sensor_8371_2` | Finestra scorrevole cucina | off | presente |
| `binary_sensor.door_and_window_sensor_b21b_contact_sensor_b21b` | Finestra bagnetto | off | presente |
| `binary_sensor.door_and_window_sensor_bd83_contact_sensor_bd83` | Portafinestra cameretta | off | presente |
| `binary_sensor.door_and_window_sensor_e2ec_contact_sensor_e2ec_2` | Portafinestra sala | off | presente |
| `binary_sensor.door_and_window_sensor_e37a_contact_sensor_e37a` | Porta terrazza | off | presente |
| `binary_sensor.door_and_window_sensor_f81b_contact_sensor_f81b` | Finestra bagno | off | presente |
| `binary_sensor.door_and_window_sensor_f92e_contact_sensor_f92e` | Portafinestra camera | on | presente |
| `input_text.ultimo_allarme_casa` | Ultimo allarme | Portone ingresso | presente |

</details>


[Torna all’indice](#indice-completo)

<a id="a02"></a>
### 02. Allarme innescato scatta foto

**Stato:** abilitata. **Area:** Allarme. **Priorità:** P2. **Modalità:** `single`.
**Identità:** `automation.allarme_innescato_scatta_foto`; ID YAML `1791399700517`.
**Fonte:** [config-backup/automations.yaml, riga 1250](config-backup/automations.yaml) · [YAML individuale](schede-yaml/02-allarme_innescato_scatta_foto.yaml). Ultima azione avviata registrata: **23/10/2026 17:31:33 CEST**.

**Cosa la attiva.** Uno dei due pannelli allarme entra in triggered.

**Condizioni.** Nessuna.

**Comportamento e tempi.** Salva una foto di camera.sala in /media/Istantanee, aspetta 5 secondi e salva una seconda foto con nome datato al secondo.

**Errori, rischi e interazioni.** RISCHIO: percorso esistente, scrivibile e autorizzato da HA non dimostrato; non è stata eseguita alcuna foto di prova. Nessuna traccia disponibile per questa automazione. Se la prima foto fallisce non viene tentata la seconda. Non invia le immagini a nessuno e non gestisce una politica di cancellazione. Gli eventi del secondo pannello nei 5 secondi vengono ignorati in single.

**Preparazione dell’ottimizzazione.** Verificare passivamente il percorso e concordare conservazione/invio delle foto; gestire il fallimento indipendente dei due scatti.

**Prove disponibili.** Nessuna traccia conservata: non è possibile attestare l’esito storico di esecuzione.

| Comando previsto | Destinazioni esplicite o risolte da dispositivo/area |
|---|---|
| `camera.snapshot` | `camera.sala` — sala Scorrevole |

<details><summary>Entità coinvolte e stato al momento della lettura</summary>

| Entità | Nome | Stato | Registro |
|---|---|---|---|
| `alarm_control_panel.allarme_casa` | Allarme Casa | disarmed | presente |
| `alarm_control_panel.aqara_hub_09ab_security_system_2` | Aqara Hub-09AB Security System | disarmed | presente |
| `camera.sala` | sala Scorrevole | idle | presente |

</details>


[Torna all’indice](#indice-completo)

<a id="a03"></a>
### 03. Allarme innescato spia letto

**Stato:** abilitata. **Area:** Allarme. **Priorità:** P2. **Modalità:** `single`.
**Identità:** `automation.allarme_innescato_strobo_letto`; ID YAML `1790034091142`.
**Fonte:** [config-backup/automations.yaml, riga 471](config-backup/automations.yaml) · [YAML individuale](schede-yaml/03-allarme_innescato_strobo_letto.yaml). Ultima azione avviata registrata: **23/10/2026 17:31:33 CEST**.

**Cosa la attiva.** Uno dei due pannelli allarme entra in triggered.

**Condizioni.** Nessuna.

**Comportamento e tempi.** Luce letto rossa al 100%, effetto DIY Breath, attesa 1 minuto, spegnimento. L’effetto richiesto è presente nella effect_list letta.

**Errori, rischi e interazioni.** RISCHIO: stesso attuatore usato da #5, #16, #21, #52 e #54, senza priorità o ripristino dello stato precedente. Non termina immediatamente al disinserimento. Nuovi inneschi nel minuto sono ignorati. Non sono disponibili tracce recenti per verificarne l’esito reale.

**Preparazione dell’ottimizzazione.** Definire priorità dell’allarme rispetto a cortesia e pulsanti, durata e stato finale della luce.

**Prove disponibili.** Nessuna traccia conservata: non è possibile attestare l’esito storico di esecuzione.

| Comando previsto | Destinazioni esplicite o risolte da dispositivo/area |
|---|---|
| `light.turn_on` | `light.1000ee1aa7_color_rgb` — Luce letto  Luce letto |
| `light.turn_off` | `light.1000ee1aa7_color_rgb` — Luce letto  Luce letto |

<details><summary>Entità coinvolte e stato al momento della lettura</summary>

| Entità | Nome | Stato | Registro |
|---|---|---|---|
| `alarm_control_panel.allarme_casa` | Allarme Casa | disarmed | presente |
| `alarm_control_panel.aqara_hub_09ab_security_system_2` | Aqara Hub-09AB Security System | disarmed | presente |
| `light.1000ee1aa7_color_rgb` | Luce letto  Luce letto | off | presente |

</details>


[Torna all’indice](#indice-completo)

<a id="a04"></a>
### 04. Allarme innescato= esterno acceso

**Stato:** abilitata. **Area:** Allarme / luci esterne. **Priorità:** P1. **Modalità:** `single`.
**Identità:** `automation.allarme_innescato_esterno_acceso`; ID YAML `1790034489277`.
**Fonte:** [config-backup/automations.yaml, riga 507](config-backup/automations.yaml) · [YAML individuale](schede-yaml/04-allarme_innescato_esterno_acceso.yaml). Ultima azione avviata registrata: **19/10/2026 21:50:31 CEST**.

**Cosa la attiva.** Uno dei due pannelli allarme entra in triggered.

**Condizioni.** Sole tramontato.

**Comportamento e tempi.** Accende cinque uscite esterne; alterna acceso/spento con pause da 2 secondi per due cicli, lascia acceso circa 15 minuti, spegne e soltanto dopo invia il messaggio di allarme a notify.display e notify.xiaomi_12.

**Errori, rischi e interazioni.** VERIFICATO: notifica collocata dopo 15 minuti e 8 secondi di attese, oltre ai tempi dei comandi. Di giorno non invia alcuna notifica da questa automazione. RISCHIO: un guasto a una luce o un riavvio può impedire la notifica finale. Spegne anche luci già accese prima dell’allarme; conflitto con #25, #26, #27, #30, #41 e #47. Non interrompe la sequenza al disinserimento.

**Preparazione dell’ottimizzazione.** Separare la notifica immediata dalla segnalazione luminosa e concordare il ripristino delle luci; evitare che le azioni accessorie impediscano l’avviso.

**Prove disponibili.** Nessuna traccia conservata: non è possibile attestare l’esito storico di esecuzione.

| Comando previsto | Destinazioni esplicite o risolte da dispositivo/area |
|---|---|
| `switch.turn_on` | `switch.10001119b3_power` — PARCHEGGIO  PARCHEGGIO; `switch.1000111b06_power` — GIARDINO  GIARDINO; `switch.100184e742_power` — CAPANNO  CAPANNO; `switch.100185132f_power` — Ciabatta volante; `switch.1002963641_power` — TORRE ORTO  TORRE ORTO |
| `switch.turn_off` | `switch.10001119b3_power` — PARCHEGGIO  PARCHEGGIO; `switch.1000111b06_power` — GIARDINO  GIARDINO; `switch.100184e742_power` — CAPANNO  CAPANNO; `switch.100185132f_power` — Ciabatta volante; `switch.1002963641_power` — TORRE ORTO  TORRE ORTO |
| `notify.send_message` | `notify.display` — display ; `notify.xiaomi_12` — HAvpn |

<details><summary>Entità coinvolte e stato al momento della lettura</summary>

| Entità | Nome | Stato | Registro |
|---|---|---|---|
| `alarm_control_panel.allarme_casa` | Allarme Casa | disarmed | presente |
| `alarm_control_panel.aqara_hub_09ab_security_system_2` | Aqara Hub-09AB Security System | disarmed | presente |
| `notify.display` | display  | 2026-10-19T20:05:39.420429+00:00 | presente |
| `notify.xiaomi_12` | HAvpn | 2026-10-19T20:05:39.533101+00:00 | presente |
| `switch.10001119b3_power` | PARCHEGGIO  PARCHEGGIO | off | presente |
| `switch.1000111b06_power` | GIARDINO  GIARDINO | off | presente |
| `switch.100184e742_power` | CAPANNO  CAPANNO | off | presente |
| `switch.100185132f_power` | Ciabatta volante | off | presente |
| `switch.1002963641_power` | TORRE ORTO  TORRE ORTO | off | presente |

</details>


[Torna all’indice](#indice-completo)

<a id="a05"></a>
### 05. Allarme notte - Inserimento automatico e controllo aperture

**Stato:** abilitata. **Area:** Allarme. **Priorità:** P1. **Modalità:** `single`.
**Identità:** `automation.allarme_notte_inserimento_automatico_e_controllo_aperture`; ID YAML `1792367956091`.
**Fonte:** [config-backup/automations.yaml, riga 1743](config-backup/automations.yaml) · [YAML individuale](schede-yaml/05-allarme_notte_inserimento_automatico_e_controllo_aperture.yaml). Ultima azione avviata registrata: **29/10/2026 02:10:44 CET**.

**Cosa la attiva.** Assenza di movimento in camera per 1 minuto (arm_alarm), oppure chiusura della porta camera (arm_alarm_porta).

**Condizioni.** Fascia 21:30–05:00. Ramo assenza: porta chiusa da almeno 1 minuto. Ramo porta: movimento camera presente al controllo, poi attesa di 1 minuto.

**Comportamento e tempi.** Controlla se almeno uno dei 12 contatti vale on: in quel caso alterna volume Aqara 15/0 tre volte, lampeggia rosso/blu e termina senza armare. Altrimenti volume 1, Aqara away, Allarme Casa home, due lampeggi rossi della luce letto.

**Errori, rischi e interazioni.** VERIFICATO: descrizione “mantiene tempi originali” non corrisponde al codice: #8 aveva 5 minuti di assenza e 2 di porta chiusa, qui sono 1 e 1. Il controllo blocca solo on: unknown/unavailable non sono trattati come apertura. Dopo l’attesa non ricontrolla la fascia oraria né l’assenza movimento. Cambiare il volume non equivale a comandare un beep; il beep reale non è dimostrato. Dopo l’avviso aperture il volume resta a 0. RISCHIO: un contatto richiuso dopo il rifiuto non avvia necessariamente un nuovo tentativo. Può riarmare pannelli già armati; #10 può inserirli senza questo controllo.

**Preparazione dell’ottimizzazione.** Concordare tempi desiderati, gestione guasti e aperture, conferma acustica e condizioni da ricontrollare prima dell’inserimento. Centralizzare il controllo per tutti i percorsi di inserimento.

**Prove disponibili.** 5 tracce conservate: failed_conditions=5.

| Comando previsto | Destinazioni esplicite o risolte da dispositivo/area |
|---|---|
| `number.set_value` | `number.aqara_hub_09ab_volume_2` — Aqara Hub-09AB Volume |
| `light.turn_on` | `light.1000ee1aa7_color_rgb` — Luce letto  Luce letto; `light.aqara_hub_09ab_lightbulb_09ab_2` — Aqara Hub-09AB Lightbulb-09AB |
| `light.turn_off` | `light.1000ee1aa7_color_rgb` — Luce letto  Luce letto; `light.aqara_hub_09ab_lightbulb_09ab_2` — Aqara Hub-09AB Lightbulb-09AB |
| `alarm_control_panel.alarm_arm_away` | `alarm_control_panel.aqara_hub_09ab_security_system_2` — Aqara Hub-09AB Security System |
| `alarm_control_panel.alarm_arm_home` | `alarm_control_panel.allarme_casa` — Allarme Casa |
| `light.turn_on` | `light.1000ee1aa7_color_rgb` — Luce letto  Luce letto |
| `light.turn_off` | `light.1000ee1aa7_color_rgb` — Luce letto  Luce letto |

<details><summary>Entità coinvolte e stato al momento della lettura</summary>

| Entità | Nome | Stato | Registro |
|---|---|---|---|
| `alarm_control_panel.allarme_casa` | Allarme Casa | disarmed | presente |
| `alarm_control_panel.aqara_hub_09ab_security_system_2` | Aqara Hub-09AB Security System | disarmed | presente |
| `binary_sensor.door_and_window_sensor_146f_contact_sensor_146f_2` | Finestra TV | off | presente |
| `binary_sensor.door_and_window_sensor_2602_contact_sensor_2602` | Velux | on | presente |
| `binary_sensor.door_and_window_sensor_8343_contact_sensor_8343` | Portone ingresso | off | presente |
| `binary_sensor.door_and_window_sensor_8371_contact_sensor_8371_2` | Finestra scorrevole cucina | off | presente |
| `binary_sensor.door_and_window_sensor_b21b_contact_sensor_b21b` | Finestra bagnetto | off | presente |
| `binary_sensor.door_and_window_sensor_bd83_contact_sensor_bd83` | Portafinestra cameretta | off | presente |
| `binary_sensor.door_and_window_sensor_d1b1_contact_sensor_d1b1` | porta camera | off | presente |
| `binary_sensor.door_and_window_sensor_e2ec_contact_sensor_e2ec_2` | Portafinestra sala | off | presente |
| `binary_sensor.door_and_window_sensor_e37a_contact_sensor_e37a` | Porta terrazza | off | presente |
| `binary_sensor.door_and_window_sensor_f1e9_contact_sensor_f1e9` | Porta taverna | off | presente |
| `binary_sensor.door_and_window_sensor_f81b_contact_sensor_f81b` | Finestra bagno | off | presente |
| `binary_sensor.door_and_window_sensor_f92e_contact_sensor_f92e` | Portafinestra camera | on | presente |
| `binary_sensor.motion_sensor_20ae_2` | Motion Camera | off | presente |
| `light.1000ee1aa7_color_rgb` | Luce letto  Luce letto | off | presente |
| `light.aqara_hub_09ab_lightbulb_09ab_2` | Aqara Hub-09AB Lightbulb-09AB | off | presente |
| `number.aqara_hub_09ab_volume_2` | Aqara Hub-09AB Volume | 1 | presente |

</details>


[Torna all’indice](#indice-completo)

<a id="a06"></a>
### 06. allarme suona sirena

**Stato:** abilitata. **Area:** Allarme. **Priorità:** P1. **Modalità:** `single`.
**Identità:** `automation.allarme_suona_sirena`; ID YAML `1791063091106`.
**Fonte:** [config-backup/automations.yaml, riga 982](config-backup/automations.yaml) · [YAML individuale](schede-yaml/06-allarme_suona_sirena.yaml). Ultima azione avviata registrata: **23/10/2026 17:31:33 CEST**.

**Cosa la attiva.** Solo Allarme Casa entra in triggered; il solo Aqara triggered non avvia questa automazione.

**Condizioni.** Nessuna.

**Comportamento e tempi.** Accende siren.sala_sirena, imposta rosso il gateway Aqara, attende 1 minuto, spegne prima sirena e poi luce.

**Errori, rischi e interazioni.** OSSERVATO: siren.sala_sirena ha stato unknown nello snapshot; questo non dimostra da solo che il comando non funzioni. RISCHIO: se una chiamata successiva all’accensione sirena fallisce, lo spegnimento finale non viene raggiunto. Un riavvio durante il minuto perde la sequenza. Non si ferma sul disinserimento. Il pannello manuale è configurato per triggered fino a 300 secondi, mentre la sirena è comandata qui per 60. La luce è condivisa con #15, #21, #23, #46 e #51.

**Preparazione dell’ottimizzazione.** Concordare la relazione tra i due pannelli, durata e arresto della sirena; verificare l’affidabilità del dispositivo e predisporre uno spegnimento indipendente.

**Prove disponibili.** Nessuna traccia conservata: non è possibile attestare l’esito storico di esecuzione.

| Comando previsto | Destinazioni esplicite o risolte da dispositivo/area |
|---|---|
| `siren.turn_on` | `siren.sala_sirena` — sala Sirena |
| `light.turn_on` | `light.aqara_hub_09ab_lightbulb_09ab_2` — Aqara Hub-09AB Lightbulb-09AB |
| `siren.turn_off` | `siren.sala_sirena` — sala Sirena |
| `light.turn_off` | `light.aqara_hub_09ab_lightbulb_09ab_2` — Aqara Hub-09AB Lightbulb-09AB |

<details><summary>Entità coinvolte e stato al momento della lettura</summary>

| Entità | Nome | Stato | Registro |
|---|---|---|---|
| `alarm_control_panel.allarme_casa` | Allarme Casa | disarmed | presente |
| `light.aqara_hub_09ab_lightbulb_09ab_2` | Aqara Hub-09AB Lightbulb-09AB | off | presente |
| `siren.sala_sirena` | sala Sirena | unknown | presente |

</details>


[Torna all’indice](#indice-completo)

<a id="a07"></a>
### 07. areazione con velux tutti i giorni

**Stato:** abilitata. **Area:** Velux. **Priorità:** P1. **Modalità:** `single`.
**Identità:** `automation.areazione_con_velux_tutti_i_giorni`; ID YAML `1792712912646`.
**Fonte:** [config-backup/automations.yaml, riga 2009](config-backup/automations.yaml) · [YAML individuale](schede-yaml/07-areazione_con_velux_tutti_i_giorni.yaml). Ultima azione avviata registrata: **29/10/2026 08:30:00 CET**.

**Cosa la attiva.** Ogni giorno alle 08:30, secondo il fuso orario configurato in HA.

**Condizioni.** È sufficiente che uno dei due pannelli sia disarmed (behavior: any), non entrambi.

**Comportamento e tempi.** Apre il Velux, aspetta 4 ore e lo chiude, normalmente alle 12:30.

**Errori, rischi e interazioni.** OSSERVATO: una traccia iniziata il 26/10 risulta cancelled durante l’attesa; la causa esatta non è registrata nella traccia. Nello snapshot la sequenza del 29/10 è ancora in attesa. RISCHIO: riavvio o cancellazione impedisce la chiusura dopo 4 ore; resta comunque la chiusura separata al tramonto #13 se quel trigger viene eseguito. Nessun controllo pioggia/vento né reazione all’inserimento allarme successivo all’apertura. Conflitto con aperture di #12.

**Preparazione dell’ottimizzazione.** Definire quando il Velux può restare aperto; usare una scadenza recuperabile e un controllo indipendente di chiusura. Non è stata interrotta la sequenza in corso.

**Prove disponibili.** 4 tracce conservate: cancelled=1, finished=2, running=1.

| Comando previsto | Destinazioni esplicite o risolte da dispositivo/area |
|---|---|
| `cover.open_cover` | `cover.velux_window_roof_window` — VELUX Window Roof Window |
| `cover.close_cover` | `cover.velux_window_roof_window` — VELUX Window Roof Window |

<details><summary>Entità coinvolte e stato al momento della lettura</summary>

| Entità | Nome | Stato | Registro |
|---|---|---|---|
| `alarm_control_panel.allarme_casa` | Allarme Casa | disarmed | presente |
| `alarm_control_panel.aqara_hub_09ab_security_system_2` | Aqara Hub-09AB Security System | disarmed | presente |
| `cover.velux_window_roof_window` | VELUX Window Roof Window | open | presente |

</details>


[Torna all’indice](#indice-completo)

<a id="a08"></a>
### 08. Arm alarm

**Stato:** disabilitata. **Area:** Allarme. **Priorità:** P3 — disabilitata. **Modalità:** `single`.
**Identità:** `automation.arm_alarm`; ID YAML `1789853464137`.
**Fonte:** [config-backup/automations.yaml, riga 95](config-backup/automations.yaml) · [YAML individuale](schede-yaml/08-arm_alarm.yaml). Ultima azione avviata registrata: **22/10/2026 21:48:58 CEST**.

**Cosa la attiva.** Assenza movimento camera continuativa per 5 minuti.

**Condizioni.** 21:30–05:00 e porta camera chiusa da 2 minuti.

**Comportamento e tempi.** Volume Aqara 1, Aqara away, Allarme Casa home.

**Errori, rischi e interazioni.** DISABILITATA: non parte dai suoi trigger. È una delle logiche sostituite da #5, ma con tempi differenti. Se riabilitata aggirerebbe il controllo dei 12 contatti della nuova automazione.

**Preparazione dell’ottimizzazione.** Conservare come riferimento storico fino a chiarimento dei tempi; evitare una riattivazione insieme a #5 senza progetto comune.

**Prove disponibili.** Nessuna traccia conservata: non è possibile attestare l’esito storico di esecuzione.

| Comando previsto | Destinazioni esplicite o risolte da dispositivo/area |
|---|---|
| `number.set_value` | `number.aqara_hub_09ab_volume_2` — Aqara Hub-09AB Volume |
| `alarm_control_panel.alarm_arm_away` | `alarm_control_panel.aqara_hub_09ab_security_system_2` — Aqara Hub-09AB Security System |
| `alarm_control_panel.alarm_arm_home` | `alarm_control_panel.allarme_casa` — Allarme Casa |

<details><summary>Entità coinvolte e stato al momento della lettura</summary>

| Entità | Nome | Stato | Registro |
|---|---|---|---|
| `alarm_control_panel.allarme_casa` | Allarme Casa | disarmed | presente |
| `alarm_control_panel.aqara_hub_09ab_security_system_2` | Aqara Hub-09AB Security System | disarmed | presente |
| `binary_sensor.door_and_window_sensor_d1b1_contact_sensor_d1b1` | porta camera | off | presente |
| `binary_sensor.motion_sensor_20ae_2` | Motion Camera | off | presente |
| `number.aqara_hub_09ab_volume_2` | Aqara Hub-09AB Volume | 1 | presente |

</details>


[Torna all’indice](#indice-completo)

<a id="a09"></a>
### 09. Arm alarm porta

**Stato:** disabilitata. **Area:** Allarme. **Priorità:** P3 — disabilitata. **Modalità:** `single`.
**Identità:** `automation.arm_alarm_porta`; ID YAML `1789916414826`.
**Fonte:** [config-backup/automations.yaml, riga 295](config-backup/automations.yaml) · [YAML individuale](schede-yaml/09-arm_alarm_porta.yaml). Ultima azione avviata registrata: **22/10/2026 21:43:17 CEST**.

**Cosa la attiva.** Porta camera passa da aperta a chiusa.

**Condizioni.** 21:30–05:00 e sensore movimento camera rileva presenza al controllo iniziale.

**Comportamento e tempi.** Aspetta 1 minuto, volume 1, Aqara away, Allarme Casa home.

**Errori, rischi e interazioni.** DISABILITATA. Le condizioni non sono ricontrollate dopo il minuto: movimento o fascia possono essere cambiati. Non controlla gli altri contatti. Duplicazione parziale del ramo porta di #5.

**Preparazione dell’ottimizzazione.** Tenere come riferimento e confrontare il comportamento desiderato prima di rimuovere o riattivare.

**Prove disponibili.** Nessuna traccia conservata: non è possibile attestare l’esito storico di esecuzione.

| Comando previsto | Destinazioni esplicite o risolte da dispositivo/area |
|---|---|
| `number.set_value` | `number.aqara_hub_09ab_volume_2` — Aqara Hub-09AB Volume |
| `alarm_control_panel.alarm_arm_away` | `alarm_control_panel.aqara_hub_09ab_security_system_2` — Aqara Hub-09AB Security System |
| `alarm_control_panel.alarm_arm_home` | `alarm_control_panel.allarme_casa` — Allarme Casa |

<details><summary>Entità coinvolte e stato al momento della lettura</summary>

| Entità | Nome | Stato | Registro |
|---|---|---|---|
| `alarm_control_panel.allarme_casa` | Allarme Casa | disarmed | presente |
| `alarm_control_panel.aqara_hub_09ab_security_system_2` | Aqara Hub-09AB Security System | disarmed | presente |
| `binary_sensor.door_and_window_sensor_d1b1_contact_sensor_d1b1` | porta camera | off | presente |
| `binary_sensor.motion_sensor_20ae_2` | Motion Camera | off | presente |
| `number.aqara_hub_09ab_volume_2` | Aqara Hub-09AB Volume | 1 | presente |

</details>


[Torna all’indice](#indice-completo)

<a id="a10"></a>
### 10. Arma allarme double

**Stato:** abilitata. **Area:** Allarme. **Priorità:** P1. **Modalità:** `single`.
**Identità:** `automation.arma_allarme_double`; ID YAML `1791248442045`.
**Fonte:** [config-backup/automations.yaml, riga 1129](config-backup/automations.yaml) · [YAML individuale](schede-yaml/10-arma_allarme_double.yaml). Ultima azione avviata registrata: **29/10/2026 01:51:28 CET**.

**Cosa la attiva.** Uno dei due pannelli passa a uno stato armato.

**Condizioni.** Nessuna verifica di aperture, presenza o orario.

**Comportamento e tempi.** Forza Allarme Casa in home e Aqara in away.

**Errori, rischi e interazioni.** VERIFICATO: non conserva la modalità scelta dall’utente: un inserimento away di Allarme Casa può essere convertito in home. RISCHIO: aggira il controllo aperture di #5 e può ridurre l’uso della protezione interna #29, che richiede armed_away (attualmente #29 è disabilitata). Comandi ripetuti generano ulteriori cambi di stato; l’esito va coordinato con #19. Non è dimostrato un ciclo infinito.

**Preparazione dell’ottimizzazione.** Definire una matrice delle modalità tra Aqara e HA, un pannello autorevole e una procedura unica di inserimento.

**Prove disponibili.** 5 tracce conservate: finished=5.

| Comando previsto | Destinazioni esplicite o risolte da dispositivo/area |
|---|---|
| `alarm_control_panel.alarm_arm_home` | `alarm_control_panel.allarme_casa` — Allarme Casa |
| `alarm_control_panel.alarm_arm_away` | `alarm_control_panel.aqara_hub_09ab_security_system_2` — Aqara Hub-09AB Security System |

<details><summary>Entità coinvolte e stato al momento della lettura</summary>

| Entità | Nome | Stato | Registro |
|---|---|---|---|
| `alarm_control_panel.allarme_casa` | Allarme Casa | disarmed | presente |
| `alarm_control_panel.aqara_hub_09ab_security_system_2` | Aqara Hub-09AB Security System | disarmed | presente |

</details>


[Torna all’indice](#indice-completo)

<a id="a11"></a>
### 11. betatest sirena

**Stato:** abilitata. **Area:** Allarme. **Priorità:** P3. **Modalità:** `single`.
**Identità:** `automation.betatest_sirena`; ID YAML `1791763756703`.
**Fonte:** [config-backup/automations.yaml, riga 1366](config-backup/automations.yaml) · [YAML individuale](schede-yaml/11-betatest_sirena.yaml). Ultima azione avviata registrata: **23/10/2026 17:31:33 CEST**.

**Cosa la attiva.** Uno dei due pannelli entra in triggered.

**Condizioni.** Condizione not con lista vuota.

**Comportamento e tempi.** Nessuna azione: actions è una lista vuota.

**Errori, rischi e interazioni.** VERIFICATO: non fa suonare nessuna sirena e non produce effetti operativi. Nel codice HA esaminato not su lista vuota restituisce true; non la classifico come errore sintattico. Nome e configurazione sono soltanto un residuo di test.

**Preparazione dell’ottimizzazione.** Concordare se archiviare il test per ridurre ambiguità nell’inventario.

**Prove disponibili.** Nessuna traccia conservata: non è possibile attestare l’esito storico di esecuzione.

<details><summary>Entità coinvolte e stato al momento della lettura</summary>

| Entità | Nome | Stato | Registro |
|---|---|---|---|
| `alarm_control_panel.allarme_casa` | Allarme Casa | disarmed | presente |
| `alarm_control_panel.aqara_hub_09ab_security_system_2` | Aqara Hub-09AB Security System | disarmed | presente |

</details>


[Torna all’indice](#indice-completo)

<a id="a12"></a>
### 12. Caldo fuori apre velux

**Stato:** abilitata. **Area:** Velux. **Priorità:** P1. **Modalità:** `single`.
**Identità:** `automation.caldo_fuori_apre_velux`; ID YAML `1790791171721`.
**Fonte:** [config-backup/automations.yaml, riga 852](config-backup/automations.yaml) · [YAML individuale](schede-yaml/12-caldo_fuori_apre_velux.yaml). Ultima azione avviata registrata: **16/10/2026 15:06:14 CEST**.

**Cosa la attiva.** Temperatura esterna AA26 supera quella del sensore 3831 e mantiene la condizione per 5 minuti.

**Condizioni.** È sufficiente uno dei due pannelli disarmed (any).

**Comportamento e tempi.** Apre completamente il Velux. Non contiene chiusura.

**Errori, rischi e interazioni.** VERIFICATO: verso del confronto è esterna > altra temperatura; non apre quando fuori è più fresco. Il sensore 3831 si chiama genericamente “Sensore temperatura”: posizione fisica da confermare. RISCHIO: nessun limite orario, pioggia/vento, temperatura massima o chiusura al ribasso. Può riaprire dopo #13. Non è dimostrato che sia una logica di raffrescamento: il nome indica “Caldo fuori”.

**Preparazione dell’ottimizzazione.** Chiarire scopo fisico del confronto e posizione dei sensori; coordinare tutte le aperture/chiusure del Velux con un’unica politica.

**Prove disponibili.** Nessuna traccia conservata: non è possibile attestare l’esito storico di esecuzione.

| Comando previsto | Destinazioni esplicite o risolte da dispositivo/area |
|---|---|
| `cover.open_cover` | `cover.velux_window_roof_window` — VELUX Window Roof Window |

<details><summary>Entità coinvolte e stato al momento della lettura</summary>

| Entità | Nome | Stato | Registro |
|---|---|---|---|
| `alarm_control_panel.allarme_casa` | Allarme Casa | disarmed | presente |
| `alarm_control_panel.aqara_hub_09ab_security_system_2` | Aqara Hub-09AB Security System | disarmed | presente |
| `cover.velux_window_roof_window` | VELUX Window Roof Window | open | presente |
| `sensor.temperature_and_humidity_sensor_3831_temperature_sensor_3831` | Sensore temperatura | 19.4 | presente |
| `sensor.temperature_and_humidity_sensor_aa26_temperature_sensor_aa26` | Temperatura esterna | 12.2 | presente |

</details>


[Torna all’indice](#indice-completo)

<a id="a13"></a>
### 13. Chiusura velux

**Stato:** abilitata. **Area:** Velux. **Priorità:** P2. **Modalità:** `single`.
**Identità:** `automation.chiusura_velux`; ID YAML `1789920055194`.
**Fonte:** [config-backup/automations.yaml, riga 351](config-backup/automations.yaml) · [YAML individuale](schede-yaml/13-chiusura_velux.yaml). Ultima azione avviata registrata: **28/10/2026 17:09:17 CET**.

**Cosa la attiva.** Tramonto, offset zero.

**Condizioni.** Nessuna.

**Comportamento e tempi.** Invia cover.close_cover al Velux.

**Errori, rischi e interazioni.** Logica semplice; quattro tracce disponibili terminano finished. Un finished conferma la sequenza HA, non la chiusura fisica misurata. RISCHIO: nessun recupero all’avvio se il tramonto è stato perso, nessun controllo esito e #12 può riaprire dopo la chiusura.

**Preparazione dell’ottimizzazione.** Concordare se “chiuso dopo il tramonto” debba essere un vincolo continuo oppure un solo comando al tramonto.

**Prove disponibili.** 4 tracce conservate: finished=4.

| Comando previsto | Destinazioni esplicite o risolte da dispositivo/area |
|---|---|
| `cover.close_cover` | `cover.velux_window_roof_window` — VELUX Window Roof Window |

<details><summary>Entità coinvolte e stato al momento della lettura</summary>

| Entità | Nome | Stato | Registro |
|---|---|---|---|
| `cover.velux_window_roof_window` | VELUX Window Roof Window | open | presente |

</details>


[Torna all’indice](#indice-completo)

<a id="a14"></a>
### 14. Cortesia bagno

**Stato:** abilitata. **Area:** Luci interne. **Priorità:** P2. **Modalità:** `single`.
**Identità:** `automation.cortesia_bagno_2`; ID YAML `1789880062475`.
**Fonte:** [config-backup/automations.yaml, riga 184](config-backup/automations.yaml) · [YAML individuale](schede-yaml/14-cortesia_bagno_2.yaml). Ultima azione avviata registrata: **29/10/2026 09:36:39 CET**.

**Cosa la attiva.** Movimento del sensore Motion ascensore (9a83).

**Condizioni.** Nessuna fascia oraria o luminosità.

**Comportamento e tempi.** Accende Luce ascensore al 100%, aspetta 2 minuti, spegne. Il nome “bagno” non coincide con i nomi attuali di sensore e luce.

**Errori, rischi e interazioni.** OSSERVATO: luce unavailable al momento della lettura. Tracce includono un avvio failed_single e quattro esecuzioni finished; registro con 42 occorrenze aggregate di Already running. RISCHIO: il tempo è dal primo rilevamento, non dall’ultimo movimento; può spegnere mentre c’è ancora qualcuno e non riaccendere finché non arriva un nuovo evento utile.

**Preparazione dell’ottimizzazione.** Verificare dispositivo e nomi, poi concordare spegnimento per assenza movimento o durata fissa. Un finished storico non risolve l’indisponibilità attuale.

**Prove disponibili.** 5 tracce conservate: failed_single=1, finished=4.

| Registro | Occorrenze aggregate | Ultima occorrenza | Messaggi conservati |
|---|---:|---|---|
| WARNING | 42 | 29/10/2026 09:15:17 CET | Cortesia bagno: Already running |

Le occorrenze sono contatori aggregati del registro; se una riga conserva più messaggi, il contatore non è un numero attribuibile con precisione a ciascun messaggio.

| Comando previsto | Destinazioni esplicite o risolte da dispositivo/area |
|---|---|
| `light.turn_on` | `light.lightbulb_78d9_2` — Luce ascensore |
| `light.turn_off` | `light.lightbulb_78d9_2` — Luce ascensore |

<details><summary>Entità coinvolte e stato al momento della lettura</summary>

| Entità | Nome | Stato | Registro |
|---|---|---|---|
| `binary_sensor.motion_sensor_9a83_2` | Motion ascensore | off | presente |
| `light.lightbulb_78d9_2` | Luce ascensore | unavailable | presente |

</details>


[Torna all’indice](#indice-completo)

<a id="a15"></a>
### 15. Cortesia da fumo

**Stato:** abilitata. **Area:** Luci interne. **Priorità:** P2. **Modalità:** `single`.
**Identità:** `automation.cortesia_da_fumo`; ID YAML `1791764334194`.
**Fonte:** [config-backup/automations.yaml, riga 1383](config-backup/automations.yaml) · [YAML individuale](schede-yaml/15-cortesia_da_fumo.yaml). Ultima azione avviata registrata: **29/10/2026 01:49:45 CET**.

**Cosa la attiva.** Movimento di sala.

**Condizioni.** 23:50–05:50.

**Comportamento e tempi.** Accende gateway Aqara e Luce ingresso con RGB 235,192,23; aspetta 5 minuti e spegne entrambe.

**Errori, rischi e interazioni.** VERIFICATO: Luce ingresso dichiara solo color_temp e non può riprodurre un colore RGB arbitrario; conversione o resa effettiva non provata. OSSERVATO: registro Already running. RISCHIO: single non prolunga i 5 minuti e spegne anche una luce accesa manualmente. Conflitto con #6, #21, #23, #46 e #51 sul gateway.

**Preparazione dell’ottimizzazione.** Concordare colore supportato, intensità, conservazione delle accensioni manuali e precedenza delle segnalazioni allarme.

**Prove disponibili.** 5 tracce conservate: failed_conditions=5.

| Registro | Occorrenze aggregate | Ultima occorrenza | Messaggi conservati |
|---|---:|---|---|
| WARNING | 3 | 29/10/2026 01:44:14 CET | Cortesia da fumo : Already running |

Le occorrenze sono contatori aggregati del registro; se una riga conserva più messaggi, il contatore non è un numero attribuibile con precisione a ciascun messaggio.

| Comando previsto | Destinazioni esplicite o risolte da dispositivo/area |
|---|---|
| `light.turn_on` | `light.aqara_hub_09ab_lightbulb_09ab_2` — Aqara Hub-09AB Lightbulb-09AB; `light.lightbulb_78da_2` — Luce ingresso |
| `light.turn_off` | `light.aqara_hub_09ab_lightbulb_09ab_2` — Aqara Hub-09AB Lightbulb-09AB; `light.lightbulb_78da_2` — Luce ingresso |

<details><summary>Entità coinvolte e stato al momento della lettura</summary>

| Entità | Nome | Stato | Registro |
|---|---|---|---|
| `binary_sensor.sala_movimento` | sala Movimento | on | presente |
| `light.aqara_hub_09ab_lightbulb_09ab_2` | Aqara Hub-09AB Lightbulb-09AB | off | presente |
| `light.lightbulb_78da_2` | Luce ingresso | off | presente |

</details>


[Torna all’indice](#indice-completo)

<a id="a16"></a>
### 16. Cortesia letto

**Stato:** abilitata. **Area:** Luci interne. **Priorità:** P2. **Modalità:** `single`.
**Identità:** `automation.cortesia_letto`; ID YAML `1789884797776`.
**Fonte:** [config-backup/automations.yaml, riga 213](config-backup/automations.yaml) · [YAML individuale](schede-yaml/16-cortesia_letto.yaml). Ultima azione avviata registrata: **29/10/2026 08:24:07 CET**.

**Cosa la attiva.** Movimento camera (20ae).

**Condizioni.** 20:00–08:30.

**Comportamento e tempi.** Luce letto bianca RGB al 20%, attesa 1 minuto, spegnimento del dispositivo Luce letto. Il registro conferma che l’entità accesa e quella spenta appartengono allo stesso dispositivo.

**Errori, rischi e interazioni.** OSSERVATO: Already running nel registro. RISCHIO: single non estende il minuto; può spegnere un’accensione manuale dei pulsanti #52/#54 o interferire con allarme #3/#5/#21. Non serve allarme disinserito per accendersi.

**Preparazione dell’ottimizzazione.** Definire cortesia versus comando manuale e priorità allarme; concordare il criterio per lo spegnimento.

**Prove disponibili.** 5 tracce conservate: failed_conditions=1, finished=4.

| Registro | Occorrenze aggregate | Ultima occorrenza | Messaggi conservati |
|---|---:|---|---|
| WARNING | 1 | 29/10/2026 07:07:17 CET | Cortesia letto : Already running |

Le occorrenze sono contatori aggregati del registro; se una riga conserva più messaggi, il contatore non è un numero attribuibile con precisione a ciascun messaggio.

| Comando previsto | Destinazioni esplicite o risolte da dispositivo/area |
|---|---|
| `light.turn_on` | `light.1000ee1aa7_color_rgb` — Luce letto  Luce letto |
| `light.turn_off` | `light.1000ee1aa7_color_rgb` — Luce letto  Luce letto |

<details><summary>Entità coinvolte e stato al momento della lettura</summary>

| Entità | Nome | Stato | Registro |
|---|---|---|---|
| `binary_sensor.motion_sensor_20ae_2` | Motion Camera | off | presente |
| `light.1000ee1aa7_color_rgb` | Luce letto  Luce letto | off | presente |

</details>


[Torna all’indice](#indice-completo)

<a id="a17"></a>
### 17. Cortesia scale

**Stato:** abilitata. **Area:** Luci interne. **Priorità:** P1. **Modalità:** `single`.
**Identità:** `automation.cortesia_scale`; ID YAML `1791917088493`.
**Fonte:** [config-backup/automations.yaml, riga 1422](config-backup/automations.yaml) · [YAML individuale](schede-yaml/17-cortesia_scale.yaml). Ultima azione avviata registrata: **29/10/2026 08:41:47 CET**.

**Cosa la attiva.** Movimento Scale taverna (binary_sensor.1).

**Condizioni.** Nessuna condizione.

**Comportamento e tempi.** Lampada scale RGB caldo 255,137,14 al 100%, attesa 2 minuti, spegnimento.

**Errori, rischi e interazioni.** OSSERVATO: registro contiene errori reali di invio/rifiuto comandi Tuya, anche all’azione di spegnimento, oltre a Already running. Le cinque tracce recenti non conservano quei guasti: quattro finished e un failed_single. RISCHIO: lampada può restare accesa se lo spegnimento fallisce; conflitto diretto sullo stesso evento e attuatore con #50.

**Preparazione dell’ottimizzazione.** Prima di ottimizzare i tempi, diagnosticare l’affidabilità Tuya e decidere la priorità tra luce di cortesia e spia allarme.

**Prove disponibili.** 5 tracce conservate: failed_single=1, finished=4.

| Registro | Occorrenze aggregate | Ultima occorrenza | Messaggi conservati |
|---|---:|---|---|
| WARNING | 67 | 29/10/2026 08:36:20 CET | Cortesia scale : Already running / Cortesia scale : Error executing script. Error for call_service at pos 3: Failed to send the command to the Tuya cloud / Cortesia scale : Error executing script. Error for call_service at pos 3: The Tuya cloud rejected the command |
| ERROR | 3 | 28/10/2026 18:54:15 CET | Error while executing automation automation.cortesia_scale: Failed to send the command to the Tuya cloud / Error while executing automation automation.cortesia_scale: The Tuya cloud rejected the command |

Le occorrenze sono contatori aggregati del registro; se una riga conserva più messaggi, il contatore non è un numero attribuibile con precisione a ciascun messaggio.

| Comando previsto | Destinazioni esplicite o risolte da dispositivo/area |
|---|---|
| `light.turn_on` | `light.lampada_scale` — Lampada scale |
| `light.turn_off` | `light.lampada_scale` — Lampada scale |

<details><summary>Entità coinvolte e stato al momento della lettura</summary>

| Entità | Nome | Stato | Registro |
|---|---|---|---|
| `binary_sensor.1` | Scale taverna | off | presente |
| `light.lampada_scale` | Lampada scale | on | presente |

</details>


[Torna all’indice](#indice-completo)

<a id="a18"></a>
### 18. Disarm alarm

**Stato:** abilitata. **Area:** Allarme. **Priorità:** P1. **Modalità:** `single`.
**Identità:** `automation.disarm_alarm`; ID YAML `1789854301579`.
**Fonte:** [config-backup/automations.yaml, riga 146](config-backup/automations.yaml) · [YAML individuale](schede-yaml/18-disarm_alarm.yaml). Ultima azione avviata registrata: **29/10/2026 08:24:07 CET**.

**Cosa la attiva.** Movimento camera oppure apertura porta camera off→on.

**Condizioni.** 05:45–08:30, tutti i giorni.

**Comportamento e tempi.** Disarma entrambi i pannelli allarme.

**Errori, rischi e interazioni.** VERIFICATO: qualunque evento valido in quella fascia disarma senza ulteriori condizioni di identità o presenza. Non è automaticamente un bug, ma è una scelta di protezione rilevante. Anche se i pannelli sono già disarmati invia il comando; #19 replica la sincronizzazione. Le tracce mostrano esecuzioni finished e una corretta esclusione fuori fascia.

**Preparazione dell’ottimizzazione.** Confermare esplicitamente che movimento/apertura porta debbano disarmare l’intera casa; definire quali stati consentire e ridurre i comandi ridondanti.

**Prove disponibili.** 5 tracce conservate: failed_conditions=1, finished=4.

| Comando previsto | Destinazioni esplicite o risolte da dispositivo/area |
|---|---|
| `alarm_control_panel.alarm_disarm` | `alarm_control_panel.allarme_casa` — Allarme Casa; `alarm_control_panel.aqara_hub_09ab_security_system_2` — Aqara Hub-09AB Security System |

<details><summary>Entità coinvolte e stato al momento della lettura</summary>

| Entità | Nome | Stato | Registro |
|---|---|---|---|
| `alarm_control_panel.allarme_casa` | Allarme Casa | disarmed | presente |
| `alarm_control_panel.aqara_hub_09ab_security_system_2` | Aqara Hub-09AB Security System | disarmed | presente |
| `binary_sensor.door_and_window_sensor_d1b1_contact_sensor_d1b1` | porta camera | off | presente |
| `binary_sensor.motion_sensor_20ae_2` | Motion Camera | off | presente |

</details>


[Torna all’indice](#indice-completo)

<a id="a19"></a>
### 19. disarm double allarm

**Stato:** abilitata. **Area:** Allarme. **Priorità:** P2. **Modalità:** `single`.
**Identità:** `automation.disarm_double_allarm`; ID YAML `1791247502044`.
**Fonte:** [config-backup/automations.yaml, riga 1107](config-backup/automations.yaml) · [YAML individuale](schede-yaml/19-disarm_double_allarm.yaml). Ultima azione avviata registrata: **29/10/2026 06:19:49 CET**.

**Cosa la attiva.** Uno dei due pannelli diventa disarmed.

**Condizioni.** Nessuna.

**Comportamento e tempi.** Invia disarmo a entrambi i pannelli, incluso quello che ha appena generato l’evento.

**Errori, rischi e interazioni.** OSSERVATO: avvii failed_single nelle tracce e Already running nel registro. La ripetizione degli eventi mentre è in esecuzione è coerente con la sincronizzazione; non prova da sola un errore funzionale. RISCHIO: uno dei due pannelli può disarmare l’altro senza ulteriori controlli; va stabilito se questo sia il comportamento voluto.

**Preparazione dell’ottimizzazione.** Definire autorità e sincronizzazione bidirezionale, chiamando solo il pannello che necessita di cambiare stato.

**Prove disponibili.** 5 tracce conservate: failed_single=1, finished=4.

| Registro | Occorrenze aggregate | Ultima occorrenza | Messaggi conservati |
|---|---:|---|---|
| WARNING | 3 | 29/10/2026 00:10:59 CET | disarm double allarm: Already running |

Le occorrenze sono contatori aggregati del registro; se una riga conserva più messaggi, il contatore non è un numero attribuibile con precisione a ciascun messaggio.

| Comando previsto | Destinazioni esplicite o risolte da dispositivo/area |
|---|---|
| `alarm_control_panel.alarm_disarm` | `alarm_control_panel.allarme_casa` — Allarme Casa; `alarm_control_panel.aqara_hub_09ab_security_system_2` — Aqara Hub-09AB Security System |

<details><summary>Entità coinvolte e stato al momento della lettura</summary>

| Entità | Nome | Stato | Registro |
|---|---|---|---|
| `alarm_control_panel.allarme_casa` | Allarme Casa | disarmed | presente |
| `alarm_control_panel.aqara_hub_09ab_security_system_2` | Aqara Hub-09AB Security System | disarmed | presente |

</details>


[Torna all’indice](#indice-completo)

<a id="a20"></a>
### 20. faretto telecamera ingresso accende fari torre ingresso

**Stato:** disabilitata. **Area:** Luci esterne / telecamere. **Priorità:** P2 — disabilitata. **Modalità:** `single`.
**Identità:** `automation.faretto_telecamera_ingresso_accende_fari_torre_ingresso`; ID YAML `1792950598614`.
**Fonte:** [config-backup/automations.yaml, riga 2242](config-backup/automations.yaml) · [YAML individuale](schede-yaml/20-faretto_telecamera_ingresso_accende_fari_torre_ingresso.yaml). Ultima azione avviata registrata: **26/10/2026 12:20:23 CET**.

**Cosa la attiva.** Qualsiasi cambiamento di stato che parte da on oppure off del faretto ingresso o della torre ingresso; non è specificato un to.

**Condizioni.** Nessuna, nemmeno sole tramontato.

**Comportamento e tempi.** Accende sia torre ingresso sia faretto telecamera.

**Errori, rischi e interazioni.** VERIFICATO: anche uno spegnimento on→off può provocare la riaccensione. Se abilitata insieme a #45, il suo “accendi sempre” entra in conflitto con lo spegnimento del faretto. OSSERVATO: tre failed_single fra le cinque tracce e Already running storico. Attualmente disabilitata, quindi il difetto non è operativo.

**Preparazione dell’ottimizzazione.** Progettare la direzione di sincronizzazione e filtrare transizioni e stato finale desiderato prima di riabilitare.

**Prove disponibili.** 5 tracce conservate: failed_single=3, finished=2.

| Registro | Occorrenze aggregate | Ultima occorrenza | Messaggi conservati |
|---|---:|---|---|
| WARNING | 36 | 26/10/2026 12:20:24 CET | faretto telecamera ingresso accende fari torre ingresso: Already running |

Le occorrenze sono contatori aggregati del registro; se una riga conserva più messaggi, il contatore non è un numero attribuibile con precisione a ciascun messaggio.

| Comando previsto | Destinazioni esplicite o risolte da dispositivo/area |
|---|---|
| `switch.turn_on` | `switch.100184e599_power` — Torre ingresso  Torre ingresso |
| `light.turn_on` | `light.esterno_ingresso_faretto` — Ingresso  Faretto |

<details><summary>Entità coinvolte e stato al momento della lettura</summary>

| Entità | Nome | Stato | Registro |
|---|---|---|---|
| `light.esterno_ingresso_faretto` | Ingresso  Faretto | off | presente |
| `switch.100184e599_power` | Torre ingresso  Torre ingresso | off | presente |

</details>


[Torna all’indice](#indice-completo)

<a id="a21"></a>
### 21. finestre aperte

**Stato:** abilitata. **Area:** Allarme. **Priorità:** P2. **Modalità:** `single`.
**Identità:** `automation.finestre_aperte`; ID YAML `1791245855834`.
**Fonte:** [config-backup/automations.yaml, riga 1024](config-backup/automations.yaml) · [YAML individuale](schede-yaml/21-finestre_aperte.yaml). Ultima azione avviata registrata: **23/10/2026 17:31:33 CEST**.

**Cosa la attiva.** Apertura di uno degli stessi 10 contatti di #1.

**Condizioni.** Almeno uno dei due pannelli risulta armato.

**Comportamento e tempi.** Due cicli: toggle arancione, spegni, accendi blu, spegni, con pause di 1 secondo; durata nominale circa 8 secondi.

**Errori, rischi e interazioni.** VERIFICATO: non elenca aperture già aperte: segnala soltanto nuove aperture. Esclude Porta taverna come #1. RISCHIO: concorrenza sulla luce letto con #3/#5/#16 e pulsanti; il toggle dipende dallo stato precedente e può iniziare spegnendo anziché accendendo. Termina spento senza ripristino.

**Preparazione dell’ottimizzazione.** Chiarire se serve una segnalazione di apertura con allarme già armato o un controllo pre-inserimento; coordinare la luce unica di segnalazione.

**Prove disponibili.** 5 tracce conservate: failed_conditions=5.

| Comando previsto | Destinazioni esplicite o risolte da dispositivo/area |
|---|---|
| `light.toggle` | `light.1000ee1aa7_color_rgb` — Luce letto  Luce letto |
| `light.turn_off` | `light.1000ee1aa7_color_rgb` — Luce letto  Luce letto |
| `light.turn_on` | `light.1000ee1aa7_color_rgb` — Luce letto  Luce letto |

<details><summary>Entità coinvolte e stato al momento della lettura</summary>

| Entità | Nome | Stato | Registro |
|---|---|---|---|
| `alarm_control_panel.allarme_casa` | Allarme Casa | disarmed | presente |
| `alarm_control_panel.aqara_hub_09ab_security_system_2` | Aqara Hub-09AB Security System | disarmed | presente |
| `binary_sensor.door_and_window_sensor_146f_contact_sensor_146f_2` | Finestra TV | off | presente |
| `binary_sensor.door_and_window_sensor_2602_contact_sensor_2602` | Velux | on | presente |
| `binary_sensor.door_and_window_sensor_8343_contact_sensor_8343` | Portone ingresso | off | presente |
| `binary_sensor.door_and_window_sensor_8371_contact_sensor_8371_2` | Finestra scorrevole cucina | off | presente |
| `binary_sensor.door_and_window_sensor_b21b_contact_sensor_b21b` | Finestra bagnetto | off | presente |
| `binary_sensor.door_and_window_sensor_bd83_contact_sensor_bd83` | Portafinestra cameretta | off | presente |
| `binary_sensor.door_and_window_sensor_e2ec_contact_sensor_e2ec_2` | Portafinestra sala | off | presente |
| `binary_sensor.door_and_window_sensor_e37a_contact_sensor_e37a` | Porta terrazza | off | presente |
| `binary_sensor.door_and_window_sensor_f81b_contact_sensor_f81b` | Finestra bagno | off | presente |
| `binary_sensor.door_and_window_sensor_f92e_contact_sensor_f92e` | Portafinestra camera | on | presente |
| `light.1000ee1aa7_color_rgb` | Luce letto  Luce letto | off | presente |

</details>


[Torna all’indice](#indice-completo)

<a id="a22"></a>
### 22. Growatt - Allarmi e comunicazione USB

**Stato:** abilitata. **Area:** Energia. **Priorità:** P2. **Modalità:** `queued`, max `10`.
**Identità:** `automation.growatt_allarmi_e_comunicazione_usb`; ID YAML `1792587906212`.
**Fonte:** [config-backup/automations.yaml, riga 1946](config-backup/automations.yaml) · [YAML individuale](schede-yaml/22-growatt_allarmi_e_comunicazione_usb.yaml). Ultima azione avviata registrata: **25/10/2026 15:37:22 CET**.

**Cosa la attiva.** Fault/warning di uno dei due Growatt attraversa >0; stato inverter diventa unknown o unavailable per 2 minuti.

**Condizioni.** Nessuna condizione aggiuntiva.

**Comportamento e tempi.** Crea/aggiorna una notifica persistente con ID distinto per guasto/warning/USB e inverter. Coda queued fino a 10 esecuzioni. Gestisce anche l’assenza di trigger in un’esecuzione manuale.

**Errori, rischi e interazioni.** I quattro codici sono 0 e i due stati sono leggibili nello snapshot. Una traccia USB termina finished. RISCHIO: un codice che cambia da positivo a un altro positivo non riattraversa la soglia; guasti già presenti all’avvio possono non produrre un nuovo evento. Non avvisa del ripristino e non cancella la notifica dopo la risoluzione. Solo avviso interno HA, nessun push esplicito.

**Preparazione dell’ottimizzazione.** Concordare notifica di ogni cambio codice, ripristino comunicazione e canali di avviso; aggiungere una futura verifica dello stato iniziale.

**Prove disponibili.** 1 tracce conservate: finished=1.

| Comando previsto | Destinazioni esplicite o risolte da dispositivo/area |
|---|---|
| `persistent_notification.create` | Nessuna entità target: dati, template o chiamata informativa (vedi YAML). |

<details><summary>Entità coinvolte e stato al momento della lettura</summary>

| Entità | Nome | Stato | Registro |
|---|---|---|---|
| `sensor.growatt_1_fault_code` | Growatt 1 Fault Code | 0 | presente |
| `sensor.growatt_1_stato` | Growatt 1 Stato | 12 | presente |
| `sensor.growatt_1_warning_code` | Growatt 1 Warning Code | 0 | presente |
| `sensor.growatt_2_fault_code` | Growatt 2 Fault Code | 0 | presente |
| `sensor.growatt_2_stato` | Growatt 2 Stato | 12 | presente |
| `sensor.growatt_2_warning_code` | Growatt 2 Warning Code | 0 | presente |

</details>


[Torna all’indice](#indice-completo)

<a id="a23"></a>
### 23. Ingresso apre, luce  accende

**Stato:** abilitata. **Area:** Luci interne. **Priorità:** P2. **Modalità:** `single`.
**Identità:** `automation.ingresso_apre_luce_accende`; ID YAML `1790445492572`.
**Fonte:** [config-backup/automations.yaml, riga 774](config-backup/automations.yaml) · [YAML individuale](schede-yaml/23-ingresso_apre_luce_accende.yaml). Ultima azione avviata registrata: **29/10/2026 00:11:04 CET**.

**Cosa la attiva.** Apertura off→on del Portone ingresso.

**Condizioni.** Sole tramontato.

**Comportamento e tempi.** Luce ingresso 2000 K al 2%, gateway Aqara 3274 K al 3%; dopo 2 minuti spegne entrambe.

**Errori, rischi e interazioni.** VERIFICATO: 2000 K è sotto il minimo dichiarato dalla Luce ingresso (2702 K): valore richiesto non riproducibile esattamente; comportamento di adattamento da verificare. OSSERVATO: Already running nel registro. RISCHIO: single non prolunga il tempo sulle riaperture; sovrascrive accensioni manuali e condivide gateway con le segnalazioni allarme.

**Preparazione dell’ottimizzazione.** Usare parametri supportati e definire priorità, estensione del tempo e rispetto delle accensioni già presenti.

**Prove disponibili.** 5 tracce conservate: failed_conditions=5.

| Registro | Occorrenze aggregate | Ultima occorrenza | Messaggi conservati |
|---|---:|---|---|
| WARNING | 17 | 28/10/2026 20:08:19 CET | Ingresso apre, luce  accende : Already running |

Le occorrenze sono contatori aggregati del registro; se una riga conserva più messaggi, il contatore non è un numero attribuibile con precisione a ciascun messaggio.

| Comando previsto | Destinazioni esplicite o risolte da dispositivo/area |
|---|---|
| `light.turn_on` | `light.lightbulb_78da_2` — Luce ingresso |
| `light.turn_on` | `light.aqara_hub_09ab_lightbulb_09ab_2` — Aqara Hub-09AB Lightbulb-09AB |
| `light.turn_off` | `light.aqara_hub_09ab_lightbulb_09ab_2` — Aqara Hub-09AB Lightbulb-09AB; `light.lightbulb_78da_2` — Luce ingresso |

<details><summary>Entità coinvolte e stato al momento della lettura</summary>

| Entità | Nome | Stato | Registro |
|---|---|---|---|
| `binary_sensor.door_and_window_sensor_8343_contact_sensor_8343` | Portone ingresso | off | presente |
| `light.aqara_hub_09ab_lightbulb_09ab_2` | Aqara Hub-09AB Lightbulb-09AB | off | presente |
| `light.lightbulb_78da_2` | Luce ingresso | off | presente |

</details>


[Torna all’indice](#indice-completo)

<a id="a24"></a>
### 24. Interruttore ingresso accende luci

**Stato:** abilitata. **Area:** Pulsanti / luci interne. **Priorità:** P2. **Modalità:** `single`.
**Identità:** `automation.accensione_luci`; ID YAML `1789849740291`.
**Fonte:** [config-backup/automations.yaml, riga 70](config-backup/automations.yaml) · [YAML individuale](schede-yaml/24-accensione_luci.yaml). Ultima azione avviata registrata: **23/09/2026 13:11:29 CEST**.

**Cosa la attiva.** Rilascio lungo (long_release) del pulsante 2 Soggiorno.

**Condizioni.** Nessuna.

**Comportamento e tempi.** Accende prima Luce ascensore e poi Luce ingresso al 100%, usando i dispositivi come destinazione.

**Errori, rischi e interazioni.** OSSERVATO: Luce ascensore unavailable. Un fallimento del primo comando può impedire il secondo, ma non ogni dispositivo indisponibile genera necessariamente un’eccezione. Nessuna traccia conservata. Il nome ingresso non descrive il pulsante Soggiorno e la doppia destinazione.

**Preparazione dell’ottimizzazione.** Concordare nomi e indipendenza delle due accensioni; verificare la lampada indisponibile.

**Prove disponibili.** Nessuna traccia conservata: non è possibile attestare l’esito storico di esecuzione.

| Comando previsto | Destinazioni esplicite o risolte da dispositivo/area |
|---|---|
| `light.turn_on` | `light.lightbulb_78d9_2` — Luce ascensore |
| `light.turn_on` | `light.lightbulb_78da_2` — Luce ingresso |

<details><summary>Entità coinvolte e stato al momento della lettura</summary>

| Entità | Nome | Stato | Registro |
|---|---|---|---|
| `event.soggiorno_switch_button_2` | Soggiorno switch Button 2 | 2026-09-23T11:11:32.459+00:00 | presente |
| `light.lightbulb_78d9_2` | Luce ascensore | unavailable | presente |
| `light.lightbulb_78da_2` | Luce ingresso | off | presente |

</details>


[Torna all’indice](#indice-completo)

<a id="a25"></a>
### 25. Interruttore sonoff

**Stato:** abilitata. **Area:** Pulsanti / luci esterne. **Priorità:** P1. **Modalità:** `single`.
**Identità:** `automation.interruttore_sonoff`; ID YAML `1789839853555`.
**Fonte:** [config-backup/automations.yaml, riga 1](config-backup/automations.yaml) · [YAML individuale](schede-yaml/25-interruttore_sonoff.yaml). Ultima azione avviata registrata: **23/09/2026 09:14:21 CEST**.

**Cosa la attiva.** short_release oppure long_press del pulsante 1 Soggiorno.

**Condizioni.** Nessuna.

**Comportamento e tempi.** Accende CIABATTA VOLANTE e TORRE ORTO. Le espansioni dei dispositivi risolvono alle rispettive entità power.

**Errori, rischi e interazioni.** VERIFICATO: long_press è anche il trigger di #47, che prima spegne e poi esegue toggle. Le due automazioni possono impartire comandi opposti senza ordine garantito. Non sono disponibili tracce recenti per ricostruire un episodio concreto.

**Preparazione dell’ottimizzazione.** Assegnare eventi distinti ad accensione e spegnimento o un’unica logica per il pulsante; chiarire il significato della pressione lunga.

**Prove disponibili.** Nessuna traccia conservata: non è possibile attestare l’esito storico di esecuzione.

| Comando previsto | Destinazioni esplicite o risolte da dispositivo/area |
|---|---|
| `switch.turn_on` | `switch.100185132f_power` — Ciabatta volante |
| `switch.turn_on` | `switch.1002963641_power` — TORRE ORTO  TORRE ORTO |

<details><summary>Entità coinvolte e stato al momento della lettura</summary>

| Entità | Nome | Stato | Registro |
|---|---|---|---|
| `event.soggiorno_switch_button_1` | Soggiorno switch Button 1 | 2026-09-23T07:14:21.042+00:00 | presente |
| `switch.100185132f_power` | Ciabatta volante | off | presente |
| `switch.1002963641_power` | TORRE ORTO  TORRE ORTO | off | presente |

</details>


[Torna all’indice](#indice-completo)

<a id="a26"></a>
### 26. Luci parcheggio al tramonto

**Stato:** abilitata. **Area:** Luci esterne. **Priorità:** P2. **Modalità:** `single`.
**Identità:** `automation.luci_parcheggio_al_tramonto`; ID YAML `1790704217806`.
**Fonte:** [config-backup/automations.yaml, riga 817](config-backup/automations.yaml) · [YAML individuale](schede-yaml/26-luci_parcheggio_al_tramonto.yaml). Ultima azione avviata registrata: **28/10/2026 17:09:17 CET**.

**Cosa la attiva.** Tramonto.

**Condizioni.** Nessuna.

**Comportamento e tempi.** Aspetta 15 minuti e accende PARCHEGGIO (switch.10001119b3_power); aspetta altri 15 minuti e accende TORRE INGRESSO (switch.100184e599_power).

**Errori, rischi e interazioni.** VERIFICATO: l’automazione non riguarda soltanto il parcheggio; seconda accensione a tramonto +30 minuti. RISCHIO: la torre è spenta da #28 dopo 2 minuti dal movimento e non ritorna automaticamente accesa per la notte. Riavvio durante l’attesa perde l’accensione prevista. #4 può spegnere il parcheggio a fine allarme.

**Preparazione dell’ottimizzazione.** Concordare se sono luci notturne fisse oppure di passaggio; sostituire in futuro i lunghi ritardi con eventi/scadenze indipendenti.

**Prove disponibili.** 4 tracce conservate: finished=4.

| Comando previsto | Destinazioni esplicite o risolte da dispositivo/area |
|---|---|
| `switch.turn_on` | `switch.10001119b3_power` — PARCHEGGIO  PARCHEGGIO |
| `switch.turn_on` | `switch.100184e599_power` — Torre ingresso  Torre ingresso |

<details><summary>Entità coinvolte e stato al momento della lettura</summary>

| Entità | Nome | Stato | Registro |
|---|---|---|---|
| `switch.10001119b3_power` | PARCHEGGIO  PARCHEGGIO | off | presente |
| `switch.100184e599_power` | Torre ingresso  Torre ingresso | off | presente |

</details>


[Torna all’indice](#indice-completo)

<a id="a27"></a>
### 27. Movimento cancello accende giardino

**Stato:** abilitata. **Area:** Luci esterne. **Priorità:** P2. **Modalità:** `single`.
**Identità:** `automation.movimento_cancello_accende_giardino`; ID YAML `1792284834030`.
**Fonte:** [config-backup/automations.yaml, riga 1602](config-backup/automations.yaml) · [YAML individuale](schede-yaml/27-movimento_cancello_accende_giardino.yaml). Ultima azione avviata registrata: **29/10/2026 05:59:42 CET**.

**Cosa la attiva.** Movimento cancello continuativo per 1 secondo.

**Condizioni.** Sole tramontato e GIARDINO attualmente spento.

**Comportamento e tempi.** Accende GIARDINO, attende 2 minuti e spegne.

**Errori, rischi e interazioni.** Il controllo iniziale evita di prendere in carico una luce già accesa. OSSERVATO: Already running nel registro. RISCHIO: nuovi movimenti non prolungano la luce in single; non distingue un comando manuale ricevuto durante il minuto. Interferisce con i lampeggi e l’accensione allarme #4.

**Preparazione dell’ottimizzazione.** Concordare spegnimento per assenza, rispetto del manuale e precedenza dell’allarme.

**Prove disponibili.** 5 tracce conservate: failed_conditions=5.

| Registro | Occorrenze aggregate | Ultima occorrenza | Messaggi conservati |
|---|---:|---|---|
| WARNING | 5 | 28/10/2026 17:54:07 CET | Movimento cancello accende giardino : Already running |

Le occorrenze sono contatori aggregati del registro; se una riga conserva più messaggi, il contatore non è un numero attribuibile con precisione a ciascun messaggio.

| Comando previsto | Destinazioni esplicite o risolte da dispositivo/area |
|---|---|
| `switch.turn_on` | `switch.1000111b06_power` — GIARDINO  GIARDINO |
| `switch.turn_off` | `switch.1000111b06_power` — GIARDINO  GIARDINO |

<details><summary>Entità coinvolte e stato al momento della lettura</summary>

| Entità | Nome | Stato | Registro |
|---|---|---|---|
| `binary_sensor.cancello_movimento` | cancello Movimento | off | presente |
| `switch.1000111b06_power` | GIARDINO  GIARDINO | off | presente |

</details>


[Torna all’indice](#indice-completo)

<a id="a28"></a>
### 28. Movimento esterno accende torre ingresso

**Stato:** abilitata. **Area:** Luci esterne. **Priorità:** P1. **Modalità:** `single`.
**Identità:** `automation.movimento_esterno_accende_torre_ingresso`; ID YAML `1791935822844`.
**Fonte:** [config-backup/automations.yaml, riga 1455](config-backup/automations.yaml) · [YAML individuale](schede-yaml/28-movimento_esterno_accende_torre_ingresso.yaml). Ultima azione avviata registrata: **29/10/2026 06:11:16 CET**.

**Cosa la attiva.** Movimento esterno ingresso continuativo per 2 secondi.

**Condizioni.** Sole tramontato.

**Comportamento e tempi.** Accende TORRE INGRESSO per 2 minuti, poi spegne.

**Errori, rischi e interazioni.** VERIFICATO: non controlla se la torre è già accesa e può spegnere la luce notturna attivata da #26 o un’accensione manuale. OSSERVATO: registro con 112 occorrenze aggregate Already running. single non estende il tempo con nuovi movimenti. La coppia di sincronizzazione #20/#45 è attualmente disabilitata.

**Preparazione dell’ottimizzazione.** Chiarire se la torre debba restare accesa dopo tramonto +30; definire una sola politica di controllo per l’attuatore.

**Prove disponibili.** 5 tracce conservate: finished=5.

| Registro | Occorrenze aggregate | Ultima occorrenza | Messaggi conservati |
|---|---:|---|---|
| WARNING | 112 | 29/10/2026 05:56:22 CET | Movimento esterno accende torre ingresso : Already running |

Le occorrenze sono contatori aggregati del registro; se una riga conserva più messaggi, il contatore non è un numero attribuibile con precisione a ciascun messaggio.

| Comando previsto | Destinazioni esplicite o risolte da dispositivo/area |
|---|---|
| `switch.turn_on` | `switch.100184e599_power` — Torre ingresso  Torre ingresso |
| `switch.turn_off` | `switch.100184e599_power` — Torre ingresso  Torre ingresso |

<details><summary>Entità coinvolte e stato al momento della lettura</summary>

| Entità | Nome | Stato | Registro |
|---|---|---|---|
| `binary_sensor.esterno_ingresso_movimento` | Ingresso  | off | presente |
| `switch.100184e599_power` | Torre ingresso  Torre ingresso | off | presente |

</details>


[Torna all’indice](#indice-completo)

<a id="a29"></a>
### 29. movimento interno trigger alarm

**Stato:** disabilitata. **Area:** Allarme. **Priorità:** P2 — disabilitata. **Modalità:** `single`.
**Identità:** `automation.movimento_interno_trigger_alarm`; ID YAML `1791062177257`.
**Fonte:** [config-backup/automations.yaml, riga 938](config-backup/automations.yaml) · [YAML individuale](schede-yaml/29-movimento_interno_trigger_alarm.yaml). Ultima azione avviata registrata: **05/10/2026 18:07:46 CEST**.

**Cosa la attiva.** Movimento/vibrazione dei sei sensori interni elencati. I due sensori di vibrazione dichiarano device_class motion, quindi il tipo motion non è da solo un errore.

**Condizioni.** Allarme Casa armed_away, Andrea fuori casa e Lucia fuori casa.

**Comportamento e tempi.** Innesca Allarme Casa.

**Errori, rischi e interazioni.** DISABILITATA: attualmente la protezione volumetrica interna descritta qui non viene eseguita. Inoltre #10 forza Allarme Casa in home e può impedire il requisito away. L’affidabilità delle presenze non è stata provata.

**Preparazione dell’ottimizzazione.** Concordare quali sensori proteggono in home/away e come sincronizzare i due pannelli prima di un’eventuale riattivazione.

**Prove disponibili.** Nessuna traccia conservata: non è possibile attestare l’esito storico di esecuzione.

| Comando previsto | Destinazioni esplicite o risolte da dispositivo/area |
|---|---|
| `alarm_control_panel.alarm_trigger` | `alarm_control_panel.allarme_casa` — Allarme Casa |

<details><summary>Entità coinvolte e stato al momento della lettura</summary>

| Entità | Nome | Stato | Registro |
|---|---|---|---|
| `alarm_control_panel.allarme_casa` | Allarme Casa | disarmed | presente |
| `binary_sensor.motion_sensor_20ae_2` | Motion Camera | off | presente |
| `binary_sensor.motion_sensor_9a83_2` | Motion ascensore | off | presente |
| `binary_sensor.motion_sensor_d8ca` | Motion cucina | off | presente |
| `binary_sensor.sala_movimento` | sala Movimento | on | presente |
| `binary_sensor.vibration_sensor_a8d5` | Finestra lavandino cucina | off | presente |
| `binary_sensor.vibration_sensor_c875` | vibrazionie finestra sala | off | presente |
| `person.andrea` | andrea | home | presente |
| `person.lucia` | Lucia | home | presente |
| `zone.home` | Casa | 2 | non registrata / dinamica |

</details>


[Torna all’indice](#indice-completo)

<a id="a30"></a>
### 30. Movimento orto accende luci

**Stato:** disabilitata. **Area:** Luci esterne. **Priorità:** P3 — disabilitata. **Modalità:** `single`.
**Identità:** `automation.movimento_orto_accende_luci`; ID YAML `1792284488645`.
**Fonte:** [config-backup/automations.yaml, riga 1565](config-backup/automations.yaml) · [YAML individuale](schede-yaml/30-movimento_orto_accende_luci.yaml). Ultima azione avviata registrata: **20/10/2026 18:48:39 CEST**.

**Cosa la attiva.** Movimento Piscina orto continuativo per 3 secondi.

**Condizioni.** Sole tramontato.

**Comportamento e tempi.** Accende TORRE ORTO e l’uscita switch.100184e742_power per 2 minuti, poi spegne.

**Errori, rischi e interazioni.** DISABILITATA. RISCHIO LATENTE: nessuna verifica luce già accesa, nessun prolungamento per nuovo movimento, sovrapposizione con #4 e #25/#47.

**Preparazione dell’ottimizzazione.** Chiarire se è sostituita da altra logica; conservare finché la copertura dell’orto non è definita.

**Prove disponibili.** Nessuna traccia conservata: non è possibile attestare l’esito storico di esecuzione.

| Comando previsto | Destinazioni esplicite o risolte da dispositivo/area |
|---|---|
| `switch.turn_on` | `switch.100184e742_power` — CAPANNO  CAPANNO; `switch.1002963641_power` — TORRE ORTO  TORRE ORTO |
| `switch.turn_off` | `switch.100184e742_power` — CAPANNO  CAPANNO; `switch.1002963641_power` — TORRE ORTO  TORRE ORTO |

<details><summary>Entità coinvolte e stato al momento della lettura</summary>

| Entità | Nome | Stato | Registro |
|---|---|---|---|
| `binary_sensor.piscina_orto_movimento` | Orto Movimento | off | presente |
| `switch.100184e742_power` | CAPANNO  CAPANNO | off | presente |
| `switch.1002963641_power` | TORRE ORTO  TORRE ORTO | off | presente |

</details>


[Torna all’indice](#indice-completo)

<a id="a31"></a>
### 31. Piscine - riduci sensibilità per continui cambi movimento

**Stato:** disabilitata. **Area:** Telecamere. **Priorità:** P3 — disabilitata. **Modalità:** `queued`, max `50`.
**Identità:** `automation.piscine_riduci_sensibilita_per_continui_cambi_movimento_2`; ID YAML `1792973386743`.
**Fonte:** [config-backup/automations.yaml, riga 2290](config-backup/automations.yaml) · [YAML individuale](schede-yaml/31-piscine_riduci_sensibilita_per_continui_cambi_movimento_2.yaml). Ultima azione avviata registrata: **28/10/2026 01:15:39 CET**.

**Cosa la attiva.** Ogni passaggio on↔off del movimento Piscine oppure fine del timer condiviso da 5 minuti.

**Condizioni.** Nessuna condizione globale; conta solo durante timer active.

**Comportamento e tempi.** Al primo evento apre una finestra fissa di 5 minuti e azzera il contatore; conta ogni transizione. A fine finestra, se conteggio ≥10 e numero valido, riduce sensibilità Piscine di 2 rispettando il minimo, notifica e azzera il contatore. Coda massima 50.

**Errori, rischi e interazioni.** DISABILITATA. VERIFICATO: 10 cambi di stato non sono 10 rilevamenti distinti; un ciclo on/off vale due. Usa esattamente timer e contatore di #40: se riabilitata insieme, incrementi/reset concorrenti e doppie riduzioni sono possibili. Nessun ripristino automatico del valore precedente.

**Preparazione dell’ottimizzazione.** Decidere quale sistema mantenere; non riabilitare entrambe con gli stessi helper senza coordinamento.

**Prove disponibili.** 5 tracce conservate: finished=5.

| Comando previsto | Destinazioni esplicite o risolte da dispositivo/area |
|---|---|
| `counter.reset` | `counter.counter_piscine_cambi_movimento` — counter.piscine_cambi_movimento |
| `timer.start` | `timer.timer_piscine_monitor_movimento` — timer.piscine_monitor_movimento |
| `counter.increment` | `counter.counter_piscine_cambi_movimento` — counter.piscine_cambi_movimento |
| `number.set_value` | `number.piscine_sensibilita_al_movimento` — piscine Sensibilità al movimento |
| `persistent_notification.create` | Nessuna entità target: dati, template o chiamata informativa (vedi YAML). |

<details><summary>Entità coinvolte e stato al momento della lettura</summary>

| Entità | Nome | Stato | Registro |
|---|---|---|---|
| `binary_sensor.piscine_movimento` | piscine Movimento | off | presente |
| `counter.counter_piscine_cambi_movimento` | counter.piscine_cambi_movimento | 0 | presente |
| `number.piscine_sensibilita_al_movimento` | piscine Sensibilità al movimento | 16 | presente |
| `timer.timer_piscine_monitor_movimento` | timer.piscine_monitor_movimento | idle | presente |

</details>


[Torna all’indice](#indice-completo)

<a id="a32"></a>
### 32. PR205 DIAG - Fine finestra controlavaggio

**Stato:** abilitata. **Area:** PLC / diagnostica. **Priorità:** P2. **Modalità:** `single`.
**Identità:** `automation.pr205_diag_fine_finestra_controlavaggio`; ID YAML `pr205_diag_fine_controlavaggio_20261025`.
**Fonte:** [config-backup/packages/pr205_diagnostica.yaml, riga 312](config-backup/packages/pr205_diagnostica.yaml) · [YAML individuale](schede-yaml/32-pr205_diag_fine_finestra_controlavaggio.yaml). Ultima azione avviata registrata: **28/10/2026 10:47:00 CET**.

**Cosa la attiva.** Ogni minuto e quando PR205 Blocco filtri passa a 0.

**Condizioni.** Ciclo diagnostico attivo, blocco filtri 0, trascorsi almeno 60 minuti dall’inizio e almeno 10 minuti continuativi senza scarico.

**Comportamento e tempi.** Calcola durata dall’inizio all’ultimo passaggio stabile a 0; salva durata, spegne il flag ciclo e imposta il filtro a Nessuno.

**Errori, rischi e interazioni.** Le tracce recenti mostrano esclusioni per condizioni coerenti con ciclo non ancora chiudibile; non sono errori d’esecuzione. RISCHIO: last_changed del sensore si resetta al riavvio e può alterare durata e finestra di stabilità. L’intervallo diagnostico di 60 minuti non coincide con tempo totale di scarico. La verifica ogni minuto è intenzionalmente ripetitiva, non un guasto.

**Preparazione dell’ottimizzazione.** Confermare il significato della durata (primo scarico→fine ultimo stadio, pause comprese) e valutare memorizzazione persistente del termine reale.

**Prove disponibili.** 5 tracce conservate: failed_conditions=5.

| Comando previsto | Destinazioni esplicite o risolte da dispositivo/area |
|---|---|
| `input_number.set_value` | `input_number.pr205_diag_durata_ultimo_lavaggio` — PR205 DIAG Durata ultimo controlavaggio |
| `input_boolean.turn_off` | `input_boolean.pr205_diag_ciclo_attivo` — PR205 DIAG Ciclo controlavaggio attivo |
| `input_select.select_option` | `input_select.pr205_diag_filtro_in_ciclo` — PR205 DIAG Filtro in controlavaggio |

<details><summary>Entità coinvolte e stato al momento della lettura</summary>

| Entità | Nome | Stato | Registro |
|---|---|---|---|
| `input_boolean.pr205_diag_ciclo_attivo` | PR205 DIAG Ciclo controlavaggio attivo | on | presente |
| `input_datetime.pr205_diag_inizio_lavaggio` | PR205 DIAG Inizio controlavaggio | 2026-10-29 09:00:28 | presente |
| `input_number.pr205_diag_durata_ultimo_lavaggio` | PR205 DIAG Durata ultimo controlavaggio | 66.1 | presente |
| `input_select.pr205_diag_filtro_in_ciclo` | PR205 DIAG Filtro in controlavaggio | Filtro 4 presunto | presente |
| `sensor.pr205_blocco_filtri` | PR205 Blocco filtri | 0 | presente |

</details>


[Torna all’indice](#indice-completo)

<a id="a33"></a>
### 33. PR205 DIAG - Inizio controlavaggio multi-stadio

**Stato:** abilitata. **Area:** PLC / diagnostica. **Priorità:** P2. **Modalità:** `single`.
**Identità:** `automation.pr205_diag_inizio_controlavaggio_multi_stadio`; ID YAML `pr205_diag_inizio_controlavaggio_20261025`.
**Fonte:** [config-backup/packages/pr205_diagnostica.yaml, riga 249](config-backup/packages/pr205_diagnostica.yaml) · [YAML individuale](schede-yaml/33-pr205_diag_inizio_controlavaggio_multi_stadio.yaml). Ultima azione avviata registrata: **29/10/2026 09:00:28 CET**.

**Cosa la attiva.** PR205 Blocco filtri diventa 1.

**Condizioni.** Flag ciclo diagnostico spento.

**Comportamento e tempi.** Memorizza inizio e attiva flag ciclo. Classifica Filtro 2 il lunedì/giovedì 09:30–10:30, Filtro 3 il martedì/sabato 13:30–14:30; fuori da queste finestre “Filtro 4 presunto”. Aggiorna la data dell’ultimo filtro corrispondente.

**Errori, rischi e interazioni.** VERIFICATO: classificazione dedotta dal calendario, non identificazione fisica del filtro. Se un filtro 2/3 parte fuori finestra viene registrato come filtro 4 presunto. Durante un ciclo attivo ulteriori stadi non cambiano l’inizio: comportamento intenzionale. Un primo campione già a 1 dopo riavvio può sembrare un nuovo inizio se il flag non rappresenta più il ciclo reale.

**Preparazione dell’ottimizzazione.** Confermare calendario PLC e significato del segnale; mantenere distinta l’identificazione presunta da una misura reale.

**Prove disponibili.** 5 tracce conservate: failed_conditions=4, finished=1.

| Comando previsto | Destinazioni esplicite o risolte da dispositivo/area |
|---|---|
| `input_datetime.set_datetime` | `input_datetime.pr205_diag_inizio_lavaggio` — PR205 DIAG Inizio controlavaggio |
| `input_select.select_option` | `input_select.pr205_diag_filtro_in_ciclo` — PR205 DIAG Filtro in controlavaggio |
| `input_boolean.turn_on` | `input_boolean.pr205_diag_ciclo_attivo` — PR205 DIAG Ciclo controlavaggio attivo |
| `input_datetime.set_datetime` | `input_datetime.pr205_diag_ultimo_filtro2` — PR205 DIAG Ultimo filtro 2 |
| `input_datetime.set_datetime` | `input_datetime.pr205_diag_ultimo_filtro3` — PR205 DIAG Ultimo filtro 3 |
| `input_datetime.set_datetime` | `input_datetime.pr205_diag_ultimo_filtro4` — PR205 DIAG Ultimo filtro 4 presunto |

<details><summary>Entità coinvolte e stato al momento della lettura</summary>

| Entità | Nome | Stato | Registro |
|---|---|---|---|
| `input_boolean.pr205_diag_ciclo_attivo` | PR205 DIAG Ciclo controlavaggio attivo | on | presente |
| `input_datetime.pr205_diag_inizio_lavaggio` | PR205 DIAG Inizio controlavaggio | 2026-10-29 09:00:28 | presente |
| `input_datetime.pr205_diag_ultimo_filtro2` | PR205 DIAG Ultimo filtro 2 | 2026-10-25 00:00:00 | presente |
| `input_datetime.pr205_diag_ultimo_filtro3` | PR205 DIAG Ultimo filtro 3 | 2026-10-25 00:00:00 | presente |
| `input_datetime.pr205_diag_ultimo_filtro4` | PR205 DIAG Ultimo filtro 4 presunto | 2026-10-29 09:00:28 | presente |
| `input_select.pr205_diag_filtro_in_ciclo` | PR205 DIAG Filtro in controlavaggio | Filtro 4 presunto | presente |
| `sensor.pr205_blocco_filtri` | PR205 Blocco filtri | 0 | presente |

</details>


[Torna all’indice](#indice-completo)

<a id="a34"></a>
### 34. PR205 DIAG - Memoria chiusura Q2 per Q3

**Stato:** abilitata. **Area:** PLC / diagnostica. **Priorità:** P2. **Modalità:** `single`.
**Identità:** `automation.pr205_diag_memoria_chiusura_q2_per_q3`; ID YAML `pr205_diag_memoria_chiusura_q2_20261025`.
**Fonte:** [config-backup/packages/pr205_diagnostica.yaml, riga 353](config-backup/packages/pr205_diagnostica.yaml) · [YAML individuale](schede-yaml/34-pr205_diag_memoria_chiusura_q2_per_q3.yaml). Ultima azione avviata registrata: **non registrata**.

**Cosa la attiva.** Q2 Pozzo passa on→off.

**Condizioni.** Q3 Ricircolo acceso e PLC HA Manuale spento.

**Comportamento e tempi.** Memorizza l’ora di chiusura Q2 per la successiva diagnostica di mantenimento ricircolo.

**Errori, rischi e interazioni.** OSSERVATO: last_triggered nullo ma due tracce presenti, entrambe escluse dalle condizioni. Non significa “mai ricevuto il trigger”. RISCHIO: #44 spegne Manuale sullo stesso evento Q2 off; questa automazione può valutare prima del cambio Manuale e scartare la memorizzazione. Non è dimostrato che sia successo a causa di questa gara, ma esiste la dipendenza temporale.

**Preparazione dell’ottimizzazione.** Chiarire se deve osservare esclusivamente cicli automatici PLC o anche cicli HA; definire un segnale stabile della modalità al momento della chiusura.

**Prove disponibili.** 2 tracce conservate: failed_conditions=2.

| Comando previsto | Destinazioni esplicite o risolte da dispositivo/area |
|---|---|
| `input_datetime.set_datetime` | `input_datetime.pr205_diag_ultima_chiusura_q2` — PR205 DIAG Ultima chiusura Q2 con Q3 attivo |

<details><summary>Entità coinvolte e stato al momento della lettura</summary>

| Entità | Nome | Stato | Registro |
|---|---|---|---|
| `binary_sensor.q2_pozzo` | Q2 Pozzo | off | presente |
| `binary_sensor.q3_ricircolo` | Q3 Ricircolo | off | presente |
| `input_datetime.pr205_diag_ultima_chiusura_q2` | PR205 DIAG Ultima chiusura Q2 con Q3 attivo | 2026-10-25 00:00:00 | presente |
| `switch.plc_ha_manuale` | PLC HA Manuale | off | presente |

</details>


[Torna all’indice](#indice-completo)

<a id="a35"></a>
### 35. Ptz cancello

**Stato:** abilitata. **Area:** Telecamere / PTZ. **Priorità:** P1. **Modalità:** `single`.
**Identità:** `automation.ptz_cancello`; ID YAML `1789886689473`.
**Fonte:** [config-backup/automations.yaml, riga 257](config-backup/automations.yaml) · [YAML individuale](schede-yaml/35-ptz_cancello.yaml). Ultima azione avviata registrata: **26/10/2026 08:55:59 CET**.

**Cosa la attiva.** Movimento cancello _2 continuativo per 5 secondi.

**Condizioni.** Nessuna.

**Comportamento e tempi.** Seleziona preset 1 del Piazzale e preset 2 di Tracking _2; segue attesa di 8+1 secondi senza altre azioni.

**Errori, rischi e interazioni.** OSSERVATO: il sensore cancello _2 e il select Tracking _2 sono disabilitati dal dispositivo e assenti dagli stati, quindi quel trigger non è operativo nello snapshot. Il preset Piazzale è unknown, anche se opzione 1 esiste. Tracce finished del 26/10 sono storiche e non dimostrano disponibilità attuale. Conflitto potenziale con #36 sul PTZ Tracking.

**Preparazione dell’ottimizzazione.** Individuare le entità attuali della telecamera corretta, verificare significato dei preset e poi decidere priorità/ritorno a posizione iniziale.

**Prove disponibili.** 5 tracce conservate: finished=5.

| Comando previsto | Destinazioni esplicite o risolte da dispositivo/area |
|---|---|
| `select.select_option` | `select.piazzale_preimpostazione_ptz` — piazzale Preimpostazione PTZ |
| `select.select_option` | `select.tracking_preimpostazione_ptz_2` — Preimpostazione PTZ |

<details><summary>Entità coinvolte e stato al momento della lettura</summary>

| Entità | Nome | Stato | Registro |
|---|---|---|---|
| `binary_sensor.cancello_movimento_2` | Movimento | assente dagli stati | disabilitata: device |
| `select.piazzale_preimpostazione_ptz` | piazzale Preimpostazione PTZ | unknown | presente |
| `select.tracking_preimpostazione_ptz_2` | Preimpostazione PTZ | assente dagli stati | disabilitata: device |

</details>


[Torna all’indice](#indice-completo)

<a id="a36"></a>
### 36. ptz loggiato

**Stato:** abilitata. **Area:** Telecamere / PTZ. **Priorità:** P1. **Modalità:** `single`.
**Identità:** `automation.ptz_loggiato`; ID YAML `1792018444662`.
**Fonte:** [config-backup/automations.yaml, riga 1488](config-backup/automations.yaml) · [YAML individuale](schede-yaml/36-ptz_loggiato.yaml). Ultima azione avviata registrata: **23/10/2026 23:44:48 CEST**.

**Cosa la attiva.** Movimento loggiato continuativo per 2 minuti.

**Condizioni.** Nessuna.

**Comportamento e tempi.** Seleziona preset 4 su select.tracking_preimpostazione_ptz_2.

**Errori, rischi e interazioni.** OSSERVATO: destinazione disabilitata dal dispositivo e assente dagli stati. Nessuna posizione di ritorno o priorità verso il preset cancello #35. Due minuti di movimento continuo potrebbero essere voluti per evitare falsi positivi, ma non sono equivalenti a due minuti da un singolo impulso.

**Preparazione dell’ottimizzazione.** Ricollegare in futuro l’entità attiva corretta; concordare durata del rilevamento e priorità delle richieste PTZ.

**Prove disponibili.** Nessuna traccia conservata: non è possibile attestare l’esito storico di esecuzione.

| Comando previsto | Destinazioni esplicite o risolte da dispositivo/area |
|---|---|
| `select.select_option` | `select.tracking_preimpostazione_ptz_2` — Preimpostazione PTZ |

<details><summary>Entità coinvolte e stato al momento della lettura</summary>

| Entità | Nome | Stato | Registro |
|---|---|---|---|
| `binary_sensor.loggiato_movimento` | loggiato Movimento | off | presente |
| `select.tracking_preimpostazione_ptz_2` | Preimpostazione PTZ | assente dagli stati | disabilitata: device |

</details>


[Torna all’indice](#indice-completo)

<a id="a37"></a>
### 37. Ricircolo cisterna pozzo

**Stato:** abilitata. **Area:** Cisterne / PLC. **Priorità:** P1. **Modalità:** `single`.
**Identità:** `automation.ricircolo_cisterna_pozzo`; ID YAML `1791284997220`.
**Fonte:** [config-backup/automations.yaml, riga 1198](config-backup/automations.yaml) · [YAML individuale](schede-yaml/37-ricircolo_cisterna_pozzo.yaml). Ultima azione avviata registrata: **28/10/2026 10:56:48 CET**.

**Cosa la attiva.** Nella configurazione attuale Q3 Ricircolo passa on→off.

**Condizioni.** 10:00–15:00 e livello pozzo >157 cm al controllo iniziale.

**Comportamento e tempi.** Aspetta 3 secondi, attiva Manuale, aspetta 1 secondo, attiva comando Q3; dopo 4 ore spegne Q3 e Manuale.

**Errori, rischi e interazioni.** VERIFICATO: può riattivare Q3 dopo uno spegnimento intenzionale, purché ricorrano orario e livello. La durata termina fino a quasi le 19:00: la fascia limita solo l’inizio. RISCHIO: soglia non ricontrollata durante 4 ore, nessun arresto per livello basso nella logica HA letta, perdita della chiusura al riavvio. Manuale è condiviso con riempimenti. IMPORTANTE: le tracce disponibili riguardano una versione precedente, con trigger Q4 off e senza soglia >157; non attestano l’esito della versione attuale.

**Preparazione dell’ottimizzazione.** Prima di ottimizzare, ricostruire precedenza PLC/HA, significato di Q3 e necessità di riavvio automatico; separare richiesta di ricircolo da spegnimento di protezione.

**Prove disponibili.** 2 tracce conservate: failed_single=1, finished=1.
Le tracce conservate hanno una configurazione diversa dall’attuale: valgono soltanto come evidenza storica.

| Registro | Occorrenze aggregate | Ultima occorrenza | Messaggi conservati |
|---|---:|---|---|
| WARNING | 1 | 28/10/2026 12:36:07 CET | Ricircolo cisterna pozzo : Already running |

Le occorrenze sono contatori aggregati del registro; se una riga conserva più messaggi, il contatore non è un numero attribuibile con precisione a ciascun messaggio.

| Comando previsto | Destinazioni esplicite o risolte da dispositivo/area |
|---|---|
| `switch.turn_on` | `switch.plc_ha_manuale` — PLC HA Manuale |
| `switch.turn_on` | `switch.plc_ha_q3_ricircolo` — PLC HA Q3 Ricircolo |
| `switch.turn_off` | `switch.plc_ha_manuale` — PLC HA Manuale; `switch.plc_ha_q3_ricircolo` — PLC HA Q3 Ricircolo |

<details><summary>Entità coinvolte e stato al momento della lettura</summary>

| Entità | Nome | Stato | Registro |
|---|---|---|---|
| `binary_sensor.q3_ricircolo` | Q3 Ricircolo | off | presente |
| `sensor.livello_pozzo_plc` | Livello pozzo PLC | 94 | presente |
| `switch.plc_ha_manuale` | PLC HA Manuale | off | presente |
| `switch.plc_ha_q3_ricircolo` | PLC HA Q3 Ricircolo | off | presente |

</details>


[Torna all’indice](#indice-completo)

<a id="a38"></a>
### 38. Riempimento cisterna potabile

**Stato:** abilitata. **Area:** Cisterne / PLC. **Priorità:** P1. **Modalità:** `single`.
**Identità:** `automation.riempimento_cisterna_potabile`; ID YAML `1793233273343`.
**Fonte:** [config-backup/automations.yaml, riga 2531](config-backup/automations.yaml) · [YAML individuale](schede-yaml/38-riempimento_cisterna_potabile.yaml). Ultima azione avviata registrata: **non registrata**.

**Cosa la attiva.** Livello potabile attraversa sotto 42, senza persistenza minima.

**Condizioni.** Q2 Pozzo spento e fascia 10:00–16:00.

**Comportamento e tempi.** Attiva Manuale, aspetta 1 secondo, attiva Q1 Potabile.

**Errori, rischi e interazioni.** RISCHIO: se la soglia viene attraversata fuori fascia o mentre Q2 è acceso, il successivo arrivo delle 10:00 o spegnimento Q2 non ritenta da solo. Nessun timeout massimo di riempimento né controllo livello valido prima del comando; l’arresto è demandato a #42. Non ricontrolla Q2 dopo il secondo di attesa. #39 può competere sullo stesso Manuale. Livello potabile non dichiara unità nello snapshot: la calibrazione va confermata.

**Preparazione dell’ottimizzazione.** Concordare soglie/unità, interblocco atomico Q1/Q2, recupero a inizio fascia e protezione PLC indipendente.

**Prove disponibili.** Nessuna traccia conservata: non è possibile attestare l’esito storico di esecuzione.

| Comando previsto | Destinazioni esplicite o risolte da dispositivo/area |
|---|---|
| `switch.turn_on` | `switch.plc_ha_manuale` — PLC HA Manuale |
| `switch.turn_on` | `switch.plc_ha_q1_potabile` — PLC HA Q1 Potabile |

<details><summary>Entità coinvolte e stato al momento della lettura</summary>

| Entità | Nome | Stato | Registro |
|---|---|---|---|
| `binary_sensor.q2_pozzo` | Q2 Pozzo | off | presente |
| `sensor.livello_potabile_plc` | Livello potabile PLC | 91 | presente |
| `switch.plc_ha_manuale` | PLC HA Manuale | off | presente |
| `switch.plc_ha_q1_potabile` | PLC HA Q1 Potabile | off | presente |

</details>


[Torna all’indice](#indice-completo)

<a id="a39"></a>
### 39. riempimento cisterna pozzo

**Stato:** abilitata. **Area:** Cisterne / PLC. **Priorità:** P1. **Modalità:** `single`.
**Identità:** `automation.riempimento_cisterna_pozzo`; ID YAML `1792713530771`.
**Fonte:** [config-backup/automations.yaml, riga 2041](config-backup/automations.yaml) · [YAML individuale](schede-yaml/39-riempimento_cisterna_pozzo.yaml). Ultima azione avviata registrata: **non registrata**.

**Cosa la attiva.** Livello pozzo attraversa sotto 72 cm e resta sotto per 20 secondi.

**Condizioni.** 10:00–16:00, Q1 Potabile spento e Q2 Pozzo spento.

**Comportamento e tempi.** Attiva Manuale, aspetta 1 secondo, accende insieme comandi Q2 Pozzo, Q3 Ricircolo e Q4 Cloratore.

**Errori, rischi e interazioni.** RISCHIO: se parte fuori fascia o con uscita occupata non riprova al successivo inizio fascia/liberazione. Controllo iniziale non costituisce un interblocco atomico con #38: entrambe possono vedere Q1/Q2 off prima dei comandi. Nessun timeout o controllo di avvenuta attivazione uscite; arresto HA associato #43 ha trigger errato. Le tre tracce sono esclusioni di una configurazione precedente con condizioni diverse.

**Preparazione dell’ottimizzazione.** Priorità alta al coordinamento con #43/#44/#37 e alla verifica delle protezioni reali PLC; non assumere che HA sostituisca gli interblocchi del programma PLC.

**Prove disponibili.** 3 tracce conservate: failed_conditions=3.
Le tracce conservate hanno una configurazione diversa dall’attuale: valgono soltanto come evidenza storica.

| Comando previsto | Destinazioni esplicite o risolte da dispositivo/area |
|---|---|
| `switch.turn_on` | `switch.plc_ha_manuale` — PLC HA Manuale |
| `switch.turn_on` | `switch.plc_ha_q2_pozzo` — PLC HA Q2 Pozzo; `switch.plc_ha_q3_ricircolo` — PLC HA Q3 Ricircolo; `switch.plc_ha_q4_cloratore` — PLC HA Q4 Cloratore |

<details><summary>Entità coinvolte e stato al momento della lettura</summary>

| Entità | Nome | Stato | Registro |
|---|---|---|---|
| `binary_sensor.q1_potabile` | Q1 Potabile | off | presente |
| `binary_sensor.q2_pozzo` | Q2 Pozzo | off | presente |
| `sensor.livello_pozzo_plc` | Livello pozzo PLC | 94 | presente |
| `switch.plc_ha_manuale` | PLC HA Manuale | off | presente |
| `switch.plc_ha_q2_pozzo` | PLC HA Q2 Pozzo | off | presente |
| `switch.plc_ha_q3_ricircolo` | PLC HA Q3 Ricircolo | off | presente |
| `switch.plc_ha_q4_cloratore` | PLC HA Q4 Cloratore | off | presente |

</details>


[Torna all’indice](#indice-completo)

<a id="a40"></a>
### 40. Sensibilità telecamera ridotta

**Stato:** abilitata. **Area:** Telecamere. **Priorità:** P1. **Modalità:** `queued`, max `50`.
**Identità:** `automation.sensibilita_telecamera_ridotta`; ID YAML `1793146592865`.
**Fonte:** [config-backup/automations.yaml, riga 2379](config-backup/automations.yaml) · [YAML individuale](schede-yaml/40-sensibilita_telecamera_ridotta.yaml). Ultima azione avviata registrata: **29/10/2026 09:45:14 CET**.

**Cosa la attiva.** Transizioni on↔off di sette sensori movimento di telecamere diverse; nella lista figurano anche due entità number. Fine finestra sul timer Piscine da 5 minuti.

**Condizioni.** Conta solo durante timer active; riduce se conteggio ≥10 e sensibilità Piscine ha valore.

**Comportamento e tempi.** Usa un solo contatore comune e un solo timer. Alla scadenza riduce soltanto number.piscine_sensibilita_al_movimento di 2 punti fino al minimo e crea una notifica.

**Errori, rischi e interazioni.** VERIFICATO: movimento di Cancello, Loggiato, Tracking, Cucina_2, Piscina orto e Piazzale abbassa la sensibilità di Piscine. Le due entità number (esterno ingresso e cucina) hanno valori numerici, quindi i confronti on/off non rappresentano i loro cambi normali. La descrizione parla solo di Piscine ed è incompleta. Ogni on/off conta due eventi per un ciclo. #55/#56 sovrascrivono il valore a ogni alba/tramonto. Se #31 viene riabilitata condivide helper e raddoppia operazioni.

**Preparazione dell’ottimizzazione.** Concordare se adattamento per telecamera o globale; usare sensore, contatore e soglia corrispondenti e stabilire come interagisce con il profilo giorno/notte.

**Prove disponibili.** 5 tracce conservate: finished=5.

| Comando previsto | Destinazioni esplicite o risolte da dispositivo/area |
|---|---|
| `counter.reset` | `counter.counter_piscine_cambi_movimento` — counter.piscine_cambi_movimento |
| `timer.start` | `timer.timer_piscine_monitor_movimento` — timer.piscine_monitor_movimento |
| `counter.increment` | `counter.counter_piscine_cambi_movimento` — counter.piscine_cambi_movimento |
| `number.set_value` | `number.piscine_sensibilita_al_movimento` — piscine Sensibilità al movimento |
| `persistent_notification.create` | Nessuna entità target: dati, template o chiamata informativa (vedi YAML). |

<details><summary>Entità coinvolte e stato al momento della lettura</summary>

| Entità | Nome | Stato | Registro |
|---|---|---|---|
| `binary_sensor.cancello_movimento` | cancello Movimento | off | presente |
| `binary_sensor.cucina_movimento_2` | Auto Movimento | off | presente |
| `binary_sensor.loggiato_movimento` | loggiato Movimento | off | presente |
| `binary_sensor.piazzale_movimento` | piazzale Movimento | off | presente |
| `binary_sensor.piscina_orto_movimento` | Orto Movimento | off | presente |
| `binary_sensor.piscine_movimento` | piscine Movimento | off | presente |
| `binary_sensor.tracking_movimento` | tracking Movimento | off | presente |
| `counter.counter_piscine_cambi_movimento` | counter.piscine_cambi_movimento | 0 | presente |
| `number.cucina_sensibilita_al_movimento` | Cucina e posteriore Sensibilità al movimento | 42 | presente |
| `number.esterno_ingresso_sensibilita_al_movimento` | Ingresso  Sensibilità al movimento | 1 | presente |
| `number.piscine_sensibilita_al_movimento` | piscine Sensibilità al movimento | 16 | presente |
| `timer.timer_piscine_monitor_movimento` | timer.piscine_monitor_movimento | idle | presente |

</details>


[Torna all’indice](#indice-completo)

<a id="a41"></a>
### 41. Spegni esterno all' Alba

**Stato:** abilitata. **Area:** Luci esterne. **Priorità:** P2. **Modalità:** `single`.
**Identità:** `automation.spegni_esterno_all_alba`; ID YAML `1790199721494`.
**Fonte:** [config-backup/automations.yaml, riga 618](config-backup/automations.yaml) · [YAML individuale](schede-yaml/41-spegni_esterno_all_alba.yaml). Ultima azione avviata registrata: **29/10/2026 06:44:11 CET**.

**Cosa la attiva.** Alba, offset zero.

**Condizioni.** Nessuna.

**Comportamento e tempi.** Spegne gli switch principali dei sei dispositivi selezionati più quelli principali nell’area Capanno; spegne Lampada scale. Nello snapshot risultano sette uscite power distinte.

**Errori, rischi e interazioni.** La destinazione per area si espande quando cambia l’assegnazione dei dispositivi: richiede inventario stabile. Ho verificato nel codice HA che entità config/diagnostic e nascoste sono escluse dall’espansione indiretta predefinita: non risulta corretto attribuirle lo spegnimento delle registrazioni telecamera. RISCHIO: nessun recupero se HA perde l’alba; spegne anche accensioni manuali e condivide Lampada scale con #17/#50.

**Preparazione dell’ottimizzazione.** Decidere se spegnimento all’alba è assoluto o deve preservare eccezioni; preferire destinazioni esplicite se l’area contiene dispositivi eterogenei.

**Prove disponibili.** 4 tracce conservate: finished=4.

| Comando previsto | Destinazioni esplicite o risolte da dispositivo/area |
|---|---|
| `switch.turn_off` | `switch.10001119b3_power` — PARCHEGGIO  PARCHEGGIO; `switch.1000111b06_power` — GIARDINO  GIARDINO; `switch.10005bc7d5_power` — Cuccia Cuccia; `switch.100184e599_power` — Torre ingresso  Torre ingresso; `switch.100184e742_power` — CAPANNO  CAPANNO; `switch.100185132f_power` — Ciabatta volante; `switch.1002963641_power` — TORRE ORTO  TORRE ORTO |
| `light.turn_off` | `light.lampada_scale` — Lampada scale |

<details><summary>Entità coinvolte e stato al momento della lettura</summary>

| Entità | Nome | Stato | Registro |
|---|---|---|---|
| `light.lampada_scale` | Lampada scale | on | presente |
| `switch.10001119b3_power` | PARCHEGGIO  PARCHEGGIO | off | presente |
| `switch.1000111b06_power` | GIARDINO  GIARDINO | off | presente |
| `switch.10005bc7d5_power` | Cuccia Cuccia | unavailable | presente |
| `switch.100184e599_power` | Torre ingresso  Torre ingresso | off | presente |
| `switch.100184e742_power` | CAPANNO  CAPANNO | off | presente |
| `switch.100185132f_power` | Ciabatta volante | off | presente |
| `switch.1002963641_power` | TORRE ORTO  TORRE ORTO | off | presente |

</details>


[Torna all’indice](#indice-completo)

<a id="a42"></a>
### 42. Spegni riempimento potabile

**Stato:** abilitata. **Area:** Cisterne / PLC. **Priorità:** P1. **Modalità:** `single`.
**Identità:** `automation.spegni_riempimento_potabile`; ID YAML `1793233466802`.
**Fonte:** [config-backup/automations.yaml, riga 2564](config-backup/automations.yaml) · [YAML individuale](schede-yaml/42-spegni_riempimento_potabile.yaml). Ultima azione avviata registrata: **non registrata**.

**Cosa la attiva.** Livello potabile attraversa sopra 111.

**Condizioni.** Nessuna.

**Comportamento e tempi.** Spegne comando Q1 Potabile e PLC HA Manuale.

**Errori, rischi e interazioni.** VERIFICATO: soglia stretta >111, non ≥111; nessun controllo di Q1 attivo. RISCHIO: spegnere Manuale può interferire con un ciclo pozzo/ricircolo contemporaneo. Se HA si avvia con livello già alto non va assunto un recupero automatico; nessun trigger dedicato all’avvio o attivazione Q1. Nessuna traccia disponibile per provarne il funzionamento.

**Preparazione dell’ottimizzazione.** Confermare unità e soglia massima e definire chi possiede Manuale; predisporre arresto indipendente e recupero stato al riavvio.

**Prove disponibili.** Nessuna traccia conservata: non è possibile attestare l’esito storico di esecuzione.

| Comando previsto | Destinazioni esplicite o risolte da dispositivo/area |
|---|---|
| `switch.turn_off` | `switch.plc_ha_manuale` — PLC HA Manuale; `switch.plc_ha_q1_potabile` — PLC HA Q1 Potabile |

<details><summary>Entità coinvolte e stato al momento della lettura</summary>

| Entità | Nome | Stato | Registro |
|---|---|---|---|
| `sensor.livello_potabile_plc` | Livello potabile PLC | 91 | presente |
| `switch.plc_ha_manuale` | PLC HA Manuale | off | presente |
| `switch.plc_ha_q1_potabile` | PLC HA Q1 Potabile | off | presente |

</details>


[Torna all’indice](#indice-completo)

<a id="a43"></a>
### 43. Spegnimenti riempimento cisterna pozzo

**Stato:** abilitata. **Area:** Cisterne / PLC. **Priorità:** P1. **Modalità:** `single`.
**Identità:** `automation.spegnimenti_riempimento_cisterna_pozzo`; ID YAML `1793232841766`.
**Fonte:** [config-backup/automations.yaml, riga 2490](config-backup/automations.yaml) · [YAML individuale](schede-yaml/43-spegnimenti_riempimento_cisterna_pozzo.yaml). Ultima azione avviata registrata: **non registrata**.

**Cosa la attiva.** Stato di automation.riempimento_cisterna_pozzo cambia partendo da on; non è un trigger sul livello o su Q2.

**Condizioni.** Livello pozzo strettamente >158 e <160 cm e Manuale acceso.

**Comportamento e tempi.** Spegne Q4 e Q2, aspetta 4 ore, poi spegne Q3 e Manuale.

**Errori, rischi e interazioni.** ERRORE DI LOGICA VERIFICATO: on di un’entità automation significa abilitata, non “sta riempiendo”. Il raggiungimento del livello non attiva questa automazione. Tipicamente reagisce alla disabilitazione dell’automazione monitorata, o ad altri cambi che soddisfino from:on. La finestra 158–160 esclude esattamente 158/160 e salti oltre 160. RISCHIO: manca un arresto HA affidabile del riempimento pozzo; PLC può avere protezioni proprie, non verificate qui. Il delay 4 ore si perde al riavvio e #44 spegne Manuale alla caduta Q2.

**Preparazione dell’ottimizzazione.** Prima priorità futura: definire trigger di arresto realmente legato al livello e coordinare fase riempimento, clorazione e post-ricircolo con le protezioni PLC.

**Prove disponibili.** Nessuna traccia conservata: non è possibile attestare l’esito storico di esecuzione.

| Comando previsto | Destinazioni esplicite o risolte da dispositivo/area |
|---|---|
| `switch.turn_off` | `switch.plc_ha_q2_pozzo` — PLC HA Q2 Pozzo; `switch.plc_ha_q4_cloratore` — PLC HA Q4 Cloratore |
| `switch.turn_off` | `switch.plc_ha_manuale` — PLC HA Manuale; `switch.plc_ha_q3_ricircolo` — PLC HA Q3 Ricircolo |

<details><summary>Entità coinvolte e stato al momento della lettura</summary>

| Entità | Nome | Stato | Registro |
|---|---|---|---|
| `automation.riempimento_cisterna_pozzo` | riempimento cisterna pozzo | on | presente |
| `sensor.livello_pozzo_plc` | Livello pozzo PLC | 94 | presente |
| `switch.plc_ha_manuale` | PLC HA Manuale | off | presente |
| `switch.plc_ha_q2_pozzo` | PLC HA Q2 Pozzo | off | presente |
| `switch.plc_ha_q3_ricircolo` | PLC HA Q3 Ricircolo | off | presente |
| `switch.plc_ha_q4_cloratore` | PLC HA Q4 Cloratore | off | presente |

</details>


[Torna all’indice](#indice-completo)

<a id="a44"></a>
### 44. spegnimento automatico cloratore

**Stato:** abilitata. **Area:** Cisterne / PLC. **Priorità:** P1. **Modalità:** `single`.
**Identità:** `automation.spegnimento_automatico_cloratore`; ID YAML `1792713878572`.
**Fonte:** [config-backup/automations.yaml, riga 2085](config-backup/automations.yaml) · [YAML individuale](schede-yaml/44-spegnimento_automatico_cloratore.yaml). Ultima azione avviata registrata: **28/10/2026 12:36:12 CET**.

**Cosa la attiva.** Q2 Pozzo passa on→off.

**Condizioni.** Nessuna.

**Comportamento e tempi.** Spegne sia Q4 Cloratore sia PLC HA Manuale.

**Errori, rischi e interazioni.** La cessazione clorazione al termine Q2 è coerente con il nome; spegnere anche Manuale ha invece effetto globale. RISCHIO: contrasta con il post-ricircolo di 4 ore di #43 e può competere con #37; il reale effetto su Q3 dipende dal programma PLC. Può influenzare la condizione Manuale off di #34 sullo stesso evento. Non reagisce all’accensione Q4 con Q2 già spento. Due tracce disponibili finished.

**Preparazione dell’ottimizzazione.** Stabilire chi gestisce la modalità Manuale, quali uscite devono continuare dopo Q2 e se serve una protezione Q4 senza Q2.

**Prove disponibili.** 2 tracce conservate: finished=2.

| Comando previsto | Destinazioni esplicite o risolte da dispositivo/area |
|---|---|
| `switch.turn_off` | `switch.plc_ha_manuale` — PLC HA Manuale; `switch.plc_ha_q4_cloratore` — PLC HA Q4 Cloratore |

<details><summary>Entità coinvolte e stato al momento della lettura</summary>

| Entità | Nome | Stato | Registro |
|---|---|---|---|
| `binary_sensor.q2_pozzo` | Q2 Pozzo | off | presente |
| `switch.plc_ha_manuale` | PLC HA Manuale | off | presente |
| `switch.plc_ha_q4_cloratore` | PLC HA Q4 Cloratore | off | presente |

</details>


[Torna all’indice](#indice-completo)

<a id="a45"></a>
### 45. spegnimento torre ingresso spegne faretto telecamer aingresso

**Stato:** disabilitata. **Area:** Luci esterne / telecamere. **Priorità:** P3 — disabilitata. **Modalità:** `single`.
**Identità:** `automation.spegnimento_torre_ingresso_spegne_faretto_telecamer_aingresso`; ID YAML `1792950856621`.
**Fonte:** [config-backup/automations.yaml, riga 2271](config-backup/automations.yaml) · [YAML individuale](schede-yaml/45-spegnimento_torre_ingresso_spegne_faretto_telecamer_aingresso.yaml). Ultima azione avviata registrata: **27/10/2026 18:11:46 CET**.

**Cosa la attiva.** TORRE INGRESSO passa on→off.

**Condizioni.** Nessuna.

**Comportamento e tempi.** Spegne il faretto della telecamera ingresso.

**Errori, rischi e interazioni.** DISABILITATA. Logica semplice, ma la compagna #20 reagisce anche agli spegnimenti riaccendendo entrambi: insieme non formano una sincronizzazione affidabile. Registro storico Already running; cinque tracce finished.

**Preparazione dell’ottimizzazione.** Coordinare con #20/#26/#28 e chiarire chi sia l’attuatore autorevole.

**Prove disponibili.** 5 tracce conservate: finished=5.

| Registro | Occorrenze aggregate | Ultima occorrenza | Messaggi conservati |
|---|---:|---|---|
| WARNING | 1 | 26/10/2026 10:30:55 CET | spegnimento torre ingresso spegne faretto telecamer aingresso: Already running |

Le occorrenze sono contatori aggregati del registro; se una riga conserva più messaggi, il contatore non è un numero attribuibile con precisione a ciascun messaggio.

| Comando previsto | Destinazioni esplicite o risolte da dispositivo/area |
|---|---|
| `light.turn_off` | `light.esterno_ingresso_faretto` — Ingresso  Faretto |

<details><summary>Entità coinvolte e stato al momento della lettura</summary>

| Entità | Nome | Stato | Registro |
|---|---|---|---|
| `light.esterno_ingresso_faretto` | Ingresso  Faretto | off | presente |
| `switch.100184e599_power` | Torre ingresso  Torre ingresso | off | presente |

</details>


[Torna all’indice](#indice-completo)

<a id="a46"></a>
### 46. Spengi cortesia casa

**Stato:** abilitata. **Area:** Luci interne. **Priorità:** P2. **Modalità:** `single`.
**Identità:** `automation.spengibouci`; ID YAML `1790033373990`.
**Fonte:** [config-backup/automations.yaml, riga 411](config-backup/automations.yaml) · [YAML individuale](schede-yaml/46-spengibouci.yaml). Ultima azione avviata registrata: **29/10/2026 02:14:44 CET**.

**Cosa la attiva.** Assenza movimento camera continuativa per 5 minuti.

**Condizioni.** Il sensore Motion ascensore deve risultare off già da almeno 30 minuti al controllo iniziale.

**Comportamento e tempi.** Spegne gateway Aqara, Luce ingresso e Luce ascensore subito, dopo 30 minuti e ancora dopo altri 30 minuti.

**Errori, rischi e interazioni.** VERIFICATO: nell’ora di esecuzione non ricontrolla la presenza: può spegnere luci riaccese quando qualcuno è tornato. Se il secondo sensore raggiunge 30 minuti solo dopo il trigger camera, non c’è un trigger specifico per riprovare. OSSERVATO: Luce ascensore unavailable. Conflitto con luci manuali, ingresso e allarme. Le cinque tracce recenti sono esclusioni per condizioni, non errori.

**Preparazione dell’ottimizzazione.** Concordare un unico criterio di casa inattiva e applicarlo prima di ogni spegnimento; chiarire se i tre spegnimenti siano ancora necessari.

**Prove disponibili.** 5 tracce conservate: failed_conditions=5.

| Comando previsto | Destinazioni esplicite o risolte da dispositivo/area |
|---|---|
| `light.turn_off` | `light.aqara_hub_09ab_lightbulb_09ab_2` — Aqara Hub-09AB Lightbulb-09AB; `light.lightbulb_78d9_2` — Luce ascensore; `light.lightbulb_78da_2` — Luce ingresso |

<details><summary>Entità coinvolte e stato al momento della lettura</summary>

| Entità | Nome | Stato | Registro |
|---|---|---|---|
| `binary_sensor.motion_sensor_20ae_2` | Motion Camera | off | presente |
| `binary_sensor.motion_sensor_9a83_2` | Motion ascensore | off | presente |
| `light.aqara_hub_09ab_lightbulb_09ab_2` | Aqara Hub-09AB Lightbulb-09AB | off | presente |
| `light.lightbulb_78d9_2` | Luce ascensore | unavailable | presente |
| `light.lightbulb_78da_2` | Luce ingresso | off | presente |

</details>


[Torna all’indice](#indice-completo)

<a id="a47"></a>
### 47. Spengi sonoff con pulsante philips

**Stato:** abilitata. **Area:** Pulsanti / luci esterne. **Priorità:** P1. **Modalità:** `single`.
**Identità:** `automation.spengi_sonoff`; ID YAML `1789848073695`.
**Fonte:** [config-backup/automations.yaml, riga 25](config-backup/automations.yaml) · [YAML individuale](schede-yaml/47-spengi_sonoff.yaml). Ultima azione avviata registrata: **19/09/2026 22:51:10 CEST**.

**Cosa la attiva.** long_press sul pulsante 1 Soggiorno.

**Condizioni.** Nessuna.

**Comportamento e tempi.** Spegne CIABATTA VOLANTE e TORRE ORTO; poi esegue toggle su TORRE ORTO.

**Errori, rischi e interazioni.** ERRORE/INCOERENZA VERIFICATA: dopo uno spegnimento riuscito e aggiornato, toggle riaccende TORRE ORTO. Con stato cloud aggiornato in ritardo l’esito può variare, ma non è uno spegnimento deterministico. Sul medesimo long_press anche #25 accende entrambi: gara tra comandi opposti. Nessuna traccia disponibile.

**Preparazione dell’ottimizzazione.** Concordare l’esito della pressione lunga; unificare il controllo del pulsante ed eliminare in futuro il toggle ambiguo.

**Prove disponibili.** Nessuna traccia conservata: non è possibile attestare l’esito storico di esecuzione.

| Comando previsto | Destinazioni esplicite o risolte da dispositivo/area |
|---|---|
| `switch.turn_off` | `switch.100185132f_power` — Ciabatta volante; `switch.1002963641_power` — TORRE ORTO  TORRE ORTO |
| `switch.toggle` | `switch.1002963641_power` — TORRE ORTO  TORRE ORTO |

<details><summary>Entità coinvolte e stato al momento della lettura</summary>

| Entità | Nome | Stato | Registro |
|---|---|---|---|
| `event.soggiorno_switch_button_1` | Soggiorno switch Button 1 | 2026-09-23T07:14:21.042+00:00 | presente |
| `switch.100185132f_power` | Ciabatta volante | off | presente |
| `switch.1002963641_power` | TORRE ORTO  TORRE ORTO | off | presente |

</details>


[Torna all’indice](#indice-completo)

<a id="a48"></a>
### 48. Spia allarme

**Stato:** disabilitata. **Area:** Allarme / luci. **Priorità:** P3 — disabilitata. **Modalità:** `single`.
**Identità:** `automation.spia_allarme`; ID YAML `1791567896934`.
**Fonte:** [config-backup/automations.yaml, riga 1282](config-backup/automations.yaml) · [YAML individuale](schede-yaml/48-spia_allarme.yaml). Ultima azione avviata registrata: **24/10/2026 01:16:57 CEST**.

**Cosa la attiva.** Movimento Scale taverna.

**Condizioni.** Almeno un pannello allarme armato.

**Comportamento e tempi.** Dieci lampeggi rossi di Lampada scale e Wiby; infine tenta un’accensione Wiby arancione.

**Errori, rischi e interazioni.** ERRORE DI DATI VERIFICATO: rgbw_color è un intero dizionario di attributi copiati, mentre il servizio richiede una sequenza di quattro valori; è presente anche rgb_color nella stessa chiamata. Ultima azione non valida, qualora raggiunta. Wiby unavailable nello snapshot. DISABILITATA e apparentemente sostituita da #50.

**Preparazione dell’ottimizzazione.** Conservare come storico; non riattivare questa versione. Confrontare con #50 prima di archiviare.

**Prove disponibili.** Nessuna traccia conservata: non è possibile attestare l’esito storico di esecuzione.

| Comando previsto | Destinazioni esplicite o risolte da dispositivo/area |
|---|---|
| `light.turn_on` | `light.lampada_scale` — Lampada scale; `light.wiby_lampadina_smart_a65_11w` — Ingresso esterno |
| `light.turn_off` | `light.lampada_scale` — Lampada scale; `light.wiby_lampadina_smart_a65_11w` — Ingresso esterno |
| `light.turn_on` | `light.wiby_lampadina_smart_a65_11w` — Ingresso esterno |

<details><summary>Entità coinvolte e stato al momento della lettura</summary>

| Entità | Nome | Stato | Registro |
|---|---|---|---|
| `alarm_control_panel.allarme_casa` | Allarme Casa | disarmed | presente |
| `alarm_control_panel.aqara_hub_09ab_security_system_2` | Aqara Hub-09AB Security System | disarmed | presente |
| `binary_sensor.1` | Scale taverna | off | presente |
| `light.lampada_scale` | Lampada scale | on | presente |
| `light.wiby_lampadina_smart_a65_11w` | Ingresso esterno | unavailable | presente |

</details>


[Torna all’indice](#indice-completo)

<a id="a49"></a>
### 49. Spia allarme disinserito

**Stato:** disabilitata. **Area:** Allarme / luci. **Priorità:** P3 — disabilitata. **Modalità:** `single`.
**Identità:** `automation.spia_allarme_disinserito`; ID YAML `1792105077986`.
**Fonte:** [config-backup/automations.yaml, riga 1510](config-backup/automations.yaml) · [YAML individuale](schede-yaml/49-spia_allarme_disinserito.yaml). Ultima azione avviata registrata: **23/10/2026 22:19:25 CEST**.

**Cosa la attiva.** Uno dei pannelli diventa armato, non disarmato.

**Condizioni.** Almeno uno dei due pannelli disarmed. Le due condizioni possono coesistere se i pannelli sono disallineati.

**Comportamento e tempi.** Wiby verde per 3 secondi e spenta; se è prima dell’alba richiede poi il giallo.

**Errori, rischi e interazioni.** INCOERENZA VERIFICATA: nome “disinserito” ma evento “armed”; non segnala normalmente il disinserimento. Dipende dal disallineamento dei due pannelli e dalla gara con #10. Wiby unavailable. La condizione before sunrise isolata non esprime in generale tutta la notte. DISABILITATA, sostituzione probabile #50.

**Preparazione dell’ottimizzazione.** Archiviare soltanto dopo avere concordato che #50 copra la segnalazione desiderata.

**Prove disponibili.** Nessuna traccia conservata: non è possibile attestare l’esito storico di esecuzione.

| Comando previsto | Destinazioni esplicite o risolte da dispositivo/area |
|---|---|
| `light.turn_on` | `light.wiby_lampadina_smart_a65_11w` — Ingresso esterno |
| `light.turn_off` | `light.wiby_lampadina_smart_a65_11w` — Ingresso esterno |

<details><summary>Entità coinvolte e stato al momento della lettura</summary>

| Entità | Nome | Stato | Registro |
|---|---|---|---|
| `alarm_control_panel.allarme_casa` | Allarme Casa | disarmed | presente |
| `alarm_control_panel.aqara_hub_09ab_security_system_2` | Aqara Hub-09AB Security System | disarmed | presente |
| `light.wiby_lampadina_smart_a65_11w` | Ingresso esterno | unavailable | presente |

</details>


[Torna all’indice](#indice-completo)

<a id="a50"></a>
### 50. Spia allarme scale

**Stato:** abilitata. **Area:** Allarme / luci. **Priorità:** P1. **Modalità:** `single`.
**Identità:** `automation.spia_allarme_scale`; ID YAML `1792799964529`.
**Fonte:** [config-backup/automations.yaml, riga 2106](config-backup/automations.yaml) · [YAML individuale](schede-yaml/50-spia_allarme_scale.yaml). Ultima azione avviata registrata: **29/10/2026 06:19:49 CET**.

**Cosa la attiva.** Movimento Scale taverna oppure uno dei due pannelli passa a disarmed da uno degli stati elencati.

**Condizioni.** Sul movimento: almeno un pannello è armato/in inserimento/pending/triggered. Sul disarmo: entrambi devono già essere disarmed.

**Comportamento e tempi.** Salva stato Wiby in scena temporanea. Movimento: fino a 10 lampeggi rossi da 1 secondo, interrompibili quando entrambi disarmati. Se entrambi disarmati esegue 5 lampeggi verdi. Ripristina Wiby e lascia Lampada scale accesa calda di notte, spenta di giorno.

**Errori, rischi e interazioni.** OSSERVATO: errori Tuya reali nel registro possono interrompere la sequenza prima del ripristino; Wiby unavailable nello snapshot. Conflitto diretto con #17 sul medesimo movimento: #17 spegnerà dopo 2 minuti anche se #50 l’aveva lasciata accesa per la notte. single con max_exceeded silent ignora nuovi eventi senza avviso; una corsa sul disarmo può perdere il trigger, pur essendoci controlli interni che mitigano alcuni casi. Nessun ripristino garantito se una chiamata fallisce.

**Preparazione dell’ottimizzazione.** Definire un unico controllo per Lampada scale, verificare Tuya/Wiby e rendere affidabile il ripristino anche dopo interruzioni.

**Prove disponibili.** 5 tracce conservate: failed_conditions=5.

| Registro | Occorrenze aggregate | Ultima occorrenza | Messaggi conservati |
|---|---:|---|---|
| ERROR | 1 | 26/10/2026 18:59:00 CET | Error while executing automation automation.spia_allarme_scale: The Tuya cloud rejected the command |
| ERROR | 3 | 26/10/2026 18:59:00 CET | Spia allarme scale: Choose at step 3: choice 1: Repeat at step 1: Error executing script. Error for call_service at pos 1: The Tuya cloud rejected the command / Spia allarme scale: Choose at step 3: choice 1: Error executing script. Error for repeat at pos 1: The Tuya cloud rejected the command / Spia allarme scale: Error executing script. Error for choose at pos 3: The Tuya cloud rejected the command |

Le occorrenze sono contatori aggregati del registro; se una riga conserva più messaggi, il contatore non è un numero attribuibile con precisione a ciascun messaggio.

| Comando previsto | Destinazioni esplicite o risolte da dispositivo/area |
|---|---|
| `scene.create` | Nessuna entità target: dati, template o chiamata informativa (vedi YAML). |
| `light.turn_on` | `light.lampada_scale` — Lampada scale; `light.wiby_lampadina_smart_a65_11w` — Ingresso esterno |
| `light.turn_off` | `light.lampada_scale` — Lampada scale; `light.wiby_lampadina_smart_a65_11w` — Ingresso esterno |
| `scene.turn_on` | `scene.spia_allarme_wiby_precedente` — spia_allarme_wiby_precedente |
| `light.turn_on` | `light.lampada_scale` — Lampada scale |
| `light.turn_off` | `light.lampada_scale` — Lampada scale |

<details><summary>Entità coinvolte e stato al momento della lettura</summary>

| Entità | Nome | Stato | Registro |
|---|---|---|---|
| `alarm_control_panel.allarme_casa` | Allarme Casa | disarmed | presente |
| `alarm_control_panel.aqara_hub_09ab_security_system_2` | Aqara Hub-09AB Security System | disarmed | presente |
| `binary_sensor.1` | Scale taverna | off | presente |
| `light.lampada_scale` | Lampada scale | on | presente |
| `light.wiby_lampadina_smart_a65_11w` | Ingresso esterno | unavailable | presente |
| `scene.spia_allarme_wiby_precedente` | spia_allarme_wiby_precedente | 2026-10-29T05:19:56.405371+00:00 | non registrata / dinamica |
| `sun.sun` | Sun | above_horizon | non registrata / dinamica |

</details>


[Torna all’indice](#indice-completo)

<a id="a51"></a>
### 51. Spia esterno - Settori

**Stato:** abilitata. **Area:** Allarme / segnalazioni esterne. **Priorità:** P2. **Modalità:** `restart`.
**Identità:** `automation.spia_esterno`; ID YAML `1790200903746`.
**Fonte:** [config-backup/automations.yaml, riga 650](config-backup/automations.yaml) · [YAML individuale](schede-yaml/51-spia_esterno.yaml). Ultima azione avviata registrata: **29/10/2026 04:22:49 CET**.

**Cosa la attiva.** Movimento continuo per 30 secondi in uno dei nove sensori elencati, raggruppati in tre settori.

**Condizioni.** 22:30–06:00; non richiede allarme armato.

**Comportamento e tempi.** Cinque lampeggi del gateway Aqara: blu settore 1 (Parking/Piazzale/Cucina/Cucina_2), rosso settore 2 (Cancello/Tracking), verde settore 3 (Loggiato/Piscina orto/Piscine). restart: nuovo evento ammesso interrompe e sostituisce la segnalazione.

**Errori, rischi e interazioni.** OSSERVATO: Parking movimento disabilitato dal dispositivo, assente dagli stati. RISCHIO: un impulso sotto 30 secondi non segnala; eventi frequenti di un settore possono interrompere quelli di un altro. Sovrascrive la spia rossa sirena #6 e le cortesia sul gateway; non ripristina lo stato precedente.

**Preparazione dell’ottimizzazione.** Concordare soglia di 30 secondi e priorità di settori e allarme; sostituire riferimenti disabilitati solo dopo identificazione del dispositivo corretto.

**Prove disponibili.** 5 tracce conservate: failed_conditions=5.

| Comando previsto | Destinazioni esplicite o risolte da dispositivo/area |
|---|---|
| `light.turn_on` | `light.aqara_hub_09ab_lightbulb_09ab_2` — Aqara Hub-09AB Lightbulb-09AB |
| `light.turn_off` | `light.aqara_hub_09ab_lightbulb_09ab_2` — Aqara Hub-09AB Lightbulb-09AB |

<details><summary>Entità coinvolte e stato al momento della lettura</summary>

| Entità | Nome | Stato | Registro |
|---|---|---|---|
| `binary_sensor.cancello_movimento` | cancello Movimento | off | presente |
| `binary_sensor.cucina_movimento` | Motion camera cucina | off | presente |
| `binary_sensor.cucina_movimento_2` | Auto Movimento | off | presente |
| `binary_sensor.loggiato_movimento` | loggiato Movimento | off | presente |
| `binary_sensor.parking_movimento` | Movimento | assente dagli stati | disabilitata: device |
| `binary_sensor.piazzale_movimento` | piazzale Movimento | off | presente |
| `binary_sensor.piscina_orto_movimento` | Orto Movimento | off | presente |
| `binary_sensor.piscine_movimento` | piscine Movimento | off | presente |
| `binary_sensor.tracking_movimento` | tracking Movimento | off | presente |
| `light.aqara_hub_09ab_lightbulb_09ab_2` | Aqara Hub-09AB Lightbulb-09AB | off | presente |

</details>


[Torna all’indice](#indice-completo)

<a id="a52"></a>
### 52. Switch andrea accende letto

**Stato:** abilitata. **Area:** Pulsanti / luci interne. **Priorità:** P2. **Modalità:** `single`.
**Identità:** `automation.switch_andrea_accende_letto`; ID YAML `1789921638219`.
**Fonte:** [config-backup/automations.yaml, riga 391](config-backup/automations.yaml) · [YAML individuale](schede-yaml/52-switch_andrea_accende_letto.yaml). Ultima azione avviata registrata: **24/10/2026 14:59:34 CEST**.

**Cosa la attiva.** single_press del dispositivo Switch andrea.

**Condizioni.** Nessuna.

**Comportamento e tempi.** Toggle Luce letto; quando accende richiede 53% e 6500 K.

**Errori, rischi e interazioni.** VERIFICATO: il nome “accende” è incompleto: il pulsante spegne anche se trova la luce accesa. Parametri temperatura/brightness nel range dichiarato. RISCHIO: la cortesia #16 può spegnere entro il minuto la luce appena accesa manualmente; stesso attuatore delle spie allarme. Nessuna traccia conservata.

**Preparazione dell’ottimizzazione.** Concordare significato del toggle e durata dell’eventuale comando manuale rispetto alle automazioni.

**Prove disponibili.** Nessuna traccia conservata: non è possibile attestare l’esito storico di esecuzione.

| Comando previsto | Destinazioni esplicite o risolte da dispositivo/area |
|---|---|
| `light.toggle` | `light.1000ee1aa7_color_rgb` — Luce letto  Luce letto |

<details><summary>Entità coinvolte e stato al momento della lettura</summary>

| Entità | Nome | Stato | Registro |
|---|---|---|---|
| `light.1000ee1aa7_color_rgb` | Luce letto  Luce letto | off | presente |

</details>


[Torna all’indice](#indice-completo)

<a id="a53"></a>
### 53. switch hue Spegni luci sala

**Stato:** abilitata. **Area:** Pulsanti / luci interne. **Priorità:** P2. **Modalità:** `single`.
**Identità:** `automation.spegni_luci`; ID YAML `1789849642221`.
**Fonte:** [config-backup/automations.yaml, riga 50](config-backup/automations.yaml) · [YAML individuale](schede-yaml/53-spegni_luci.yaml). Ultima azione avviata registrata: **23/09/2026 13:11:32 CEST**.

**Cosa la attiva.** short_release del pulsante 2 Soggiorno.

**Condizioni.** Nessuna.

**Comportamento e tempi.** Spegne Luce ingresso e Luce ascensore.

**Errori, rischi e interazioni.** OSSERVATO: Luce ascensore unavailable. Nessun errore di struttura evidente; nessuna traccia conservata. RISCHIO: spegnimento manuale può essere annullato da cortesia ingresso/movimento subito successiva; nome “luci sala” non coincide con nomi attuali delle destinazioni.

**Preparazione dell’ottimizzazione.** Rinominare in futuro secondo i luoghi reali e concordare se lo spegnimento manuale debba sospendere temporaneamente le cortesia.

**Prove disponibili.** Nessuna traccia conservata: non è possibile attestare l’esito storico di esecuzione.

| Comando previsto | Destinazioni esplicite o risolte da dispositivo/area |
|---|---|
| `light.turn_off` | `light.lightbulb_78d9_2` — Luce ascensore; `light.lightbulb_78da_2` — Luce ingresso |

<details><summary>Entità coinvolte e stato al momento della lettura</summary>

| Entità | Nome | Stato | Registro |
|---|---|---|---|
| `event.soggiorno_switch_button_2` | Soggiorno switch Button 2 | 2026-09-23T11:11:32.459+00:00 | presente |
| `light.lightbulb_78d9_2` | Luce ascensore | unavailable | presente |
| `light.lightbulb_78da_2` | Luce ingresso | off | presente |

</details>


[Torna all’indice](#indice-completo)

<a id="a54"></a>
### 54. Switch lucia accende letto

**Stato:** abilitata. **Area:** Pulsanti / luci interne. **Priorità:** P2. **Modalità:** `single`.
**Identità:** `automation.switch_lucia_accende_letto`; ID YAML `1789921346389`.
**Fonte:** [config-backup/automations.yaml, riga 371](config-backup/automations.yaml) · [YAML individuale](schede-yaml/54-switch_lucia_accende_letto.yaml). Ultima azione avviata registrata: **21/10/2026 22:14:45 CEST**.

**Cosa la attiva.** single_press del dispositivo Switch lucia.

**Condizioni.** Nessuna.

**Comportamento e tempi.** Toggle Luce letto; quando accende richiede 100% e 6500 K.

**Errori, rischi e interazioni.** Stesse interazioni di #52, con luminosità diversa voluta o da confermare. I due pulsanti comandano la stessa luce; pressioni ravvicinate possono annullarsi. Parametri nel range dichiarato; nessuna traccia conservata.

**Preparazione dell’ottimizzazione.** Concordare differenza 53%/100% tra i due pulsanti e priorità manuale rispetto a #16 e alle spie allarme.

**Prove disponibili.** Nessuna traccia conservata: non è possibile attestare l’esito storico di esecuzione.

| Comando previsto | Destinazioni esplicite o risolte da dispositivo/area |
|---|---|
| `light.toggle` | `light.1000ee1aa7_color_rgb` — Luce letto  Luce letto |

<details><summary>Entità coinvolte e stato al momento della lettura</summary>

| Entità | Nome | Stato | Registro |
|---|---|---|---|
| `light.1000ee1aa7_color_rgb` | Luce letto  Luce letto | off | presente |

</details>


[Torna all’indice](#indice-completo)

<a id="a55"></a>
### 55. Telecamere - Sensibilità Giorno

**Stato:** abilitata. **Area:** Telecamere. **Priorità:** P2. **Modalità:** `single`.
**Identità:** `automation.sensibilita_telecamere_giorno_notte`; ID YAML `1792364358002`.
**Fonte:** [config-backup/automations.yaml, riga 1641](config-backup/automations.yaml) · [YAML individuale](schede-yaml/55-sensibilita_telecamere_giorno_notte.yaml). Ultima azione avviata registrata: **29/10/2026 06:44:11 CET**.

**Cosa la attiva.** Alba.

**Condizioni.** Nessuna.

**Comportamento e tempi.** Imposta sensibilità movimento di 11 telecamere a 42; sensibilità AI persone di 4 a 100, veicoli di 3 a 20, animali di 4 a 10.

**Errori, rischi e interazioni.** OSSERVATO: quattro entità Parking sono disabilitate dal dispositivo e sensibilità Piscina orto è disabilitata dall’utente; questi riferimenti non hanno stato. Le tracce finished non garantiscono che tutte le destinazioni abbiano applicato il valore. VERIFICATO: non compare sensibilità movimento Esterno ingresso, presente invece altrove nell’inventario. Nessun riallineamento all’avvio se viene persa l’alba. Profilo sovrascrive l’adattamento #40.

**Preparazione dell’ottimizzazione.** Concordare copertura telecamere, profili e precedenza dell’adattamento; ripulire i riferimenti solo dopo verifica delle entità attuali.

**Prove disponibili.** 4 tracce conservate: finished=4.

| Comando previsto | Destinazioni esplicite o risolte da dispositivo/area |
|---|---|
| `number.set_value` | `number.cancello_cancello_sensibilita_al_movimento` — cancello Sensibilità al movimento; `number.cucina_sensibilita_al_movimento` — Cucina e posteriore Sensibilità al movimento; `number.cucina_sensibilita_al_movimento_2` — Auto Sensibilità al movimento; `number.loggiato_sensibilita_al_movimento` — loggiato Sensibilità al movimento; `number.parco_sensibilita_al_movimento` — Officina Sensibilità al movimento; `number.parking_sensibilita_al_movimento` — Sensibilità al movimento; `number.piazzale_sensibilita_al_movimento` — piazzale Sensibilità al movimento; `number.piscina_orto_sensibilita_al_movimento` — Sensibilità al movimento; `number.piscine_sensibilita_al_movimento` — piscine Sensibilità al movimento; `number.sala_sensibilita_al_movimento` — sala Sensibilità al movimento; `number.tracking_sensibilita_al_movimento` — tracking Sensibilità al movimento |
| `number.set_value` | `number.parking_ai_person_sensitivity` — AI person sensitivity; `number.piazzale_ai_person_sensitivity` — piazzale AI person sensitivity; `number.sala_ai_person_sensitivity` — sala AI person sensitivity; `number.tracking_ai_person_sensitivity` — tracking AI person sensitivity |
| `number.set_value` | `number.parking_ai_vehicle_sensitivity` — AI vehicle sensitivity; `number.piazzale_ai_vehicle_sensitivity` — piazzale AI vehicle sensitivity; `number.tracking_ai_vehicle_sensitivity` — tracking AI vehicle sensitivity |
| `number.set_value` | `number.parking_ai_animal_sensitivity` — AI animal sensitivity; `number.piazzale_ai_animal_sensitivity` — piazzale AI animal sensitivity; `number.sala_ai_animal_sensitivity` — sala AI animal sensitivity; `number.tracking_ai_animal_sensitivity` — tracking AI animal sensitivity |

<details><summary>Entità coinvolte e stato al momento della lettura</summary>

| Entità | Nome | Stato | Registro |
|---|---|---|---|
| `number.cancello_cancello_sensibilita_al_movimento` | cancello Sensibilità al movimento | 42 | presente |
| `number.cucina_sensibilita_al_movimento` | Cucina e posteriore Sensibilità al movimento | 42 | presente |
| `number.cucina_sensibilita_al_movimento_2` | Auto Sensibilità al movimento | 42 | presente |
| `number.loggiato_sensibilita_al_movimento` | loggiato Sensibilità al movimento | 42 | presente |
| `number.parco_sensibilita_al_movimento` | Officina Sensibilità al movimento | 42 | presente |
| `number.parking_ai_animal_sensitivity` | AI animal sensitivity | assente dagli stati | disabilitata: device |
| `number.parking_ai_person_sensitivity` | AI person sensitivity | assente dagli stati | disabilitata: device |
| `number.parking_ai_vehicle_sensitivity` | AI vehicle sensitivity | assente dagli stati | disabilitata: device |
| `number.parking_sensibilita_al_movimento` | Sensibilità al movimento | assente dagli stati | disabilitata: device |
| `number.piazzale_ai_animal_sensitivity` | piazzale AI animal sensitivity | 10 | presente |
| `number.piazzale_ai_person_sensitivity` | piazzale AI person sensitivity | 100 | presente |
| `number.piazzale_ai_vehicle_sensitivity` | piazzale AI vehicle sensitivity | 20 | presente |
| `number.piazzale_sensibilita_al_movimento` | piazzale Sensibilità al movimento | 42 | presente |
| `number.piscina_orto_sensibilita_al_movimento` | Sensibilità al movimento | assente dagli stati | disabilitata: user |
| `number.piscine_sensibilita_al_movimento` | piscine Sensibilità al movimento | 16 | presente |
| `number.sala_ai_animal_sensitivity` | sala AI animal sensitivity | 10 | presente |
| `number.sala_ai_person_sensitivity` | sala AI person sensitivity | 100 | presente |
| `number.sala_sensibilita_al_movimento` | sala Sensibilità al movimento | 42 | presente |
| `number.tracking_ai_animal_sensitivity` | tracking AI animal sensitivity | 10 | presente |
| `number.tracking_ai_person_sensitivity` | tracking AI person sensitivity | 100 | presente |
| `number.tracking_ai_vehicle_sensitivity` | tracking AI vehicle sensitivity | 20 | presente |
| `number.tracking_sensibilita_al_movimento` | tracking Sensibilità al movimento | 42 | presente |

</details>


[Torna all’indice](#indice-completo)

<a id="a56"></a>
### 56. Telecamere - Sensibilità Notte

**Stato:** abilitata. **Area:** Telecamere. **Priorità:** P2. **Modalità:** `single`.
**Identità:** `automation.telecamere_sensibilita_notte`; ID YAML `1792364592742`.
**Fonte:** [config-backup/automations.yaml, riga 1692](config-backup/automations.yaml) · [YAML individuale](schede-yaml/56-telecamere_sensibilita_notte.yaml). Ultima azione avviata registrata: **28/10/2026 17:09:17 CET**.

**Cosa la attiva.** Tramonto.

**Condizioni.** Nessuna.

**Comportamento e tempi.** Sensibilità movimento delle stesse 11 telecamere a 5; persone 100, veicoli 10, animali 10 sulle rispettive liste AI.

**Errori, rischi e interazioni.** Stesse destinazioni disabilitate e omissione Esterno ingresso di #55. RISCHIO: impostazioni molto diverse dal giorno possono essere volute, ma il degrado fino al minimo causato da #40 usa eventi globali e può ridurre ulteriormente soltanto Piscine. Nessun recupero all’avvio. Tracce disponibili finished, anche da avvio manuale storico.

**Preparazione dell’ottimizzazione.** Definire valori desiderati e criteri di ripristino/adattamento per ogni telecamera; evitare due sistemi senza precedenza esplicita.

**Prove disponibili.** 5 tracce conservate: finished=5.

| Comando previsto | Destinazioni esplicite o risolte da dispositivo/area |
|---|---|
| `number.set_value` | `number.cancello_cancello_sensibilita_al_movimento` — cancello Sensibilità al movimento; `number.cucina_sensibilita_al_movimento` — Cucina e posteriore Sensibilità al movimento; `number.cucina_sensibilita_al_movimento_2` — Auto Sensibilità al movimento; `number.loggiato_sensibilita_al_movimento` — loggiato Sensibilità al movimento; `number.parco_sensibilita_al_movimento` — Officina Sensibilità al movimento; `number.parking_sensibilita_al_movimento` — Sensibilità al movimento; `number.piazzale_sensibilita_al_movimento` — piazzale Sensibilità al movimento; `number.piscina_orto_sensibilita_al_movimento` — Sensibilità al movimento; `number.piscine_sensibilita_al_movimento` — piscine Sensibilità al movimento; `number.sala_sensibilita_al_movimento` — sala Sensibilità al movimento; `number.tracking_sensibilita_al_movimento` — tracking Sensibilità al movimento |
| `number.set_value` | `number.parking_ai_person_sensitivity` — AI person sensitivity; `number.piazzale_ai_person_sensitivity` — piazzale AI person sensitivity; `number.sala_ai_person_sensitivity` — sala AI person sensitivity; `number.tracking_ai_person_sensitivity` — tracking AI person sensitivity |
| `number.set_value` | `number.parking_ai_vehicle_sensitivity` — AI vehicle sensitivity; `number.piazzale_ai_vehicle_sensitivity` — piazzale AI vehicle sensitivity; `number.tracking_ai_vehicle_sensitivity` — tracking AI vehicle sensitivity |
| `number.set_value` | `number.parking_ai_animal_sensitivity` — AI animal sensitivity; `number.piazzale_ai_animal_sensitivity` — piazzale AI animal sensitivity; `number.sala_ai_animal_sensitivity` — sala AI animal sensitivity; `number.tracking_ai_animal_sensitivity` — tracking AI animal sensitivity |

<details><summary>Entità coinvolte e stato al momento della lettura</summary>

| Entità | Nome | Stato | Registro |
|---|---|---|---|
| `number.cancello_cancello_sensibilita_al_movimento` | cancello Sensibilità al movimento | 42 | presente |
| `number.cucina_sensibilita_al_movimento` | Cucina e posteriore Sensibilità al movimento | 42 | presente |
| `number.cucina_sensibilita_al_movimento_2` | Auto Sensibilità al movimento | 42 | presente |
| `number.loggiato_sensibilita_al_movimento` | loggiato Sensibilità al movimento | 42 | presente |
| `number.parco_sensibilita_al_movimento` | Officina Sensibilità al movimento | 42 | presente |
| `number.parking_ai_animal_sensitivity` | AI animal sensitivity | assente dagli stati | disabilitata: device |
| `number.parking_ai_person_sensitivity` | AI person sensitivity | assente dagli stati | disabilitata: device |
| `number.parking_ai_vehicle_sensitivity` | AI vehicle sensitivity | assente dagli stati | disabilitata: device |
| `number.parking_sensibilita_al_movimento` | Sensibilità al movimento | assente dagli stati | disabilitata: device |
| `number.piazzale_ai_animal_sensitivity` | piazzale AI animal sensitivity | 10 | presente |
| `number.piazzale_ai_person_sensitivity` | piazzale AI person sensitivity | 100 | presente |
| `number.piazzale_ai_vehicle_sensitivity` | piazzale AI vehicle sensitivity | 20 | presente |
| `number.piazzale_sensibilita_al_movimento` | piazzale Sensibilità al movimento | 42 | presente |
| `number.piscina_orto_sensibilita_al_movimento` | Sensibilità al movimento | assente dagli stati | disabilitata: user |
| `number.piscine_sensibilita_al_movimento` | piscine Sensibilità al movimento | 16 | presente |
| `number.sala_ai_animal_sensitivity` | sala AI animal sensitivity | 10 | presente |
| `number.sala_ai_person_sensitivity` | sala AI person sensitivity | 100 | presente |
| `number.sala_sensibilita_al_movimento` | sala Sensibilità al movimento | 42 | presente |
| `number.tracking_ai_animal_sensitivity` | tracking AI animal sensitivity | 10 | presente |
| `number.tracking_ai_person_sensitivity` | tracking AI person sensitivity | 100 | presente |
| `number.tracking_ai_vehicle_sensitivity` | tracking AI vehicle sensitivity | 20 | presente |
| `number.tracking_sensibilita_al_movimento` | tracking Sensibilità al movimento | 42 | presente |

</details>


[Torna all’indice](#indice-completo)

<a id="a57"></a>
### 57. Test

**Stato:** disabilitata. **Area:** Allarme / presenza. **Priorità:** P3 — disabilitata. **Modalità:** `single`.
**Identità:** `automation.test`; ID YAML `1791267642209`.
**Fonte:** [config-backup/automations.yaml, riga 1154](config-backup/automations.yaml) · [YAML individuale](schede-yaml/57-test.yaml). Ultima azione avviata registrata: **08/10/2026 19:52:00 CEST**.

**Cosa la attiva.** Uno dei due tracker telefonici diventa not_home per 15 minuti.

**Condizioni.** Xiaomi 12 Pro fuori da proprieta_2 e Xiaomi 13T Pro fuori da proprieta.

**Comportamento e tempi.** Arma Aqara in away; #10, se attiva, sincronizza Allarme Casa in home.

**Errori, rischi e interazioni.** DISABILITATA. VERIFICATO: i 15 minuti riguardano solo il tracker che ha generato il trigger, non necessariamente entrambi. Le condizioni verificano zone specifiche, non due assenze da casa continue di 15 minuti. Dipende dall’affidabilità dei tracker e dalla sincronizzazione dei pannelli.

**Preparazione dell’ottimizzazione.** Prima di riattivare definire regola presenza complessiva, significato delle due zone e modalità allarme richiesta.

**Prove disponibili.** Nessuna traccia conservata: non è possibile attestare l’esito storico di esecuzione.

| Comando previsto | Destinazioni esplicite o risolte da dispositivo/area |
|---|---|
| `alarm_control_panel.alarm_arm_away` | `alarm_control_panel.aqara_hub_09ab_security_system_2` — Aqara Hub-09AB Security System |

<details><summary>Entità coinvolte e stato al momento della lettura</summary>

| Entità | Nome | Stato | Registro |
|---|---|---|---|
| `alarm_control_panel.aqara_hub_09ab_security_system_2` | Aqara Hub-09AB Security System | disarmed | presente |
| `device_tracker.xiaomi_12_pro` | Xiaomi-12-Pro Xiaomi-12-Pro | not_home | presente |
| `device_tracker.xiaomi_13t_pro_2` | Xiaomi-13T-Pro Xiaomi-13T-Pro | not_home | presente |
| `zone.proprieta` | Proprietà  | 2 | presente |
| `zone.proprieta_2` | Proprietà  | 2 | presente |

</details>


[Torna all’indice](#indice-completo)

## Interazioni tra le automazioni

Le condivisioni sotto indicano possibilità di comandi concorrenti, non provano da sole che ogni coppia abbia già causato un malfunzionamento. Non c’è una priorità globale tra automazioni diverse: la modalità single di una non blocca le altre.

| Risorsa condivisa | Automazioni | Interazione da progettare |
|---|---|---|
| Manuale PLC / Q1–Q4 | #37, #38, #39, #42, #43, #44; diagnostica #34 | Un solo ciclo deve possedere la modalità e rilasciarla quando tutte le fasi necessarie sono finite. |
| Luce letto | #3, #5, #16, #21, #52, #54 | Segnalazione allarme, cortesia e pulsanti sovrascrivono colore, luminosità e spegnimento. |
| Gateway luminoso Aqara | #5, #6, #15, #23, #46, #51 | Sirena/spie e cortesia usano la stessa luce; nessuna precedenza comune. |
| Lampada scale | #17, #41, #48*, #50 | #17 e #50 partono sullo stesso movimento; il primo può spegnere il ripristino notturno del secondo. |
| Luce ingresso / ascensore | #14, #15, #23, #24, #46, #53 | Accensioni manuali e ritardi di spegnimento non distinguono chi aveva acceso. |
| Torre ingresso | #20*, #26, #28, #41, #45* | Luce fissa notturna versus movimento temporizzato e sincronizzazione faretto. |
| Torre orto / ciabatta | #4, #25, #30*, #41, #47 | Pulsante long_press invia comandi opposti e l’allarme sovrascrive lo stato precedente. |
| PTZ Tracking | #35, #36 | Due preset senza priorità né ritorno; entità destinazione attualmente disabilitata. |
| Sensibilità Piscine / timer / contatore | #31*, #40, #55, #56 | Adattamento comune, profili fissi e helper condivisi. |
| Velux | #7, #12, #13, più contatto incluso in #1/#5/#21 | Apertura automatica può contraddire chiusura serale e inserimento allarme. |
| Due pannelli allarme | #5, #8*, #9*, #10, #18, #19, #57* | Modalità home/away forzate e percorsi diversi con/senza controllo aperture. |

`*` = automazione attualmente disabilitata. La relazione resta importante per evitare riattivazioni conflittuali.

## Comportamenti trasversali da tenere presenti

**Tempi e modalità.** `single` ignora un nuovo avvio mentre la sequenza è occupata; `restart` interrompe quella in corso e riparte; `queued` accoda. I delay e le attese non sopravvivono a un riavvio di HA. Questo è rilevante soprattutto per le quattro ore di #7, #37 e #43, l’ora di #46 e i 30 minuti di #26. [Documentazione ufficiale modalità](https://www.home-assistant.io/docs/automation/modes/).

**Eventi e condizioni.** Un trigger reagisce a un cambiamento, non verifica continuamente un requisito. Se una condizione impedisce l’avvio, il suo successivo diventare vera non costituisce da solo un nuovo trigger. Le soglie numeric_state sono attraversamenti stretti, non verifiche continue: questione centrale per #38/#39/#42. [Documentazione ufficiale trigger](https://www.home-assistant.io/docs/automation/trigger/).

**Arresti ed errori.** Una chiamata fallita normalmente interrompe le azioni seguenti; perciò un’accensione seguita da delay e spegnimento non garantisce da sola lo spegnimento se viene interrotta. La gestione degli errori va decisa per azione, senza ignorare indiscriminatamente i guasti essenziali. [Documentazione ufficiale sequenze](https://www.home-assistant.io/docs/automation/building-blocks/).

**Timer.** Non basta sostituire ogni delay con un timer: la persistenza deve essere configurata, e un timer scaduto mentre HA è spento non emette automaticamente timer.finished all’avvio. Serve una strategia di recupero, soprattutto per cisterne e chiusure. [Documentazione ufficiale timer](https://www.home-assistant.io/integrations/timer/).

**Sintassi nuove e destinazioni.** Forme come `motion.detected`, `event.received` e `sun.sunset` sono effettivamente presenti nelle configurazioni lette; non sono state bollate come errori soltanto perché diverse dalla sintassi classica. Per risolvere i target dispositivo/area ho escluso entità nascoste o config/diagnostic, in accordo con [il codice ufficiale HA 2026.10.2](https://github.com/home-assistant/core/blob/2026.10.2/homeassistant/helpers/target.py). Le destinazioni risolte sono una fotografia attuale, non un elenco immutabile.

## Ordine proposto per una futura ottimizzazione

1. **Cisterne e PLC:** #43, proprietà di Manuale, interblocchi, soglie, timeout, recupero dopo riavvio e protezioni già presenti nel programma PLC. Prima stabilire il ciclo fisico desiderato; nessuna modifica durante questa analisi.
2. **Allarme:** perimetro protetto, Porta taverna, modalità dei due pannelli, inserimento unico, significato del disarmo mattutino, sirena e notifiche immediate.
3. **Velux:** scopo del confronto termico, pioggia/vento, apertura con allarme disallineato, chiusure indipendenti e recupero delle scadenze.
4. **Luci e pulsanti:** risolvere #25/#47, guasti Tuya, precedenza manuale/allarme/cortesia e contratto di funzionamento della torre ingresso.
5. **Telecamere:** entità attive reali, preset PTZ, profili giorno/notte e adattamento separato per telecamera.
6. **Pulizia finale:** rinominare secondo le stanze reali, documentare scelte e soltanto allora archiviare test e sostituzioni disabilitate.

## Domande funzionali ancora aperte

- Quali sono gli interblocchi e i limiti di livello implementati nel PLC, e cosa succede alle uscite quando PLC HA Manuale si spegne?
- Il ricircolo deve ripartire dopo ogni spegnimento Q3 oppure soltanto dopo un riempimento concluso? Deve durare 4 ore anche oltre la fascia?
- Porta taverna deve innescare l’allarme? Porta camera è soltanto un comando interno? Il movimento mattutino deve disarmare tutta la casa?
- Home/away dei due pannelli sono intenzionalmente diversi? È prevista protezione interna quando tutti sono assenti?
- Il Velux serve per raffrescamento, riscaldamento o ricambio aria? Dove si trova il sensore 3831?
- Torre ingresso deve restare accesa tutta la notte o spegnersi dopo il movimento? I comandi manuali devono sospendere gli automatismi?
- La riduzione sensibilità deve essere indipendente per ciascuna telecamera? Quali entità disabilitate sono vecchi dispositivi e quali sono volutamente disabilitate?

## File consegnati e verificabilità

- `INVENTARIO-AUTOMAZIONI.md`: questo documento completo.
- `INVENTARIO-AUTOMAZIONI.html`: versione da aprire nel browser, con ricerca locale nelle schede.
- `inventario-automazioni.csv`: 57 righe con logica e rilievi per confronti e pianificazione.
- `schede-yaml/`: 57 configurazioni individuali, comprese le tre del package PR205.
- `configurazioni-live.json`, `config-backup/`, `stati.json`, `registro-entita.json`, `registro-dispositivi.json`, `registro-aree.json`: fonti della fotografia analizzata.
- `tracce.json` e `registro-errori.json`: prove d’esecuzione disponibili; non è stato provocato alcun evento per crearne di nuove.
- `modello-inventario.json`: dipendenze e target risolti usati per costruire le schede.

Questi file possono contenere nomi di persone, dispositivi e dati della casa: sono salvati con permessi locali privati. Il documento non contiene il token di accesso. Nessun test di ripristino del backup o comando fisico è stato eseguito.
