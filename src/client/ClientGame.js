import ClientEngine from './ClientEngine';
import ClientsWorld from './ClientsWorld';

import sprites from '../configs/sprites';
import levelCfg from '../configs/world.json';
import gameObjects from '../configs/gameObjects.json';

class ClientGame {
  constructor(cfg) {
    Object.assign(this, { cfg, gameObjects, player: null });

    this.engine = this.createEngine();
    this.world = this.createWorld();
    this.initEngine();
  }

  setPlayer(player) {
    this.player = player;
  }

  createEngine() {
    return new ClientEngine(document.getElementById(this.cfg.tagId));
  }

  createWorld() {
    return new ClientsWorld(this, this.engine, levelCfg);
  }

  initEngine() {
    this.engine.loadSprites(sprites).then(() => {
      this.world.init();
      this.engine.on('render', (_, time) => {
        this.world.render(time);
      });
      this.engine.start();
      this.initKeys();
    });
  }

  movePlayer(x, y) {
    this.player.moveByCellCoord(x, y, (cell) => cell.findObjectsByType('grass').length);
  }

  moveLeft() {
    this.movePlayer(-1, 0);
  }

  moveRight() {
    this.movePlayer(1, 0);
  }

  moveUp() {
    this.movePlayer(0, -1);
  }

  moveDown() {
    this.movePlayer(0, 1);
  }

  initKeys() {
    this.engine.input.onKey({
      ArrowLeft: (keydown) => {
        if (keydown) {
          this.moveLeft();
        }
      },
      ArrowRight: (keydown) => {
        if (keydown) {
          this.moveRight();
        }
      },
      ArrowUp: (keydown) => {
        if (keydown) {
          this.moveUp();
        }
      },
      ArrowDown: (keydown) => {
        if (keydown) {
          this.moveDown();
        }
      },
    });
  }

  static init(cfg) {
    if (!ClientGame.game) {
      ClientGame.game = new ClientGame(cfg);
      console.log('Game INIT');
    }
  }
}

export default ClientGame;
