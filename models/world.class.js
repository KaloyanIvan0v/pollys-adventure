class World extends Sound {
  ctx;
  canvas;
  keyboard;
  camera_x = 0;
  level = level1;
  howToPlayShown = true;

  character = new Character();
  cardCannon = new CardCannon();
  statusBarHealth = new StatusBar(10, 0, 100);
  statusBarCards = new StatusBar(10, 45, 0);
  statusBarCardsImg = new StatusBarImg(9, 56, "/img/objects/card/bar-card.png");
  statusBarBombImg = new StatusBarImg(13, 100, "/img/objects/bomb/idle/0.png");
  gameMenu = new GameMenu(0, 0);
  endScreenLose = new EndScreen("/img/GUI/end-screen.png", "/audio/lose.mp3");
  endScreenWin = new EndScreen("/img/GUI/win-screen.png", "/audio/won.mp3");
  backgroundMusic = new Audio("/audio/mysterious-melody-loop-197040.mp3", "/audio/won.mp3");
  howToPlay = new DecorationObject(
    10,
    10,
    640,
    400,
    "/img/background/gameInstructions/how-to-play.png"
  );

  animations = [];
  throwableObjects = [];
  backgroundObjects = level1.backgroundObjects;
  alreadyThrown = false;
  lastCtxTranslate = 1;
  endBossActivated = false;
  intervalId;

  /**
   * Constructs a new World object.
   * @param {HTMLCanvasElement} canvas - The canvas element where the game is rendered.
   * @param {Keyboard} keyboard - The keyboard input handler for the game.
   */
  constructor(canvas, keyboard) {
    super();
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.gameLoop();
    this.howToPlayShown = true;
  }

  /**
   * The main game loop that runs at approximately 60 frames per second.
   * Manages game animation, events, and drawing based on game state.
   */
  gameLoop() {
    this.intervalId = setInterval(() => {
      if (!holdWorld) {
        if (!gamePaused) {
          this.gameLoopRunGame();
        }
        this.draw();
        this.guiEvents();
      } else {
        this.gameLoopEndScreenHandler();
      }
    }, 1000 / 60);
  }

  /**
   * Runs the main game loop by performing the following actions:
   * 1. Executes the runObjectLoop method.
   * 2. Triggers world events.
   * 3. Increments the game loop tick counter.
   */
  gameLoopRunGame() {
    this.runObjectLoop();
    this.worldEvents();
    gameLoopTicks = gameLoopTicks + 1;
  }

  /**
   * Handles the end screen logic based on the game outcome.
   * If the game is won, it stops all sounds and draws the win screen.
   * Otherwise, it stops all sounds and draws the lose screen.
   */
  gameLoopEndScreenHandler() {
    if (gameWon) {
      this.stopAllSounds();
      this.drawWinScreen();
    } else {
      this.stopAllSounds();
      this.drawLoseScreen();
    }
  }

  /**
   * Animates all game objects in the world.
   * Runs animation loops for characters, enemies, drones, and throwable objects.
   */
  runObjectLoop() {
    this.character.objLoop();
    this.cardCannon.objLoop(this.character, this.throwableObjects);
    this.objectLoop(this.level.drones);
    this.objectLoop(this.level.decorations);
    this.objectLoop(this.throwableObjects);
    this.objectLoop(this.level.enemies);
    this.objectLoop(this.animations);
  }

  /**
   * Executes various world events such as checking collisions, updating status bars, and handling game-ending conditions.
   */
  worldEvents() {
    this.level.drones[0].initDropBomb(this);
    this.level.drones[0].checkIfCharacterIsUnderDrone(this.character);
    this.checkIfTisUp();
    this.updateStatusBars();
    this.checkIfGameEnded();
    this.removeDeadEnemies();
    this.character.checkThrowableObjects();
    this.removeExplodedThrownObjects();
    this.checkCardCollision();
    this.activateEndBoss();
    // this.checkIfEndBossDead();
  }

  /**
   * Handles GUI-specific events such as playing background music based on game state.
   */
  guiEvents() {
    gamePaused
      ? this.character.playSound(this.backgroundMusic, 0.03, soundVolumeGUI)
      : this.character.playSound(this.backgroundMusic, 0.03, soundVolumeGUI);
    this.gameMenu.animate();
  }

  /**
   * Iterates over an array of objects and calls the objLoop method on each object.
   *
   * @param {Object[]} objArray - An array of objects. Each object in the array must have an objLoop method.
   */
  objectLoop(objArray) {
    objArray.forEach((obj) => {
      obj.objLoop();
    });
  }

  /**
   * Draws all elements in the game world, including dynamic and fixed objects.
   */
  draw() {
    this.drawDynamicObjects();
    this.drawFixedObjects();
  }

  /**
   * Draws all dynamic objects in the game world, including characters, enemies, and throwable objects.
   * Also handles parallax background layers.
   */
  drawDynamicObjects() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawParallaxBackgroundLayers();
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.cardCannon);
    this.addObjToMap(this.level.decorations);
    this.addObjToMap(this.animations);
    this.addObjToMap(this.level.drones);
    this.addObjToMap(this.level.enemies);
    this.addObjToMap(this.throwableObjects);
    this.addToMap(this.character);
    this.ctx.translate(-this.camera_x, 0);
  }

  /**
   * Draws all fixed objects in the game world, including status bars, game menu buttons, and tutorial screens.
   */
  drawFixedObjects() {
    this.addToMap(this.statusBarHealth);
    this.addToMap(this.statusBarCards);
    this.addToMap(this.statusBarCardsImg);
    this.addObjToMap(this.gameMenu.returnButtons());
    this.howToPlayShown ? this.addToMap(this.howToPlay) : null;
  }

  /**
   * Draws the parallax background layers, adjusting their position based on camera movement.
   */
  drawParallaxBackgroundLayers() {
    this.drawObjectWithCameraOffset(this.level.backgroundObjects1, 1);
    this.drawObjectWithCameraOffset(this.level.backgroundObjects2, 0.4);
    this.drawObjectWithCameraOffset(this.level.backgroundObjects3, 0.6);
    this.drawObjectWithCameraOffset(this.level.backgroundObjects4, 0.8);
    this.drawObjectWithCameraOffset(this.level.backgroundObjects5, 1);
  }

  /**
   * Draws an object with a specific offset based on camera movement.
   * @param {Object[]} obj - The object or array of objects to draw.
   * @param {number} position_x_Offset - The horizontal offset multiplier based on camera movement.
   */
  drawObjectWithCameraOffset(obj, position_x_Offset) {
    this.ctx.translate(this.camera_x * position_x_Offset, 0);
    this.addObjToMap(obj);
    this.ctx.translate(-this.camera_x * position_x_Offset, 0);
  }

  /**
   * Stops the game loop interval, effectively pausing the game.
   */
  stopGameLoop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  /**
   * Restarts the game by resetting the level, throwable objects, enemies, and character states.
   */
  restartGame() {
    this.level = new Level(12, 1);
    this.throwableObjects = [];
    this.enemies = [];
    this.stopAllSounds();
    this.character.resetCharacter();
    gamePaused = false;
    soundVolumeGame = 1;
    gameWon = false;
    this.endBossActivated = false;
  }

  /**
   * Stops all active sounds in the game.
   */
  stopAllSounds() {
    if (activeSounds.length > 2) {
      activeSounds.forEach((sound) => {
        sound.pause();
        sound.currentTime = 0;
      });
      activeSounds = [];
    }
  }

  /**
   * Updates the status bars based on the character's current energy and card percentage.
   */
  updateStatusBars() {
    this.statusBarHealth.setPercentage(this.character.energy);
    this.statusBarCards.setPercentage(this.character.cardPercent);
  }

  /**
   * Removes exploded thrown objects from the game world.
   */
  removeExplodedThrownObjects() {
    this.removeObject(this.throwableObjects);
  }

  /**
   * Removes objects from an array that are marked as already dead.
   * @param {Object[]} array - The array of objects to remove dead objects from.
   */
  removeObject(array) {
    array.forEach((element) => {
      if (element.alreadyDead) {
        array.splice(array.indexOf(element), 1);
      }
    });
  }

  /**
   * Updates the game menu and related elements after a window resize event.
   * Adds a slight delay to handle resizing calculations effectively.
   */
  buttonResizeUpdate() {
    setTimeout(() => {
      this.gameMenu = new GameMenu(0, 0);
      this.endScreenLose = new EndScreen("/img/GUI/end-screen.png", "/audio/lose.mp3");
      this.endScreenWin = new EndScreen("/img/GUI/win-screen.png", "/audio/won.mp3");
    }, 200);
  }

  /**
   * Checks if the throwable object throw action is complete to allow throwing again.
   */
  checkIfTisUp() {
    if (!this.keyboard.T && !throwPressed) {
      this.alreadyThrown = false;
    }
  }

  /**
   * Sets the world reference for the character object.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Draws the end screen for the game when the character is defeated.
   */
  drawLoseScreen() {
    this.endScreenLose.draw(this.ctx);
    this.endScreenLose.animate();
  }

  /**
   * Draws the win screen for the game when the final boss is defeated.
   */
  drawWinScreen() {
    this.endScreenWin.draw(this.ctx);
    this.endScreenWin.animate();
  }

  /**
   * Adds objects to the map for rendering with optional speed multiplier.
   * @param {Object[]} objects - The array of objects to add to the map.
   */
  addObjToMap(objects) {
    objects.forEach((obj) => {
      this.addToMap(obj);
    });
  }

  /**
   * Renders a movable object on the canvas.
   * @param {DrawableObject} movableObj - The object to render.
   */
  addToMap(movableObj) {
    if (movableObj.flipImg) {
      movableObj.flipImgHorizontally(this.ctx);
    }
    movableObj.draw(this.ctx);
    movableObj.flipImgHorizontallyBack(this.ctx);
  }

  /**
   * Checks if the game has ended by determining if the character is defeated.
   */
  checkIfGameEnded() {
    if (this.character.alreadyDead) {
      holdWorld = true;
    }
  }

  /**
   * Checks collisions between thrown cards and enemies.
   * Updates enemy health when a collision occurs and handles harmful card effects.
   * @param {Card} object - The card object to check collisions for.
   */
  checkCardCollision() {
    this.throwableObjects.forEach((object) => {
      if (object instanceof Card) {
        object.checkIfCardCollidingWithEnemies();
        object.checkIfCollidingWithGround();
      }
    });
  }

  /**
   * Removes dead enemies from the game world.
   */
  removeDeadEnemies() {
    let deadEnemies = [];
    this.level.enemies.forEach((enemy) => {
      if (enemy.alreadyDead) {
        deadEnemies.push(enemy);
      }
    });
    if (deadEnemies.length > 2) {
      this.level.enemies.forEach((enemy) => {
        if (enemy.alreadyDead && enemy instanceof SmallEnemy) {
          this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
          return;
        }
      });
    }
  }

  /**
   * Activates the end boss when the character moves past a certain x-coordinate threshold.
   */
  activateEndBoss() {
    if (this.character.x > 3000 && this.endBossActivated == false) {
      this.endBossActivated = true;
      this.level.enemies.push(new EndBoss());
    }
  }
}
