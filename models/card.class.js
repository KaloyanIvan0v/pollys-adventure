class Card extends ThrowableObject {
  hitObject = false;
  EXPLODE_ANIMATION = [];
  explodeSound = new Audio("/audio/objects/card-cannon/blub.mp3");
  loadExplodeImages() {
    for (let i = 53; i >= 0; i--) {
      i < 10
        ? this.EXPLODE_ANIMATION.push(`/img/animations/card-explosion/00${i}.png`)
        : this.EXPLODE_ANIMATION.push(`/img/animations/card-explosion/0${i}.png`);
    }
  }

  constructor(x, y, speedX, speedY, fallSpeed) {
    super(x, y, speedX, speedY, fallSpeed);
    this.loadExplodeImages();
    this.loadImages(this.EXPLODE_ANIMATION);
    this.loadImg("/img/objects/card/003-000.png");
    this.width = 25;
    this.height = 25;
    setInterval(() => {
      if (!gamePaused) {
        this.animate();
      }
    });
  }

  animate() {
    if (this.hitObject) {
      if (!this.animationRunOnce) {
        this.explodeAnimation();
        this.playSound(this.explodeSound);
      } else {
        this.alreadyDead = true;
      }
    }
  }

  isCollidingWith(array) {
    array.forEach((item) => {
      if (this.isColliding(item)) {
        item.energy -= 100;
        return true;
      }
    });
    return false;
  }

  explodeAnimation() {
    this.playAnimation(this.EXPLODE_ANIMATION, 0.08);
  }
}
