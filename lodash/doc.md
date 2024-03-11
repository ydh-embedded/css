## lodash
-   wir beginnen mit erstellen des src Source Ordners
-   erstellen eine index.js Datei

        console.log('Hello World')

-   wenn der nodes.js auf dem Host installiert ist, führen wir den Befehl aus:

        npm init -y

-   dadurch wird eine JSON Datei erstellt

        npm install lodash

-   damit installieren  wir lodash zu den "dependencies" in der **JSON Datei** "Version 4.17.20"

-   wir erzeugen einen **public** Ordner mit einer **index.html**

![index.html](./screens/index.jpg)

-   mit folgendene Befehl weisen wir die Packages zu, dass Sie vom Browser gefunden werden können

        npm install --save-dev webpack webpack-cli web

-   wir fügen in der **package.json** Datei das build hinzu

![index.html](./screens/package.json-build.jpg)

-   webpack will analysed the CODE mit:

        npm run build

-   nachdem es analysiert wurde wird ein **dist** Ordner aktiv

![build](./screens/build.jpg)
-   wir binden den src Code im Header ein :

        <script src ="../dist/main.js>

-   wir erstellen eine **webpack.config.js** Datei & fügen folgende Zeile hinzu

![build](./screens/webpack.jpg)

## Loader
-   wir erstellen eine S-CSS Datei & und importieren diese mit:

        import './style.scss' ;

![build](./screens/scss.jpg)







