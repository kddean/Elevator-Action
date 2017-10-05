module ElevatorAction {
    export class GameWon extends Phaser.State {
        youWinScreen: Phaser.Sprite;
        fireButton: Phaser.Key;
        preload() {
            this.load.image('youWin', 'assets/you_win.png');
            this.fireButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        }
        create() {
            this.youWinScreen = this.add.sprite(0, 0, 'youWin');
        }
        update() {
            if (this.fireButton.isDown) {
                this.state.start('Game', true, false);
            }
        }
    }
}