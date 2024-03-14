const questions = [
    {
      question: "1. Was ist der Hauptzweck der Verwendung von TypeScript mit React? ",
      answers: [
        "Hinzufügen von statischer Typisierung zu React-Komponenten ",                      /* 0 */
        "Verbessern der Leistung von React-Anwendungen",                                    /* 1 */
        "Vereinfachen des Entwicklungsprozesses",                                           /* 2 */
        "Ermöglichen der gemeinsamen Nutzung von Code zwischen Frontend und Backend",       /* 3 */
      ],
      correct:      [0],                                    // Indizes der korrekten Antworten
      score:         1 ,                                    // Anzahl der Punkte bei richtiger Antwort
    }   
        ,
    {
      question: "2. Welcher der folgenden Punkte ist kein Vorteil der Verwendung von TypeScript mit React?",
      answers: [
        "Verbesserte Codequalität",                       /* 0 */
        "Bessere Entwicklerproduktivität",                /* 1 */
        "Geringere Laufzeitfehler",                       /* 2 */
        "Erhöhte Bundle-Größe",                           /* 3 */
      ],
      correct:    [3],                                    // Indizes der korrekten Antworten
      score:       1 ,                                    // Anzahl der Punkte bei richtiger Antwort
    }
        ,
    {
      question: "3. Welche der folgenden Möglichkeiten ist die richtige, um eine funktionale Komponente mit TypeScript zu definieren?",
      answers: [
        "function MyComponent(): JSX.Element {...}",            /* 0 */
        "const MyComponent = () => JSX.Element;",               /* 1 */
        "const MyComponent: () => JSX.Element = () => {...}",   /* 2 */
        "const MyComponent = (): JSX.Element => {...}",         /* 3 */
      ],
      correct: [3],                                    // Indizes der korrekten Antworten
      score:    1,                                    // Anzahl der Punkte bei richtiger Antwort
    }   
        ,
    {
      question: "4. Welches ist die korrekte Art, einen Proptyp für eine funktionale Komponente mit TypeScript zu definieren?",
      answers: [
        "type MyProps = {...}; function MyComponent(props: MyProps): JSX.Element {...}",           /* 0 */
        "interface MyProps {...}; function MyComponent(props: MyProps): JSX.Element {...}",        /* 1 */
        "const MyProps: {...} = {...}; function MyComponent(props: MyProps): JSX.Element {...}",   /* 2 */
        "const MyProps = {...}; function MyComponent(props: MyProps): JSX.Element {...}",          /* 3 */
      ],
      correct: [1],                                    // Indizes der korrekten Antworten
      score:    1,                                    // Anzahl der Punkte bei richtiger Antwort
    }   
        ,
    {
      question: "5. Was ist der Zweck des React.FC Typs in TypeScript?",
      answers: [
        "Um eine funktionale Komponente mit TypeScript zu definieren",                      /* 0 */
        "Um eine Klassenkomponente mit TypeScript zu definieren",                           /* 1 */
        "Um einen Proptyp für eine funktionale Komponente mit TypeScript zu definieren",    /* 2 */
        "Um einen Stattyp für eine Klassenkomponente mit TypeScript zu definieren",         /* 3 */
      ],
      correct: [0],                                    // Indizes der korrekten Antworten
      score:    1,                                    // Anzahl der Punkte bei richtiger Antwort
    }   
        ,
    {
      question: "6. Welches ist die korrekte Art, einen Staattyp für eine Klassenkomponente mit TypeScript zu definieren?",
      answers: [
        "interface MyState {...}; class MyComponent extends React.Component<any, MyState> {...}",         /* 0 */
        "type MyState = {...}; class MyComponent extends React.Component<any, MyState> {...}",            /* 1 */
        "const MyState: {...} = {...}; class MyComponent extends React.Component<any, MyState> {...}",    /* 2 */
        "let MyState: {...} = {...}; class MyComponent extends React.Component<any, MyState> {...}",      /* 3 */
      ],
      correct: [0],                                    // Indizes der korrekten Antworten
      score:    1,                                    // Anzahl der Punkte bei richtiger Antwort
    }   
        ,
    {
      question: "7. Was ist der Zweck des useState<T>() Hooks in TypeScript?",
      answers: [
        "Um einen Zustand mit einem bestimmten Typ T zu initialisieren und zu aktualisieren",     /* 0 */
        "Um einen Zustand mit einem Standardwert zu initialisieren",                              /* 1 */
        "Um einen Zustand mit einem zufälligen Wert zu initialisieren",                           /* 2 */
        "Um einen Zustand mit einem dynamischen Wert zu initialisieren",                          /* 3 */
      ],
      correct: [0],                                    // Indizes der korrekten Antworten
      score:    1,                                    // Anzahl der Punkte bei richtiger Antwort
    }   
]
  
export default questions