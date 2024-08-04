let quiz = document.getElementById("quiz");
const options = quiz.getElementsByTagName("input");

for (const el of options) {
  console.log(el.innerHTML);
}
