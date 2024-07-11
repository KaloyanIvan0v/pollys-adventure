class World extends Sound {
  ctx;
  canvas;
  keyboard;
  camera_x = 0;
  level = level1;

  character = new Character();
  cardCannon = new CardCannon();
  statusBarHealth = new StatusBar(10, 0, 100);
  statusBarCards = new StatusBar(10, 45, 0);
  statusBarCardsImg = new StatusBarImg(12, 55, "/img/objects/card/003-000.png");
  statusBarBombImg = new StatusBarImg(13, 100, "/img/objects/bomb/idle/0.png");
  gameMenu = new GameMenu(0, 0);
  endScreen = new EndScreen();
  backgroundMusic = new Audio("/audio/mysterious-melody-loop-197040.mp3");
  throwCard = new Audio("/audio/objects/throw-card.mp3");
  animations = [];

  throwableObjects = [];
  backgroundObjects = level1.backgroundObjects;
  alreadyThrown = false;
  lastCtxTranslate = 1;
  intervalId;

  constructor(canvas, keyboard) {
    super();
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.gameLoop();
    this.resizeListener();
  }

  resizeListener() {
    window.addEventListener("resize", () => {
      this.buttonResizeUpdate();
      console.log("resize");
    });
  }

  buttonResizeUpdate() {
    setTimeout(() => {
      this.gameMenu = new GameMenu(0, 0);
      this.endScreen = new EndScreen();
    }, 200);
  }

  gameLoop() {
    this.intervalId = setInterval(() => {
      if (!holdWorld) {
        if (!gamePaused) {
          this.animateObjects();
          this.worldEvents();
          this.runAnimations();
          gameLoopTicks = gameLoopTicks + 1;
        }
        this.draw();
        this.guiEvents();
      } else {
        this.drawEndScreen();
        this.stopAllSounds();
      }
    }, 1000 / 60);
  }

  stopGameLoop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  runAnimations() {
    this.animations.forEach((animation) => {
      animation.animate();
    });
  }

  animateObjects() {
    this.animateDrones();
    this.animateEnemies();
    this.character.animate();
    this.cardCannon.animate(this.character, this.throwableObjects);
  }

  worldEvents() {
    this.character.checkCollisionsWith();
    this.character.calculateCardsPercentage();
    this.character.areaDamage(this.throwableObjects);
    this.character.checkForCollectibleItems(this.throwableObjects);
    this.level.drones[0].initDropBomb(this);
    this.level.drones[0].checkIfCharacterIsUnderDrone(this.character);
    this.checkIfTisUp();
    this.updateStatusBars();
    this.checkIfGameEnded();
    this.removeDeadEnemies();
    this.checkThrowableObjects();
    this.removeExplodedThrownObjects();
    this.checkCardCollision();
    this.animateDecorations();
  }

  guiEvents() {
    gamePaused
      ? this.character.playSound(this.backgroundMusic, 0.03, soundVolumeGUI)
      : this.character.playSound(this.backgroundMusic, 0.06, soundVolumeGUI);
    this.gameMenu.animate();
  }

  restartGame() {
    this.level = new Level(3, 1);
    this.throwableObjects = [];
    this.enemies = [];
    this.stopAllSounds();
    this.character.resetCharacter();
    gamePaused = false;
    soundVolumeGame = 1;
  }

  stopAllSounds() {
    activeSounds.forEach((sound) => {
      sound.pause();
      sound.currentTime = 0;
    });
  }

  updateStatusBars() {
    this.statusBarHealth.setPercentage(this.character.energy);
    this.statusBarCards.setPercentage(this.character.cardPercent);
  }

  animateEnemies() {
    this.level.enemies.forEach((enemy) => {
      if (enemy instanceof SmallEnemy) {
        enemy.animate(this.character);
      }
    });
  }

  animateDrones() {
    this.level.drones.forEach((drone) => {
      drone.animate(this.character);
    });
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
    if (this.keyboard.T && !this.alreadyThrown && this.character.cardAmount > 0) {
      let card = new Card(this.character.x, this.character.y, 13, 15, 40);
      card.harmful = true;
      this.playSound(this.throwCard);
      this.throwableObjects.push(card);
      setTimeout(() => {
        card.collectable = true;
      }, 200);
      this.alreadyThrown = true;
      this.character.cardAmount--;
    }
  }

  checkIfTisUp() {
    if (!this.keyboard.T) {
      this.alreadyThrown = false;
    }
  }

  setWorld() {
    this.character.world = this;
  }

  draw() {
    this.drawDynamicObjects();
    this.drawFixedObjects();
  }

  drawEndScreen() {
    this.endScreen.draw(this.ctx);
    this.endScreen.animate();
  }

  addDecorationsToMap() {
    this.level.decorations.forEach((element) => {
      this.addToMap(element);
    });
  }

  animateDecorations() {
    this.level.decorations.forEach((element) => {
      element.animate();
    });
  }

  drawParallaxBackgroundLayers() {
    this.drawObjectWithCameraOffset(this.level.backgroundObjects1, 1);
    this.drawObjectWithCameraOffset(this.level.backgroundObjects2, 0.4);
    this.drawObjectWithCameraOffset(this.level.backgroundObjects3, 0.6);
    this.drawObjectWithCameraOffset(this.level.backgroundObjects4, 0.8);
    this.drawObjectWithCameraOffset(this.level.backgroundObjects5, 1);
  }

  drawDynamicObjects() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawParallaxBackgroundLayers();
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.cardCannon);
    this.addDecorationsToMap();
    this.addObjToMap(this.level.drones);
    this.addObjToMap(this.level.enemies);
    this.addObjToMap(this.throwableObjects);
    this.addToMap(this.character);
    this.ctx.translate(-this.camera_x, 0);
  }

  drawFixedObjects() {
    this.addToMap(this.statusBarHealth);
    this.addToMap(this.statusBarCards);
    this.addToMap(this.statusBarCardsImg);
    this.gameMenu.returnButtons().forEach((button) => {
      this.addToMap(button);
    });
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
    // movableObj.drawFrame(this.ctx, "yellow");
    if (movableObj.flipImg) {
      movableObj.flipImgHorizontally(this.ctx);
    }
    movableObj.draw(this.ctx);
    movableObj.flipImgHorizontallyBack(this.ctx);
  }

  checkIfGameEnded() {
    if (this.character.alreadyDead) {
      holdWorld = true;
    }
  }

  checkCardCollision() {
    this.throwableObjects.forEach((object) => {
      this.checkIfCardCollidingWithEnemies(object);
      this.checkIfCollidingWithGround(object);
    });
  }

  checkIfCardCollidingWithEnemies(object) {
    this.level.enemies.forEach((enemy) => {
      if (object.isColliding(enemy) && object.harmful == true && enemy.alreadyDead == false) {
        object.hitObject = true;
        enemy.energy -= 100;
        enemy.harmful = false;
        setTimeout(() => {
          if (object.alreadyDead) {
            this.throwableObjects.splice(this.throwableObjects.indexOf(object), 1);
          }
        }, 100);
      }
    });
  }

  checkIfCollidingWithGround(object) {
    if (object instanceof Card && !object.isAboveGround()) {
      object.hitObject = true;
      setTimeout(() => {
        if (object.alreadyDead) {
          this.throwableObjects.splice(this.throwableObjects.indexOf(object), 1);
        }
      }, 100);
    }
  }

  removeDeadEnemies() {
    let deadEnemies = [];
    this.level.enemies.forEach((enemy) => {
      if (enemy.alreadyDead) {
        deadEnemies.push(enemy);
      }
    });
    if (deadEnemies.length > 2) {
      this.level.enemies.forEach((enemy) => {
        if (enemy.alreadyDead) {
          this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
          return;
        }
      });
    }
  }
}
