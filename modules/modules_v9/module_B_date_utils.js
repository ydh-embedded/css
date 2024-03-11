console.log('Modul date_utils wird eingelesen bzw. initialisiert');

class Day {

    constructor(){

    }

    /**
     * 
     * @param {Day} date 
     * @returns Das formatierte Datum
     */

    formatDate(date){
        const [ day     ,
                month   ,
                year  ] = [

            date.getDate() ,
            date.getMonth() ,
            date.getFullYear()]

        return"abc"
    }

    /**
     * 
     * @param {string} first Der Vorname 
     * @param {string} last Der Nachname 
     * @returns Vollständigen Namen
     */

    formatNAME(first , last){
        return `${last} , ${first}`
    }
}

export default Helper
export {
    formatNAME ,
    
}

