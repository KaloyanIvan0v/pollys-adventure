class StatusBar extends DrawableObject {
  HEALTH_BAR = [
    "/img/GUI/health-bar/100.png",
    "/img/GUI/health-bar/80.png",
    "/img/GUI/health-bar/60.png",
    "/img/GUI/health-bar/40.png",
    "/img/GUI/health-bar/20.png",
    "/img/GUI/health-bar/0.png",
  ];

  percentage = 100;

  constructor() {
    super();
    this.x = 10;
    this.y = 0;
    this.width = 150;
    this.height = 45;
    this.loadImages(this.HEALTH_BAR);
    this.setPercentage(100);
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.HEALTH_BAR[this.resolvePercentage()];
    this.img = this.imgCache[path];
  }

  resolvePercentage() {
    if (this.percentage == 100) {
      return 0;
    } else if (this.percentage > 80) {
      return 1;
    } else if (this.percentage > 60) {
      return 2;
    } else if (this.percentage > 40) {
      return 3;
    } else if (this.percentage > 20) {
      return 4;
    } else {
      return 5;
    }
  }
}
