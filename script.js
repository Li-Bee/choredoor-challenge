/* GLOBAL VARIABLES*/

let doorImage1 = document.getElementById("door1");
let doorImage2 = document.getElementById("door2");
let doorImage3 = document.getElementById("door3");
let botDoorPath =
  "https://content.codecademy.com/projects/chore-door/images/robot.svg";
let beachDoorPath =
  "https://content.codecademy.com/projects/chore-door/images/beach.svg";
let spaceDoorPath =
  "https://content.codecademy.com/projects/chore-door/images/space.svg";
let numClosedDoors = 3;
let openDoor1;
let openDoor2;
let openDoor3;
let closedDoorPath =
  "https://content.codecademy.com/projects/chore-door/images/closed_door.svg";
let startButton = document.getElementById("start");
let currentlyPlaying = true;
let score = 0;
let highScore = 0;
let currentStreak = document.getElementById("score-number");
let bestStreak = document.getElementById("high-score-number");
currentStreak.innerHTML = score;
bestStreak.innerHTML = highScore;

/* AVOID CHEATING I.E. CLICKING THE SAME DOOR THREE TIMES. PREVENTS USER CLICKING OPEN DOOR - CHECKS IF OPEN/CLOSED */
const isClicked = (door) => {
  if (door.src === closedDoorPath) {
    // door is closed
    return false;
  } else {
    // door is open
    return true;
  }
};

/* CHECK WHICH DOOR HAS THE BOT*/
const isBot = (door) => {
  if (door.src === botDoorPath) {
    return true;
  } else {
    return false;
  }
};

/* EACH TIME DOOR PLAYED DECREASE NUMBER OF AVALIABLE DOORS DOWN. REACH 0 YOU WIN, IF REACH BOT BEFORE ZERO LOSE */
const playDoor = (door) => {
  numClosedDoors--;
  if (numClosedDoors === 0) {
    gameOver("win");
  } else if (isBot(door) === true) {
    return gameOver();
  }
};

// FUNCTION TO RANDOM GENERATE LOCATION OF THE BOT, BEACH AND SPACE PICTURE
const randomChoreDoorGenerator = () => {
  // random number between 0 and 2
  let choreDoor = Math.floor(Math.random() * numClosedDoors);
  if (choreDoor === 0) {
    openDoor1 = botDoorPath;
    openDoor2 = beachDoorPath;
    openDoor3 = spaceDoorPath;
  } else if (choreDoor === 1) {
    openDoor2 = botDoorPath;
    openDoor1 = beachDoorPath;
    openDoor3 = spaceDoorPath;
  } else {
    openDoor3 = botDoorPath;
    openDoor2 = beachDoorPath;
    openDoor1 = spaceDoorPath;
  }
};

/*
//Next Steps - Switch Statement Version (6 possible combinations)
const randomChoreDoorGenerator = () => {
  choreDoor = Math.floor(Math.random() * 6);
  switch (choreDoor) {
    case 0:
      openDoor1 = botDoorPath;
      openDoor2 = beachDoorPath;
      openDoor3 = spaceDoorPath;
      break;
    case 1:
      openDoor1 = botDoorPath;
      openDoor2 = spaceDoorPath;
      openDoor3 = beachDoorPath;
      break;
    case 2:
      openDoor2 = botDoorPath;
      openDoor1 = beachDoorPath;
      openDoor3 = spaceDoorPath;
      break;
    case 3:
      openDoor2 = botDoorPath;
      openDoor1 = spaceDoorPath;
      openDoor3 = beachDoorPath;
      break;
    case 4:
      openDoor3 = botDoorPath;
      openDoor1 = beachDoorPath;
      openDoor2 = spaceDoorPath;
      break;
    case 5:
      openDoor3 = botDoorPath;
      openDoor1 = spaceDoorPath;
      openDoor2 = beachDoorPath;
      break;
  }
}
*/

// CHANGE IMAGE OF SOURCE ONCE CLICKED IF NOT ALREADY CLICKED BEFORE AND PLAYING THE GAME
doorImage1.onclick = () => {
  if (!isClicked(doorImage1) && currentPlaying) {
    doorImage1.src = openDoor1;
    playDoor(doorImage1);
  }
};
doorImage2.onclick = () => {
  if (!isClicked(doorImage2) && currentPlaying) {
    doorImage2.src = openDoor2;
    playDoor(doorImage2);
  }
};

doorImage3.onclick = () => {
  if (!isClicked(doorImage3) && currentPlaying) {
    doorImage3.src = openDoor3;
    playDoor(doorImage3);
  }
};

// CHECK IF CURRENTLY PLAYING VARIABLE IS FALSE SO PLAYER CANNOT RESET GAME MIDWAY. IF DID NOT HAVE THIS DOORIMAGE.SRC BE CLOSED DOOR AGAIN BEFORE THE WINNING OR LOSING CONDITION COULD BE REACHED
startButton.onclick = () => {
  if (!currentPlaying) {
    startRound();
  }
};

// START NEW GAME RESET THE VALUES AND GENERATE LOCATION OF BOT
const startRound = () => {
  numClosedDoors = 3;
  // RESET ALL DOORS TO BE CLOSED
  doorImage1.src = closedDoorPath;
  doorImage2.src = closedDoorPath;
  doorImage3.src = closedDoorPath;
  startButton.innerHTML = "Good Luck!";
  currentPlaying = true;
  randomChoreDoorGenerator();
};

// UPDATE START BUTTON WORDING IF WIN OR LOSE
const gameOver = (status) => {
  if (status === "win") {
    startButton.innerHTML = "You win! Play again?";
    getYourScore();
  } else {
    startButton.innerHTML = "Game over! Play again?";
    score = 0;
    currentStreak.innerHTML = score;
  }
  // THIS MAKESURES ADDITIONAL DOORS CANNOT BE CLICKED AFTER THE BOT DOOR IS CLICKED
  currentPlaying = false;
};

const getYourScore = () => {
  score++;
  currentStreak.innerHTML = score;
  if (score > highScore) {
    highScore = score;
    bestStreak.innerHTML = highScore;
  }
};

startRound();
