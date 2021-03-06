'use strict';
/********************
 * Time Commands
 * This file contains commands that keep track of users activity.
 ********************/
let color = require('../config/color');
let moment = require('moment');
let request = require('request');
let rankLadder = require('../rank-ladder');

function convertTime(time) {
	time = time / 1000;
	let seconds = time % 60;
	time /= 60;
	let minutes = time % 60;
	time /= 60;
	let hours = time;
	return {
		s: Math.floor(seconds),
		m: Math.floor(minutes),
		h: Math.floor(hours),
	};
}

function displayTime(t) {
	return t.h + (t.h === 1 ? " hour " : " hours ") + t.m + (t.m === 1 ? " minute " : " minutes ") + t.s + (t.s === 1 ? " second" : " seconds");
}

exports.commands = {
	regdate: function (target, room, user) {
		if (!this.runBroadcast()) return;
		target = toId(target);
		if (!target) target = toId(user.name);
		request('http://pokemonshowdown.com/users/' + target, function (error, response, body) {
			if (error && response.statusCode !== 200) {
				this.sendReplyBox('<b><font color="' + color(target) + '">' + Chat.escapeHTML(target) + '</font></b> is not registered.');
				return room.update();
			}
			let regdate = body.split('<small>')[1].split('</small>')[0].replace(/(<em>|<\/em>)/g, '');
			if (regdate === '(Unregistered)') {
				this.sendReplyBox('<b><font color="' + color(target) + '">' + Chat.escapeHTML(target) + '</font></b> is not registered.');
			} else {
				this.sendReplyBox('<b><font color="' + color(target) + '">' + Chat.escapeHTML(target) + '</font></b> was registered on ' + regdate.slice(7) + '.');
			}
			room.update();
		}.bind(this));
	},
	regdatehelp: ["/regdate - Please specify a valid username."],

	seen: function (target, room, user) {
		if (!this.runBroadcast()) return;
		if (!target) return this.parse('/help seen');
		let targetUser = Users.get(target);
		if (targetUser && targetUser.connected) return this.sendReplyBox('<b><font color="' + color(toId(targetUser.name)) + '">' + targetUser.name + '</font></b> is <b>currently online</b>.');
		//if (targetUser.userid === 'username') return false;
		target = Chat.escapeHTML(target);
		let seen = Db('seen').get(toId(target));
		if (!seen) return this.sendReplyBox('<b><font color="' + color(toId(target)) + '">' + target + '</b> has never been online on this server.');
		this.sendReplyBox('<b><font color="' + color(toId(target)) + '">' + target + '</font></b> was last seen <b>' + moment(seen).fromNow() + '</b>.');
	},
	seenhelp: ["/seen - Shows when the user last connected on the server."],

	nolife: 'ontime',
	userontime: 'ontime',
	ontime: function (target, room, user) {
		if (!this.runBroadcast()) return;

		const userid = target ? toId(target) : user.userid;
		const currentOntime = Ontime[userid] ? Date.now() - Ontime[userid] : 0;
		const totalOntime = Db('ontime').get(userid, 0) + currentOntime;

		if (!totalOntime) return this.sendReplyBox(userid + " has never been online on this server.");
		const isConnected = Users.get(userid) && Users.get(userid).connected;

		// happens when a user opens 2 tabs and closes one of them, removing them from the Ontime object
		if (isConnected && !Ontime[userid]) Ontime[userid] = Date.now();

		if (isConnected) {
			this.sendReplyBox('<b><font color="' + color(userid) + '">' + userid + '</font></b>\'s total ontime is <b>' + displayTime(convertTime(totalOntime)) + '</b>.' + ' Current ontime: <b>' + displayTime(convertTime((currentOntime))) + '</b>.');
		} else {
			this.sendReplyBox('<b><font color="' + color(userid) + '">' + userid + '</font></b>\'s total ontime is <b>' + displayTime(convertTime(totalOntime)) + '</b>.' + ' Currently not online.');
		}
	},
	nolifeladder: 'ontimeladder',
	mostonline: 'ontimeladder',
	ontimeladder: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let keys = Object.keys(Db('ontime').object()).map(function (name) {
			let currentOntime = 0;
			if (Ontime[name]) currentOntime = Date.now() - Ontime[name];
			const totalOntime = Db('ontime').get(name, 0) + currentOntime;
			return {
				name: name,
				time: totalOntime,
			};
		});
		if (!keys.length) return this.sendReplyBox("Ontime ladder is empty.");
		keys.sort(function (a, b) {
			return b.time - a.time;
		});
		keys = keys.slice(0, 100).map(function (user) {
			return {
				name: user.name,
				time: displayTime(convertTime(user.time)),
			};
		});
		this.sendReplyBox(rankLadder('Ontime Ladder', 'Total Ontime', keys, 'time'));
	},
};
