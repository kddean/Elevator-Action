module ElevatorAction {
    export class Main extends Phaser.Game {
        constructor() {
            var renderMode: number = Phaser.AUTO;
            super(1890, 1000, renderMode, "content", null);
            //this.state.add('Boot', Boot, false);
            //this.state.add('Preloader', Preloader, false);
            this.state.add('MainMenu', MainMenu, false);
            this.state.add('Game', Game, false);

            this.state.start('MainMenu');
        }

    }

    export class GameStates {
        static MAINMENU: string = "mainMenu";
        static GAME: string = "game";
    }
}


