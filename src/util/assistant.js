export default class Assistant {
  /**
   * @param  {Phaser.Scene} scene which serves as a container of all visual
   * and audio elements.
   */
  constructor() {
    this.canvas = window.interactiveCanvas;
    this.app = window.app;

    const that = this;
    this.commands = {
      COLLECTION_SETUP: function (data) {
        that.app.switchView("COLLECTION_SETUP", data);
      },
      COLLECTION: function (data) {
        that.app.switchView("COLLECTION", data);
      },
      DEFAULT: function () {
        that.app.switchView("COLLECTION", null);
      },
    };
  }
  setCallbacks() {
    const that = this;
    // Declare the Interactive Canvas action callbacks.
    const callbacks = {
      onUpdate(data) {
        that.commands[data.state ? data.state.toUpperCase() : "DEFAULT"](data);
      },
    };
    // Called by the Interactive Canvas web app once web app has loaded to
    // register callbacks.
    this.canvas.ready(callbacks);
  }
}
