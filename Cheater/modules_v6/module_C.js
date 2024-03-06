export default class Helper {

    constructor(){

    }

    /**
     * 
     * @param {Date} date 
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
}