/**
 * Class representing a status bar image, extending DrawableObject.
 * @extends DrawableObject
 */
class StatusBarImg extends DrawableObject {
  x = 0;
  y = 0;
  width = 32;
  height = 32;

  /**
   * Create a StatusBarImg object.
   * @param {number} x - The x-coordinate of the status bar image.
   * @param {number} y - The y-coordinate of the status bar image.
   * @param {string} imgPath - The path to the image.
   */
  constructor(x, y, imgPath) {
    super();
    this.x = x;
    this.y = y;
    this.loadImg(imgPath);
  }
}
