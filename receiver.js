// Define the API URL
const apiUrl =
  "https://quizapi.io/api/v1/questions?apiKey=CIv92fxmBRsxmDYVQTrRyb9FXG1zpnaU5N4gIhWm&limit=10";
console.log("hello");

// Make a GET request
fetch(apiUrl)
  .then((response) => {
    console.log(response);
    if (!response.ok) {
      //   throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
    console.log(data[0].question);
    console.log(data[0].id);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
