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

  height = 72;
  width = 72;

  walking_sound = new Audio("/audio/dog-runs.mp3");
  jump_sound = new Audio("/audio/dog-jump.mp3");
  idle_sound = new Audio("/audio/dog-breath.mp3");
  greetingSound = new Audio("/audio/dog/dog-start-game-sound.wav");
  pickup_sound = new Audio("/audio/dog/pick.wav");
  throwCard = new Audio("/audio/objects/throw-card.mp3");
  walking;
  alreadyWalking = false;
  canTakeDamage = true;
  cardAmount = 0;
  cardPercent = 0;

  /**
   * Represents a character in the game.
   * @constructor
   */
  constructor() {
    super().loadImg("/img/characters/dog/idle/004-000.png");
    this.y = 255;
    this.x = -450;
    this.speedX = 0.34;
    this.playSound(this.greetingSound);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEATH);
  }

  /**
   * Main loop function that updates the character's state.
   */
  objLoop() {
    this.setPlayerViewPoint(145);
    this.handleCharacterAnimation();
    this.handleCharacterMovement();
    this.checkCollisionsWith();
    this.calculateCardsPercentage();
    this.areaDamage(world.throwableObjects);
    this.checkForCollectibleItems(world.throwableObjects);
    this.applyGravity(0.5);
  }

  /**
   * Resets the character to its initial state.
   */
  resetCharacter() {
    this.alreadyDead = false;
    this.cardAmount = 0;
    this.energy = 100;
    this.speedY = 0;
    this.speedX = 0.34;
    this.flipImg = false;
    this.x = -450;
    this.y = 255;
  }

  /**
   * Handles the character's movement based on keyboard input.
   */
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

  /**
   * Moves the character to the left.
   */
  characterMoveLeft() {
    this.moveLeft(8, true);
    this.playSound(this.walking_sound, 1, soundVolumeGame);
    this.stopSound(this.idle_sound);
  }

  /**
   * Moves the character to the right.
   */
  characterMoveRight() {
    this.moveRight(8);
    this.playSound(this.walking_sound, 1, soundVolumeGame);
    this.stopSound(this.idle_sound);
  }

  /**
   * Makes the character jump.
   */
  characterJumps() {
    this.playSound(this.jump_sound, 1, soundVolumeGame);
    this.stopSound(this.idle_sound);
    this.jump();
  }

  /**
   * Handles object collection when the character collides with an object.
   */
  collectObj() {
    if (this.isColliding()) {
    }
  }

  /**
   * Handles the character's animation based on its state.
   */
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

  /**
   * Sets the player's viewpoint.
   * @param {number} position_x - The x-coordinate for the camera position.
   */
  setPlayerViewPoint(position_x) {
    this.world.camera_x = -this.x + position_x;
  }

  /**
   * Reduces the character's energy when hurt.
   * @param {boolean} harmful - Indicates if the source of the hurt is harmful.
   */
  hurt(harmful) {
    if (this.energy > 0 && harmful) {
      this.energy = this.energy - 2;
    }
  }

  /**
   * Handles the jump animation.
   */
  jumpAnimation() {
    if (this.speedY > 0) {
      this.playAnimation(this.IMAGES_JUMP_UP, 200);
    } else {
      this.playAnimation(this.IMAGES_JUMP_DOWN, 200);
    }
  }

  /**
   * Checks if the character is moving left or right.
   * @returns {boolean} True if the character is moving left or right, false otherwise.
   */
  characterMovesLeftOrRight() {
    return this.world.keyboard.RIGHT || this.world.keyboard.LEFT || moveRight || moveLeft
      ? true
      : false;
  }

  /**
   * Checks if the character is colliding with any object.
   * @returns {boolean} The current collision state.
   */
  characterIsColliding() {
    return this.currentCollisionState;
  }

  /**
   * Checks for collisions with enemies and updates the character's state accordingly.
   */
  checkCollisionsWith() {
    this.collisionDetected = false;
    this.world.level.enemies.forEach((enemy) => {
      if (this.isColliding(enemy)) {
        this.isItJumpOnEnemy(enemy);
        this.world.statusBarHealth.setPercentage(this.energy);
        if (!this.isAboveGround()) {
          this.hurt(enemy.harmful);
        }
        enemy.harmful ? (this.collisionDetected = true) : (this.collisionDetected = false);
      }
    });
    this.currentCollisionState = this.collisionDetected;
  }

  /**
   * Checks if the character jumped on an enemy.
   * @param {Object} enemy - The enemy object.
   */
  isItJumpOnEnemy(enemy) {
    if (this.y + this.height < enemy.y + enemy.height * 0.8 && this.speedY <= 0) {
      enemy.kill();
    }
  }

  /**
   * Applies area damage to objects within the explosion radius.
   * @param {Array} throwableObjects - The array of throwable objects.
   */
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

  /**
   * Applies damage to the character if within the explosion radius.
   * @param {Object} obj - The object causing the explosion.
   * @param {number} distance - The distance from the explosion.
   * @param {number} explosionRadius - The radius of the explosion.
   * @param {number} damage - The amount of damage.
   */
  applyDamageIfWithinExplosionRadius(obj, distance, explosionRadius, damage) {
    if (distance <= explosionRadius && this.canTakeDamage && obj.harmful && this.energy > 0) {
      this.energy -= damage;
      this.canTakeDamage = false;
      this.setCharacterVulnerable(5000);
    }
  }

  /**
   * Sets the character to be vulnerable again after a certain time.
   * @param {number} time - The time in milliseconds after which the character can take damage again.
   */
  setCharacterVulnerable(time) {
    setTimeout(() => {
      this.canTakeDamage = true;
    }, time);
  }

  /**
   * Checks for collectible items and handles their collection.
   * @param {Array} throwableObjects - The array of throwable objects.
   */
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

  /**
   * Handles the item pickup animation and sound.
   */
  handlePickupItem() {
    this.animateCollectToBar();
    this.increaseCardAmount();
    this.playSound(this.pickup_sound);
  }

  /**
   * Increases the amount of collected cards.
   */
  increaseCardAmount() {
    if (this.cardAmount < 10) {
      this.cardAmount++;
    }
  }

  /**
   * Calculates the percentage of collected cards.
   */
  calculateCardsPercentage() {
    if (this.cardAmount > 0) {
      this.cardPercent = (this.cardAmount / 10) * 100;
    } else {
      this.cardPercent = 0;
    }
  }

  /**
   * Animates the collection of an item to the bar.
   */
  animateCollectToBar() {
    new CollectAnimation(this.x, this.y, 20, 30, "/img/objects/card/003-000.png");
  }

  /**
   * Checks conditions for throwing throwable objects (cards) based on player input.
   * Updates game state and reduces card amount when a card is thrown.
   */
  checkThrowableObjects() {
    if ((world.keyboard.T || throwPressed) && !world.alreadyThrown && this.cardAmount > 0) {
      let card = new Card(this.x, this.y, 7, 9, 40);
      card.harmful = true;
      this.playSound(this.throwCard);
      world.throwableObjects.push(card);
      world.alreadyThrown = true;
      this.cardAmount--;
      setTimeout(() => {
        card.collectable = true;
      }, 200);
    }
  }
}
