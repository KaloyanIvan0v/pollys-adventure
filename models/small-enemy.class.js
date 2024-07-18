/**
 * Class representing a small enemy character that extends MovableObject.
 * @extends MovableObject
 */
class SmallEnemy extends MovableObject {
  /**
   * Array of image paths for walking animation.
   * @type {string[]}
   */
  IMAGES_WALKING = [
    "/img/characters/enemy/small/walk/1.png",
    "/img/characters/enemy/small/walk/2.png",
    "/img/characters/enemy/small/walk/3.png",
    "/img/characters/enemy/small/walk/4.png",
    "/img/characters/enemy/small/walk/5.png",
  ];

  /**
   * Array of image paths for death animation.
   * @type {string[]}
   */
  IMAGES_DEAD = [
    "/img/characters/enemy/small/death/1.png",
    "/img/characters/enemy/small/death/2.png",
    "/img/characters/enemy/small/death/3.png",
    "/img/characters/enemy/small/death/4.png",
    "/img/characters/enemy/small/death/5.png",
  ];

  /**
   * Audio for when the enemy dies.
   * @type {Audio}
   */
  deadSound = new Audio("/audio/enemy/small/dead.mp3");

  /**
   * Audio for when the enemy is moving.
   * @type {Audio}
   */
  movingSound = new Audio("/audio/enemy/small/walk.mp3");

  /**
   * Constructs a new SmallEnemy object.
   * @param {number} x - Initial X position.
   * @param {number} y - Initial Y position.
   * @param {number} speedX - Initial speed along the X-axis.
   * @param {number} speedY - Initial speed along the Y-axis.
   * @param {number} fallSpeed - Fall speed due to gravity.
   */
  constructor(x, y, speedX, speedY, fallSpeed) {
    super().loadImg("/img/characters/enemy/small/walk/1.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.setRandomXPosition();
    this.setRandomXSpeed();
    this.height = 60;
    this.width = 60;
    this.y = 372;
    this.harmful = true;
    this.speedX = 0.45;
    x ? this.setSpawnPosition(x, y, speedX, speedY, fallSpeed) : null;
  }

  /**
   * Logic loop for the SmallEnemy object.
   * Applies gravity, handles movement, animation, and sound volume adjustment.
   */
  objLoop() {
    this.applyGravity(10);
    this.handleObjMovement();
    this.handleObjAnimation();
    this.adjustSoundVolumeByDistance(world.character, this);
  }

  /**
   * Sets the spawn position and initial speeds for the SmallEnemy.
   * @param {number} x - X position.
   * @param {number} y - Y position.
   * @param {number} speedX - Speed along the X-axis.
   * @param {number} speedY - Speed along the Y-axis.
   * @param {number} fallSpeed - Fall speed due to gravity.
   */
  setSpawnPosition(x, y, speedX, speedY, fallSpeed) {
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
    this.fallSpeed = fallSpeed;
  }

  /**
   * Handles the movement of the SmallEnemy.
   * Moves the enemy to the left.
   */
  handleObjMovement() {
    this.moveLeft(1, true);
  }

  /**
   * Handles the animation of the SmallEnemy.
   * Plays the walking animation if not dead, otherwise plays the death animation.
   */
  handleObjAnimation() {
    if (this.isDead()) {
      this.playAnimationOnce(this.IMAGES_DEAD, 55, this.movingSound);
    } else {
      this.playAnimation(this.IMAGES_WALKING, 120);
      this.playSound(this.movingSound, 1, soundVolumeGame);
    }
  }

  /**
   * Simulates the enemy being hit from the top.
   * Stops horizontal movement, sets size, and triggers death animation.
   */
  hitFromTop() {
    this.speedX = 0;
    this.width = 60;
    this.height = 60;
    this.animate(this.IMAGES_DEAD, 120);
  }

  /**
   * Kills the enemy.
   * Plays the death sound, sets energy to zero, makes the enemy non-harmful after a delay.
   */
  kill() {
    this.playSound(this.deadSound, 1, soundVolumeGame);
    this.energy = 0;
    this.speedX = 0;
    setTimeout(() => {
      this.collectable = true;
    }, 500);
    this.harmful = false;
  }
}
