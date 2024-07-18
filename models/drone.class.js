class Drone extends MovableObject {
  IMG_WALKING = [
    "/img/characters/drone/walk/005-000.png",
    "/img/characters/drone/walk/005-001.png",
    "/img/characters/drone/walk/005-002.png",
    "/img/characters/drone/walk/005-003.png",
  ];
  IMG_IDLE = ["/img/characters/drone/idle/004-000.png", "/img/characters/drone/idle/004-001.png"];

  drone_fly = new Audio("/audio/enemy/drone/1.mp3");

  height = 55;
  width = 55;
  lastDropTick = 0;
  lastDropTime = 0;
  randomDropBombDelay = 1000;
  horizontalSpeedDrone = 1.68;
  characterUnderDrone = false;
  droneMoveLeft = true;

  /**
   * Creates a new drone character.
   */
  constructor() {
    super().loadImg("/img/characters/drone/idle/004-000.png");
    this.loadImages(this.IMG_WALKING);
    this.loadImages(this.IMG_IDLE);
    this.x = 4000;
    this.y = 60;
    this.drone_fly.loop = true;
    this.speedX = this.horizontalSpeedDrone;
  }

  /**
   * Main loop function that updates the drone's state.
   */
  objLoop() {
    this.handleObjMovement();
    this.handleObjAnimation();
    this.adjustSoundVolumeByDistance(world.character, this);
  }

  /**
   * Handles the drone's animation based on its movement.
   */
  handleObjAnimation() {
    if (this.objMoves()) {
      this.playAnimation(this.IMG_WALKING, 120);
    } else {
      this.playAnimation(this.IMG_IDLE, 120);
    }
  }

  /**
   * Handles the drone's movement and sound.
   */
  handleObjMovement() {
    if (this.x < 2000) {
      this.droneMoveLeft = false;
    } else if (this.x > 4000) {
      this.droneMoveLeft = true;
    }
    if (this.droneMoveLeft) {
      this.moveLeft(this.speedX, true);
    } else {
      this.moveRight(this.speedX);
    }
    this.playSound(this.drone_fly, 0.3, soundVolumeGame);
  }

  /**
   * Drops a bomb and temporarily stops the drone's movement.
   * @param {Object} world - The game world object.
   */
  dropBomb(world) {
    this.speedX = 0;
    const dropTick = gameLoopTicks;
    this.checkAndResume(world, dropTick);
  }

  /**
   * Checks the elapsed time and resumes the drone's movement after dropping a bomb.
   * @param {Object} world - The game world object.
   * @param {number} dropTick - The tick count when the bomb was dropped.
   */
  checkAndResume(world, dropTick) {
    const elapsedTicks = gameLoopTicks - dropTick;
    if (elapsedTicks >= 166) {
      world.throwableObjects.push(
        new Bomb(this.x + this.width / 4, this.y + this.height / 2, 0, 0, 30, world)
      );
      this.speedX = this.horizontalSpeedDrone;
    } else {
      requestAnimationFrame(() => (!this.gamePaused ? this.checkAndResume(world, dropTick) : null));
    }
  }

  /**
   * Drops a bomb if certain conditions are met.
   * @param {Object} world - The game world object.
   */
  droneDropBomb(world) {
    if (gameLoopTicks - this.lastDropTick >= 130 || this.characterUnderDrone) {
      this.dropBomb(world);
      this.randomDropBombDelay = 130 + Math.floor(Math.random() * 130);
      this.lastDropTick = gameLoopTicks;
    }
  }

  /**
   * Initiates the bomb dropping sequence.
   * @param {Object} world - The game world object.
   */
  initDropBomb(world) {
    if (gameLoopTicks - this.lastDropTick >= this.randomDropBombDelay || this.characterUnderDrone) {
      this.droneDropBomb(world);
    }
  }

  /**
   * Checks if the character is directly under the drone.
   * @param {Object} character - The character object.
   */
  checkIfCharacterIsUnderDrone(character) {
    let characterX = Math.floor(character.x + character.width / 2);
    let droneX = Math.floor(this.x + this.width / 2);
    if (characterX === droneX) {
      this.characterUnderDrone = true;
      setTimeout(() => {
        this.characterUnderDrone = false;
      }, 20);
    } else {
      this.characterUnderDrone = false;
    }
  }
}
