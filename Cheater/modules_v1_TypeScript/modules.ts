console.log('Module wird eingelesen und initialisiert');

function getToday(): Date {                             // #NOTE Wir ermitteln das heutige Datum
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }
  
export = { getToday };