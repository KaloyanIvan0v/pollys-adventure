class SmallEnemy extends MovableObject {
  IMAGES_WALKING = [
    "/img/characters/enemy/small/walk/1.png",
    "/img/characters/enemy/small/walk/2.png",
    "/img/characters/enemy/small/walk/3.png",
    "/img/characters/enemy/small/walk/4.png",
    "/img/characters/enemy/small/walk/5.png",
  ];

  IMAGES_DEAD = [
    "/img/characters/enemy/small/death/1.png",
    "/img/characters/enemy/small/death/2.png",
    "/img/characters/enemy/small/death/3.png",
    "/img/characters/enemy/small/death/4.png",
    "/img/characters/enemy/small/death/5.png",
  ];

  deadSound = new Audio("/audio/enemy/small/dead.mp3");
  movingSound = new Audio("/audio/enemy/small/walk.mp3");

  constructor() {
    super().loadImg("/img/characters/enemy/small/walk/1.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.setRandomXPosition();
    this.setRandomXSpeed();
    this.height = 60;
    this.width = 60;
    this.y = 372;
    this.harmful = true;
    this.speedX = 0.45;
  }

  animate(targetObj) {
    this.handleObjMovement();
    this.handleObjAnimation();
    this.adjustSoundVolumeByDistance(targetObj, this);
  }

  handleObjMovement() {
    this.moveLeft(1, true);
  }

  handleObjAnimation() {
    if (this.isDead()) {
      this.playAnimationOnce(this.IMAGES_DEAD, 55, this.movingSound);
    } else {
      this.playAnimation(this.IMAGES_WALKING, 120);
      this.playSound(this.movingSound, 1, soundVolumeGame);
    }
  }

  hitFromTop() {
    this.speedX = 0;
    this.width = 60;
    this.height = 60;
    this.animate(this.IMAGES_DEAD, 120);
  }

  kill() {
    this.playSound(this.deadSound, 1, soundVolumeGame);
    this.energy = 0;
    this.speedX = 0;
    this.collectable = true;
    this.harmful = false;
  }
}
