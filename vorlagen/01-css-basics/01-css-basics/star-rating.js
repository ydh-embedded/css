class StarRatingController {
  #container
  #stars

  constructor(container) {
    this.#container = container
    this.#stars = Array.from(this.#container.querySelectorAll(".star"))
    for (let i = 0; i < this.#stars.length; ++i) {
      this.#stars[i].addEventListener("click", event => this.#onClick(event, i))
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
    // Schneide Nachkommastellen von value ab, um Anzahl vollständiger Sterne zu erhalten.
    const totalFullStars = Math.trunc(value)
    // Berechne Anteil des letzten Sterns.
    const partialStar = value - totalFullStars
    // Setze alle Sterne auf ihren Ursprungszustand zurück.
    this.#stars.forEach(aStar => {
      aStar.classList.remove(this.HALF_FILLED, this.FILLED)
    })
    // Setze die Sterne mit Indizes 0, 1, ... value-1 auf highlighted.
    for (let i = 0; i < totalFullStars; i++) {
      this.#stars[i].classList.add(this.FILLED)
    }
    // Wenn es keinen anteiligen Stern gibt, dann verlasse die Methode.
    if (partialStar == 0) return;

    if (partialStar < 0.5) {
      this.#stars[totalFullStars].classList.add(this.HALF_FILLED)
    } else {
      this.#stars[totalFullStars].classList.add(this.FILLED)
    }
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


// Suche alle Elemente mit Klasse star-rating aus dem Dokument heraus.
const starRatings = document.querySelectorAll(".star-rating")
// Für jedes star-rating Element wird ein StarRatingController Objekt erzeugt.
// Das Controller-Objekt kümmert sich um die Verwaltung des Elements, einschließlich
// des Reagierens auf Events.
const controllers = []
starRatings.forEach(rating => {
  controllers.push(new StarRatingController(rating))
})

const resetRatingsButton = document.querySelector(".rating-reset-button")
resetRatingsButton.addEventListener("click", event => {
  controllers.forEach(aController => aController.reset())
})

controllers[0].setRating(2.3)


