// const fulfillBtn = document.querySelector("#fulfill")
// const rejectBtn = document.querySelector("#reject")
// const resultInput = document.querySelector("#result")

function waitAsync(milliseconds, result) {
  const { promise, resolve, reject } = Promise.withResolvers()
  // Registriere eine Funktion (hier resolve), die frühestens nach
  // einer vorgegebenen Anzahl an Millisekunden auszuführen ist.
  // setTimeout ist eine asynchrone Funktion, da sie sofort zum
  // Aufrufer zurückkehrt und erst später ein Resultat liefert.
  window.setTimeout(() => resolve(result), milliseconds)
  return promise
}

function downloadFileAsync(url) {
  console.log("Download gestartet für URL: " + url)
  // Simuliere Downloadzeit und heruntergeladene Datei
  return waitAsync(5000 * Math.random(), "010001110001") 
}

function computeChecksumAsync(file) {
  console.log("Berechne Prüfsumme...")
  return waitAsync(3000 * Math.random(), { file, checksum: "12345" })
}

function extractArchiveAsync(file) {
  console.log("Extrahiere Archiv...")
  return waitAsync(4000 * Math.random(), "111111010101010010101110001")
}

function transformDataAsync(file) {
  console.log("Transformiere unkomprimierte Daten...")
  return waitAsync(4000 * Math.random(), 42)
}

// Simuliere eine asynchrone Operation, die aus mehreren kleineren
// asynchronen Teilschritten besteht.
// 1. Schritt: downloadFileAsync
// 2. Schritt: computeChecksumAsync
// 3. Schritt: extractArchiveAsync
// 4. Schritt: transformDataAsync

// Signatur von Methode then: promiseObject.then(onFulfilled, onRejected) -> Promise
// Hinweis: then ersetzt fehlende Callbackfunktionen durch Standard-Callbacks wie folgt:
// Ist onFulfilled undefined, dann wird eine Funktion x => x als Callback definiert.
// Ist onRejected undefined, dann wird eine Funktion x => { throw x; } als Callback definiert.
// Mit anderen Worten: then verhält sich so, dass positive und negative Ergebnisse in der
// Promise-Kette (Promise-Chain) weitergereicht werden.
function downloadAndTransformAsync(requestId, url) {
  // Mini-Funktion zum Ausgeben von Logs mit voranstehender RequestId
  const log = (...args) => console.log(requestId, ...args)

  return downloadFileAsync(url)
    .then( file => {
      log("Download beendet.")
      log("Inhalt der heruntergeladenen Datei: " + file)
      return computeChecksumAsync(file)
    })
    .then( result => {
      log("Prüfsumme wurde berechnet. Ergebnis ist: " + result.checksum)
      //throw new Error("Die Prüfsumme entspricht nicht der erwarteten Prüfsumme")
      return extractArchiveAsync(result.file)
    })
    .then( uncompressed => {
      log("Archiv wurde entpackt.")
      log("Ergebnis: " + uncompressed)
      return transformDataAsync(uncompressed)
    }, error => {
      log("Archiv wird nicht entpackt, da Prüfsummencheck negativ war")
      // Wir reichen den Fehler an das nächste Callback weiter, da wir an dieser Stelle
      // den Fehler nicht vollständig beheben können.
      throw error; 
      // Hinweis: Würden wir an dieser Stelle einen normalen Wert zurückgeben oder
      // gar nichts (also undefined), dann würde das folgende Promise fulfilled werden.
      // Mit anderen Worten: Der Fehler gilt als behoben.
    })
    .then( result => {
      log("Transformation abgeschlossen.")
      log("Finales Ergebnis: " + result)
    })
    .catch(error => {
      log("Ein Fehler in der Bearbeitungskette ist aufgetreten.")
      log(error)
      // catch ruft indirekt then(x => x, error => { ... }) auf.
      throw error;
    })
    .finally( () => {
      log("Asynchrone Operation abgeschlossen.")
      // then(() => {...}, () => { ... })
    })
}

async function downloadAndTransform(requestId, url) {
  try {
    const file = await downloadFileAsync(url)
    const checksum = await computeChecksumAsync(file)
    const uncompressed = await extractArchiveAsync(file)
    const finalResult = await transformDataAsync(uncompressed)
  } catch (error) {
    console.log(requestId, "Fehler ist aufgetreten", error)
  } finally {
    console.log("Operation abgeschlossen. Ressourcen freigeben.")
  }
}

downloadAndTransform(100, "test.zip")



// downloadAndTransformAsync(100, "http://example.com/data.zip")
// downloadAndTransformAsync(200, "http://example.com/another.zip")


// const { promise, resolve, reject } = Promise.withResolvers()

// //* Promise befindet sich anfangs im Zustand "pending".
// console.log(promise)

// //* Registriere zwei Event-Handler (Callback-Funktionen).
// //* Das erste Callback schließt das Promise mit einem positiven Ergebnis ab.
// //* und das zweite Callback mit einem negativen Ergebnis.
// fulfillBtn.addEventListener("click", event => {
//   resolve("Positives Ergebnis")
//   console.log(promise) // Promise ist nun im Zustand fulfilled.
// })
// rejectBtn.addEventListener("click", event => {
//   reject("Negatives Ergebnis")
//   console.log(promise) // Promise ist nun im Zustand rejected.
// })

