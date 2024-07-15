class ThrowableObject extends MovableObject {
  fallSpeed = 500 / this.fallSpeed;
  constructor(x, y, speedX, speedY, fallSpeed) {
    super();
    this.x = x;
    this.y = y;
    this.width = 25;
    this.height = 25;
    this.speedX = speedX;
    this.speedY = speedY;
    this.fallSpeed = fallSpeed;
    this.onGround = false;
  }

  throw() {
    if (!gamePaused) {
      if (this.isAboveGround()) {
        this.x += this.speedX;
      } else {
        this.speedX = 0;
        this.speedY = 0;
      }
    }
  }
}
