# Setting up the development environment

## Install Windows Terminal App (not Preview)

Use the Windows Store to install this app.

## Install Version Control System Git using the command line
   
```powershell
winget install Git.Git
```

## Clone frontend-development repository

If you work on the host use path `T:\schenker\frontend-development.git`.

If you want to work in a virtual machine follow these steps instead:
- create an internal switch in hyper-v manager (this creates a virtual ethernet adapter on the host)
- add a virtual ethernet adapter to your virtual machine and connect it to the internal switch
- set static ip address of virtual ethernet adapter on host: `192.168.0.10`
- in the virtual machine set static ip address of ethernet adapter: `192.168.0.11`
- ensure that remote desktop connections are allowed in the virtual machine
   (in windows settings -> enable remote desktop connections)
- create remote desktop connection from host to virtual machine using ip `192.168.0.11`
- share drive T (Datenaustausch) with virtual machine in the remote desktop connection settings
- Clone the repository using the path \\tsclient\T\schenker\frontend-development.git

Create the file `.gitconfig` in your home directory. Add the following lines to the file:

```
[user]
   name = Your name 
   email = Your email address
```

**IMPORTANT:** Don't work in the cloned repository! It's only used to share data with the students! Create your own directory for work.
          
## Install Visual Studio Code (not Visual Studio!)

Either download it on the web or use `winget install Microsoft.VisualStudioCode`.

Install the `Live Server` Extension for Visual Studio Code.

## When new content is uploaded to the repository, you can download it using the command git pull.

Ensure you are in the `frontend-development` directory when you execute `git pull`.

## Create a Windows Batch file to update the repository (for convenience)

Create a new text file `update.bat` on your desktop with the following content:

```powershell
@echo off
cd .\frontend-development
git pull
pause
```

# Useful reference and documentation

- [DevDocs](https://devdocs.io/)
   - Provides a central place to access information from many reference sources.
   - Note: Enable the additional reference sources for _React_ and _Boostrap_.
- [MDN](https://developer.mozilla.org/)
- [W3Schools](https://www.w3schools.com/)


# Frontend und Backend

![](.\diagramme\frontend-backend-architecture.svg)

Das Frontend bildet die Schnittstelle zum Benutzer. Der Benutzer kann im Frontend Aktionen ausführen, Daten eingeben und sich anzeigen lassen. Die Verarbeitungslogik steckt jedoch im sogenannten Backend.

Das Backend besteht aus einem oder mehreren Servern. In der Regel enthält das Backend einen Webserver und einen Datenbankserver. Weitere Dienste wie Identitätsmanagement und Authorisierung können ebenfalls vom Backend angesprochen werden.

Frontend und Backend kommunizieren über das HTTP-Protokoll. Ein Frontend kommuniziert nicht direkt mit der Datenbank, sondern schickt lediglich eine Anfrage an das Backend. Das Backend wird dann alle notwendigen Maßnahmen treffen, um die Daten aus der Datenbank zu lesen.

Backends können mit zahlreichen Programmiersprachen und Frameworks entwickelt werden. Ein paar Beispiele:

- C# und ASP.NET Framework
- Java mit Java Enterprise Edition (Jakarta)
- JavaScript / TypeScript in Kombination mit Node.js
- PHP mit Laravel

Frontends werden meist mit JavaScript bzw. TypeScript entwickelt. Sofern die WebAssembly Technologie in Zukunft von allen modernen Browsern vollständig unterstützt wird, lassen sich Frontends dann auch in beliebigen Programmiersprachen entwickeln. Ein paar Beispiele für Frontend Frameworks:

- Angular
- Next.js
- React (eher eine UI Library)
- Vue.js

# Client-Side-Rendering und Server-Side-Rendering

Beim Client-Side-Rendering (CSR) wird das HTML Dokument dynamisch "gefüllt". Der Server sendet lediglich ein fast leeres HTML Dokument inklusive der Anwendung als gebündelte JavaScript Datei (`app.js`) an den Client. Der Client holt sich im Anschluss Daten vom Server und generiert daraus neue Elemente im HTML Dokument. In der Regel werden JSON Dokumente zwischen Client und Server ausgetauscht. Beispiel: Die React Library verwendet standardmäßig CSR, kann aber auch im SSR Modus betrieben werden.

Beim Server-Side-Rendering (SSR) schickt der Server i.d.R. ein vollständiges HTML Dokument an den Client. Der Client muss hier lediglich das Dokument anzeigen, aber nicht selbst ergänzen bzw. füllen. Bei Anfragen vom Client werden komplett neue HTML Fragmente vom Server erzeugt und an den Client zurückgeschickt. Beispiel: Eine klassische PHP Anwendung rendert das gesamte Dokument auf der Serverseite und schickt das Ergebnis an den Client zurück.

# Block- und Inline-Elemente

![](.\diagramme\block-inline-direction.svg)

# CSS Box Model

Jedes grafische HTML Element wird vom Browser als rechteckige Box gerendert. Diese Box setzt sich aus mehreren geschachtelten Boxen zusammen:

- Content-Box: Der Inhalt des Elements.
- Padding-Box: Inhalt inklusive Innenabstand zum Rahmen.
- Border-Box: Inhalt, Innenabstand und der Rahmen selbst. 
   - Hintergrundfarbe wird auf diese Box angewendet.
   - Rahmen kann zusätzlich mit anderer Farbe gezeichnet werden.
   - Definiert die gerenderte Größe des dargestellten Elements.
- Margin-Box: Definiert Außenabstand zu anderen Boxen. 
   - Wird immer transparent dargestellt.

![](.\diagramme\css-box-model.svg)

Screenshot der Dev-Tools des Browsers:

![](.\screenshots\box-model-devtools.png)