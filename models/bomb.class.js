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
  bomb_hit_slime = new Audio("/audio/enemy/small/dead.mp3");

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
      if (!gamePaused) {
        this.ifBombHitGround();
        this.animate();
        this.adjustSoundVolumeByDistance(this.world.character, this);
      }
    }, 1000 / 30);
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

  ifBombHitGround() {
    if (!this.isAboveGround() && !this.ifBombFallOnSlime() && this.harmful) {
      this.bombExplode();
    } else {
      this.bombDoNotExplode();
    }
  }

  bombExplode() {
    this.playSound(this.bomb_explosion, 0.3, soundVolumeGame);
    this.y = 400;
    this.energy = 0;
    setTimeout(() => {
      this.harmful = false;
    }, 400);
  }

  bombDoNotExplode() {
    if (this.ifBombFallOnSlime()) {
      if (this.harmful) {
        this.y = 430 - this.height;
        this.playSound(this.bomb_hit_slime, 1, soundVolumeGame);
      }
      this.harmful = false;
      this.collectable = true;
    }
  }

  ifBombFallOnSlime() {
    let bombOnSlime = false;
    this.world.level.enemies.forEach((enemy) => {
      if (this.isColliding(enemy)) {
        if (this.x > enemy.x - 10 && this.x + this.width < enemy.x + enemy.width + 10) {
          enemy.alreadyDead ? (bombOnSlime = true) : (bombOnSlime = false);
        }
      }
    });
    return bombOnSlime;
  }

  animateExplode() {
    this.playAnimation(this.IMAGE_EXPLODE, 0.01);
  }
}
