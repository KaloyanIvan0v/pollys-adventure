class World extends Sound {
  ctx;
  canvas;
  keyboard;
  camera_x = 0;
  level = level1;

  character = new Character();
  statusBar = new StatusBar();
  gameMenu = new GameMenu(0, 0);

  throwableObjects = [];
  collidingEnemies = [];
  backgroundObjects = level1.backgroundObjects;
  alreadyThrown = false;
  lastCtxTranslate = 1;
  backgroundMusic = new Audio("/audio/mysterious-melody-loop-197040.mp3");
  endScreen = new EndScreen();
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
          gameLoopTicks = gameLoopTicks + 1;
        }
        this.draw();
        this.guiEvents();
      } else {
        this.drawEndScreen();
        this.stopAllSounds();
      }
    }, 1000 / 166);
  }

  stopGameLoop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  animateObjects() {
    this.animateDrones();
    this.animateEnemies();
    this.character.animate();
  }

  worldEvents() {
    this.character.CheckCollisionsWith();
    this.checkThrowableObjects();
    this.character.areaDamage(this.throwableObjects);
    this.checkIfTisUp();
    this.removeExplodedThrownObjects();
    this.level.drones[0].initDropBomb(this);
    this.updateStatusBars();
    this.checkIfGameEnded();
  }

  guiEvents() {
    this.character.playSound(this.backgroundMusic, 0.06, soundVolumeGUI);
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
    this.statusBar.setPercentage(this.character.energy);
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
    this.addObjToMap(this.level.drones);
    this.addObjToMap(this.level.enemies);
    this.addToMap(this.character);
    this.addObjToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);
  }

  drawFixedObjects() {
    this.addToMap(this.statusBar);
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
}
