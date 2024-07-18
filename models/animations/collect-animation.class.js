class CollectAnimation extends DrawableObject {
  ITEM_IMG = [];
  height = 72;
  width = 72;
  endPositionReached = false;

  /**
   * Constructs a new CollectAnimation object.
   * @param {number} x - The initial x-coordinate position.
   * @param {number} y - The initial y-coordinate position.
   * @param {number} width - The width of the animation object.
   * @param {number} height - The height of the animation object.
   * @param {string} imgPath - The path to the image file for the animation.
   */
  constructor(x, y, width, height, imgPath) {
    super();
    this.x = x + 20;
    this.y = y;
    this.height = height;
    this.width = width;
    this.loadImg(imgPath);
    world.animations.push(this);
  }

  /**
   * Updates the position of the animation object based on game conditions.
   * Moves towards the character's position until reaching the final position.
   */
  objLoop() {
    if (!gamePaused && world != undefined) {
      // Move animation towards character's x position
      this.x + 120 > world.character.x ? (this.x -= 7) : null;

      // Move animation towards character's y position, adjusted for game mechanics
      this.y + 295 > world.character.y ? (this.y -= 7 * 1.7) : (this.endPositionReached = true);

      this.endPositionReached ? world.animations.splice(world.animations.indexOf(this), 1) : null;
    }
  }
}
