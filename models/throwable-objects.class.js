/**
 * Class representing a throwable object, extending MovableObject.
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {
  fallSpeed = 500 / this.fallSpeed;

  /**
   * Create a ThrowableObject.
   * @param {number} x - The x-coordinate of the throwable object.
   * @param {number} y - The y-coordinate of the throwable object.
   * @param {number} speedX - The horizontal speed of the throwable object.
   * @param {number} speedY - The vertical speed of the throwable object.
   * @param {number} fallSpeed - The speed at which the object falls.
   */
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

  /**
   * Method to throw the object.
   */
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
