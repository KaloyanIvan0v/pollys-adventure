class GameMenu {
  x;
  y;
  x_mainButton;
  x_menuButtons = 1.88;

  SOUND_BUTTON = ["/img/GUI/buttons/unmute.png", "/img/GUI/buttons/mute.png"];
  PLAY_PAUSE_BUTTON = ["/img/GUI/buttons/stop.png", "/img/GUI/buttons/play.png"];
  INFO_BUTTON = ["/img/GUI/buttons/info.png", "/img/GUI/buttons/info.png"];
  RELOAD_BUTTON = ["/img/GUI/buttons/reload.png", "/img/GUI/buttons/reload.png"];
  SETTINGS_BUTTON = ["/img/GUI/buttons/i.png", "/img/GUI/buttons/i.png"];
  fullscreen_BUTTON = ["/img/GUI/buttons/fullscreen.png", "/img/GUI/buttons/fullscreen.png"];

  LEFT_BUTTON = ["/img/GUI/buttons/left.png", "/img/GUI/buttons/left.png"];
  RIGHT_BUTTON = ["/img/GUI/buttons/right.png", "/img/GUI/buttons/right.png"];
  UP_BUTTON = ["/img/GUI/buttons/up.png", "/img/GUI/buttons/up.png"];

  settingsButton = new Button(0.89, 0.02, 0.1, 0.15, this.SETTINGS_BUTTON);
  soundButton = new Button(this.x_menuButtons, 0.18, 0.06, 0.09, this.SOUND_BUTTON);
  playPauseButton = new Button(this.x_menuButtons, 0.3, 0.06, 0.09, this.PLAY_PAUSE_BUTTON);
  infoButton = new Button(this.x_menuButtons, 0.42, 0.06, 0.09, this.INFO_BUTTON);
  reloadButton = new Button(this.x_menuButtons, 0.54, 0.06, 0.09, this.RELOAD_BUTTON);
  fullscreenButton = new Button(this.x_menuButtons, 0.66, 0.06, 0.09, this.fullscreen_BUTTON);

  leftButton = new Button(0.08, 0.89, 0.08, 0.12, this.LEFT_BUTTON);
  rightButton = new Button(0.22, 0.89, 0.08, 0.12, this.RIGHT_BUTTON);
  upButton = new Button(0.75, 0.89, 0.08, 0.12, this.UP_BUTTON);

  mobileButtons = [this.leftButton, this.rightButton, this.upButton];

  controlButtons = [
    this.soundButton,
    this.playPauseButton,
    this.reloadButton,
    this.infoButton,
    this.fullscreenButton,
  ];

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  animate() {
    this.animateButtons();
    //this.handleCursorPointer(mouse.lastMove);
    this.updateButtonPosition();
  }

  returnButtons() {
    let buttons = [this.settingsButton];
    this.controlButtons.forEach((button) => {
      buttons.push(button);
    });
    if (isMobileDevice()) {
      this.mobileButtons.forEach((button) => {
        buttons.push(button);
      });
    }
    return buttons;
  }

  animateButtons() {
    let x_move = mouse.lastMove.x;
    let y_move = mouse.lastMove.y;
    let x_click = mouse.lastClick.x;
    let y_click = mouse.lastClick.y;
    this.updateButtonImg();
    this.settingsButton.animate(x_move, y_move, x_click, y_click, toggleGameMenu);
    this.soundButton.animate(x_move, y_move, x_click, y_click, toggleSound);
    this.playPauseButton.animate(x_move, y_move, x_click, y_click, togglePlayPause);
    this.infoButton.animate(x_move, y_move, x_click, y_click);
    this.reloadButton.animate(x_move, y_move, x_click, y_click, reload);
    this.fullscreenButton.animate(x_move, y_move, x_click, y_click, toggleFullscreen);
    this.animateMobileButtons();
  }

  animateMobileButtons() {
    let x_move = mouse.lastMove.x;
    let y_move = mouse.lastMove.y;
    let x_click = mouse.lastClick.x;
    let y_click = mouse.lastClick.y;
    if (isMobileDevice()) {
      this.leftButton.animate(x_move, y_move, x_click, y_click, leftButtonClick);
      this.rightButton.animate(x_move, y_move, x_click, y_click, rightButtonClick);
      this.upButton.animate(x_move, y_move, x_click, y_click, upButtonClick);
      this.leftButton.isTouched(leftButtonClick, leftButtonClick);
      this.rightButton.isTouched(rightButtonClick, rightButtonClick);
      this.upButton.isTouched(upButtonClick, upButtonClick);
      this.animateMenuMobileButtons();
    }
  }

  animateMenuMobileButtons() {
    this.settingsButton.isTouched(toggleGameMenu);
    this.soundButton.isTouched(toggleSound);
    this.playPauseButton.isTouched(togglePlayPause);
    this.infoButton.isTouched();
    this.reloadButton.isTouched(reload);
    this.fullscreenButton.isTouched(toggleFullscreen);
  }

  updateButtonPosition() {
    if (gameMenu) {
      this.gameMenuShowButtons();
    } else {
      this.gameMenuHideButtons();
    }
  }

  gameMenuShowButtons() {
    this.controlButtons.forEach((button) => {
      button.x = 0.91 * canvas.width;
      button.x_click = 0.91 * canvasDimensions.width;
    });
  }

  gameMenuHideButtons() {
    this.controlButtons.forEach((button) => {
      button.x = 1.5 * canvas.width;
      button.x_click = 1.5 * canvasDimensions.width;
    });
  }

  updateButtonImg() {
    this.updateImgForSoundButton();
    this.updateButtonImgForPlayPauseButton();
  }

  updateImgForSoundButton() {
    if (muteSound) {
      this.soundButton.img = this.soundButton.imgCache[this.soundButton.images[1]];
    } else {
      this.soundButton.img = this.soundButton.imgCache[this.soundButton.images[0]];
    }
  }

  updateButtonImgForPlayPauseButton() {
    if (gamePaused) {
      this.playPauseButton.img = this.playPauseButton.imgCache[this.playPauseButton.images[1]];
    } else {
      this.playPauseButton.img = this.playPauseButton.imgCache[this.playPauseButton.images[0]];
    }
  }
}
