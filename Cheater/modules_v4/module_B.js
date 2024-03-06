import { getToday } from "./module_A.js"

console.log('Modul B wird initialisiert');

console.log(getToday());                        /*      #NOTE rufe importierte Funktion aus Modul A auf */

import { help }             from ".module_A"
import { help as support }  from ".module_A"


help()                                          /*      #NOTE Wenn wir den Alias support erstellen müssen wir Ihn auch verwenden und aufrufen */
support()

