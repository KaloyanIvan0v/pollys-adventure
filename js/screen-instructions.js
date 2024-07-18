let gamePreset = true;

/**
 * Sets up an interval to handle screen instructions periodically.
 * Runs every 60 frames per second (approximately).
 */
function screenInterval() {
  setInterval(() => {
    handleScreenInstructions();
  }, 1000 / 60);
}

/**
 * Handles screen instructions based on the type of device and fullscreen state.
 * Calls appropriate functions for mobile or desktop views.
 */
function handleScreenInstructions() {
  if (isMobileDevice()) {
    !fullscreen ? handleMobileView() : null;
  } else {
    handleDesktopView();
  }
}

/**
 * Handles specific instructions for the mobile view.
 * Displays rotate instructions or fullscreen instructions based on conditions.
 */
function handleMobileView() {
  if (!mobileResolutionBigEnough()) {
    if (portraitView()) {
      displayRotateDeviceInstruction();
    } else {
      addFullScreenInstruction();
      removeRotateInstruction();
    }
  } else {
    removeRotateInstruction();
    removeFullScreenInstruction();
  }
}

/**
 * Handles the display of instructions based on the desktop view.
 * If the window's width is less than 740 pixels and the view is not fullscreen,
 * it adds fullscreen instructions and removes rotate instructions.
 * Otherwise, it removes the fullscreen instructions.
 */
function handleDesktopView() {
  if (window.innerWidth < 740 && !fullscreen) {
    addFullScreenInstruction();
    removeRotateInstruction();
  } else {
    removeFullScreenInstruction();
  }
}

/**
 * Checks if the current mobile resolution is big enough for the application's needs.
 * @returns {boolean} - True if resolution is sufficient, false otherwise.
 */
function mobileResolutionBigEnough() {
  return window.innerWidth > 740 && window.innerHeight > 490;
}

/**
 * Determines if the current view is in portrait mode based on window dimensions.
 * @returns {boolean} - True if in portrait view, false otherwise.
 */
function portraitView() {
  return window.innerWidth < window.innerHeight;
}

/**
 * Displays the rotate device instruction on the screen.
 */
function displayRotateDeviceInstruction() {
  rotateInstruction = document.getElementById("id-shadow-layer");
  rotateInstruction.classList.remove("v-hidden");
}

/**
 * Removes the rotate device instruction from the screen.
 */
function removeRotateInstruction() {
  rotateInstruction = document.getElementById("id-shadow-layer");
  rotateInstruction.classList.add("v-hidden");
}

/**
 * Displays the fullscreen instruction and hides the canvas element.
 */
function addFullScreenInstruction() {
  let fullscreenElement = document.getElementById("id-fullscreen-instruction");
  fullscreenElement.classList.remove("d-none");
  canvas.classList.add("d-none");
}

/**
 * Removes the fullscreen instruction and shows the canvas element.
 */
function removeFullScreenInstruction() {
  let fullscreenElement = document.getElementById("id-fullscreen-instruction");
  fullscreenElement.classList.add("d-none");
  canvas.classList.remove("d-none");
}

/**
 * Handles the process of playing in fullscreen mode.
 * Removes fullscreen instruction and enters fullscreen mode.
 */
function playInFullscreen() {
  removeFullScreenInstruction();
  enterFullScreen();
  world ? world.buttonResizeUpdate() : null;
}
