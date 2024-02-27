class SVGArcBuilder {
  #centerX = 0;
  #centerY = 0;
  #radius = 0;
  #startAngle = 0;
  #endAngle = 0;
  #extraAttributes = new Map()

  constructor() {
  }

  static degreesToRadians(degrees) {
    degrees = this.normalizeDegrees(degrees)
    return (degrees / 360) * 2 * Math.PI
  }

  static radiansToDegrees(radians) {
    radians = this.normalizeRadians(radians)
    return (radians / (2 * Math.PI)) * 360
  }

  // Wandle den Gradwinkel so um, dass er im Intervall
  // [0, 360] liegt.
  static normalizeDegrees(degrees) {
    let normalized = degrees % 360;
    return normalized < 0 
      ? normalized + 360 
      : normalized
  }

  // Wandle den Radiantenwinkel so um, dass er im Intervall
  // [0, 2*PI] liegt.
  static normalizeRadians(radians) {
    let normalized = radians % (2 * Math.PI);
    return normalized < 0 
      ? (2 * Math.PI) + normalized 
      : normalized
  }

  setRadius(radius) {
    this.#radius = Math.abs(radius)
    return this
  }

  getRadius() {
    return this.#radius
  }

  setCenterX(centerX) {
    this.#centerX = centerX
    return this
  }

  getCenterX() {
    return this.#centerX
  }

  setCenterY(centerY) {
    this.#centerY = centerY
    return this
  }

  getCenterY() {
    return this.#centerY
  }

  setStartAngle(startAngle) {
    this.#startAngle = startAngle
    return this
  }

  getStartAngle() {
    return this.#startAngle
  }

  setEndAngle(endAngle) {
    this.#endAngle = endAngle
    return this
  }

  getEndAngle() {
    return this.#endAngle
  }

  getExtraAttributes() {
    return new Map(this.#extraAttributes)
  }

  setExtraAttribute(attribute, value) {
    this.#extraAttributes.set(attribute, value)
    return this
  }

  removeExtraAttribute(attribute) {
    this.#extraAttributes.delete(attribute)
  }

  build() {
    const normalizedStartAngle = SVGArcBuilder.normalizeDegrees(this.#startAngle)
    const normalizedEndAngle = SVGArcBuilder.normalizeDegrees(this.#endAngle)
    const angleDiff = normalizedStartAngle > normalizedEndAngle 
      ? normalizedEndAngle - normalizedStartAngle + 360
      : normalizedEndAngle - normalizedStartAngle 
    const isLongArc = angleDiff > 180 ? "1" : "0"

    const startRadians = SVGArcBuilder.degreesToRadians(normalizedStartAngle)
    const endRadians = SVGArcBuilder.degreesToRadians(normalizedEndAngle)
    const startX = this.#centerX + Math.cos(startRadians) * this.#radius
    const startY = this.#centerY + Math.sin(startRadians) * this.#radius
    const endX = this.#centerX + Math.cos(endRadians) * this.#radius
    const endY = this.#centerY + Math.sin(endRadians) * this.#radius

    const pathData = `M ${startX} ${startY} `
      + `A ${this.#radius} ${this.#radius} `
      + `0 ${isLongArc} 1 `
      + ` ${endX} ${endY}`
    
      const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path")
      pathElement.setAttribute("d", pathData)
      for (const [attribute, value] of this.#extraAttributes) {
        pathElement.setAttribute(attribute, value)
      }
      return pathElement
  }
}

// Auskommentieren für Beispielpräsentation
// const svg = document.querySelector("svg")
// console.log(svg);
// let arcBuilder = new SVGArcBuilder()
// arcBuilder.setCenterX(50).setCenterY(50).setRadius(50)
//   .setExtraAttribute("stroke-width", 5).setExtraAttribute("stroke", "red").setExtraAttribute("stroke-linecap", "round")
//   .setExtraAttribute("fill", "transparent")
//   .setStartAngle(-90).setEndAngle(200)

// const path1 = arcBuilder.build()

// arcBuilder.setExtraAttribute("stroke", "blue")
//   .setRadius(20)
//   .setStartAngle(-30).setEndAngle(120)

// const path2 = arcBuilder.build()

// arcBuilder.setCenterX(35).setCenterY(30).setRadius(20)
//   .setExtraAttribute("stroke", "green")

// const path3 = arcBuilder.build()

// svg.append(path1, path2, path3)