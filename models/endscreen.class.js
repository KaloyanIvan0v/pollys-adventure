class EndScreen extends DrawableObject {
  END_SCREEN = ["/img/GUI/end-screen.png"];
  PLAY_AGAIN = ["/img/GUI/buttons/play-again.png"];
  BACK_TO_MENU = ["/img/GUI/buttons/home.png"];

  endScreen = new BackgroundObject(this.END_SCREEN, 0, 0, 480, 720);
  buttonPlayAgain = new Button(370, 330, 200, 75, this.PLAY_AGAIN);
  buttonBackToMenu = new Button(130, 330, 200, 75, this.BACK_TO_MENU);

  constructor() {
    super();
    this.loadImg(this.END_SCREEN);
    this.loadImg(this.PLAY_AGAIN);
    this.loadImg(this.BACK_TO_MENU);
  }

  animate(ctx) {
    this.draw(ctx);
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
    this.buttonPlayAgain.animate(x_move, y_move, x_click, y_click, reload);
    this.buttonBackToMenu.animate(x_move, y_move, x_click, y_click, backHome);
  }
}
