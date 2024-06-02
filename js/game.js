let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

function startGame() {
  init();
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
