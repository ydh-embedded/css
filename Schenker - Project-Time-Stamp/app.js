import * as Database from "./database.js";
import * as R from "./resources.js"
import * as Utils from "./general-utils.js";
import * as DateUtils from "./date-utils.js"

//#region Globale Variablen
let model = {
  year: 0,
  week: 0,
  records: [],
  presentAt: []
}

const $ = new Utils.ElementFinder(document)
//#endregion

//#region Statische UI Controls
const controls = {
  previousButton: $.findFirst(R.BLOCKS.navigationMenu.previous),
  nextButton: $.findFirst(R.BLOCKS.navigationMenu.next),
  weekInput: $.findFirst(R.BLOCKS.navigationMenu.week),
  yearInput: $.findFirst(R.BLOCKS.navigationMenu.year),
  periodText: $.findFirst(R.BLOCKS.navigationMenu.period),
  totalDurationText: $.findFirst(R.BLOCKS.footer.totalDuration),
  selfStudyButton: $.findFirst(R.BLOCKS.addHomework.self),
  navigationMenuForm: $.findFirst(R.BLOCKS.navigationMenu.form),
  headerTitle: $.findFirst(R.BLOCKS.header.title),
  addNewItemButtons: $.findAll(R.BLOCKS.recordList.addItem),
  presenceCheckboxes: $.findAll(R.BLOCKS.day.presenceCheckbox),
  statusTexts: $.findAll(R.BLOCKS.day.status.self),
  dayBlocks: $.findAll(R.BLOCKS.day.self),
  dayNames: $.findAll(R.BLOCKS.day.name),
  dayDates: $.findAll(R.BLOCKS.day.date),
  recordLists: $.findAll(R.BLOCKS.recordList.self),
  recordListItemTemplate: $.findFirst(R.IDS.recordListItemTemplate),
}
//#endregion

//#region Event Listener

function onPreviousClicked(event) {
  console.debug("onPreviousClicked")
  navigateTo({ ...DateUtils.previousWeek(model.year, model.week), save: true })
}

function onNextClicked(event) {
  console.debug("onNextClicked")
  navigateTo({ ...DateUtils.nextWeek(model.year, model.week), save: true })
}

function onPresenceClicked(event, checkbox) {
  console.debug("onPresenceClicked")

  console.log(checkbox.checked)

  const isPresent = checkbox.checked
  const dayBlock = checkbox.closest(R.BLOCKS.day.self)
  const jsonDate = dayBlock.dataset[R.ATTRIBUTES.date]
  const dayNumber = Number(dayBlock.dataset[R.ATTRIBUTES.day])

  const daysOfPresence = new Set(model.presentAt)
  daysOfPresence.delete(dayNumber)
  if (isPresent) daysOfPresence.add(dayNumber)
  model.presentAt = Array.from(daysOfPresence)

  const $$ = Utils.ElementFinder.for(dayBlock)
  const recordList = $$.findFirst(R.BLOCKS.recordList.self)
  Utils.setClassIf(recordList, R.BLOCKS.recordList.mods.folded, !isPresent)
  Utils.setClassIf(dayBlock, R.BLOCKS.day.mods.presentTrue, isPresent)
  Utils.setClassIf(dayBlock, R.BLOCKS.day.mods.presentFalse, !isPresent)
  dayBlock.dataset[R.ATTRIBUTES.present] = isPresent

  if (!isPresent) {
    const items = $$.searchAll(R.BLOCKS.recordList.item.self)
    items.forEach(i => i.remove())
    const remainingRecords = model.records.filter(r => r.date !== jsonDate)
    model.records = remainingRecords
  }

  update()
}

function onNavigationFormSubmit(event) {
  console.debug("onSubmittingNavigationForm")
  event?.preventDefault()
  const week = Number(controls.weekInput.value)
  const year = Number(controls.yearInput.value)
  if (DateUtils.isValidWeek(year, week)) {
    navigateTo({ year, week, save: true })
  }
}

function onSelfStudyClicked(event) {
  console.debug("onSelfStudyClicked")

  controls.recordLists.forEach(list => {
    const dayBlock = list.closest(R.BLOCKS.day.self)
    const isPresent = dayBlock.dataset[R.ATTRIBUTES.present] === "true"
    const jsonDate = list.dataset[R.ATTRIBUTES.date]

    if (isPresent) {
      const record = newRecord({
        topic: R.STRINGS.selfStudy,
        duration: R.NUMBERS.defaultDuration,
        date: new Date(jsonDate),
      })
      appendNewItem(list, record)
      model.records.push(record)
    }
  })

  update()
}

function onAddNewItemClicked(event, button) {
  console.debug("onAddNewItemClicked")

  const recordList = button.closest(R.BLOCKS.recordList.self)
  const jsonDate = recordList.dataset[R.ATTRIBUTES.date]
  const record = newRecord({ date: new Date(jsonDate) })
  appendNewItem(recordList, record)
  model.records.push(record)

  update()
}

function onRemoveItemClicked(event, item, record) {
  console.debug("onRemoveItemClicked")

  item.remove()
  const index = model.records.indexOf(record)
  if (index >= 0) {
    model.records.splice(index, 1)
  }

  update()
}

function onItemChanged(event, item, record) {
  console.debug("onItemChanged")

  const $$ = new Utils.ElementFinder(item)
  const topicInput = $$.findFirst(R.BLOCKS.recordList.itemTopic)
  const durationInput = $$.findFirst(R.BLOCKS.recordList.itemDuration)

  record.topic = topicInput.value
  record.duration = Number(durationInput.value)
  record.recordedAt = DateUtils.now().toJSON()

  update()
}

//#endregion


function navigateTo({ year, week, save = true }) {
  if (save) Database.writeData(model)
  model = Database.readData(year, week) ?? {
    year,
    week,
    records: [],
    presentAt: [1, 2, 3, 4, 5],
  }

  console.debug("Data loaded:", model)
  reload()
}

// Diese Funktion setzt den Großteil der UI zurück und füllt die Controls mit den
// Daten aus dem Model.
function reload() {
  const weekSpan = DateUtils.weekSpan(model.year, model.week)
  const workDays = DateUtils.range(weekSpan.start, weekSpan.end).slice(0, 5) // Mo-Fr

  controls.weekInput.value = model.week
  controls.yearInput.value = model.year
  controls.periodText.innerHTML = [weekSpan.start, weekSpan.end].map(d => DateUtils.format(d)).join(" - ")

  // Um die Zuordnung zwischen Controls und Daten zu vereinfachen, hängen wir hier
  // Datenattribute an die Elemente an. Außerdem setzen wir hier die Anwesenheits-Checkboxen.
  workDays.forEach((date, index) => {
    const dayBlock = controls.dayBlocks[index]
    dayBlock.dataset[R.ATTRIBUTES.date] = date.toJSON()
    dayBlock.dataset[R.ATTRIBUTES.day] = date.getDay()

    const recordList = controls.recordLists[index]
    recordList.dataset[R.ATTRIBUTES.date] = date.toJSON()
    recordList.dataset[R.ATTRIBUTES.day] = date.getDay()

    const checkbox = controls.presenceCheckboxes[index]
    checkbox.checked = model.presentAt.includes(date.getDay())
    Utils.setClassIf(recordList, R.BLOCKS.recordList.mods.folded, !checkbox.checked)
    dayBlock.dataset[R.ATTRIBUTES.present] = checkbox.checked
    Utils.setClassIf(dayBlock, R.BLOCKS.day.mods.presentTrue, checkbox.checked)
    Utils.setClassIf(dayBlock, R.BLOCKS.day.mods.presentFalse, !checkbox.checked)

    controls.dayNames[index].innerHTML = DateUtils.nameFor(date)
    controls.dayDates[index].innerHTML = DateUtils.format(date)
  })

  // Entferne alle bestehenden Einträge.
  $.searchAll(R.BLOCKS.recordList.item.self).forEach(item => item.remove())
  // Füge die neuen Einträge hinzu.
  model.records.forEach(r => {
    const list = controls.recordLists.find(rl => rl.dataset[R.ATTRIBUTES.date] === r.date)
    if (list != null) appendNewItem(list, r)
  })

  update()
}

// Diese Funktion aktualisiert Statustexte und Stundenzahlen.
// Sie sollte immer dann aufgerufen werden, wenn sich Records im Model verändert haben.
function update() {
  const { weekTotal, totalByDate } = computeDurations()
  controls.totalDurationText.innerHTML = weekTotal + R.STRINGS.durationSuffix
  totalByDate.forEach((total, date) => {
    const dayBlock = controls.dayBlocks.find(b => b.dataset[R.ATTRIBUTES.date] === date)
    if (dayBlock != null) {
      const $$ = Utils.ElementFinder.for(dayBlock)
      const durationText = $$.findFirst(R.BLOCKS.day.totalDuration)

      const statusText = $$.findFirst(R.BLOCKS.day.status.self)
      durationText.innerHTML = total + R.STRINGS.durationSuffix
      if (total < R.NUMBERS.hoursPerDay) {
        const missing = R.NUMBERS.hoursPerDay - total
        statusText.innerHTML = R.STRINGS.statusMessages.missingHours.replace("%d", missing)
      } else {
        statusText.innerHTML = R.STRINGS.statusMessages.ok
      }
      Utils.setClassIf(statusText, R.BLOCKS.day.status.mods.levelWarning, total < R.NUMBERS.hoursPerDay)
      Utils.setClassIf(statusText, R.BLOCKS.day.status.mods.levelInfo, total >= R.NUMBERS.hoursPerDay)
    }
  })
}

function appendNewItem(parent, record) {
  const itemFragment = controls.recordListItemTemplate.content.cloneNode(true)
  parent.append(itemFragment)
  const item = parent.lastElementChild

  const $$ = new Utils.ElementFinder(item)
  const topicInput = $$.findFirst(R.BLOCKS.recordList.itemTopic)
  topicInput.placeholder = R.STRINGS.topicPlaceholder
  topicInput.value = record.topic
  topicInput.addEventListener("change", e => onItemChanged(e, item, record))

  const durationInput = $$.findFirst(R.BLOCKS.recordList.itemDuration)
  durationInput.placeholder = R.STRINGS.durationPlaceholder
  durationInput.value = record.duration
  durationInput.addEventListener("change", e => onItemChanged(e, item, record))

  const removeButton = $$.findFirst(R.BLOCKS.recordList.removeItem)
  removeButton.addEventListener("click", e => onRemoveItemClicked(e, item, record))

  return item
}

function newRecord({ topic = "", duration = 0, date = null, recordedAt = null }) {
  date ??= DateUtils.today()
  recordedAt ??= DateUtils.now()
  const record = {
    topic,
    duration,
    recordedAt: recordedAt.toJSON(),
    date: date.toJSON(),
  }
  return record
}

function computeDurations() {
  const recordsByDate = Map.groupBy(model.records, r => r.date)

  const totalByDate = new Map()
  recordsByDate.forEach((records, date) => {
    const dayTotal = records.reduce((sum, r) => sum + r.duration, 0)
    totalByDate.set(date, dayTotal)
  })

  const weekSpan = DateUtils.weekSpan(model.year, model.week)
  DateUtils.range(weekSpan.start, weekSpan.end).forEach(date => {
    const key = date.toJSON()
    if (!totalByDate.has(key)) {
      totalByDate.set(key, 0)
    }
  })

  const weekTotal = model.records.reduce((sum, r) => sum + r.duration, 0)

  return {
    weekTotal,
    totalByDate,
  }
}

//#region Hauptprogramm

// Diese Funktion wird einmalig zum Applikationsstart ausgeführt.
function init() {
  controls.previousButton.addEventListener("click", e => onPreviousClicked(e))
  controls.nextButton.addEventListener("click", e => onNextClicked(e))
  controls.presenceCheckboxes.forEach(cb => cb.addEventListener("click", e => onPresenceClicked(e, cb)))
  controls.navigationMenuForm.addEventListener("submit", e => onNavigationFormSubmit(e))
  controls.selfStudyButton.addEventListener("click", e => onSelfStudyClicked(e))
  controls.addNewItemButtons.forEach(btn => btn.addEventListener("click", e => onAddNewItemClicked(e, btn)))

  controls.headerTitle.innerHTML = R.STRINGS.title
}

function main() {
  init()
  navigateTo({ ...DateUtils.currentWeek(), save: false })
}

// Database.writeData(Database.exampleData)
main()
//#endregion