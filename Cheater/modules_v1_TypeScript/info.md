## TypeScript Module

In dieser TypeScript-Version habe ich die Annotation : Date type zum Rückgabetyp der Funktion getToday() hinzugefügt. Damit wird TypeScript mitgeteilt, dass die Funktion ein Date-Objekt zurückgeben soll.

Außerdem habe ich die Annotation : void type zum Argument der Funktion console.log() hinzugefügt, die in diesem Fall optional ist.

Beachten Sie, dass TypeScript die Variablentypen in vielen Fällen automatisch ableiten kann, aber das Hinzufügen expliziter Typ-Annotationen kann helfen, Fehler frühzeitig zu erkennen und den Code für andere Entwickler lesbarer zu machen.


## export 

Beachten Sie, dass Sie in TypeScript auch die export =-Syntax verwenden können, um ein Modul mit dem CommonJS-Modulformat zu exportieren. Dies ist nützlich, wenn Sie mit Node.js oder anderen CommonJS-basierten Umgebungen arbeiten. 

```
function getToday(): Date {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}

export = { getToday };
```
