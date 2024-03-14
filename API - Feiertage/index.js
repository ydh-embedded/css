const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const inputForm         = $("#input-form")
const yearInput         = $("#year")
const countryCodeInput  = $("#country-code")
const holidayTable      = $("#holidays")

// [inputForm , yearInput , countryCodeInput].array.forEach(element => {
//   console.debug(element)
// });

let elements = [inputForm , yearInput , countryCodeInput , holidayTable]

elements.forEach( element => console.log(element))