<style>

.green-code {
    color:  lightgreen ;
  padding:  1px ;
  
}

.pre-code {
  background-color: dark;
  margin: 3 0 0 3;
  border: 7px ;
}

</style>



<html>
<body>

<header>

# NPX - Der Paketrunner

- Es ist **mit npm gebündelt**
- npm und npx dienen den gleichen Zweck:
    - Mit npx werden **258 packages** gebündelt

    <pre class="pre-code">
     <code class="green-code">
        npx create-react-app beginner-npx-app
     </code>
    </pre>

- Mit dem Befehl erzeugen wir einen **Unter-Ordner >> beginner-npx-app**
    - Darin wird eine REACT-App integriert
</header>

<main>

## Starts the development server.

<pre class="pre-code">
 <code class="green-code">
    cd beginner-npx-app
 </code>
</pre>

<pre class="pre-code">
 <code class="green-code">
     npm start
 </code>
</pre>


## Bundles the app into static files for production.


<pre class="pre-code">
 <code class="green-code">
     npm run build
 </code>
</pre>

## Starts the test runner.

<pre class="pre-code">
 <code class="green-code">
     npm test
 </code>
</pre>


## Removes this tool and copies build dependencies, configuration files and scripts into the app directory. If you do this, you can’t go back! 


<pre class="pre-code">
 <code class="green-code">
     npm run eject
 </code>
</pre>



</main>





</body>
</html>

