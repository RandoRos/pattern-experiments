class Unit {
  constructor() {
    this.x = 0;
    this.y = 0;
  }

  moveTo(x, y) {
    this.x = x;
    this.y = y;
  }
}

function Command(execute, undo) {
  this.execute = execute;
  this.undo = undo;
}

function MoveCommand(unit, x, y) {
  let xBefore, yBefore;
  return new Command(
    () => {
      xBefore = unit.x;
      yBefore = unit.y;
      unit.moveTo(x, y);
      console.log(`moving from ${xBefore},${yBefore} to ${x},${y}`);
      return [x, y];
    },
    () => {
      unit.moveTo(xBefore, yBefore);
      return [xBefore, yBefore];
    });
}

function MoveSystem() {
  const commands = [];
  let current;

  return {
    execute: (command) => {
      current = command.execute();
      commands.push(command);
    },
    undo: () => {
      console.log('undoing...');
      const command = commands.pop();
      current = command.undo();
    },
    getPos() {
      return current;
    }
  }
}

const main = () => {
  const system = new MoveSystem();
  const unit = new Unit();

  system.execute(new MoveCommand(unit, 2, 4));
  system.execute(new MoveCommand(unit, 4, 8));

  system.undo();
  system.undo();

  system.execute(new MoveCommand(unit, 6, 10));
  
  console.log('current pos', system.getPos());
}

main();