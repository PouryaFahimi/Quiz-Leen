const topicButtons = document.getElementsByClassName("category");
const tagButton = topicButtons[0];

const limitNum = document.getElementsByName('quizNum');
const levels = document.getElementsByName('level');

for (const el of topicButtons) {
  el.addEventListener("click", () => {
    console.log(el.id);
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