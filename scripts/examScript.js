let quizData = [
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

const choices = document.getElementsByTagName("label");

const subButton = document.getElementById("submit");
const feedbackEl = document.getElementById("feedback");

const answers = document.querySelectorAll(".answer");

receiveQuiz();

function loadQuiz() {
  deselectAnswers();
  document.getElementById("preview").style = "display: none";
  quiz.style = "display: block";

  console.log("here");

  console.log(localStorage.getItem("myKey"));

  const currentQuizData = quizData[currentQuiz];

  question.innerText = currentQuizData.question;

  let i = 0;
  for (const key in currentQuizData.answers) {
    if (!currentQuizData.answers[key]) {
      choices[i].parentElement.style = "display: none";
    } else {
      choices[i].innerText = currentQuizData.answers[key];
      choices[i].parentElement.style = "display: list-item";
    }
    i++;
  }
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
  if (!test && !getSelected()) {
    return true;
  }
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
    document.getElementById("quizHeader").setAttribute("class", "hide");
    document.getElementById("questionTag").setAttribute("class", "hide");
    quiz.innerHTML = `<h2>Finished !</h2><h2>You answered ${score}/${quizData.length} questions correctly.</h2>
      <button id="submit" onclick="location.reload()">Start again</button>`;
  }
});

function deselectAnswers() {
  answers.forEach((el) => (el.checked = false));
}

async function receiveQuiz() {
  // Define the API URL
  let apiUrl =
    "https://quizapi.io/api/v1/questions?apiKey=CIv92fxmBRsxmDYVQTrRyb9FXG1zpnaU5N4gIhWm&limit=10";

  const category = localStorage.getItem("myKey");
  if (category !== "Random") {
    apiUrl += "&category=" + category;
  }

  // Make a GET request
  fetch(apiUrl)
    .then((response) => {
      console.log(response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      quizData = data;
    })
    .catch((error) => {
      console.error("Error:", error);
      // here must put a error window
    });

  // const response = await fetch(apiUrl);
  // quizData = await response.json();

  console.log("calling");
  const result = await resolveAfter3Seconds();
  console.log(result);

  loadQuiz();
}

function resolveAfter3Seconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("resolved");
    }, 3000);
  });
}