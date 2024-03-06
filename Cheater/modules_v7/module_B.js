console.log('Modul B wird initialisiert');


import { help as support }  from ".module_A"
import * as modA  from ".module_A"

import MyHelperClass, { formatNAME } from "./module_C"


                                         /*      #NOTE Wenn wir den Alias support erstellen müssen wir Ihn auch verwenden und aufrufen */
support()
modA.help()


new MyHelperClass()
Helper.formatDate(new Date())

formatNAME("Max" , "Mustermann")