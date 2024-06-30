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
let gameLoopTicks = 0;
let fullscreen = false;
let canvasDimensions = { width: 720, height: 480 };
let canvasRect = { top: 0, left: 0 };
let lastScreenOrientation;

function init() {
  //configUserDevice();
  updateCanvasData();
  loadStartScreen();
}

function toggleFullscreen() {
  !fullscreen ? enterFullScreen() : exitFullScreen();
  setTimeout(() => {
    world.buttonResizeUpdate();
  }, 20);
}

function playAgain() {
  holdWorld = false;
  reload();
}

function backHome() {
  world.stopGameLoop();
  level1 = new Level(3, 1);
  loadStartScreen();
  holdWorld = false;
  muteSound = true;
}

function startGame() {
  startScreen.stopLoop();
  loadGame();
  muteSound = false;
  ScreenOrientationListener();
}

function reload() {
  world.restartGame();
}

function toggleGameMenu() {
  gameMenu = !gameMenu;
}

function loadStartScreen() {
  gameRuns = false;
  canvas = document.getElementById("canvas");
  startScreen = new StartScreen(canvas, keyboard);
  mouse = new Mouse(canvas);
}

function loadGame() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  gameRuns = true;
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

function enterFullScreen() {
  if (this.canvas.requestFullscreen) {
    this.canvas.requestFullscreen();
    fullscreen = true;
  }
}

function exitFullScreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
    fullscreen = false;
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
  if (e.code === "KeyEsc") {
    keyboard.ESC = true;
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
  if (e.code === "KeyEsc") {
    keyboard.ESC = false;
  }
});
