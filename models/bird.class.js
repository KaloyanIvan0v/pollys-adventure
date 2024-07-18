class Bird extends MovableObject {
  /**
   * Array of paths to bird idle animation images.
   * @type {string[]}
   */
  BIRD_IDLE = [
    "/img/characters/bird/idle/003-000.png",
    "/img/characters/bird/idle/003-001.png",
    "/img/characters/bird/idle/003-002.png",
  ];

  /**
   * Array of paths to bird flying animation images.
   * @type {string[]}
   */
  BIRD_FLY = [
    "/img/characters/bird/fly/004-000.png",
    "/img/characters/bird/fly/004-001.png",
    "/img/characters/bird/fly/004-002.png",
    "/img/characters/bird/fly/004-003.png",
    "/img/characters/bird/fly/004-004.png",
    "/img/characters/bird/fly/004-005.png",
  ];

  /**
   * Array of paths to bird picking animation images.
   * @type {string[]}
   */
  BIRD_PICKING = [
    "/img/characters/bird/picking/001-000.png",
    "/img/characters/bird/picking/001-001.png",
    "/img/characters/bird/picking/001-002.png",
    "/img/characters/bird/picking/001-003.png",
  ];

  /**
   * Last game ticks value.
   * @type {number}
   */
  lastGameTicks = 0;

  /**
   * Random duration for picking animation.
   * @type {number}
   */
  randomDuration = this.getRandomDuration();

  /**
   * Flag indicating if the bird is picking.
   * @type {boolean}
   */
  isPicking = false;

  /**
   * Constructs a Bird instance.
   * @param {number} x - The initial x-coordinate of the bird.
   * @param {number} y - The initial y-coordinate of the bird.
   */
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.width = 29;
    this.height = 29;
    this.startX = 0;
    this.startY = 0;
    this.endX = 0;
    this.endY = 0;
    this.loadImg(this.BIRD_IDLE[0]);
    this.isFlying = false;
    this.noiseX = 0;
    this.noiseY = 0;
    this.loadImages(this.BIRD_IDLE);
    this.loadImages(this.BIRD_FLY);
    this.loadImages(this.BIRD_PICKING);
  }

  /**
   * Main loop for the bird object.
   */
  objLoop() {
    if (this.isPicking) {
      this.pickingAnimation();
    } else {
      this.idleAnimation();
    }
    this.setPicking();
  }

  /**
   * Plays the picking animation for the bird.
   */
  pickingAnimation() {
    this.playAnimation(this.BIRD_PICKING, 280);
  }

  /**
   * Plays the idle animation for the bird.
   */
  idleAnimation() {
    this.playAnimation(this.BIRD_IDLE, 280);
  }

  /**
   * Generates a random duration for picking animation.
   * @returns {number} - The random duration value.
   */
  getRandomDuration() {
    return Math.floor(Math.random() * (800 - 300 + 1)) + 500;
  }

  /**
   * Sets the picking state of the bird based on game ticks.
   */
  setPicking() {
    if (gameLoopTicks - this.lastGameTicks >= this.randomDuration) {
      this.isPicking ? (this.isPicking = false) : (this.isPicking = true);
      this.isPicking
        ? (this.randomDuration = 200)
        : (this.randomDuration = this.getRandomDuration());
      this.lastGameTicks = gameLoopTicks;
    }
  }
}
