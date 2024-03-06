import { bemFor } from "./general-utils.js"

// Diese Konstanten könnte man anhand der styles.css automatisch erzeugen lassen.
const BLOCKS = {
  addHomework: {
    self: bemFor("add-homework"),
  },
  day: {
    self: bemFor("day"),
    mods: {
      monday: bemFor("day", null, "monday"),
      tuesday: bemFor("day", null, "tuesday"),
      wednesday: bemFor("day", null, "wednesday"),
      thursday: bemFor("day", null, "thursday"),
      friday: bemFor("day", null, "friday"),
      presentTrue: bemFor("day", null, "present", "true"),
      presentFalse: bemFor("day", null, "present", "false"),
    },
    header: bemFor("day", "header"),
    name: bemFor("day", "name"),
    date: bemFor("day", "date"),
    presenceLabel: bemFor("day", "presence-label"),
    presenceCheckbox: bemFor("day", "presence-checkbox"),
    footer: bemFor("day", "footer"),
    status: {
      self: bemFor("day", "status"),
      mods: {
        levelWarning: bemFor("day", "status", "level", "warning"),
        levelInfo: bemFor("day", "status", "level", "info"),
      }
    },
    totalDuration: bemFor("day", "total-duration"),
    totalDurationSymbol: bemFor("day", "total-duration-symbol"),
  },
  footer: {
    self: bemFor("footer"),
    mods: {},
    totalDuration: bemFor("footer", "total-duration"),
  },
  header: {
    self: bemFor("header"),
    mods: {},
    title: bemFor("header", "title"),
  },
  navigationMenu: {
    self: bemFor("navigation-menu"),
    previous: bemFor("navigation-menu", "previous"),
    next: bemFor("navigation-menu", "next"),
    form: bemFor("navigation-menu", "form"),
    period: bemFor("navigation-menu", "period"),
    week: bemFor("navigation-menu", "week"),
    year: bemFor("navigation-menu", "year"),
  },
  recordList: {
    self: bemFor("record-list"),
    mods: {
      folded: bemFor("record-list", null, "folded"),
    },
    item: {
      self: bemFor("record-list", "item"),
      mods: {
        selfStudy: bemFor("record-list", "item", "self-study"),
      }
    },
    itemTopic: bemFor("record-list", "item-topic"),
    itemDuration: bemFor("record-list", "item-duration"),
    removeItem: bemFor("record-list", "remove-item"),
    addItem: bemFor("record-list", "add-item"),

  },
}

const IDS = {
  recordListItemTemplate: "#record-list__item-template",
}

const ATTRIBUTES = {
  date: "date",
  day: "day",
  present: "present",
}

const STRINGS = {
  title: "Ausbildungsnachweis",
  presence: "anwesend",
  topicPlaceholder: "Thema",
  durationPlaceholder: "Dauer",
  durationSuffix: "h",
  statusMessages: {
    missingSelfStudy: "Es fehlt Selbststudium",
    missingHours: "Es fehlen %d Stunden",
    ok: "Alle Anforderungen erfüllt",
  },
  selfStudy: "Selbststudium",
}

const NUMBERS = {
  hoursPerDay: 8,
  defaultDuration: 1,
}

export {
  BLOCKS,
  STRINGS,
  ATTRIBUTES,
  IDS,
  NUMBERS,
}