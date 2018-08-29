new Vue({
    el: '#app', 
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameOn: false,
        log: []
    },
    methods: {
        startGame: function() {
            this.gameOn = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.log = [];
        },
        attack: function() {
            this.playerAttack('reg');
            if (this.whoWin()) return;
            this.monsterAttack();
            this.whoWin();
        },
        specialAttack: function() {
            this.playerAttack('spc');
            if (this.whoWin()) return;
            this.monsterAttack();
            this.whoWin();
        },
        heal: function() {
            if (this.playerHealth <= 90)
                this.playerHealth += 10;
            else
                this.playerHealth = 100;
            this.log.unshift({
                    isPlayer: true,
                    text: 'Player heals for 10'
                });
            this.monsterAttack();
        },
        giveUp: function() {
            this.gameOn = false;
        },
        damage: function(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        whoWin: function() {
            if (this.monsterHealth <= 0) {
                if(confirm('You win! Start a new game?')) {
                    this.startGame();
                } else {
                    this.gameOn = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if(confirm('You lost! Start a new game?')) {
                    this.startGame();
                } else {
                    this.gameOn = false;
                }
                return true;
            }
            return false;
        },
        playerAttack: function(type) {
            let damage;
            if (type === 'reg') {
                damage = this.damage(3, 10);
                this.monsterHealth -= damage;
                this.log.unshift({
                    isPlayer: true,
                    text: 'Player hits Monster with ' + damage
                });
            } else if (type === 'spc') {
                damage = this.damage(10, 20);
                this.monsterHealth -= damage;
                this.log.unshift({
                    isPlayer: true,
                    text: 'Player hits Monster hard with ' + damage
                });
            }

        },
        monsterAttack: function() {
            let damage = this.damage(5, 12)
            this.playerHealth -= damage;
            this.log.unshift({
                isPlayer: false,
                text: 'Monster hits Player with ' + damage
            });
        }
    }
});