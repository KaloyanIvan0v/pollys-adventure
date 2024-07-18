/**
 * Class representing the ground in the game.
 * @extends MovableObject
 */
class Ground extends MovableObject {
  /**
   * Creates a new ground object.
   */
  constructor() {
    super();
  }

  /**
   * Renders the ground with predefined dimensions and position.
   */
  renderGround() {
    this.width = 50;
    this.height = 50;
    this.loadImg("/img/background/ground/ground.png");
    this.y = 430;
    this.x = 0;
  }
}
