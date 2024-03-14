const form = document.querySelector("form")
const maxNumberInput = document.querySelector("#maxNumber")

form.addEventListener("submit", event => {
  event.preventDefault()
  const max = Number(maxNumberInput.value)
  let totalPrimes = 0

  for (let n = 0; n <= max; n++) {
    if (isPrime(n)) {
      totalPrimes++
    }
  }

  console.log(`Das Intervall [0, ${max}] enthält ${totalPrimes} Primzahlen`)
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

// Test für die Funktion isPrime.
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(n => console.log(isPrime(n)))


//* Der Event Loop des Browsers arbeitet Ereignisse in einer Warteschlange ab.
// while (true) {
   // Gibt es Events, die abzuarbeiten sind?
   // Wenn ja, dann nimm das älteste Event, das in der Warteschlange steckt und bearbeite es.
// }