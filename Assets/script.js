// First step: creating an array containing all the words the user will have to find
const WORDS = ["Azeroth", "Orgrimmar", "Darnassus", "Stormwind", "Undercity", "Silvermoon", "Ironforge",
 "Gilneas", "Thunderbluff", "Kezan", "Exodar", "Dalaran", "Shattrath", "Suramar", "Tiragarde", "Zuldazar",
  "Kalimdor", "Northrend", "Zandalar", "Draenor", "Nagrand", "Argus", "Shadowlands", "Oribos"]

// Second step: picking a word at random
let wordPicker = WORDS[Math.floor(Math.random() * WORDS.length)]
wordPicker = wordPicker.toUpperCase() // Ensuring uppercase is deemed acceptable as well

// Third step: setting up an array depending on how many letters picked word contains
let lettersInWord = []
for (let i = 0; i < wordPicker.length; i++) {
    lettersInWord[i] = "_" // Filling in the array with underscores
}

let remainingLetters = wordPicker.length // Monitoring how many letters are yet to be guessed

// Game on!
document.getElementById("play").addEventListener("click", () => {
    document.getElementById("play").style.visibility = "hidden";
})