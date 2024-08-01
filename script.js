const quizData = [
  {
    question: "Which number is odd ?",
    a: "6",
    b: "34",
    c: "25",
    d: "0",
    answer: "c",
  },
  {
    question: "second",
    a: "a",
    b: "b",
    c: "c",
    d: "d",
    answer: "a",
  },
  {
    question: "third",
    a: "a",
    b: "b",
    c: "c",
    d: "d",
    answer: "a",
  },
  {
    question: "fourth",
    a: "a",
    b: "b",
    c: "c",
    d: "d",
    answer: "a",
  },
  {
    question: "fifth",
    a: "a",
    b: "b",
    c: "c",
    d: "d",
    answer: "a",
  },
  {
    question: "sixth",
    a: "a",
    b: "b",
    c: "c",
    d: "d",
    answer: "a",
  },
  {
    question: "seventh",
    a: "a",
    b: "b",
    c: "c",
    d: "d",
    answer: "a",
  },
];

let currentQuiz = 0;
let score = 0;

const quiz = document.getElementById("quiz");
const question = document.getElementById("question");

const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const subButton = document.getElementById("submit");

const answers = document.querySelectorAll(".answer");

loadQuiz();

function loadQuiz() {
  deselectAnswers();

  const currentQuizData = quizData[currentQuiz];

  question.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
}

function getSelected() {
  //   answers.forEach((el) => {
  //     if (el.checked) {
  //       console.log(el.id);
  //       return el.id;
  //     }
  //   });
  for (const it of answers) {
    if (it.checked) {
      return it.id;
    }
  }
  return undefined;
}

subButton.addEventListener("click", () => {
  const answer = getSelected();
  console.log(quizData[currentQuiz].answer);
  console.log(answer);
  if (answer === quizData[currentQuiz].answer) {
    console.log("well done");
    score++;
  } else console.log("opps");

  currentQuiz++;

  if (currentQuiz < quizData.length) {
    loadQuiz();
  } else {
    // alert("You finished !");
    quiz.innerHTML = `<h2>You finished !</h2>
    <button onclick="location.reload()">Start again</button>`;
  }
});

function deselectAnswers() {
  answers.forEach((el) => (el.checked = false));
}
