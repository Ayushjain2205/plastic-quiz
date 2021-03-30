const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - 0.5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach((answer) => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question:
      'True or False: There are many alternatives to single use plastic products.',
    answers: [
      { text: 'True', correct: true },
      { text: 'False', correct: false },
    ],
  },
  {
    question: 'What happens to plastic waste?',
    answers: [
      {
        text: ' It is a biodegradable material so it eventually disintegrates',
        correct: false,
      },
      {
        text: 'It never fully goes away, it just breaks into little pieces',
        correct: true,
      },
      {
        text:
          'There is no such thing as plastic waste, all plastic is recycled',
        correct: false,
      },
      { text: ' It is dumped in the ocean for fish to eat', correct: false },
    ],
  },
  {
    question: 'Why is plastic dangerous for marine life?',
    answers: [
      {
        text: ' They mistake it for food and cannot digest it',
        correct: false,
      },
      {
        text: 'They can get tangled in it which hinders their ability to swim',
        correct: false,
      },
      {
        text: 'Its not dangerous because they use plastic waste for habitats',
        correct: false,
      },
      { text: 'Both a and b', correct: true },
    ],
  },
  {
    question: 'Where does the majority of plastic waste end up?',
    answers: [
      { text: 'Oceans', correct: true },
      { text: 'Burned for energy', correct: false },
      { text: 'Landfills', correct: false },
      { text: 'Recycled', correct: false },
    ],
  },
  {
    question:
      'How many million tons of plastic are dumped in our oceans every year?',
    answers: [
      { text: ' 1 million tons', correct: false },
      { text: ' 8 million tons', correct: true },
      { text: ' 20 million tons', correct: false },
      { text: ' 50 million tons', correct: false },
    ],
  },
]
