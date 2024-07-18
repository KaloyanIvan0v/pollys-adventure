class BackgroundObject extends MovableObject {
  /**
   * Constructs a BackgroundObject instance.
   * @param {string[]} imagePath - The path to the image file.
   * @param {number} x_position - The x-coordinate position.
   * @param {number} y_position - The y-coordinate position.
   * @param {number} height - The height of the background object.
   * @param {number} width - The width of the background object.
   */
  constructor(imagePath, x_position, y_position, height, width) {
    super().loadImg(imagePath);
    this.y = y_position;
    this.x = x_position;
    this.height = height;
    this.width = width;
  }
}
