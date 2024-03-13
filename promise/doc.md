# promise

# In asynchronen Funktionen ist ein Promise ein Objekt, das die eventuelle Vervollständigung oder den Ausfall einer asynchronen Operation und ihren resultierenden Wert darstellt. Ein Promise hat drei Zustände:

## Ausstehend / Pending :
- Anfangszustand, weder erfüllt noch abgelehnt.

## Erfüllt / Fulfilled :
- Das bedeutet, dass der Vorgang erfolgreich abgeschlossen wurde.

## Abgelehnt / Rejected :
- Dies bedeutet, dass die Operation fehlgeschlagen ist.
Ein Versprechen gilt als beglichen, wenn es entweder erfüllt oder abgelehnt wird, aber nicht anhängig ist.

Im Opera-Browser können Sie die verwenden Promise Objekt zur Verarbeitung asynchroner Operationen.

Man kann den Zustand des Promise nur mit dem Aufruf ausgeben


Hier ist ein Beispiel für ein Versprechen in einer asynchronen Funktion:

<script>

    async function fetchData() {
      try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        console.log(data);

      } catch (error) {

        console.error('Error fetching data:', error);
      }
    }
</script>

In diesem Beispiel, ```fetchData``` ist eine asynchrone Funktion, die mithilfe der API Daten von einer Remote-API abruft fetch Funktion. Das fetch Die Funktion gibt ein Versprechen zurück, das in ein Antwortobjekt aufgelöst wird, das dann mit dem in JSON konvertiert wird json Methode. Wenn während des Abrufs oder der JSON-Konvertierung Fehler auftreten, werden diese erfasst und an der Konsole protokolliert.

Das await Das Schlüsselwort wird verwendet, um die Ausführung der asynchronen Funktion anzuhalten, bis das Versprechen festgelegt ist. Wenn das Versprechen erfüllt ist, wird der Wert des Versprechens der Variablen zugewiesen response. Wenn das Versprechen abgelehnt wird, wird die catch Block wird ausgeführt und der Fehler wird an der Konsole protokolliert.

Zusammenfassend sind die Elemente von Promise in asynchronen Funktionen:

Ausstehend: Anfangszustand eines Versprechens.
Erfüllt: Status eines Versprechens, wenn der asynchrone Vorgang erfolgreich abgeschlossen wurde.
Abgelehnt: Status eines Versprechens, wenn die asynchrone Operation fehlschlägt.
awaitSchlüsselwort: Wird verwendet, um die Ausführung der asynchronen Funktion anzuhalten, bis das Versprechen festgelegt ist.
try...catchBlock: Wird verwendet, um Fehler zu verarbeiten, die während des asynchronen Vorgangs auftreten können.