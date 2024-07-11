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
  }

  objLoop() {
    if (this.hitObject) {
      if (this.animationStillRunning()) {
        this.explodeAnimation();
        this.playLastSound(this.explodeSound);
        setTimeout(() => {
          this.alreadyDead = true;
        }, 70);
      } else {
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
    this.playAnimation(this.EXPLODE_ANIMATION, 0.001);
  }
}
