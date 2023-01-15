import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  /**On start */
  connect(){
    console.log("Connected");
    const message = document.getElementsById("messages");
    message.addEventListener("DOMNodeInserted", this.resetScroll);
    this.resetScroll(message);
  }
  /**On stop */
  disconnect(){
    console.log("Disconnected");
  }

  /** Custom function */
  resetScroll() {}
}
