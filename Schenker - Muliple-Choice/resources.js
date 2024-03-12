import { BEMBuilder } from "./utils.js"

function bem(block, { element = null, elementModifier = null, elementModifierValue = null, blockModifier = null, blockModifierValue = null }) {
  return new BEMBuilder()
    .block(block)
    .blockModifier(blockModifier)
    .blockModifierValue(blockModifierValue)
    .element(element)
    .elementModifier(elementModifier)
    .elementModifierValue(elementModifierValue)
    .build()
}

const classes = {
  blocks: {
    question: {
      self: bem("question", {}),
      text: bem("question", { element: "text" }),
      number: bem("question", { element: "number" }),
      score: bem("question", { element: "score" }),
      answerList: bem("question", { element: "answer-list" }),
      answer: {
        self: bem("question", { element: "answer" }),
        mods: {
          correctTrue: bem("question", { element: "answer", elementModifier: "correct", elementModifierValue: "true" }),
          correctFalse: bem("question", { element: "answer", elementModifier: "correct", elementModifierValue: "false" }),
        },
      },
      answerText: bem("question", { element: "answer-text" }),
      answerInput: bem("question", { element: "answer-input" }),
      answerSymbol: bem("question", { element: "answer-symbol" }),
      evaluationFeedback: bem("question", { element: "evaluation-feedback" }),
      evaluationResult: bem("question", { element: "evaluation-result" }),
    },
    evaluation: {
      self: bem("evaluation", {}),
      result: bem("evaluation", { element: "result" }),
      resultText: bem("evaluation", { element: "result-text" }),
      execute: bem("evaluation", { element: "execute" }),
    },
    page: {
      self: bem("page", {}),
    }
  },
  utilities: {
    collapsed: ".collapsed",
  }
}

const dataAttributes = {
  questionIndex: "question_index",
  answerIndex: "answer_index",
}

const ids = {
  templates: {
    question: "#question__template",
    questionAnswerMultipleChoice: "#question__answer-multiple-choice-template",
    questionAnswerSingleChoice: "#question__answer-single-choice-template",
  }
}

const strings = {
  scoreSuffix: " Pkt.",
  correctSymbol: "check",
  wrongSymbol: "close",
}

export {
  classes,
  ids,
  strings,
  dataAttributes,
}