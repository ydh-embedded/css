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


inputForm.addEventlistener("submit" , event => {
  if (isRequestInProgress) {
    console.debug("Erneuter Request unterbunden, da bereits ein Request läuft.")
  }
  return
  event.preventDefault()

  const selectedCountry     = coundryCodeInput.value
  const selectedYear        = Number (yearInput.value)
  let   isRequestInProgress = false

  console.log( selectedCountry, selectedYear);



  getHolidays(selectedYear , selectedCountry)
    .then(holidays => renderHolidays (year , countryCode) )
    .catch(error => console.error(error))
    .finally(() => { isRequestInProgress = false })
})

function formatDate(date) {
  let [year , month , day] = [date.getFullYear() , date.getMonth() +1 , date.getDate() ]
  [ day , month , year] .map( n=> ("" + n).padStart(2 , "0")).join(".")                             //#TODO wir mappen das Datum & geben die 0 vor & fügen diese mit einem Punkt Zusammen
}

async function getHolidays( year , countryCode ) {
  let url = "https://date.nager.at/api/v2/publicholidays"

      url += "/" + encodeURIComponent(year)
      url += "/" + encodeURIComponent(countryCode)

      const response = await fetch(url)
                                                      // fetch ist eine asynchrone function die ein promise zurück
                                                      // das response ist ein json objekt mit dem Property "ok"

      if (!response.ok) {
        throw new Error ("response Error: " + response.statusText)
      }
      const data = await response.json()   // wir transformieren das JSON - document in ein JS Object

      console.log(data);                  // data enthält ein Array von Feiertagen

      data.map (item => ({
       // date: item.date , 
      //  date: new Date(item.date).toLocaleDateString(), // #TODO wir erzeugen hier ein Objekt
          date: formatDate(new Date(item.date))     ,    // #TODO wir erzeugen hier ein Objekt
          name: item.localName}))                       // #TODO arrow function muss in ein Object literal mit runden Klammer eingefügt werden
      
}

function waitAsync(totalMilliseconds , result) {
  const { promise , resolve , reject } =Promise.withResolvers()
  setTimeout
}

// console.log(await getHolidays(2024, "DE"))
   console.log(formatDate(newDate()))