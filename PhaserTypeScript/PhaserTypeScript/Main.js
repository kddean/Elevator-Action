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
window.onload = function () {
    var game = new ElevatorAction.Main();
};
var ElevatorAction;
(function (ElevatorAction) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.elevatorDir = 1;
            _this.isOnElevator = false;
            return _this;
        }
        Game.prototype.preload = function () {
            this.game.load.image('logo', 'phaser2.png');
            this.game.load.image('sky', 'assets/sky.png');
            this.game.load.image('background', 'assets/Quick Level.png');
            this.game.load.image('walls', 'assets/QL_Wall.png');
            this.game.load.image('sidewall', 'assets/QL_SideWall.png');
            this.game.load.image('topwall', 'assets/QL_TopWall.png');
            this.game.load.image('platform', 'assets/QL_platform.png');
            this.game.load.image('set1Floor', 'assets/Set_1_Floor.png');
            this.game.load.image('ground', 'assets/platform.png');
            this.game.load.image('ground2', 'assets/platformShort.png');
            this.game.load.image('ground3', 'assets/platformTiny.png');
            this.game.load.image('bullet', 'assets/bullet.png');
            this.game.load.image('star', 'assets/bullet.png');
            this.game.load.image('elevator', 'assets/feather.png');
            this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
            this.game.load.spritesheet('baddie', 'assets/baddie.png', 32, 48);
            this.game.load.spritesheet('doors1', 'assets/Doors_Blue.jpg', 25, 60, 4);
            this.game.load.spritesheet('doors2', 'assets/Doors_Red.jpg', 25, 75, 4);
            this.game.load.spritesheet('princess', 'assets/r_princess_all_sm.png', 110, 150);
            this.game.load.spritesheet('ghost', 'assets/mrghost.png', 181, 150);
            //this.game.load.spritesheet('princess_attact', 'assets/princess_attack.png', 181, 150, 10);
            this.game.load.image('button', 'assets/button.png');
            this.game.load.image('invisible', 'assets/Invisible Box.png');
            this.game.load.image('door', 'assets/fancydoor.png');
            this.game.load.image('wall', 'assets/hanger.png');
            this.game.load.image('floor', 'assets/fancyfloor.png');
            this.game.load.image('archway', 'assets/fancyArchwalls.png');
            this.game.load.image('key', 'assets/key.png');
            this.game.load.audio('shoot', 'assets/shoot.wav', true);
            this.game.load.audio('doorOpen', 'assets/door_open_2.wav', true);
            this.game.load.image('floors1', 'assets/floor1.png');
            this.game.load.image('floors2', 'assets/floor2.png');
            this.game.load.image('floors3', 'assets/floor3.png');
            this.game.load.image('floors4', 'assets/floor4.png');
            this.game.load.image('boblife', 'assets/bobnewlife.png');
        };
        Game.prototype.create = function () {
            this.keysCOllected = 0;
            this.game.camera.follow(this.player);
            this.game.world.resize(800, 1000);
            this.bulletTime = 0;
            this.score = 0;
            this.livesCount = 3;
            this.firingTimer = 0;
            this.numberOfEnemies = 1;
            this.gameTime = 50;
            this.scoreConst = "Score :";
            this.game.stage.backgroundColor = "#000000;";
            this.game.world.setBounds(0, 0, 1890, 5400);
            this.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.music = this.add.audio('shoot', 1, false);
            this.doorMusic = this.add.audio('doorOpen', 1, false);
            this.platforms = this.game.add.group();
            this.platforms.enableBody = true;
            this.floor1 = this.game.add.group();
            this.floor1.enableBody = true;
            this.game.physics.arcade.enable(this.floor1);
            this.floor2 = this.game.add.group();
            this.floor2.enableBody = true;
            this.game.physics.arcade.enable(this.floor2);
            this.floor3 = this.game.add.group();
            this.floor3.enableBody = true;
            this.game.physics.arcade.enable(this.floor3);
            this.floor4 = this.game.add.group();
            this.floor4.enableBody = true;
            this.game.physics.arcade.enable(this.floor4);
            this.floor5 = this.game.add.group();
            this.floor5.enableBody = true;
            this.game.physics.arcade.enable(this.floor5);
            this.floor6 = this.game.add.group();
            this.floor6.enableBody = true;
            this.game.physics.arcade.enable(this.floor6);
            this.floor7 = this.game.add.group();
            this.floor7.enableBody = true;
            this.game.physics.arcade.enable(this.floor7);
            this.floor8 = this.game.add.group();
            this.floor8.enableBody = true;
            this.game.physics.arcade.enable(this.floor8);
            this.leve1 = this.game.add.group();
            this.leve1.enableBody = true;
            this.game.physics.arcade.enable(this.leve1);
            //Background
            /*var h = 4320;
            this.game.add.sprite(0, 0, 'floors1');
            this.game.add.sprite(0, 1080, 'floors2');
            this.game.add.sprite(0, 2160, ' floors3');
            this.game.add.sprite(0, 3240, 'floors4');
            for (var f = 0; f < 2; f++) {
                    this.game.add.sprite(0, h, 'floors1');
                    h = h + 1080;
                    this.game.add.sprite(0, h, 'floors2');
                    h = h + 1080;
                    this.game.add.sprite(0, h, ' floors3');
                    h = h + 1080;
                    this.game.add.sprite(0, h, 'floors4');
                    h = h + 1080;
            }*/
            //this.game.add.sprite(0, -50, 'boblife'); 
            //Floor Layout
            var y = 190;
            var t;
            //for (var w = 0; w <= 3; w++) {
            for (var j = 0; j < 10; j++) {
                if (((j >= 0) && (j < 1)) || (j > 1 && j < 8) || (j > 8 && j <= 9)) {
                    t = this.leve1.create(j * 192, y, 'floor');
                    t.body.immovable = true;
                }
            }
            y = y + 216;
            for (var j = 0; j < 10; j++) {
                if (((j >= 0) && (j < 3)) || (j > 3 && j < 5) || (j >= 6 && j < 8) || (j == 9)) {
                    t = this.leve1.create(j * 192, y, 'floor');
                    t.body.immovable = true;
                }
            }
            y = y + 216;
            for (var j = 0; j < 10; j++) {
                if ((j < 3) || (j > 3 && j < 8) || (j == 9)) {
                    t = this.leve1.create(j * 192, y, 'floor');
                    t.body.immovable = true;
                }
            }
            y = y + 216;
            for (var j = 0; j < 10; j++) {
                if ((j > 0 && j < 3) || (j > 3 && j < 7) || (j > 7)) {
                    t = this.leve1.create(j * 192, y, 'floor');
                    t.body.immovable = true;
                }
            }
            y = y + 216;
            for (var j = 0; j < 10; j++) {
                if ((j > 0 && j < 3) || (j == 4) || (j > 7)) {
                    t = this.leve1.create(j * 192, y, 'floor');
                    t.body.immovable = true;
                }
            }
            y = y + 216;
            for (var j = 0; j < 10; j++) {
                if ((j > 0 && j < 3) || (j == 4) || (j == 8)) {
                    t = this.leve1.create(j * 192, y, 'floor');
                    t.body.immovable = true;
                }
            }
            y = y + 216;
            for (var j = 0; j < 10; j++) {
                if ((j >= 0 && j < 3) || (j > 3 && j < 6) || (j > 7)) {
                    t = this.leve1.create(j * 192, y, 'floor');
                    t.body.immovable = true;
                }
            }
            y = y + 216;
            for (var j = 0; j < 10; j++) {
                if ((j >= 0 && j < 2) || (j == 5) || (j > 6 && j < 9)) {
                    t = this.leve1.create(j * 192, y, 'floor');
                    t.body.immovable = true;
                }
            }
            y = y + 216;
            for (var j = 0; j < 10; j++) {
                if ((j >= 0 && j < 2) || (j > 2 && j < 6) || (j > 6)) {
                    t = this.leve1.create(j * 192, y, 'floor');
                    t.body.immovable = true;
                }
            }
            y = y + 216;
            for (var j = 0; j < 10; j++) {
                if ((j < 2) || ((j > 2) && (j < 7)) || (j == 9)) {
                    t = this.leve1.create(j * 192, y, 'floor');
                    t.body.immovable = true;
                }
            }
            y = y + 216;
            for (var j = 0; j < 10; j++) {
                if ((j < 2) || (j > 2 && j < 5) || (j == 6) || (j == 9)) {
                    t = this.leve1.create(j * 192, y, 'floor');
                    t.body.immovable = true;
                }
            }
            y = y + 216;
            for (var j = 0; j < 10; j++) {
                if ((j > 0 && j < 4) || (j > 4 && j < 7) || (j == 9)) {
                    t = this.leve1.create(j * 192, y, 'floor');
                    t.body.immovable = true;
                }
            }
            y = y + 216;
            for (var j = 0; j < 10; j++) {
                if ((j > 1 && j < 4) || (j > 4 && j < 9)) {
                    t = this.leve1.create(j * 192, y, 'floor');
                    t.body.immovable = true;
                }
            }
            y = y + 216;
            for (var j = 0; j < 10; j++) {
                if ((j < 1) || (j == 2) || (j > 5 && j < 9)) {
                    t = this.leve1.create(j * 192, y, 'floor');
                    t.body.immovable = true;
                }
            }
            y = y + 216;
            for (var j = 0; j < 10; j++) {
                if ((j < 1) || (j == 2) || (j > 4 && j < 7) || (j > 7)) {
                    t = this.leve1.create(j * 192, y, 'floor');
                    t.body.immovable = true;
                }
            }
            y = y + 216;
            for (var j = 0; j < 10; j++) {
                if ((j < 3) || (j > 3 && j < 6) || (j > 7)) {
                    t = this.leve1.create(j * 192, y, 'floor');
                    t.body.immovable = true;
                }
            }
            y = y + 216;
            for (var j = 0; j < 10; j++) {
                if ((j < 3) || (j == 4) || (j > 6)) {
                    t = this.leve1.create(j * 192, y, 'floor');
                    t.body.immovable = true;
                }
            }
            y = y + 216;
            for (var j = 0; j < 10; j++) {
                if ((j > 0 && j < 3) || (j == 4) || (j > 6)) {
                    t = this.leve1.create(j * 192, y, 'floor');
                    t.body.immovable = true;
                }
            }
            y = y + 216;
            for (var j = 0; j < 10; j++) {
                if ((j > 0 && j < 5) || (j > 5)) {
                    t = this.leve1.create(j * 192, y, 'floor');
                    t.body.immovable = true;
                }
            }
            y = y + 216;
            for (var j = 0; j < 10; j++) {
                if ((j < 2) || (j > 2 && j < 5) || (j > 5 && j > 8) || (j == 9)) {
                    t = this.leve1.create(j * 192, y, 'floor');
                    t.body.immovable = true;
                }
            }
            y = y + 216;
            for (var j = 0; j < 10; j++) {
                if ((j < 1) || (j > 1 && j < 8) || (j > 8)) {
                    t = this.leve1.create(j * 192, y, 'floor');
                    t.body.immovable = true;
                }
            }
            y = y + 216;
            // }
            for (var j = 0; j < 10; j++) {
                if ((j < 1) || (j > 1 && j < 4) || (j > 5 && j < 8) || (j == 9)) {
                    t = this.leve1.create(j * 192, y, 'floor');
                    t.body.immovable = true;
                }
            }
            y = y + 216;
            for (var j = 0; j < 10; j++) {
                if ((j == 2) || (j == 7)) {
                    t = this.leve1.create(j * 192, y, 'floor');
                    t.body.immovable = true;
                }
            }
            y = y + 216;
            for (var j = 0; j < 10; j++) {
                if ((j == 1) || (j == 8)) {
                    t = this.leve1.create(j * 192, y, 'floor');
                    t.body.immovable = true;
                }
            }
            y = y + 216;
            for (var j = 0; j < 10; j++) {
                if ((j > 1 && j < 8)) {
                    t = this.leve1.create(j * 192, y, 'floor');
                    t.body.immovable = true;
                }
            }
            y = y + 216;
            /*for (var j = 0; j < 10; j++) {
                    t = this.leve1.create(j * 192, y, 'floor');
                    t.body.immovable = true;
                }
                */
            //Door Placement
            this.doors = this.game.add.group();
            this.doors.enableBody = true;
            /*var z = 150;
            for (var d = 0; d < 3; d++) {
    
                for (var i = 0; i < 10; i++) {
                    if ((i>2 && i<4) || (i>4 && i<8) || (i==9)){
                        t = this.doors.create(((i * 192) + 20), z - 90, 'door');
                        t.body.immovable = true;
                    }
                }
                z = z + 216;
    
                for (var i = 0; i < 10; i++) {
                    if ((i < 1) || (i==2) || (i==7) || (i==9)) {
                        t = this.doors.create(((i * 192) + 20), z - 90, 'door');
                        t.body.immovable = true;
                    }
                }
                z = z + 216;
    
                for (var i = 0; i < 10; i++) {
                    if (( i < 3) || (i==4) || (i>5 && i<8) || (i==9)) {
                        t = this.doors.create(((i * 192) + 20), z - 90, 'door');
                        t.body.immovable = true;
                    }
                }
                z = z + 216;
    
                for (var i = 0; i < 10; i++) {
                    if ((i==2) || (i>3 && i<7) || (i==9)) {
                        t = this.doors.create(((i * 192) + 20), z - 90, 'door');
                        t.body.immovable = true;
                    }
                }
                z = z + 216;
    
                for (var i = 0; i < 10; i++) {
                    if ((i == 2)) {
                        t = this.doors.create(((i * 192) + 20), z - 90, 'door');
                        t.body.immovable = true;
                    }
                }
                z = z + 216;
    
                for (var i = 0; i < 10; i++) {
                    if ((i > 2 && i < 4) || (i > 4 && i < 8) || (i == 9)) {
                        t = this.doors.create(((i * 192) + 20), z - 90, 'door');
                        t.body.immovable = true;
                    }
                }
                z = z + 216;
    
                for (var i = 0; i < 10; i++) {
                    if ((i > 2 && i < 4) || (i > 4 && i < 8) || (i == 9)) {
                        t = this.doors.create(((i * 192) + 20), z - 90, 'door');
                        t.body.immovable = true;
                    }
                }
                z = z + 216;
    
                for (var i = 0; i < 10; i++) {
                    if ((i > 2 && i < 4) || (i > 4 && i < 8) || (i == 9)) {
                        t = this.doors.create(((i * 192) + 20), z - 90, 'door');
                        t.body.immovable = true;
                    }
                }
                z = z + 216;
    
                for (var i = 0; i < 10; i++) {
                    if ((i > 2 && i < 4) || (i > 4 && i < 8) || (i == 9)) {
                        t = this.doors.create(((i * 192) + 20), z - 90, 'door');
                        t.body.immovable = true;
                    }
                }
                z = z + 216;
    
                for (var i = 0; i < 10; i++) {
                    if ((i > 2 && i < 4) || (i > 4 && i < 8) || (i == 9)) {
                        t = this.doors.create(((i * 192) + 20), z - 90, 'door');
                        t.body.immovable = true;
                    }
                }
                z = z + 216;
    
                for (var i = 0; i < 10; i++) {
                    if ((i > 2 && i < 4) || (i > 4 && i < 8) || (i == 9)) {
                        t = this.doors.create(((i * 192) + 20), z - 90, 'door');
                        t.body.immovable = true;
                    }
                }
                z = z + 216;
    
                for (var i = 0; i < 10; i++) {
                    if ((i > 2 && i < 4) || (i > 4 && i < 8) || (i == 9)) {
                        t = this.doors.create(((i * 192) + 20), z - 90, 'door');
                        t.body.immovable = true;
                    }
                }
                z = z + 216;
    
                for (var i = 0; i < 10; i++) {
                    if ((i > 2 && i < 4) || (i > 4 && i < 8) || (i == 9)) {
                        t = this.doors.create(((i * 192) + 20), z - 90, 'door');
                        t.body.immovable = true;
                    }
                }
                z = z + 216;
    
                for (var i = 0; i < 10; i++) {
                    if ((i > 2 && i < 4) || (i > 4 && i < 8) || (i == 9)) {
                        t = this.doors.create(((i * 192) + 20), z - 90, 'door');
                        t.body.immovable = true;
                    }
                }
                z = z + 216;
    
                for (var i = 0; i < 10; i++) {
                    if ((i > 2 && i < 4) || (i > 4 && i < 8) || (i == 9)) {
                        t = this.doors.create(((i * 192) + 20), z - 90, 'door');
                        t.body.immovable = true;
                    }
                }
                z = z + 216;
    
                for (var i = 0; i < 10; i++) {
                    if ((i > 2 && i < 4) || (i > 4 && i < 8) || (i == 9)) {
                        t = this.doors.create(((i * 192) + 20), z - 90, 'door');
                        t.body.immovable = true;
                    }
                }
                z = z + 216;
    
                for (var i = 0; i < 10; i++) {
                    if ((i > 2 && i < 4) || (i > 4 && i < 8) || (i == 9)) {
                        t = this.doors.create(((i * 192) + 20), z - 90, 'door');
                        t.body.immovable = true;
                    }
                }
                z = z + 216;
    
                for (var i = 0; i < 10; i++) {
                    if ((i > 2 && i < 4) || (i > 4 && i < 8) || (i == 9)) {
                        t = this.doors.create(((i * 192) + 20), z - 90, 'door');
                        t.body.immovable = true;
                    }
                }
                z = z + 216;
    
                for (var i = 0; i < 10; i++) {
                    if ((i > 2 && i < 4) || (i > 4 && i < 8) || (i == 9)) {
                        t = this.doors.create(((i * 192) + 20), z - 90, 'door');
                        t.body.immovable = true;
                    }
                }
                z = z + 216;
    
                for (var i = 0; i < 10; i++) {
                    if ((i > 2 && i < 4) || (i > 4 && i < 8) || (i == 9)) {
                        t = this.doors.create(((i * 192) + 20), z - 90, 'door');
                        t.body.immovable = true;
                    }
                }
                z = z + 216;
    
           
            }*/
            //Keys
            this.keys = this.game.add.group();
            this.keys.enableBody = true;
            var q = 0;
            //for (var f = 0; f < 3; f++) {
            var k = this.keys.create(1280, 300 + q, 'key');
            var k = this.keys.create(210, 732 + q, 'key');
            var k = this.keys.create(50, 2028 + q, 'key');
            var k = this.keys.create(700, 2028 + q, 'key');
            var k = this.keys.create(1750, 2028 + q, 'key');
            var k = this.keys.create(1000, 2676 + q, 'key');
            var k = this.keys.create(1350, 3540 + q, 'key');
            var k = this.keys.create(600, 3756 + q, 'key');
            var k = this.keys.create(1750, 3756 + q, 'key');
            // q = q + 4770;
            //}
            //4470 + 300
            //Elevators
            /*this.elevator = this.game.add.sprite(1300, this.game.world.height - 100, 'elevator');
            this.elevatorT = this.game.add.sprite(380, this.game.world.height - 400, 'elevator');
            this.elevatorX = this.game.add.sprite(100, this.game.world.height - 800, 'elevator');
            this.elevatorY = this.game.add.sprite(1350, this.game.world.height - 800, 'elevator');
            this.game.physics.arcade.enable(this.elevator);
            this.game.physics.arcade.enable(this.elevatorT);
            this.game.physics.arcade.enable(this.elevatorX);
            this.game.physics.arcade.enable(this.elevatorY);
            this.elevator.body.enableBody = true;
            this.elevatorT.body.enableBody = true;
            this.elevatorX.body.enableBody = true;
            this.elevatorY.body.enableBody = true;
            this.elevator.body.collideWorldBounds = true;
            this.elevator.body.velocity.setTo(0, 100);
            this.elevator.body.bounce.set(1);
            //this.elevator.body.allowGravity = false;
            this.elevator.body.immovable = true;
            this.elevator.body.onCollide = new Phaser.Signal();



            // this.elevator.body.collideWorldBounds = true;
            this.elevatorT.body.collideWorldBounds = true;
            this.elevatorT.body.velocity.setTo(0, 100);
            this.elevatorT.body.bounce.set(1);
            this.elevatorT.body.immovable = true;
            this.elevatorT.body.onCollide = new Phaser.Signal();

            /*this.elevatorSet = this.game.add.group();
            this.elevatorSet.enableBody = true;
            for (var i = 0; i < 3; i++) {
                var r = this.elevatorSet.create((i + 1) * 150, 1800, 'elevator');
                r.scale.setTo(1, 1);
                r.body.immovable = true;
            }/

            this.elevatorX.body.collideWorldBounds = true;
            this.elevatorX.body.velocity.setTo(0, 100);
            this.elevatorX.body.bounce.set(1);
            this.elevatorX.body.immovable = true;
            this.elevatorX.body.onCollide = new Phaser.Signal();

            this.elevatorY.body.collideWorldBounds = true;
            this.elevatorY.body.velocity.setTo(0, 100);
            this.elevatorY.body.bounce.set(1);
            this.elevatorY.body.immovable = true;
            this.elevatorY.body.onCollide = new Phaser.Signal();
            */
            //New Elevators
            var plus = 1;
            var g = 4632;
            this.elevator1 = this.game.add.sprite(384 + 20, 216, 'elevator');
            this.game.physics.arcade.enable(this.elevator1);
            this.elevator1.body.enableBody = true;
            this.elevator1.body.collideWorldBounds = true;
            this.elevator1.body.velocity.setTo(0, 100);
            this.elevator1.body.bounce.set(1);
            this.elevator1.body.immovable = false;
            this.elevator1.body.onCollide = new Phaser.Signal();
            this.elevator2 = this.game.add.sprite(1728 + 20, 216, 'elevator');
            this.game.physics.arcade.enable(this.elevator2);
            this.elevator2.body.enableBody = true;
            this.elevator2.body.collideWorldBounds = true;
            this.elevator2.body.velocity.setTo(0, 100);
            this.elevator2.body.bounce.set(1);
            this.elevator2.body.immovable = true;
            this.elevator2.body.onCollide = new Phaser.Signal();
            this.elevator3 = this.game.add.sprite(768 + 20, 432, 'elevator');
            this.game.physics.arcade.enable(this.elevator3);
            this.elevator3.body.enableBody = true;
            this.elevator3.body.collideWorldBounds = true;
            this.elevator3.body.velocity.setTo(0, 100);
            this.elevator3.body.bounce.set(1);
            this.elevator3.body.immovable = true;
            this.elevator3.body.onCollide = new Phaser.Signal();
            this.elevator4 = this.game.add.sprite(1152 + 20, 432, 'elevator');
            this.game.physics.arcade.enable(this.elevator4);
            this.elevator4.body.enableBody = true;
            this.elevator4.body.collideWorldBounds = true;
            this.elevator4.body.velocity.setTo(0, 100);
            this.elevator4.body.bounce.set(1);
            this.elevator4.body.immovable = true;
            this.elevator4.body.onCollide = new Phaser.Signal();
            this.elevator5 = this.game.add.sprite(10 + 20, 864, 'elevator');
            this.game.physics.arcade.enable(this.elevator5);
            this.elevator5.body.enableBody = true;
            this.elevator5.body.collideWorldBounds = true;
            this.elevator5.body.velocity.setTo(0, 100);
            this.elevator5.body.bounce.set(1);
            this.elevator5.body.immovable = true;
            this.elevator5.body.onCollide = new Phaser.Signal();
            this.elevator6 = this.game.add.sprite(1536 + 20, 864, 'elevator');
            this.game.physics.arcade.enable(this.elevator6);
            this.elevator6.body.enableBody = true;
            this.elevator6.body.collideWorldBounds = true;
            this.elevator6.body.velocity.setTo(0, 100);
            this.elevator6.body.bounce.set(1);
            this.elevator6.body.immovable = true;
            this.elevator6.body.onCollide = new Phaser.Signal();
            this.elevator7 = this.game.add.sprite(1152 + 20, 1080, 'elevator');
            this.game.physics.arcade.enable(this.elevator7);
            this.elevator7.body.enableBody = true;
            this.elevator7.body.collideWorldBounds = true;
            this.elevator7.body.velocity.setTo(0, 100);
            this.elevator7.body.bounce.set(1);
            this.elevator7.body.immovable = true;
            this.elevator7.body.onCollide = new Phaser.Signal();
            this.elevator8 = this.game.add.sprite(1344 + 20, 1080, 'elevator');
            this.game.physics.arcade.enable(this.elevator8);
            this.elevator8.body.enableBody = true;
            this.elevator8.body.collideWorldBounds = true;
            this.elevator8.body.velocity.setTo(0, 100);
            this.elevator8.body.bounce.set(1);
            this.elevator8.body.immovable = true;
            this.elevator8.body.onCollide = new Phaser.Signal();
            this.elevator9 = this.game.add.sprite(1920 + 40, 1296, 'elevator');
            this.game.physics.arcade.enable(this.elevator9);
            this.elevator9.body.enableBody = true;
            this.elevator9.body.collideWorldBounds = true;
            this.elevator9.body.velocity.setTo(0, 100);
            this.elevator9.body.bounce.set(1);
            this.elevator9.body.immovable = true;
            this.elevator9.body.onCollide = new Phaser.Signal();
            this.elevator10 = this.game.add.sprite(576 + 20, 1728, 'elevator');
            this.game.physics.arcade.enable(this.elevator10);
            this.elevator10.body.enableBody = true;
            this.elevator10.body.collideWorldBounds = true;
            this.elevator10.body.velocity.setTo(0, 100);
            this.elevator10.body.bounce.set(1);
            this.elevator10.body.immovable = true;
            this.elevator10.body.onCollide = new Phaser.Signal();
            this.elevator11 = this.game.add.sprite(960 + 20, 1728, 'elevator');
            this.game.physics.arcade.enable(this.elevator11);
            this.elevator11.body.enableBody = true;
            this.elevator11.body.collideWorldBounds = true;
            this.elevator11.body.velocity.setTo(0, 100);
            this.elevator11.body.bounce.set(1);
            this.elevator11.body.immovable = true;
            this.elevator11.body.onCollide = new Phaser.Signal();
            this.elevator12 = this.game.add.sprite(1536 + 20, 1728, 'elevator');
            this.game.physics.arcade.enable(this.elevator12);
            this.elevator12.body.enableBody = true;
            this.elevator12.body.collideWorldBounds = true;
            this.elevator12.body.velocity.setTo(0, 100);
            this.elevator12.body.bounce.set(1);
            this.elevator12.body.immovable = true;
            this.elevator12.body.onCollide = new Phaser.Signal();
            this.elevator13 = this.game.add.sprite(1920 + 40, 1728, 'elevator');
            this.game.physics.arcade.enable(this.elevator13);
            this.elevator13.body.enableBody = true;
            this.elevator13.body.collideWorldBounds = true;
            this.elevator13.body.velocity.setTo(0, 100);
            this.elevator13.body.bounce.set(1);
            this.elevator13.body.immovable = true;
            this.elevator13.body.onCollide = new Phaser.Signal();
            this.elevator14 = this.game.add.sprite(1536 + 20, 2160, 'elevator');
            this.game.physics.arcade.enable(this.elevator14);
            this.elevator14.body.enableBody = true;
            this.elevator14.body.collideWorldBounds = true;
            this.elevator14.body.velocity.setTo(0, 100);
            this.elevator14.body.bounce.set(1);
            this.elevator14.body.immovable = true;
            this.elevator14.body.onCollide = new Phaser.Signal();
            this.elevator15 = this.game.add.sprite(1728 + 20, 2160, 'elevator');
            this.game.physics.arcade.enable(this.elevator15);
            this.elevator15.body.enableBody = true;
            this.elevator15.body.collideWorldBounds = true;
            this.elevator15.body.velocity.setTo(0, 100);
            this.elevator15.body.bounce.set(1);
            this.elevator15.body.immovable = true;
            this.elevator15.body.onCollide = new Phaser.Signal();
            this.elevator16 = this.game.add.sprite(1152 + 20, 2376, 'elevator');
            this.game.physics.arcade.enable(this.elevator16);
            this.elevator16.body.enableBody = true;
            this.elevator16.body.collideWorldBounds = true;
            this.elevator16.body.velocity.setTo(0, 100);
            this.elevator16.body.bounce.set(1);
            this.elevator16.body.immovable = true;
            this.elevator16.body.onCollide = new Phaser.Signal();
            this.elevator17 = this.game.add.sprite(10 + 20, 2592, 'elevator');
            this.game.physics.arcade.enable(this.elevator17);
            this.elevator17.body.enableBody = true;
            this.elevator17.body.collideWorldBounds = true;
            this.elevator17.body.velocity.setTo(0, 100);
            this.elevator17.body.bounce.set(1);
            this.elevator17.body.immovable = true;
            this.elevator17.body.onCollide = new Phaser.Signal();
            this.elevator18 = this.game.add.sprite(960 + 20, 2592, 'elevator');
            this.game.physics.arcade.enable(this.elevator18);
            this.elevator18.body.enableBody = true;
            this.elevator18.body.collideWorldBounds = true;
            this.elevator18.body.velocity.setTo(0, 100);
            this.elevator18.body.bounce.set(1);
            this.elevator18.body.immovable = true;
            this.elevator18.body.onCollide = new Phaser.Signal();
            this.elevator19 = this.game.add.sprite(384 + 20, 2808, 'elevator');
            this.game.physics.arcade.enable(this.elevator19);
            this.elevator19.body.enableBody = true;
            this.elevator19.body.collideWorldBounds = true;
            this.elevator19.body.velocity.setTo(0, 100);
            this.elevator19.body.bounce.set(1);
            this.elevator19.body.immovable = true;
            this.elevator19.body.onCollide = new Phaser.Signal();
            this.elevator20 = this.game.add.sprite(1920 + 20, 2808, 'elevator');
            this.game.physics.arcade.enable(this.elevator20);
            this.elevator20.body.enableBody = true;
            this.elevator20.body.collideWorldBounds = true;
            this.elevator20.body.velocity.setTo(0, 100);
            this.elevator20.body.bounce.set(1);
            this.elevator20.body.immovable = true;
            this.elevator20.body.onCollide = new Phaser.Signal();
            this.elevator21 = this.game.add.sprite(768 + 20, 3024, 'elevator');
            this.game.physics.arcade.enable(this.elevator21);
            this.elevator21.body.enableBody = true;
            this.elevator21.body.collideWorldBounds = true;
            this.elevator21.body.velocity.setTo(0, 100);
            this.elevator21.body.bounce.set(1);
            this.elevator21.body.immovable = true;
            this.elevator21.body.onCollide = new Phaser.Signal();
            this.elevator22 = this.game.add.sprite(1152 + 20, 3024, 'elevator');
            this.game.physics.arcade.enable(this.elevator22);
            this.elevator22.body.enableBody = true;
            this.elevator22.body.collideWorldBounds = true;
            this.elevator22.body.velocity.setTo(0, 100);
            this.elevator22.body.bounce.set(1);
            this.elevator22.body.immovable = true;
            this.elevator22.body.onCollide = new Phaser.Signal();
            this.elevator23 = this.game.add.sprite(1536 + 20, 3240, 'elevator');
            this.game.physics.arcade.enable(this.elevator23);
            this.elevator23.body.enableBody = true;
            this.elevator23.body.collideWorldBounds = true;
            this.elevator23.body.velocity.setTo(0, 100);
            this.elevator23.body.bounce.set(1);
            this.elevator23.body.immovable = true;
            this.elevator23.body.onCollide = new Phaser.Signal();
            this.elevator24 = this.game.add.sprite(1152 + 20, 3672, 'elevator');
            this.game.physics.arcade.enable(this.elevator24);
            this.elevator24.body.enableBody = true;
            this.elevator24.body.collideWorldBounds = true;
            this.elevator24.body.velocity.setTo(0, 100);
            this.elevator24.body.bounce.set(1);
            this.elevator24.body.immovable = true;
            this.elevator24.body.onCollide = new Phaser.Signal();
            this.elevator25 = this.game.add.sprite(10 + 20, 3984, 'elevator');
            this.game.physics.arcade.enable(this.elevator25);
            this.elevator25.body.enableBody = true;
            this.elevator25.body.collideWorldBounds = true;
            this.elevator25.body.velocity.setTo(0, 100);
            this.elevator25.body.bounce.set(1);
            this.elevator25.body.immovable = true;
            this.elevator25.body.onCollide = new Phaser.Signal();
            this.elevator26 = this.game.add.sprite(576 + 20, 4416, 'elevator');
            this.game.physics.arcade.enable(this.elevator26);
            this.elevator26.body.enableBody = true;
            this.elevator26.body.collideWorldBounds = true;
            this.elevator26.body.velocity.setTo(0, 100);
            this.elevator26.body.bounce.set(1);
            this.elevator26.body.immovable = true;
            this.elevator26.body.onCollide = new Phaser.Signal();
            this.elevator27 = this.game.add.sprite(1728 + 20, 4416, 'elevator');
            this.game.physics.arcade.enable(this.elevator27);
            this.elevator27.body.enableBody = true;
            this.elevator27.body.collideWorldBounds = true;
            this.elevator27.body.velocity.setTo(0, 100);
            this.elevator27.body.bounce.set(1);
            this.elevator27.body.immovable = true;
            this.elevator27.body.onCollide = new Phaser.Signal();
            /*this.elevator28 = this.game.add.sprite(384+20, 216+g, 'elevator');
            this.game.physics.arcade.enable(this.elevator28);
            this.elevator28.body.enableBody = true;
            this.elevator28.body.collideWorldBounds = true;
            this.elevator28.body.velocity.setTo(0, 100);
            this.elevator28.body.bounce.set(1);
            this.elevator28.body.immovable = true;
            this.elevator28.body.onCollide = new Phaser.Signal();

            this.elevator29 = this.game.add.sprite(1728+20, 216+g, 'elevator');
            this.game.physics.arcade.enable(this.elevator29);
            this.elevator29.body.enableBody = true;
            this.elevator29.body.collideWorldBounds = true;
            this.elevator29.body.velocity.setTo(0, 100);
            this.elevator29.body.bounce.set(1);
            this.elevator29.body.immovable = true;
            this.elevator29.body.onCollide = new Phaser.Signal();

            this.elevator30 = this.game.add.sprite(768+20, 432+g, 'elevator');
            this.game.physics.arcade.enable(this.elevator30);
            this.elevator30.body.enableBody = true;
            this.elevator30.body.collideWorldBounds = true;
            this.elevator30.body.velocity.setTo(0, 100);
            this.elevator30.body.bounce.set(1);
            this.elevator30.body.immovable = true;
            this.elevator30.body.onCollide = new Phaser.Signal();

            this.elevator31 = this.game.add.sprite(1152+20, 432+g, 'elevator');
            this.game.physics.arcade.enable(this.elevator31);
            this.elevator31.body.enableBody = true;
            this.elevator31.body.collideWorldBounds = true;
            this.elevator31.body.velocity.setTo(0, 100);
            this.elevator31.body.bounce.set(1);
            this.elevator31.body.immovable = true;
            this.elevator31.body.onCollide = new Phaser.Signal();

            this.elevator32 = this.game.add.sprite(10+20, 864+g, 'elevator');
            this.game.physics.arcade.enable(this.elevator32);
            this.elevator32.body.enableBody = true;
            this.elevator32.body.collideWorldBounds = true;
            this.elevator32.body.velocity.setTo(0, 100);
            this.elevator32.body.bounce.set(1);
            this.elevator32.body.immovable = true;
            this.elevator32.body.onCollide = new Phaser.Signal();

            this.elevator33 = this.game.add.sprite(1536+20, 864+g, 'elevator');
            this.game.physics.arcade.enable(this.elevator33);
            this.elevator33.body.enableBody = true;
            this.elevator33.body.collideWorldBounds = true;
            this.elevator33.body.velocity.setTo(0, 100);
            this.elevator33.body.bounce.set(1);
            this.elevator33.body.immovable = true;
            this.elevator33.body.onCollide = new Phaser.Signal();

            this.elevator34 = this.game.add.sprite(1152+20, 1080+g, 'elevator');
            this.game.physics.arcade.enable(this.elevator34);
            this.elevator34.body.enableBody = true;
            this.elevator34.body.collideWorldBounds = true;
            this.elevator34.body.velocity.setTo(0, 100);
            this.elevator34.body.bounce.set(1);
            this.elevator34.body.immovable = true;
            this.elevator34.body.onCollide = new Phaser.Signal();

            this.elevator35 = this.game.add.sprite(1344+20, 1080+g, 'elevator');
            this.game.physics.arcade.enable(this.elevator35);
            this.elevator35.body.enableBody = true;
            this.elevator35.body.collideWorldBounds = true;
            this.elevator35.body.velocity.setTo(0, 100);
            this.elevator35.body.bounce.set(1);
            this.elevator35.body.immovable = true;
            this.elevator35.body.onCollide = new Phaser.Signal();

            this.elevator36 = this.game.add.sprite(1920+40, 1296+g, 'elevator');
            this.game.physics.arcade.enable(this.elevator36);
            this.elevator36.body.enableBody = true;
            this.elevator36.body.collideWorldBounds = true;
            this.elevator36.body.velocity.setTo(0, 100);
            this.elevator36.body.bounce.set(1);
            this.elevator36.body.immovable = true;
            this.elevator36.body.onCollide = new Phaser.Signal();

            this.elevator37 = this.game.add.sprite(576+20, 1728+g, 'elevator');
            this.game.physics.arcade.enable(this.elevator37);
            this.elevator37.body.enableBody = true;
            this.elevator37.body.collideWorldBounds = true;
            this.elevator37.body.velocity.setTo(0, 100);
            this.elevator37.body.bounce.set(1);
            this.elevator37.body.immovable = true;
            this.elevator37.body.onCollide = new Phaser.Signal();

            this.elevator38 = this.game.add.sprite(960+20, 1728+g, 'elevator');
            this.game.physics.arcade.enable(this.elevator38);
            this.elevator38.body.enableBody = true;
            this.elevator38.body.collideWorldBounds = true;
            this.elevator38.body.velocity.setTo(0, 100);
            this.elevator38.body.bounce.set(1);
            this.elevator38.body.immovable = true;
            this.elevator38.body.onCollide = new Phaser.Signal();

            this.elevator39 = this.game.add.sprite(1536+20, 1728+g, 'elevator');
            this.game.physics.arcade.enable(this.elevator39);
            this.elevator39.body.enableBody = true;
            this.elevator39.body.collideWorldBounds = true;
            this.elevator39.body.velocity.setTo(0, 100);
            this.elevator39.body.bounce.set(1);
            this.elevator39.body.immovable = true;
            this.elevator39.body.onCollide = new Phaser.Signal();

            this.elevator40 = this.game.add.sprite(1920+20, 1728+g, 'elevator');
            this.game.physics.arcade.enable(this.elevator40);
            this.elevator40.body.enableBody = true;
            this.elevator40.body.collideWorldBounds = true;
            this.elevator40.body.velocity.setTo(0, 100);
            this.elevator40.body.bounce.set(1);
            this.elevator40.body.immovable = true;
            this.elevator40.body.onCollide = new Phaser.Signal();

            this.elevator41 = this.game.add.sprite(1536+20, 2160+g, 'elevator');
            this.game.physics.arcade.enable(this.elevator41);
            this.elevator41.body.enableBody = true;
            this.elevator41.body.collideWorldBounds = true;
            this.elevator41.body.velocity.setTo(0, 100);
            this.elevator41.body.bounce.set(1);
            this.elevator41.body.immovable = true;
            this.elevator41.body.onCollide = new Phaser.Signal();

            this.elevator42 = this.game.add.sprite(1728+20, 2160+g, 'elevator');
            this.game.physics.arcade.enable(this.elevator42);
            this.elevator42.body.enableBody = true;
            this.elevator42.body.collideWorldBounds = true;
            this.elevator42.body.velocity.setTo(0, 100);
            this.elevator42.body.bounce.set(1);
            this.elevator42.body.immovable = true;
            this.elevator42.body.onCollide = new Phaser.Signal();

            this.elevator43 = this.game.add.sprite(1152+20, 2376+g, 'elevator');
            this.game.physics.arcade.enable(this.elevator43);
            this.elevator43.body.enableBody = true;
            this.elevator43.body.collideWorldBounds = true;
            this.elevator43.body.velocity.setTo(0, 100);
            this.elevator43.body.bounce.set(1);
            this.elevator43.body.immovable = true;
            this.elevator43.body.onCollide = new Phaser.Signal();

            this.elevator44 = this.game.add.sprite(10+20, 2592+g, 'elevator');
            this.game.physics.arcade.enable(this.elevator44);
            this.elevator44.body.enableBody = true;
            this.elevator44.body.collideWorldBounds = true;
            this.elevator44.body.velocity.setTo(0, 100);
            this.elevator44.body.bounce.set(1);
            this.elevator44.body.immovable = true;
            this.elevator44.body.onCollide = new Phaser.Signal();

            this.elevator45 = this.game.add.sprite(960+20, 2592+g, 'elevator');
            this.game.physics.arcade.enable(this.elevator45);
            this.elevator45.body.enableBody = true;
            this.elevator45.body.collideWorldBounds = true;
            this.elevator45.body.velocity.setTo(0, 100);
            this.elevator45.body.bounce.set(1);
            this.elevator45.body.immovable = true;
            this.elevator45.body.onCollide = new Phaser.Signal();

            this.elevator46 = this.game.add.sprite(384+20, 2808+g, 'elevator');
            this.game.physics.arcade.enable(this.elevator46);
            this.elevator46.body.enableBody = true;
            this.elevator46.body.collideWorldBounds = true;
            this.elevator46.body.velocity.setTo(0, 100);
            this.elevator46.body.bounce.set(1);
            this.elevator46.body.immovable = true;
            this.elevator46.body.onCollide = new Phaser.Signal();

            this.elevator47 = this.game.add.sprite(1920+20, 2808+g, 'elevator');
            this.game.physics.arcade.enable(this.elevator47);
            this.elevator47.body.enableBody = true;
            this.elevator47.body.collideWorldBounds = true;
            this.elevator47.body.velocity.setTo(0, 100);
            this.elevator47.body.bounce.set(1);
            this.elevator47.body.immovable = true;
            this.elevator47.body.onCollide = new Phaser.Signal();

            this.elevator48 = this.game.add.sprite(768+20, 3024+g, 'elevator');
            this.game.physics.arcade.enable(this.elevator48);
            this.elevator48.body.enableBody = true;
            this.elevator48.body.collideWorldBounds = true;
            this.elevator48.body.velocity.setTo(0, 100);
            this.elevator48.body.bounce.set(1);
            this.elevator48.body.immovable = true;
            this.elevator48.body.onCollide = new Phaser.Signal();

            this.elevator49 = this.game.add.sprite(1152+20, 3024+g, 'elevator');
            this.game.physics.arcade.enable(this.elevator49);
            this.elevator49.body.enableBody = true;
            this.elevator49.body.collideWorldBounds = true;
            this.elevator49.body.velocity.setTo(0, 100);
            this.elevator49.body.bounce.set(1);
            this.elevator49.body.immovable = true;
            this.elevator49.body.onCollide = new Phaser.Signal();

            this.elevator50 = this.game.add.sprite(1536+20, 3240+g, 'elevator');
            this.game.physics.arcade.enable(this.elevator50);
            this.elevator50.body.enableBody = true;
            this.elevator50.body.collideWorldBounds = true;
            this.elevator50.body.velocity.setTo(0, 100);
            this.elevator50.body.bounce.set(1);
            this.elevator50.body.immovable = true;
            this.elevator50.body.onCollide = new Phaser.Signal();

            this.elevator51 = this.game.add.sprite(1152+20, 3672+g, 'elevator');
            this.game.physics.arcade.enable(this.elevator51);
            this.elevator51.body.enableBody = true;
            this.elevator51.body.collideWorldBounds = true;
            this.elevator51.body.velocity.setTo(0, 100);
            this.elevator51.body.bounce.set(1);
            this.elevator51.body.immovable = true;
            this.elevator51.body.onCollide = new Phaser.Signal();

            this.elevator52 = this.game.add.sprite(10+20, 3984+g, 'elevator');
            this.game.physics.arcade.enable(this.elevator52);
            this.elevator52.body.enableBody = true;
            this.elevator52.body.collideWorldBounds = true;
            this.elevator52.body.velocity.setTo(0, 100);
            this.elevator52.body.bounce.set(1);
            this.elevator52.body.immovable = true;
            this.elevator52.body.onCollide = new Phaser.Signal();

            this.elevator53 = this.game.add.sprite(576+20, 4416+g, 'elevator');
            this.game.physics.arcade.enable(this.elevator53);
            this.elevator53.body.enableBody = true;
            this.elevator53.body.collideWorldBounds = true;
            this.elevator53.body.velocity.setTo(0, 100);
            this.elevator53.body.bounce.set(1);
            this.elevator53.body.immovable = true;
            this.elevator53.body.onCollide = new Phaser.Signal();

            this.elevator54 = this.game.add.sprite(1728+20, 4416+g, 'elevator');
            this.game.physics.arcade.enable(this.elevator54);
            this.elevator54.body.enableBody = true;
            this.elevator54.body.collideWorldBounds = true;
            this.elevator54.body.velocity.setTo(0, 100);
            this.elevator54.body.bounce.set(1);
            this.elevator54.body.immovable = true;
            this.elevator54.body.onCollide = new Phaser.Signal();

            g = g + g;

            this.elevator55 = this.game.add.sprite(384+20, 216+g, 'elevator');
            this.game.physics.arcade.enable(this.elevator55);
            this.elevator55.body.enableBody = true;
            this.elevator55.body.collideWorldBounds = true;
            this.elevator55.body.velocity.setTo(0, 100);
            this.elevator55.body.bounce.set(1);
            this.elevator55.body.immovable = true;
            this.elevator55.body.onCollide = new Phaser.Signal();

            this.elevator56 = this.game.add.sprite(1728+20, 216+g, 'elevator');
            this.game.physics.arcade.enable(this.elevator56);
            this.elevator56.body.enableBody = true;
            this.elevator56.body.collideWorldBounds = true;
            this.elevator56.body.velocity.setTo(0, 100);
            this.elevator56.body.bounce.set(1);
            this.elevator56.body.immovable = true;
            this.elevator56.body.onCollide = new Phaser.Signal();

            this.elevator57 = this.game.add.sprite(768+20, 432+g, 'elevator');
            this.game.physics.arcade.enable(this.elevator57);
            this.elevator57.body.enableBody = true;
            this.elevator57.body.collideWorldBounds = true;
            this.elevator57.body.velocity.setTo(0, 100);
            this.elevator57.body.bounce.set(1);
            this.elevator57.body.immovable = true;
            this.elevator57.body.onCollide = new Phaser.Signal();

            this.elevator58 = this.game.add.sprite(1152+20, 432+g, 'elevator');
            this.game.physics.arcade.enable(this.elevator58);
            this.elevator58.body.enableBody = true;
            this.elevator58.body.collideWorldBounds = true;
            this.elevator58.body.velocity.setTo(0, 100);
            this.elevator58.body.bounce.set(1);
            this.elevator58.body.immovable = true;
            this.elevator58.body.onCollide = new Phaser.Signal();

            this.elevator59 = this.game.add.sprite(10+20, 864+g, 'elevator');
            this.game.physics.arcade.enable(this.elevator59);
            this.elevator59.body.enableBody = true;
            this.elevator59.body.collideWorldBounds = true;
            this.elevator59.body.velocity.setTo(0, 100);
            this.elevator59.body.bounce.set(1);
            this.elevator59.body.immovable = true;
            this.elevator59.body.onCollide = new Phaser.Signal();

            this.elevator60 = this.game.add.sprite(1536+20, 864+g, 'elevator');
            this.game.physics.arcade.enable(this.elevator60);
            this.elevator60.body.enableBody = true;
            this.elevator60.body.collideWorldBounds = true;
            this.elevator60.body.velocity.setTo(0, 100);
            this.elevator60.body.bounce.set(1);
            this.elevator60.body.immovable = true;
            this.elevator60.body.onCollide = new Phaser.Signal();

            this.elevator61 = this.game.add.sprite(1152+20, 1080+g, 'elevator');
            this.game.physics.arcade.enable(this.elevator61);
            this.elevator61.body.enableBody = true;
            this.elevator61.body.collideWorldBounds = true;
            this.elevator61.body.velocity.setTo(0, 100);
            this.elevator61.body.bounce.set(1);
            this.elevator61.body.immovable = true;
            this.elevator61.body.onCollide = new Phaser.Signal();

            this.elevator62 = this.game.add.sprite(1344+20, 1080+g, 'elevator');
            this.game.physics.arcade.enable(this.elevator62);
            this.elevator62.body.enableBody = true;
            this.elevator62.body.collideWorldBounds = true;
            this.elevator62.body.velocity.setTo(0, 100);
            this.elevator62.body.bounce.set(1);
            this.elevator62.body.immovable = true;
            this.elevator62.body.onCollide = new Phaser.Signal();

            this.elevator63 = this.game.add.sprite(1920+20, 1296+g, 'elevator');
            this.game.physics.arcade.enable(this.elevator63);
            this.elevator63.body.enableBody = true;
            this.elevator63.body.collideWorldBounds = true;
            this.elevator63.body.velocity.setTo(0, 100);
            this.elevator63.body.bounce.set(1);
            this.elevator63.body.immovable = true;
            this.elevator63.body.onCollide = new Phaser.Signal();

            this.elevator64 = this.game.add.sprite(576+20, 1728+g, 'elevator');
            this.game.physics.arcade.enable(this.elevator64);
            this.elevator64.body.enableBody = true;
            this.elevator64.body.collideWorldBounds = true;
            this.elevator64.body.velocity.setTo(0, 100);
            this.elevator64.body.bounce.set(1);
            this.elevator64.body.immovable = true;
            this.elevator64.body.onCollide = new Phaser.Signal();

            this.elevator65 = this.game.add.sprite(960+20, 1728+g, 'elevator');
            this.game.physics.arcade.enable(this.elevator65);
            this.elevator65.body.enableBody = true;
            this.elevator65.body.collideWorldBounds = true;
            this.elevator65.body.velocity.setTo(0, 100);
            this.elevator65.body.bounce.set(1);
            this.elevator65.body.immovable = true;
            this.elevator65.body.onCollide = new Phaser.Signal();

            this.elevator66 = this.game.add.sprite(1536+20, 1728+g, 'elevator');
            this.game.physics.arcade.enable(this.elevator66);
            this.elevator66.body.enableBody = true;
            this.elevator66.body.collideWorldBounds = true;
            this.elevator66.body.velocity.setTo(0, 100);
            this.elevator66.body.bounce.set(1);
            this.elevator66.body.immovable = true;
            this.elevator66.body.onCollide = new Phaser.Signal();

            this.elevator67 = this.game.add.sprite(1920+20, 1728+g, 'elevator');
            this.game.physics.arcade.enable(this.elevator67);
            this.elevator67.body.enableBody = true;
            this.elevator67.body.collideWorldBounds = true;
            this.elevator67.body.velocity.setTo(0, 100);
            this.elevator67.body.bounce.set(1);
            this.elevator67.body.immovable = true;
            this.elevator67.body.onCollide = new Phaser.Signal();

            this.elevator68 = this.game.add.sprite(1536+20, 2160+g, 'elevator');
            this.game.physics.arcade.enable(this.elevator68);
            this.elevator68.body.enableBody = true;
            this.elevator68.body.collideWorldBounds = true;
            this.elevator68.body.velocity.setTo(0, 100);
            this.elevator68.body.bounce.set(1);
            this.elevator68.body.immovable = true;
            this.elevator68.body.onCollide = new Phaser.Signal();

            this.elevator69 = this.game.add.sprite(1728+20, 2160+g, 'elevator');
            this.game.physics.arcade.enable(this.elevator69);
            this.elevator69.body.enableBody = true;
            this.elevator69.body.collideWorldBounds = true;
            this.elevator69.body.velocity.setTo(0, 100);
            this.elevator69.body.bounce.set(1);
            this.elevator69.body.immovable = true;
            this.elevator69.body.onCollide = new Phaser.Signal();

            this.elevator70 = this.game.add.sprite(1152+20, 2376+g, 'elevator');
            this.game.physics.arcade.enable(this.elevator70);
            this.elevator70.body.enableBody = true;
            this.elevator70.body.collideWorldBounds = true;
            this.elevator70.body.velocity.setTo(0, 100);
            this.elevator70.body.bounce.set(1);
            this.elevator70.body.immovable = true;
            this.elevator70.body.onCollide = new Phaser.Signal();

            this.elevator71 = this.game.add.sprite(10+20, 2592+g, 'elevator');
            this.game.physics.arcade.enable(this.elevator71);
            this.elevator71.body.enableBody = true;
            this.elevator71.body.collideWorldBounds = true;
            this.elevator71.body.velocity.setTo(0, 100);
            this.elevator71.body.bounce.set(1);
            this.elevator71.body.immovable = true;
            this.elevator71.body.onCollide = new Phaser.Signal();

            this.elevator72 = this.game.add.sprite(960+20, 2592+g, 'elevator');
            this.game.physics.arcade.enable(this.elevator72);
            this.elevator72.body.enableBody = true;
            this.elevator72.body.collideWorldBounds = true;
            this.elevator72.body.velocity.setTo(0, 100);
            this.elevator72.body.bounce.set(1);
            this.elevator72.body.immovable = true;
            this.elevator72.body.onCollide = new Phaser.Signal();

            this.elevator73 = this.game.add.sprite(384+20, 2808+g, 'elevator');
            this.game.physics.arcade.enable(this.elevator73);
            this.elevator73.body.enableBody = true;
            this.elevator73.body.collideWorldBounds = true;
            this.elevator73.body.velocity.setTo(0, 100);
            this.elevator73.body.bounce.set(1);
            this.elevator73.body.immovable = true;
            this.elevator73.body.onCollide = new Phaser.Signal();

            this.elevator74 = this.game.add.sprite(1920+20, 2808+g, 'elevator');
            this.game.physics.arcade.enable(this.elevator74);
            this.elevator74.body.enableBody = true;
            this.elevator74.body.collideWorldBounds = true;
            this.elevator74.body.velocity.setTo(0, 100);
            this.elevator74.body.bounce.set(1);
            this.elevator74.body.immovable = true;
            this.elevator74.body.onCollide = new Phaser.Signal();

            this.elevator75 = this.game.add.sprite(768+20, 3024+g, 'elevator');
            this.game.physics.arcade.enable(this.elevator75);
            this.elevator75.body.enableBody = true;
            this.elevator75.body.collideWorldBounds = true;
            this.elevator75.body.velocity.setTo(0, 100);
            this.elevator75.body.bounce.set(1);
            this.elevator75.body.immovable = true;
            this.elevator75.body.onCollide = new Phaser.Signal();

            this.elevator76 = this.game.add.sprite(1152+20, 3024+g, 'elevator');
            this.game.physics.arcade.enable(this.elevator76);
            this.elevator76.body.enableBody = true;
            this.elevator76.body.collideWorldBounds = true;
            this.elevator76.body.velocity.setTo(0, 100);
            this.elevator76.body.bounce.set(1);
            this.elevator76.body.immovable = true;
            this.elevator76.body.onCollide = new Phaser.Signal();

            this.elevator77 = this.game.add.sprite(1536+20, 3240+g, 'elevator');
            this.game.physics.arcade.enable(this.elevator77);
            this.elevator77.body.enableBody = true;
            this.elevator77.body.collideWorldBounds = true;
            this.elevator77.body.velocity.setTo(0, 100);
            this.elevator77.body.bounce.set(1);
            this.elevator77.body.immovable = true;
            this.elevator77.body.onCollide = new Phaser.Signal();

            this.elevator78 = this.game.add.sprite(1152+20, 3672+g, 'elevator');
            this.game.physics.arcade.enable(this.elevator78);
            this.elevator78.body.enableBody = true;
            this.elevator78.body.collideWorldBounds = true;
            this.elevator78.body.velocity.setTo(0, 100);
            this.elevator78.body.bounce.set(1);
            this.elevator78.body.immovable = true;
            this.elevator78.body.onCollide = new Phaser.Signal();

            this.elevator79 = this.game.add.sprite(10+20, 3984+g, 'elevator');
            this.game.physics.arcade.enable(this.elevator79);
            this.elevator79.body.enableBody = true;
            this.elevator79.body.collideWorldBounds = true;
            this.elevator79.body.velocity.setTo(0, 100);
            this.elevator79.body.bounce.set(1);
            this.elevator79.body.immovable = true;
            this.elevator79.body.onCollide = new Phaser.Signal();

            this.elevator80 = this.game.add.sprite(576+20, 4416+g, 'elevator');
            this.game.physics.arcade.enable(this.elevator80);
            this.elevator80.body.enableBody = true;
            this.elevator80.body.collideWorldBounds = true;
            this.elevator80.body.velocity.setTo(0, 100);
            this.elevator80.body.bounce.set(1);
            this.elevator80.body.immovable = true;
            this.elevator80.body.onCollide = new Phaser.Signal();

            this.elevator81 = this.game.add.sprite(1728+20, 4416+g, 'elevator');
            this.game.physics.arcade.enable(this.elevator81);
            this.elevator81.body.enableBody = true;
            this.elevator81.body.collideWorldBounds = true;
            this.elevator81.body.velocity.setTo(0, 100);
            this.elevator81.body.bounce.set(1);
            this.elevator71.body.immovable = true;
            this.elevator81.body.onCollide = new Phaser.Signal();*/
            //going down
            this.player = this.game.add.sprite(this.game.width / 2, 0, 'princess');
            //going up
            //this.player = this.game.add.sprite(100, 1700, 'dude');
            //this.door = this.game.add.sprite(this.game.world.width / 2, this.game.world.height - 475, 'doors1');
            this.game.physics.arcade.enable(this.player);
            this.player.body.bounce.y = 0.2;
            this.player.body.gravity.y = 1000; //9000
            this.player.body.collideWorldBounds = true;
            this.player.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 0, true);
            this.player.animations.add('right', [18, 19, 20, 21, 22, 23, 24, 25, 26, 27], 0, true);
            this.player.animations.add('idle', [10, 11, 12, 13, 14, 15, 16, 17], 0, true);
            this.player.animations.currentAnim.speed = 10;
            this.player.animations.add('shootShield', [28, 29, 30, 31, 32, 33, 34, 35, 36, 37], 0, true);
            //this.Princess.animations.add('attack', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 0, true);
            //this.elevator.body.allowGravity = false;
            this.doors = this.game.add.group();
            this.doors.enableBody = true;
            this.enemyDoors = this.game.add.group();
            this.enemyDoors.enableBody = true;
            /*for (var i = 0; i < 6; i++) {
                var door2 = this.doors.create(this.randomIntFromInterval(1, 3) * 140, this.game.world.height - 105, 'doors2');
                door2.body.immovable = true;
                door2.animations.add('open', [1, 2, 3], 1, true);
                door2.animations.add('close', [3, 2, 1], 1, true);
            }
    
            for (var i = 0; i < 6; i++) {
                var eDoor = this.enemyDoors.create(this.randomIntFromInterval(1, 2) * 80, this.game.world.height - 300, 'doors1');
                eDoor.body.immovable;
            }
    
            var tDoor = this.enemyDoors.create(this.randomIntFromInterval(0, 1) * 555, this.game.world.height - 300, 'doors1');*/
            /*for (var i = 0; i < 6; i++) {
                var door1 = this.floor1Doors.create(this.randomIntFromInterval(1, 3) * 140, this.game.world.height - 400, 'doors1');
                door1.body.immovable = true;
                door1.animations.add('open', [1, 2, 3], 1, true);
                door1.animations.add('close', [3, 2, 1], 1, true);
            }*/
            /*for (var k = 0; k < 3; k++) {
                for (var i = 0; i < 12; i++) {
                    var door = this.enemyDoors.create((i + 1) * 115, (k+1) * 150 /*this.platforms., 'doors1');
                    door.body.immovable = true;
                    door.animations.add('open', [1, 2, 3], 1, true);
                    door.animations.add('close', [3, 2, 1], 1, true);
                }
            }
            for (var k = 0; k < 3; k++) {
                var door2 = this.doors.create(this.randomIntFromInterval(1, 3) * 140, this.game.world.height - 315, 'doors2');
                door2.animations.add('open', [1, 2, 3], 1, true);
                door2.animations.add('close', [3, 2, 1], 1, true);
            }*/
            //}
            this.cursors = this.game.input.keyboard.createCursorKeys();
            this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
            //this.game.physics.arcade.enable(this.elevator);
            //this.game.physics.arcade.enable(door);
            this.player.body.collideWorldBounds = true;
            //if (this.isOnElevator) {
            //}
            //else {
            //    this.game.add.tween(this.elevator).to({ y: 400 }, 5000, Phaser.Easing.Linear.None, true, 0, Number.MAX_VALUE, true);
            //}
            this.scoreText = this.game.add.text(16, 16, this.scoreConst, { font: '32px Arial', fill: '#fff' });
            //Enemy things
            this.enemySpawn();
            //this.enemies.callAll('animations.add', 'animations', 'baddie', [0, 1, 2, 3], 10, true);
            //this.enemies.callAll('play', null, 'baddie');
            //this.enemies.callAll('play', 'null', 'baddie');
            this.bullets = this.game.add.group();
            this.bullets.enableBody = true;
            this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
            this.bullets.createMultiple(30, 'bullet');
            this.bullets.setAll('anchor.x', 0);
            this.bullets.setAll('anchor.y', 0);
            this.bullets.setAll('outOfBoundsKill', true);
            this.bullets.setAll('checkWorldBounds', true);
            this.enemyBullets = this.game.add.group();
            this.enemyBullets.enableBody = true;
            this.enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
            this.enemyBullets.createMultiple(30, 'bullet');
            this.enemyBullets.setAll('anchor.x', 0);
            this.enemyBullets.setAll('anchor.y', 0);
            this.enemyBullets.setAll('outOfBoundsKill', true);
            this.enemyBullets.setAll('checkWorldBounds', true);
            this.lives = this.game.add.group();
            this.game.add.text(this.game.world.width - 100, 10, 'Lives : ', { font: '34px Arial', fill: '#fff' });
            this.stateText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, ' ', { font: '32px Arial', fill: '#fff' });
            this.stateText.anchor.setTo(0.5, 0.5);
            this.stateText.visible = false;
            /*var button = this.game.add.button(1000, 0, 'button', this.fullscreen, this, 2, 1, 0);
            this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
            this.game.input.onDown.add(this.fullscreen, this);*/
        };
        /* fullscreen() {
             
             if (this.game.scale.isFullScreen) {
                 this.game.scale.stopFullScreen();
             }
             else {
                 this.game.scale.startFullScreen(false);
             }*/
        Game.prototype.enemySpawn = function () {
            if (this.numberOfEnemies > 0) {
                this.enemies = this.game.add.group();
                this.enemies.enableBody = true;
                if (this.player.x > this.game.width / 2) {
                    var enemy = this.enemies.create(this.player.x - this.randomIntFromInterval(200, 800), this.player.y + 15, 'ghost');
                    enemy.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 0, true);
                    enemy.animations.play('idle');
                    enemy.animations.currentAnim.speed = 10;
                }
                else {
                    var enemy = this.enemies.create(this.player.x + this.randomIntFromInterval(200, 800), this.player.y + 15, 'ghost');
                    enemy.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 0, true);
                    enemy.animations.play('idle');
                    enemy.animations.currentAnim.speed = 10;
                }
                this.numberOfEnemies -= 1;
            }
            //enemy.callALL('animations.add','animations','move', [0, 1, 2, 3], 10, true);
            //enemy.callALL('animations.play', 'animations', 'move'); 
        };
        Game.prototype.update = function () {
            this.game.input.update();
            /*var hitElevator = this.game.physics.arcade.collide(this.player, this.elevator);
            var hitElevator2 = this.game.physics.arcade.collide(this.player, this.elevatorT);
            var hitElevator3 = this.game.physics.arcade.collide(this.player, this.elevatorX);
            var hitElevator4 = this.game.physics.arcade.collide(this.player, this.elevatorY);
            
            var elevatorHitFloor = this.game.physics.arcade.collide(this.elevator, this.leve1);
            var elevator2HitFloor = this.game.physics.arcade.collide(this.elevatorT, this.leve1);
            var elevator3HitFloor = this.game.physics.arcade.collide(this.elevatorX, this.leve1);
            var elevator4HitFloor = this.game.physics.arcade.collide(this.elevatorY, this.leve1);
            */
            var bulletHits = this.game.physics.arcade.collide(this.bullets, this.enemyBullets);
            var hitFloor1 = this.game.physics.arcade.collide(this.player, this.leve1);
            //var hitFloor = this.game.physics.arcade.collide(this.player, this.c);
            //var hitFloor = this.game.physics.arcade.collide(this.player, this.c2);
            //var doorHit = this.game.physics.arcade.collide(this.doors, this.player);
            this.cursors = this.game.input.keyboard.createCursorKeys();
            //this.elevator.body.velocity.y = 50 * this.elevatorDir;
            this.player.body.velocity.x = 0;
            if (this.cursors.left.isDown) {
                this.player.body.velocity.x -= 200;
                this.player.animations.play('left');
                this.player.animations.currentAnim.speed = 10;
                this.bulletDirection = false;
            }
            else if (this.cursors.right.isDown) {
                this.player.body.velocity.x += 200;
                this.player.animations.play('right');
                this.player.animations.currentAnim.speed = 10;
                this.bulletDirection = true;
            }
            else {
                //this.player.animations.stop();
                this.player.animations.play('idle');
                this.bulletDirection = true;
            }
            if (this.cursors.up.isDown) {
                this.player.body.velocity.y -= 100;
            }
            if (this.cursors.up.isDown && this.player.body.touching.down && (hitFloor1)) {
                this.player.body.velocity.y -= 350;
            }
            if (this.cursors.up.isDown && this.player.body.touching.down && (hitFloor1)) {
                this.player.body.velocity.y -= 350;
            }
            /* if (this.cursors.up.isDown && this.player.body.touching.down && (hitElevator || hitElevator2)) {
                 this.player.body.velocity.y -= 350;
             }*/
            if (this.fireButton.isDown) {
                this.firebullet(this.bullets);
            }
            if (this.game.time.now > this.firingTimer) {
                this.enemyFires();
            }
            //New Elevators' Controls
            var elevatorHitFloor = this.game.physics.arcade.collide(this.elevator1, this.leve1);
            if (elevatorHitFloor) {
                this.elevator1.body.immovable = false;
            }
            else {
                this.elevator1.body.immovable = true;
            }
            var elevator2HitFloor = this.game.physics.arcade.collide(this.elevator2, this.leve1);
            if (elevator2HitFloor) {
                this.elevator2.body.immovable = false;
            }
            else {
                this.elevator2.body.immovable = true;
            }
            var elevator3HitFloor = this.game.physics.arcade.collide(this.elevator3, this.leve1);
            if (elevator3HitFloor) {
                this.elevator3.body.immovable = false;
            }
            else {
                this.elevator3.body.immovable = true;
            }
            var elevator4HitFloor = this.game.physics.arcade.collide(this.elevator4, this.leve1);
            if (elevatorHitFloor) {
                this.elevator4.body.immovable = false;
            }
            else {
                this.elevator4.body.immovable = true;
            }
            var elevator5HitFloor = this.game.physics.arcade.collide(this.elevator5, this.leve1);
            if (elevatorHitFloor) {
                this.elevator5.body.immovable = false;
            }
            else {
                this.elevator5.body.immovable = true;
            }
            var elevator6HitFloor = this.game.physics.arcade.collide(this.elevator6, this.leve1);
            if (elevatorHitFloor) {
                this.elevator6.body.immovable = false;
            }
            else {
                this.elevator6.body.immovable = true;
            }
            var elevator7HitFloor = this.game.physics.arcade.collide(this.elevator7, this.leve1);
            if (elevatorHitFloor) {
                this.elevator7.body.immovable = false;
            }
            else {
                this.elevator7.body.immovable = true;
            }
            var elevator8HitFloor = this.game.physics.arcade.collide(this.elevator8, this.leve1);
            if (elevator8HitFloor) {
                this.elevator8.body.immovable = false;
            }
            else {
                this.elevator8.body.immovable = true;
            }
            var elevator9HitFloor = this.game.physics.arcade.collide(this.elevator9, this.leve1);
            if (elevator9HitFloor) {
                this.elevator9.body.immovable = false;
            }
            else {
                this.elevator9.body.immovable = true;
            }
            var elevator10HitFloor = this.game.physics.arcade.collide(this.elevator10, this.leve1);
            if (elevator10HitFloor) {
                this.elevator10.body.immovable = false;
            }
            else {
                this.elevator10.body.immovable = true;
            }
            var elevator11HitFloor = this.game.physics.arcade.collide(this.elevator11, this.leve1);
            if (elevator11HitFloor) {
                this.elevator11.body.immovable = false;
            }
            else {
                this.elevator11.body.immovable = true;
            }
            var elevator12HitFloor = this.game.physics.arcade.collide(this.elevator12, this.leve1);
            if (elevator12HitFloor) {
                this.elevator12.body.immovable = false;
            }
            else {
                this.elevator12.body.immovable = true;
            }
            var elevator13HitFloor = this.game.physics.arcade.collide(this.elevator13, this.leve1);
            if (elevator13HitFloor) {
                this.elevator13.body.immovable = false;
            }
            else {
                this.elevator13.body.immovable = true;
            }
            var elevator14HitFloor = this.game.physics.arcade.collide(this.elevator14, this.leve1);
            if (elevator14HitFloor) {
                this.elevator14.body.immovable = false;
            }
            else {
                this.elevator14.body.immovable = true;
            }
            var elevator15HitFloor = this.game.physics.arcade.collide(this.elevator15, this.leve1);
            if (elevator15HitFloor) {
                this.elevator15.body.immovable = false;
            }
            else {
                this.elevator15.body.immovable = true;
            }
            var elevator16HitFloor = this.game.physics.arcade.collide(this.elevator16, this.leve1);
            if (elevator16HitFloor) {
                this.elevator16.body.immovable = false;
            }
            else {
                this.elevator16.body.immovable = true;
            }
            var elevator17HitFloor = this.game.physics.arcade.collide(this.elevator17, this.leve1);
            if (elevator17HitFloor) {
                this.elevator17.body.immovable = false;
            }
            else {
                this.elevator17.body.immovable = true;
            }
            var elevator18HitFloor = this.game.physics.arcade.collide(this.elevator18, this.leve1);
            if (elevator18HitFloor) {
                this.elevator18.body.immovable = false;
            }
            else {
                this.elevator18.body.immovable = true;
            }
            var elevator19HitFloor = this.game.physics.arcade.collide(this.elevator19, this.leve1);
            if (elevator19HitFloor) {
                this.elevator19.body.immovable = false;
            }
            else {
                this.elevator19.body.immovable = true;
            }
            var elevator20HitFloor = this.game.physics.arcade.collide(this.elevator20, this.leve1);
            if (elevator20HitFloor) {
                this.elevator20.body.immovable = false;
            }
            else {
                this.elevator20.body.immovable = true;
            }
            var elevator21HitFloor = this.game.physics.arcade.collide(this.elevator21, this.leve1);
            if (elevator21HitFloor) {
                this.elevator21.body.immovable = false;
            }
            else {
                this.elevator21.body.immovable = true;
            }
            var elevator22HitFloor = this.game.physics.arcade.collide(this.elevator22, this.leve1);
            if (elevator22HitFloor) {
                this.elevator22.body.immovable = false;
            }
            else {
                this.elevator22.body.immovable = true;
            }
            var elevator23HitFloor = this.game.physics.arcade.collide(this.elevator23, this.leve1);
            if (elevator23HitFloor) {
                this.elevator23.body.immovable = false;
            }
            else {
                this.elevator23.body.immovable = true;
            }
            var elevator24HitFloor = this.game.physics.arcade.collide(this.elevator24, this.leve1);
            if (elevator24HitFloor) {
                this.elevator24.body.immovable = false;
            }
            else {
                this.elevator24.body.immovable = true;
            }
            var elevator25HitFloor = this.game.physics.arcade.collide(this.elevator25, this.leve1);
            if (elevator25HitFloor) {
                this.elevator25.body.immovable = false;
            }
            else {
                this.elevator25.body.immovable = true;
            }
            var elevator26HitFloor = this.game.physics.arcade.collide(this.elevator26, this.leve1);
            if (elevator26HitFloor) {
                this.elevator26.body.immovable = false;
            }
            else {
                this.elevator26.body.immovable = true;
            }
            var elevator27HitFloor = this.game.physics.arcade.collide(this.elevator27, this.leve1);
            if (elevatorHitFloor) {
                this.elevator27.body.immovable = false;
            }
            else {
                this.elevator27.body.immovable = true;
            }
            /* var elevator28HitFloor = this.game.physics.arcade.collide(this.elevator28, this.leve1);
             if (elevator28HitFloor) {
                 this.elevator28.body.immovable = false;
             }
             else {
                 this.elevator28.body.immovable = true;
             }
             var elevator29HitFloor = this.game.physics.arcade.collide(this.elevator29, this.leve1);
             if (elevator29HitFloor) {
                 this.elevator29.body.immovable = false;
             }
             else {
                 this.elevator29.body.immovable = true;
             }
             var elevator30HitFloor = this.game.physics.arcade.collide(this.elevator30, this.leve1);
             if (elevator30HitFloor) {
                 this.elevator30.body.immovable = false;
             }
             else {
                 this.elevator30.body.immovable = true;
             }
             var elevator31HitFloor = this.game.physics.arcade.collide(this.elevator31, this.leve1);
             if (elevator31HitFloor) {
                 this.elevator31.body.immovable = false;
             }
             else {
                 this.elevator31.body.immovable = true;
             }
             var elevator32HitFloor = this.game.physics.arcade.collide(this.elevator32, this.leve1);
             if (elevator32HitFloor) {
                 this.elevator32.body.immovable = false;
             }
             else {
                 this.elevator32.body.immovable = true;
             }
             var elevator33HitFloor = this.game.physics.arcade.collide(this.elevator33, this.leve1);
             if (elevator33HitFloor) {
                 this.elevator33.body.immovable = false;
             }
             else {
                 this.elevator33.body.immovable = true;
             }
             var elevator34HitFloor = this.game.physics.arcade.collide(this.elevator34, this.leve1);
             if (elevator34HitFloor) {
                 this.elevator34.body.immovable = false;
             }
             else {
                 this.elevator34.body.immovable = true;
             }
             var elevator35HitFloor = this.game.physics.arcade.collide(this.elevator35, this.leve1);
             if (elevator35HitFloor) {
                 this.elevator35.body.immovable = false;
             }
             else {
                 this.elevator35.body.immovable = true;
             }
             var elevator36HitFloor = this.game.physics.arcade.collide(this.elevator36, this.leve1);
             if (elevator36HitFloor) {
                 this.elevator36.body.immovable = false;
             }
             else {
                 this.elevator36.body.immovable = true;
             }
             var elevator37HitFloor = this.game.physics.arcade.collide(this.elevator37, this.leve1);
             if (elevator37HitFloor) {
                 this.elevator37.body.immovable = false;
             }
             else {
                 this.elevator37.body.immovable = true;
             }
             var elevator38HitFloor = this.game.physics.arcade.collide(this.elevator38, this.leve1);
             if (elevator38HitFloor) {
                 this.elevator38.body.immovable = false;
             }
             else {
                 this.elevator38.body.immovable = true;
             }
             var elevator39HitFloor = this.game.physics.arcade.collide(this.elevator39, this.leve1);
             if (elevator39HitFloor) {
                 this.elevator39.body.immovable = false;
             }
             else {
                 this.elevator39.body.immovable = true;
             }
             var elevator40HitFloor = this.game.physics.arcade.collide(this.elevator40, this.leve1);
             if (elevator40HitFloor) {
                 this.elevator40.body.immovable = false;
             }
             else {
                 this.elevator40.body.immovable = true;
             }
             var elevator41HitFloor = this.game.physics.arcade.collide(this.elevator41, this.leve1);
             if (elevator41HitFloor) {
                 this.elevator41.body.immovable = false;
             }
             else {
                 this.elevator41.body.immovable = true;
             }
             var elevator42HitFloor = this.game.physics.arcade.collide(this.elevator42, this.leve1);
             if (elevator42HitFloor) {
                 this.elevator42.body.immovable = false;
             }
             else {
                 this.elevator42.body.immovable = true;
             }
             var elevator43HitFloor = this.game.physics.arcade.collide(this.elevator43, this.leve1);
             if (elevator43HitFloor) {
                 this.elevator43.body.immovable = false;
             }
             else {
                 this.elevator43.body.immovable = true;
             }
             var elevator44HitFloor = this.game.physics.arcade.collide(this.elevator44, this.leve1);
             if (elevator44HitFloor) {
                 this.elevator44.body.immovable = false;
             }
             else {
                 this.elevator44.body.immovable = true;
             }
             var elevator45HitFloor = this.game.physics.arcade.collide(this.elevator45, this.leve1);
             if (elevator45HitFloor) {
                 this.elevator45.body.immovable = false;
             }
             else {
                 this.elevator45.body.immovable = true;
             }
             var elevator46HitFloor = this.game.physics.arcade.collide(this.elevator46, this.leve1);
             if (elevator46HitFloor) {
                 this.elevator46.body.immovable = false;
             }
             else {
                 this.elevator46.body.immovable = true;
             }
             var elevator47HitFloor = this.game.physics.arcade.collide(this.elevator47, this.leve1);
             if (elevator47HitFloor) {
                 this.elevator47.body.immovable = false;
             }
             else {
                 this.elevator47.body.immovable = true;
             }
             var elevator48HitFloor = this.game.physics.arcade.collide(this.elevator48, this.leve1);
             if (elevator48HitFloor) {
                 this.elevator48.body.immovable = false;
             }
             else {
                 this.elevator48.body.immovable = true;
             }
             var elevator49HitFloor = this.game.physics.arcade.collide(this.elevator49, this.leve1);
             if (elevator49HitFloor) {
                 this.elevator49.body.immovable = false;
             }
             else {
                 this.elevator49.body.immovable = true;
             }
             var elevator50HitFloor = this.game.physics.arcade.collide(this.elevator50, this.leve1);
             if (elevator50HitFloor) {
                 this.elevator50.body.immovable = false;
             }
             else {
                 this.elevator50.body.immovable = true;
             }
             var elevator51HitFloor = this.game.physics.arcade.collide(this.elevator51, this.leve1);
             if (elevator51HitFloor) {
                 this.elevator51.body.immovable = false;
             }
             else {
                 this.elevator51.body.immovable = true;
             }
             var elevator52HitFloor = this.game.physics.arcade.collide(this.elevator52, this.leve1);
             if (elevator52HitFloor) {
                 this.elevator52.body.immovable = false;
             }
             else {
                 this.elevator52.body.immovable = true;
             }
             var elevator53HitFloor = this.game.physics.arcade.collide(this.elevator53, this.leve1);
             if (elevator53HitFloor) {
                 this.elevator53.body.immovable = false;
             }
             else {
                 this.elevator53.body.immovable = true;
             }
             var elevator54HitFloor = this.game.physics.arcade.collide(this.elevator54, this.leve1);
             if (elevator54HitFloor) {
                 this.elevator54.body.immovable = false;
             }
             else {
                 this.elevator54.body.immovable = true;
             }
             var elevator55HitFloor = this.game.physics.arcade.collide(this.elevator55, this.leve1);
             if (elevator55HitFloor) {
                 this.elevator55.body.immovable = false;
             }
             else {
                 this.elevator55.body.immovable = true;
             }
             var elevator56HitFloor = this.game.physics.arcade.collide(this.elevator56, this.leve1);
             if (elevator56HitFloor) {
                 this.elevator56.body.immovable = false;
             }
             else {
                 this.elevator56.body.immovable = true;
             }
             var elevator57HitFloor = this.game.physics.arcade.collide(this.elevator57, this.leve1);
             if (elevator57HitFloor) {
                 this.elevator57.body.immovable = false;
             }
             else {
                 this.elevator57.body.immovable = true;
             }
             var elevator58HitFloor = this.game.physics.arcade.collide(this.elevator58, this.leve1);
             if (elevator58HitFloor) {
                 this.elevator58.body.immovable = false;
             }
             else {
                 this.elevator58.body.immovable = true;
             }
             var elevator59HitFloor = this.game.physics.arcade.collide(this.elevator59, this.leve1);
             if (elevator59HitFloor) {
                 this.elevator59.body.immovable = false;
             }
             else {
                 this.elevator59.body.immovable = true;
             }
             var elevator60HitFloor = this.game.physics.arcade.collide(this.elevator60, this.leve1);
             if (elevator60HitFloor) {
                 this.elevator60.body.immovable = false;
             }
             else {
                 this.elevator60.body.immovable = true;
             }
             var elevator61HitFloor = this.game.physics.arcade.collide(this.elevator61, this.leve1);
             if (elevator61HitFloor) {
                 this.elevator61.body.immovable = false;
             }
             else {
                 this.elevator61.body.immovable = true;
             }
             var elevator62HitFloor = this.game.physics.arcade.collide(this.elevator62, this.leve1);
             if (elevator62HitFloor) {
                 this.elevator62.body.immovable = false;
             }
             else {
                 this.elevator62.body.immovable = true;
             }
             var elevator63HitFloor = this.game.physics.arcade.collide(this.elevator63, this.leve1);
             if (elevator63HitFloor) {
                 this.elevator63.body.immovable = false;
             }
             else {
                 this.elevator63.body.immovable = true;
             }
             var elevator64HitFloor = this.game.physics.arcade.collide(this.elevator64, this.leve1);
             if (elevator64HitFloor) {
                 this.elevator64.body.immovable = false;
             }
             else {
                 this.elevator64.body.immovable = true;
             }
             var elevator65HitFloor = this.game.physics.arcade.collide(this.elevator65, this.leve1);
             if (elevator65HitFloor) {
                 this.elevator65.body.immovable = false;
             }
             else {
                 this.elevator65.body.immovable = true;
             }
             var elevator66HitFloor = this.game.physics.arcade.collide(this.elevator66, this.leve1);
             if (elevator66HitFloor) {
                 this.elevator66.body.immovable = false;
             }
             else {
                 this.elevator66.body.immovable = true;
             }
             var elevator67HitFloor = this.game.physics.arcade.collide(this.elevator67, this.leve1);
             if (elevator67HitFloor) {
                 this.elevator67.body.immovable = false;
             }
             else {
                 this.elevator67.body.immovable = true;
             }
             var elevator68HitFloor = this.game.physics.arcade.collide(this.elevator68, this.leve1);
             if (elevator68HitFloor) {
                 this.elevator68.body.immovable = false;
             }
             else {
                 this.elevator68.body.immovable = true;
             }
             var elevator69HitFloor = this.game.physics.arcade.collide(this.elevator69, this.leve1);
             if (elevator69HitFloor) {
                 this.elevator69.body.immovable = false;
             }
             else {
                 this.elevator69.body.immovable = true;
             }
             var elevator70HitFloor = this.game.physics.arcade.collide(this.elevator70, this.leve1);
             if (elevator70HitFloor) {
                 this.elevator70.body.immovable = false;
             }
             else {
                 this.elevator70.body.immovable = true;
             }
             var elevator71HitFloor = this.game.physics.arcade.collide(this.elevator71, this.leve1);
             if (elevator71HitFloor) {
                 this.elevator71.body.immovable = false;
             }
             else {
                 this.elevator71.body.immovable = true;
             }
             var elevator72HitFloor = this.game.physics.arcade.collide(this.elevator72, this.leve1);
             if (elevator72HitFloor) {
                 this.elevator72.body.immovable = false;
             }
             else {
                 this.elevator72.body.immovable = true;
             }
             var elevator73HitFloor = this.game.physics.arcade.collide(this.elevator73, this.leve1);
             if (elevator73HitFloor) {
                 this.elevator73.body.immovable = false;
             }
             else {
                 this.elevator73.body.immovable = true;
             }
             var elevator74HitFloor = this.game.physics.arcade.collide(this.elevator74, this.leve1);
             if (elevator74HitFloor) {
                 this.elevator74.body.immovable = false;
             }
             else {
                 this.elevator74.body.immovable = true;
             }
             var elevator75HitFloor = this.game.physics.arcade.collide(this.elevator75, this.leve1);
             if (elevator75HitFloor) {
                 this.elevator75.body.immovable = false;
             }
             else {
                 this.elevator75.body.immovable = true;
             }
             var elevator76HitFloor = this.game.physics.arcade.collide(this.elevator76, this.leve1);
             if (elevator76HitFloor) {
                 this.elevator76.body.immovable = false;
             }
             else {
                 this.elevator76.body.immovable = true;
             }
             var elevator77HitFloor = this.game.physics.arcade.collide(this.elevator77, this.leve1);
             if (elevator77HitFloor) {
                 this.elevator77.body.immovable = false;
             }
             else {
                 this.elevator77.body.immovable = true;
             }
             var elevator78HitFloor = this.game.physics.arcade.collide(this.elevator78, this.leve1);
             if (elevator78HitFloor) {
                 this.elevator78.body.immovable = false;
             }
             else {
                 this.elevator78.body.immovable = true;
             }
             var elevator79HitFloor = this.game.physics.arcade.collide(this.elevator79, this.leve1);
             if (elevator79HitFloor) {
                 this.elevator79.body.immovable = false;
             }
             else {
                 this.elevator79.body.immovable = true;
             }
             var elevator80HitFloor = this.game.physics.arcade.collide(this.elevator80, this.leve1);
             if (elevator80HitFloor) {
                 this.elevator80.body.immovable = false;
             }
             else {
                 this.elevator80.body.immovable = true;
             }
             var elevator81HitFloor = this.game.physics.arcade.collide(this.elevator81, this.leve1);
             if (elevator81HitFloor) {
                 this.elevator81.body.immovable = false;
             }
             else {
                 this.elevator81.body.immovable = true;
             }*/
            //Player and Elevators
            var hitElevator1 = this.game.physics.arcade.collide(this.player, this.elevator1);
            var hitElevator2 = this.game.physics.arcade.collide(this.player, this.elevator2);
            var hitElevator3 = this.game.physics.arcade.collide(this.player, this.elevator3);
            var hitElevator4 = this.game.physics.arcade.collide(this.player, this.elevator4);
            var hitElevator5 = this.game.physics.arcade.collide(this.player, this.elevator5);
            var hitElevator6 = this.game.physics.arcade.collide(this.player, this.elevator6);
            var hitElevator7 = this.game.physics.arcade.collide(this.player, this.elevator7);
            var hitElevator8 = this.game.physics.arcade.collide(this.player, this.elevator8);
            var hitElevator9 = this.game.physics.arcade.collide(this.player, this.elevator9);
            var hitElevator10 = this.game.physics.arcade.collide(this.player, this.elevator10);
            var hitElevator11 = this.game.physics.arcade.collide(this.player, this.elevator11);
            var hitElevator12 = this.game.physics.arcade.collide(this.player, this.elevator12);
            var hitElevator13 = this.game.physics.arcade.collide(this.player, this.elevator13);
            var hitElevator14 = this.game.physics.arcade.collide(this.player, this.elevator14);
            var hitElevator15 = this.game.physics.arcade.collide(this.player, this.elevator15);
            var hitElevator16 = this.game.physics.arcade.collide(this.player, this.elevator16);
            var hitElevator17 = this.game.physics.arcade.collide(this.player, this.elevator17);
            var hitElevator18 = this.game.physics.arcade.collide(this.player, this.elevator18);
            var hitElevator19 = this.game.physics.arcade.collide(this.player, this.elevator19);
            var hitElevator20 = this.game.physics.arcade.collide(this.player, this.elevator20);
            var hitElevator21 = this.game.physics.arcade.collide(this.player, this.elevator21);
            var hitElevator22 = this.game.physics.arcade.collide(this.player, this.elevator22);
            var hitElevator23 = this.game.physics.arcade.collide(this.player, this.elevator23);
            var hitElevator24 = this.game.physics.arcade.collide(this.player, this.elevator24);
            var hitElevator25 = this.game.physics.arcade.collide(this.player, this.elevator25);
            var hitElevator26 = this.game.physics.arcade.collide(this.player, this.elevator26);
            var hitElevator27 = this.game.physics.arcade.collide(this.player, this.elevator27);
            /* var hitElevator28 = this.game.physics.arcade.collide(this.player, this.elevator28);
             var hitElevator29 = this.game.physics.arcade.collide(this.player, this.elevator29);
             var hitElevator30 = this.game.physics.arcade.collide(this.player, this.elevator30);
             var hitElevator31 = this.game.physics.arcade.collide(this.player, this.elevator31);
             var hitElevator32 = this.game.physics.arcade.collide(this.player, this.elevator32);
             var hitElevator33 = this.game.physics.arcade.collide(this.player, this.elevator33);
             var hitElevator34 = this.game.physics.arcade.collide(this.player, this.elevator34);
             var hitElevator35 = this.game.physics.arcade.collide(this.player, this.elevator35);
             var hitElevator36 = this.game.physics.arcade.collide(this.player, this.elevator36);
             var hitElevator37 = this.game.physics.arcade.collide(this.player, this.elevator37);
             var hitElevator38 = this.game.physics.arcade.collide(this.player, this.elevator38);
             var hitElevator39 = this.game.physics.arcade.collide(this.player, this.elevator39);
             var hitElevator40 = this.game.physics.arcade.collide(this.player, this.elevator40);
             var hitElevator41 = this.game.physics.arcade.collide(this.player, this.elevator41);
             var hitElevator42 = this.game.physics.arcade.collide(this.player, this.elevator42);
             var hitElevator43 = this.game.physics.arcade.collide(this.player, this.elevator43);
             var hitElevator44 = this.game.physics.arcade.collide(this.player, this.elevator44);
             var hitElevator45 = this.game.physics.arcade.collide(this.player, this.elevator45);
             var hitElevator46 = this.game.physics.arcade.collide(this.player, this.elevator46);
             var hitElevator47 = this.game.physics.arcade.collide(this.player, this.elevator47);
             var hitElevator48 = this.game.physics.arcade.collide(this.player, this.elevator48);
             var hitElevator49 = this.game.physics.arcade.collide(this.player, this.elevator49);
             var hitElevator50 = this.game.physics.arcade.collide(this.player, this.elevator50);
             var hitElevator51 = this.game.physics.arcade.collide(this.player, this.elevator51);
             var hitElevator52 = this.game.physics.arcade.collide(this.player, this.elevator52);
             var hitElevator53 = this.game.physics.arcade.collide(this.player, this.elevator53);
             var hitElevator54 = this.game.physics.arcade.collide(this.player, this.elevator54);
             var hitElevator55 = this.game.physics.arcade.collide(this.player, this.elevator55);
             var hitElevator56 = this.game.physics.arcade.collide(this.player, this.elevator56);
             var hitElevator57 = this.game.physics.arcade.collide(this.player, this.elevator57);
             var hitElevator58 = this.game.physics.arcade.collide(this.player, this.elevator58);
             var hitElevator59 = this.game.physics.arcade.collide(this.player, this.elevator59);
             var hitElevator60 = this.game.physics.arcade.collide(this.player, this.elevator60);
             var hitElevator61 = this.game.physics.arcade.collide(this.player, this.elevator61);
             var hitElevator62 = this.game.physics.arcade.collide(this.player, this.elevator62);
             var hitElevator63 = this.game.physics.arcade.collide(this.player, this.elevator63);
             var hitElevator64 = this.game.physics.arcade.collide(this.player, this.elevator64);
             var hitElevator65 = this.game.physics.arcade.collide(this.player, this.elevator65);
             var hitElevator66 = this.game.physics.arcade.collide(this.player, this.elevator66);
             var hitElevator67 = this.game.physics.arcade.collide(this.player, this.elevator67);
             var hitElevator68 = this.game.physics.arcade.collide(this.player, this.elevator68);
             var hitElevator69 = this.game.physics.arcade.collide(this.player, this.elevator69);
             var hitElevator70 = this.game.physics.arcade.collide(this.player, this.elevator70);
             var hitElevator71 = this.game.physics.arcade.collide(this.player, this.elevator71);
             var hitElevator72 = this.game.physics.arcade.collide(this.player, this.elevator72);
             var hitElevator73 = this.game.physics.arcade.collide(this.player, this.elevator73);
             var hitElevator74 = this.game.physics.arcade.collide(this.player, this.elevator74);
             var hitElevator75 = this.game.physics.arcade.collide(this.player, this.elevator75);
             var hitElevator76 = this.game.physics.arcade.collide(this.player, this.elevator76);
             var hitElevator77 = this.game.physics.arcade.collide(this.player, this.elevator77);
             var hitElevator78 = this.game.physics.arcade.collide(this.player, this.elevator78);
             var hitElevator79 = this.game.physics.arcade.collide(this.player, this.elevator79);
             var hitElevator80 = this.game.physics.arcade.collide(this.player, this.elevator80);
             var hitElevator81 = this.game.physics.arcade.collide(this.player, this.elevator81);
             */
            /* if (hitElevator || hitElevator2 || hitElevator3 || hitElevator4) {
                 this.isOnElevator = true;
                 this.elevator.body.immovable = false;
 
             }
             else {
                 this.elevator.body.immovable = true;
 
             }
             
             
 
             //Current Elevators' Contorls
             /*if (elevatorHitFloor) {
                 this.isOnElevator = true;
                 this.elevator.body.immovable = false;
             }
             else {
                 this.elevator.body.immovable = true;
             }
             if (elevator2HitFloor) {
                 this.isOnElevator = true;
                 this.elevatorT.body.immovable = false;
             }
             else {
                 this.elevatorT.body.immovable = true;
             }
             if (elevator3HitFloor) {
                 this.isOnElevator = true;
                 this.elevatorX.body.immovable = false;
             }
             else {
                 this.elevator.body.immovable = true;
             }
             if (elevator4HitFloor) {
                 this.isOnElevator = true;
                 this.elevatorY.body.immovable = false;
             }
             else {
                 this.elevatorY.body.immovable = true;
             }*/
            if (bulletHits) {
                var bullet = this.bullets.getFirstExists(true);
                var enemyBullet = this.enemyBullets.getFirstExists(true);
                bullet.kill();
                enemyBullet.kill();
            }
            if (hitFloor1) {
                this.enemySpawn();
            }
            /*if (elevator2Hit) {
                this.elevatorT.body.immovable = false;
            } else {
                this.elevatorT.body.immovable = true;
            }*/
            if (this.cursors.up.isDown && this.game.physics.arcade.overlap(this.player, this.doors)) {
                this.playAnimation(this.player, this.door);
            }
            this.game.physics.arcade.overlap(this.bullets, this.enemies, this.collisionHandler, null, this);
            this.game.physics.arcade.overlap(this.enemyBullets, this.player, this.enemyHitsPlayer, null, this);
            //this.doors.game.
            var enemy = this.enemies.getFirstExists(true);
            //this.game.physics.arcade.moveToXY(enemy, this.player.x, this.player.y, 20);
            if (this.game.physics.arcade.overlap(this.player, (this.floor1 || this.floor2 || this.floor3 || this.floor4 || this.floor5 || this.floor6 || this.floor7) && this.cursors.up.isDown)) {
                this.playAnimation(this.player, this.floor1);
            }
            // Collection/ Keys
            this.game.physics.arcade.overlap(this.player, this.keys, this.collectKeys, null, this);
        };
        Game.prototype.collectKeys = function (player, key) {
            //key = this.keys.getFirstExists(true);
            //key.body.visible = false;
            key.kill(this);
            this.keysCOllected++;
        };
        Game.prototype.playAnimation = function (player, door) {
            //door.animations.play('open');
            this.doorMusic.play();
            this.player.visible = false;
            this.game.time.events.add(Phaser.Timer.SECOND * 2, this.invisble, this);
            //door.animations.play('open');
            //door2.animations.play('open');
        };
        Game.prototype.invisble = function () {
            this.player.visible = true;
        };
        //playEnemyAnimation(enemy, door2) {
        //    door2.animations.play('open');
        //    //door.animations.play('open');
        //    //door2.animations.play('open');
        //}
        Game.prototype.firebullet = function (bullet) {
            if (this.game.time.now > this.bulletTime) {
                this.music.play();
                this.player.animations.play('shootShield');
                this.player.animations.currentAnim.speed = 10;
                bullet = this.bullets.getFirstExists(false);
                if (bullet) {
                    bullet.reset(this.player.x + 50, this.player.y + 50);
                    if (this.bulletDirection) {
                        bullet.body.velocity.x += 300;
                    }
                    else {
                        bullet.body.velocity.x -= 300;
                    }
                    this.bulletTime = this.game.time.now + 200;
                }
            }
        };
        Game.prototype.resetBullet = function (bullet) {
            bullet.kill();
        };
        Game.prototype.collisionHandler = function (enemy, bullet) {
            bullet.kill();
            enemy.kill();
            this.numberOfEnemies += 1;
            this.enemySpawn();
            this.score += 20;
            this.scoreText.text = this.scoreConst + this.score;
        };
        Game.prototype.enemyHitsPlayer = function (player, bullet) {
            bullet.kill();
            player.kill();
            this.livesCount -= 1;
            if (this.livesCount == 0) {
                this.stateText.text = "You Lose, click to restart";
                this.stateText.visible = true;
                this.game.input.onTap.addOnce(this.restart, this);
            }
            else {
                this.player.revive();
            }
        };
        Game.prototype.enemyFires = function () {
            var enemyBullet = this.enemyBullets.getFirstExists(false);
            var enemy = this.enemies.getFirstExists(true);
            if (enemyBullet && enemy) {
                enemyBullet.reset(enemy.body.x, enemy.body.y + 50);
                //this.game.physics.arcade.moveToObject(enemyBullet, this.player, 120);
                if (this.player.x > enemy.body.x) {
                    enemyBullet.body.velocity.x += 200;
                }
                else {
                    enemyBullet.body.velocity.x -= 200;
                }
                this.firingTimer = this.game.time.now + 2000;
            }
        };
        Game.prototype.randomIntFromInterval = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        };
        Game.prototype.restart = function () {
            //this.lives.callAll('revive');
            this.player.revive();
            this.livesCount = 3;
            this.stateText.visible = false;
        };
        return Game;
    }(Phaser.State));
    ElevatorAction.Game = Game;
})(ElevatorAction || (ElevatorAction = {}));
var ElevatorAction;
(function (ElevatorAction) {
    var Main = (function (_super) {
        __extends(Main, _super);
        function Main() {
            var _this = this;
            var renderMode = Phaser.AUTO;
            _this = _super.call(this, 1890, 1000, renderMode, "content", null) || this;
            //this.state.add('Boot', Boot, false);
            //this.state.add('Preloader', Preloader, false);
            _this.state.add('MainMenu', ElevatorAction.MainMenu, false);
            _this.state.add('Game', ElevatorAction.Game, false);
            _this.state.start('MainMenu');
            return _this;
        }
        return Main;
    }(Phaser.Game));
    ElevatorAction.Main = Main;
    var GameStates = (function () {
        function GameStates() {
        }
        return GameStates;
    }());
    GameStates.MAINMENU = "mainMenu";
    GameStates.GAME = "game";
    ElevatorAction.GameStates = GameStates;
})(ElevatorAction || (ElevatorAction = {}));
var ElevatorAction;
(function (ElevatorAction) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MainMenu.prototype.preload = function () {
            this.game.load.image('button', 'assets/start.png');
        };
        MainMenu.prototype.create = function () {
            var button = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY, 'button', this.actionOnClick, this, 2, 1, 0);
            button.scale.setTo(0.5, 0.5);
        };
        MainMenu.prototype.actionOnClick = function () {
            this.game.state.start('Game', true, false);
        };
        return MainMenu;
    }(Phaser.State));
    ElevatorAction.MainMenu = MainMenu;
})(ElevatorAction || (ElevatorAction = {}));
//# sourceMappingURL=Main.js.map