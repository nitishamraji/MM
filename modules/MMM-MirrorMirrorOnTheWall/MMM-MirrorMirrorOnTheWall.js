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

    MM.getModules().enumerate(function(module) {
        if ( payload.images || ( module.name.includes("Gmail") && notification != "MODULE" ) ) {
          module.hide();
        }
    });
      

    if (notification === "RESULT") {
      this.clear = false
      this.result = payload;
      
      console.log("aws iot payload: " + payload );

      this.updateDom();

      this.show(1000, function() {
        Log.log(this.name + ' is shown.');
      });
    } else if (notification === "MODULE") {
      let self = this;
      console.log("test payload moduleName: " + payload.moduleName );
      MM.getModules().enumerate(function(module) {

        var isGmailModule = module.name.includes("Gmail");

        if( ( payload.moduleName.includes("gmail") || payload.moduleName.includes("Gmail") ) && isGmailModule )
        {
          console.log("test entered gmail toggle");
          if (payload.turnOn) {
            module.show(1000, function() {
              Log.log(module.name + ' is shown.');
            });
          }
          else {
            module.hide(1000, function() {
              Log.log(module.name + ' is hidden.');
            });
          }
        }

        if (module.name === payload.moduleName || payload.moduleName === "all_modules") {
          if (payload.turnOn && !module.name.includes("Gmail") ) {
            if (module.name === self.name ) {
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

    var moudleWrapperId = 'onTheWallWrapper';

    var wrapperPrev = document.getElementById( moudleWrapperId );

    if( wrapperPrev ) {
      wrapperPrev.remove();
    }

    var imgFrameDivPrev = document.getElementById("imgFrame"); 
    if( imgFrameDivPrev ){
      imgFrameDivPrev.remove();
    }

    wrapper = document.createElement("div");
    wrapper.id = moudleWrapperId;
   

    if (this.result && !this.clear) {

      if (this.result.images) {
        wrapper = this.createFrame(wrapper);
      }

      if (this.result.videoId) {
                console.log("testing videoooooo");

        var videoWrapper = document.createElement("div")
        videoWrapper.className = "videoWrapper"
        var iframe = document.createElement('iframe')
        iframe.src = "https://www.youtube.com/embed/" + "oGneAab3e88" + "?autoplay=1&controls=0"
        videoWrapper.appendChild(iframe)
        wrapper.appendChild(videoWrapper)
      }

      if (this.result.displayText) {
                console.log("testing displayTextxxxxxx");

        var h1 = document.createElement('h1')
        h1.className = "animated fadeIn"
        var t = document.createTextNode(this.result.displayText)
        h1.appendChild(t)
        wrapper.appendChild(h1)
      }
    }

    return wrapper;
  },

  createFrame: function(wrapper){
      console.log("testing frameeee");

      var divImgFrame= document.createElement("div");
      divImgFrame.className = "imgFrame";
      divImgFrame.setAttribute('id', 'imgFrame');
      
      var oImg = document.createElement("img");
      oImg.setAttribute('src',  'modules/MMM-MirrorMirrorOnTheWall/nit_kav.jpg');
      oImg.setAttribute('height', '2150');//1920
      oImg.setAttribute('width', '1080');
      divImgFrame.appendChild(oImg);

      // var fullscreenDivContainer = ((document.getElementsByClassName("fullscreen")[0]).children[0]);
      // fullscreenDivContainer.style.display = "block";
      // fullscreenDivContainer.appendChild(divImgFrame);

      document.body.insertBefore(divImgFrame, document.body.firstChild);

  },

});
