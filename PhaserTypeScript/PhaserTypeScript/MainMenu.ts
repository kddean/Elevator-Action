module ElevatorAction {
    export class MainMenu extends Phaser.State {
        music: Phaser.Sound;
        startScreen: Phaser.Sprite;
        fireButton: Phaser.Key;
        preload() {
            //this.game.load.image('button', 'assets/start.png');
            this.game.load.audio('start', 'assets/shoot.wav');
            this.game.load.spritesheet('pressStart', 'assets/r_introscreen_space.png', 1080, 1920);
            this.fireButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        }
        create() {
            //var button = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY, 'button', this.actionOnClick, this, 2, 1, 0);
            //button.scale.setTo(0.5, 0.5);
            this.startScreen = this.game.add.sprite(0, 0, 'pressStart');
            //this.game.physics.arcade.enable(this.startScreen);
            //this.startScreen.animations.add('idle', [1, 2]);
            this.music = this.add.audio('shoot');
            
            
            
        }
        update() {
            if (this.fireButton.isDown) {
                this.state.start('Game', true, false);
            }
            //this.startScreen.animations.play('idle');
            //this.startScreen.animations.currentAnim.speed = 10;
        }
        //actionOnClick() {
            
        //}
    }
}