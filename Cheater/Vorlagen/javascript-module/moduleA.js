// Datei: moduleA.js
console.log("Modul A wird initialisiert")

function help() {
  console.log("I am a helper function")
}

// Exportiere die Funktion help, damit sie in anderen
// Modulen importiert werden kann.
export {
  help
}