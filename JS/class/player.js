
export default class Player {
  constructor(scene, x, y) {
    this.scene = scene;

    const anims = scene.anims;
    anims.create({
      key: 'idle',
			frames: [ { key: 'player', frame: 5 } ],
			frameRate: 10
    });
    anims.create({
      key: "walkL",
      frames: anims.generateFrameNumbers("player", { start: 1, end: 4 }),
      frameRate: 10,
      repeat: -1
    });
    anims.create({
      key: "walkR",
      frames: anims.generateFrameNumbers("player", { start: 6, end: 9 }),
      frameRate: 10,
      repeat: -1
    });


    this.sprite = scene.physics.add
      .sprite(x, y, "player", 0)
      .setDrag(1000, 0)
      .setMaxVelocity(300, 600)
      .setSize(18, 24)
      .setOffset(7, 9);


    const { LEFT, RIGHT, UP, DOWN, Z, Q, D, S } = Phaser.Input.Keyboard.KeyCodes;
    this.keys = scene.input.keyboard.addKeys({
      left: LEFT,
      right: RIGHT,
      up: UP,
      down: DOWN,
      z: Z,
      q: Q,
      s: S,
      d: D
    });
  }

  freeze() {
    this.sprite.body.moves = false;
  }

  update() {
    const { keys, sprite } = this;
    const onGround = sprite.body.blocked.down;
    
    if (onGround && (keys.up.isDown || keys.z.isDown)) {
      sprite.setVelocityY(-500);
    }

    if (onGround) {
      if (sprite.body.velocity.x !== 0) sprite.anims.play("walkR","walkL", true);
      else sprite.anims.play("idle", true);
    } else {
      sprite.anims.stop();
      sprite.setTexture("player", 5);
    }
  }
  
  destroy() {
    this.sprite.destroy();
  }
}
