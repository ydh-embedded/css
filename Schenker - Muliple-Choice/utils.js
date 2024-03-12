class BEMBuilder {
  //#region Private Class Variables
  #block = null
  #element = null
  #blockModifier = null
  #blockModifierValue = null
  #elementModifier = null
  #elementModifierValue = null
  //#endregion

  constructor() {
  }

  block(name) {
    this.#block = name
    return this
  }

  getBlock() {
    return this.#block
  }

  blockModifier(modifier) {
    this.#blockModifier = modifier
    return this
  }

  getblockModifier() {
    return this.#blockModifier
  }

  blockModifierValue(value) {
    this.#blockModifierValue = value
    return this
  }

  getblockModifierValue() {
    return this.#blockModifierValue
  }

  element(element) {
    this.#element = element
    return this
  }

  getElement() {
    return this.#element
  }

  elementModifier(modifier) {
    this.#elementModifier = modifier
    return this
  }

  getElementModifier() {
    return this.#elementModifier
  }

  elementModifierValue(value) {
    this.#elementModifierValue = value
    return this
  }

  getElementModifierValue() {
    return this.#elementModifierValue
  }

  build(withPrefix = true) {
    if (this.#block == null) throw new Error("No block name defined")

    let className = this.#block
    if (this.#blockModifier != null) {
      className += "--" + this.#blockModifier
      if (this.#blockModifierValue != null) {
        className += "_" + this.#blockModifierValue
      }
    }
    if (this.#element != null) {
      className += "__" + this.#element
      if (this.#elementModifier != null) {
        className += "--" + this.#elementModifier
        if (this.#elementModifierValue != null) {
          className += "_" + this.#elementModifierValue
        }
      }
    }

    return withPrefix ? "." + className : className
  }
}

class ElementFinder {
  #rootElement

  constructor(rootElement) {
    if (rootElement == null) throw new Error("Missing root element.")
    this.#rootElement = rootElement
  }

  findFirst(selector) {
    const element = this.#rootElement.querySelector(selector)
    if (element == undefined) {
      throw new Error(`Selector ${selector} returned no element.`)
    }
    return element
  }

  findAll(selector) {
    const nodes = this.#rootElement.querySelectorAll(selector)
    if (nodes == undefined || nodes.length === 0) {
      throw new Error(`Selector ${selector} returned no elements.`)
    }
    return Array.from(nodes)
  }

  findMany(...selectors) {
    return selectors.map(s => this.findFirst(s))
  }

  searchFirst(selector) {
    return this.#rootElement.querySelector(selector)
  }

  searchAll(selector) {
    return Array.from(this.#rootElement.querySelectorAll(selector))
  }

  searchMany(...selectors) {
    return selectors.map(s => this.searchFirst(s))
  }

  static for(rootElement) {
    return new ElementFinder(rootElement)
  }


}

function numericRange(fromInclusive, toExclusive) {
  const numbers = []
  if (fromInclusive <= toExclusive) {
    for (let current = fromInclusive; current < toExclusive; current++) {
      numbers.push(current)
    }
  } else {
    for (let current = fromInclusive; current > toExclusive; current--) {
      numbers.push(current)
    }
  }
  return numbers
}

function randomNumber(fromInclusive, toExclusive) {
  if (fromInclusive === toExclusive) throw new Error("Interval must be non-empty!")
  const diff = toExclusive - fromInclusive
const offset = Math.floor(Math.random() * diff)
return fromInclusive + offset
}

function shuffle(elements) {
  for (let start = 0; start < elements.length; start++) {
    const randomIndex = randomNumber(start, elements.length)
    const copy = elements[randomIndex]
    elements[randomIndex] = elements[start]
    elements[start] = copy
  }
  return elements
}

export {
  BEMBuilder,
  ElementFinder,
  numericRange,
  randomNumber,
  shuffle,
}