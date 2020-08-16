// outputs for hole & mole are arrays
const holes = document.querySelectorAll(".hole");
const mole = document.querySelectorAll(".mole");
const timer = document.querySelector("#timer");
let score = document.querySelector("#score");

let result = 0;
let currentPosition;
let currentTime = timer.textContent;
let timeUp = false;
let moleID = null;
let timeID = null;

// random hole to output mole
let randomMole = function() {
    
    // clear off the current mole before the next mole appear
    holes.forEach(holeClass => {
        holeClass.classList.remove("mole")
    })
    let index = Math.floor(Math.random() * 9);
    let randomPosition = holes[index];
    randomPosition.classList.add("mole")
    // stop appearing at the same spot
    if (randomPosition === currentPosition) {
        console.log("OOPS SAME!")
        return randomMole()
    }
    currentPosition = randomPosition;
     
    console.log(randomPosition)
    //register mole position to track if player whacked it
    hitPosition = currentPosition.id
}

// if the mole is being whacked, score +1
// option for addEventListener (once) make sure the listener only invoke once.
holes.forEach(id => {
    id.addEventListener("mouseup", () => {
        if (id.id === hitPosition) {
            result += 1;
            score.textContent = result;
        }
        console.log(id.id)
    }, {once: true})
})

// the mole moves at certain time interval

let moveMole = function() {
    // let time = randomTime(400, 1000)
    moleID = setInterval(randomMole, 1000);
    // console.log(time)
}

// end the game when the timer goes to zero
let endGame = function() {
    currentTime--;
    timer.textContent = currentTime;
    if (currentTime === 0) {
        clearInterval(timeID); 
        clearInterval(moleID);
    }
}

// moveMole()
console.log(moleID)

// let timeID = setInterval(endGame, 1000) 

console.log(timeID)

let start = function() {
    moveMole()
    timeID = setInterval(endGame, 1000)
}

let randomTime = function(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

start()
