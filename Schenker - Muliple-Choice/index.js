import questions from "./questions.js";
import { BEMBuilder, ElementFinder, numericRange, randomNumber, shuffle } from "./utils.js";
import * as R from "./resources.js";

let eventListenerRemovalController = new AbortController()
const $ = new ElementFinder(document)

const staticElements = {
  evaluationContainer: $.findFirst(R.classes.blocks.evaluation.self),
  evaluateButton: $.findFirst(R.classes.blocks.evaluation.execute),
  evaluationResultText: $.findFirst(R.classes.blocks.evaluation.resultText),
  evaluationResultContainer: $.findFirst(R.classes.blocks.evaluation.result),
  questionTemplate: $.findFirst(R.ids.templates.question),
  questionSingleChoiceTemplate: $.findFirst(R.ids.templates.questionAnswerSingleChoice),
  questionMultipleChoiceTemplate: $.findFirst(R.ids.templates.questionAnswerMultipleChoice),
  page: $.findFirst(R.classes.blocks.page.self),
}

function reload({shuffleQuestions = false, shuffleAnswers = false}) {
  // Entferne alle Event Listener
  eventListenerRemovalController?.abort()
  eventListenerRemovalController = new AbortController()

  staticElements.evaluationResultContainer.classList.toggle(R.classes.utilities.collapsed.slice(1))
  $.searchAll(R.classes.blocks.question.self).forEach(e => e.remove())

  const questionIndices = numericRange(0, questions.length)
  if (shuffleQuestions) {
    shuffle(questionIndices)
  }
  questionIndices.forEach((questionIndex, sequenceNo) => renderQuestion(questionIndex, sequenceNo, shuffleAnswers))
  staticElements.evaluateButton.addEventListener("click", evaluate, { signal: eventListenerRemovalController.signal })
}

function renderQuestion(questionIndex, sequenceNo, shuffleAnswers = false) {
  const theQuestion = questions[questionIndex]

  const questionFragment = staticElements.questionTemplate.content.cloneNode(true)
  staticElements.evaluationContainer.before(questionFragment)
  const questionElement = staticElements.evaluationContainer.previousElementSibling

  const $$ = ElementFinder.for(questionElement)
  const dynamicElements = {
    numberElement: $$.findFirst(R.classes.blocks.question.number),
    textElement: $$.findFirst(R.classes.blocks.question.text),
    scoreElement: $$.findFirst(R.classes.blocks.question.score),
    feedbackElement: $$.findFirst(R.classes.blocks.question.evaluationFeedback),
    resultElement: $$.findFirst(R.classes.blocks.question.evaluationResult),
    answerListElement: $$.findFirst(R.classes.blocks.question.answerList),
  }

  questionElement.dataset[R.dataAttributes.questionIndex] = questionIndex
  dynamicElements.numberElement.innerHTML = sequenceNo + 1
  dynamicElements.textElement.innerHTML = theQuestion.question
  dynamicElements.scoreElement.innerHTML = theQuestion.score + R.strings.scoreSuffix
  dynamicElements.feedbackElement.innerHTML = ""
  dynamicElements.resultElement.innerHTML = ""
  dynamicElements.feedbackElement.classList.toggle(R.classes.utilities.collapsed.slice(1))
  dynamicElements.resultElement.classList.toggle(R.classes.utilities.collapsed.slice(1))

  const answerIndices = numericRange(0, theQuestion.answers.length)
  if (shuffleAnswers) {
    shuffle(answerIndices)
  }
  answerIndices.forEach((answerIndex, sequenceNo) => {
    renderAnswer(dynamicElements.answerListElement, questionIndex, answerIndex, sequenceNo)
  })

}

function renderAnswer(container, questionIndex, answerIndex, sequenceNo) {
  const theQuestion = questions[questionIndex]
  const theAnswer = theQuestion.answers[answerIndex]
  const isMultipleChoice = theQuestion.correct.length > 1
  const questionAnswerTemplate = isMultipleChoice
    ? staticElements.questionMultipleChoiceTemplate
    : staticElements.questionSingleChoiceTemplate

  const answerFragment = questionAnswerTemplate.content.cloneNode(true)
  container.append(answerFragment)
  const answerElement = container.lastElementChild

  const $$ = ElementFinder.for(answerElement)
  const dynamicElements = {
    textElement: $$.findFirst(R.classes.blocks.question.answerText),
    inputElement: $$.findFirst(R.classes.blocks.question.answerInput),
    symbolElement: $$.findFirst(R.classes.blocks.question.answerSymbol),
  }

  answerElement.dataset[R.dataAttributes.questionIndex] = questionIndex
  answerElement.dataset[R.dataAttributes.answerIndex] = answerIndex
  dynamicElements.textElement.innerHTML = theAnswer
}


function evaluate() {
  console.debug("evaluate")

  let finalResult = {
    totalScore: 0,
    indicesOfCorrectQuestions: [],
    indicesOfWrongQuestions: [],
  }

  const questionElements = $.searchAll(R.classes.blocks.question.self)
  questionElements.forEach(theQuestionElement => {
    const questionIndex = Number(theQuestionElement.dataset[R.dataAttributes.questionIndex])
    const theQuestion = questions[questionIndex]
    const questionResult = evaluateQuestion(theQuestionElement)
    finalResult.totalScore += questionResult.score
    if (questionResult.indicesOfWrongAnswers.length > 0) {
      finalResult.indicesOfWrongQuestions.push(questionIndex)
    } else {
      finalResult.indicesOfCorrectQuestions.push(questionIndex)
    }
  })

  staticElements.evaluateButton.disabled = true
  staticElements.evaluationResultContainer.classList.toggle(R.classes.utilities.collapsed.slice(1))
  staticElements.evaluationResultText.innerHTML = finalResult.totalScore

  return finalResult
}

function evaluateQuestion(questionElement) {
  // Auswertungsergebnis anlegen.
  const evaluationResult = {
    score: 0,
    indicesOfCorrectAnswers: [],
    indicesOfWrongAnswers: [],
  }

  // Zugehörige Fragen-Objekt ermitteln.
  const questionIndex = questionElement.dataset[R.dataAttributes.questionIndex]
  const theQuestion = questions[questionIndex]
  // Antwortelemente ermitteln.
  const $$ = ElementFinder.for(questionElement)
  const answerElements = $$.findAll(R.classes.blocks.question.answer.self)
  const feedbackElement = $$.findFirst(R.classes.blocks.question.evaluationFeedback)
  const resultElement = $$.findFirst(R.classes.blocks.question.evaluationResult)

  // Prüfe, ob der Nutzer korrekte Antworten angekreuzt hat und mache das Ergebnis
  // visuell ersichtlich.
  answerElements.forEach(theAnswerElement => {
    const answerIndex = Number(theAnswerElement.dataset[R.dataAttributes.answerIndex])
    const isCorrectAnswer = theQuestion.correct.includes(answerIndex)

    const $$ = ElementFinder.for(theAnswerElement)
    const dynamicElements = {
      inputElement: $$.findFirst(R.classes.blocks.question.answerInput),
      symbolElement: $$.findFirst(R.classes.blocks.question.answerSymbol),
    }

    const isChecked = dynamicElements.inputElement.checked
    const userAnsweredCorrectly = isCorrectAnswer === isChecked
    dynamicElements.symbolElement.innerHTML = userAnsweredCorrectly
      ? R.strings.correctSymbol
      : R.strings.wrongSymbol
    theAnswerElement.classList.toggle(isCorrectAnswer
      ? R.classes.blocks.question.answer.mods.correctTrue.slice(1)
      : R.classes.blocks.question.answer.mods.correctFalse.slice(1))

    if (userAnsweredCorrectly) {
      evaluationResult.indicesOfCorrectAnswers.push(answerIndex)
    } else {
      evaluationResult.indicesOfWrongAnswers.push(answerIndex)
    }
  })

  // Feedback präsentieren
  feedbackElement.classList.toggle(R.classes.utilities.collapsed.slice(1))
  if (evaluationResult.indicesOfWrongAnswers.length === 0) {
    feedbackElement.innerHTML = "Korrekt beantwortet."
    evaluationResult.score = theQuestion.score
  } else {
    feedbackElement.innerHTML = "Ganz oder teilweise falsch beantwortet."
    // Bewertung erfolgt nach dem Alles-oder-Nichts-Prinzip.
    evaluationResult.score = 0
  }

  resultElement.classList.toggle(R.classes.utilities.collapsed.slice(1))
  resultElement.innerHTML = `${evaluationResult.score} / ${theQuestion.score} Punkte`

  return evaluationResult
}


reload({
  shuffleQuestions: true,
  shuffleAnswers: true,
})
