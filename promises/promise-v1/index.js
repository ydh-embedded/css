const fullfillBtn = document.querySelector('#fullfill')
const rejectBtn   = document.querySelector('#reject')
const resultInput = document.querySelector('#resultInput')
const { promise , resolve , reject } = Promise.withResolvers()

function wait(milliseconds) {
    const {fullfillBtn , rejectBtn , resultInput} = Promise.withResolvers()
    window.setTimeout(resolve, milliseconds)
    return promise
}

console.log(fullfillBtn , rejectBtn , resultInput);
console.log( promise , resolve , reject )

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