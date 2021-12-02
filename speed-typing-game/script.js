// Gonna be using an API to generate random quotes for the user to type in: http://api.quotable.io/random

const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random';
const quoteDisplayElement = document.getElementById('quoteDisplay');
const quoteInputElement = document.getElementById('quoteInput');
const timerElement = document.getElementById('timer');

quoteInputElement.addEventListener('input', characterCheck); //listens for the input (user typing) then executes the function characterCheck() **see below**

function getRandomQuote() {
  //This function basically just returns a random quote from the api
  return fetch(RANDOM_QUOTE_API_URL)
    .then((response) => response.json())
    .then((data) => data.content);
}

//Need to use an asynchronous function because the Api takes a sec to load each new quote
async function renderNewQuote() {
  const quote = await getRandomQuote(); //here we are waiting for the quote to be gotten before we try and display it on the page

  quoteDisplayElement.innerHTML = ''; //Display the quote on the page
  //
  quote.split('').forEach((character) => {
    //the .split('') makes every individual character into an array that we can then loop through
    const characterSpan = document.createElement('span'); //creating a span for each character and assigning it to a variable
    characterSpan.innerText = character; //setting the character into the span
    quoteDisplayElement.appendChild(characterSpan); //adding it into the actual html so it can be displayed
  });
  //
  quoteInputElement.value = null;

  startTimer(); //resets the timer by calling the function all over again and resetting the starting point to 0 (See below)
}

let startTime;
function startTimer() {
  //keeps track of how long it takes to complete each quote
  timerElement.innerText = 0; //Keeps the time on reload at zero
  startTime = new Date();
  setInterval(() => {
    timerElement.innerText = getTimerTime();
  }, 1000);
}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000);
}

renderNewQuote(); //rendering the new quote upon reload

function characterCheck() {
  const arrayQuote = quoteDisplayElement.querySelectorAll('span'); //grabs every span inside the quoteDisplayElement (every single character)
  const arrayValue = quoteInputElement.value.split(''); //Splits every character the user types into a new array
  let completed = true; //keeps track of weather the entire quote has been typed correctly

  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index]; //keeps track of the current input character index

    if (character == null) {
      //(if the character hasn't been attempted yet)
      characterSpan.classList.remove('correct');
      characterSpan.classList.remove('incorrect');
      completed = false; //makes sure the quote doesn't reload if not everything is correct
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add('correct');
      characterSpan.classList.remove('incorrect');
    } else {
      characterSpan.classList.add('incorrect');
      characterSpan.classList.remove('correct');
      completed = false; //also makes sure the quote doesn't reload if there is something incorrect
    }
  });

  if (completed) {
    //if every character has the class of 'correct' then the quote has been successfully typed and a new quote can be rendered
    renderNewQuote(); //calling to the function we made that makes a new quote
  }
}
