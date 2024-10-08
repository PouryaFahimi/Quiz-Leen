const topicButtons = document.getElementsByClassName("category");
const tagButton = topicButtons[0];
let tagData = null;
const selectedTags = [];

/* sample arrival object
  { 
    id: 1, 
    name: "Linux" 
  }
*/

const limitNum = document.getElementsByName("quizNum");
const levels = document.getElementsByName("level");
const tags = document.getElementsByName("tags");
let tag_is_open = false;

for (let i = 1; i < topicButtons.length; i++) {
  topicButtons[i].addEventListener("click", () => {
    transfer(topicButtons[i].id);
  });
}

function transfer(value) {
  localStorage.clear();

  localStorage.setItem("limit", questionNum());
  localStorage.setItem("level", questionLevel());

  if (value === "Tags") {
    localStorage.setItem("tags", questionTags());
    value = "Random"
  }

  localStorage.setItem("category", value);
  location.href = "examPage.html";
}

function questionNum() {
  for (const el of limitNum) {
    if (el.checked)
      return el.getAttribute("value");
  }
}

function questionLevel() {
  for (const el of levels) {
    if (el.checked)
      return el.id;
  }
}

function questionTags() {
  for (const el of tags) {
    if (el.checked)
      selectedTags.push(el.value);
  }
  return selectedTags.toString();
}

tagButton.addEventListener("click", () => {
  if (!tag_is_open) {
    tag_is_open = true;
    document.getElementById("preview").style.display = "flex";
    tagButton.innerText = "Start with Tags";
    receiveTags();
  } else
    transfer("Tags");
});

async function receiveTags() {
  let apiUrl =
    "https://quizapi.io/api/v1/tags?apiKey=CIv92fxmBRsxmDYVQTrRyb9FXG1zpnaU5N4gIhWm";

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
      showError();
      console.log("fetch error");
    });
}

function insertOptions() {
  document.getElementById("preview").style.display = "none";

  let tempDiv = document.createElement("div");
  tempDiv.setAttribute("class", "catHeader");
  tempDiv.style.flexWrap = "wrap";

  for (const el of tagData) {
    tempDiv.insertAdjacentElement("beforeend", makeCheckbox(el.name));
    tempDiv.insertAdjacentElement("beforeend", makeLabel(el.name, el.name));
  }

  tempDiv.className = "detailBox";
  tempDiv.style.marginLeft = 0;
  document.querySelector(".catHeader").insertAdjacentElement("afterend", tempDiv);
}

function makeLabel(text, inputId) {
  let tempLabel = document.createElement("label");
  tempLabel.innerText = text;
  tempLabel.setAttribute("for", inputId + "-tag");
  tempLabel.className = "details";
  return tempLabel;
}

function makeCheckbox(id) {
  let tempInput = document.createElement("input");
  tempInput.id = id + "-tag";
  tempInput.value = id;
  tempInput.type = "checkbox";
  tempInput.name = "tags";
  tempInput.className = "quizDetails";
  return tempInput;
}

function showError() {
  document.getElementById("preview").style = "display: none";
  document.getElementById("error").style = "display: flex";
  document.getElementById("reloadButton").style = "display: block";
}

//insertOptions();
//receiveTags();