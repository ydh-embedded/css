# Definitionen

- Synchron: Direkte Nacheinanderausführung von Instruktionen.
  - Ruft man eine synchrone Funktion auf, muss diese erst vollständig abgearbeitet werden, bis ihr Ergebnis feststeht. Erst nachdem die Funktion fertig ist, kann der Aufrufer mit seinen Instruktionen fortfahren.
- Asynchron: 
  - Instruktionen werden zeitlich verzahnt (interleaved) oder echt parallel (simultaneous) ausgeführt.
  - Eine asynchrone Funktion beginnt bei Aufruf mit ihrer Arbeit, aber sie gibt die Kontrolle sofort wieder zurück an den Aufrufer. Der Aufrufer kann sofort mit seinen Instruktionen fortfahren. Wenn die asynchrone Funktion ein Ergebnis berechnet hat, kann sie den Aufrufer z.B. über ein Callback darüber informieren.
- Thread: Ein Thread ist ein Ausführungsstrang, also eine Sequenz von Instruktionen, die nacheinander abzuarbeiten sind. Ein Prozess hat mindestens einen Thread, kann aber mehrere erzeugen, wodurch parallele Ausführungen von Anweisungen möglich werden.
- Main-Thread: Ein Thread, der die Instruktionen des Hauptprogramms ausführt und für die Abarbeitung von Nutzereingaben wie Maus und Tastatur verantwortlich ist. Wird der Main-Thread durch eine länger andauernde Berechnung blockiert, wird das Programm träge und "friert ein".
- Event Loop: Für jede Seite verwaltet der Browser einen Event-Loop. Diesen kann man sich wie eine Endlosschleife vorstellen, die Events in einer Warteschlange nacheinander abarbeitet. Dadurch bleibt das Skript der Seite permanent "am Leben".

# Asynchrone Operationen implementieren mit Callback-Funktionen

Eine Callback-Funktion ist eine herkömmliche Funktion, die bei Eintreten eines vorher registrierten Events ausgeführt werden soll. Durch die Callback-Funktion kann der Aufrufer über das Ergebnis einer asynchronen Operation informiert werden.

Beispiel: Event-Handler / Event-Listener

```javascript
// Auf ein Event mittels Callback-Funktion reagieren.
button.addEventListener("click", event => {
  // Diese anonyme Funktion wird erst dann aufgerufen,
  // wenn das Click-Event auf dem Button ausgelöst wurde.
})
```

Wenn eine asynchrone Operation aus mehreren asynchronen Teilschritten besteht, ist meist eine Verschachtelung von Callbacks notwendig. Diese Verschachtelung führt zu verminderter Lesbarkeit und Verständlichkeit des Quelltextes. Durch die Verschachtelung entsteht eine Dreiecksform, die man als _Pyramid of Doom_ bezeichnet.

Früher wurden asynchrone Funktionen nur mittels Callbacks implementiert: Die Grundform einer solchen Funktion lautet: `function f(arg1, arg2, (resultOfFunction) => { // do something with result })`.

Beispiel:

```javascript
//! Nur Pseudocode!

// Funktion downloadFile lädt eine Datei herunter und führt
// danach die registrierte Callback-Funktion aus.
downloadFile("http://example.com/data.zip", (file) => {
  // Prüfe, ob file die richtige Größe besitzt.
  // Auch hier verwenden wir eine Callback-Funktion, die aufgerufen
  // wird, nachdem die Prüfsumme berechnet wurde.
  computeChecksum(file, (checksum) => {
    // Wenn Checksumme falsch, führe Fehlerbehandlung durch.
    // Wenn Checksumme korrekt, fahre fort.
    extractArchive(file, (uncompressedData) => {
      // Durchsuche dekomprimierte Daten
      searchData(uncompressedData, searchCriteria, (searchResult) => {
        calculate(searchResult, (calculationResult) => {
          // Hier können noch weitere asynchrone Schritte folgen.
        })
      })
    })
  })
})
```

# Implementierung von asynchronen Funktionen mit Promise-Objekten

Moderne asynchrone Funktionen geben dem Aufrufer ein Promise-Objekt zurück. Dieses Promise-Objekt repräsentiert den Zustand der asynchronen Operation.

Der Zustand der asynchronen Operation (bzw. des Promises) kann drei Werte annehmen:

- `Pending`: Die asynchrone Operation ist noch nicht abgeschlossen, befindet sich also noch in Bearbeitung. Beispiel: Datei wird noch heruntergeladen.
- `Fulfilled`: Die asynchrone Operation ist abgeschlossen. Ihr positives Ergebnis steht fest. Beispiel: Heruntergeladene Datei.
- `Rejected`: Die asynchrone Operation ist abgeschlossen. Das Ergebnis ist negativ, da ein Fehler aufgetreten ist. Beispiel: Download fehlgeschlagen.

Wenn sich ein Promise im Zustand `Fulfilled` oder `Rejected` befindet, sagt man auch, dass das Promise `settled` ist. Das bedeutet: das Ergebnis (egal ob positiv oder negativ) steht fest. Hinweis: `settled` ist kein Zustand, sondern nur eine Begrifflichkeit.

Einem Promise kann man auch die Eigenschaft `resolved` und `unresolved` zuweisen. Beides sind jedoch nur Begrifflichkeiten. `Resolved` bedeutet, dass das Ergebnis des Promise feststeht. Das Ergebnis kann aber auch ein anderes Promise sein! Mit anderen Worten: Wen ein Promise resolved ist, kann es sich trotzdem im Zustand `pending` befinden. In den meisten Fällen wird ein resolved Promise aber im Zustand `fulfilled` oder `rejected` sein.

Ein unresolved Promise hat noch kein Ergebnis. Das heißt, das Promise befindet sich auf jeden Fall im Zustand `pending`.

