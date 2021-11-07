abstract class StreetFighter {
  constructor() {}

  move() {}
  fight() {
    console.log(`${this.name} attacks with ${this.getSpecialAttack()}`);
  }

  abstract getSpecialAttack(): string;
  abstract get name(): string;
}

class Ryu extends StreetFighter {
  getSpecialAttack() {
    return "Hadoken";
  }

  get name() {
    return "Ryu";
  }
}
class ChunLi extends StreetFighter {
  getSpecialAttack() {
    return "Lighting Kick";
  }

  get name() {
    return "ChunLi";
  }
}

const ryu = new Ryu();
const chunLi = new ChunLi();

// console.log(ryu.getSpecialAttack());

ryu.fight();
chunLi.fight();
