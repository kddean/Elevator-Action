var SimpleGame = (function () {
    function SimpleGame() {
        this.elevatorDir = 1;
        this.isOnElevator = false;
        this.game = new Phaser.Game(1890, 1000, Phaser.AUTO, 'content', { preload: this.preload, create: this.create, enemyFires: this.enemyFires, restart: this.restart, enemySpawn: this.enemySpawn, update: this.update, playAnimation: this.playAnimation, firebullet: this.firebullet, resetBullet: this.resetBullet, collisionHandler: this.collisionHandler, randomIntFromInterval: this.randomIntFromInterval, enemyHitsPlayer: this.enemyHitsPlayer, invisble: this.invisble });
    }
    SimpleGame.prototype.preload = function () {
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
        this.game.load.image('archway', 'assets/fancyArchwalls');
    };
    SimpleGame.prototype.create = function () {
        this.game.camera.follow(this.player);
        this.game.world.resize(800, 1000);
        this.bulletTime = 0;
        this.score = 0;
        this.livesCount = 3;
        this.firingTimer = 0;
        this.scoreConst = "Score :";
        this.game.stage.backgroundColor = "#000000;";
        // this.game.add.tileSprite(0, 0, 800, 600, 'background');
        this.game.world.setBounds(0, 0, 1890, 2000);
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
        //this.game.add.sprite(0, 0, 'sky');
        this.platforms = this.game.add.group();
        this.platforms.enableBody = true;
        //var ground = this.platforms.create(-0, this.game.world.height - 400, 'ground');
        //ground.scale.setTo(2, 1);
        //ground.body.immovable = true;
        //for (var i = 0; i < 3; i++) {
        /*var ledge = this.platforms.create(0, /*(this.game.world.height - ((i + 1) * 150) > 300 ? this.game.world.height - ((i + 1) * 150) : 300)/ (i+1) * 180, 'ground');
        ledge.scale.setTo(2, 1);
        ledge.body.immovable = true;
        //}
       /* ledge = this.platforms.create(0, 2 * 180, 'ground2');
        //ledge.scale.setTo(0, 0);
        ledge.body.immovable = true;
 
        var ledge2 = this.platforms.create(400, 2 * 180, 'ground2');
        //ledge2.scale.setTo(0, 0);
        ledge2.body.immovable = true;

        var ledge3 = this.platforms.create(0, 180, 'ground2');
        ledge3.body.immovable = true;

        var ledge4 = this.platforms.create(300, 180, 'ground2');
        ledge4.body.immovable = true;

        var ledge5 = this.platforms.create(500, 180, 'ground2');
        ledge5.body.immovable = true;

        ledge = this.platforms.create(0, 3* 190, 'ground');
        ledge.scale.setTo(2, 1);
        ledge.body.immovable = true;*/
        //var ledge = this.platforms.create(-0, 400, 'ground');
        //ledge.scale.setTo(2, 1);
        //ledge.body.immovable = true;
        //Door Placement
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
        ledge13.body.immovable = true;
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
        //this.setFloor = this.game.add.group();
        //this.setFloor.enableBody = false;
        //var f = this.setFloor.create(100, 100, 'set1Floor');
        //f.scale.setTo(1, 2);
        //f.body.immovable = true;
        //this.c = this.game.add.sprite(100,515, 'invisible');
        //this.game.physics.arcade.enable(this.c);
        //this.c.body.immovable = true;
        //this.c2 = this.game.add.sprite(814, 515, 'invisible');
        //this.game.physics.arcade.enable(this.c2);
        //this.c2.body.immovable = true;
        //this.leftPlatforms = this.game.add.group();
        //this.leftPlatforms.enableBody = true;
        //this.rightPlatforms = this.game.add.group();
        //this.rightPlatforms.enableBody = true;
        //this.walls = this.game.add.group();
        //this.walls.enableBody = true;
        /*this.door = this.game.add.sprite(200, 360, 'door');
        this.door.animations.add('open', [1, 2, 3], 1, true);
        this.door.animations.add('close', [3, 2, 1], 1, true);*/
        //this.game.physics.arcade.enable(this.door);
        /* for (var i = 0; i < 10; i++){
             var ledge = this.leftPlatforms.create(100, (i+1) * 180, 'platform');
             ledge.scale.setTo(1, 2);
             ledge.body.immovable = true;
         }
 
         for (var i = 0; i < 10; i++) {
             var ledge2 = this.rightPlatforms.create(600, (i+1) * 180, 'platform');
             ledge2.scale.setTo(1, 2);
             ledge2.body.immovable = true;
         }*/
        /* this.leftSideWall = this.game.add.sprite(0, 0, 'sidewall');
         this.rightSideWall = this.game.add.sprite(995, 0, 'sidewall');
         this.topWall = this.game.add.sprite(0, 0, 'topwall');
         this.game.physics.arcade.enable(this.leftSideWall);
         this.game.physics.arcade.enable(this.rightSideWall);
         this.game.physics.arcade.enable(this.topWall);
         this.leftSideWall.body.immovable = true;
         this.rightSideWall.body.immovable = true;
         this.topWall.body.immovable = true;
         this.leftSideWall.body.onCollide = new Phaser.Signal();
         this.rightSideWall.body.onCollide = new Phaser.Signal();
         this.topWall.body.onCollide = new Phaser.Signal();*/
        /*this.walls = this.game.add.sprite(100, this.game.height - 837, 'walls');
        //this.floor = this.game.add.sprite(100, this.game.height - 837, 'floor');
        this.game.physics.arcade.enable(this.walls);
        //this.game.physics.arcade.enable(this.floor);
        this.walls.body.immovable = true;
        //this.floor.body.immovable = true;*/
        //this.floor.body.collideWorldBounds = true;
        //this.walls.body.collideWorldBounds = true;
        //this.floor.body.onCollide = new Phaser.Signal();
        //this.walls.body.onCollide = new Phaser.Signal();
        //going down
        this.player = this.game.add.sprite(200, 500, 'dude');
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
    SimpleGame.prototype.enemySpawn = function () {
        this.enemies = this.game.add.group();
        this.enemies.enableBody = true;
        var enemy = this.enemies.create(this.randomIntFromInterval(100, 500), this.game.world.height - 450, 'baddie');
        //enemy.callALL('animations.add','animations','move', [0, 1, 2, 3], 10, true);
        //enemy.callALL('animations.play', 'animations', 'move'); 
    };
    SimpleGame.prototype.update = function () {
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
        //var hitFooor2 = this.game.physics.arcade.collide(this.player, this.floor2);
        //var hitFooor3 = this.game.physics.arcade.collide(this.player, this.floor3);
        //var hitFooor4 = this.game.physics.arcade.collide(this.player, this.floor4);
        //var hitFooor5 = this.game.physics.arcade.collide(this.player, this.floor5);
        //var hitFooor6 = this.game.physics.arcade.collide(this.player, this.floor6);
        //var hitFloor = this.game.physics.arcade.collide(this.player, this.c);
        //var hitFloor = this.game.physics.arcade.collide(this.player, this.c2);
        //var doorHit = this.game.physics.arcade.collide(this.doors, this.player);
        //this.game.physics.arcade.overlap(this.player, this.floor1, this.playAnimation, null, this);
        //this.game.physics.arcade.overlap(this.player, this.floor2, this.playAnimation, null, this);
        //this.game.physics.arcade.overlap(this.player, this.floor3, this.playAnimation, null, this);
        //this.game.physics.arcade.overlap(this.player, this.floor4, this.playAnimation, null, this);
        //this.game.physics.arcade.overlap(this.player, this.floor5, this.playAnimation, null, this);
        //this.game.physics.arcade.overlap(this.player, this.floor6, this.playAnimation, null, this);
        this.cursors = this.game.input.keyboard.createCursorKeys();
        //this.elevator.body.velocity.y = 50 * this.elevatorDir;
        this.player.body.velocity.x = 0;
        if (this.cursors.left.isDown) {
            this.player.body.velocity.x -= 100;
            this.player.animations.play('left');
            this.bulletDirection = false;
        }
        else if (this.cursors.right.isDown) {
            this.player.body.velocity.x += 100;
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
        this.game.physics.arcade.moveToXY(enemy, this.player.x, this.player.y, 20);
        if (this.game.physics.arcade.overlap(this.player, (this.floor1 || this.floor2 || this.floor3 || this.floor4 || this.floor5 || this.floor6 || this.floor7) && this.cursors.up.isDown)) {
            this.playAnimation(this.player, this.floor1);
        }
    };
    SimpleGame.prototype.playAnimation = function (player, door) {
        //door.animations.play('open');
        this.player.visible = false;
        this.game.time.events.add(Phaser.Timer.SECOND * 2, this.invisble, this);
        //door.animations.play('open');
        //door2.animations.play('open');
    };
    SimpleGame.prototype.invisble = function () {
        this.player.visible = true;
    };
    //playEnemyAnimation(enemy, door2) {
    //    door2.animations.play('open');
    //    //door.animations.play('open');
    //    //door2.animations.play('open');
    //}
    SimpleGame.prototype.firebullet = function (bullet) {
        if (this.game.time.now > this.bulletTime) {
            bullet = this.bullets.getFirstExists(false);
            if (bullet) {
                bullet.reset(this.player.x, this.player.y + 8);
                if (this.bulletDirection) {
                    bullet.body.velocity.x += 200;
                }
                else {
                    bullet.body.velocity.x -= 200;
                }
                this.bulletTime = this.game.time.now + 200;
            }
        }
    };
    SimpleGame.prototype.resetBullet = function (bullet) {
        bullet.kill();
    };
    SimpleGame.prototype.collisionHandler = function (enemy, bullet) {
        bullet.kill();
        enemy.kill();
        this.enemySpawn();
        this.score += 20;
        this.scoreText.text = this.scoreConst + this.score;
    };
    SimpleGame.prototype.enemyHitsPlayer = function (player, bullet) {
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
    SimpleGame.prototype.enemyFires = function () {
        var enemyBullet = this.enemyBullets.getFirstExists(false);
        var enemy = this.enemies.getFirstExists(true);
        if (enemyBullet) {
            enemyBullet.reset(enemy.body.x, enemy.body.y);
            this.game.physics.arcade.moveToObject(enemyBullet, this.player, 120);
            this.firingTimer = this.game.time.now + 2000;
        }
    };
    SimpleGame.prototype.randomIntFromInterval = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    SimpleGame.prototype.restart = function () {
        //this.lives.callAll('revive');
        this.player.revive();
        this.livesCount = 3;
        this.stateText.visible = false;
    };
    return SimpleGame;
}());
window.onload = function () {
    var game = new SimpleGame();
};
//# sourceMappingURL=app.js.map