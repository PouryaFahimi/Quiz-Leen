const topicButtons = document.getElementsByClassName("category");
const tagButton = topicButtons[0];
let tagData = null;

const limitNum = document.getElementsByName('quizNum');
const levels = document.getElementsByName('level');

for (let i = 1; i < topicButtons.length; i++) {
  topicButtons[i].addEventListener("click", () => {
    transfer(topicButtons[i].id);
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

tagButton.addEventListener("click", () => {
  document.getElementById("preview").style.display = "flex";
  receiveTags();
});

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
      insertOptions();
    })
    .catch((error) => {
      console.error("Error:", error);
      nokay = true;
      showError();
      console.log('fetch error');
    });
}

function insertOptions() {
  document.getElementById("preview").style.display = "none";
  let tempDiv = document.createElement("div");
  tempDiv.setAttribute("class", "catHeader");
  tempDiv.insertAdjacentElement("beforeend", makeCheckbox("alaki"));
  tempDiv.insertAdjacentElement("beforeend", makeLabel("tag label", "alaki"));
  document.querySelector(".catHeader").insertAdjacentElement("afterend", tempDiv);
}

function makeLabel(text, inputId) {
  let tempLabel = document.createElement("label");
  tempLabel.innerText = text;
  tempLabel.setAttribute("for", inputId);
  return tempLabel;
}

function makeCheckbox(id) {
  let tempInput = document.createElement("input");
  tempInput.id = id;
  tempInput.value = id;
  tempInput.type = "checkbox";
  return tempInput;
}

function showError() {
  document.getElementById("preview").style = "display: none";
  document.getElementById("error").style = "display: flex";
  document.getElementById("reloadButton").style = "display: block";
}

//insertOptions();
//receiveTags();