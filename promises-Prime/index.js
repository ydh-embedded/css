const form = document.querySelector("form")
const maxNumberInput = document.querySelector("#maxNumber")


form.addEventListener("submit", event => {
  event.preventDefault()
  const maxNumber = Number(maxNumberInput.value)
  generatePrimes(maxNumber)
    .then(result => console.log(result))
}) 

function generatePrimes(max) {
  const { promise, resolve, reject } = Promise.withResolvers()
 
  // Erzeuge neuen Worker.
  const primeWorker = new Worker("./prime.js")
  // Registriere Callback für Nachrichten vom Worker.
  primeWorker.addEventListener("message", event => {
    if (event.data.command === "computePrimes") {
      // Das Promise von generatePrimes wird hiermit in einen finalen
      // Zustand gebracht.
      resolve(event.data.result)
      // Worker beenden bzw. freigeben.
      primeWorker.terminate()
    }
  })
  // Schicke Auftrag an Worker.
  primeWorker.postMessage({
    command: "computePrimes",
    max: max,
  })

  return promise
}

// Erzeuge ein Promise, das erst dann abgeschlossen wird,
// wenn alle angegebenen Promises abgeschlossen sind.
// Es werden alle Ergebnisse aller Promises gesammelt.
const results = await Promise.all([
    generatePrimes(300000),
    generatePrimes(200000),
    generatePrimes(500000)
])

console.log(results)
// (results)

form.addEventListener("submit", event => {
  event.preventDefault()
  const maxNumber = Number(maxNumberInput.value)
      generatePrimes(maxNumber)
          .then(result => {
  // Update the content of the "results" element with the results
  const resultsElement = document.querySelector("#results")
  resultsElement.textContent = result.join(", ")
  })
})




