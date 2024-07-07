function screenInterval() {
  setInterval(() => {
    handleScreenInstructions();
  }, 1000 / 60);
}

function handleScreenInstructions() {
  if (isMobileDevice()) {
    !fullscreen ? handleMobileView() : null;
  } else {
    !fullscreen ? handleDesktopView() : null;
  }
}

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

function handleDesktopView() {}

function mobileResolutionBigEnough() {
  return window.innerWidth > 740 && window.innerHeight > 490;
}

function portraitView() {
  return window.innerWidth < window.innerHeight;
}

function displayRotateDeviceInstruction() {
  rotateInstruction = document.getElementById("id-shadow-layer");
  rotateInstruction.classList.remove("v-hidden");
}

function removeRotateInstruction() {
  rotateInstruction = document.getElementById("id-shadow-layer");
  rotateInstruction.classList.add("v-hidden");
}

function addFullScreenInstruction() {
  let fullscreenElement = document.getElementById("id-fullscreen-instruction");
  fullscreenElement.classList.remove("d-none");
  canvas.classList.add("d-none");
}

function removeFullScreenInstruction() {
  let fullscreenElement = document.getElementById("id-fullscreen-instruction");
  fullscreenElement.classList.add("d-none");
  canvas.classList.remove("d-none");
}

function playInFullscreen() {
  removeFullScreenInstruction();
  enterFullScreen();
}
