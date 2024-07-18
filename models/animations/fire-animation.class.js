/**
 * Represents a fire animation object in the game, extending from MovableObject.
 */
class FireAnimation extends MovableObject {
  /**
   * Array holding image paths for the fire animation frames.
   * @type {string[]}
   */
  FIRE_IMAGES = [];

  /**
   * Audio object for the fire sound effect.
   * @type {HTMLAudioElement}
   */
  fireSound = new Audio("/audio/objects/fire/fire-sound.mp3");

  /**
   * Loads fire animation images into the FIRE_IMAGES array.
   */
  loadFireImages() {
    for (let i = 88; i >= 0; i--) {
      i < 10
        ? this.FIRE_IMAGES.push(`/img/animations/fire/00${i}.png`)
        : this.FIRE_IMAGES.push(`/img/animations/fire/0${i}.png`);
    }
  }

  /**
   * Constructs a new FireAnimation object.
   * @param {number} x - The initial x-coordinate position.
   * @param {number} y - The initial y-coordinate position.
   * @param {number} width - The width of the fire animation object.
   * @param {number} height - The height of the fire animation object.
   */
  constructor(x, y, width, height) {
    super();
    this.loadImg("/img/animations/fire/000.png");
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.loadFireImages();
    this.loadImages(this.FIRE_IMAGES);
  }

  /**
   * Updates the fire animation object during each game loop iteration.
   * Plays the animation frames, sound effects, and adjusts sound volume based on character proximity.
   */
  objLoop() {
    if (!gamePaused && world != undefined) {
      this.playAnimation(this.FIRE_IMAGES, 0.58);
      this.playSound(this.fireSound, 0.1, soundVolumeGame);
      this.adjustSoundVolumeByDistance(world.character, this);
    } else {
      this.stopSound(this.fireSound);
    }
  }
}
