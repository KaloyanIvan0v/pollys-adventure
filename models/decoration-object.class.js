class DecorationObject extends MovableObject {
  OBJECT_IMG = [];
  objSound;

  /**
   * Creates a new decoration object.
   * @param {number} x - The x-coordinate of the object.
   * @param {number} y - The y-coordinate of the object.
   * @param {number} width - The width of the object.
   * @param {number} height - The height of the object.
   * @param {Array<string>} OBJECT_IMG - The array of image paths for the object.
   * @param {string} soundPath - The path to the sound file for the object.
   */
  constructor(x, y, width, height, OBJECT_IMG, soundPath) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.OBJECT_IMG = OBJECT_IMG;
    this.loadImg(this.OBJECT_IMG);
    this.objSound = new Audio(soundPath);
  }

  /**
   * Main loop function that updates the decoration object's state.
   */
  objLoop() {
    this.playSound(this.objSound, 0.3, soundVolumeGame);
    this.adjustSoundVolumeByDistance(world.character, this);
  }
}
