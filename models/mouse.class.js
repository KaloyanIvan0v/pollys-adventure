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

  updateMouseMove(event, element) {
    const rect = canvasRect;
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    this.lastMove.x = x;
    this.lastMove.y = y;
  }

  returnCanvasRectTopLeft(element) {
    if (!fullscreen) {
      const rect = element.getBoundingClientRect();
      return rect;
    } else {
      let rect = { left: 0, top: 0 };

      return rect;
    }
  }

  updateMouseClick(event, element) {
    const rect = canvasRect;
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    this.lastClick.x = x;
    this.lastClick.y = y;
  }
}
