class Bomb extends ThrowableObject {
  /**
   * Reference to the world object where the bomb exists.
   * @type {World}
   */
  world;

  /**
   * Array of paths to bomb idle animation images.
   * @type {string[]}
   */
  IMAGE_IDLE = ["/img/objects/bomb/idle/0.png", "/img/objects/bomb/idle/1.png"];

  /**
   * Array of paths to bomb active (thrown) animation images.
   * @type {string[]}
   */
  IMAGE_THROW = ["/img/objects/bomb/active/0.png", "/img/objects/bomb/active/1.png"];

  /**
   * Array of paths to bomb explosion animation images.
   * @type {string[]}
   */
  IMAGE_EXPLODE = [];

  /**
   * Audio object for bomb explosion sound.
   * @type {Audio}
   */
  bomb_explosion = new Audio("/audio/objects/bomb/bomb-explosion.mp3");

  /**
   * Audio object for bomb hitting slime sound.
   * @type {Audio}
   */
  bomb_hit_slime = new Audio("/audio/enemy/small/dead.mp3");

  /**
   * Constructs a Bomb instance.
   * @param {number} x - The initial x-coordinate of the bomb.
   * @param {number} y - The initial y-coordinate of the bomb.
   * @param {number} speedX - The initial speed in the x-direction.
   * @param {number} speedY - The initial speed in the y-direction.
   * @param {number} fallSpeed - The falling speed of the bomb.
   * @param {World} world - The world object where the bomb exists.
   */
  constructor(x, y, speedX, speedY, fallSpeed, world) {
    super(x, y, speedX, speedY, fallSpeed);
    this.generateImgPathArray(this.IMAGE_EXPLODE, 64, "/img/animations/bomb-explosion");
    this.loadImg("/img/objects/bomb/idle/0.png");
    this.loadImages(this.IMAGE_EXPLODE);
    this.height = 35;
    this.width = 35;
    this.harmful = true;
    this.world = world;
  }

  /**
   * Main loop function for the bomb object.
   */
  objLoop() {
    this.ifBombHitGround() ? this.bombExplode() : this.bombDoNotExplode();
    this.adjustSoundVolumeByDistance(this.world.character, this);
    this.applyGravity(0.2);
    this.throw();
  }

  /**
   * Plays the explosion animation and sound when the bomb explodes.
   */
  explodeAnimation() {
    if (this.animationStillRunning()) {
      this.playAnimation(this.IMAGE_EXPLODE, 0.02);
      this.playLastSound(this.bomb_explosion, 0.3, soundVolumeGame);
    } else {
      this.explodedBombState();
    }
  }

  /**
   * Sets the bomb state to exploded after animation completes.
   */
  explodedBombState() {
    this.harmful = false;
    this.alreadyDead = true;
  }

  /**
   * Checks if the bomb has hit the ground.
   * @returns {boolean} - True if the bomb has hit the ground, false otherwise.
   */
  ifBombHitGround() {
    if (!this.isAboveGround() && !this.ifBombFallOnSlime() && this.harmful) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Executes bomb explosion logic.
   */
  bombExplode() {
    this.y = 400; // Adjust y-position for explosion effect
    this.energy = 0; // Stop movement
    this.explodeAnimation(); // Play explosion animation
  }

  /**
   * Executes logic when bomb does not explode (lands on slime).
   */
  bombDoNotExplode() {
    if (this.ifBombFallOnSlime()) {
      if (this.harmful) {
        this.y = 430 - this.height; // Adjust y-position for slime impact
        this.playSound(this.bomb_hit_slime, 1, soundVolumeGame); // Play slime impact sound
      }
      this.harmful = false; // Bomb is no longer harmful
      this.collectable = true; // Bomb becomes collectable
    }
  }

  /**
   * Checks if the bomb has fallen on slime enemies.
   * @returns {boolean} - True if bomb has fallen on slime, false otherwise.
   */
  ifBombFallOnSlime() {
    let bombOnSlime = false;
    this.world.level.enemies.forEach((enemy) => {
      if (this.isColliding(enemy)) {
        if (this.x > enemy.x - 10 && this.x + this.width < enemy.x + enemy.width + 10) {
          enemy.alreadyDead ? (bombOnSlime = true) : (bombOnSlime = false);
        }
      }
    });
    return bombOnSlime;
  }
}
