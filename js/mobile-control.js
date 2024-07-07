let activeTouchPoints = new Map();
let moveLeft = false;
let moveRight = false;
let moveUp = false;
function watchLoop() {
  setInterval(() => {
    updateControlButtons();
  }, 1000 / 144);
}

function updateControlButtons() {
  if (isMobileDevice()) {
  }
}

function leftButtonClick(buttonPressed) {
  if (buttonPressed) {
    moveLeft = true;
  } else {
    moveLeft = false;
  }
  console.log("left");
}

function rightButtonClick(buttonPressed) {
  if (buttonPressed) {
    moveRight = true;
  } else {
    moveRight = false;
  }
}

function upButtonClick(buttonPressed) {
  if (buttonPressed) {
    moveUp = true;
  } else {
    moveUp = false;
  }
}

function touchEvents() {
  canvas.addEventListener(
    "touchstart",
    (event) => {
      event.preventDefault();
      handleTouchStart(event);
    },
    false
  );

  canvas.addEventListener(
    "touchend",
    (event) => {
      event.preventDefault();
      handleTouchEnd(event);
    },
    false
  );
}

function handleTouchStart(event) {
  event.preventDefault();
  const rect = canvasRect;
  for (let i = 0; i < event.touches.length; i++) {
    const touch = event.touches[i];
    const touchX = Math.round(touch.clientX - rect.left);
    const touchY = Math.round(touch.clientY - rect.top);
    const touchPoint = { x: touchX, y: touchY };
    activeTouchPoints.set(touch.identifier, touchPoint);
  }
}

function handleTouchEnd(event) {
  event.preventDefault();
  for (let i = 0; i < event.changedTouches.length; i++) {
    const touch = event.changedTouches[i];
    activeTouchPoints.delete(touch.identifier);
  }
}

// function logScreen() {
//   let logScreenDiv = document.getElementById("logScreen");
//   logScreenDiv.innerHTML = /*html*/ `
//     <h1>${activeTouchPoints.size}</h1>
//   `;
// }

// function renderLogScreen() {
//   setInterval(() => {
//     logScreen();
//   }, 1000 / 60);
// }
