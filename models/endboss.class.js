class EndBoss extends MovableObject {
  IMG_WALKING = [
    "/img/characters/enemy/big/walk/0.png",
    "/img/characters/enemy/big/walk/1.png",
    "/img/characters/enemy/big/walk/2.png",
    "/img/characters/enemy/big/walk/3.png",
  ];

  y = 100;
  x = 1700;
  speedX = 0.5;
  speedY = 0;
  energy = 300;
  lastSpawnTime = 0;

  constructor() {
    super().loadImg(this.IMG_WALKING[0]);
    this.loadImages(this.IMG_WALKING);
    this.speed = 0.2 + Math.random() * 0.5;
    this.height = 350;
    this.width = 350;
    this.harmful = true;
    //this.animate();
  }
  animate() {
    setInterval(() => {
      if (!gamePaused && world != undefined) {
        this.playAnimation(this.IMG_WALKING, 300);
        this.moveLeft(1);
        this.spawnEveryTwoSecond();
      }
    }, 1000 / 60);
  }

  generateSmallEnemies() {
    let smallEnemies = new SmallEnemy();
    smallEnemies.setSpawnPosition(this.x + 50, 300, 1.8, 3, 1);
    world.level.enemies.push(smallEnemies);
  }

  spawnEveryTwoSecond() {
    let currentTime = new Date().getTime();
    if (currentTime - this.lastSpawnTime >= 3000) {
      this.generateSmallEnemies();
      this.lastSpawnTime = currentTime;
    }
  }

  kill() {}
}
