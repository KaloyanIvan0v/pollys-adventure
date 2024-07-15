class EndScreen extends MovableObject {
  END_SCREEN = [];
  PLAY_AGAIN = ["/img/GUI/buttons/play-again.png", "/img/GUI/buttons/play-again.png"];
  BACK_TO_MENU = ["/img/GUI/buttons/home.png", "/img/GUI/buttons/home.png"];

  endScreen;
  buttonPlayAgain;
  buttonBackToMenu;
  sound;

  constructor(imgPath, soundPath) {
    super();
    this.sound = new Audio(soundPath);
    this.END_SCREEN.push(imgPath);
    this.endScreen = new BackgroundObject(this.END_SCREEN, 0, 0, 480, 720);
    this.buttonPlayAgain = new Button(0.55, 0.7, 0.27, 0.14, this.PLAY_AGAIN);
    this.buttonBackToMenu = new Button(0.19, 0.7, 0.27, 0.14, this.BACK_TO_MENU);
    this.loadImages(this.PLAY_AGAIN);
    this.loadImages(this.BACK_TO_MENU);
    this.loadImg(this.END_SCREEN);
  }

  animate() {
    this.buttonEvents();
    this.playLastSound(this.sound, 1);
  }

  draw(ctx) {
    this.endScreen.draw(ctx);
    this.buttonBackToMenu.draw(ctx);
    this.buttonPlayAgain.draw(ctx);
  }

  buttonEvents() {
    let x_move = mouse.lastMove.x;
    let y_move = mouse.lastMove.y;
    let x_click = mouse.lastClick.x;
    let y_click = mouse.lastClick.y;
    this.buttonPlayAgain.animate(x_move, y_move, x_click, y_click, playAgain);
    this.buttonBackToMenu.animate(x_move, y_move, x_click, y_click, backHome);
    this.buttonPlayAgain.isTouched(playAgain);
    this.buttonBackToMenu.isTouched(backHome);
  }
}
