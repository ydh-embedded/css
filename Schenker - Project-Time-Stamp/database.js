const exampleData = {
  year: 2024,
  week: 10,
  records: [
    {
      topic: "HTML Grundlagen",
      duration: 3,
      recordedAt: "2024-03-04T12:22:42.669Z",
      date: "2024-03-03T23:00:00.000Z"
    },
    {
      topic: "CSS Grundlagen",
      duration: 2,
      recordedAt: "2024-03-05T11:22:42.669Z",
      date: "2024-03-04T23:00:00.000Z"
    },
    {
      topic: "JavaScript Grundlagen",
      duration: 5,
      recordedAt: "2024-03-08T13:22:42.669Z",
      date: "2024-03-06T23:00:00.000Z",
    },
  ],
  presentAt: [1, 2, 5], // Mo, Di, Fr
}

function readData(year, week) {
  const json = localStorage.getItem(keyFor(year, week))
  return json != null ? JSON.parse(json) : null
}

function writeData(data) {
  const json = JSON.stringify(data)
  localStorage.setItem(keyFor(data.year, data.week), json)
}

function keyFor(year, week) {
  return year + "-" + Number(week).toString().padStart(2, "0")
}

export {
  readData,
  writeData,
  exampleData,
}