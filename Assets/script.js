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
let remainingAttempts = 5 // Giving the user 5 failing opportunities prior to 

// Fifth step: getting canvas-related variables ready
const CANVAS = document.getElementById("canvas")
const CONTEXT = CANVAS.getContext("2d")    

// Game on!
document.getElementById("play").addEventListener("click", () => {
    document.getElementById("play").style.visibility = "hidden" // Hiding PLAY button once clicked

    //        ♣♣♣♣♣♣♣♣ Creating the game interface to be displayed ♣♣♣♣♣♣♣
    document.getElementById("game-interface").innerHTML = 
    `<p>${remainingLetters} missing letters || ${remainingAttempts} attempts left</p> 
    <span class="size-and-spacing">${lettersInWord.join(" ")}</span>` // Displaying word to find as underscores

    document.getElementById("canvas").classList.add("canvas-bg") // Adding this class will add a transparent background to the canvas area

    // Creating a function that will display the alphabet as a bar
    alphabetBar = () => {
        bar = `<ul class="d-flex flex-wrap justify-content-center size-and-spacing">` // Said bar will appear in two lines, hence flex and flex-wrap
        for (element in ALPHABET) {
            bar += `<li>${ALPHABET[element]}</li>` // A corresponding list item for each letter; could have used forEach
        }
        bar += `</ul>`
        document.getElementById("alphabet-bar").innerHTML = bar
    }
    alphabetBar() // Unleashing the created function, alphabet bar becomes visible

    // On to the game features(1): interaction with the alphabet bar + success and failure actions through added classes
    for (let i = 0; i < document.getElementsByTagName("li").length; i++) {
        document.getElementsByTagName("li")[i].addEventListener("click", () => {
            if (!document.getElementsByTagName("li")[i].classList.contains("attempted")) {
                document.getElementsByTagName("li")[i].classList.add("attempted")

                if (wordPicker.includes(document.getElementsByTagName("li")[i].innerText)) {
                    document.getElementsByTagName("li")[i].classList.add("text-success")
                    let letterSuccess = document.getElementsByTagName("li")[i].innerText
                    let indices = [] // Creating an array that will contain and help identify redundant letters'indices

                    for (let j = 0; j < wordPicker.length; j++) {
                        if (wordPicker[j] === letterSuccess) indices.push(j)
                    }
                    for (let k = 0; k < indices.length ; k++) {
                        lettersInWord.splice(indices[k], 1, letterSuccess) // Identified indices performing indexOf and lastIndexOf's job
                    }

                    remainingLetters -= indices.length // One step closer to winning, couldn't use remainingLetters-- since some letters appear more than once
                    document.getElementById("game-interface").innerHTML = 
                    `<p>${remainingLetters} missing letters || ${remainingAttempts} attempts left</p> 
                    <span class="size-and-spacing">${lettersInWord.join(" ")}</span>`
                }

                else {
                    document.getElementsByTagName("li")[i].classList.add("text-danger")
                    remainingAttempts-- // One step closer to losing
                    document.getElementById("game-interface").innerHTML = 
                    `<p>${remainingLetters} missing letters || ${remainingAttempts} attempts left</p> 
                    <span class="size-and-spacing">${lettersInWord.join(" ")}</span>`
                    drawGallows(remainingAttempts)
                }
            }
            if (remainingAttempts === 0) {
                document.getElementById("alphabet-bar").style.visibility = "hidden" // Alphabet bar goes in hiding(1)
                document.getElementById("game-interface").innerHTML = `<p class="fs-1">GAME OVER! THE EXPECTED WORD WAS</p>
                <span class="size-and-spacing">${wordPicker}</span>
                <button type="button" class="btn btn-warning btn-lg play-again"><span class="fs-2">PLAY AGAIN</span></button>`
                // Could have gotten the same result with createElement() and appendChild()(2)
                document.querySelector(".play-again").addEventListener("click", () => {
                    location.reload()
                })
            }
            else if (remainingLetters === 0) {
                document.getElementById("alphabet-bar").style.visibility = "hidden" // Ibid(1)
                document.getElementById("game-interface").innerHTML = `<p class ="fs-1">CONGRATS! YOU FOUND THE WORD</p>
                <span class="size-and-spacing">${wordPicker}</span>
                <button type="button" class="btn btn-warning btn-lg play-again"><span class="fs-2">PLAY AGAIN</span></button>`
                // Ibid(2)
                document.querySelector(".play-again").addEventListener("click", () => {
                    location.reload()
                })
            }
        })
    }
})

// Creating a function dedicated to drawing the hanged man
function draw(toX, toY, lineX, lineY, round = false) {
    // Setting line stroke and line width
    CONTEXT.strokestyle = "white"
    CONTEXT.linewidth = 5
    CONTEXT.beginPath()

    if (round) {
        CONTEXT.arc(toX, toY, lineX, lineY, 2 * Math.PI) // To draw the hanged man's head
    }
    else {
        CONTEXT.moveTo(toX, toY)
        CONTEXT.lineTo(lineX, lineY) // Both of those to draw the gallows
    }

    CONTEXT.stroke()
}

// Creating a second function using switch method to draw after each failed attempt
function drawGallows(remainingAttempts) {
    switch(remainingAttempts) {
        case 4:
            draw(40, 145, 40, 5)
            break
        case 3:
            draw(40, 5, 245, 5)
            break
        case 2:
            draw(245, 5, 245, 30)
            break
        case 1:
            draw(220, 30, 270, 30)
            break
        case 0:
            draw(245, 40, 10, 0, true)
            draw(245, 50, 245, 100)
            draw(235, 75, 255, 75)
            draw(245, 100, 235, 115)
            draw(245, 100, 255, 115)
            break
    }
}

// This was key: document.getElementsByTagName("li")[3].classList.add ==> THIS ONE WORKS in console inspector
// This too: wordPicker.indexOf(document.getElementsByTagName("li")[3].innerText) => Thanks to trials and errors in the console

/* [51-64] This one seemed cool but only worked up to two iterations of a letter inside the word to find:
    let index = wordPicker.indexOf(document.getElementsByTagName("li")[i].innerText)
    let letterSuccess = document.getElementsByTagName("li")[i].innerText
    if (index > -1) {
        lettersInWord.splice(index, 1, letterSuccess)
        lettersInWord.splice(wordPicker.lastIndexOf(letterSuccess), 1, letterSuccess)
    }

    In the same way, I liked it when I used .replace("_", "[any letter here]") at first...
    but it wasn't meant to be. Gotta keep all of that in mind.
*/