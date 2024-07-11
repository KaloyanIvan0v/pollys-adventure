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
  horizontalSpeedDrone = 0.68;
  characterUnderDrone = false;

  constructor(x) {
    super().loadImg("/img/characters/drone/idle/004-000.png");
    this.loadImages(this.IMG_WALKING);
    this.loadImages(this.IMG_IDLE);
    this.x = x;
    this.y = 60;
    this.drone_fly.loop = true;
    this.speedX = this.horizontalSpeedDrone;
  }

  objLoop() {
    this.handleObjMovement();
    this.handleObjAnimation();
    this.adjustSoundVolumeByDistance(world.character, this);
  }

  handleObjAnimation() {
    if (this.objMoves()) {
      this.playAnimation(this.IMG_WALKING, 120);
    } else {
      this.playAnimation(this.IMG_IDLE, 120);
    }
  }

  handleObjMovement() {
    this.moveLeft(this.speedX, true);
    this.playSound(this.drone_fly, 1, soundVolumeGame);
  }

  dropBomb(world) {
    this.speedX = 0;
    const dropTick = gameLoopTicks;
    this.checkAndResume(world, dropTick);
  }

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

  droneDropBomb(world) {
    if (gameLoopTicks - this.lastDropTick >= 830 || this.characterUnderDrone) {
      this.dropBomb(world);
      this.randomDropBombDelay = 830 + Math.floor(Math.random() * 830);
      this.lastDropTick = gameLoopTicks;
    }
  }

  initDropBomb(world) {
    if (gameLoopTicks - this.lastDropTick >= this.randomDropBombDelay || this.characterUnderDrone) {
      this.droneDropBomb(world);
    }
  }

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
