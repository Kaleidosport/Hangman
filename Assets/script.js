// First step: creating an array containing all the words the user will have to find
const WORDS = ["Azeroth", "Orgrimmar", "Darnassus", "Stormwind", "Undercity", "Silvermoon", "Ironforge",
 "Gilneas", "Thunderbluff", "Kezan", "Exodar", "Dalaran", "Shattrath", "Suramar", "Tiragarde", "Zuldazar",
  "Kalimdor", "Northrend", "Zandalar", "Draenor", "Nagrand", "Argus", "Shadowlands", "Oribos"]

// Second step: creating an alphabet-devoted array
const ALPHABET = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", 
"N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

// Third step: picking a word at random
let wordPicker = WORDS[Math.floor(Math.random() * WORDS.length)]
wordPicker = wordPicker.toUpperCase() // Ensuring uppercase is deemed acceptable as well

// Fourth step: setting up an array depending on how many letters picked word contains
let lettersInWord = []
for (let i = 0; i < wordPicker.length; i++) {
    lettersInWord[i] = "_" // Filling in the array with underscores
}

let remainingLetters = wordPicker.length // Monitoring how many letters are yet to be guessed

// Game on!
document.getElementById("play").addEventListener("click", () => {
    document.getElementById("play").style.visibility = "hidden"; // Hiding PLAY button once clicked
    let guessedLetters = []
    guessedLetters = wordPicker.split("").forEach(element => /[a-z]/i.test(element) ? 
    guessedLetters.push("_") : guessedLetters.push(element)) // Filling an array with guessed letters
    //        ♣♣♣♣♣♣♣♣ Creating the game interface to be displayed ♣♣♣♣♣♣♣
    document.getElementById("game-interface").innerHTML = 
    `<p>${remainingLetters} missing letters || ${remainingLetters - 2} attempts left</p> 
    <span class="size-and-spacing">${lettersInWord.join(" ")}</span>` // Displaying word to find as underscores
    // Creating a function that will display the alphabet as a bar
    alphabetBar = () => {
        bar = `<ul class="d-flex flex-wrap justify-content-center size-and-spacing">` // Said bar will appear in two lines, hence flex and flex-wrap
        for (element in ALPHABET) {
            bar += `<li>${ALPHABET[element]}</li>`
        }
        bar += `</ul>`
        document.getElementById("alphabet-bar").innerHTML = bar
    }
    alphabetBar() // Unleashing the created function, alphabet bar becomes visible

    for (let i = 0; i < document.getElementsByTagName("li").length; i++) {
        document.getElementsByTagName("li")[i].addEventListener("click", () => {
            if (!document.getElementsByTagName("li")[i].classList.contains("attempted")) {
                document.getElementsByTagName("li")[i].classList.add("attempted")
                for (j = 0; j < wordPicker.length; j++) {
                    if (wordPicker[j] === document.getElementsByTagName("li")[j].innerText) {
                        remainingLetters--
                        lettersInWord[j].replace("_", wordPicker[j])
                    }
                }
            }
        })
    }
    
    // document.getElementsByTagName("li").addEventListener("click", () => {
    //     if (document.getElementsByTagName("li")[i].classList.contains("attempted")) {
    //         document.getElementsByTagName("li")[i].setAttribute("class", "attempted") // e.target.classList.add("attempted") ?
    //         for (let i = 0; i < wordPicker.length; i++) { // element of/in?
    //             if (wordPicker[i] == document.getElementsByTagName("li")[i].innerText) {
    //                 remainingLetters--
    //                 lettersInWord[i].replace("_", wordPicker[i])
    //             }
    //         }
    //     }
    // })
})

// This was key: document.getElementsByTagName("li")[3].classList.add ==> THIS ONE WORKS in console inspector