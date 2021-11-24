import { Subscribable } from "./Subscribable-class";

const sub = new Subscribable<string>();

const unSub = sub.subscribe(console.log);

// sub.publish("hello");
// sub.publish("hello2");
// unSub();
// sub.publish("hello3");

class DataClass extends Subscribable<number> {
  constructor(public value: number) {
    super();
  }

  setValue(v: number) {
    this.value = v;
    this.publish(v);
  }
}

const dc = new DataClass(0);

const unSubDc = dc.subscribe((v: number) => console.log(`DC: ${v}`));
const unSubDc2 = dc.subscribe((v: number) => console.log(`DC2: ${v}`));

dc.setValue(24);
unSubDc()
unSubDc2()