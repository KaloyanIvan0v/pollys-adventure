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
let actualDevicePc = true;
let renderSpeed = 60;
let gameWon = false;

/**
 * Initialization function to set up the game environment.
 */
function init() {
  refreshCanvas();
  loadStartScreen();
  screenInterval();
  touchEvents();
  initClickEventForFullscreen();
  initTouchListener();
  screenResizeListener();
}

/**
 * Initialize click event listener for fullscreen instruction.
 */
function initClickEventForFullscreen() {
  document.getElementById("id-fullscreen-instruction").addEventListener("click", playInFullscreen);
}

/**
 * Function to toggle fullscreen mode.
 */
function toggleFullscreen() {
  !fullscreen ? enterFullScreen() : exitFullScreen();
  setTimeout(() => {
    world.buttonResizeUpdate();
  }, 20);
}

/**
 * Function to restart the game.
 */
function playAgain() {
  holdWorld = false;
  reload();
}

/**
 * Function to go back to the home screen.
 */
function backHome() {
  world.stopGameLoop();
  level1 = new Level(3, 1);
  loadStartScreen();
  holdWorld = false;
  muteSound = true;
}

/**
 * Function to start the game.
 */
function startGame() {
  startScreen.stopLoop();
  loadGame();
  setTimeout(() => {
    muteSound = false;
    gamePaused = true;
  }, 200);

  screenOrientationListener();
}

/**
 * Function to reload the game.
 */
function reload() {
  world.restartGame();
}

/**
 * Function to toggle the game menu.
 */
function toggleGameMenu() {
  gameMenu = !gameMenu;
}

/**
 * Function to toggle the "How to Play" instructions.
 */
function toggleHowToPlay() {
  console.log("howToPlayShown: ", world.howToPlayShown);
  if (world.howToPlayShown) {
    world.howToPlayShown = false;
    gamePaused ? togglePlayPause() : null;
  } else {
    world.howToPlayShown = true;
    !gamePaused ? togglePlayPause() : null;
  }
}

/**
 * Function to load the start screen.
 */
function loadStartScreen() {
  gameRuns = false;
  canvas = document.getElementById("canvas");
  startScreen = new StartScreen(canvas, keyboard);
  mouse = new Mouse(canvas);
}

/**
 * Function to load the game.
 */
function loadGame() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  gameRuns = true;
}

/**
 * Function to execute on every mouse click.
 */
function executeOnEveryMouseClick() {
  closeHowToPlayOnFreeClick();
}

/**
 * Function to execute on every touch event.
 */
function executeOnEveryTouch() {
  if (world != undefined) {
    setTimeout(() => {
      closeHowToPlayOnFreeClick();
    }, 20);
  } else {
    closeHowToPlayOnFreeClick();
  }
}

/**
 * Function to close "How to Play" instructions on free click.
 */
function closeHowToPlayOnFreeClick() {
  if (world != undefined) {
    if (
      world.howToPlayShown &&
      !world.gameMenu.infoButton.isHovered(mouse.lastClick.x, mouse.lastClick.y) &&
      !world.gameMenu.infoButton.pressed
    ) {
      toggleHowToPlay();
    }
  }
}

/**
 * Function to toggle sound on/off.
 */
function toggleSound() {
  muteSound = !muteSound;
}

/**
 * Function to toggle play/pause state.
 */
function togglePlayPause() {
  setTimeout(() => {
    //this timeout is needed, because to set the sounds to mute the game loop needs to run.
    gamePaused = !gamePaused;
  }, 20);
  !gamePaused && !muteSound ? toggleSound() : null;
  gamePaused && muteSound ? toggleSound() : null;
}

/**
 * Function to enter fullscreen mode.
 */
function enterFullScreen() {
  const canvas = document.getElementById("canvas");
  if (canvas.requestFullscreen) {
    fullscreen = true;
    canvas.requestFullscreen();
  } else if (canvas.mozRequestFullScreen) {
    fullscreen = true;
    canvas.mozRequestFullScreen();
  } else if (canvas.webkitRequestFullscreen) {
    fullscreen = true;
    canvas.webkitRequestFullscreen();
  } else if (canvas.msRequestFullscreen) {
    fullscreen = true;
    canvas.msRequestFullscreen();
  } else if (canvas.webkitEnterFullscreen) {
    fullscreen = true;
    canvas.webkitEnterFullscreen();
  } else {
    alert("Fullscreen mode is not supported on this device.");
    fullscreen = true;
    return;
  }
  if (gamePaused) {
    togglePlayPause();
  }
}

/**
 * Function to exit fullscreen mode.
 */
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
  !gamePaused ? togglePlayPause() : null;
}

/**
 * Event listener for keydown events.
 */
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

/**
 * Event listener for keyup events.
 */
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

/**
 * Function to initialize touch event listeners.
 */
function initTouchListener() {
  window.addEventListener("touchstart", executeOnEveryTouch);
}

/**
 * Function to execute when the device changes.
 */
function executeOnDeviceChange() {
  console.log("Device changed");
  world != undefined ? world.buttonResizeUpdate() : null;
}
