let canvas;
let world;
let mouse;
let keyboard = new Keyboard();
let muteSound = true;
let soundVolumeGame = 1;
let soundVolumeGUI = 1;
let gamePaused = false;
let gameRuns = false;
let holdWorld = false;
let activeSounds = [];
let gameMenu = false;

function init() {
  loadStartScreen();
}

function startGame() {
  loadGame();
  muteSound = false;
}

function reload() {
  world.restartGame();
}

function toggleGameMenu() {
  gameMenu = !gameMenu;
}

function loadStartScreen() {
  canvas = document.getElementById("canvas");
  startScreen = new StartScreen(canvas, keyboard);
  mouse = new Mouse(canvas);
}

function loadGame() {
  gameRuns = true;
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

function toggleSound() {
  muteSound = !muteSound;
}

function togglePlayPause() {
  setTimeout(() => {
    gamePaused = !gamePaused;
  }, 20);

  if (gamePaused) {
    soundVolumeGame = 1;
  } else {
    soundVolumeGame = 0;
  }
}

window.addEventListener("keydown", (e) => {
  if (e.code === "KeyD") {
    keyboard.RIGHT = true;
  }
  if (e.code === "KeyA") {
    keyboard.LEFT = true;
  }
  if (e.code === "Space") {
    keyboard.SPACE = true;
  }
  if (e.code === "KeyW") {
    keyboard.UP = true;
  }
  if (e.code === "KeyT") {
    keyboard.T = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.code === "KeyD") {
    keyboard.RIGHT = false;
  }
  if (e.code === "KeyA") {
    keyboard.LEFT = false;
  }
  if (e.code === "Space") {
    keyboard.SPACE = false;
  }
  if (e.code === "KeyW") {
    keyboard.UP = false;
  }
  if (e.code === "KeyT") {
    keyboard.T = false;
  }
});
