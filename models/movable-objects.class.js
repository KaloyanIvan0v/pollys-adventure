class MovableObject extends DrawableObject {
  speed = 0.3;
  otherDirection = false;
  speedY = 0;
  acceleration = 1;
  energy = 100;
  currentCollisionState;
  collisionDetected;
  alreadyDead = false;
  onGround = true;

  constructor() {
    super();
  }

  applyGravity(fallSpeed) {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / fallSpeed);
  }

  isAboveGround() {
    return this.y + this.height < 430;
  }

  moveRight(speedMultiplier) {
    this.x += this.speed * speedMultiplier;
    this.otherDirection = false;
  }

  moveLeft(speedMultiplier, otherDirection) {
    this.x -= this.speed * speedMultiplier;
    this.otherDirection = otherDirection;
  }

  playAnimation(images, animationSpeed) {
    const now = Date.now();
    if (now - this.lastFrameTime >= animationSpeed) {
      let i = this.currentImg % images.length;
      let path = images[i];
      let img = this.imgCache[path];
      this.img = img;
      this.currentImg++;
      this.lastFrameTime = now;
    }
  }

  playAnimationHurt(images, animationSpeed) {
    const now = Date.now();
    if (now - this.lastFrameTime >= animationSpeed) {
      let i = this.currentImg % images.length;
      let path = images[i];
      let img = this.imgCache[path];
      if (i % 2 === 1) {
        img = this.applyFilter(img);
      }
      this.img = img;
      this.currentImg++;
      this.lastFrameTime = now;
    }
  }

  applyFilter(img) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      data[i + 1] = 0;
      data[i + 2] = 0;
    }
    ctx.putImageData(imageData, 0, 0);
    const filteredImg = new Image();
    filteredImg.src = canvas.toDataURL();
    return filteredImg;
  }

  jump() {
    this.speedY = 13;
  }

  isColliding(obj) {
    return (
      this.x + this.width >= obj.x &&
      this.x <= obj.x + obj.width &&
      this.y + this.height > obj.y &&
      this.y < obj.y + obj.height
    );
  }

  isDead() {
    return this.energy <= 0 ? true : false;
  }

  isHurt() {
    return this.currentCollisionState;
  }

  isJump() {
    return this.speedY > -13 ? true : false;
  }
}
