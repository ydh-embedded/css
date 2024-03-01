


    let d = new Date()
    console.log(d);
    

    
    Date.now()
    
    d.getTime()
    console.log(d);

    let epoch = new Date()
    console.log(epoch);
    
    let epochPlus1 = new Date ('1970-01-05T00:00:000Z')
    console.log(epochPlus1);

    const milisekundenPerDay = (epochPlus1) - (epoch) ;
    console.log(milisekundenPerDay);

    const milliSecPerDay = 24 * 60 * 60 * 1000 ;
    const milliSecPerWeek = 7 * milliSecPerDay ;
    console.log(milliSecPerWeek);
    

    let startDate = new Date ('1970-01-05T00:00Z')  ;
    let endDate = new Date + (startDate.getTime() + 2 * milliSecPerDay)        ;
    console.log(endDate);

    const fourthJanuary = new Date(2024 , 0 , 4 ) ;                 /* monat ist null basierend  04.Jan-2024*/ 
    console.log("UTC: " , fourthJanuary.toUTCString() , "Lokal: " , fourthJanuary.toLocaleString());
    
    console.log("UTC: " , fourthJanuary.getUTCDate() , "Lokal: " ,  fourthJanuary.getDate()); /*  */
    
    /* Sonntag == 0 , Montag == 1 , ... */
    console.log("UTC: " , fourthJanuary.getUTCDay() , "Lokal: " ,  fourthJanuary.getDay()); /*  */

    


    
    
    