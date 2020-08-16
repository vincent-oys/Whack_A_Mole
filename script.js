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
let molePosition = null;
let goldMolePosition = null;
let babyMolePosition = null;

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
    let moleHole = randomHole(hole);
    moleHole.classList.remove("mole")
    moleHole.classList.add("mole");

    console.log(time);
    console.log(moleHole);

    setTimeout(() => {
        moleHole.classList.remove("mole");
        if (!timeUp) {
            randomMole();
        }
    }, time);   

    //register mole position to track if player whacked it
    molePosition = moleHole.id;
}

// if the mole is being whacked, score +1
// remove once because player cannot repeatedly click the area
hole.forEach(id => {
    id.addEventListener("mouseup", () => {
        if (id.id === molePosition) {
            id.classList.remove("mole")
            result += 1;
            score.textContent = result;
            molePosition = false;
            return result
        } else if (id.id === goldMolePosition) {
            id.classList.remove("goldenmole")
            result += 5;
            score.textContent = result;
            goldMolePosition = false;
            return result
        } else if (id.id === babyMolePosition) {
            id.classList.remove("babymole")
            result -= 5;
            score.textContent = result;
            babyMolePosition = false;
            return result
        }
        console.log(id.id)
    })
})

// end the game when the timer goes to zero
let endGame = function() {
    currentTime--;
    timer.textContent = currentTime;
    let counterTime = parseInt(currentTime);
    if (currentTime < 1) {
        clearInterval(timeID); 
        clearInterval(moleID);
        timeUp = true;
    } else if (counterTime === firstTime || counterTime === secondTime) {
        console.log("GOLDEN MOLE APPEAR!")
        goldenMole()
    } else if (counterTime === 15) {
        console.log("BABY MOLE APPEAR!")
        babyMole()
    }
}

const firstTime = randomTime(Math.ceil(currentTime/2) + 1, currentTime - 1);
console.log(firstTime)
const secondTime = randomTime(2, Math.ceil(currentTime/2));
console.log(secondTime);

let start = function() {
    randomMole();
    timeID = setInterval(endGame, 1000)
}

let goldenMole = function() {
    let goldMoleHole = randomHole(hole);

    goldMoleHole.classList.remove("mole")
    goldMoleHole.classList.remove("babymole")
    goldMoleHole.classList.add("goldenmole");

    setTimeout(() => {
        goldMoleHole.classList.remove("goldenmole");
    }, 1000); 

    goldMolePosition = goldMoleHole.id;
}

let babyMole = function() {
    let babyMoleHole = randomHole(hole);

    babyMoleHole.classList.remove("mole")
    babyMoleHole.classList.remove("goldenmole")
    babyMoleHole.classList.add("babymole");

    setTimeout(() => {
        babyMoleHole.classList.remove("babymole");
    }, 2000); 

    babyMolePosition = babyMoleHole.id;
}

start()

