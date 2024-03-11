# JavaScript Module

## Modul einbinden

### In HTML einbinden

Verwende das `script` Element und verwende den Wert `module` für das Attribut `type`.

```html
<script type="module" src="./module.js"></script>
```

Das Modul-Skript wird automatisch nach dem Dokumentaufbau ausgeführt, also im `defer` Modus betrieben.

### In JavaScript Modul einbinden

Verwende die `import` Anweisung, um Features aus anderen Modulen zu importieren. Es lassen sich nur Features importieren, die explizit per `export` Anweisung exportiert wurden.

Ausführliche Informationen sind [hier](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) zu finden.

```javascript
// Datei: moduleA.js

function help() {
  console.log("I am a helper function")
}

// Exportiere die Funktion help, damit sie in anderen
// Modulen importiert werden kann.
export {
  help
}
```

```javascript
// Datei moduleB.js
console.log("Modul B wird initialisiert")


// Importiere die Funktion help aus moduleA.js
import { help } from "./moduleA.js"
// Importiere die Funktion help, aber verwende in diesem Modul
// den Alias support für sie.
import { help as support } from "./moduleA.js"
// Gesamtes Modul A einbinden und unter dem Alias modA
// zur Verfügung stellen.
import * as modA from "./moduleA.js"
// Importiere die Funkion formatName
import { default as Helper, formatName } from "./moduleC.js"
import MyHelperClass from "./moduleC.js"

// Rufe die importierte Funktion help auf.
help()
support()
modA.help()

// Da die Methode formatDate in der Klasse Helper als static
// deklariert ist, lässt sie sich ohne ein Objekt (Instanz) aufrufen.
Helper.formatDate(new Date())
MyHelperClass.formatDate(new Date())
// Die Funktion formatName wurde direkt in dieses Modul importiert.
formatName("Max", "Mustermann")
```

Wenn du einen Alias für ein importiertes Feature vergibst, musst du den Alias statt des Originalnamens im Code verwenden.
