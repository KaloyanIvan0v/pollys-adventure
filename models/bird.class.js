class Bird extends MovableObject {
  BIRD_IDLE = [
    "/img/characters/bird/idle/003-000.png",
    "/img/characters/bird/idle/003-001.png",
    "/img/characters/bird/idle/003-002.png",
  ];

  BIRD_FLY = [
    "/img/characters/bird/fly/004-000.png",
    "/img/characters/bird/fly/004-001.png",
    "/img/characters/bird/fly/004-002.png",
    "/img/characters/bird/fly/004-003.png",
    "/img/characters/bird/fly/004-004.png",
    "/img/characters/bird/fly/004-005.png",
  ];

  BIRD_PICKING = [
    "/img/characters/bird/picking/001-000.png",
    "/img/characters/bird/picking/001-001.png",
    "/img/characters/bird/picking/001-002.png",
    "/img/characters/bird/picking/001-003.png",
  ];
  lastGameTicks = 0;
  randomDuration = this.getRandomDuration();
  isPicking = false;
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
    this.phase = "takeoff"; // possible values: 'takeoff', 'flight', 'return'
    this.isFlying = false;
    this.noiseX = 0;
    this.noiseY = 0;
    this.loadImages(this.BIRD_IDLE);
    this.loadImages(this.BIRD_FLY);
    this.loadImages(this.BIRD_PICKING);
  }

  objLoop() {
    if (this.isPicking) {
      this.pickingAnimation();
    } else {
      this.idleAnimation();
    }
    this.setPicking();
  }

  pickingAnimation() {
    this.playAnimation(this.BIRD_PICKING, 280);
  }

  idleAnimation() {
    this.playAnimation(this.BIRD_IDLE, 280);
  }

  getRandomDuration() {
    return Math.floor(Math.random() * (800 - 300 + 1)) + 500;
  }

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
