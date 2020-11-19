'use strict';
const awsIot = require('aws-iot-device-sdk');

var app = {}
app.TOPIC_IMAGES = "MagicMirror:new-images"
app.TOPIC_TEXT = "MagicMirror:new-text"
app.TOPIC_MODULE = "MagicMirror:change-module"
app.TOPIC_VIDEO = "MagicMirror:new-video"

var main_dir = "/home/pi/MagicMirror-New/MagicMirror/modules/MMM-MirrorMirrorOnTheWall";

// Setup our AWS IoT device and receive messages
app.setup = function() {
  app.device = awsIot.device({
    keyPath: main_dir + "/certs/MagicMirror-New.private.key",
    certPath: main_dir + "/certs/MagicMirror-New.cert.pem",
    caPath: main_dir + "/certs/root-CA.crt",
    clientId: "MagicMirror" + (new Date().getTime()),
    host: "a2b4djvaxueean-ats.iot.us-east-1.amazonaws.com",
  });

  /**
   * AWS IoT - Connecting MagicMirror as a device to our AWS IoT topics
   */
  console.log("Attempt to connect to AWS ");
  app.device.on("connect", function() {
    console.log("Connected to AWS IoT");

    app.device.subscribe(app.TOPIC_TEXT);
    console.log("Subscribed: " + app.TOPIC_TEXT);

    app.device.subscribe(app.TOPIC_IMAGES);
    console.log("Subscribed: " + app.TOPIC_IMAGES);

    app.device.subscribe(app.TOPIC_MODULE);
    console.log("Subscribed: " + app.TOPIC_MODULE);

    app.device.subscribe(app.TOPIC_VIDEO);
    console.log("Subscribed: " + app.TOPIC_VIDEO);
  });

  // Listeners
  app.device.on("message", function(topic, payload) {
    var JSONpayload = JSON.parse(payload.toString());

    // If successfull, let's let our application know
    for (var i = 0; i < app.callbacks.length; i++) {
      app.callbacks[i](topic, JSONpayload);
    }
  })
}

// Callbacks that will be invoked when a message is received
app.callbacks = [];

app.onMessage = function(callback) {
  app.callbacks.push(callback);
}

module.exports = app
