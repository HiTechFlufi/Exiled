'use strict';

exports.BattleScripts = {
	randomWWETeam: function (side) {
		let team = [];
		let sets = {
			'John Cena': {
				species: 'Machoke',
				ability: 'Huge Power',
				item: 'Eviolite',
				gender: 'M',
				moves: ['Mega Punch', 'Circle Throw', 'Superpower'],
				baseSignatureMove: "attitudeadjustment",
				signatureMove: "Attitude Adjustment",
				evs: {
					hp: 248,
					atk: 92,
					def: 84,
					spd: 84,
				},
				nature: "Adamant",
			},
			'Randy Orton': {
				species: "Sawk",
				ability: "Sheer Force",
				item: "Choice Band",
				gender: "M",
				moves: ['closecombat', 'bulletpunch', 'rollingkick'],
				baseSignatureMove: "rko",
				signatureMove: "RKO",
				evs: {
					atk: 252,
					spe: 252,
					hp: 4,
				},
				nature: "Adamant",
			},
			'Kalisto': {
				species: "Hawlucha",
				ability: "High Flying",
				gender: "M",
				item: 'Focus Sash',
				moves: ['bounce', 'jumpkick', 'dragondance'],
				baseSignatureMove: "salitadelsol",
				signatureMove: "Salita Del Sol",
				evs: {
					atk: 240,
					spe: 252,
					def: 16,
				},
				nature: 'Jolly',
			},
		};

		let pool = Object.keys(sets);
		for (let i = 0; i < 6; i++) {
			let name = this.sampleNoReplace(pool);
			let set = sets[name];
			set.name = name;
			set.level = 100;
			if (!set.ivs) {
				set.ivs = {
					hp: 31,
					atk: 31,
					def: 31,
					spa: 31,
					spd: 31,
					spe: 31,
				};
			} else {
				for (let iv in {
					hp: 31,
					atk: 31,
					def: 31,
					spa: 31,
					spd: 31,
					spe: 31,
				}) {
					set.ivs[iv] = iv in set.ivs ? set.ivs[iv] : 31;
				}
			}
			// Assuming the hardcoded set evs are all legal.
			if (!set.evs) {
				set.evs = {
					hp: 84,
					atk: 84,
					def: 84,
					spa: 84,
					spd: 84,
					spe: 84,
				};
			}
			set.moves = [this.sampleNoReplace(set.moves), this.sampleNoReplace(set.moves), this.sampleNoReplace(set.moves)].concat(set.signatureMove);
			team.push(set);
		}

		return team;
	},
};
