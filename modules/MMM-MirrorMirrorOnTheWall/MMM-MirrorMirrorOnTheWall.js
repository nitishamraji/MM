/* global Module */

/* Magic Mirror
 * Module: MMM-MirrorMirrorOnTheWall
 *
 * 
 * MIT Licensed.
 */

Module.register('MMM-MirrorMirrorOnTheWall', {

  defaults: {},

  start: function() {
    console.log('Startingggggggggg module: ' + this.name);
    this.clear = false
    this.sendSocketNotification('ALEXA_START', {});
  },

  getStyles: function() {
    return [
      "MMM-MirrorMirrorOnTheWall.css",
      "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"
    ]
  },

  // Override socket notification handler.
  socketNotificationReceived: function(notification, payload) {
    console.log(this.name + "received a socket notification:\n" + notification);

    if (notification === "RESULT") {
      this.clear = false
      this.result = payload;
      
      var hide = MM.getModules();
            
      hide.enumerate(function(module) {
        console.log("enumerate through module: " + module.name);
        if( module.name.contains("Gmail") ) {
          module.hide();
        }
      });

      this.updateDom();

      

      this.show(1000, function() {
        Log.log(this.name + ' is shown.');
      });
    } else if (notification === "MODULE") {
      let self = this
      MM.getModules().enumerate(function(module) {
        if (module.name === payload.moduleName || payload.moduleName === "all_modules") {
          if (payload.turnOn) {
            if (module.name === self.name) {
              self.clear = false
              self.updateDom();
            }
            module.show(1000, function() {
              Log.log(module.name + ' is shown.');
            });
          } else {
            if (module.name === self.name) {
              self.clear = true
              self.updateDom();
            }
            module.hide(1000, function() {
              Log.log(module.name + ' is hidden.');
            });
          }
        }
      });
    }
  },

  getDom: function() {
    wrapper = document.createElement("div");
    wrapper.className = 'thin large bright';
   
    // if( this.clear )
    // {
    //    console.log("testing frameeee");
    //     var row = document.createElement("div");
    //     row.className = "imgFrame";
    //     row.setAttribute('id', 'imgFrame');
    //     var oImg = document.createElement("img");
    //     oImg.setAttribute('src', 'modules/test/nit_kav.jpg');
    //     oImg.setAttribute('height', '1920');
    //     oImg.setAttribute('width', '1080');
    //     row.appendChild(oImg);
    //     wrapper.appendChild(row);
    // }
    // else if( )
    // {
    //   var elem = document.getElementById("imgFrame");
    //   if( elem )
    //   {
    //     elem.remove();
    //   }
    // }

    if (this.result && !this.clear) {

      if (this.result.images) {
        console.log("testing frameeee");
        var row = document.createElement("div");
        row.className = "imgFrame";
        row.setAttribute('id', 'imgFrame');
        var oImg = document.createElement("img");
        oImg.setAttribute('src', 'modules/test/nit_kav.jpg');
        oImg.setAttribute('height', '1920');
        oImg.setAttribute('width', '1080');
        row.appendChild(oImg);
        wrapper.appendChild(row);
      }

      if (this.result.videoId) {
        var videoWrapper = document.createElement("div")
        videoWrapper.className = "videoWrapper"
        var iframe = document.createElement('iframe')
        iframe.src = "https://www.youtube.com/embed/" + "oGneAab3e88" + "?autoplay=1&controls=0"
        videoWrapper.appendChild(iframe)
        wrapper.appendChild(videoWrapper)
      }

      if (this.result.displayText) {
        var h1 = document.createElement('h1')
        h1.className = "animated fadeIn"
        var t = document.createTextNode(this.result.displayText)
        h1.appendChild(t)
        wrapper.appendChild(h1)
      }
    }

    return wrapper;
  }
});
