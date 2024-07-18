/**
 * Defines the dimensions of the canvas.
 */
let canvasDimensions = { width: 720, height: 480 };

/**
 * Represents the current position of the canvas rectangle.
 */
let canvasRect = { top: 0, left: 0 };

/**
 * Stores the last known screen orientation.
 */
let lastScreenOrientation;

/**
 * Checks if there are vertical black bars based on the window aspect ratio.
 * @returns {boolean} True if there are vertical black bars, otherwise false.
 */
function hasVerticalBlackBars() {
  const windowAspectRatio = window.innerWidth / window.innerHeight;
  const desiredAspectRatio = 3 / 2;
  return windowAspectRatio > desiredAspectRatio;
}

/**
 * Calculates the position of the canvas when in fullscreen mode.
 * @returns {Object} The position of the canvas as {left, top}.
 */
function getCanvasPositionForFullscreen() {
  const rect = { left: 0, top: 0 };
  if (!hasVerticalBlackBars()) {
    const canvasHeight = window.innerWidth * (2 / 3);
    rect.top = (window.innerHeight - canvasHeight) / 2;
  } else {
    const canvasWidth = window.innerHeight * (3 / 2);
    rect.left = (window.innerWidth - canvasWidth) / 2;
  }
  return rect;
}

/**
 * Retrieves the current position of the canvas in normal mode.
 * @returns {Object} The position of the canvas as {left, top}.
 */
function getCanvasPositionForNormal() {
  return { left: canvas.offsetLeft, top: canvas.offsetTop };
}

/**
 * Calculates the canvas position based on the current mode (fullscreen or normal).
 */
function calculateCanvasPosition() {
  let rect;
  if (fullscreen) {
    rect = getCanvasPositionForFullscreen();
  } else {
    rect = getCanvasPositionForNormal();
  }
  canvasRect = rect;
}

/**
 * Retrieves the dimensions of the canvas when in fullscreen mode.
 * @returns {Object} The dimensions of the canvas as {width, height}.
 */
function getCanvasDimensionsForFullscreen() {
  if (!hasVerticalBlackBars()) {
    return {
      width: window.innerWidth,
      height: window.innerWidth * (2 / 3),
    };
  } else {
    return {
      width: window.innerHeight * (3 / 2),
      height: window.innerHeight,
    };
  }
}

/**
 * Retrieves the current dimensions of the canvas in normal mode.
 * @returns {Object} The dimensions of the canvas as {width, height}.
 */
function getCanvasDimensionsForNormal() {
  return {
    width: canvas.width,
    height: canvas.height,
  };
}

/**
 * Calculates the canvas dimensions based on the current mode (fullscreen or normal).
 */
function calculateCanvasDimensions() {
  if (fullscreen) {
    canvasDimensions = getCanvasDimensionsForFullscreen();
  } else {
    canvasDimensions = getCanvasDimensionsForNormal();
  }
}

/**
 * Periodically refreshes the canvas position and dimensions.
 */
function refreshCanvas() {
  setInterval(() => {
    calculateCanvasPosition();
    calculateCanvasDimensions();
  }, 1000 / 60); // 60 times per second refresh rate
}

/**
 * Checks if the current device is a mobile device.
 * @returns {boolean} True if the device is a mobile device, otherwise false.
 */
function isMobileDevice() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  const mobileRegex =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|Kindle|Silk|Mobile/i;
  const isMobile = mobileRegex.test(userAgent);
  const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  return isMobile || isTouchDevice;
}

/**
 * Configures the user device based on whether it is a mobile device or not.
 */
function configUserDevice() {
  if (isMobileDevice()) {
    enterFullScreen();
  } else {
    exitFullScreen();
  }
}

/**
 * Retrieves the current screen orientation.
 * @returns {string} The current screen orientation ("portrait" or "landscape").
 */
function getScreenOrientation() {
  if (window.matchMedia("(orientation: portrait)").matches) {
    return "portrait";
  } else if (window.matchMedia("(orientation: landscape)").matches) {
    return "landscape";
  }
}

/**
 * Updates and stores the last known screen orientation.
 */
function updateScreenOrientation() {
  if (getScreenOrientation() === "portrait") {
    lastScreenOrientation = "portrait";
  } else {
    lastScreenOrientation = "landscape";
  }
}

/**
 * Listens for changes in screen orientation and triggers a world button resize update.
 */
function screenOrientationListener() {
  window.addEventListener("orientationchange", world.buttonResizeUpdate);
}

/**
 * Adds an event listener to the window that listens for resize events.
 * When a resize event occurs, the executeOnDeviceChange function is called.
 */
function screenResizeListener() {
  window.addEventListener("resize", executeOnDeviceChange);
}
