class Bomb extends ThrowableObject {
  world;
  IMAGE_IDLE = ["/img/objects/bomb/idle/0.png", "/img/objects/bomb/idle/1.png"];
  IMAGE_THROW = ["/img/objects/bomb/active/0.png", "/img/objects/bomb/active/1.png"];
  bomb_explosion = new Audio("/audio/objects/bomb/bomb-explosion.mp3");
  bomb_hit_slime = new Audio("/audio/enemy/small/dead.mp3");
  IMAGE_EXPLODE = [];

  constructor(x, y, speedX, speedY, fallSpeed, world) {
    super(x, y, speedX, speedY, fallSpeed);
    this.generateImgPathArray(this.IMAGE_EXPLODE, 64, "/img/animations/bomb-explosion");
    this.loadImg("/img/objects/bomb/idle/0.png");
    this.loadImages(this.IMAGE_EXPLODE);
    this.height = 35;
    this.width = 35;
    this.harmful = true;
    this.world = world;
  }

  objLoop() {
    this.ifBombHitGround() ? this.bombExplode() : this.bombDoNotExplode();
    this.adjustSoundVolumeByDistance(this.world.character, this);
  }

  explodeAnimation() {
    if (this.animationStillRunning()) {
      this.playAnimation(this.IMAGE_EXPLODE, 0.08);
      this.playLastSound(this.bomb_explosion, 0.3, soundVolumeGame);
    } else {
      this.explodedBombState();
    }
  }

  explodedBombState() {
    this.harmful = false;
    this.alreadyDead = true;
  }

  ifBombHitGround() {
    if (!this.isAboveGround() && !this.ifBombFallOnSlime() && this.harmful) {
      return true;
    } else {
      return false;
    }
  }

  bombExplode() {
    this.y = 400;
    this.energy = 0;
    this.explodeAnimation();
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
}
