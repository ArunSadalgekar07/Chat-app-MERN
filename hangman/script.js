document.addEventListener("DOMContentLoaded", () => {
    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
  
    // Variables
    var i, alphabet, newAlphabet, letters, letter, themeId, themeText, theWord;
  
    var space = "_",
      hiddenWord = "",
      count = 0,
      fail = 0,
      alphabetArray = [],
      hiddenWordSplit = [],
      theWordSplit = [];
  
    var themes = document.querySelectorAll(".theme"),
      wordDisplayed = document.getElementById("word_display"),
      keybordDisplay = document.getElementById("keybord"),
      resultDisplay = document.getElementById("result_display"),
      themeButton = document.querySelector(".choose_theme"),
      themeDisplay = document.getElementById("theme_display"),
      newGameButton = document.querySelector(".new_game");
  
    var guessWord = [
      {
        theme: "City",
        word: [
          "Washington",
          "Lisbon",
          "Bangkok",
          "Leipzig",
          "Liverpool",
          "Florence",
        ],
      },
      {
        theme: "Fruit",
        word: [
          "Pineapple",
          "Strawberry",
          "Watermelon",
          "Blackberry",
          "Dragon fruit",
        ],
      },
      {
        theme: "French food",
        word: [
          "Croissant",
          "Fromage",
          "Baguette",
          "Pain au chocolat",
          "Cassoulet",
        ],
      },
    ];
  
    window.onload = function () {
      themes.forEach((theme) => theme.addEventListener("click", startGame));
      newGameButton.style.display = "none";
      keybordDisplay.style.display = "none";
      themeDisplay.style.display = "none";
    };
  
    // Set the theme and choose a random word
    function startGame() {
      newGameButton.style.display = "inline";
      themeDisplay.style.display = "inline";
      themeId = this.getAttribute("value");
      themeText = this.innerHTML;
      themeDisplay.innerHTML += "Theme: " + themeText;
      shuffle(guessWord[themeId].word);
      theWord = guessWord[themeId].word[0].toUpperCase();
      displayWord();
    }
  
    // Display same number of "_" space as the stocked word
    function displayWord() {
      themeButton.style.display = "none";
      keybordDisplay.style.display = "block";
      theWordSplit = theWord.split("");
      for (i = 1; i <= theWord.length; i++) {
        hiddenWord = hiddenWord + space;
      }
      hiddenWordSplit = hiddenWord.split("");
      for (i = 0; i < theWordSplit.length; i++) {
        if (theWordSplit[i] === " ") {
          theWordSplit[i] = "&nbsp;";
          hiddenWordSplit[i] = "&nbsp;";
          count++;
        }
      }
      wordDisplayed.innerHTML = hiddenWordSplit.join(" ");
    }
  
    // Display keyboard
    function keyboard() {
      alphabet = "azertyuiopqsdfghjklmwxcvbn ";
      newAlphabet = alphabet.toUpperCase();
      alphabetArray = newAlphabet.split("");
      for (i = 0; i < alphabetArray.length - 1; i++) {
        if (alphabetArray[i] == " ") {
          alphabetArray[i] = "&nbsp;";
        }
        keybordDisplay.innerHTML +=
          '<button type="button" class="letter">' +
          alphabetArray[i] +
          "</button>";
        if (i == 9 || i == 19) {
          keybordDisplay.innerHTML += "<br>";
        }
      }
      letters = document.querySelectorAll(".letter");
      letters.forEach((letter) => letter.addEventListener("click", pressedKey));
    }
    keyboard();
  
    // Collect user's letter choice
    function pressedKey() {
      letter = this.innerHTML;
      this.setAttribute("disabled", "");
      checkMatch();
    }
  
    // Check the letter
    function checkMatch() {
      if (theWordSplit.indexOf(letter) == -1) {
        fail++;
        drawHangman();
        if (fail == 6) {
          resultDisplay.innerHTML =
            "<span style='color: orange;'>> Game over!</span>";
          endGame();
        }
      }
      for (i = 0; i < theWord.length; i++) {
        if (theWordSplit[i] === letter) {
          count++;
          hiddenWordSplit[i] = letter;
        }
        wordDisplayed.innerHTML = hiddenWordSplit.join(" ");
      }
      if (count === theWord.length) {
        resultDisplay.innerHTML =
          "<span style='color: greenyellow;'>> You win!</span>";
        endGame();
      }
    }
  
    // Draw the hangman if wrong letter
    function drawHangman() {
      switch (fail) {
        case 0:
          document.querySelector(".deadguy.head").style.visibility = "hidden";
          document.querySelector(".deadguy.body").style.visibility = "hidden";
          document.querySelector(".deadguy.right-arm").style.visibility =
            "hidden";
          document.querySelector(".deadguy.left-arm").style.visibility = "hidden";
          document.querySelector(".deadguy.left-leg").style.visibility = "hidden";
          document.querySelector(".deadguy.right-leg").style.visibility =
            "hidden";
          break;
        case 1:
          document.querySelector(".deadguy.head").style.visibility = "visible";
          break;
        case 2:
          document.querySelector(".deadguy.body").style.visibility = "visible";
          break;
        case 3:
          document.querySelector(".deadguy.right-arm").style.visibility =
            "visible";
          break;
        case 4:
          document.querySelector(".deadguy.left-arm").style.visibility =
            "visible";
          break;
        case 5:
          document.querySelector(".deadguy.left-leg").style.visibility =
            "visible";
          break;
        case 6:
          document.querySelector(".deadguy.right-leg").style.visibility =
            "visible";
          break;
        default:
          break;
      }
    }
    drawHangman();
  
    // End the game
    function endGame() {
      newGameButton.style.display = "inline";
      letters.forEach((letter) =>
        letter.removeEventListener("click", pressedKey)
      );
    }
  
    // Start a new game
    newGameButton.addEventListener("click", newGame);
    function newGame() {
      fail = 0;
      count = 0;
      theWordSplit = [];
      hiddenWordSplit = [];
      wordDisplayed.innerHTML = "";
      resultDisplay.innerHTML = "";
      themeDisplay.innerHTML = "";
      space = "_";
      hiddenWord = "";
      themeButton.style.display = "block";
      keybordDisplay.style.display = "none";
      newGameButton.style.display = "none";
      letters.forEach(function (letter) {
        letter.removeAttribute("disabled", "");
      });
      letters.forEach((letter) => letter.addEventListener("click", pressedKey));
      drawHangman();
    }
  });