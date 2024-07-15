class DecorationObject extends MovableObject {
  OBJECT_IMG = [];
  objSound;

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

  objLoop() {
    this.playSound(this.objSound, 0.3, soundVolumeGame);
    this.adjustSoundVolumeByDistance(world.character, this);
    // this.rotateImg(this, this.loadImg(this.OBJECT_IMG), 45);
  }
}
