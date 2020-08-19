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
let bombPosition = null;
let endGame = false;

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
    classRemove(moleHole);
    moleHole.classList.add("mole");

    console.log(time);
    console.log(moleHole);

    setTimeout(() => {
        moleHole.classList.remove("mole");
        molePosition = false;
        if (!timeUp) {
            randomMole();
        }
    }, time);   

    //register mole position to track if player whacked it
    molePosition = moleHole.id;
}

let goldenMole = function() {
    let goldMoleHole = randomHole(hole);
    classRemove(goldMoleHole)
    goldMoleHole.classList.add("goldenmole");

    setTimeout(() => {
        goldMoleHole.classList.remove("goldenmole");
        goldMolePosition = false;
    }, 1000); 

    goldMolePosition = goldMoleHole.id;
}

let babyMole = function() {
    let babyMoleHole = randomHole(hole);
    classRemove(babyMoleHole)
    babyMoleHole.classList.add("babymole");

    setTimeout(() => {
        babyMoleHole.classList.remove("babymole");
        babyMolePosition = false;
    }, 2000); 

    babyMolePosition = babyMoleHole.id;
}

let bomb = function() {
    let bombHole = randomHole(hole);
    classRemove(bombHole)
    bombHole.classList.add("bomb");

    setTimeout(() => {
        bombHole.classList.remove("bomb");
        bombPosition = false;
    }, 3000); 

    bombPosition = bombHole.id;
}

// if the mole is being whacked, score +1
// remove once because player cannot repeatedly click the area
hole.forEach(id => {
    id.addEventListener("mousedown", () => {
        if (id.id === molePosition) {
            id.classList.remove("mole")
            result += 1;
            molePosition = false;
        } else if (id.id === goldMolePosition) {
            id.classList.remove("goldenmole")
            result += 10;
            goldMolePosition = false;
        } else if (id.id === babyMolePosition) {
            id.classList.remove("babymole")
            result -= 5;
            babyMolePosition = false;
        } else if (id.id === bombPosition) {
            id.classList.remove("bomb")
            endGame = true
            bombPosition = false;
            molePosition = false;
            goldMolePosition = false;
            babyMolePosition = false;
            alert("YOU HIT A BOMB! Your Score: " + result)
            return endGame
        }
        score.textContent = result;
        return result
    })
})

// end the game when the timer goes to zero
let runGame = function() {
    currentTime--;
    timer.textContent = currentTime;
    let counterTime = parseInt(currentTime);
    if (!endGame) {
        if (currentTime < 1) {
            clearInterval(timeID); 
            clearInterval(moleID);
            timeUp = true;
            alert("Time's up! Your Score: " + result)
        } else if (counterTime === firstTime || counterTime === secondTime) {
            console.log("GOLDEN MOLE APPEAR!")
            goldenMole()
        } else if (counterTime === 10) {
            console.log("BABY MOLE APPEAR!")
            babyMole()
        } else if (counterTime === 17) {
            console.log("BOMB APPEAR!")
            bomb()
        }
    } else {
        clearInterval(timeID); 
        clearInterval(moleID);
        timeUp = true;
    } 
}

const firstTime = randomTime(Math.ceil(currentTime/2) + 1, currentTime - 1);
console.log(firstTime)
const secondTime = randomTime(2, Math.ceil(currentTime/2));
console.log(secondTime);

let start = function() {
    timeUp = false;
    randomMole();
    timeID = setInterval(runGame, 1000);
}

let classRemove = function(x) {
    x.classList.remove("mole")
    x.classList.remove("goldenmole")
    x.classList.remove("babymole")
    x.classList.remove("bomb")
}

let reset = function() {
    document.querySelector("#score").textContent = "0";
    timer.textContent = "20";
    currentTime = 20;
    counterTime = 20;
    document.querySelector("#reset").removeEventListener("click", start, {once: true})
    document.querySelector("#start").removeEventListener("click", start, {once: true})
    document.querySelector("#start").addEventListener("click", start, {once: true})
    document.querySelector("#reset").addEventListener("click", reset, {once: true})
    clearInterval(timeID); 
    clearInterval(moleID);
    result = 0;
    timeUp = true;
    moleID = null;
    timeID = null;
    molePosition = null;
    goldMolePosition = null;
    babyMolePosition = null;
    bombPosition = null;
    endGame = false;
}

document.querySelector("#reset").addEventListener("click", reset, {once: true})
document.querySelector("#start").addEventListener("click", start, {once: true})