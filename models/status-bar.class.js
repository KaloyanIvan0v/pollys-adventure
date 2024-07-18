/**
 * Class representing a health status bar.
 * @extends DrawableObject
 */
class StatusBar extends DrawableObject {
  /**
   * Array of image paths representing different health bar percentages.
   * @type {string[]}
   */
  HEALTH_BAR = [
    "/img/GUI/health-bar/100.png",
    "/img/GUI/health-bar/80.png",
    "/img/GUI/health-bar/60.png",
    "/img/GUI/health-bar/40.png",
    "/img/GUI/health-bar/20.png",
    "/img/GUI/health-bar/0.png",
  ];

  /**
   * Current percentage value of the health bar.
   * @type {number}
   */
  percentage = 100;

  /**
   * Constructs a StatusBar object.
   * @param {number} x - The x-coordinate of the status bar.
   * @param {number} y - The y-coordinate of the status bar.
   * @param {number} startPercentageValue - The initial percentage value of the health bar.
   */
  constructor(x, y, startPercentageValue) {
    super();
    this.x = x;
    this.y = y;
    this.width = 150;
    this.height = 45;
    this.percentage = startPercentageValue;
    this.loadImages(this.HEALTH_BAR);
    this.setPercentage(startPercentageValue);
  }

  /**
   * Sets the percentage value of the health bar.
   * @param {number} percentage - The new percentage value (0-100).
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.HEALTH_BAR[this.resolvePercentage()];
    this.img = this.imgCache[path];
  }

  /**
   * Resolves the current percentage value to an index in the HEALTH_BAR array.
   * @returns {number} Index representing the current health bar image.
   */
  resolvePercentage() {
    if (this.percentage == 100) {
      return 0;
    } else if (this.percentage > 80) {
      return 1;
    } else if (this.percentage > 60) {
      return 2;
    } else if (this.percentage > 40) {
      return 3;
    } else if (this.percentage > 20) {
      return 4;
    } else {
      return 5;
    }
  }
}
