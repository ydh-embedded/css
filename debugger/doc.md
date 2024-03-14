# debugging

- Für ***Firefoxe*** muss eine Extention installiert werden

- dann funktioniert auch folgende JSON Anweisung:
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387


        {
        "version": "0.2.0",
        "configurations": [
            {
                "name":    "Launch Firefox against localhost",
                "type":                             "firefox",
                "request":                           "launch",
                "url":"http://localhost:5500/promises-async/",
                "webRoot":               "${workspaceFolder}",
                "pathMappings": [
                    {
                        "url": "http://localhost:5500",
                        "path": "${workspaceFolder}"
                    }
                ]
            }
         ]
        }


- create an new JSON file 
- diese ist im vscode Ordner im root verzeichniss hinterlegt
- wir starten einen **Live-Server / Five-Server**
- Der PORT 5500 muss in der JSON datei eingetragen werden (vom Live-Server)
- im Browser Firefox DevTool muss noch in den Einstellungen remote debugger aktiviert werden 