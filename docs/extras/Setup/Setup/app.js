var app = new Vue({
	el: '#app',
	data: {
		isGameOn: false,
		userHealth: 100,
		monsterHealth: 100,
		actionsLog: [],
		isUserTurn: false
	},
	methods: {
		startNewGame: function() {
			this.isGameOn = !this.isGameOn;
			this.userHealth = 100;
			this.monsterHealth = 100;
			this.actionsLog = [];
		},
		willMonsterAttack: function() {
			if (this.gameIsActive) {
				this.monsterMakeNormalAttack();
			} else {
				this.startNewGame();
			}
		},
		changeTurn: function() {
			this.isUserTurn = !this.isUserTurn;
		},
		keepActionsLog: function(fromWhom, toWhom, attackPoint) {
			// change the turn to assign class accordingly
			this.changeTurn();
			console.log(this.isUserTurn);
			this.actionsLog.push({ fromWhom: fromWhom, toWhom: toWhom, attackPoint: attackPoint});
		},
		normalAttackHitPointGenerator: function() {
			// Generates a random num between 5 - 15
			var hitPoint = Math.floor(Math.random() * (15 - 5) + 5);
			return hitPoint;
		},
		userMakeNormalAttack: function() {
			// Hit the monster
			var attackPoint = this.normalAttackHitPointGenerator();
			this.monsterHealth -= attackPoint;
			this.keepActionsLog('you', 'monster', parseInt(attackPoint));
			this.willMonsterAttack();
		},
		monsterMakeNormalAttack: function() {
			// Hit the monster
			var attackPoint = this.normalAttackHitPointGenerator();
			this.userHealth -= attackPoint;
			this.keepActionsLog('monster', 'you', parseInt(attackPoint))
			if (!this.gameIsActive) {
				this.startNewGame();
			}
		},
		userMakeSpecialAttack: function() {
			// Generates a random num between 10 - 25
			var specialAttackHitPoint = Math.floor(Math.random() * (25 - 10) + 10);
			this.monsterHealth -= specialAttackHitPoint;
			this.keepActionsLog('you', 'monster', parseInt(specialAttackHitPoint));
			this.willMonsterAttack();
		},
		userHealSelf: function() {
			// user health should not be over 100 points
			if (this.userHealth < 91) {
				this.userHealth += 10;
			}
			this.willMonsterAttack();
		},
		userGiveUp: function() {
			alert("You gave up, Coward!");
			this.isGameOn = !this.isGameOn;
		}
	},
	computed: {
		gameIsActive: function() {
			if (this.monsterHealth <= 0) {
				alert("You win the game!");
				// this.startNewGame();
				return false;
			} else if (this.userHealth <= 0) {
				alert("You lost the game!");
				return false;
				// this.startNewGame();
			}
			return true;
		},
		actionsLogReverse: function() {
			return this.actionsLog.slice(0).reverse();
		}
	}
})