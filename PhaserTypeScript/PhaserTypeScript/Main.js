window.onload = function () {
    var game = new ElevatorAction.Main();
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ElevatorAction;
(function (ElevatorAction) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.apply(this, arguments);
            this.elevatorDir = 1;
            this.isOnElevator = false;
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
            this.game.load.image('button', 'assets/button.png');
            this.game.load.image('invisible', 'assets/Invisible Box.png');
            this.game.load.image('door', 'assets/fancydoor.png');
            this.game.load.image('wall', 'assets/hanger.png');
            this.game.load.image('floor', 'assets/fancyfloor.png');
            this.game.load.image('archway', 'assets/fancyArchwalls.png');
            this.game.load.image('key', 'assets/key.png');
            this.game.load.audio('shoot', 'assets/shoot.wav', true);
            this.game.load.audio('doorOpen', 'assets/door_open_2.wav', true);
        };
        Game.prototype.create = function () {
            this.keysCOllected = 0;
            this.game.camera.follow(this.player);
            this.game.world.resize(800, 1000);
            this.bulletTime = 0;
            this.score = 0;
            this.livesCount = 3;
            this.firingTimer = 0;
            this.numberOfEnemies = 2;
            this.gameTime = 50;
            this.scoreConst = "Score :";
            this.game.stage.backgroundColor = "#000000;";
            this.game.world.setBounds(0, 0, 1890, 19000);
            this.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            this.bullets = this.game.add.group();
            this.bullets.enableBody = true;
            this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
            this.bullets.createMultiple(30, 'bullet');
            this.bullets.setAll('anchor.x', 0);
            this.bullets.setAll('anchor.y', 0);
            this.bullets.setAll('outOfBoundsKill', true);
            this.bullets.setAll('checkWorldBounds', true);
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
            /*
            for (var i = 0; i < 3; i++) {
                var d = this.floor1.create((i + 1) * 300, 250, 'door');
                d.scale.setTo(1, 1);
                d.body.immovable = true;
                var ledge = this.leve1.create((i + 1) * 285, 350, 'floor');
                ledge.scale.setTo(0.75, 1);
                ledge.body.immovable = true;
            }

            for (var i = 0; i < 3; i++) {
                var d = this.floor1.create((1200 + (i + 1) * 200), 250, 'door');
                d.scale.setTo(1, 1);
                d.body.immovable = true;

            }


            for (var i = 0; i < 3; i++) {
                var d = this.floor2.create((i + 1) * 300, 650, 'door');
                d.scale.setTo(1, 1);
                d.body.immovable = true;
            }



            for (var i = 0; i < 2; i++) {
                var d = this.floor2.create((1400 + (i + 1) * 200), 650, 'door');
                d.scale.setTo(1, 1);
                d.body.immovable = true;

            }

            for (var i = 0; i < 5; i++) {
                var d = this.floor3.create(200 + (i + 1) * 200, 950, 'door');
                d.scale.setTo(1, 1);
                d.body.immovable = true;
            }



            for (var i = 0; i < 2; i++) {
                var d = this.floor4.create(((i + 1) * 150), 1250, 'door');
                d.scale.setTo(1, 1);
                d.body.immovable = true;
            }



            for (var i = 0; i < 4; i++) {
                var d = this.floor4.create(400 + (i + 1) * 200, 1250, 'door');
                d.scale.setTo(1, 1);
                d.body.immovable = true;
            }



            for (var i = 0; i < 2; i++) {
                var d = this.floor5.create(((i + 1) * 150), 1550, 'door');
                d.scale.setTo(1, 1);
                d.body.immovable = true;
            }



            for (var i = 0; i < 4; i++) {
                var d = this.floor5.create(400 + (i + 1) * 200, 1550, 'door');
                d.scale.setTo(1, 1);
                d.body.immovable = true;
            }



            for (var i = 0; i < 2; i++) {
                var d = this.floor5.create((1400 + (i + 1) * 200), 1550, 'door');
                d.scale.setTo(1, 1);
                d.body.immovable = true;
            }


            for (var i = 0; i < 4; i++) {
                var d = this.floor6.create((i + 1) * 150, 1850, 'door');
                d.scale.setTo(1, 1);
                d.body.immovable = true;
            }



            for (var i = 0; i < 3; i++) {
                var d = this.floor6.create(900 + (i + 1) * 150, 1850, 'door');
                d.scale.setTo(1, 1);
                d.body.immovable = true;
            }

            //Floor

            var ledge = this.leve1.create(1350, 350, 'floor');
            ledge.scale.setTo(3, 1);
            ledge.body.immovable = true;

            var ledge2 = this.leve1.create(285, 750, 'floor');
            ledge2.scale.setTo(5, 1);
            ledge2.body.immovable = true;

            var ledge3 = this.leve1.create(1550, 750, 'floor');
            ledge3.scale.setTo(2, 1);
            ledge3.body.immovable = true;

            var ledge4 = this.leve1.create(285, 1050, 'floor');
            ledge4.scale.setTo(6, 1);
            ledge4.body.immovable = true;

            var ledge5 = this.leve1.create(0, 1350, 'floor');
            ledge5.scale.setTo(2, 1);
            ledge5.body.immovable = true;

            var ledge6 = this.leve1.create(550, 1350, 'floor');
            ledge6.scale.setTo(4, 1);
            ledge6.body.immovable = true;

            var ledge7 = this.leve1.create(1550, 1350, 'floor');
            ledge7.scale.setTo(2, 1);
            ledge7.body.immovable = true;

            var ledge8 = this.leve1.create(0, 1650, 'floor');
            ledge8.scale.setTo(2, 1);
            ledge8.body.immovable = true;

            var ledge9 = this.leve1.create(550, 1650, 'floor');
            ledge9.scale.setTo(8, 1);
            ledge9.body.immovable = true;

            var ledge10 = this.leve1.create(0, 1950, 'floor');
            ledge10.scale.setTo(4, 1);
            ledge10.body.immovable = true;

            var ledge11 = this.leve1.create(1000, 1950, 'floor');
            ledge11.scale.setTo(2.5, 1);
            ledge11.body.immovable = true;

            var ledge12 = this.leve1.create(750, 750, 'wall');
            ledge12.scale.setTo(1, 4.2);
            ledge12.body.immovable = true;

            var ledge13 = this.leve1.create(429, 350, 'wall');
            ledge13.scale.setTo(1, 1.85);
            ledge13.body.immovable = true;
            var ledge13 = this.leve1.create(855, 350, 'wall');
            ledge13.scale.setTo(1, 1.85);
            ledge13.body.immovable = true;*/
            //Floor Layout
            var y = 150;
            var t;
            for (var w = 0; w <= 3; w++) {
                for (var j = 0; j < 10; j++) {
                    if (((j >= 0) && (j < 2)) || (j > 2 && j < 7) || (j > 7 && j <= 9)) {
                        t = this.leve1.create(j * 192, y, 'floor');
                        t.body.immovable = true;
                    }
                }
                y = y + 216;
                for (var i = 1; i <= 2; i++) {
                    for (var j = 0; j < 10; j++) {
                        if (((j >= 0) && (j < 3)) || (j > 3 && j < 5) || (j >= 6 && j < 8) || (j == 9)) {
                            t = this.leve1.create(j * 192, y, 'floor');
                            t.body.immovable = true;
                        }
                    }
                    y = y + 216;
                }
                for (var j = 0; j < 10; j++) {
                    if ((j > 0 && j < 3) || (j > 3 && j < 6) || (j >= 7)) {
                        t = this.leve1.create(j * 192, y, 'floor');
                        t.body.immovable = true;
                    }
                }
                y = y + 216;
                for (var i = 1; i <= 2; i++) {
                    for (var j = 0; j < 10; j++) {
                        if ((j > 0 && j < 3) || (j == 4) || (j > 6)) {
                            t = this.leve1.create(j * 192, y, 'floor');
                            t.body.immovable = true;
                        }
                    }
                    y = y + 216;
                }
                for (var j = 0; j < 10; j++) {
                    if ((j > 0 && j < 3) || (j > 3 && j < 6) || (j > 6)) {
                        t = this.leve1.create(j * 192, y, 'floor');
                        t.body.immovable = true;
                    }
                }
                y = y + 216;
                for (var i = 1; i <= 2; i++) {
                    for (var j = 0; j < 10; j++) {
                        if ((j >= 0 && j < 3) || (j == 5) || (j >= 6 && j < 9)) {
                            t = this.leve1.create(j * 192, y, 'floor');
                            t.body.immovable = true;
                        }
                    }
                    y = y + 216;
                }
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
            }
            //Keys
            this.keys = this.game.add.group();
            this.keys.enableBody = true;
            var k = this.keys.create(1280, 300, 'key');
            var k = this.keys.create(210, 732, 'key');
            var k = this.keys.create(50, 2028, 'key');
            var k = this.keys.create(700, 2028, 'key');
            var k = this.keys.create(1750, 2028, 'key');
            var k = this.keys.create(1000, 2676, 'key');
            var k = this.keys.create(1350, 3540, 'key');
            var k = this.keys.create(600, 3756, 'key');
            var k = this.keys.create(1750, 3756, 'key');
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
            this.player = this.game.add.sprite(this.game.width / 2, 0, 'dude');
            //going up
            //this.player = this.game.add.sprite(100, 1700, 'dude');
            //this.door = this.game.add.sprite(this.game.world.width / 2, this.game.world.height - 475, 'doors1');
            this.game.physics.arcade.enable(this.player);
            this.player.body.bounce.y = 0.2;
            this.player.body.gravity.y = 1000;
            this.player.body.collideWorldBounds = true;
            this.player.animations.add('left', [0, 1, 2, 3], 10, true);
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
            this.player.animations.add('right', [5, 6, 7, 8], 10, true);
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
                    var enemy = this.enemies.create(this.player.x - this.randomIntFromInterval(200, 800), this.player.y, 'baddie');
                }
                else {
                    var enemy = this.enemies.create(this.player.x + this.randomIntFromInterval(200, 800), this.player.y, 'baddie');
                }
                this.numberOfEnemies -= 1;
            }
            //enemy.callALL('animations.add','animations','move', [0, 1, 2, 3], 10, true);
            //enemy.callALL('animations.play', 'animations', 'move'); 
        };
        Game.prototype.update = function () {
            //var isDoorOpen = false;
            this.game.input.update();
            //var hitPlatform = this.game.physics.arcade.collide(this.player, this.leftPlatforms);
            //var hitPlatform2 = this.game.physics.arcade.collide(this.player, this.rightPlatforms);
            //var hitWall = this.game.physics.arcade.collide(this.player, this.leftSideWall);
            //var hitWall2 = this.game.physics.arcade.collide(this.player, this.rightSideWall);
            //var hitWall3 = this.game.physics.arcade.collide(this.player, this.topWall);
            var hitElevator = this.game.physics.arcade.collide(this.player, this.elevator);
            var hitElevator2 = this.game.physics.arcade.collide(this.player, this.elevatorT);
            var hitElevator3 = this.game.physics.arcade.collide(this.player, this.elevatorX);
            var hitElevator4 = this.game.physics.arcade.collide(this.player, this.elevatorY);
            //var elevatorHit = this.game.physics.arcade.collide(this.elevator, this.rightPlatforms);
            //var elevator2Hit = this.game.physics.arcade.collide(this.elevatorT, this.leftPlatforms);
            //var elevator2Hit2 = this.game.physics.arcade.collide(this.elevatorT, this.topWall);
            //var elevatorHit2 = this.game.physics.arcade.collide(this.elevator, this.topWall);
            //var enemyHit = this.game.physics.arcade.collide(this.enemies, this.leftPlatforms);
            //var enemyHit2 = this.game.physics.arcade.collide(this.enemies, this.rightPlatforms);
            //var bulletHIt = this.game.physics.arcade.collide(this.bullets, this.leftPlatforms);
            //var bulletHIt2 = this.game.physics.arcade.collide(this.bullets, this.rightPlatforms);
            //var enemyBulletHit = this.game.physics.arcade.collide(this.enemyBullets, this.leftPlatforms);
            //var enemyBulletHit = this.game.physics.arcade.collide(this.enemyBullets, this.rightPlatforms);
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
                this.bulletDirection = false;
            }
            else if (this.cursors.right.isDown) {
                this.player.body.velocity.x += 200;
                this.player.animations.play('right');
                this.bulletDirection = true;
            }
            else {
                this.player.animations.stop();
                this.player.frame = 4;
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
            if (this.cursors.up.isDown && this.player.body.touching.down && (hitElevator || hitElevator2)) {
                this.player.body.velocity.y -= 350;
            }
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
                bullet = this.bullets.getFirstExists(false);
                if (bullet) {
                    bullet.reset(this.player.x, this.player.y);
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
            var renderMode = Phaser.AUTO;
            _super.call(this, 1890, 1000, renderMode, "content", null);
            //this.state.add('Boot', Boot, false);
            //this.state.add('Preloader', Preloader, false);
            this.state.add('MainMenu', ElevatorAction.MainMenu, false);
            this.state.add('Game', ElevatorAction.Game, false);
            this.state.start('MainMenu');
        }
        return Main;
    }(Phaser.Game));
    ElevatorAction.Main = Main;
    var GameStates = (function () {
        function GameStates() {
        }
        GameStates.MAINMENU = "mainMenu";
        GameStates.GAME = "game";
        return GameStates;
    }());
    ElevatorAction.GameStates = GameStates;
})(ElevatorAction || (ElevatorAction = {}));
var ElevatorAction;
(function (ElevatorAction) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            _super.apply(this, arguments);
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