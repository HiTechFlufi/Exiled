'use strict';

exports.BattleAbilities = {
	"highflying": {
		    id: "highflying",
		    name: "High Flying",
		    onModifyMove: function (move) {
			  move.stab = 0.5;
		    },
		    onModifySpePriority: 5,
		    onModifySpe: function (spe) {
			  return this.chainModify(1.5);
		    },
	  },
};
