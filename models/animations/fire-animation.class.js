class FireAnimation extends MovableObject {
  FIRE_IMAGES = [];
  fireSound = new Audio("/audio/objects/fire/fire-sound.mp3");

  loadFireImages() {
    for (let i = 88; i >= 0; i--) {
      i < 10
        ? this.FIRE_IMAGES.push(`/img/animations/fire/00${i}.png`)
        : this.FIRE_IMAGES.push(`/img/animations/fire/0${i}.png`);
    }
  }
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
