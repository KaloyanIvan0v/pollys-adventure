class EndBoss extends MovableObject {
  IMG_WALKING = [
    "/img/characters/enemy/big/walk/1.png",
    "/img/characters/enemy/big/walk/2.png",
    "/img/characters/enemy/big/walk/3.png",
    "/img/characters/enemy/big/walk/4.png",
    "/img/characters/enemy/big/walk/5.png",
    "/img/characters/enemy/big/walk/6.png",
  ];

  y = 280;
  x = 700;

  constructor() {
    super().loadImg(this.IMG_WALKING[0]);
    this.loadImages(this.IMG_WALKING);
    this.speed = 0.2 + Math.random() * 0.5;
    this.animate();

    this.height = 150;
    this.width = 150;
  }
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMG_WALKING, 120);
    }, 200);
    setInterval(() => {
      this.moveLeft(1);
    }, 1000 / 60);
  }
}
