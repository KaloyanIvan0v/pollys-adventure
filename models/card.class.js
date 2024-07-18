class Card extends ThrowableObject {
  hitObject = false;
  EXPLODE_ANIMATION = [];

  explodeSound = new Audio("/audio/objects/card-cannon/blub.mp3");
  /**
   * Loads paths to images for the card explosion animation into the EXPLODE_ANIMATION array.
   */
  loadExplodeImages() {
    for (let i = 53; i >= 0; i--) {
      i < 10
        ? this.EXPLODE_ANIMATION.push(`/img/animations/card-explosion/00${i}.png`)
        : this.EXPLODE_ANIMATION.push(`/img/animations/card-explosion/0${i}.png`);
    }
  }

  /**
   * Constructor for Card object.
   * @param {number} x - Initial x-coordinate.
   * @param {number} y - Initial y-coordinate.
   * @param {number} speedX - Initial horizontal speed.
   * @param {number} speedY - Initial vertical speed.
   * @param {number} fallSpeed - Speed at which the card falls.
   */
  constructor(x, y, speedX, speedY, fallSpeed) {
    super(x, y, speedX, speedY, fallSpeed);
    this.loadExplodeImages();
    this.loadImages(this.EXPLODE_ANIMATION);
    this.loadImg("/img/objects/card/003-000.png");
    this.width = 25;
    this.height = 25;
  }

  /**
   * Main loop function for the Card's behavior.
   */
  objLoop() {
    this.applyGravity(0.5);
    this.throw();
    if (this.hitObject) {
      if (this.animationStillRunning()) {
        this.explodeAnimation();
        this.playLastSound(this.explodeSound);
        setTimeout(() => {
          this.alreadyDead = true;
        }, 70);
      }
    }
  }

  /**
   * Checks if the Card is colliding with any items in the given array and reduces their energy.
   * @param {Array<any>} array - Array of items to check collision against.
   * @returns {boolean} - True if colliding with any item, false otherwise.
   */
  isCollidingWith(array) {
    let collided = false;
    array.forEach((item) => {
      if (this.isColliding(item)) {
        item.energy -= 100;
        collided = true;
      }
    });
    return collided;
  }

  /**
   * Plays the card explosion animation.
   */
  explodeAnimation() {
    this.playAnimation(this.EXPLODE_ANIMATION, 0.001);
  }

  checkIfCardCollidingWithEnemies() {
    world.level.enemies.forEach((enemy) => {
      if (this.isColliding(enemy) && this.harmful && !enemy.alreadyDead) {
        const currentTime = Date.now();
        if (!enemy.lastHitTime || currentTime - enemy.lastHitTime >= 1000) {
          this.hitObject = true;
          enemy.energy -= 100;
          if (enemy.energy <= 0) {
            enemy.energy = 0;
            enemy.harmful = false;
          }
          enemy.lastHitTime = currentTime;
        }
      }
    });
  }

  /**
   * Checks if a thrown card collides with the ground and handles its effects accordingly.
   * @param {Card} object - The card object to check collisions for.
   */
  checkIfCollidingWithGround() {
    if (this instanceof Card && !this.isAboveGround()) {
      this.hitObject = true;
      if (this.alreadyDead) {
        world.throwableObjects.splice(world.throwableObjects.indexOf(this), 1);
      }
    }
  }
}
