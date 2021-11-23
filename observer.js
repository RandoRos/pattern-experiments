const AchievementsEnum = Object.freeze({
  ACHIEVEMENT_FELL_OFF_BRIDGE: 'Your hero fell into abyss!'
});

class Observer {
  onNotify() {
    throw new Error('Not implemented');
  }
}

class Entity {
  isHero = true;
}

class Subject {
  observers = [];

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers.filter(item => item !== observer);
  }

  notify(entity, event) {
    for (const observer of this.observers) {
      observer.onNotify(entity, event);
    }
  }
}

class Achievements extends Observer {
  heroIsOnBridge = false;

  onNotify(entity, event) {
    switch(event) {
      case 'EVENT_ENTITY_FELL':
        if (entity.isHero && this.heroIsOnBridge) {
          this.unlock('ACHIEVEMENT_FELL_OFF_BRIDGE');
        }
        break;
    }
  }

  unlock(achievement) {
    console.log('Achievement unlocked: ', AchievementsEnum[achievement]);
  }
}

const subject = new Subject();
const achievements = new Achievements();
const player = new Entity();

const main = () => {
  subject.subscribe(achievements);
  setTimeout(() => {
    console.log('\"Player reach to bridge\"');
    achievements.heroIsOnBridge = true;
  }, 1000)
  setTimeout(() => {
    subject.notify(player, 'EVENT_ENTITY_FELL');
  }, 3000)
};

main();