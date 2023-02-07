import consumer from "channels/consumer";

  let resetFunc;
  let timer = 0;

  consumer.subscriptions.create(
    {
      channel: "AppearanceChannel",
    },
    {
      // Called once when the subscription is created.
      initialized() {
        this.update = this.update.bind(this);
        this.awayTimer();
      },
      // Called when the subscription is ready for use on the server.
      connected() {
        this.online();
        resetFunt = () => this.resetTimer(this.uninstall);
      },

      // Called when the WebSocket connection is closed.
      disconnected() {
        console.log("offline");
        this.uninstall();
      },

      // Called when the subscription is rejected by the server.
      rejected() {
        this.uninstall();
      },
      /**
       * Called when the document is active.
       */
      update() {
        // console.log("Update");
        this.documentIsActive ? this.online() : this.away();
      },
      online() {
        // console.log("online");
        this.perform("online");
      },
      away() {
        this.perform("away");
      },
      awayTimer() {
        let timer;
        window.onload = resetTimer;
        //window.onmousemove = resetTimer;
        window.onmousedown = resetTimer; // catches touchscreen presses as well
        window.ontouchstart = resetTimer; // catches touchscreen swipes as well
        window.ontouchmove = resetTimer; // required by some devices
        window.onclick = resetTimer; // catches touchpad clicks as well
        window.onkeydown = resetTimer;
        window.addEventListener("scroll", resetTimer, true); // improved; see comments

        const setAwayStatus = function () {
          console.log("Away");
          this.away();
        }.bind(this);

        const setOnlineStatus = function () {
          console.log("Online");
          this.online();
        }.bind(this);

        function resetTimer() {
          clearTimeout(timer);
          setOnlineStatus();
          const timeInSeconds = 5;
          const milliseconds = 1000;
          const timeInMilliseconds = timeInSeconds * milliseconds;
          timer = setTimeout(setAwayStatus, timeInMilliseconds); // time is in milliseconds
        }
      },
    }
  );

//  this have somebugs
//  let resetFunc;
//  let timer = 0;
// consumer.subscriptions.create("AppearanceChannel", {
//   initialized(){},
//   connected() {
//     // Called when the subscription is ready for use on the server
//     this.perform("Connect");
//     resetFunt = () => this.resetTimer(this.uninstall);
//     this.install();
//     window.addEventListener("turbo:load", () => this.resetTimer());
//   },

//   disconnected() {
//     // Called when the subscription has been terminated by the server
//     this.perform("Connect");
//     this.uninstall();
//   },
//   rejection() {
//     console.log("Rejected");
//     this.uninstall();
//   },

//   received(data) {
//     // Called when there's incoming data on the websocket for this channel
//   },
//   online(){
//     console.log("online");
//     this.perform("online");
//   },
//   away(){
//     console.log("away");
//     this.perform("away");
//   },
//   offline(){
//     console.log("offline");
//     this.perform("offline");
//   },
//   uninstall() {
//     const shouldRun = document.getElementById("appearance_channel");
//     if (!shouldRun) {
//       clearTimeout(timer);
//       this.perform("offline");
//     }
//   },
//   install() {
//     console.log("install");
//     window.removeEventListener("load", resetFunc);
//     window.removeEventListener("DOMContentLoaded", resetFunc);
//     window.removeEventListener("click", resetFunc);
//     window.removeEventListener("keydown", resetFunc);

//     window.addEventListener("load", resetFunc);
//     window.addEventListener("DOMContentLoaded", resetFunc);
//     window.addEventListener("click", resetFunc);
//     window.addEventListener("keydown", resetFunc);
//     this.resetTimer();
//   },
//   resetTimer() {
//     this.uninstall();
//     const shouldRun = document.getElementById("appearance_channel");

//     if (!!shouldRun) {
//       this.online();
//       clearTimeout(timer);
//       const timeInSeconds = 300;
//       const milliseconds = 1000;
//       const timeInMilliseconds = timeInSeconds * milliseconds;

//       timer = setTimeout(this.away.bind(this), timeInMilliseconds);
//     }
//   },
// });
