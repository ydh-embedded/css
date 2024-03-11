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