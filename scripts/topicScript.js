const topicButtons = document.getElementsByClassName("category");
const tagButton = topicButtons[0];
let tagData = null;

const limitNum = document.getElementsByName('quizNum');
const levels = document.getElementsByName('level');

for (const el of topicButtons) {
  el.addEventListener("click", () => {
    transfer(el.id);
  });
}

function transfer(value) {
  localStorage.setItem('limit', questionNum());
  localStorage.setItem('level', questionLevel());
  localStorage.setItem("category", value);
  location.href = "examPage.html";
}

function questionNum() {
  for (const el of limitNum) {
    if(el.checked)
      return el.getAttribute('value');
  }
}

function questionLevel() {
  for (const el of levels) {
    if(el.checked)
      return el.id;
  }
}

async function receiveTags() {
  let apiUrl =
    "https://quizapi.io/api/v1/tags?apiKey=CIv92fxmBRsxmDYVQTrRyb9FXG1zpnaU5N4gIhWm";

  let nokay = false;

  await fetch(apiUrl)
    .then((response) => {
      console.log(response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      tagData = data;
    })
    .catch((error) => {
      console.error("Error:", error);
      nokay = true;
      showError();
      console.log('fetch error');
    });

  // if (quizData === null) {
  //   showError();
  //   console.log('quiz data is null');
  //   return false;
  // } else loadQuiz();
}

function insertOptions() {
  let tempDiv = document.createElement("div");
  tempDiv.setAttribute("class", "catHeader");
  tempDiv.insertAdjacentElement("beforeend", makeCheckbox("alaki"));
  tempDiv.insertAdjacentElement("beforeend", makeLabel("tag label", "alaki"));
  console.log(document.querySelector(".catHeader"));
  document.querySelector(".catHeader").insertAdjacentElement("afterend", tempDiv);
}

function makeLabel(text, forWhich) {
  let tempLabel = document.createElement("label");
  tempLabel.innerText = text;
  tempLabel.setAttribute("for", forWhich);
  return tempLabel;
}

function makeCheckbox(id) {
  let tempInput = document.createElement("input");
  tempInput.id = id;
  tempInput.type = "checkbox";
  return tempInput;
}

//insertOptions();
//receiveTags();