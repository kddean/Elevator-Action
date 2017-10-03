window.onload = function () {
    var game = new ElevatorAction.Main();
};
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
            this.game.load.image('bullet', 'assets/shield.png');
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
            this.game.load.image('boblife', 'assets/bob.png');
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
            this.game.world.setBounds(0, 0, 1890, 19000);
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
            //this.game.add.sprite(0, 0, 'boblife'); 
            this.game.add.sprite(0, 0, 'boblife');
            //Floor Layout
            var y = 190;
            var t;
            for (var w = 0; w <= 3; w++) {
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
            }
            for (var j = 0; j < 10; j++) {
                t = this.leve1.create(j * 192, y, 'floor');
                t.body.immovable = true;
            }
            //Door Placement
            this.doors = this.game.add.group();
            this.doors.enableBody = true;
            var z = 150;
            for (var d = 0; d < 3; d++) {
                for (var i = 0; i < 10; i++) {
                    if ((i > 2 && i < 4) || (i > 4 && i < 8) || (i == 9)) {
                        t = this.doors.create(((i * 192) + 20), z - 90, 'door');
                        t.body.immovable = true;
                    }
                }
                z = z + 216;
                for (var i = 0; i < 10; i++) {
                    if ((i < 1) || (i == 2) || (i == 7) || (i == 9)) {
                        t = this.doors.create(((i * 192) + 20), z - 90, 'door');
                        t.body.immovable = true;
                    }
                }
                z = z + 216;
                for (var i = 0; i < 10; i++) {
                    if ((i < 3) || (i == 4) || (i > 5 && i < 8) || (i == 9)) {
                        t = this.doors.create(((i * 192) + 20), z - 90, 'door');
                        t.body.immovable = true;
                    }
                }
                z = z + 216;
                for (var i = 0; i < 10; i++) {
                    if ((i == 2) || (i > 3 && i < 7) || (i == 9)) {
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
            }
            //Keys
            this.keys = this.game.add.group();
            this.keys.enableBody = true;
            var q = 0;
            for (var f = 0; f < 3; f++) {
                var k = this.keys.create(1280, 300 + q, 'key');
                var k = this.keys.create(210, 732 + q, 'key');
                var k = this.keys.create(50, 2028 + q, 'key');
                var k = this.keys.create(700, 2028 + q, 'key');
                var k = this.keys.create(1750, 2028 + q, 'key');
                var k = this.keys.create(1000, 2676 + q, 'key');
                var k = this.keys.create(1350, 3540 + q, 'key');
                var k = this.keys.create(600, 3756 + q, 'key');
                var k = this.keys.create(1750, 3756 + q, 'key');
                q = q + 4770;
            }
            //4470 + 300
            //Elevators
            this.elevator = this.game.add.sprite(1300, this.game.world.height - 100, 'elevator');
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
            }*/
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
            //going down
            this.player = this.game.add.sprite(this.game.width / 2, 0, 'princess');
            //going up
            //this.player = this.game.add.sprite(100, 1700, 'dude');
            //this.door = this.game.add.sprite(this.game.world.width / 2, this.game.world.height - 475, 'doors1');
            this.game.physics.arcade.enable(this.player);
            this.player.body.bounce.y = 0.2;
            this.player.body.gravity.y = 1000;
            this.player.body.collideWorldBounds = true;
            this.player.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 0, true);
            this.player.animations.add('right', [18, 19, 20, 21, 22, 23, 24, 25, 26, 27], 0, true);
            this.player.animations.add('idle', [10, 11, 12, 13, 14, 15, 16, 17], 0, true);
            this.player.animations.currentAnim.speed = 10;
            //this.player.animations.add('shootShield', [28, 29, 30, 31, 32, 33, 34, 35, 36, 37], 0, true);
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
            this.enemyBullets = this.game.add.group();
            this.enemyBullets.enableBody = true;
            this.enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
            this.enemyBullets.createMultiple(30, 'bullet');
            this.enemyBullets.setAll('anchor.x', 0);
            this.enemyBullets.setAll('anchor.y', 0);
            this.enemyBullets.setAll('outOfBoundsKill', true);
            this.enemyBullets.setAll('checkWorldBounds', true);
            // player bullets
            this.bullets = this.game.add.group();
            this.bullets.enableBody = true;
            this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
            this.bullets.createMultiple(30, 'bullet');
            this.bullets.setAll('anchor.x', 0);
            this.bullets.setAll('anchor.y', 0);
            this.bullets.setAll('outOfBoundsKill', true);
            this.bullets.setAll('checkWorldBounds', true);
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
            //if (this.numberOfEnemies > 0) {
            //    this.enemies = this.game.add.group();
            //    this.enemies.enableBody = true;
            //    if (this.player.x > this.game.width / 2) {
            //        var enemy = this.enemies.create(this.player.x - this.randomIntFromInterval(200, 800), this.player.y, 'ghost');
            //        enemy.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 0, true);
            //        enemy.animations.play('idle');
            //        enemy.animations.currentAnim.speed = 10;
            //    }
            //    else {
            //        var enemy = this.enemies.create(this.player.x + this.randomIntFromInterval(200, 800), this.player.y, 'ghost');
            //        enemy.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 0, true);
            //        enemy.animations.play('idle');
            //        enemy.animations.currentAnim.speed = 10;
            //    }
            //    this.numberOfEnemies -= 1;
            //}
            this.enemies = this.game.add.group();
            this.enemies.enableBody = true;
            for (var i = 0; i < 60; i++) {
                var enemy = this.enemies.create(this.randomIntFromInterval(0, 1800), i * 216, 'ghost');
                enemy.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 0, true);
                enemy.animations.play('idle');
                enemy.animations.currentAnim.speed = 10;
            }
            //enemy.callALL('animations.add','animations','move', [0, 1, 2, 3], 10, true);
            //enemy.callALL('animations.play', 'animations', 'move'); 
        };
        Game.prototype.update = function () {
            this.game.input.update();
            var hitElevator = this.game.physics.arcade.collide(this.player, this.elevator);
            var hitElevator2 = this.game.physics.arcade.collide(this.player, this.elevatorT);
            var hitElevator3 = this.game.physics.arcade.collide(this.player, this.elevatorX);
            var hitElevator4 = this.game.physics.arcade.collide(this.player, this.elevatorY);
            var hitFloor1 = this.game.physics.arcade.collide(this.player, this.leve1);
            var elevatorHitFloor = this.game.physics.arcade.collide(this.elevator, this.leve1);
            var elevator2HitFloor = this.game.physics.arcade.collide(this.elevatorT, this.leve1);
            var elevator3HitFloor = this.game.physics.arcade.collide(this.elevatorX, this.leve1);
            var elevator4HitFloor = this.game.physics.arcade.collide(this.elevatorY, this.leve1);
            var bulletHits = this.game.physics.arcade.collide(this.bullets, this.enemyBullets);
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
            //if (this.cursors.up.isDown && this.player.body.touching.down && (hitFloor1)) {
            //    this.player.body.velocity.y -= 350;
            //}
            //if (this.cursors.up.isDown && this.player.body.touching.down && (hitFloor1)) {
            //    this.player.body.velocity.y -= 350;
            //}
            //if (this.cursors.up.isDown && this.player.body.touching.down && (hitElevator || hitElevator2)) {
            //    this.player.body.velocity.y -= 350;
            //}
            if (this.fireButton.isDown) {
                this.firebullet(this.bullets);
            }
            if (this.game.time.now > this.firingTimer) {
                this.enemyFires();
            }
            if (hitElevator || hitElevator2 || hitElevator3 || hitElevator4) {
                this.isOnElevator = true;
                this.elevator.body.immovable = false;
            }
            else {
                this.elevator.body.immovable = true;
            }
            //Current Elevators' Contorls
            if (elevatorHitFloor) {
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
            }
            if (bulletHits) {
                var bullet = this.bullets.getFirstExists(true);
                var enemyBullet = this.enemyBullets.getFirstExists(true);
                bullet.kill();
                enemyBullet.kill();
            }
            //if (hitFloor1) {
            //    this.enemySpawn();
            //}
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
            this.game.physics.arcade.overlap(this.player, this.enemies, this.playerHitByEnemy, null, this);
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
        Game.prototype.playerHitByEnemy = function (enemy, player) {
            enemy.kill();
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
                //this.player.animations.play('shootShield');
                //this.player.animations.currentAnim.speed = 10;
                bullet = this.bullets.getFirstExists(false);
                if (bullet) {
                    bullet.reset(this.player.x + 50, this.player.y);
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
            //this.enemySpawn();
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
                enemyBullet.reset(enemy.body.x, enemy.body.y);
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
            //this.game.load.image('button', 'assets/start.png');
            this.game.load.audio('start', 'assets/shoot.wav');
            this.game.load.spritesheet('pressStart', 'assets/r_introscreen_space.png', 1920, 1080);
            this.fireButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        };
        MainMenu.prototype.create = function () {
            //var button = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY, 'button', this.actionOnClick, this, 2, 1, 0);
            //button.scale.setTo(0.5, 0.5);
            this.startScreen = this.game.add.sprite(0, 0, 'pressStart');
            this.game.physics.arcade.enable(this.startScreen);
            this.startScreen.animations.add('idle', [0, 1], 0, true);
            this.music = this.add.audio('shoot');
        };
        MainMenu.prototype.update = function () {
            if (this.fireButton.isDown) {
                this.state.start('Game', true, false);
            }
            this.startScreen.animations.play('idle');
            this.startScreen.animations.currentAnim.speed = 10;
        };
        return MainMenu;
    }(Phaser.State));
    ElevatorAction.MainMenu = MainMenu;
})(ElevatorAction || (ElevatorAction = {}));
//# sourceMappingURL=Main.js.map