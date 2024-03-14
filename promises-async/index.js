/**
 * Warte eine vorgegebene Zeit
 * @param {number} milliseconds Anzahl der millisekunden
 * @param {any} result ein Objekt ,dass bei Ablauf der Millisekunden an das Promise übergeben werden soll
 * @returns  Ein Promise, dass die asynchrone Operantion repräsentiert
 */


function waitAsync(milliseconds, result) {

    console.debug("waitAsync gestartet..."); // debug informationen sind für den Entwickler

    const { promise, resolve, reject } = Promise.withResolvers()
    // Registriere eine Funktion (hier resolve), die frühestens nach
    // einer vorgegebenen Anzahl an Millisekunden auszuführen ist.
    // setTimeout ist eine asynchrone Funktion, da sie sofort zum
    // Aufrufer zurückkehrt und erst später ein Resultat liefert.
    window.setTimeout(() => resolve(result), milliseconds)
    return promise
  }


async function doSomethingWithoutAsync(){
  console.debug("doSomethingWithoutAsync gestartet...")
  const promise = waitAsync(3000,{}).then(result => {
    console.debug("doSomethingWithoutAsync gibt Kontrolle an Aufrufer zurück.")
    return promise
    
  })
  
  console.debug("Script gestartet.")
  doSomethingAsync()
  console.debug("Script beendet.")




}

async function doSomethingAsync(){
  console.debug("doSomethingAsync gestartet...")
  const promise = waitAsync(3000,{}).then(result => {
    console.debug("doSomethingAsync gibt Kontrolle an Aufrufer zurück.")
    return promise

  })
}