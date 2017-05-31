'use strict';

exports.BattleMovedex = {
	"attitudeadjustment": {
		id: "attitudeadjustment",
		name: "Attitude Adjustment",
		self: {
			boosts: {
				def: 1,
			},
		},
		flags: {
			protect: 1,
			mirror: 1,
		},
		secondary: false,
		category: "Physical",
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Sky Drop", target);
		},
		basePower: 120,
		pp: 0.625,
		accuracy: 95,
		target: "normal",
		type: "Normal",
		zMovePower: 165,
		contestType: "Tough",
	},
	"rko": {
		id: "rko",
		name: "RKO",
		flags: {
			protect: 1,
			mirror: 1,
		},
		secondary: false,
		category: "Physical",
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Body Slam", target);
		},
		basePower: 150,
		pp: 0.625,
		accuracy: 50,
		status: "par",
		target: "normal",
		type: "Normal",
		zMovePower: 195,
		contestType: "Tough",
	},
	"salitadelsol": {
		id: "salitadelsol",
		name: "Salita del sol",
		self: {
			boosts: {
				spe: 1,
				atk: 1,
			},
		},
		flags: {
			protect: 1,
			mirror: 1,
		},
		secondary: false,
		category: "Physical",
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Rolling Kick", target);
		},
		basePower: 60,
		pp: 0.625,
		accuracy: 100,
		target: "normal",
		type: "Normal",
		zMovePower: 100,
		contestType: "Clever",
	},
};
