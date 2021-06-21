import Player from "../class/player.js";

export default class Herbe extends Phaser.Scene {
  constructor()
	{
		super('herbe')
	}

  preload() {
    this.load.spritesheet(
      "player",
      "./Assets/Spritesheet/spritesheet_hero.png",
      {
        frameWidth: 54,
        frameHeight: 58
      }
    );

    this.load.spritesheet(
      "ennemi_herbe",
      "./Assets/Spritesheet/spritesheet_herbe.png",
      {
        frameWidth: 54,
        frameHeight: 58
      }
    );
    
    this.load.image("dogtag", "./Assets/Assets/dogtag.png");

    this.load.image("herbe_background", "./Assets/Assets/herbe_background.png");
    this.load.image("sun", "./Assets/Assets/sun.png");
    this.load.image("sky", "./Assets/Assets/sky.png");
    this.load.image("sky_rage", "./Assets/Assets/sky_rage.png");

    this.load.image("mine", "./Assets/Assets/mine.png");
    this.load.image("herisson", "./Assets/Assets/herisson.png");

    this.load.image("Tiles", "./Assets/TiledHerbe/plateforme.png");
    this.load.tilemapTiledJSON("Map", "./Assets/TiledHerbe/Herbe.json");

    this.cursors = this.input.keyboard.createCursorKeys()

    this.load.audio('Sound', './Assets/Sounds/WW2_distant.ogg');
  }

  create() {
    this.dead = false;
    this.respawn = false;
    this.nextscene = false;

    this.add.image(500,300,"herbe_background").setScrollFactor(0).setDepth(1)
    this.add.image(500,300,"sun").setScrollFactor(0.15).setDepth(1)
    this.add.image(500,300,"sky").setScrollFactor(0.15).setDepth(1)

    const map = this.make.tilemap({ key: "map" });
    const tiles = map.addTilesetImage("Tileset2", "tiles");

    const spawnPoint = Map.findObject("Objects", obj => obj.name === "Spawn");
    this.player = new Player(this, spawnPoint.x, spawnPoint.y);

    const Trigger1 = Map.findObject("Triggers", obj => obj.name === "Trigger 1")
    const Trigger2 = Map.findObject("Triggers", obj => obj.name === "Trigger 2")
    this.CheckPoint = Map.findObject("Objects", obj => obj.name === "Checkpoint")
    const Finish = Map.findObject("Objects", obj => obj.name === "Finish")

    this.TriggerI = this.physics.add.group({allowGravity: false,immovable: true})
    this.TriggerII = this.physics.add.group({allowGravity: false,immovable: true})

    this.Trigger.create(Trigger1.x, Trigger1.y, 'Trigger').setDepth(0).setVisible(false);
    this.TriggerII.create(Trigger2.x, Trigger2.y, 'Trigger').setDepth(0).setVisible(false);

    this.physics.add.overlap(this.player.sprite, this.TriggerI, this.spawn1, null,this);
    this.physics.add.overlap(this.player.sprite, this.TriggerII, this.spawn2, null,this);


    this.checkpoint = this.physics.add.group({allowGravity: false,immovable: true})
    this.end = this.physics.add.group({allowGravity: false,immovable: true})

    this.checkpoint.create(this.CheckPoint.x, this.CheckPoint.y, 'Trigger').setDepth(0).setVisible(false);
    this.end.create(Finish.x, Finish.y, 'Trigger').setDepth(0).setVisible(false);

    this.physics.add.overlap(this.player.sprite, this.checkpoint, this.respawn, null,this);
    this.physics.add.overlap(this.player.sprite, this.end, this.finishing, null,this);

    this.groundLayer.setCollisionByProperty({ collides: true });
    this.physics.world.addCollider(this.player.sprite, this.groundLayer);

    this.ennemis = this.physics.add.group();
    this.physics.add.overlap(this.player.sprite, this.ennemis, this.hitEnnemy, null, this);

    this.ennemi_herbe = this.physics.add.group({
      immovable: true,
      allowGravity: false
    });
    //ennemis

    const ennemi_herbe1 = Map.findObject("Objects", obj => obj.name === "Dogtag 1");
    const ennemi_herbe2 = Map.findObject("Objects", obj => obj.name === "Dogtag 2");
    const ennemi_herbe3 = Map.findObject("Objects", obj => obj.name === "Dogtag 3");
    const ennemi_herbe4 = Map.findObject("Objects", obj => obj.name === "Dogtag 4");
    const ennemi_herbe5 = Map.findObject("Objects", obj => obj.name === "Dogtag 5");
    const ennemi_herbe6 = Map.findObject("Objects", obj => obj.name === "Dogtag 6");
    const ennemi_herbe7 = Map.findObject("Objects", obj => obj.name === "Dogtag 7");
    const ennemi_herbe8 = Map.findObject("Objects", obj => obj.name === "Dogtag 8");
    const ennemi_herbe9 = Map.findObject("Objects", obj => obj.name === "Dogtag 9");
    const ennemi_herbe10 = Map.findObject("Objects", obj => obj.name === "Dogtag 10");

    this.ennemi_herbeI.create(ennemi_herbe1.x + 80, ennemi_herbe1.y - 10, 'ennemi_herbe').setDepth(0);
    this.ennemi_herbeII.create(ennemi_herbe2.x + 80, ennemi_herbe2.y - 10, 'ennemi_herbe').setDepth(0);
    this.ennemi_herbeIII.create(ennemi_herbe3.x + 80, ennemi_herbe3.y - 10, 'ennemi_herbe').setDepth(0);
    this.ennemi_herbeIV.create(ennemi_herbe4.x + 80, ennemi_herbe4.y - 10, 'ennemi_herbe').setDepth(0);
    this.ennemi_herbeV.create(ennemi_herbe5.x + 80, ennemi_herbe5.y - 10, 'ennemi_herbe').setDepth(0);
    this.ennemi_herbeVI.create(ennemi_herbe6.x + 80, ennemi_herbe6.y - 10, 'ennemi_herbe').setDepth(0);
    this.ennemi_herbeVII.create(ennemi_herbe7.x + 80, ennemi_herbe7.y - 10, 'ennemi_herbe').setDepth(0);
    this.ennemi_herbeVIII.create(ennemi_herbe8.x + 80, ennemi_herbe8.y - 10, 'ennemi_herbe').setDepth(0);
    this.ennemi_herbeIX.create(ennemi_herbe9.x + 80, ennemi_herbe9.y - 10, 'ennemi_herbe').setDepth(0);
    this.ennemi_herbeX.create(ennemi_herbe10.x + 80, ennemi_herbe10.y - 10, 'ennemi_herbe').setDepth(0);

    this.physics.add.overlap(this.player.sprite, this.ennemi_herbeI, this.hit, null,this);
    this.physics.add.overlap(this.player.sprite, this.ennemi_herbeII, this.hit, null,this);
    this.physics.add.overlap(this.player.sprite, this.ennemi_herbeIII, this.hit, null,this);
    this.physics.add.overlap(this.player.sprite, this.ennemi_herbeIV, this.hit, null,this);
    this.physics.add.overlap(this.player.sprite, this.ennemi_herbeV, this.hit, null,this);
    this.physics.add.overlap(this.player.sprite, this.ennemi_herbeVI, this.hit, null,this);
    this.physics.add.overlap(this.player.sprite, this.ennemi_herbeVII, this.hit, null,this);
    this.physics.add.overlap(this.player.sprite, this.ennemi_herbeVIII, this.hit, null,this);
    this.physics.add.overlap(this.player.sprite, this.ennemi_herbeIX, this.hit, null,this);
    this.physics.add.overlap(this.player.sprite, this.ennemi_herbeX, this.hit, null,this);
   
    this.physics.add.overlap(this.player.sprite, this.ennemi_herbe, this.ScoreUp, null,this);
    
    var test = this;

    //tweens

    this.ennemi_herbeI.children.iterate(function (child) {
			test.tweens.add({
				targets: child,
				x: child.x-172,
				duration: 3000,
        flipX : true,
				yoyo: true,
				loop: -1
			});
		})

    this.ennemi_herbeII.children.iterate(function (child) {
			test.tweens.add({
				targets: child,
				x: child.x-172,
				duration: 3000,
        flipX : true,
				yoyo: true,
				loop: -1
			});
		})

    this.ennemi_herbeIII.children.iterate(function (child) {
			test.tweens.add({
				targets: child,
				x: child.x-172,
				duration: 3000,
        flipX : true,
				yoyo: true,
				loop: -1
			});
		})

    this.ennemi_herbeIV.children.iterate(function (child) {
			test.tweens.add({
				targets: child,
				x: child.x-172,
				duration: 3000,
        flipX : true,
				yoyo: true,
				loop: -1
			});
		})

    this.ennemi_herbeV.children.iterate(function (child) {
			test.tweens.add({
				targets: child,
				x: child.x-172,
				duration: 3000,
        flipX : true,
				yoyo: true,
				loop: -1
			});
		})

    this.ennemi_herbeVI.children.iterate(function (child) {
			test.tweens.add({
				targets: child,
				x: child.x-172,
				duration: 3000,
        flipX : true,
				yoyo: true,
				loop: -1
			});
		})

    this.ennemi_herbeVII.children.iterate(function (child) {
			test.tweens.add({
				targets: child,
				x: child.x-172,
				duration: 3000,
        flipX : true,
				yoyo: true,
				loop: -1
			});
		})

    this.ennemi_herbeVIII.children.iterate(function (child) {
			test.tweens.add({
				targets: child,
				x: child.x-172,
				duration: 3000,
        flipX : true,
				yoyo: true,
				loop: -1
			});
		})

    this.ennemi_herbeIX.children.iterate(function (child) {
			test.tweens.add({
				targets: child,
				x: child.x-172,
				duration: 3000,
        flipX : true,
				yoyo: true,
				loop: -1
			});
		})

    this.ennemi_herbeX.children.iterate(function (child) {
			test.tweens.add({
				targets: child,
				x: child.x-172,
				duration: 3000,
        flipX : true,
				yoyo: true,
				loop: -1
			});
		})

    this.physics.add.overlap(this.player.sprite, this.ennemi_herbe, this.ScoreUp, null,this);
  
    //Camera
    this.cameras.main.startFollow(this.player.sprite);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    //audio

    this.sound;  

    this.sound = this.sound.add('Sound')

    //dogtag counter
    this.score = 0;
    this.scoreText;

    this.scoreText = this.add.text(16, 16, "Dogtag : 0", {
        font: "18px monospace",
        fill: "#D93C1A",
        padding: { x: 20, y: 10 },
      })
      .setScrollFactor(0);
    }

    update(score, death) {
      if (this.dead) return;
  
      this.player.update();
  
        //death
        if(this.respawn){
          this.player.sprite.setPosition(this.CheckPoint.x,this.CheckPoint.y-20);
          this.dead = false;
        }
      }
      
    //Dogtag counter
    ScoreUp(player,ennemi_herbe){
      ennemi_herbe.disableBody(true,true);
      this.score += 1;
      this.scoreText.setText('Dogtag : ' + this.score);
    }
    //hit
    hit(player,ennemy){
        this.dead = true;
  
        //effect on death
        if(this.respawn){
          this.player.sprite.setPosition(this.CheckPoint.x,this.CheckPoint.y-20);
          this.dead = false;
        }
        
        else{
  
          cam.fade(250, 0, 0, 0);
  
          //Freeze
          this.player.freeze();
  
          cam.once("cameraoff", () => {
            this.sound.stop(); 
            this.player.destroy();
            this.scene.restart();
          
        });
      }
    }
    //Checkpoint
    respawn(player){
  
      this.respawn = true;
  
    }
    //End
    finishing(player){
  
      if(this.nextscene){
  
        const cam = this.cameras.main;
  
        cam.fade(250, 0, 0, 0);
  
        //Freeze
        this.player.freeze();
  
        cam.once("cameraoff", () => {
          this.dead = true;
          this.sound.stop();
          this.player.destroy();
          this.scene.start('Bunker');
        
      });
      }
    }
  }
