module ElevatorAction {
    export class MainMenu extends Phaser.State {
        music: Phaser.Sound;
        startScreen: Phaser.Sprite;
        fireButton: Phaser.Key;
        startFrames: Phaser.Sprite;
        frame1: Phaser.Sprite;
        frame2: Phaser.Sprite;
        frame3: Phaser.Sprite;
        frame4: Phaser.Sprite;
        background: Phaser.Sprite;

        preload() {
            this.game.load.audio('start', 'assets/spooky.mp3');

            //Loading sprites for Startscreen
            this.game.load.image('back', 'assets/reference 1-5.png');
            this.game.load.spritesheet('startframe1', 'assets/introscreen_g1.png', 1920, 1080);
            this.game.load.spritesheet('startframe2', 'assets/introscreen_g2.png', 1920, 1080);
            this.game.load.spritesheet('startframe3', 'assets/introscreen_g3.png', 1920, 1080);
            this.game.load.spritesheet('startframe4', 'assets/introscreen_g4.png', 1920, 1080);


            this.game.load.spritesheet('pressStart', 'assets/r_introscreen_space.png', 1920, 1080);
            this.fireButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        }
        create() {
            //var button = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY, 'button', this.actionOnClick, this, 2, 1, 0);
            //button.scale.setTo(0.5, 0.5);

            this.game.add.sprite(0, 0, 'back');

            //this.frame1 = this.game.add.sprite(0, 0, 'startframe1');
            //this.game.physics.arcade.enable(this.frame1);
            //this.frame1.animations.add('idle1', [0, 1, 2, 3, 4], 0, true);
            //this.frame1.visible = false;
            //this.frame2 = this.game.add.sprite(0, 0, 'startframe2');
            //this.game.physics.arcade.enable(this.frame2);
            //this.frame2.animations.add('idle2', [0, 1, 2, 3, 4], 0, true);
            //this.frame2.visible = false;
            //this.frame3 = this.game.add.sprite(0, 0, 'startframe3');
            //this.game.physics.arcade.enable(this.frame3);
            //this.frame3.animations.add('idle3', [0, 1, 2, 3, 4], 0, true);
            //this.frame3.visible = false;
            //this.frame4 = this.game.add.sprite(0, 0, 'startframe4');
            //this.game.physics.arcade.enable(this.frame4);
            //this.frame4.animations.add('idle4', [0, 1, 2, 3], 0, true);
            //this.frame4.visible = false;

            this.startScreen = this.game.add.sprite(0, 0, 'pressStart');
            this.game.physics.arcade.enable(this.startScreen);
            this.startScreen.animations.add('idle', [0, 1], 0, true);
            this.startScreen.visible = false;
            this.music = this.add.audio('start');
            this.game.sound.setDecodedCallback([this.music], this.showPress, this);
            
            
        }
        update() {
            
            //this.frame1.animations.play('idle1', 5, false, true);
            //if (this.frame1.animations.currentAnim.complete) {
            //    this.frame1.animations.stop();
            //    this.frame1.visible = false;
            //    this.frame2.visible = true;
            //    this.frame2.animations.play('idle2', 2, true, false);
            //}
            //if (this.frame2.animations.currentAnim.complete) {
            //    this.frame2.animations.stop();
            //    this.frame2.visible = false;
            //    this.frame3.visible = true;
            //    this.frame3.animations.play('idle3', 2, false, true);
            //}
            //if (this.frame3.animations.currentAnim.complete) {
            //    this.frame3.animations.stop();
            //    this.frame3.visible = false;
            //    this.frame4.visible = true;
            //    this.frame4.animations.play('idle4', 2, false, true);
            //}
            ////this.frame3.visible = true;
            ////this.frame3.animations.play('idle', 10, false, true);
            ////this.frame3.visible = false;
            ////this.frame4.visible = true;
            ////this.frame4.animations.play('idle', 10, false, true);
            ////this.frame4.visible = false;
            //if (this.frame4.animations.currentAnim.complete) {
            //    this.frame4.visible = false;
            //this.showPress();
            //}
            if (this.fireButton.isDown) {
                this.music.stop();
                this.state.start('Game', true, false);
            }

        }

        showPress() {
            this.music.play();
            this.startScreen.visible = true;
            this.startScreen.animations.play('idle');
            this.startScreen.animations.currentAnim.speed = 5;
        }
        //actionOnClick() {
            
        //}
    }
}