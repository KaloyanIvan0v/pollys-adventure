function hasVerticalBlackBars() {
  const windowAspectRatio = window.innerWidth / window.innerHeight;
  const desiredAspectRatio = 3 / 2;
  return windowAspectRatio > desiredAspectRatio;
}

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

function getCanvasPositionForNormal() {
  return { left: canvas.offsetLeft, top: canvas.offsetTop };
}

function calculateCanvasPosition() {
  let rect;
  if (fullscreen) {
    rect = getCanvasPositionForFullscreen();
  } else {
    rect = getCanvasPositionForNormal();
  }
  canvasRect = rect;
}

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

function getCanvasDimensionsForNormal() {
  return {
    width: canvas.width,
    height: canvas.height,
  };
}

function calculateCanvasDimensions() {
  if (fullscreen) {
    canvasDimensions = getCanvasDimensionsForFullscreen();
  } else {
    canvasDimensions = getCanvasDimensionsForNormal();
  }
}

function refreshCanvas() {
  setInterval(() => {
    calculateCanvasPosition();
    calculateCanvasDimensions();
  }, 1000 / 60);
}

function isMobileDevice() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return mobileRegex.test(userAgent);
}

function configUserDevice() {
  if (isMobileDevice()) {
    enterFullScreen();
  } else {
    exitFullScreen();
  }
}

function getScreenOrientation() {
  if (window.matchMedia("(orientation: portrait)").matches) {
    return "portrait";
  } else if (window.matchMedia("(orientation: landscape)").matches) {
    return "landscape";
  }
}

function updateScreenOrientation() {
  if (getScreenOrientation() === "portrait") {
    lastScreenOrientation = "portrait";
  } else {
    lastScreenOrientation = "landscape";
  }
}

function screenOrientationListener() {
  window.addEventListener("orientationchange", world.buttonResizeUpdate);
}
