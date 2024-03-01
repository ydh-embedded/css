
//#region day test

    // let d = new Date()
    // console.log(d);
    // 
    // 
    // 
    // Date.now()
    // 
    // d.getTime()
    // console.log(d);
    // 
    // let epoch = new Date()
    // console.log(epoch);
    // 
    // let epochPlus1 = new Date ('1970-01-05T00:00:000Z')
    // console.log(epochPlus1);
    // 
    // const milisekundenPerDay = (epochPlus1) - (epoch) ;
    // console.log(milisekundenPerDay);
    // 
    const milliSecondsPerDay = 24 * 60 * 60 * 1000 ;
    const milliSecondsPerWeek = 7 * milliSecondsPerDay ;
    console.log(milliSecondsPerWeek);
    // 
    // 
    // let startDate = new Date ('1970-01-05T00:00Z')  ;
    // let endDate = new Date + (startDate.getTime() + 2 * milliSecPerDay)        ;
    // console.log(endDate);
    // 
    // const fourthJanuary = new Date(2024 , 0 , 4 ) ;                 /* monat ist null basierend  04.Jan-2024*/ 
    // console.log("UTC: " , fourthJanuary.toUTCString() , "Lokal: " , fourthJanuary.toLocaleString());
    // 
    // console.log("UTC: " , fourthJanuary.getUTCDate() , "Lokal: " ,  fourthJanuary.getDate()); /*  */
    // 
    // /* Sonntag == 0 , Montag == 1 , ... */
    // console.log("UTC: " , fourthJanuary.getUTCDay() , "Lokal: " ,  fourthJanuary.getDay()); /*  */

//#endregion

 /* #FIXME der 4.Jan ist immer der Beginn der KW01 */



function getStartOffFirstCalendarWeek(year) {

    const fourthJanuary = new Date (year , 0 , 4)
    const weekDay = fourthJanuary.getDate()
    const daysAfterMonday = weekDay - 1

    if (weekDay === 0 ) {               /* 0 = Sonntag */
        daysAfterMonday = 6
    }

    const monday = new Date (fourthJanuary.getTime() - daysAfterMonday * milliSecondsPerDay) ;
    console.log(monday);
    






}

function getTotalCalendarWeeks(year){

    const startOfYear = getStartOffFirstCalendarWeek(year) ;
    const startOfNextYear = getStartOffFirstCalendarWeek(year + 1) ;

    const milliSecondsDiff = startOfNextYear.getTime() - startOfYear.getTime() ;
    const totalWeeks = milliSecondsDiff / milliSecondsPerWeek ;
}
    
function getStartOfCalendarWeek( year , week ){
    const startOfYear = getStartOffFirstCalendarWeek(year) ;
    const startOfWeek = new Date (startOfYear.getTime() + (week - 1 ) * milliSecondsPerWeek) ;

    return startOfWeek ;
}
    
function getEndOfCalendarWeek( year , week ){
    const startOfWeek = getStartOffFirstCalendarWeek(year , week) ;
    const endOfWeek = new Date (startOfWeek.getTime() + 6 * milliSecondsPerDay) ;

    return endOfWeek ;
}

function getStartAndEndOfCalendarWeek( year , week ){
    return {
        start: getStartOfCalendarWeek(year, week),
        end: getEndOfCalendarWeek(year, week)
    }
}
    
export {
            getStartOffFirstCalendarWeek    ,
            getTotalCalendarWeeks           ,
            getStartOfCalendarWeek          ,
            getEndOfCalendarWeek            ,
            getStartAndEndOfCalendarWeek    ,
}