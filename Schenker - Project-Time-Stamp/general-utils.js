// Function Aliases
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
HTMLElement.prototype.$ = HTMLElement.prototype.querySelector;
HTMLElement.prototype.$$ = HTMLElement.prototype.querySelectorAll;

// Erzeuge einen Klassennamen nach der BEM Konvention.
function bemFor(block, element = null, modifier = null, modifierValue = null) {
  let name = block
  if (element != null) {
    name += `__${element}`
  }
  if (modifier != null) {
    name += `--${modifier}`
    if (modifierValue != null) {
      name += `_${modifierValue}`
    }
  }
  return "." + name.replaceAll(" ", "-")
}

function dataAttributeSelector(name, value = null, operator = "=") {
  let selector = "data-" + name
  if (value != null) {
    selector += operator + `'${value}'`
  }
  return `[${selector}]`
}

function setClassIf(element, className, condition) {
  className = className.startsWith(".") ? className.slice(1) : className
  element.classList.remove(className)
  if (condition) {
    element.classList.add(className)
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

export {
  $, $$,
  ElementFinder,
  bemFor,
  dataAttributeSelector,
  setClassIf,
}