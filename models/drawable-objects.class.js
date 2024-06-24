class DrawableObject extends Sound {
  img;
  imgCache = {};
  currentImg = 0;
  playedAnimationOnce = false;
  startRenderImgAmount = 0;
  x = 100;
  y = 358;
  height = 72;
  width = 72;
  lastFrameTime = Date.now();
  harmful = false;
  collectable = false;

  constructor() {
    super();
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  loadImg(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imgCache[path] = img;
    });
  }

  drawFrame(ctx, color) {
    if (this instanceof Character || this instanceof SmallEnemy || this instanceof EndBoss) {
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  flipImgHorizontally(ctx) {
    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    ctx.scale(-1, 1);
    ctx.translate(-(this.x + this.width / 2), -(this.y + this.height / 2));
  }

  flipImgHorizontallyBack(ctx) {
    ctx.restore();
  }

  hitGround() {
    if (this.y >= 400) {
      return true;
    }
  }

  removeObject(objectArray, object) {
    let index = objectArray.indexOf(object);
    if (index > -1) {
      objectArray.splice(index, 1);
    }
  }

  calculateDistance(obj, targetObj) {
    return Math.sqrt(Math.pow(obj.x - targetObj.x, 2) + Math.pow(obj.y - targetObj.y, 2));
  }
}
