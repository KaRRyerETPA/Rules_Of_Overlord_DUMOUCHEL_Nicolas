import Player from "../class/player.js";

export default class Bunker extends Phaser.Scene {
  constructor()
	{
		super('bunker')
	}

  preload() {
    
    this.load.spritesheet(
      "ennemi_bunker",
      "./Assets/Spritesheet/spritesheet_bunker.png",
      {
        frameWidth: 54,
        frameHeight: 58
      }
    );

    this.load.spritesheet(
      "player",
      "./Assets/Spritesheet/spritesheet_hero.png",
      {
        frameWidth: 54,
        frameHeight: 58
      }
    );

    this.load.spritesheet(
      "boss",
      "./Assets/Spritesheet/spritesheet_boss.png",
      {
        frameWidth: 54,
        frameHeight: 58
      }
    );
    
    this.load.image("dogtag", "./Assets/Assets/dogtag.png");

    this.load.image("bunker_background", "./Assets/Assets/bunker_background.png");

    this.load.image("mine", "./Assets/Assets/mine.png");

    this.load.image("Tiles", "./Assets/TiledBunker/plateforme.png");
    this.load.tilemapTiledJSON("Map", "./Assets/TiledBunker/Bunker.json");

    this.cursors = this.input.keyboard.createCursorKeys()

    this.load.audio('Sound', './Assets/Sounds/WW2_distant.ogg');
  }

  create() {
    this.dead = false;
    this.respawn = false;
    this.nextscene = false;

    this.add.image(500,300,"bunker_background").setScrollFactor(0).setDepth(1)
    //Setting the map

    
    const Map = this.make.tilemap({ key: "Boss" });
    const Tiles = Map.addTilesetImage("Tileset3", "Tuiles");

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

    this.luciole = this.physics.add.group({
      immovable: true,
      allowGravity: false
    });
    
    const ennemi_bunker1 = Map.findObject("Objects", obj => obj.name === "Dogtag 1");
    const ennemi_bunker2 = Map.findObject("Objects", obj => obj.name === "Dogtag 2");
    const ennemi_bunker3 = Map.findObject("Objects", obj => obj.name === "Dogtag 3");
    const ennemi_bunker4 = Map.findObject("Objects", obj => obj.name === "Dogtag 4");
    const ennemi_bunker5 = Map.findObject("Objects", obj => obj.name === "Dogtag 5");
    const ennemi_bunker6 = Map.findObject("Objects", obj => obj.name === "Dogtag 6");
    const ennemi_bunker7 = Map.findObject("Objects", obj => obj.name === "Dogtag 7");
    const ennemi_bunker8 = Map.findObject("Objects", obj => obj.name === "Dogtag 8");
    const ennemi_bunker9 = Map.findObject("Objects", obj => obj.name === "Dogtag 9");
    const ennemi_bunker10 = Map.findObject("Objects", obj => obj.name === "Dogtag 10");

    this.ennemi_bunkerI.create(ennemi_bunker1.x + 80, ennemi_bunker1.y - 10, 'ennemi_bunker').setDepth(0);
    this.ennemi_bunkerII.create(ennemi_bunker2.x + 80, ennemi_bunker2.y - 10, 'ennemi_bunker').setDepth(0);
    this.ennemi_bunkerIII.create(ennemi_bunker3.x + 80, ennemi_bunker3.y - 10, 'ennemi_bunker').setDepth(0);
    this.ennemi_bunkerIV.create(ennemi_bunker4.x + 80, ennemi_bunker4.y - 10, 'ennemi_bunker').setDepth(0);
    this.ennemi_bunkerV.create(ennemi_bunker5.x + 80, ennemi_bunker5.y - 10, 'ennemi_bunker').setDepth(0);
    this.ennemi_bunkerVI.create(ennemi_bunker6.x + 80, ennemi_bunker6.y - 10, 'ennemi_bunker').setDepth(0);
    this.ennemi_bunkerVII.create(ennemi_bunker7.x + 80, ennemi_bunker7.y - 10, 'ennemi_bunker').setDepth(0);
    this.ennemi_bunkerVIII.create(ennemi_bunker8.x + 80, ennemi_bunker8.y - 10, 'ennemi_bunker').setDepth(0);
    this.ennemi_bunkerIX.create(ennemi_bunker9.x + 80, ennemi_bunker9.y - 10, 'ennemi_bunker').setDepth(0);
    this.ennemi_bunkerX.create(ennemi_bunker10.x + 80, ennemi_bunker10.y - 10, 'ennemi_bunker').setDepth(0);

    this.physics.add.overlap(this.player.sprite, this.ennemi_bunkerI, this.hit, null,this);
    this.physics.add.overlap(this.player.sprite, this.ennemi_bunkerII, this.hit, null,this);
    this.physics.add.overlap(this.player.sprite, this.ennemi_bunkerIII, this.hit, null,this);
    this.physics.add.overlap(this.player.sprite, this.ennemi_bunkerIV, this.hit, null,this);
    this.physics.add.overlap(this.player.sprite, this.ennemi_bunkerV, this.hit, null,this);
    this.physics.add.overlap(this.player.sprite, this.ennemi_bunkerVI, this.hit, null,this);
    this.physics.add.overlap(this.player.sprite, this.ennemi_bunkerVII, this.hit, null,this);
    this.physics.add.overlap(this.player.sprite, this.ennemi_bunkerVIII, this.hit, null,this);
    this.physics.add.overlap(this.player.sprite, this.ennemi_bunkerIX, this.hit, null,this);
    this.physics.add.overlap(this.player.sprite, this.ennemi_bunkerX, this.hit, null,this);
   
    this.physics.add.overlap(this.player.sprite, this.ennemi_bunker, this.ScoreUp, null,this);
    
    var test = this;

    //tweens

    this.ennemi_bunkerI.children.iterate(function (child) {
			test.tweens.add({
				targets: child,
				x: child.x-172,
				duration: 3000,
        flipX : true,
				yoyo: true,
				loop: -1
			});
		})

    this.ennemi_bunkerII.children.iterate(function (child) {
			test.tweens.add({
				targets: child,
				x: child.x-172,
				duration: 3000,
        flipX : true,
				yoyo: true,
				loop: -1
			});
		})

    this.ennemi_bunkerIII.children.iterate(function (child) {
			test.tweens.add({
				targets: child,
				x: child.x-172,
				duration: 3000,
        flipX : true,
				yoyo: true,
				loop: -1
			});
		})

    this.ennemi_bunkerIV.children.iterate(function (child) {
			test.tweens.add({
				targets: child,
				x: child.x-172,
				duration: 3000,
        flipX : true,
				yoyo: true,
				loop: -1
			});
		})

    this.ennemi_bunkerV.children.iterate(function (child) {
			test.tweens.add({
				targets: child,
				x: child.x-172,
				duration: 3000,
        flipX : true,
				yoyo: true,
				loop: -1
			});
		})

    this.ennemi_bunkerVI.children.iterate(function (child) {
			test.tweens.add({
				targets: child,
				x: child.x-172,
				duration: 3000,
        flipX : true,
				yoyo: true,
				loop: -1
			});
		})

    this.ennemi_bunkerVII.children.iterate(function (child) {
			test.tweens.add({
				targets: child,
				x: child.x-172,
				duration: 3000,
        flipX : true,
				yoyo: true,
				loop: -1
			});
		})

    this.ennemi_bunkerVIII.children.iterate(function (child) {
			test.tweens.add({
				targets: child,
				x: child.x-172,
				duration: 3000,
        flipX : true,
				yoyo: true,
				loop: -1
			});
		})

    this.ennemi_bunkerIX.children.iterate(function (child) {
			test.tweens.add({
				targets: child,
				x: child.x-172,
				duration: 3000,
        flipX : true,
				yoyo: true,
				loop: -1
			});
		})

    this.ennemi_bunkerX.children.iterate(function (child) {
			test.tweens.add({
				targets: child,
				x: child.x-172,
				duration: 3000,
        flipX : true,
				yoyo: true,
				loop: -1
			});
		})

    //camera
    this.cameras.main.startFollow(this.player.sprite);
    this.cameras.main.setBounds(0, 0, Map.widthInPixels, Map.heightInPixels);

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
  //Dogtag counter
  ScoreUp(player,ennemi_bunker){
    ennemi_bunker.disableBody(true,true);
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
        this.scene.start('menu');
      
    });
    }
  }
}
