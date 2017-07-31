"use strict";
var util = require('../util');
var topic = require('../models/topic.js');

module.exports = function (param) {
    // param object contains the following keys:
    // 1. command - the primary command name
    // 2. args - an array of strings, which is user's message posted in the channel, separated by space
    // 3. user - Slack client user id
    // 4. channel - Slack client channel id
    // 5. commandConfig - the json object for this command from config/commands.json
	let text = "";
    if ( param.args ){
		if (param.args.length > 1){
			for (let i = 0; i < param.args.length; ++i){
				text += param.args[i];
				if (i++ ==! param.args.length){
					text += " ";
				}
			}
		} else {
			text = param.args;
		}
	}

	let input = new topic(text, param.user);
	global.list.push(input);
    // send back the response
    // more on this method here: https://api.slack.com/methods/chat.postMessage
	console.log(global.list)
	util.postMessage(param.channel, `Meeting topic "${text}" saved.`);
};