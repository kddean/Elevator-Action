﻿class SimpleGame {

    constructor() {
        this.game = new Phaser.Game(1000, 1000, Phaser.AUTO, 'content', { preload: this.preload, create: this.create, enemyFires: this.enemyFires, restart: this.restart, enemySpawn: this.enemySpawn, update: this.update, playAnimation: this.playAnimation, firebullet: this.firebullet, resetBullet: this.resetBullet, collisionHandler: this.collisionHandler, randomIntFromInterval: this.randomIntFromInterval, enemyHitsPlayer: this.enemyHitsPlayer });
    }

    game: Phaser.Game;
    platforms: Phaser.Group;
    floor1Doors: Phaser.Group;
    player: Phaser.Sprite;
    walls: Phaser.Sprite;
    floor: Phaser.Sprite;
    doors: Phaser.Group;
    enemyDoors: Phaser.Group;
    elevator: Phaser.Sprite;
    elevatorT: Phaser.Sprite;
    score: number;
    scoreText: Phaser.Text;
    cursors: Phaser.CursorKeys;
    elevatorDir: number = 1;
    isOnElevator: boolean = false;
    bullets : Phaser.Group;
    bulletTime: number;
    enemies: Phaser.Group;
    fireButton: Phaser.Key;
    bulletDirection: boolean;
    scoreConst: string;
    enemyBullets: Phaser.Group;
    lives: Phaser.Group;
    firingTimer: number;
    livingEnemies: Phaser.ArraySet;
    stateText: Phaser.Text;
    livesCount: number;


    preload() {
        this.game.load.image('logo', 'phaser2.png');
        this.game.load.image('sky', 'assets/sky.png');
        this.game.load.image('background', 'assets/Quick Level.png');
        this.game.load.image('walls', 'assets/QL_Wall.png');
        this.game.load.image('floor', 'assets/QL_Floor.png');
        this.game.load.image('ground', 'assets/platform.png');
        this.game.load.image('ground2', 'assets/platformShort.png');
        this.game.load.image('ground3', 'assets/platformTiny.png');
        this.game.load.image('bullet', 'assets/bullet.png');
        this.game.load.image('star', 'assets/bullet.png');
        this.game.load.image('elevator', 'assets/elevatorPro.png');
        this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
        this.game.load.spritesheet('baddie', 'assets/baddie.png', 32, 48);
        this.game.load.spritesheet('doors1', 'assets/Doors_Blue.jpg', 25, 60, 4);
        this.game.load.spritesheet('doors2', 'assets/Doors_Red.jpg', 25, 75, 4);
    }

    create() {
        this.game.world.resize(1000, 1000);
        this.bulletTime = 0;
        this.score = 0;
        this.livesCount = 3;
        this.firingTimer = 0;
        this.scoreConst = "Score :";
        this.game.stage.backgroundColor = "#000000;"
       // this.game.add.tileSprite(0, 0, 800, 600, 'background');
        this.game.world.setBounds(0, 0, 800, 600);
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

        this.walls = this.game.add.sprite(100, this.game.height - 837, 'walls');
        this.floor = this.game.add.sprite(100, this.game.height - 837, 'floor');
        this.game.physics.arcade.enable(this.walls);
        this.game.physics.arcade.enable(this.floor);
        this.walls.body.immovable = true;
        this.floor.body.immovable = true;
        
        //this.floor.body.collideWorldBounds = true;
        //this.walls.body.collideWorldBounds = true;
        this.floor.body.onCollide = new Phaser.Signal();
        this.walls.body.onCollide = new Phaser.Signal();
        this.player = this.game.add.sprite(200, 500, 'dude');
        //this.door = this.game.add.sprite(this.game.world.width / 2, this.game.world.height - 475, 'doors1');
        this.elevator = this.game.add.sprite(800, this.game.world.height - 500, 'elevator');
        this.elevatorT = this.game.add.sprite(300, this.game.world.height - 400, 'elevator');
        this.game.physics.arcade.enable(this.player);
        this.player.body.bounce.y = 0.2;
        this.player.body.gravity.y = 1000;
        this.player.body.collideWorldBounds = true;
        this.player.animations.add('left', [0, 1, 2, 3], 10, true);
        this.game.physics.arcade.enable(this.elevator);
        this.game.physics.arcade.enable(this.elevatorT);
        this.elevator.body.collideWorldBounds = true;
        this.elevator.body.velocity.setTo(0, 200);
        this.elevator.body.bounce.set(1);
        //this.elevator.body.allowGravity = false;
        this.elevator.body.immovable = true;
        this.elevator.body.onCollide = new Phaser.Signal();
        
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
        this.game.physics.arcade.enable(this.elevator);
        //this.game.physics.arcade.enable(door);
        this.elevator.body.enableBody = true;
        this.elevatorT.body.enableBody = true;
        this.player.body.collideWorldBounds = true;
        this.elevator.body.collideWorldBounds = true;
        this.elevatorT.body.collideWorldBounds = true;
        this.elevatorT.body.velocity.setTo(0, 100);
        this.elevatorT.body.bounce.set(1);
        this.elevatorT.body.immovable = true;
        this.elevatorT.body.onCollide = new Phaser.Signal();

        //if (this.isOnElevator) {
        //}
        //else {
        //    this.game.add.tween(this.elevator).to({ y: 400 }, 5000, Phaser.Easing.Linear.None, true, 0, Number.MAX_VALUE, true);
        //}
        this.scoreText = this.game.add.text(16, 16, this.scoreConst, { font: '32px Arial', fill: '#fff' })
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

    }
    enemySpawn() {
        this.enemies = this.game.add.group();
        this.enemies.enableBody = true;
        var enemy = this.enemies.create(this.randomIntFromInterval(100, 500), this.game.world.height - 450, 'baddie');
        //enemy.callALL('animations.add','animations','move', [0, 1, 2, 3], 10, true);
        //enemy.callALL('animations.play', 'animations', 'move'); 
    }

    update() {
        //var isDoorOpen = false;
        this.game.input.update();
        var hitPlatform = this.game.physics.arcade.collide(this.player, this.floor);
        var hitWall = this.game.physics.arcade.collide(this.player, this.walls);
        var hitElevator = this.game.physics.arcade.collide(this.player, this.elevator);
        var hitElevator2 = this.game.physics.arcade.collide(this.player, this.elevatorT);
        var elevatorHit = this.game.physics.arcade.collide(this.elevator, this.floor);
        var elevator2Hit = this.game.physics.arcade.collide(this.elevatorT, this.floor);
        var enemyHit = this.game.physics.arcade.collide(this.enemies, this.floor);
        var bulletHIt = this.game.physics.arcade.collide(this.bullets, this.floor);
        var enemyBulletHit = this.game.physics.arcade.collide(this.enemyBullets, this.floor);
        //var doorHit = this.game.physics.arcade.collide(this.doors, this.player);
        this.game.physics.arcade.overlap(this.player, this.doors, this.playAnimation, null, this);
        //this.game.physics.arcade.overlap(this.enemies, this.doors, this.playEnemyAnimation, null, this);
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
        if (this.cursors.up.isDown && this.player.body.touching.down && hitPlatform) {
            this.player.body.velocity.y -= 350;
        }
        if (this.cursors.up.isDown && this.player.body.touching.down && hitWall) {
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
        if (elevatorHit) {
            this.isOnElevator = true;
            this.elevator.body.immovable = false;
            
        }
        else {
            this.elevator.body.immovable = true;
            
        }
        if (elevator2Hit) {
            this.elevatorT.body.immovable = false;
        } else {
            this.elevatorT.body.immovable = true;
        }
        this.game.physics.arcade.overlap(this.bullets, this.enemies, this.collisionHandler, null, this);
        this.game.physics.arcade.overlap(this.enemyBullets, this.player, this.enemyHitsPlayer, null, this);
        //this.doors.game.

        var enemy = this.enemies.getFirstExists(true);


        this.game.physics.arcade.moveToXY(enemy, this.player.x, this.player.y, 20);
    }

    playAnimation(player, door) {
        door.animations.play('open');

        //door.animations.play('open');
        //door2.animations.play('open');
    }
    //playEnemyAnimation(enemy, door2) {
    //    door2.animations.play('open');

    //    //door.animations.play('open');
    //    //door2.animations.play('open');
    //}
    firebullet(bullet) {
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
    }
    resetBullet(bullet) {
        bullet.kill();
    }

    collisionHandler(enemy, bullet) {
        bullet.kill();
        enemy.kill();
        this.enemySpawn();
        this.score += 20;
        this.scoreText.text = this.scoreConst + this.score;
    }
    enemyHitsPlayer(player, bullet) {
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
        
    }
    enemyFires() {
        var enemyBullet = this.enemyBullets.getFirstExists(false);
        var enemy = this.enemies.getFirstExists(true);
        if (enemyBullet) {
            enemyBullet.reset(enemy.body.x, enemy.body.y);
            //this.game.physics.arcade.moveToObject(enemyBullet, this.player, 120);
            this.firingTimer = this.game.time.now + 2000;
        }
    }
    randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    restart() {
        //this.lives.callAll('revive');
        this.player.revive();
        this.livesCount = 3;
        this.stateText.visible = false;
    }


}

window.onload = () => {

    var game = new SimpleGame();

};