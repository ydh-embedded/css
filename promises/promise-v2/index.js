

function wait(milliseconds , result ) {
    const {fullfillBtn , rejectBtn , resultInput} = Promise.withResolvers()
    window.setTimeout(() => resolve(result), milliseconds)
    return promise
}

function downloadAsync(url) {
    console.log("Download gestartet");
    return waitAsync( 5000 , "010000101010")
}

const downloadPromise = downloadFileAsync(http://excample)


fullfillBtn.addEventListener("click" , event => {
    resolve("Positives Ergebnis");
    console.log(promise);
})

rejectBtn.addEventListener("click" , event => {
    reject("Negatives Ergebnis");
    console.log(promise);
})



const  waitPromise = wait(5000);
waitPromise.then( () => {
    console.log("Wartezeit vorbei");
    console.log(waitPromise);
})
console.log(waitPromise);