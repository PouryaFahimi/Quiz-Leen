const quizData = [
  {
    question: "Which number is odd ?",
    a: "6",
    b: "34",
    c: "25",
    d: "0",
    correct: "c",
  },
  {
    question: "Which one is the most popular programming language in 2024 ?",
    a: "Python",
    b: "Java",
    c: "JavaScript",
    d: "C++",
    correct: "a",
  },
  {
    question: "What was the JavaScript name in the beginning ?",
    a: "Script language",
    b: "Netscape",
    c: "LiveScript",
    d: "Mocha",
    correct: "d",
  },
  {
    question: "HTML documents are saved in",
    a: "ASCII text",
    b: "Special binary format",
    c: "Machine language codes",
    d: "None of above",
    correct: "a",
  },
  {
    question:
      "When looking for all the processes running on a Linux system, what command should you use?",
    a: "service",
    b: "ps",
    c: "oterm",
    d: "xrun",
    correct: "b",
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
  console.log(quizData[currentQuiz].correct);
  console.log(answer);
  if (answer === quizData[currentQuiz].correct) {
    console.log("well done");
    score++;
  } else console.log("opps");

  currentQuiz++;

  if (currentQuiz < quizData.length) {
    loadQuiz();
  } else {
    // alert("You finished !");
    quiz.innerHTML = `<h2>Finished !</h2><h2>You answered ${score}/5 questions correctly.</h2>
    <button id="submit" onclick="location.reload()">Start again</button>`;
  }
});

function deselectAnswers() {
  answers.forEach((el) => (el.checked = false));
}
