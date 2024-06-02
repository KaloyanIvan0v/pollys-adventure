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
  walkSound = new Audio("/audio/enemy/small/walk.mp3");

  constructor() {
    super().loadImg("/img/characters/enemy/small/walk/1.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 300 + Math.random() * 4000;
    this.speed = 0.2 + Math.random() * 0.5;
    this.height = 60;
    this.width = 60;
    this.y = 372;
    this.harmful = true;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft(1, true);
    }, 1000 / 60);

    setInterval(() => {
      if (this.isDead()) {
        if (!this.alreadyDead) {
          if (this.currentImg % this.IMAGES_DEAD.length < 4) {
            this.playAnimation(this.IMAGES_DEAD, 10);
          } else {
            this.alreadyDead = true;
            this.stopSound(this.walkSound);
          }
        }
      } else {
        this.playAnimation(this.IMAGES_WALKING, 120);
        this.playSound(this.walkSound);
      }
    }, 120);
  }

  hitFromTop() {
    this.speed = 0;
    this.width = 60;
    this.height = 60;
    this.animate(this.IMAGES_DEAD, 120);
  }

  kill() {
    this.playSound(this.deadSound);
    this.currentImg = 0;
    this.harmful = false;
    this.energy = 0;
    this.speed = 0;
  }
}
