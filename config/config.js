/* Magic Mirror Config Sample
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information on how you can configure this file
 * See https://github.com/MichMich/MagicMirror#configuration
 *
 */

var config = {
	address: "0.0.0.0", 	// Address to listen on, can be:
							// - "localhost", "127.0.0.1", "::1" to listen on loopback interface
							// - another specific IPv4/6 to listen on a specific interface
							// - "0.0.0.0", "::" to listen on any interface
							// Default, when address config is left out or empty, is "localhost"
	port: 8080,
	basePath: "/", 	// The URL path where MagicMirror is hosted. If you are using a Reverse proxy
					// you must set the sub path here. basePath must end with a /
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1", "192.168.1.17", "192.168.1.68", "192.168.1.230"], 	// Set [] to allow all IP addresses
															// or add a specific IPv4 of 192.168.1.5 :
															// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
															// or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
															// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	useHttps: false, 		// Support HTTPS or not, default "false" will use HTTP
	httpsPrivateKey: "", 	// HTTPS private key path, only require when useHttps is true
	httpsCertificate: "", 	// HTTPS Certificate path, only require when useHttps is true

	language: "en",
	logLevel: ["INFO", "LOG", "WARN", "ERROR"],
	timeFormat: 24,
	units: "metric",
	// serverOnly:  true/false/"local" ,
	// local for armv6l processors, default
	//   starts serveronly and then starts chrome browser
	// false, default for all NON-armv6l devices
	// true, force serveronly mode, because you want to.. no UI on this device

	modules: [
		{
			module: "alert",
			disabled: true
		},
		{
			module: "updatenotification",
			position: "top_bar"
		},
		{
			module: "clock",
			position: "top_left"
		},
		{
			module: "calendar",
			header: "US Holidays",
			position: "top_left",
			config: {
				calendars: [
					{
						symbol: "calendar-check",
						url: "webcal://www.calendarlabs.com/ical-calendar/ics/76/US_Holidays.ics"					}
				]
			}
		},
		{
			module: "compliments",
			position: "lower_third"
		},
		{
			module: "currentweather",
			position: "top_right",
			config: {
				location: "New York",
				locationID: "4887398", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
				appid: "979035e38dd95d5467ab3a2ebd5b2d01"
			}
		},
		{
			module: "weatherforecast",
			position: "top_right",
			header: "Weather Forecast",
			config: {
				location: "New York",
				locationID: "4887398", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city.
				appid: "979035e38dd95d5467ab3a2ebd5b2d01"
			}
		},
		{
			module: "newsfeed",
			position: "bottom_bar",
			config: {
				feeds: [
					{
						title: "New York Times",
						url: "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml"
					}
				],
				showSourceTitle: true,
				showPublishDate: true,
				broadcastNewsFeeds: true,
				broadcastNewsUpdates: true
			}
		},
		{
           module: 'MMM-MirrorMirrorOnTheWall',
           position: "middle_center",
           config: {}
        },
        {
		    module: 'MMM-Remote-Control',
		    // uncomment the following line to show the URL of the remote control on the mirror
		    // position: 'bottom_left',
		    // you can hide this module afterwards from the remote control itself
		    config: {
		        customCommand: {},  // Optional, See "Using Custom Commands" below
		        showModuleApiMenu: true, // Optional, Enable the Module Controls menu
		        secureEndpoints: true, // Optional, See API/README.md
		        // uncomment any of the lines below if you're gonna use it
		        // customMenu: "custom_menu.json", // Optional, See "Custom Menu Items" below
		        // apiKey: "", // Optional, See API/README.md for details
		        // classes: {} // Optional, See "Custom Classes" below
		    }
		},
		{
			disabled: true,
			module: "MMM-EmbedYoutube", // Path to youtube module from modules folder Exmaple: MagicMirror/modules/custom/MMM-EmbedYoutube/ so it's custom/MMM-EmbedYoutube
			position: "middle_center",	// This can be any of the regions.
			config: {
				// See 'Configuration options' in README.md for more information.
				video_id: "oGneAab3e88",
				loop: false
			}
		},
		{
			module: 'MMM-GmailFeed',
			position: 'upper_third',
			config: {
				username: 'kavyavj15@gmail.com',
				password: 'utxyxeanzbmtcgmg',
				maxEmails: 5,
				maxSubjectLength: 38,
				maxFromLength: 15,
				playSound: false
			}
		},
		{
			module: "MMM-cryptocurrency",
			position: "bottom_left",
			config: {
				//apikey: '1234-5678-9009-8765-4321',
				apikey: 'c37b5d0b-203c-4230-a242-84109c7bbf96',
				currency: ['bitcoin', 'ethereum'],
				conversion: 'USD',
				headers: ['change24h', 'change1h', 'change7d'],
				displayType: 'logoWithChanges',
				showGraphs: true
			}
		},
		{
    		module: "MMM-Stock",
    		position: "bottom_right",
    		config: {
    			companies: ["MSFT", "GOOG", "ORCL", "FB", "AAPL"]
    		}
		},
		// {
  //   		module: "MMM-Stock-crypto", //Z2AUZ6MDYV2790ER
  //   		position: "bottom_left",
  //   		config: {
  //   			companies: ["SPY", "QQQ", "IWM", "XLF", "GLD"]
  //   		}
		// }
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}