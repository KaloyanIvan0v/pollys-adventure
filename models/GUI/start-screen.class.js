class StartScreen extends MovableObject {
  PLAY_BUTTON = ["/img/GUI/buttons/start-game.png", "/img/GUI/buttons/start-game.png"];
  SOUND_BUTTON = ["/img/GUI/buttons/mute.png", "/img/GUI/buttons/unmute.png"];
  START_SCREEN = ["/img/background/start-screen/start-screen.png"];
  //CREDITS_BUTTON = ["/img/start-screen/credits.png", "/img/start-screen/credits-hover.png"];
  img;
  playButton = new Button(0.34, 0.2, 0.35, 0.2, this.PLAY_BUTTON);
  backgroundImg = new BackgroundObject(this.START_SCREEN, 0, 0, 480, 720);
  soundButton = new Button(0.1346, 0.494, 0.069, 0.1, this.SOUND_BUTTON);
  intervalId;
  constructor(canvas, keyboard) {
    super();
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.keyboard = keyboard;
    this.draw();
    this.startScreenLoop();
    this.loadImages(this.START_SCREEN);
  }

  startScreenLoop() {
    this.intervalId = setInterval(() => {
      if (!gameRuns) {
        this.draw();
        this.animateButtons();
      }
    }, 1000 / 25);
  }

  stopLoop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.backgroundImg.draw(this.ctx);
    this.playButton.draw(this.ctx);
    this.soundButton.draw(this.ctx);
    //this.infoButton.draw(this.ctx);
  }

  animateButtons() {
    this.playButton.animate(
      mouse.lastMove.x,
      mouse.lastMove.y,
      mouse.lastClick.x,
      mouse.lastClick.y,
      startGame
    );
    this.soundButton.animate(
      mouse.lastMove.x,
      mouse.lastMove.y,
      mouse.lastClick.x,
      mouse.lastClick.y,
      toggleSound
    );
    this.playButton.isTouched(startGame);
    this.soundButton.isTouched(toggleSound);
  }
}
