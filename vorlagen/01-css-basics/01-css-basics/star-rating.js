class StarRatingController {
  #container
  #stars
  #rating
  #uniqueId

  constructor(container) {
    this.#uniqueId = "id" + crypto.randomUUID()
    this.#container = container
    this.#rating = container.querySelector(".rating")
    const starContainer = Array.from(this.#container.querySelectorAll(".star-container"))
    this.#stars = Array.from(this.#container.querySelectorAll(".star"))
    for (let i = 0; i < starContainer.length; ++i) {
      starContainer[i].addEventListener("click", event => this.#onClick(event, i))
    }
  }

  #onClick(event, index) {
    console.log(event.offsetX, event.offsetY);
    this.setRating(index + 1)
  }
  
  get FILLED() {
    return "filled"
  }

  get HALF_FILLED() {
    return "half-filled"
  }
  
  // Setze das Rating programmatisch
  setRating(value) {
    value = StarRatingController.#clamp(0, 5, value)
    this.#rating.innerHTML = `${value} / 5`
    // Schneide Nachkommastellen von value ab, um Anzahl vollständiger Sterne zu erhalten.
    const totalFullStars = Math.trunc(value)
    // Berechne Anteil des letzten Sterns.
    const partialStar = value - totalFullStars
    // Setze alle Sterne auf ihren Ursprungszustand zurück.
    this.#stars.forEach(aStar => {
      aStar.classList.remove(this.HALF_FILLED, this.FILLED)
      aStar.removeAttribute("fill")
    })
    // Setze die Sterne mit Indizes 0, 1, ... value-1 auf highlighted.
    for (let i = 0; i < totalFullStars; i++) {
      this.#stars[i].classList.add(this.FILLED)
    }
    // Wenn es keinen anteiligen Stern gibt, dann verlasse die Methode.
    if (partialStar == 0) return;

    // Für teilweise gefüllte Sterne wird ein neuer Gradient erzeugt.
    // Falls bereits ein Gradient mit der unique id existiert, wird es vorher entfernt.
    const oldGradient = document.querySelector(`#${this.#uniqueId}`)
    if (oldGradient !== null) oldGradient.remove()
    
    const newGradient = this.#createGradient(partialStar * 100)
    const defsSection = this.#stars[0].parentElement.querySelector("defs")
    defsSection.append(newGradient)
    this.#stars[totalFullStars].setAttribute("fill", `url(#${this.#uniqueId})`)
  }

  #createGradient(percentage) {
    const gradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient")
    gradient.innerHTML = `
        <stop offset="0" stop-color="gold"/>
        <stop offset="${percentage}%" stop-color="gold"/>
        <stop offset="${percentage}%" stop-color="black"/>
        `
    gradient.id = this.#uniqueId

    return gradient
  }

  reset() {
    this.setRating(0)
  }
  
  // Stelle sicher, dass value im Intervall [min, max] liegt.
  static #clamp(min, max, value) {
    if (value < min) return min;
    if (value > max) return max;
    return value;
  }
}

class StarRatingBuilder {
  #defaultRating = 0
  #defaultColor = "gold"
  #backgroundColor = "black"

  constructor() {

  }

  setDefaultRating(rating) {
    // Stelle sicher, dass 0 <= rating <= 5 ist
    this.#defaultRating = Math.min(Math.max(rating, 0), 5)
    return this
  }

  setBackgroundColor(color) {
    this.#backgroundColor = color
    return this
  }

  setDefaultColor(color) {
    this.#defaultColor = color
    return this
  }

  getDefaultRating() {
    return this.#defaultRating
  }

  getDefaultColor() {
    return this.#defaultColor
  }

  getBackgroundColor() {
    return this.#backgroundColor
  }

  build() {
    const container = document.createElement("article")
    container.classList.add("star-rating")
    container.innerHTML = `
    <svg class="star-container" width="50px" viewBox="0 0 200 200">
      <defs>
        <linearGradient id="full-star">
          <stop offset="0" stop-color="${this.#defaultColor}"></stop>
          <stop offset="1" stop-color="${this.#defaultColor}"></stop>
        </linearGradient>
      </defs>
      <polygon points="100,10 40,198 190,78 10,78 160,198" class="star"  fill="${this.#backgroundColor}"/>
    </svg>
    <svg class="star-container" width="50px" viewBox="0 0 200 200">
      <defs></defs>
      <polygon points="100,10 40,198 190,78 10,78 160,198" class="star" fill="${this.#backgroundColor}"/>
    </svg>
    <svg class="star-container" width="50px" viewBox="0 0 200 200">
      <defs></defs>
      <polygon points="100,10 40,198 190,78 10,78 160,198" class="star" fill="${this.#backgroundColor}" />
    </svg>
    <svg class="star-container" width="50px" viewBox="0 0 200 200">
      <defs></defs>
      <polygon points="100,10 40,198 190,78 10,78 160,198" class="star" fill="${this.#backgroundColor}"/>
    </svg>
    <svg class="star-container" width="50px" viewBox="0 0 200 200">
      <defs></defs>
      <polygon points="100,10 40,198 190,78 10,78 160,198" class="star" fill="${this.#backgroundColor}"/>
    </svg>
    <span class="rating">${this.#defaultRating}</span>`

    const controller = new StarRatingController(container)
    controller.setRating(this.#defaultRating)
    return container
  }

}


const builder = new StarRatingBuilder()
builder.setBackgroundColor("gray").setDefaultColor("gold").setDefaultRating(2.8)

const ratings = [builder.build(), builder.build()]

builder.setDefaultRating(4.3)
ratings.push(builder.build())

document.body.append(...ratings)


const resetRatingsButton = document.querySelector(".rating-reset-button")
resetRatingsButton.addEventListener("click", event => {
  controllers.forEach(aController => aController.reset())
})

const ratingInput = document.querySelector(".rating-input")
ratingInput.addEventListener("change", event => {
  controllers[0].setRating(Number(ratingInput.value))
})