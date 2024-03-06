console.log('Modlu wird eingelesen nzw initialisiert');


function getToday() {                               /* #NOTE Wir ermitteln das heutige Datum */

    const date = new Date()
    date.setHours( 0,0,0,0 )
    return date
}

export {                                            /* #NOTE alles was ich exportiere sind Module Features */
    getToday ,                                      /* Der browser stellt sicher das es nur einmal geladen wird */
    help,
}