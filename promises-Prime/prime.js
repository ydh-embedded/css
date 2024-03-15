// Registriere ein Callback für das message Event.
// Dieses Event wird ausgelöst, wenn ein anderer Thread
// per postMessage eine Nachricht an diesen Worker sendet.
addEventListener("message", event => {
  if (event.data.command === "computePrimes") {
    console.log(event)
    const maxNumber = event.data.max
    let totalPrimes = 0
    for (let n = 0; n <= maxNumber; n++) {
      if (isPrime(n)) totalPrimes++
    }

    // Schicke Ergebnis der Operation an den Main-Thread.
    postMessage({
      command: "computePrimes",
      result: totalPrimes,
    })
  }
})

// Eine Zahl n ist Primzahl, wenn ihre einzigen Teiler 1 und n sind.
// Laut Definition sind 0 und 1 keine Primzahlen, aber 2 schon.
function isPrime(n) {
  if (n < 2) {
    return false
  } else if (n === 2) {
    return true
  }

  for (let divider = 2; divider < n; divider++) {
    // Ist n durch divider teilbar?
    if (n % divider === 0) {
      return false
    }
  }

  return true
}
