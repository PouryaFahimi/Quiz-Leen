const quizData = [
  {
    id: 1,
    question: "How to delete a directory in Linux?",
    description: "delete folder",
    answers: {
      answer_a: "ls",
      answer_b: "delete",
      answer_c: "remove",
      answer_d: "rmdir",
      answer_e: null,
      answer_f: null,
    },
    multiple_correct_answers: "false",
    correct_answers: {
      answer_a_correct: "false",
      answer_b_correct: "false",
      answer_c_correct: "false",
      answer_d_correct: "true",
      answer_e_correct: "false",
      answer_f_correct: "false",
    },
    explanation: "rmdir deletes an empty directory",
    tip: null,
    tags: [],
    category: "linux",
    difficulty: "Easy",
  },
];

let currentQuiz = 0;
let score = 0;
let timer;

const quiz = document.getElementById("quiz");
const question = document.getElementById("question");

const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const subButton = document.getElementById("submit");
const feedbackEl = document.getElementById("feedback");

const answers = document.querySelectorAll(".answer");

loadQuiz();

function loadQuiz() {
  deselectAnswers();

  const currentQuizData = quizData[currentQuiz];

  question.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.answers.answer_a;
  b_text.innerText = currentQuizData.answers.answer_b;
  c_text.innerText = currentQuizData.answers.answer_c;
  d_text.innerText = currentQuizData.answers.answer_d;
}

function getSelected() {
  for (const it of answers) {
    if (it.checked) {
      return "_" + it.id + "_";
    }
  }
  return undefined;
}

function corrector() {
  const options = quizData[currentQuiz].correct_answers;
  let test;
  for (const key in options) {
    if (options[key] === "true") {
      test = key;
      break;
    }
  }
  console.log(test);
  console.log(getSelected());
  console.log(test.includes(getSelected()));
  return test.includes(getSelected());
}

subButton.addEventListener("click", () => {
  let message;
  if (corrector()) {
    message = "well done !";
    feedbackEl.style = "color: green";
    score++;
  } else {
    message = "opps, wrong";
    feedbackEl.style = "color: red";
  }

  feedbackEl.innerText = message;

  clearTimeout(timer);
  timer = setTimeout(() => {
    feedbackEl.innerText = null;
  }, 2000);

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
