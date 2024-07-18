class StartScreen extends MovableObject {
  /**
   * Represents the images for the play button.
   * @type {string[]}
   */
  PLAY_BUTTON = ["/img/GUI/buttons/start-game.png", "/img/GUI/buttons/start-game.png"];

  /**
   * Represents the images for the sound button.
   * @type {string[]}
   */
  SOUND_BUTTON = ["/img/GUI/buttons/mute.png", "/img/GUI/buttons/unmute.png"];

  /**
   * Represents the image for the start screen background.
   * @type {string[]}
   */
  START_SCREEN = ["/img/background/start-screen/start-screen.png"];

  // CREDITS_BUTTON = ["/img/start-screen/credits.png", "/img/start-screen/credits-hover.png"];

  /**
   * The current background image object.
   * @type {BackgroundObject}
   */
  backgroundImg = new BackgroundObject(this.START_SCREEN, 0, 0, 480, 720);

  /**
   * The play button instance.
   * @type {Button}
   */
  playButton = new Button(0.34, 0.2, 0.35, 0.2, this.PLAY_BUTTON);

  /**
   * The sound button instance.
   * @type {Button}
   */
  soundButton = new Button(0.1346, 0.494, 0.069, 0.1, this.SOUND_BUTTON);

  /**
   * The interval ID for the start screen animation loop.
   * @type {number}
   */
  intervalId;

  /**
   * Constructs a StartScreen object.
   * @param {HTMLCanvasElement} canvas - The canvas element to draw on.
   * @param {Keyboard} keyboard - The keyboard instance for keyboard input handling.
   */
  constructor(canvas, keyboard) {
    super();
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.keyboard = keyboard;
    this.draw();
    this.startScreenLoop();
    this.loadImages(this.START_SCREEN);
  }

  /**
   * Starts the animation loop for the start screen.
   */
  startScreenLoop() {
    this.intervalId = setInterval(() => {
      if (!gameRuns) {
        this.draw();
        this.animateButtons();
      }
    }, 1000 / 25); // 25 frames per second
  }

  /**
   * Stops the animation loop for the start screen.
   */
  stopLoop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  /**
   * Draws the start screen including background and buttons.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.backgroundImg.draw(this.ctx);
    this.playButton.draw(this.ctx);
    this.soundButton.draw(this.ctx);
    //this.infoButton.draw(this.ctx);
  }

  /**
   * Animates the buttons on the start screen based on mouse movements and clicks.
   */
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
