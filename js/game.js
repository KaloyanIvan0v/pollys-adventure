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
let lastHoveredButton;
let renderSpeed = 60;
let gameWon = false;

function init() {
  refreshCanvas();
  loadStartScreen();
  screenInterval();
  touchEvents();
  initClickEventForFullscreen();
}

function initClickEventForFullscreen() {
  document.getElementById("id-fullscreen-instruction").addEventListener("click", playInFullscreen);
}

function toggleFullscreen() {
  !fullscreen ? enterFullScreen() : exitFullScreen();
  setTimeout(() => {
    world.buttonResizeUpdate();
  }, 20);
}

function playAgain() {
  console.log("playAgain");
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
  setTimeout(() => {
    // avoid -> interact with the document first error
    muteSound = false;
    gamePaused = true;
  }, 200);

  screenOrientationListener();
}

function reload() {
  world.restartGame();
}

function toggleGameMenu() {
  gameMenu = !gameMenu;
}

function toggleHowToPlay() {
  if (world.howToPlayShown) {
    world.howToPlayShown = false;
    togglePlayPause();
  } else {
    world.howToPlayShown = true;
    togglePlayPause();
  }
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

function executeOnEveryMouseClick() {
  closeHowToPlayOnFreeClick();
}

function closeHowToPlayOnFreeClick() {
  if (world != undefined) {
    if (world.howToPlayShown && world != undefined) {
      toggleHowToPlay();
    }
  }
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
  if (canvas.requestFullscreen) {
    canvas.requestFullscreen();
  } else if (canvas.mozRequestFullScreen) {
    canvas.mozRequestFullScreen();
  } else if (canvas.webkitRequestFullscreen) {
    canvas.webkitRequestFullscreen();
  } else if (canvas.msRequestFullscreen) {
    canvas.msRequestFullscreen();
  }
  fullscreen = true;
}

function exitFullScreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
  fullscreen = false;
  gamePaused = true;
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
