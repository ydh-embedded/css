const fullfillBtn = document.querySelector('#fullfill')
const rejectBtn   = document.querySelector('#reject')
const resultInput = document.querySelector('#resultInput')


console.log(fullfillBtn , rejectBtn , resultInput);


const { promise , resolve , reject } = Promise.withResolvers()

console.log( promise , resolve , reject )