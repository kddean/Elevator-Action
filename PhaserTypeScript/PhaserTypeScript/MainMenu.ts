module ElevatorAction {
    export class MainMenu extends Phaser.State {
        preload() {
            this.game.load.image('button', 'assets/start.png');
        }
        create() {
            var button = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY, 'button', this.actionOnClick, this, 2, 1, 0);
            button.scale.setTo(0.5, 0.5);
        }
        actionOnClick() {
            this.game.state.start('Game', true, false);
        }
    }
}