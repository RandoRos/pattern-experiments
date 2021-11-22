let _dataInMemory = 0;

class Flyweight {
  constructor(make, model, processor) {
    this.make = make;
    this.model = model;
    this.processor = processor;
  }
}

class FlyweightFactory {
  static _flyweights = {};

  static get(make, model, processor) {
    if (!this._flyweights[`${make}${model}${processor}`]) {
      this._flyweights[`${make}${model}${processor}`] = new Flyweight(make, model, processor);
    }
    return this._flyweights[`${make}${model}${processor}`];
  }

  static getCount() {
    return Object.keys(this._flyweights).length;
  }
}

class ComputerFactory {
  _computers = [];
  _dataInMemory = 0;

  add(make, model, processor, tag) {
    const flw = FlyweightFactory.get(make, model, processor);
    this.tag = tag;
    this._computers.push({ make: flw.make, model: flw.model, processor: flw.processor, tag })
  }
}

const main = () => {
  const factory = new ComputerFactory();
  factory.add('Dell', '123', 'Intel', '123ABC');
  factory.add('Dell', '123', 'Intel', '123ABC');
  factory.add('Dell', '123', 'Intel', '123ABC');
  factory.add('Dell', '123', 'Intel', '123ABC');
  factory.add('Dell', '123', 'AMD', '123ABC');

  console.log(FlyweightFactory.getCount())
  console.log(factory._computers)
};

main();