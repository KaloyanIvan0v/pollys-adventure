class Mouse {
  lastClick = { x: 0, y: 0 };
  lastMove = { x: 0, y: 0 };
  clickEnabled = true;

  constructor(element) {
    this.initEventListeners(element);
  }

  initEventListeners(element) {
    element.addEventListener("mousemove", (event) => {
      this.updateMouseMove(event, element);
    });
    element.addEventListener("click", (event) => {
      this.updateMouseClick(event, element);
      this.clickEnabled = true;
    });
  }

  updateMouseMove(event) {
    const rect = canvasRect;
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    this.lastMove.x = x;
    this.lastMove.y = y;
  }

  updateMouseClick(event) {
    const rect = canvasRect;
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    this.lastClick.x = x;
    this.lastClick.y = y;
  }
}
