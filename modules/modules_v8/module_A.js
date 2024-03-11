console.log('Modlu wird eingelesen nzw initialisiert');


function help() {                               /* #NOTE Wir ermitteln das heutige Datum */
console.log('function help wird aufgerufen');


}

export {                                            /* #NOTE alles was ich exportiere sind Module Features */
    	                                            /* Der browser stellt sicher das es nur einmal geladen wird */
    help,
}
