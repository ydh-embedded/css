# promise

- In diesem Beispiel erstellen wir eine Verbindung zur MySQL-Datenbank und definieren eine queryPromise Funktion, die ein Versprechen zurückgibt, das mit den Ergebnissen einer MySQL-Abfrage aufgelöst wird. Wir definieren dann eine getData Funktion, die verwendet async/await zwei Abfragen auszuführen und etwas mit den Ergebnissen zu tun. Schließlich verwenden wir die finally Block, um die Verbindung zur Datenbank zu schließen.

- Beachten Sie, dass Sie in einer realen Anwendung Fehler genauer behandeln und aussagekräftigere Nachrichten bereitstellen möchten, als nur den Fehler bei der Konsole zu protokollieren.