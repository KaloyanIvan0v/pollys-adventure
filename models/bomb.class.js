class Bomb extends ThrowableObject {
  IMAGE_IDLE = ["/img/objects/bomb/idle/0.png", "/img/objects/bomb/idle/1.png"];
  IMAGE_EXPLODE = [];
  IMAGE_THROW = ["/img/objects/bomb/active/0.png", "/img/objects/bomb/active/1.png"];
  world;
  loadExplodeImages() {
    for (let i = 62; i >= 0; i--) {
      i < 10
        ? this.IMAGE_EXPLODE.push(`/img/animations/bomb-explosion/00${i}.png`)
        : this.IMAGE_EXPLODE.push(`/img/animations/bomb-explosion/0${i}.png`);
    }
  }

  bomb_explosion = new Audio("/audio/objects/bomb/bomb-explosion.mp3");

  constructor(x, y, speedX, speedY, fallSpeed, world) {
    super(x, y, speedX, speedY, fallSpeed);
    this.harmful = true;
    this.world = world;
    this.loadExplodeImages();
    this.loadImg("/img/objects/bomb/idle/0.png");
    this.loadImages(this.IMAGE_EXPLODE);
    this.height = 35;
    this.width = 35;
    setInterval(() => {
      this.ifBombHitGround();
      this.animate();
    }, 1000 / 30);
  }

  ifBombHitGround() {
    if (!this.isAboveGround() && !this.ifBombFallOnSlime()) {
      this.playSound(this.bomb_explosion, 0.3);
      this.y = 400;
      this.energy = 0;
      setTimeout(() => {
        this.harmful = false;
      }, 400);
    } else {
    }
  }

  ifBombFallOnSlime() {
    let bombOnSlime = false;
    this.world.level.enemies.forEach((enemy) => {
      if (this.isColliding(enemy)) {
        enemy.alreadyDead ? (bombOnSlime = true) : (bombOnSlime = false);
      }
    });
    return bombOnSlime;
  }

  animate() {
    if (!this.isDead()) {
    } else {
      if (this.currentImg < this.IMAGE_EXPLODE.length) {
        this.loadImg(this.IMAGE_EXPLODE[this.currentImg]);
        this.currentImg++;
      } else {
        this.alreadyDead = true;
        this.stopSound(this.bomb_explosion);
      }
    }
  }

  animateExplode() {
    this.playAnimation(this.IMAGE_EXPLODE, 0.01);
  }
}
