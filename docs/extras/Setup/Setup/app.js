var app = new Vue({
	el: '#app',
	data: {
		isGameOn: false,
		userHealth: 100,
		monsterHealth: 100,
		actionsLog: []
	},
	methods: {
		// ==================== 
		// START NEW GAME BUTTONS
		// ==================== 
		startNewGame: function() {
			this.isGameOn = !this.isGameOn;
			this.userHealth = 100;
			this.monsterHealth = 100;
			this.actionsLog = [];
		},
		willMonsterAttack: function() {
			// Add a deloy before monster hits
			var vm = this;
			setTimeout(function() {
				if (vm.gameIsActive) {
					vm.monsterMakeNormalAttack();
				} else {
					vm.startNewGame();
				}
			}, 200);
		},
		normalAttackHitPointGenerator: function() {
			// Generates a random num between 5 - 15
			var max = 15;
			var min = 5;
			var hitPoint = Math.floor(Math.random() * (max - min) + min);
			return hitPoint;
		},
		// =============== 
		// GAME ON BUTTONS
		// =============== 
		userMakeNormalAttack: function() {
			// Hit the monster
			var attackPoint = this.normalAttackHitPointGenerator();
			this.monsterHealth -= attackPoint;
			this.actionsLog.unshift({
				fromWhom: 'player',
				text: 'Player hits to monster for ' + parseInt(attackPoint) + ' points'
			});
			this.willMonsterAttack();
		},
		monsterMakeNormalAttack: function() {
			// Hit the monster
			var attackPoint = this.normalAttackHitPointGenerator();
			this.userHealth -= attackPoint;
			this.actionsLog.unshift({
				fromWhom: 'monster',
				text: 'monster hits to player for ' + parseInt(attackPoint) + ' points'
			});
			if (!this.gameIsActive) {
				this.startNewGame();
			}
		},
		userMakeSpecialAttack: function() {
			// Generates a random num between 10 - 25
			var specialAttackHitPoint = Math.floor(Math.random() * (25 - 10) + 10);
			this.monsterHealth -= specialAttackHitPoint;
			this.actionsLog.unshift({
				fromWhom: 'player',
				text: 'Player hits to monster for ' + parseInt(specialAttackHitPoint) + ' points'
			});
			this.willMonsterAttack();
		},
		userHealSelf: function() {
			// user health should not be over 100 points
			if (this.userHealth >= 91) {
				this.userHealth = 100;
			} else {
				this.userHealth += 10;
			}
			this.actionsLog.unshift({
				fromWhom: 'player',
				text: 'Player heals self for 10 points'
			});
			// Syntactic Sugar: 
			// this.userHealth >= 91 ? this.userHealth = 100 : this.userHealth += 10;
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
				return false;
			} else if (this.userHealth <= 0) {
				alert("You lost the game!");
				return false;
			}
			return true;
		}
	}
})