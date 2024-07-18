/**
 * Class representing a Box, extending MovableObject.
 * @extends MovableObject
 */
class Box extends MovableObject {
  /**
   * Create a Box object.
   */
  constructor() {
    super().loadImg("/img/objects/box/idle/005-000.png");
    this.width = 50;
    this.height = 50;
  }
}
