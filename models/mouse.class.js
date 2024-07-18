class Mouse {
  /**
   * Last recorded position of a mouse click.
   * @type {{x: number, y: number}}
   */
  lastClick = { x: 0, y: 0 };

  /**
   * Last recorded position of a mouse move.
   * @type {{x: number, y: number}}
   */
  lastMove = { x: 0, y: 0 };

  /**
   * Flag indicating whether mouse clicks are enabled.
   * @type {boolean}
   */
  clickEnabled = true;

  /**
   * Constructs a Mouse instance and initializes event listeners.
   * @param {HTMLElement} element - The HTML element to track mouse events on.
   */
  constructor(element) {
    this.initEventListeners(element);
  }

  /**
   * Initializes mouse event listeners for the specified HTML element.
   * @param {HTMLElement} element - The HTML element to track mouse events on.
   */
  initEventListeners(element) {
    element.addEventListener("mousemove", (event) => {
      this.updateMouseMove(event);
    });

    element.addEventListener("click", (event) => {
      this.updateMouseClick(event);
      this.clickEnabled = true;
      executeOnEveryMouseClick(); // Assuming executeOnEveryMouseClick is defined elsewhere
    });
  }

  /**
   * Updates the last mouse move coordinates relative to the canvas.
   * @param {MouseEvent} event - The mouse event object containing the clientX and clientY coordinates.
   */
  updateMouseMove(event) {
    const rect = canvasRect; // Assuming canvasRect is defined somewhere in the scope
    let x = event.clientX - rect.left; // Calculate x-coordinate relative to the canvas
    let y = event.clientY - rect.top; // Calculate y-coordinate relative to the canvas
    this.lastMove.x = x;
    this.lastMove.y = y;
  }

  /**
   * Updates the last mouse click coordinates relative to the canvas.
   * @param {MouseEvent} event - The mouse event object containing the clientX and clientY coordinates.
   */
  updateMouseClick(event) {
    const rect = canvasRect; // Assuming canvasRect is defined somewhere in the scope
    let x = event.clientX - rect.left; // Calculate x-coordinate relative to the canvas
    let y = event.clientY - rect.top; // Calculate y-coordinate relative to the canvas
    this.lastClick.x = x;
    this.lastClick.y = y;
  }
}
