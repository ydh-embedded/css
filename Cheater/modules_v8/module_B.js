console.log('Modul B wird initialisiert');


import { help }             from ".module_A"
import { help as support }  from ".module_A"
import * as modA  from ".module_A"
import { default as Helper , formatNAME} from ".module_C"
import MyHelperClass from "./module_C"


help()                                          /*      #NOTE Wenn wir den Alias support erstellen müssen wir Ihn auch verwenden und aufrufen */
support()
modA.help()


let helper = new Helper()
helper.formatDate(new Date())

new MyHelperClass()
