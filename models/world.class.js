class World {
  ctx;
  canvas;
  keyboard;
  camera_x = 0;
  level = level1;
  character = new Character();
  statusBar = new StatusBar();
  throwableObjects = [];
  collidingEnemies = [];
  backgroundObjects = level1.backgroundObjects;
  alreadyThrown = false;
  lastCtxTranslate = 1;
  lastDropTime = 0;
  randomDropBombDelay = 1000;
  soundAdjusterEnemies;
  drone;

  constructor(canvas, keyboard) {
    this.level.drones.push(new Drone(this));
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.eventLoop();
    this.soundAdjusterEnemies = new Sound(this.character, this.level.enemies);
    this.soundAdjusterThrowableObjects = new Sound(this.character, this.throwableObjects);
  }

  eventLoop() {
    setInterval(() => {
      this.characterCheckCollisions();
      this.checkThrowableObjects();
      this.areaDamage();
      this.checkIfTisUp();
      this.removeExplodedThrownObjects();
      this.initDropBomb();
      this.soundAdjusterEnemies.adjustSoundVolumeByDistance();
      this.soundAdjusterThrowableObjects.adjustSoundVolumeByDistance();
    }, 25);
  }

  removeExplodedThrownObjects() {
    this.removeObject(this.throwableObjects);
  }

  removeObject(array) {
    array.forEach((element) => {
      if (element.alreadyDead) {
        array.splice(array.indexOf(element), 1);
      }
    });
  }

  checkThrowableObjects() {
    if (this.keyboard.T && !this.alreadyThrown) {
      let card = new ThrowableObject(this.character.x, this.character.y, 15, 15, 40);
      this.throwableObjects.push(card);
      this.alreadyThrown = true;
    }
  }

  checkIfTisUp() {
    if (!this.keyboard.T) {
      this.alreadyThrown = false;
    }
  }

  isItJumpOnEnemy(enemy) {
    if (
      this.character.y + this.character.height < enemy.y + enemy.height * 0.8 &&
      this.character.speedY <= 0
    ) {
      enemy.kill();
    }
  }

  characterCheckCollisions() {
    this.character.collisionDetected = false;
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.isItJumpOnEnemy(enemy);
        this.statusBar.setPercentage(this.character.energy);
        if (!this.character.isAboveGround()) {
          this.character.hurt(enemy.harmful);
        }
        enemy.harmful ? (this.character.collisionDetected = true) : null;
      }
    });
    this.character.currentCollisionState = this.character.collisionDetected;
  }

  characterIsNotOnGround() {}

  setWorld() {
    this.character.world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawParallaxBackgroundLayers();

    //area for fixed objects on the screen
    this.addToMap(this.statusBar);
    //end of area for fixed objects on the screen

    this.ctx.translate(this.camera_x, 0);
    this.addObjToMap(this.level.drones);
    this.addObjToMap(this.level.enemies);
    this.addToMap(this.character);
    this.addObjToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);

    this.setAnimationLoop();
  }

  setAnimationLoop() {
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  drawParallaxBackgroundLayers() {
    this.drawObjectWithCameraOffset(this.level.backgroundObjects1, 1);
    this.drawObjectWithCameraOffset(this.level.backgroundObjects2, 0.4);
    this.drawObjectWithCameraOffset(this.level.backgroundObjects3, 0.6);
    this.drawObjectWithCameraOffset(this.level.backgroundObjects4, 0.8);
    this.drawObjectWithCameraOffset(this.level.backgroundObjects5, 1);
  }

  drawObjectWithCameraOffset(obj, position_x_Offset) {
    this.ctx.translate(this.camera_x * position_x_Offset, 0);
    this.addObjToMap(obj);
    this.ctx.translate(-this.camera_x * position_x_Offset, 0);
  }

  addObjToMap(objects, speedMultiplier) {
    objects.forEach((obj) => {
      this.addToMap(obj, speedMultiplier);
    });
  }

  addToMap(movableObj) {
    movableObj.drawFrame(this.ctx, "yellow");
    if (movableObj.otherDirection) {
      movableObj.flipImgHorizontally(this.ctx);
    }
    movableObj.draw(this.ctx);
    movableObj.flipImgHorizontallyBack(this.ctx);
  }

  droneDropBomb() {
    const now = Date.now();
    if (now - this.lastDropTime >= 5000) {
      this.level.drones.forEach((drone) => {
        drone.dropBomb(drone, this.throwableObjects);
        this.randomDropBombDelay = 5000 + Math.random() * 5000;
      });
      this.lastDropTime = now;
    }
  }

  initDropBomb() {
    const now = Date.now();
    if (now - this.lastDropTime >= this.randomDropBombDelay) {
      this.droneDropBomb();
    }
  }

  areaDamage() {
    const explosionRadius = 90;
    const damage = 50;

    this.throwableObjects.forEach((obj) => {
      if (!obj.isAboveGround()) {
        const distance = Math.sqrt(
          Math.pow(obj.x - this.character.x, 2) + Math.pow(obj.y - this.character.y, 2)
        );
        if (distance <= explosionRadius && this.character.canTakeDamage && obj.harmful) {
          this.character.energy -= damage;
          this.statusBar.setPercentage(this.character.energy);
          this.character.canTakeDamage = false;

          setTimeout(() => {
            this.character.canTakeDamage = true;
          }, 5000);

          if (this.character.energy <= 0) {
            this.character.alreadyDead = true;
          }
        }
      }
    });
  }
}
