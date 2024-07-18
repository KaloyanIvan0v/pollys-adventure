let activeTouchPoints = new Map();
let moveLeft = false;
let moveRight = false;
let moveUp = false;
let throwPressed = false;
/**
 * Initializes a loop to update control buttons periodically.
 * Uses 144 frames per second timing.
 */
function watchLoop() {
  setInterval(() => {
    updateControlButtons();
  }, 1000 / 144);
}

/**
 * Updates the control buttons state based on mobile device conditions.
 * Does nothing if not on a mobile device.
 */
function updateControlButtons() {
  if (isMobileDevice()) {
    // Function body intentionally left empty
  }
}

/**
 * Sets the moveLeft variable based on button press state.
 * @param {boolean} buttonPressed - Indicates whether the button is pressed.
 */
function leftButtonClick(buttonPressed) {
  if (buttonPressed) {
    moveLeft = true;
  } else {
    moveLeft = false;
  }
}

/**
 * Sets the moveRight variable based on button press state.
 * @param {boolean} buttonPressed - Indicates whether the button is pressed.
 */
function rightButtonClick(buttonPressed) {
  if (buttonPressed) {
    moveRight = true;
  } else {
    moveRight = false;
  }
}

/**
 * Sets the moveUp variable based on button press state.
 * @param {boolean} buttonPressed - Indicates whether the button is pressed.
 */
function upButtonClick(buttonPressed) {
  if (buttonPressed) {
    moveUp = true;
  } else {
    moveUp = false;
  }
}

/**
 * Sets the throwPressed variable based on button press state.
 * @param {boolean} buttonPressed - Indicates whether the button is pressed.
 */
function throwButtonClick(buttonPressed) {
  if (buttonPressed) {
    throwPressed = true;
  } else {
    throwPressed = false;
  }
}

/**
 * Resets the throwPressed variable when the throw button is released.
 */
function throwButtonReleased() {
  throwPressed = false;
}

/**
 * Sets up touch event listeners for touchstart and touchend events on the canvas.
 * Prevents default touch behavior.
 */
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

/**
 * Handles touchstart events on the canvas.
 * Stores active touch points in a map.
 * @param {TouchEvent} event - The touch event object.
 */
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

/**
 * Handles touchend events on the canvas.
 * Removes touch points from the activeTouchPoints map.
 * @param {TouchEvent} event - The touch event object.
 */
function handleTouchEnd(event) {
  event.preventDefault();
  for (let i = 0; i < event.changedTouches.length; i++) {
    const touch = event.changedTouches[i];
    activeTouchPoints.delete(touch.identifier);
  }
}
