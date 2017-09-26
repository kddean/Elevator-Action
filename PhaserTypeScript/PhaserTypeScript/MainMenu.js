var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ElevatorAction;
(function (ElevatorAction) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MainMenu.prototype.create = function () {
            var text = "Click to Begin";
            var style = { font: "30px Arial", fill: "#fff", align: "center" };
            var t = this.add.text(this.game.width / 2, this.game.height / 2, text, style);
            t.anchor.set(0.5);
        };
        MainMenu.prototype.update = function () {
            if (this.input.activePointer.justPressed()) {
                this.state.start('Game');
            }
        };
        return MainMenu;
    }(Phaser.State));
    ElevatorAction.MainMenu = MainMenu;
})(ElevatorAction || (ElevatorAction = {}));
//# sourceMappingURL=MainMenu.js.map