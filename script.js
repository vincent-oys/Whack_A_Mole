// outputs for hole & mole are arrays
const hole = document.querySelectorAll(".hole");
const mole = document.querySelectorAll(".mole");
const timer = document.querySelector("#timer");
let score = document.querySelector("#score");

let result = 0;
let currentPosition;
let currentTime = timer.textContent;
let timeUp = false;
let moleID = null;
let timeID = null;
let hitPosition = null;

let randomTime = function(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

let randomHole = function(hole) {
    let index = Math.floor(Math.random() * 9);
    let randomPosition = hole[index];
    // stop appearing at the same spot
    if (randomPosition === currentPosition) {
        console.log("OOPS SAME!")
        return randomHole(hole)
    }
    currentPosition = randomPosition;
    return currentPosition
}

// random hole to output mole and disappear at a random time
let randomMole = function() {
    let time = randomTime(400, 1000);
    let currentHole = randomHole(hole);
    currentHole.classList.add("mole");

    console.log(time);
    console.log(currentHole);

    console.log(currentHole.id);
    
    setTimeout(() => {
        currentHole.classList.remove("mole");
        if (!timeUp) {
            randomMole();
        }
    }, time);   

    //register mole position to track if player whacked it
    hitPosition = currentHole.id;
}

// if the mole is being whacked, score +1
// remove once because player cannot repeatedly click the area
hole.forEach(id => {
    id.addEventListener("mouseup", () => {
        if (id.id === hitPosition) {
            id.classList.remove("mole")
            result += 1;
            score.textContent = result;
        }
        console.log(id.id)
    })
})

// end the game when the timer goes to zero
let endGame = function() {
    currentTime--;
    timer.textContent = currentTime;
    if (currentTime < 1) {
        clearInterval(timeID); 
        clearInterval(moleID);
        timeUp = true;
    }
}

let start = function() {
    randomMole();
    timeID = setInterval(endGame, 1000)
}

// start()
