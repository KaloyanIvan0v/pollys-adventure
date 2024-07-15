class EndBoss extends MovableObject {
  IMG_WALKING = [
    "/img/characters/enemy/big/walk/0.png",
    "/img/characters/enemy/big/walk/1.png",
    "/img/characters/enemy/big/walk/2.png",
    "/img/characters/enemy/big/walk/3.png",
  ];

  IMG_DEAD = [
    "/img/characters/enemy/big/death/slime-die-0.png",
    "/img/characters/enemy/big/death/slime-die-1.png",
    "/img/characters/enemy/big/death/slime-die-2.png",
    "/img/characters/enemy/big/death/slime-die-3.png",
  ];

  IMG_HURT = [
    "/img/characters/enemy/big/hurt/slime-hurt-0.png",
    "/img/characters/enemy/big/hurt/slime-hurt-1.png",
    "/img/characters/enemy/big/hurt/slime-hurt-2.png",
    "/img/characters/enemy/big/hurt/slime-hurt-3.png",
  ];

  y = 100;
  x = 4100;
  speedX = 0.5;
  speedY = 0;
  energy = 800;
  lastSpawnTime = 0;
  lastEnergieState = 1000;

  spawnSound = new Audio("/audio/enemy/small/spawn.mp3");
  deadSound = new Audio("/audio/enemy/big/end-bood.die.mp3");

  constructor() {
    super().loadImg(this.IMG_WALKING[0]);
    this.loadImages(this.IMG_WALKING);
    this.loadImages(this.IMG_DEAD);
    this.loadImages(this.IMG_HURT);
    this.speed = 0.2 + Math.random() * 0.5;
    this.height = 350;
    this.width = 350;
    this.harmful = true;
  }
  objLoop() {
    if (!gamePaused && world != undefined) {
      this.adjustSoundVolumeByDistance(world.character, this);
      this.checkIfHurt();

      if (this.energy == 0 && !this.alreadyDead) {
        this.deadAnimation();
        this.playLastSound(this.deadSound, 1, soundVolumeGame);
      } else if (this.hurt) {
        this.lastEnergieState = this.energy;
        this.hurtAnimation();
      } else if (this.energy > 0) {
        this.walkAnimation();
        this.spawnEveryTwoSecond();
        this.collidingWithCharacter();
      }
    }
  }

  hurtAnimation() {
    this.playAnimation(this.IMG_HURT, 200);
  }

  walkAnimation() {
    this.playAnimation(this.IMG_WALKING, 300);
    this.x = this.x - this.speed;
  }

  deadAnimation() {
    this.playAnimationOnce(this.IMG_DEAD, 300);
  }

  generateSmallEnemies() {
    let smallEnemies = new SmallEnemy();
    smallEnemies.setSpawnPosition(this.x + 50, 290, 1.8, 3, 1);
    world.level.enemies.push(smallEnemies);
    this.playSound(this.spawnSound, 0.3, soundVolumeGame);
  }

  spawnEveryTwoSecond() {
    let currentTime = new Date().getTime();
    if (currentTime - this.lastSpawnTime >= 1800) {
      this.generateSmallEnemies();
      this.lastSpawnTime = currentTime;
    }
  }

  collidingWithCharacter() {
    if (this.isColliding(world.character)) {
      world.character.energy = 0;
    } else {
    }
  }

  checkIfHurt() {
    if (this.energy < this.lastEnergieState) {
      this.hurt = true;
      this.lastEnergieState = this.energy;
      setTimeout(() => {
        this.hurt = false;
      }, 200);
    } else {
    }
  }

  handleDead() {}

  kill() {
    this.harmful = false;
  }
}
