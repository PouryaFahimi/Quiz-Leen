const topicButtons = document.getElementsByClassName("category");

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