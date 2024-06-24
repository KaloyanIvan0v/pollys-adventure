class GameMenu {
  x;
  y;
  x_mainButton;
  x_menuButtons = 1000;

  SOUND_BUTTON = ["/img/GUI/buttons/unmute.png", "/img/GUI/buttons/mute.png"];
  PLAY_PAUSE_BUTTON = ["/img/GUI/buttons/stop.png", "/img/GUI/buttons/play.png"];
  INFO_BUTTON = ["/img/GUI/buttons/info.png", "/img/GUI/buttons/info.png"];
  RELOAD_BUTTON = ["/img/GUI/buttons/reload.png", "/img/GUI/buttons/reload.png"];
  SETTINGS_BUTTON = ["/img/GUI/buttons/i.png", "/img/GUI/buttons/i.png"];

  settingsButton = new Button(650, 5, 60, 60, this.SETTINGS_BUTTON);
  soundButton = new Button(this.x_menuButtons, 70, 45, 45, this.SOUND_BUTTON);
  playPauseButton = new Button(this.x_menuButtons, 125, 45, 45, this.PLAY_PAUSE_BUTTON);
  infoButton = new Button(this.x_menuButtons, 180, 45, 45, this.INFO_BUTTON);
  reloadButton = new Button(this.x_menuButtons, 235, 45, 45, this.RELOAD_BUTTON);

  allButtons = [
    this.soundButton,
    this.playPauseButton,
    this.reloadButton,
    this.infoButton,
    this.settingsButton,
  ];

  controlButtons = [this.soundButton, this.playPauseButton, this.reloadButton, this.infoButton];

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  animate() {
    this.animateButtons();
    this.handleCursorPointer(mouse.lastMove);
    this.updateButtonPosition();
  }

  returnButtons() {
    return this.allButtons;
  }

  animateButtons() {
    let x_move = mouse.lastMove.x;
    let y_move = mouse.lastMove.y;
    let x_click = mouse.lastClick.x;
    let y_click = mouse.lastClick.y;
    this.settingsButton.animate(x_move, y_move, x_click, y_click, toggleGameMenu);
    this.soundButton.animate(x_move, y_move, x_click, y_click, toggleSound);
    this.playPauseButton.animate(x_move, y_move, x_click, y_click, togglePlayPause);
    this.infoButton.animate(x_move, y_move, x_click, y_click);
    this.reloadButton.animate(x_move, y_move, x_click, y_click, reload);
  }

  handleCursorPointer(position) {
    let x = position.x;
    let y = position.y;
    if (this.anyButtonIsHovered(x, y)) {
      canvas.style.cursor = "pointer";
    } else {
      canvas.style.cursor = "default";
    }
  }

  anyButtonIsHovered(x, y) {
    let anyButtonIsHovered = false;
    this.allButtons.forEach((button) => {
      if (button.isHovered(x, y)) {
        anyButtonIsHovered = true;
      }
    });
    return anyButtonIsHovered;
  }

  updateButtonPosition() {
    if (gameMenu) {
      this.controlButtons.forEach((button) => {
        button.x = 658;
      });
    } else {
      this.controlButtons.forEach((button) => {
        button.x = 1000;
      });
    }
    return this.x;
  }
}
