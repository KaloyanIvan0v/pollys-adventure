class Drone extends MovableObject {
  IMG_WALKING = [
    "/img/characters/drone/walk/005-000.png",
    "/img/characters/drone/walk/005-001.png",
    "/img/characters/drone/walk/005-002.png",
    "/img/characters/drone/walk/005-003.png",
  ];

  height = 55;
  width = 55;
  droneSpeed = 1;
  world;
  constructor(world) {
    super().loadImg("/img/characters/drone/idle/004-000.png");
    this.loadImages(this.IMG_WALKING);
    this.x = 600;
    this.y = 60;
    this.animate();
    this.world = world;
  }

  animate() {
    setInterval(() => {
      if (this.droneSpeed > 0) {
        this.playAnimation(this.IMG_WALKING, 120);
      } else {
        this.loadImg("/img/characters/drone/idle/004-000.png");
      }
    }, 200);
    setInterval(() => {
      this.moveLeft(this.droneSpeed, true);
    }, 1000 / 60);
  }

  dropBomb(drone, throwableObjects) {
    this.droneSpeed = 0;
    const dropTime = Date.now();
    const checkAndResume = () => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - dropTime;
      if (elapsedTime >= 1000) {
        throwableObjects.push(
          new Bomb(drone.x + drone.width / 4, drone.y + drone.height / 2, 0, 0, 30, this.world)
        );
      }
      if (elapsedTime >= 1000) {
        this.droneSpeed = 1;
      }
      if (elapsedTime < 1000) {
        requestAnimationFrame(checkAndResume);
      }
    };
    requestAnimationFrame(checkAndResume);
  }
}
