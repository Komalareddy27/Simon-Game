let gameSeq = [];
let userSeq = [];
let started = false;
let level = 0;
let btns = ["yellow", "red", "green", "purple"];
let h2 = document.querySelector("h2");

function startGame() {
  if (!started) {
    started = true;
    level = 0;
    gameSeq = [];
    h2.innerText = "Level 1";
    levelUp();
  }
}

document.addEventListener("keypress", startGame);
document.addEventListener("click", startGame);

function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => btn.classList.remove("flash"), 300);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(() => btn.classList.remove("userflash"), 300);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`#${randColor}`);
  gameSeq.push(randColor);

  setTimeout(() => {
    btnFlash(randBtn);
    console.log("Game flashed:", randColor);
  }, 500);
}

function checkAns(index) {
  if (userSeq[index] === gameSeq[index]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    // Display score before resetting
    h2.innerHTML = `Game Over! <br> Your score was: ${level} <br> Press any key to start`;

    // Delay the reset so that the score can be seen by the user
    setTimeout(reset, 2000); // Wait for 2 seconds before resetting
  }
}

function btnPress() {
  if (!started) return;

  let btn = this;
  userFlash(btn);
  let userColor = btn.id;
  userSeq.push(userColor);
  console.log("User clicked:", userColor);

  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
allBtns.forEach((btn) => {
  btn.addEventListener("click", btnPress);
});

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
  h2.innerText = "Press any key or anywhere to start";
}
