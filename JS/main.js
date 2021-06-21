import Menu from "./scenes/menu.js";
import Options from "./scenes/options.js";
import Sable from "./scenes/Sable.js";
import Herbe from "./scenes/Herbe.js";
import Bunker from "./scenes/Bunker.js";


const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  parent: "game-container",
  pixelArt: true,
  backgroundColor: "#1d212d",
  scene: [Menu, Options, Sable, Herbe, Bunker],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 1000 },
      debug: false
    }
  }
};

const game = new Phaser.Game(config);