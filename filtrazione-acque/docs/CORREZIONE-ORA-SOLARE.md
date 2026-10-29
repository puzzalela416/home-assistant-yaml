# Correzione diagnostica e ora solare — 29 ottobre 2026

## Causa verificata

Il sensore di blocco filtri ha registrato l’inizio del controlavaggio giovedì 29 ottobre alle **09:00:28**. HA cercava il filtro 2 tra le 09:30 e le 10:30 e lo aveva classificato “Filtro 4 presunto”. L’allarme “Filtro 2 non partito” risultava quindi acceso benché il lavaggio fosse avvenuto. Lo storico mostra lo stesso problema martedì 27 ottobre: ciclo alle **13:11:44** attribuito al filtro 4.

## Correzione

I timer mantengono l’orario estivo, cioè **UTC+02 fisso**. Riconoscimento e scadenza degli allarmi usano ora entrambi questo riferimento, indipendente dal cambio stagionale del fuso HA (Europe/Berlin, con lo stesso cambio di Europe/Rome).

| Filtro | Giorni | Ora solare | Ora legale | Allarme dopo |
|---|---|---|---|---|
| 2 | lunedì, giovedì | 09:00 | 10:00 | 40 minuti |
| 3 | martedì, sabato | 13:00 | 14:00 | 40 minuti |

Riconoscimento presunto entro ±30 minuti dall’orario previsto; resto classificato come filtro 4 presunto. I giorni settimanali e la tolleranza sono conservati. La guida della plancia mostra gli orari locali ricavati dagli stessi sensori. Se in futuro si correggono manualmente gli orologi dei filtri, occorrerà aggiornare il riferimento diagnostico.

Le memorie sono state corrette usando gli eventi registrati: ultimo filtro 2 = 29/10 09:00:28; ultimo filtro 3 = 27/10 13:11:44; ultimo filtro 4 presunto ripristinato al 28/10 09:30:42, prima dell’errata attribuzione di oggi. Nessun ciclo inventato o comandato.

## Verifiche

441 scenari e 1323 controlli renderizzati dal vero motore template HA: inverno, estate, giorni non programmati, confini ±30 minuti, scadenza +40 minuti, ciclo riconosciuto e cambi d’ora 2027. Tutti superati. Configurazione verificata e ricaricata senza riavvio. Allarme filtro 2 ora OFF; filtro 3 OFF. Nessuna modifica al PLC, alle uscite o alle regole idrauliche.

La diagnostica resta un’identificazione da giorno/orario su sensore condiviso, non un feedback separato di ciascun filtro. L’allarme di mancata partenza resta attivo se manca il ciclo atteso.
