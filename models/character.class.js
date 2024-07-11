class Character extends MovableObject {
  IMAGES_WALKING = [
    "/img/characters/dog/walk/005-005.png",
    "/img/characters/dog/walk/005-006.png",
    "/img/characters/dog/walk/005-007.png",
    "/img/characters/dog/walk/005-007.png",
    "/img/characters/dog/walk/005-009.png",
    "/img/characters/dog/walk/005-010.png",
  ];

  IMAGES_DEATH = [
    "/img/characters/dog/death/002-003.png",
    "/img/characters/dog/death/002-004.png",
    "/img/characters/dog/death/002-005.png",
    "/img/characters/dog/death/002-006.png",
  ];

  IMAGES_IDLE = [
    "/img/characters/dog/idle/004-000.png",
    "/img/characters/dog/idle/004-001.png",
    "/img/characters/dog/idle/004-002.png",
    "/img/characters/dog/idle/004-003.png",
  ];

  IMAGES_JUMP_UP = ["/img/characters/dog/walk/005-009.png", "/img/characters/dog/walk/005-009.png"];
  IMAGES_JUMP_DOWN = [
    "/img/characters/dog/walk/005-006.png",
    "/img/characters/dog/walk/005-006.png",
  ];

  walking_sound = new Audio("/audio/dog-runs.mp3");
  jump_sound = new Audio("/audio/dog-jump.mp3");
  idle_sound = new Audio("/audio/dog-breath.mp3");
  greetingSound = new Audio("/audio/dog/dog-start-game-sound.wav");
  pickup_sound = new Audio("/audio/dog/pick.wav");
  walking;
  alreadyWalking = false;
  canTakeDamage = true;
  cardAmount = 0;
  cardPercent = 0;

  constructor() {
    super().loadImg("/img/characters/dog/idle/004-000.png");
    this.y = 280;
    this.x = -440;
    this.speedX = 0.34;
    this.playSound(this.greetingSound);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEATH);
    this.applyGravity(40);
  }

  animate() {
    this.handleCharacterAnimation();
    this.handleCharacterMovement();
    this.setPlayerViewPoint(145);
  }

  resetCharacter() {
    this.alreadyDead = false;
    this.energy = 100;
    this.speedY = 0;
    this.speedX = 0.34;
    this.flipImg = false;
    this.x = -440;
    this.y = 280;
  }

  handleCharacterMovement() {
    if ((this.world.keyboard.LEFT || moveLeft) && this.x > -500) {
      this.characterMoveLeft();
    } else if ((this.world.keyboard.RIGHT || moveRight) && this.x < this.world.level.level_end_x) {
      this.characterMoveRight();
    } else {
      this.stopSound(this.walking_sound);
      this.playSound(this.idle_sound, 0.5, soundVolumeGame);
    }
    if ((this.world.keyboard.SPACE || moveUp) && !this.isAboveGround()) {
      this.characterJumps();
    }
  }

  characterMoveLeft() {
    this.moveLeft(8, true);
    this.playSound(this.walking_sound, 1, soundVolumeGame);
    this.stopSound(this.idle_sound);
  }

  characterMoveRight() {
    this.moveRight(8);
    this.playSound(this.walking_sound, 1, soundVolumeGame);
    this.stopSound(this.idle_sound);
  }

  characterJumps() {
    this.playSound(this.jump_sound, 1, soundVolumeGame);
    this.stopSound(this.idle_sound);
    this.jump();
  }

  collectObj() {
    if (this.isColliding()) {
    }
  }

  handleCharacterAnimation() {
    if (this.isDead()) {
      this.playAnimationOnce(this.IMAGES_DEATH, 200);
    } else if (this.isJump()) {
      this.jumpAnimation();
    } else {
      if (this.characterMovesLeftOrRight()) {
        this.playAnimation(this.IMAGES_WALKING, 80);
      } else {
        this.playAnimation(this.IMAGES_IDLE, 240);
      }
    }
  }
  setPlayerViewPoint(position_x) {
    this.world.camera_x = -this.x + position_x;
  }

  hurt(harmful) {
    if (this.energy > 0 && harmful) {
      this.energy = this.energy - 0.5;
    }
  }

  jumpAnimation() {
    if (this.speedY > 0) {
      this.playAnimation(this.IMAGES_JUMP_UP, 200);
    } else {
      this.playAnimation(this.IMAGES_JUMP_DOWN, 200);
    }
  }

  characterMovesLeftOrRight() {
    return this.world.keyboard.RIGHT || this.world.keyboard.LEFT || moveRight || moveLeft
      ? true
      : false;
  }

  characterIsColliding() {
    return this.currentCollisionState;
  }

  checkCollisionsWith() {
    this.collisionDetected = false;
    this.world.level.enemies.forEach((enemy) => {
      if (this.isColliding(enemy)) {
        this.isItJumpOnEnemy(enemy);
        this.world.statusBarHealth.setPercentage(this.energy);
        if (!this.isAboveGround()) {
          this.hurt(enemy.harmful);
        }
        enemy.harmful ? (this.collisionDetected = true) : null;
      }
    });
    this.currentCollisionState = this.collisionDetected;
  }

  isItJumpOnEnemy(enemy) {
    if (this.y + this.height < enemy.y + enemy.height * 0.8 && this.speedY <= 0) {
      enemy.kill();
    }
  }

  areaDamage(throwableObjects) {
    const explosionRadius = 90;
    const damage = 50;
    throwableObjects.forEach((obj) => {
      if (!obj.isAboveGround()) {
        const distance = this.calculateDistance(this, obj);
        this.applyDamageIfWithinExplosionRadius(obj, distance, explosionRadius, damage);
      }
    });
  }

  applyDamageIfWithinExplosionRadius(obj, distance, explosionRadius, damage) {
    if (distance <= explosionRadius && this.canTakeDamage && obj.harmful && this.energy > 0) {
      this.energy -= damage;
      this.canTakeDamage = false;
      this.setCharacterVulnerable(5000);
    }
  }

  setCharacterVulnerable(time) {
    setTimeout(() => {
      this.canTakeDamage = true;
    }, time);
  }

  checkForCollectibleItems(throwableObjects) {
    if (throwableObjects.length > 0) {
      throwableObjects.forEach((obj) => {
        if (this.isColliding(obj)) {
          if (obj.collectable) {
            throwableObjects.splice(throwableObjects.indexOf(obj), 1);
            obj instanceof Bomb ? null : this.handlePickupItem();
          }
        }
      });
    }
  }

  handlePickupItem() {
    this.animateCollectToBar();
    this.increaseCardAmount();
    this.playSound(this.pickup_sound);
  }

  increaseCardAmount() {
    if (this.cardAmount < 6) {
      this.cardAmount++;
    }
  }
  calculateCardsPercentage() {
    if (this.cardAmount > 0) {
      this.cardPercent = (this.cardAmount / 6) * 100;
    } else {
      this.cardPercent = 0;
    }
  }

  animateCollectToBar() {
    let collectAnimation = new CollectAnimation(
      this.x,
      this.y,
      20,
      30,
      "/img/objects/card/003-000.png"
    );
    collectAnimation.animate();
  }
}
