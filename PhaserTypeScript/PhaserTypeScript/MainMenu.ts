module ElevatorAction {
    export class MainMenu extends Phaser.State {
        create() {
            var text = "Click to Begin";
            var style = { font: "30px Arial", fill: "#fff", align: "center" };
            var t = this.add.text(this.game.width / 2, this.game.height / 2, text, style);
            t.anchor.set(0.5);
        }
        update() {
            if (this.input.onTap) {
                this.game.state.start('Game', true, false);
            }
        }

    }
}