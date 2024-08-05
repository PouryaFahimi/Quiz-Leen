const topicButtons = document.getElementsByClassName("category");

for (const el of topicButtons) {
  el.addEventListener("click", () => {
    console.log(el.id);
    transfer(el.id);
  });
}

function transfer(value) {
  localStorage.setItem("myKey", value);
  location.href = "examPage.html";
}
