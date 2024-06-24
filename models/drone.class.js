class Drone extends MovableObject {
  IMG_WALKING = [
    "/img/characters/drone/walk/005-000.png",
    "/img/characters/drone/walk/005-001.png",
    "/img/characters/drone/walk/005-002.png",
    "/img/characters/drone/walk/005-003.png",
  ];

  IMG_IDLE = ["/img/characters/drone/idle/004-000.png", "/img/characters/drone/idle/004-001.png"];

  height = 55;
  width = 55;
  lastDropTime = 0;
  randomDropBombDelay = 1000;
  horizontalSpeedDrone = 0.48;
  drone_fly = new Audio("/audio/enemy/drone/1.mp3");

  constructor() {
    super().loadImg("/img/characters/drone/idle/004-000.png");
    this.loadImages(this.IMG_WALKING);
    this.loadImages(this.IMG_IDLE);
    this.x = 800;
    this.y = 60;
    this.drone_fly.loop = true;
    this.speedX = this.horizontalSpeedDrone;
  }

  animate(targetObj) {
    this.handleObjMovement();
    this.handleObjAnimation();
    this.adjustSoundVolumeByDistance(targetObj, this);
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
    const dropTime = Date.now();
    requestAnimationFrame(() => (!gamePaused ? this.checkAndResume(world, dropTime) : null));
  }

  checkAndResume(world, dropTime) {
    const elapsedTime = Date.now() - dropTime;
    if (elapsedTime >= 1000) {
      world.throwableObjects.push(
        new Bomb(this.x + this.width / 4, this.y + this.height / 2, 0, 0, 30, world)
      );
      this.speedX = this.horizontalSpeedDrone;
    } else {
      requestAnimationFrame(() => (!gamePaused ? this.checkAndResume(world, dropTime) : null));
    }
  }

  droneDropBomb(world) {
    const now = Date.now();
    if (now - this.lastDropTime >= 5000) {
      this.dropBomb(world);
      this.randomDropBombDelay = 5000 + Math.random() * 5000;
      this.lastDropTime = now;
    }
  }

  initDropBomb(world) {
    if (Date.now() - this.lastDropTime >= this.randomDropBombDelay) {
      this.droneDropBomb(world);
    }
  }
}
