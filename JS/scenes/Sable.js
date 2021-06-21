import Player from "../class/player.js";

export default class Sable extends Phaser.Scene {
  constructor()
	{
		super('sable')
	}

//spritesheets

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
      "ennemi_sable",
      "./Assets/Spritesheet/spritesheet_sable.png",
      {
        frameWidth: 54,
        frameHeight: 58
      }
    );

    //assets
    
    this.load.image("dogtag", "./Assets/Assets/dogtag.png");

    this.load.image("sable_background", "./Assets/Assets/sable_background.png");
    this.load.image("sun", "./Assets/Assets/sun.png");
    this.load.image("sky", "./Assets/Assets/sky.png");
    this.load.image("sky_rage", "./Assets/Assets/sky_rage.png");

    this.load.image("mine", "./Assets/Assets/mine.png");
    this.load.image("herisson", "./Assets/Assets/herisson.png");

    this.load.image("Tiles", "./Assets/TiledSable/plateforme.png");
    this.load.tilemapTiledJSON("Map", "./Assets/TiledSable/Sable.json");

    this.cursors = this.input.keyboard.createCursorKeys()

    this.load.audio('Sound', './Assets/Sounds/WW2_distant.ogg');
  }

//create

  create() {
   
    this.dead = false;
    this.respawn = false;
    this.nextscene = false;

    this.add.image(500,300,"sable_background").setScrollFactor(0).setDepth(1)
    this.add.image(500,300,"sun").setScrollFactor(0.15).setDepth(1)
    this.add.image(500,300,"sky").setScrollFactor(0.15).setDepth(1)
    
    const Map = this.make.tilemap({ key: "Map" });
    const Platform = Map.addTilesetImage("Tileset", "Tiles");
    
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

    this.ennemi_sable = this.physics.add.group({
      immovable: true,
      allowGravity: false
    });
    //ennemis

    const ennemi_sable1 = Map.findObject("Objects", obj => obj.name === "Dogtag 1");
    const ennemi_sable2 = Map.findObject("Objects", obj => obj.name === "Dogtag 2");
    const ennemi_sable3 = Map.findObject("Objects", obj => obj.name === "Dogtag 3");
    const ennemi_sable4 = Map.findObject("Objects", obj => obj.name === "Dogtag 4");
    const ennemi_sable5 = Map.findObject("Objects", obj => obj.name === "Dogtag 5");
    const ennemi_sable6 = Map.findObject("Objects", obj => obj.name === "Dogtag 6");
    const ennemi_sable7 = Map.findObject("Objects", obj => obj.name === "Dogtag 7");
    const ennemi_sable8 = Map.findObject("Objects", obj => obj.name === "Dogtag 8");
    const ennemi_sable9 = Map.findObject("Objects", obj => obj.name === "Dogtag 9");
    const ennemi_sable10 = Map.findObject("Objects", obj => obj.name === "Dogtag 10");

    this.ennemi_sableI.create(ennemi_sable1.x + 80, ennemi_sable1.y - 10, 'ennemi_sable').setDepth(0);
    this.ennemi_sableII.create(ennemi_sable2.x + 80, ennemi_sable2.y - 10, 'ennemi_sable').setDepth(0);
    this.ennemi_sableIII.create(ennemi_sable3.x + 80, ennemi_sable3.y - 10, 'ennemi_sable').setDepth(0);
    this.ennemi_sableIV.create(ennemi_sable4.x + 80, ennemi_sable4.y - 10, 'ennemi_sable').setDepth(0);
    this.ennemi_sableV.create(ennemi_sable5.x + 80, ennemi_sable5.y - 10, 'ennemi_sable').setDepth(0);
    this.ennemi_sableVI.create(ennemi_sable6.x + 80, ennemi_sable6.y - 10, 'ennemi_sable').setDepth(0);
    this.ennemi_sableVII.create(ennemi_sable7.x + 80, ennemi_sable7.y - 10, 'ennemi_sable').setDepth(0);
    this.ennemi_sableVIII.create(ennemi_sable8.x + 80, ennemi_sable8.y - 10, 'ennemi_sable').setDepth(0);
    this.ennemi_sableIX.create(ennemi_sable9.x + 80, ennemi_sable9.y - 10, 'ennemi_sable').setDepth(0);
    this.ennemi_sableX.create(ennemi_sable10.x + 80, ennemi_sable10.y - 10, 'ennemi_sable').setDepth(0);

    this.physics.add.overlap(this.player.sprite, this.ennemi_sableI, this.hit, null,this);
    this.physics.add.overlap(this.player.sprite, this.ennemi_sableII, this.hit, null,this);
    this.physics.add.overlap(this.player.sprite, this.ennemi_sableIII, this.hit, null,this);
    this.physics.add.overlap(this.player.sprite, this.ennemi_sableIV, this.hit, null,this);
    this.physics.add.overlap(this.player.sprite, this.ennemi_sableV, this.hit, null,this);
    this.physics.add.overlap(this.player.sprite, this.ennemi_sableVI, this.hit, null,this);
    this.physics.add.overlap(this.player.sprite, this.ennemi_sableVII, this.hit, null,this);
    this.physics.add.overlap(this.player.sprite, this.ennemi_sableVIII, this.hit, null,this);
    this.physics.add.overlap(this.player.sprite, this.ennemi_sableIX, this.hit, null,this);
    this.physics.add.overlap(this.player.sprite, this.ennemi_sableX, this.hit, null,this);
   
    this.physics.add.overlap(this.player.sprite, this.ennemi_sable, this.ScoreUp, null,this);
    
    var test = this;

    //tweens

    this.ennemi_sableI.children.iterate(function (child) {
			test.tweens.add({
				targets: child,
				x: child.x-172,
				duration: 3000,
        flipX : true,
				yoyo: true,
				loop: -1
			});
		})

    this.ennemi_sableII.children.iterate(function (child) {
			test.tweens.add({
				targets: child,
				x: child.x-172,
				duration: 3000,
        flipX : true,
				yoyo: true,
				loop: -1
			});
		})

    this.ennemi_sableIII.children.iterate(function (child) {
			test.tweens.add({
				targets: child,
				x: child.x-172,
				duration: 3000,
        flipX : true,
				yoyo: true,
				loop: -1
			});
		})

    this.ennemi_sableIV.children.iterate(function (child) {
			test.tweens.add({
				targets: child,
				x: child.x-172,
				duration: 3000,
        flipX : true,
				yoyo: true,
				loop: -1
			});
		})

    this.ennemi_sableV.children.iterate(function (child) {
			test.tweens.add({
				targets: child,
				x: child.x-172,
				duration: 3000,
        flipX : true,
				yoyo: true,
				loop: -1
			});
		})

    this.ennemi_sableVI.children.iterate(function (child) {
			test.tweens.add({
				targets: child,
				x: child.x-172,
				duration: 3000,
        flipX : true,
				yoyo: true,
				loop: -1
			});
		})

    this.ennemi_sableVII.children.iterate(function (child) {
			test.tweens.add({
				targets: child,
				x: child.x-172,
				duration: 3000,
        flipX : true,
				yoyo: true,
				loop: -1
			});
		})

    this.ennemi_sableVIII.children.iterate(function (child) {
			test.tweens.add({
				targets: child,
				x: child.x-172,
				duration: 3000,
        flipX : true,
				yoyo: true,
				loop: -1
			});
		})

    this.ennemi_sableIX.children.iterate(function (child) {
			test.tweens.add({
				targets: child,
				x: child.x-172,
				duration: 3000,
        flipX : true,
				yoyo: true,
				loop: -1
			});
		})

    this.ennemi_sableX.children.iterate(function (child) {
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
  ScoreUp(player,ennemi_sable){
    ennemi_sable.disableBody(true,true);
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
        this.scene.start('Herbe');
      
    });
    }
  }
}
