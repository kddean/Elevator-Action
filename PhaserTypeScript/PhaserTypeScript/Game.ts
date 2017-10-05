module ElevatorAction {
    export class Game extends Phaser.State {
        game: Phaser.Game;

        //groups here
        platforms: Phaser.Group;
        setFloor: Phaser.Group;
        leftPlatforms: Phaser.Group;
        rightPlatforms: Phaser.Group;
        floor1Doors: Phaser.Group;
        walls: Phaser.Group;
        enemyDoors: Phaser.Group;
        elevatorSet: Phaser.Group;
        lightHeart: Phaser.Group;
        darkHeart: Phaser.Group;
        lightKey: Phaser.Group;
        darkKey: Phaser.Group;
        floor1: Phaser.Group;
        floor2: Phaser.Group;
        floor3: Phaser.Group;
        floor4: Phaser.Group;
        floor5: Phaser.Group;
        floor6: Phaser.Group;
        floor7: Phaser.Group;
        floor8: Phaser.Group;
        doors: Phaser.Group;
        leve1: Phaser.Group;
        keys: Phaser.Group;
        skeletons: Phaser.Group;
        skeletonBones: Phaser.Group;
        enemyBullets: Phaser.Group;
        lives: Phaser.Group;
        bullets: Phaser.Group;
        enemies: Phaser.Group;
        //doors: Phaser.Group;



        //sprites here
        c: Phaser.Sprite;
        c2: Phaser.Sprite;
        door: Phaser.Sprite;
        player: Phaser.Sprite;
        Princess: Phaser.Sprite;
        leftSideWall: Phaser.Sprite;
        rightSideWall: Phaser.Sprite;
        topWall: Phaser.Sprite;
        floor: Phaser.Sprite;
        elevator: Phaser.Sprite;
        elevatorT: Phaser.Sprite;
        elevatorY: Phaser.Sprite;
        elevatorX: Phaser.Sprite;
        attack: Phaser.Sprite;
        ghost: Phaser.Sprite;
        ghostDeath: Phaser.Sprite;
        playerDeath: Phaser.Sprite;
        skeletonDeath: Phaser.Sprite;
        keyAnimation: Phaser.Sprite;

        //Elevator Sprites
        elevator1: Phaser.Sprite;
        elevator2: Phaser.Sprite;
        elevator3: Phaser.Sprite;
        elevator4: Phaser.Sprite;
        elevator5: Phaser.Sprite;
        elevator6: Phaser.Sprite;
        elevator7: Phaser.Sprite;
        elevator8: Phaser.Sprite;
        elevator9: Phaser.Sprite;
        elevator10: Phaser.Sprite;
        elevator11: Phaser.Sprite;
        elevator12: Phaser.Sprite;
        elevator13: Phaser.Sprite;
        elevator14: Phaser.Sprite;
        elevator15: Phaser.Sprite;
        elevator16: Phaser.Sprite;
        elevator17: Phaser.Sprite;
        elevator18: Phaser.Sprite;
        elevator19: Phaser.Sprite;
        elevator20: Phaser.Sprite;
        elevator21: Phaser.Sprite;
        elevator22: Phaser.Sprite;
        elevator23: Phaser.Sprite;
        elevator24: Phaser.Sprite;
        elevator25: Phaser.Sprite;
        elevator26: Phaser.Sprite;
        elevator27: Phaser.Sprite;



        //audio here
        music: Phaser.Sound;
        doorMusic: Phaser.Sound;
        princessRunMusic: Phaser.Sound;
        ghostAttackMusic: Phaser.Sound;
        skeletonAttackMusic: Phaser.Sound;



        //misc here
        timer: Phaser.Timer;
        score: number;
        elevatorDir: number = 1;
        isOnElevator: boolean = false;
        bulletTime: number;
        bulletDirection: boolean;
        scoreConst: string;
        ghostFiringTimer: number;
        skeletonFirinigTimer: number;
        livesCount: number;
        numberOfEnemies: number;
        gameTime: number;
        keysCollected: number;
        playerDirection: boolean;
        livingEnemies: Phaser.ArraySet;
        stateText: Phaser.Text;
        scoreText: Phaser.Text;
        cursors: Phaser.CursorKeys;
        fireButton: Phaser.Key;

        preload() {
            //Audio
            this.game.load.audio('shoot', 'assets/shoot.wav', true);
            this.game.load.audio('doorOpen', 'assets/door_open_2.wav', true);
            this.game.load.audio('princessRun', 'assets/princess_run.wav', true);
            this.game.load.audio('ghostAttack', 'assets/ghost_attack_1.wav', true);
            this.game.load.audio('skeletonAttack', 'assets/skeleton_attack_1.wav', true);

            //All Images here
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
            //this.game.load.spritesheet('princess_attact', 'assets/princess_attack.png', 181, 150, 10);
            this.game.load.image('button', 'assets/button.png');
            this.game.load.image('invisible', 'assets/Invisible Box.png');
            this.game.load.image('door', 'assets/fancydoor.png');
            this.game.load.image('wall', 'assets/hanger.png');
            this.game.load.image('floor', 'assets/fancyfloor.png');
            this.game.load.image('archway', 'assets/fancyArchwalls.png');
            this.game.load.image('key', 'assets/key.png');
            this.game.load.image('floors1', 'assets/floor1.png');
            this.game.load.image('floors2', 'assets/floor2.png');
            this.game.load.image('floors3', 'assets/floor3.png');
            this.game.load.image('floors4', 'assets/floor4.png');
            this.game.load.image('boblife', 'assets/bob.png');
            this.game.load.image('keyTaken', 'assets/golden_key.png');
            this.game.load.image('noKeyTaken', 'assets/golden_key_dark.png');
            this.game.load.image('life', 'assets/pink_heart.png');
            this.game.load.image('noLife', 'assets/pink_heart_dark.png');
            this.game.load.image('crystal', 'assets/crystal_adj.png');
            this.game.load.image('bone', 'assets/bone3.png');

            //All spritesheets here.
            this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
            this.game.load.spritesheet('baddie', 'assets/baddie.png', 32, 48);
            this.game.load.spritesheet('doors1', 'assets/Doors_Blue.jpg', 25, 60, 4);
            this.game.load.spritesheet('doors2', 'assets/Doors_Red.jpg', 25, 75, 4);
            this.game.load.spritesheet('princess', 'assets/f_princess_all_smaller2.png', 110, 150);
            this.game.load.spritesheet('princess_death', 'assets/princess_death.png', 181, 150);
            this.game.load.spritesheet('ghost_death_anim', 'assets/mrghost_death.png', 181, 150);
            this.game.load.spritesheet('skeleton_death_anim', 'assets/mrskeleton_death.png', 181, 150);
            this.game.load.spritesheet('ghost', 'assets/mrghost.png', 181, 150);
            this.game.load.spritesheet('skeleton', 'assets/mr_skeleton_walk.png', 181, 150);
            this.game.load.spritesheet('crystalAnim', 'assets/crystal_adj_anim.png', 60, 150);
            this.game.load.spritesheet('boneAnim', 'assets/bone.png', 37, 150);
            this.game.load.spritesheet('keyShining', 'assets/key_animation_whole.png', 109, 216);
            //this.game.load.spritesheet('princess_attact', 'assets/princess_attack.png', 181, 150, 10);
            this.game.load.image('boblife', 'assets/bobnewlife.png');
        }

        create() {
            this.keysCollected = 0;
            this.game.camera.follow(this.player);
            this.game.world.resize(800, 1000);
            this.bulletTime = 0;
            this.score = 0;
            this.livesCount = 5;
            this.ghostFiringTimer = 0;
            this.skeletonFirinigTimer = 0;
            this.numberOfEnemies = 1;
            this.gameTime = 50;
            this.scoreConst = "Score :";
            this.game.stage.backgroundColor = "#000000;"
            this.game.world.setBounds(0, 0, 1890, 5400);
            this.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            
            this.game.physics.startSystem(Phaser.Physics.ARCADE);


            //all the music here
            this.music = this.add.audio('shoot', 1, false);
            this.doorMusic = this.add.audio('doorOpen', 1, false);
            this.skeletonAttackMusic = this.add.audio('skeletonAttack', 1, false);
            this.ghostAttackMusic = this.add.audio('ghostAttack', 1, false);
            this.princessRunMusic = this.add.audio('princessRun', 1, false);




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

            //initializing lifes and keys.
            this.lightHeart = this.game.add.group();
            this.darkHeart = this.game.add.group();
            this.lightKey = this.game.add.group();
            this.darkKey = this.game.add.group();



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
                    if ((j<3) || (j>3 && j<8) || (j==9) ) {
                        t = this.leve1.create(j * 192, y, 'floor');
                        t.body.immovable = true;

                    }
                }
                y = y + 216;

            for (var j = 0; j < 10; j++) {
                if ((j>0 && j<3) || (j>3 && j<7) || (j>7)) {
                    t = this.leve1.create(j * 192, y, 'floor');
                    t.body.immovable = true;
                }
            }
            y = y + 216;

            
                for (var j = 0; j < 10; j++) {
                    if ((j>0 && j<3) || (j==4) || (j>7)) {
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
                if ((j >= 0 && j < 3) || (j>3 && j<6) || (j > 7)) {
                    t = this.leve1.create(j * 192, y, 'floor');
                    t.body.immovable = true;
                }
            }
            y = y + 216;

            
                for (var j = 0; j < 10; j++) {
                    if ((j >= 0 && j<2) || (j==5) || (j>6 && j<9)) {
                        t = this.leve1.create(j * 192, y, 'floor');
                        t.body.immovable = true;
                    }
                }
                y = y + 216;

                for (var j = 0; j < 10; j++) {
                    if ((j >= 0 && j < 2) || (j>2 && j<6) || (j > 6)) {
                        t = this.leve1.create(j * 192, y, 'floor');
                        t.body.immovable = true;
                    }
                }
                y = y + 216;

            for (var j = 0; j < 10; j++) {
                if ((j < 2) || ((j > 2) && (j < 7)) || (j == 9)){
                    t = this.leve1.create(j * 192, y, 'floor');
                    t.body.immovable = true;
                }
            }
            y = y + 216;

            for (var j = 0; j < 10; j++) {
                if ((j < 2) || (j > 2 && j < 5) || (j == 6) || (j==9)){
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
                if ((j==2) || (j==7)) {
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
                if ((j>1 && j<8)) {
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
            var k = this.keys.create(1280, 300, 'key');
            var k = this.keys.create(210, 732, 'key');
            var k = this.keys.create(50, 2028, 'key');
            var k = this.keys.create(700, 2028, 'key');
            var k = this.keys.create(1750, 2028, 'key');
            var k = this.keys.create(1000, 2676, 'key');
            var k = this.keys.create(1350, 3540, 'key');
            var k = this.keys.create(600, 3756, 'key');
            var k = this.keys.create(1750, 3756, 'key');


            //New Elevators
            var plus = 1;
            var g = 4632;



            this.elevator1 = this.game.add.sprite(384+20, 216, 'elevator');
            this.game.physics.arcade.enable(this.elevator1);
            this.elevator1.body.enableBody = true;
            this.elevator1.body.collideWorldBounds = true;
            this.elevator1.body.velocity.setTo(0, 100);
            this.elevator1.body.bounce.set(1);
            this.elevator1.body.immovable = false;
            this.elevator1.body.onCollide = new Phaser.Signal();

            this.elevator2 = this.game.add.sprite(1728+20, 216, 'elevator');
            this.game.physics.arcade.enable(this.elevator2);
            this.elevator2.body.enableBody = true;
            this.elevator2.body.collideWorldBounds = true;
            this.elevator2.body.velocity.setTo(0, 100);
            this.elevator2.body.bounce.set(1);
            this.elevator2.body.immovable = true;
            this.elevator2.body.onCollide = new Phaser.Signal();

            this.elevator3 = this.game.add.sprite(768+20, 432, 'elevator');
            this.game.physics.arcade.enable(this.elevator3);
            this.elevator3.body.enableBody = true;
            this.elevator3.body.collideWorldBounds = true;
            this.elevator3.body.velocity.setTo(0, 100);
            this.elevator3.body.bounce.set(1);
            this.elevator3.body.immovable = true;
            this.elevator3.body.onCollide = new Phaser.Signal();

            this.elevator4 = this.game.add.sprite(1152+20, 432, 'elevator');
            this.game.physics.arcade.enable(this.elevator4);
            this.elevator4.body.enableBody = true;
            this.elevator4.body.collideWorldBounds = true;
            this.elevator4.body.velocity.setTo(0, 100);
            this.elevator4.body.bounce.set(1);
            this.elevator4.body.immovable = true;
            this.elevator4.body.onCollide = new Phaser.Signal();

            this.elevator5 = this.game.add.sprite(10+20, 864, 'elevator');
            this.game.physics.arcade.enable(this.elevator5);
            this.elevator5.body.enableBody = true;
            this.elevator5.body.collideWorldBounds = true;
            this.elevator5.body.velocity.setTo(0, 100);
            this.elevator5.body.bounce.set(1);
            this.elevator5.body.immovable = true;
            this.elevator5.body.onCollide = new Phaser.Signal();

            this.elevator6 = this.game.add.sprite(1536+20, 864, 'elevator');
            this.game.physics.arcade.enable(this.elevator6);
            this.elevator6.body.enableBody = true;
            this.elevator6.body.collideWorldBounds = true;
            this.elevator6.body.velocity.setTo(0, 100);
            this.elevator6.body.bounce.set(1);
            this.elevator6.body.immovable = true;
            this.elevator6.body.onCollide = new Phaser.Signal();

            this.elevator7 = this.game.add.sprite(1152+20, 1080, 'elevator');
            this.game.physics.arcade.enable(this.elevator7);
            this.elevator7.body.enableBody = true;
            this.elevator7.body.collideWorldBounds = true;
            this.elevator7.body.velocity.setTo(0, 100);
            this.elevator7.body.bounce.set(1);
            this.elevator7.body.immovable = true;
            this.elevator7.body.onCollide = new Phaser.Signal();

            this.elevator8 = this.game.add.sprite(1344+20, 1080, 'elevator');
            this.game.physics.arcade.enable(this.elevator8);
            this.elevator8.body.enableBody = true;
            this.elevator8.body.collideWorldBounds = true;
            this.elevator8.body.velocity.setTo(0, 100);
            this.elevator8.body.bounce.set(1);
            this.elevator8.body.immovable = true;
            this.elevator8.body.onCollide = new Phaser.Signal();

            this.elevator9 = this.game.add.sprite(1920+40, 1296, 'elevator');
            this.game.physics.arcade.enable(this.elevator9);
            this.elevator9.body.enableBody = true;
            this.elevator9.body.collideWorldBounds = true;
            this.elevator9.body.velocity.setTo(0, 100);
            this.elevator9.body.bounce.set(1);
            this.elevator9.body.immovable = true;
            this.elevator9.body.onCollide = new Phaser.Signal();

            this.elevator10 = this.game.add.sprite(576+20,1728, 'elevator');
            this.game.physics.arcade.enable(this.elevator10);
            this.elevator10.body.enableBody = true;
            this.elevator10.body.collideWorldBounds = true;
            this.elevator10.body.velocity.setTo(0, 100);
            this.elevator10.body.bounce.set(1);
            this.elevator10.body.immovable = true;
            this.elevator10.body.onCollide = new Phaser.Signal();

            this.elevator11 = this.game.add.sprite(960+20, 1728, 'elevator');
            this.game.physics.arcade.enable(this.elevator11);
            this.elevator11.body.enableBody = true;
            this.elevator11.body.collideWorldBounds = true;
            this.elevator11.body.velocity.setTo(0, 100);
            this.elevator11.body.bounce.set(1);
            this.elevator11.body.immovable = true;
            this.elevator11.body.onCollide = new Phaser.Signal();

            this.elevator12 = this.game.add.sprite(1536+20, 1728, 'elevator');
            this.game.physics.arcade.enable(this.elevator12);
            this.elevator12.body.enableBody = true;
            this.elevator12.body.collideWorldBounds = true;
            this.elevator12.body.velocity.setTo(0, 100);
            this.elevator12.body.bounce.set(1);
            this.elevator12.body.immovable = true;
            this.elevator12.body.onCollide = new Phaser.Signal();

            this.elevator13 = this.game.add.sprite(1920+40, 1728, 'elevator');
            this.game.physics.arcade.enable(this.elevator13);
            this.elevator13.body.enableBody = true;
            this.elevator13.body.collideWorldBounds = true;
            this.elevator13.body.velocity.setTo(0, 100);
            this.elevator13.body.bounce.set(1);
            this.elevator13.body.immovable = true;
            this.elevator13.body.onCollide = new Phaser.Signal();

            this.elevator14 = this.game.add.sprite(1536+20, 2160, 'elevator');
            this.game.physics.arcade.enable(this.elevator14);
            this.elevator14.body.enableBody = true;
            this.elevator14.body.collideWorldBounds = true;
            this.elevator14.body.velocity.setTo(0, 100);
            this.elevator14.body.bounce.set(1);
            this.elevator14.body.immovable = true;
            this.elevator14.body.onCollide = new Phaser.Signal();

            this.elevator15 = this.game.add.sprite(1728+20, 2160, 'elevator');
            this.game.physics.arcade.enable(this.elevator15);
            this.elevator15.body.enableBody = true;
            this.elevator15.body.collideWorldBounds = true;
            this.elevator15.body.velocity.setTo(0, 100);
            this.elevator15.body.bounce.set(1);
            this.elevator15.body.immovable = true;
            this.elevator15.body.onCollide = new Phaser.Signal();

            this.elevator16 = this.game.add.sprite(1152+20, 2376, 'elevator');
            this.game.physics.arcade.enable(this.elevator16);
            this.elevator16.body.enableBody = true;
            this.elevator16.body.collideWorldBounds = true;
            this.elevator16.body.velocity.setTo(0, 100);
            this.elevator16.body.bounce.set(1);
            this.elevator16.body.immovable = true;
            this.elevator16.body.onCollide = new Phaser.Signal();

            this.elevator17 = this.game.add.sprite(10+20, 2592, 'elevator');
            this.game.physics.arcade.enable(this.elevator17);
            this.elevator17.body.enableBody = true;
            this.elevator17.body.collideWorldBounds = true;
            this.elevator17.body.velocity.setTo(0, 100);
            this.elevator17.body.bounce.set(1);
            this.elevator17.body.immovable = true;
            this.elevator17.body.onCollide = new Phaser.Signal();

            this.elevator18 = this.game.add.sprite(960+20, 2592, 'elevator');
            this.game.physics.arcade.enable(this.elevator18);
            this.elevator18.body.enableBody = true;
            this.elevator18.body.collideWorldBounds = true;
            this.elevator18.body.velocity.setTo(0, 100);
            this.elevator18.body.bounce.set(1);
            this.elevator18.body.immovable = true;
            this.elevator18.body.onCollide = new Phaser.Signal();

            this.elevator19 = this.game.add.sprite(384+20, 2808, 'elevator');
            this.game.physics.arcade.enable(this.elevator19);
            this.elevator19.body.enableBody = true;
            this.elevator19.body.collideWorldBounds = true;
            this.elevator19.body.velocity.setTo(0, 100);
            this.elevator19.body.bounce.set(1);
            this.elevator19.body.immovable = true;
            this.elevator19.body.onCollide = new Phaser.Signal();

            this.elevator20 = this.game.add.sprite(1920+20, 2808, 'elevator');
            this.game.physics.arcade.enable(this.elevator20);
            this.elevator20.body.enableBody = true;
            this.elevator20.body.collideWorldBounds = true;
            this.elevator20.body.velocity.setTo(0, 100);
            this.elevator20.body.bounce.set(1);
            this.elevator20.body.immovable = true;
            this.elevator20.body.onCollide = new Phaser.Signal();

            this.elevator21 = this.game.add.sprite(768+20, 3024, 'elevator');
            this.game.physics.arcade.enable(this.elevator21);
            this.elevator21.body.enableBody = true;
            this.elevator21.body.collideWorldBounds = true;
            this.elevator21.body.velocity.setTo(0, 100);
            this.elevator21.body.bounce.set(1);
            this.elevator21.body.immovable = true;
            this.elevator21.body.onCollide = new Phaser.Signal();

            this.elevator22 = this.game.add.sprite(1152+20, 3024, 'elevator');
            this.game.physics.arcade.enable(this.elevator22);
            this.elevator22.body.enableBody = true;
            this.elevator22.body.collideWorldBounds = true;
            this.elevator22.body.velocity.setTo(0, 100);
            this.elevator22.body.bounce.set(1);
            this.elevator22.body.immovable = true;
            this.elevator22.body.onCollide = new Phaser.Signal();

            this.elevator23 = this.game.add.sprite(1536+20, 3240, 'elevator');
            this.game.physics.arcade.enable(this.elevator23);
            this.elevator23.body.enableBody = true;
            this.elevator23.body.collideWorldBounds = true;
            this.elevator23.body.velocity.setTo(0, 100);
            this.elevator23.body.bounce.set(1);
            this.elevator23.body.immovable = true;
            this.elevator23.body.onCollide = new Phaser.Signal();

            this.elevator24 = this.game.add.sprite(1152+20, 3672, 'elevator');
            this.game.physics.arcade.enable(this.elevator24);
            this.elevator24.body.enableBody = true;
            this.elevator24.body.collideWorldBounds = true;
            this.elevator24.body.velocity.setTo(0, 100);
            this.elevator24.body.bounce.set(1);
            this.elevator24.body.immovable = true;
            this.elevator24.body.onCollide = new Phaser.Signal();

            this.elevator25 = this.game.add.sprite(10+20, 3984, 'elevator');
            this.game.physics.arcade.enable(this.elevator25);
            this.elevator25.body.enableBody = true;
            this.elevator25.body.collideWorldBounds = true;
            this.elevator25.body.velocity.setTo(0, 100);
            this.elevator25.body.bounce.set(1);
            this.elevator25.body.immovable = true;
            this.elevator25.body.onCollide = new Phaser.Signal();

            this.elevator26 = this.game.add.sprite(576+20, 4416, 'elevator');
            this.game.physics.arcade.enable(this.elevator26);
            this.elevator26.body.enableBody = true;
            this.elevator26.body.collideWorldBounds = true;
            this.elevator26.body.velocity.setTo(0, 100);
            this.elevator26.body.bounce.set(1);
            this.elevator26.body.immovable = true;
            this.elevator26.body.onCollide = new Phaser.Signal();

            this.elevator27 = this.game.add.sprite(1728+20, 4416, 'elevator');
            this.game.physics.arcade.enable(this.elevator27);
            this.elevator27.body.enableBody = true;
            this.elevator27.body.collideWorldBounds = true;
            this.elevator27.body.velocity.setTo(0, 100);
            this.elevator27.body.bounce.set(1);
            this.elevator27.body.immovable = true;
            this.elevator27.body.onCollide = new Phaser.Signal();
            
            
            




            //going down
            this.player = this.game.add.sprite(this.game.width / 2, 0, 'princess');
            //going up
            //this.player = this.game.add.sprite(100, 1700, 'dude');
            //this.door = this.game.add.sprite(this.game.world.width / 2, this.game.world.height - 475, 'doors1');

            this.game.physics.arcade.enable(this.player);
            this.player.body.bounce.y = 0.2;
            this.player.body.gravity.y = 9000; //9000
            this.player.body.collideWorldBounds = true;
            this.player.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 0, true);
            this.player.animations.add('right', [26, 27, 28, 29, 30, 31, 32, 33, 34, 35], 0, true);
            this.player.animations.add('leftidle', [10, 11, 12, 13, 14, 15, 16, 17], 0, true);
            this.player.animations.add('rightidle', [18, 19, 20, 21, 22, 23, 24, 25], 0, true);
            this.player.animations.currentAnim.speed = 10;
            //this.player.animations.add('shootShield', [28, 29, 30, 31, 32, 33, 34, 35, 36, 37], 0, true);
            


            //All Animations here

            //PlayerDeath
            this.playerDeath = this.game.add.sprite(this.player.x, this.player.y, 'princess_death');
            this.game.physics.arcade.enable(this.playerDeath);
            this.playerDeath.visible = false;
            this.playerDeath.animations.add('dead', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18], 0, true);

            ////Ghost Death
            this.ghostDeath = this.game.add.sprite(0, 0, 'ghost_death_anim');
            this.game.physics.arcade.enable(this.ghostDeath);
            this.ghostDeath.visible = false;
            this.ghostDeath.animations.add('death_ghost', [0, 1, 2, 3, 4, 5, 6, 7], 0, true);

            ////Skeleton Death.
            this.skeletonDeath = this.game.add.sprite(0, 0, 'skeleton_death_anim');
            this.game.physics.arcade.enable(this.skeletonDeath);
            this.skeletonDeath.visible = false;
            this.skeletonDeath.animations.add('death_skeleton', [0, 1, 2, 3, 4, 5, 6, 7], 0, true);

            //key shining animations.

            this.keyAnimation = this.game.add.sprite(0, 0, 'keyShining');
            this.game.physics.arcade.enable(this.keyAnimation);
            this.keyAnimation.visible = false;
            this.keyAnimation.animations.add('keyGlowing', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], 0, true);


            //Animations end.


            this.doors = this.game.add.group();
            this.doors.enableBody = true;
            this.enemyDoors = this.game.add.group();
            this.enemyDoors.enableBody = true;

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
            this.scoreText = this.game.add.text(16, 16, this.scoreConst, { font: '32px Arial', fill: '#fff' })
            //Enemy things

            this.enemySpawn();
            //this.enemies.callAll('animations.add', 'animations', 'baddie', [0, 1, 2, 3], 10, true);
            //this.enemies.callAll('play', null, 'baddie');
            //this.enemies.callAll('play', 'null', 'baddie');

            //All bullets here

            //ghostBullets
            this.enemyBullets = this.game.add.group();
            this.enemyBullets.enableBody = true;
            this.enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
            this.enemyBullets.createMultiple(30, 'crystalAnim');
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

            //Skeleton Bullets
            this.skeletonBones = this.game.add.group();
            this.skeletonBones.enableBody = true;
            this.skeletonBones.physicsBodyType = Phaser.Physics.ARCADE;
            this.skeletonBones.createMultiple(30, 'boneAnim');
            this.skeletonBones.setAll('anchor.x', 0);
            this.skeletonBones.setAll('anchor.y', 0);
            this.skeletonBones.setAll('outOfBoundsKill', true);
            this.skeletonBones.setAll('checkWorldBounds', true);

            //BUllets end



            this.lives = this.game.add.group();
            this.game.add.text(this.game.world.width - 100, 10, 'Lives : ', { font: '34px Arial', fill: '#fff' });
            this.stateText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, ' ', { font: '32px Arial', fill: '#fff' });
            this.stateText.anchor.setTo(0.5, 0.5);
            this.stateText.visible = false;

            /*var button = this.game.add.button(1000, 0, 'button', this.fullscreen, this, 2, 1, 0);
            this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
            this.game.input.onDown.add(this.fullscreen, this);*/

            this.showHearts();

        }
        /* fullscreen() {
             
             if (this.game.scale.isFullScreen) {
                 this.game.scale.stopFullScreen();
             }
             else {
                 this.game.scale.startFullScreen(false);
             }*/

        enemySpawn() {

                this.enemies = this.game.add.group();
                this.enemies.enableBody = true;
            this.skeletons = this.game.add.group();
            this.skeletons.enableBody = true;
            for (var i = 0; i < 20; i++) {
                if (i % 2 == 0) {
                    var enemy = this.enemies.create(this.randomIntFromInterval(0, 1800), i * 216, 'ghost');
                    enemy.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 0, true);
                    enemy.animations.play('idle');
                    enemy.animations.currentAnim.speed = 10;
                }
                else {
                    var skeleton = this.skeletons.create(this.randomIntFromInterval(0, 1800), i * 216, 'skeleton');
                    skeleton.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 0, true);
                    skeleton.animations.play('idle');
                    skeleton.animations.currentAnim.speed = 10;
                }
            }

            //enemy.callALL('animations.add','animations','move', [0, 1, 2, 3], 10, true);
            //enemy.callALL('animations.play', 'animations', 'move'); 
        }

        update() {
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

            var bonesHits = this.game.physics.arcade.collide(this.bullets, this.skeletonBones);


            this.cursors = this.game.input.keyboard.createCursorKeys();
            //this.elevator.body.velocity.y = 50 * this.elevatorDir;
            this.player.body.velocity.x = 0;
            if (this.cursors.left.isDown) {
                this.player.body.velocity.x -= 200;
                this.player.animations.play('left');
                this.player.animations.currentAnim.speed = 10;
                this.playerDirection = false;
                this.bulletDirection = false;
                this.princessRunMusic.play();
            }
            else if (this.cursors.right.isDown) {
                this.player.body.velocity.x += 200;
                this.player.animations.play('right');
                this.player.animations.currentAnim.speed = 10;
                this.playerDirection = true;
                this.bulletDirection = true;
                this.princessRunMusic.play();
            }
            else {
                if (this.playerDirection) {
                    this.player.animations.play('rightidle');
                    this.player.animations.currentAnim.speed = 10;
                    this.bulletDirection = true;
                    this.princessRunMusic.stop();
                }
                else {
                    this.player.animations.play('leftidle');
                    this.player.animations.currentAnim.speed = 10;
                    this.bulletDirection = false;
                    this.princessRunMusic.stop();
                }
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
            if (this.game.time.now > this.ghostFiringTimer) {
                this.enemyFires();
            }
            if (this.game.time.now > this.skeletonFirinigTimer) {
                this.skeletonFires();
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
           



            if (bulletHits) {
                var bullet = this.bullets.getFirstExists(true);
                var enemyBullet = this.enemyBullets.getFirstExists(true);
                bullet.kill();
                enemyBullet.kill();
            }
            if (bonesHits) {
                var bullet = this.bullets.getFirstExists(true);
                var skeletonBone = this.skeletonBones.getFirstExists(true);
                bullet.kill();
                skeletonBone.kill();
            }
            if (this.cursors.up.isDown && this.game.physics.arcade.overlap(this.player, this.doors)) {
                this.playAnimation(this.player, this.door);
            }
            this.game.physics.arcade.overlap(this.bullets, this.enemies, this.collisionHandler, null, this);
            this.game.physics.arcade.overlap(this.bullets, this.skeletons, this.skeletonCollisionHandler, null, this);
            this.game.physics.arcade.overlap(this.enemyBullets, this.player, this.enemyHitsPlayer, null, this);
            this.game.physics.arcade.overlap(this.skeletonBones, this.player, this.skeletonHitsPlayer, null, this);
            this.game.physics.arcade.overlap(this.player, this.enemies, this.playerHitByEnemy, null, this);
            this.game.physics.arcade.overlap(this.player, this.skeletons, this.playerHitBySkeleton, null, this);
            //this.doors.game.

            var enemy = this.enemies.getFirstExists(true);

            if (this.game.physics.arcade.overlap(this.player, (this.floor1 || this.floor2 || this.floor3 || this.floor4 || this.floor5 || this.floor6 || this.floor7) && this.cursors.up.isDown)) {
                this.playAnimation(this.player, this.floor1);

            }

            // Collection/ Keys
            this.game.physics.arcade.overlap(this.player, this.keys, this.collectKeys, null, this);
            this.showHearts();
            this.showKeys();

        }


        collectKeys(player, key) {
            //key = this.keys.getFirstExists(true);
            //key.body.visible = false;
            key.kill(this);
            this.keyAnimation.x = key.body.x;
            this.keyAnimation.y = key.body.y - 100;
            this.keyAnimation.visible = true;
            this.keyAnimation.animations.play('keyGlowing', 8, false, false);
            this.keysCollected++;
            this.showKeys();
        }


        playAnimation(player, door) {
            //door.animations.play('open');
            this.doorMusic.play();
            this.player.visible = false;
            this.game.time.events.add(Phaser.Timer.SECOND * 2, this.invisble, this);

            //door.animations.play('open');
            //door2.animations.play('open');
        }
        invisble() {
            this.player.visible = true;
        }
        //playEnemyAnimation(enemy, door2) {
        //    door2.animations.play('open');

        //    //door.animations.play('open');
        //    //door2.animations.play('open');
        //}


        //Collisons and kills

        collisionHandler(enemy, bullet) {
            bullet.kill();
            enemy.kill();
            this.ghostDeath.x = enemy.body.x;
            this.ghostDeath.y = enemy.body.y;
            this.ghostDeath.visible = true;
            this.ghostDeath.animations.play('death_ghost', 7, false, false);
            this.score += 20;
            this.scoreText.text = this.scoreConst + this.score;
        }

        skeletonCollisionHandler(skeleton, bullet) {
            bullet.kill();
            skeleton.kill();
            this.skeletonDeath.x = skeleton.body.x;
            this.skeletonDeath.y = skeleton.body.y;
            this.skeletonDeath.visible = true;
            this.skeletonDeath.animations.play('death_skeleton', 7, false, false);
            this.score += 20;
            this.scoreText.text = this.scoreConst + this.score;
        }

        playerHitByEnemy(enemy, player) {
            enemy.kill();
            player.kill();
            this.ghostDeath.x = enemy.body.x;
            this.ghostDeath.y = enemy.body.y;
            this.ghostDeath.visible = true;
            this.ghostDeath.animations.play('death_ghost', 7, false, false);
            this.livesCount -= 1;
            this.showHearts();
            if (this.livesCount == 0) {
                this.playerDeath.x = this.player.x;
                this.playerDeath.y = this.player.y;
                this.playerDeath.visible = true;
                this.playerDeath.animations.play('dead', 8, false, false);
                //this.playerDeath.animations.currentAnim.speed = 8;
                this.stateText.text = "You Lose, click to restart";
                this.stateText.visible = true;
                this.game.input.onTap.addOnce(this.restart, this);
                    }
                    else {
                this.player.revive();
            }
                    }

        playerHitBySkeleton(skeleton, player) {
            skeleton.kill();
            player.kill();
            this.skeletonDeath.x = skeleton.body.x;
            this.skeletonDeath.y = skeleton.body.y;
            this.skeletonDeath.visible = true;
            this.skeletonDeath.animations.play('death_skeleton', 7, false, false);
            this.livesCount -= 1;
            this.showHearts();
            if (this.livesCount == 0) {
                this.playerDeath.x = this.player.x;
                this.playerDeath.y = this.player.y;
                this.playerDeath.visible = true;
                this.playerDeath.animations.play('dead', 8, false, false);
                //this.playerDeath.animations.currentAnim.speed = 8;
                this.stateText.text = "You Lose, click to restart";
                this.stateText.visible = true;
                this.game.input.onTap.addOnce(this.restart, this);
                }
            else {
                this.player.revive();
            }
        }

        enemyHitsPlayer(player, bullet) {
            bullet.kill();
            player.kill();
            this.livesCount -= 1;
            this.showHearts();
            if (this.livesCount == 0) {
                this.playerDeath.x = this.player.x;
                this.playerDeath.y = this.player.y;
                this.playerDeath.visible = true;
                this.playerDeath.animations.play('dead', 8, false, false);
                //this.playerDeath.animations.currentAnim.speed = 8;
                this.stateText.text = "You Lose, click to restart";
                this.stateText.visible = true;
                this.game.input.onTap.addOnce(this.restart, this);
            }
            else {
                this.player.revive();
        }

        }

        skeletonHitsPlayer(player, bone) {
            bone.kill();
            player.kill();
            this.livesCount -= 1;
            this.showHearts();
            if (this.livesCount == 0) {
                this.playerDeath.x = this.player.x;
                this.playerDeath.y = this.player.y;
                this.playerDeath.visible = true;
                this.playerDeath.animations.play('dead', 8, false, false);
                //this.playerDeath.animations.currentAnim.speed = 8;
                this.stateText.text = "You Lose, click to restart";
                this.stateText.visible = true;
                this.game.input.onTap.addOnce(this.restart, this);
            }
            else {
                this.player.revive();
            }
        }



        //All Fire mechanics

        firebullet(bullet) {
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
        }
        resetBullet(bullet) {
            bullet.kill();
        }

        enemyFires() {
            var enemyBullet = this.enemyBullets.getFirstExists(false);
            var enemy = this.enemies.getFirstExists(true);
            if (enemyBullet && enemy) {
                this.ghostAttackMusic.play();
                enemyBullet.reset(enemy.body.x + 15, enemy.body.y + 50);
                enemyBullet.animations.add('shining', [0, 1, 2, 3, 4, 5], 0, true);
                enemyBullet.animations.play('shining');
                enemyBullet.animations.currentAnim.speed = 10;
                if (this.player.x > enemy.body.x) {
                    enemyBullet.body.velocity.x += 200;
                    //this.crystalAnimation.x = enemyBullet.body.x;
                    //this.crystalAnimation.y = enemyBullet.body.y;
                    //enemyBullet.visible = false;
                    //this.crystalAnimation.visible = true;
                    //this.crystalAnimation.animations.play('crystalShining');
                }
                else {
                    enemyBullet.body.velocity.x -= 200;
                }
                this.ghostFiringTimer = this.game.time.now + 2000;
            }
        }

        skeletonFires() {
            var skeletonBone = this.skeletonBones.getFirstExists(false);
            var skeleton = this.skeletons.getFirstExists(true);
            if (skeletonBone && skeleton) {
                this.skeletonAttackMusic.play();
                skeletonBone.reset(skeleton.body.x, skeleton.body.y + 50);
                skeletonBone.animations.add('rotate', [0, 1, 2, 3], 0, true);
                skeletonBone.animations.play('rotate');
                skeletonBone.animations.currentAnim.speed = 10;
                //this.game.physics.arcade.moveToObject(enemyBullet, this.player, 120);
                if (this.player.x > skeleton.body.x) {
                    skeletonBone.body.velocity.x += 200;
                }
                else {
                    skeletonBone.body.velocity.x -= 200;
                }
                this.skeletonFirinigTimer = this.game.time.now + 1500;
            }
        }

        //UI for hearts and Keys

        showHearts() {
            this.lightHeart.removeAll();
            for (var i = 0; i < this.livesCount; i++) {
                var lHeart = this.lightHeart.create((i+1) * 50, this.game.world.camera.y + 100, 'life');
                lHeart.anchor.setTo(0.5, 0.5);
            }
        }
        showKeys() {
            this.lightKey.removeAll();
            if (this.keysCollected > 0) {
                for (var i = 0; i < this.keysCollected; i++) {
                    var lKey = this.lightKey.create((this.game.world.camera.x + 1600) + (i * 20), this.game.world.camera.y + 100, 'keyTaken');
                    lKey.anchor.setTo(0.5, 0.5);
                    lKey.scale.setTo(0.5);
            }
        }
        }

        //Places the player back in the game.

        restart() {
            //this.lives.callAll('revive');
            this.player.revive();
            this.livesCount = 3;
            this.stateText.visible = false;
            this.playerDeath.animations.stop();
            this.playerDeath.visible = false;
        }

        randomIntFromInterval(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }



        crystalAnimations() { }

    }
}