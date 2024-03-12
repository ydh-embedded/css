// Hier kannst du weitere Fragen einfügen, um deine App zu testen.
const questions = [
  {
    question: "Wie lautet die Spezifikation für die Sprache JavaScript?",
    answers: [
      "TypeScript",
      "ECMAScript",
      "JScript",
      "Java",
    ],
    correct: [1],
    score: 1,
  },
  {
    question: "Welche Aussagen treffen auf eine OOP-Klasse zu?",
    answers: [
      "Ist ein Bauplan für Objekte",
      "Ist eine Lerngruppe in der Schule",
      "Definiert die Methoden und Felder von Objekten.",
      "Definiert die Klassifikation der Programmiersprache",
    ],
    correct: [0, 2], // Indizes der korrekten Antworten
    score: 1,        // Anzahl der Punkte bei richtiger Antwort
  },
  {
    question: "Welche Aussagen treffen auf eine Variable in JavaScript zu?",
    answers: [
      "Reserviert einen Speicherplatz für einen Wert",
      "Definiert einen Namen für einen Speicherplatz",
      "Kann ihren Wert jederzeit ändern",
      "Hat einen fest definierten Datentyp",
    ],
    correct: [0, 1], // Indizes der korrekten Antworten
    score: 1,        // Anzahl der Punkte bei richtiger Antwort
  },
  {
    question: "Wofür steht das Schlüsselwort <em>this</em> in einer statischen Klassenmethode?",
    answers: [
      "Für die Klasse selbst.",
      "Für die aktuelle Instanz.",
      "Für das Window Objekt.",
    ],
    correct: [0], // Indizes der korrekten Antworten
    score: 1,        // Anzahl der Punkte bei richtiger Antwort
  },
]

export default questions