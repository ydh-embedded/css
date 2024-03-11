# Aufgabe 01

Erstelle eine modulare JS-Applikation bestehend aus folgenden Modulen:

- `index.js`
- `date-utils.js`
- `string-utils.js`

Die Module `date-utils.js` und `string-utils.js` sollen im Unterverzeichnis `modules` abgelegt werden.

Die Datei `index.js` soll in einem HTML Dokument namens `index.html` geladen werden.

Im Modul `string-utils.js` sollen zwei Funktionen geschrieben werden:

- **capitalize**: Diese Funktion bekommt eine Zeichenkette und wandelt den ersten Buchstaben in einen Großbuchstaben um.
- **repeat**: Diese Funktion bekommt eine Zeichenkette und wiederholt sie `n` mal.

Außerdem soll das Modul string-utils eine String-Konstante namens `VOWELS` definieren, die alle Vokale enthält.

Die Funktionen und Konstanten sollen exportiert werden.

Das Modul `date-utils.js` definiert zwei Funktionen: 

- **addDays**: Fügt `n` Tage zu einem Datum hinzu.
- **diffDays**: Berechnet die Anzahl an vollen Tagen, die zwischen zwei Datumsobjekten `first` und `second` liegen.

Das Modul enthält außerdem eine _interne_ Konstante namens `MILLISECONDS_PER_DAY`.

Die Funktionen `addDays` und `diffDays` sind zu exportieren.

Die `index.js` importiert das Date-Utils Modul unter dem Alias `DateUtils`. Weiterhin importiert sie `capitalize` aus Modul `string-utils.js` direkt. Die Funktion `repeat` hingegen, soll mit dem Alias `repeatString` importiert werden. Zusätzlich ist `VOWELS` direkt zu importieren.

Teste sämtliche importierte Features, indem du sie probeweise mit selbst gewählten Daten aufrufst.