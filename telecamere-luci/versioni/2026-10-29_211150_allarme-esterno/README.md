# Correzione Allarme innescato = esterno acceso

Versione 2026-10-29_211150_allarme-esterno. Modifica autorizzata dall’utente dopo la revisione telecamere/fotocellule.

## Cosa cambia

I tre comandi di accensione ora indirizzano solo le cinque uscite già previste: **Torre Orto, Capanno, Parcheggio, Giardino e Ciabatta volante**. I bersagli per intero dispositivo Sonoff sono stati eliminati da questi tre comandi: prima includevano anche LED di rete e abilitazione dello spegnimento automatico hardware (inching).

## Cosa è conservato

Stessi due sistemi di allarme come trigger, condizione notturna, modalità single, tre accensioni, pause di due secondi, spegnimenti, permanenza finale di quindici minuti e notifiche ai destinatari originali. Torre ingresso non viene aggiunta perché non era fra le cinque uscite precedenti. Nessuna automazione viene eliminata. Spegni esterno all’alba resta invariata, come richiesto in precedenza. Le quattro fotocellule continuano a cedere il controllo durante l’allarme.

## File e verifiche

- `allarme-PRIMA.yaml`: versione precedente.
- `allarme-DOPO.yaml`: versione installata; sostituire per ID `1790034489277`, non aggiungere una seconda automazione.
- `TEST.json`: confronto di ogni azione e dei bersagli espansi dal registro reale HA.

Verificati i 13 bersagli precedenti e le cinque uscite finali: esclusi otto parametri hardware. Tutte le altre automazioni del file sono semanticamente identiche. Configurazione verificata da HA e automazione ricaricata, abilitata e non in esecuzione. **Non è stato attivato l’allarme, non sono stati fatti lampeggiare i fari e non sono state inviate notifiche durante il test.** Il confronto della sequenza non sostituisce un collaudo reale dell’allarme.

Questa è una nuova cartella versionata. Tutti i file e commit precedenti rimangono conservati.
