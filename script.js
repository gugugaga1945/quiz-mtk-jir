let timeLeft = 0
let timerInterval
let total = 0
let correct = 0
let currentAnswer = 0
let duration = 0

const menu = document.getElementById("menu")
const game = document.getElementById("game")
const result = document.getElementById("result")
const timerEl = document.getElementById("timer")
const countEl = document.getElementById("count")
const questionEl = document.getElementById("question")
const answerInput = document.getElementById("answer")
const statsEl = document.getElementById("stats")
const finalMessageEl = document.getElementById("finalMessage")

function startGame(sec) {
  duration = sec
  timeLeft = sec
  total = 0
  correct = 0

  menu.classList.add("hidden")
  result.classList.add("hidden")
  game.classList.remove("hidden")

  nextQuestion()
  updateUI()

  answerInput.value = ""
  answerInput.focus()

  timerInterval = setInterval(() => {
    timeLeft--
    updateUI()
    if (timeLeft <= 0) endGame()
  }, 1000)
}

function randomQuestion() {
  const a = Math.floor(Math.random() * 10) + 1
  const b = Math.floor(Math.random() * 10) + 1
  const ops = ["+", "-", "×", "÷"]
  const op = ops[Math.floor(Math.random() * ops.length)]

  let q, ans

  if (op === "+") {
    q = `${a} + ${b}`
    ans = a + b
  } else if (op === "-") {
    q = `${a} - ${b}`
    ans = a - b
  } else if (op === "×") {
    q = `${a} × ${b}`
    ans = a * b
  } else {
    q = `${a * b} ÷ ${a}`
    ans = b
  }

  return { q, ans }
}

function nextQuestion() {
  const data = randomQuestion()
  questionEl.textContent = data.q
  currentAnswer = data.ans
}

function updateUI() {
  timerEl.textContent = `${timeLeft}s`
  countEl.textContent = `${total} soal`
}

answerInput.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    const val = Number(answerInput.value)
    total++
    if (val === currentAnswer) correct++
    answerInput.value = ""
    nextQuestion()
    updateUI()
  }
})

function endGame() {
  clearInterval(timerInterval)
  game.classList.add("hidden")
  result.classList.remove("hidden")

  const accuracy = total === 0 ? 0 : correct / total

  let message = ""
  if (accuracy === 1) {
    message = "lumayan pinter lo"
  } else if (accuracy >= 0.5) {
    message = "yah tolol"
  } else {
    message = "jing bego banget"
  }

  finalMessageEl.textContent = message

  const speed = (total / (duration / 60)).toFixed(1)

  statsEl.innerHTML = `
    Soal dijawab: <b>${total}</b><br>
    Benar: <b>${correct}</b><br>
    Akurasi: <b>${Math.round(accuracy * 100)}%</b><br>
    Kecepatan: <b>${speed} soal/menit</b>
  `
}

function restart() {
  startGame(duration)
}

function goHome() {
  clearInterval(timerInterval)
  result.classList.add("hidden")
  game.classList.add("hidden")
  menu.classList.remove("hidden")
}
