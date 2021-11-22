const crypto = require('crypto');
const { randInt, randMax } = require('./utils');

class Terrain {
  constructor(movementCost, isWater, texture) {
    this.movementCost_ = movementCost;
    this.isWater_ = isWater;
    this.texture_ = texture;
  }

  getMovementCost() {
    return this.movementCost_;
  }

  getIsWater() {
    return this.isWater_;
  }

  getTexture() {
    return this.texture_;
  }
}

class TerrainFactory {

  static terrains_ = {};

  static create(movementCost, isWater, texture) {
    const hash = crypto.createHash('sha256')
      .update(JSON.stringify({ movementCost, isWater, texture }))
      .digest('hex');
    
    if (this.terrains[hash]) {
      return this.terrains[hash];
    }

    this.terrains[hash] = new Terrain(movementCost, isWater, texture);
    return this.terrains[hash];
  }

  static get terrains() {
    return this.terrains_;
  }
}

class World {
  tiles_ = [[]];

  constructor() {
    this.grassTerrain_ = TerrainFactory.create(1, false, 'GRASS_TEXTURE');
    this.hillTerrain_ = TerrainFactory.create(3, false, 'HILL_TEXTURE');
    this.riverTerrain_ = TerrainFactory.create(2, true, 'RIVER_TEXTURE');
  }

  generateTerrain(WIDTH, HEIGHT) {
    this.tiles_ = Array.from(Array(WIDTH), () => new Array(HEIGHT))

    for (let x = 0; x < WIDTH; x++) {
      for (let y = 0; y < HEIGHT; y++) {
        if (randInt() < 15) {
          this.tiles_[x][y] = this.hillTerrain_;
        } else {
          this.tiles_[x][y] = this.grassTerrain_;
        }
      }
    }

    const x = randMax(WIDTH);
    for (let y = 0; y < HEIGHT; y++) {
      this.tiles_[x][y] = this.riverTerrain_;
    }
  }

  getTile(x, y) {
    return this.tiles_[x][y];
  }
}

const main = () => {
  const world = new World();

  world.generateTerrain(10, 10);

  const tile = world.getTile(randMax(10), randMax(10));
 
  console.log(tile.getMovementCost());
  console.log(tile.getIsWater());
  console.log(tile.getTexture());

  // console.log(TerrainFactory.terrains);
};

main();
