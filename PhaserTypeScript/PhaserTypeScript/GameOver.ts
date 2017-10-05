module ElevatorAction {
    export class GameOver extends Phaser.State {
        GameOverScreen: Phaser.Sprite;
        gameOver1: Phaser.Sprite;
        gameOver2: Phaser.Sprite;
        gameOver3: Phaser.Sprite;
        gameOver4: Phaser.Sprite;
        gameOver5: Phaser.Sprite;
        gameOver6: Phaser.Sprite;
        fireButton: Phaser.Key;
        preload() {
            this.game.load.spritesheet('gameOver1', 'assets/GameOver/gameover_01.png', 1920, 1080);
            this.game.load.spritesheet('gameOver2', 'assets/GameOver/gameover_02.png', 1920, 1080);
            this.game.load.spritesheet('gameOver3', 'assets/GameOver/gameover_03.png', 1920, 1080);
            this.game.load.spritesheet('gameOver4', 'assets/GameOver/gameover_04.png', 1920, 1080);
            this.game.load.spritesheet('gameOver5', 'assets/GameOver/gameover_05.png', 1920, 1080);
            this.game.load.spritesheet('gameOver6', 'assets/GameOver/gameover_06.png', 1920, 1080);
            this.fireButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        }
        create() {
            //GameOver Things
            this.gameOver1 = this.game.add.sprite(0, 0, 'gameOver1');
            this.game.physics.arcade.enable(this.gameOver1);
            this.gameOver1.visible = false;
            this.gameOver1.animations.add('ending1', [0, 1, 2, 3, 4], 0, true);

            this.gameOver2 = this.game.add.sprite(0, 0, 'gameOver2');
            this.game.physics.arcade.enable(this.gameOver2);
            this.gameOver2.visible = false;
            this.gameOver2.animations.add('ending2', [0, 1, 2, 3, 4], 0, true);

            this.gameOver3 = this.game.add.sprite(0, 0, 'gameOver3');
            this.game.physics.arcade.enable(this.gameOver3);
            this.gameOver3.visible = false;
            this.gameOver3.animations.add('ending3', [0, 1, 2, 3, 4], 0, true);

            this.gameOver4 = this.game.add.sprite(0, 0, 'gameOver4');
            this.game.physics.arcade.enable(this.gameOver4);
            this.gameOver4.visible = false;
            this.gameOver4.animations.add('ending4', [0, 1, 2, 3, 4], 0, true);

            this.gameOver5 = this.game.add.sprite(0, 0, 'gameOver5');
            this.game.physics.arcade.enable(this.gameOver5);
            this.gameOver5.visible = false;
            this.gameOver5.animations.add('ending5', [0, 1, 2], 0, true);

            this.gameOver6 = this.game.add.sprite(0, 0, 'gameOver6');
            this.game.physics.arcade.enable(this.gameOver6);
            this.gameOver6.visible = false;
            this.gameOver6.animations.add('ending6', [0, 1], 0, true);

        }
        update() {
            this.gameOver1.visible = true;
            this.gameOver1.animations.play('ending1', 10, false, true);
            if (!this.gameOver1.alive) {
                this.gameOver1.visible = false;
                this.gameOver2.visible = true;
                this.gameOver2.animations.play('ending2', 10, false, true);
            }
            if (!this.gameOver2.alive) {
                this.gameOver2.visible = false;
                this.gameOver3.visible = true;
                this.gameOver3.animations.play('ending3', 10, false, true);
            }
            if (!this.gameOver3.alive) {
                this.gameOver3.visible = false;
                this.gameOver4.visible = true;
                this.gameOver4.animations.play('ending4', 10, false, true);
            }
            if (!this.gameOver4.alive) {
                this.gameOver4.visible = false;
                this.gameOver5.visible = true;
                this.gameOver5.animations.play('ending5', 10, false, true);
            }
            if (!this.gameOver5.alive) {
                this.gameOver5.visible = false;
                this.gameOver6.visible = true;
                this.gameOver6.animations.play('ending6', 10, true, true);
            }
            if (this.fireButton.isDown) {
                this.state.start('Game', true, false);
            }

        }
    }
}