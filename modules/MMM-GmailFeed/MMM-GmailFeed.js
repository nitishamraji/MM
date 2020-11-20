'use strict';

Module.register("MMM-GmailFeed", {

	mailCount: 0,
	jsonData: null,
	errorData: null,

	// Default module config.
	defaults: {
		maxEmails: 5,
		maxSubjectLength: 40,
		maxFromLength: 15,
		playSound: true
	},

	start: function () {
		this.getJson();
		//this.scheduleUpdate();
		this.hide();
	},

	scheduleUpdate: function () {
		/**
		var self = this;
		setInterval(function () {
			self.getJson();
		}, this.config.updateInterval);
		**/
	},

	// Define required scripts.
	getStyles: function () {
		return ["MMM-GmailFeed.css"];
	},

	// Define required scripts.
	getScripts: function() {
		return ["moment.js"];
	},

	// Request node_helper to get json from url
	getJson: function () {
		this.sendSocketNotification("MMM-GmailFeed_GET_JSON", this.config);
	},

	socketNotificationReceived: function (notification, payload) {
		if (notification === "MMM-GmailFeed_JSON_RESULT") {
			// Only continue if the notification came from the request we made
			// This way we can load the module more than once
			if (payload.username === this.config.username) {
				this.jsonData = payload.data;
				this.errorData = null;
				this.updateDom(500);
			}
		}
		if (notification === "MMM-GmailFeed_JSON_ERROR") {
			if(payload.username === this.config.username) {
				this.jsonData = null;
				this.errorData = "Error: [" + payload.error + "]";
				this.updateDom(500);
			}
		}
	},

	// Override getHeader method.
	getHeader: function() {
		if (!this.jsonData) {
			return "GmailFeed";
		}

		if (this.config.playSound && this.jsonData.fullcount > this.mailCount) {
			new Audio(this.file("eventually.mp3")).play();
		}

		this.mailCount = this.jsonData.fullcount;

		return this.jsonData.title + "  -  " + this.jsonData.fullcount;
	},

	// Override dom generator.
	getDom: function () {

		var wrapper = document.createElement("div");
		var table = document.createElement("table");
		wrapper.appendChild(table);

		table.classList.add("mailtable");
		if (this.errorData) {
			table.innerHTML = this.errorData;
			return table;;
		}

		if (!this.jsonData) {
			table.innerHTML = "Loading...";
			return table;
		}

		if (!this.jsonData.entry) {
			var row = document.createElement("tr");
			table.append(row);

			var cell = document.createElement("td");
			row.append(cell);
			cell.append(document.createTextNode("No New Mail"));
			cell.setAttribute("colspan", "4");
			return table;
		}

		var items = this.jsonData.entry;

		// If the items is null, no new messages
		if (!items) {
			return table;
		}
	
		// If the items is not an array, it's a single entry
		if (!Array.isArray(items)) {
			items = [ items ]
		}
	
		items.forEach(element => {
			var row = this.getTableRow(element);
			table.appendChild(row);
		});

		return wrapper;
	},

	getTableRow: function (jsonObject) {
		var row = document.createElement("tr");
		row.classList.add("normal");

		var fromNode = document.createElement("td");
		var subjNode = document.createElement("td");
		var dtNode = document.createElement("td");
		var tmNode = document.createElement("td");

		var issueDt = moment(jsonObject.issued);

		fromNode.append(document.createTextNode(jsonObject.author.name.substring(0, this.config.maxFromLength)));
		subjNode.append(document.createTextNode(jsonObject.title.substring(0, this.config.maxSubjectLength)));
		if (!issueDt.isSame(new Date(), "day")) {
			dtNode.append(document.createTextNode(issueDt.format("MMM DD - ")));
		}
		tmNode.append(document.createTextNode(issueDt.format("h:mm a")));

		fromNode.classList.add("colfrom");
		subjNode.classList.add("colsubj");
		dtNode.classList.add("coldt");
		tmNode.classList.add("coltm");

		row.append(fromNode);
		row.append(subjNode);
		row.append(dtNode);
		row.append(tmNode);
	
		return row;
	}

});
