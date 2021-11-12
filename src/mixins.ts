function myLogFunction() {
  return (str: string) => {
    console.log(str);
  };
}

const myLogger = myLogFunction();
myLogger("Hello World");

function createLoggerClass() {
  return class MyLoggerClass {
    private completeLog: string = "";

    log(str: string) {
      console.log(str);
      this.completeLog += str + "\n";
    }

    dumpLog() {
      return this.completeLog;
    }
  };
}

const myLogCreator = createLoggerClass();

const myLogger2 = new myLogCreator();

myLogger2.log("from myLogger2 first line");
myLogger2.log("from myLogger2 second line");

console.log(111111111111111111111111);

console.log(myLogger2.dumpLog());

function createSimpleMemoryDatabase<T>() {
  return class SimpleMemoryDatabase {
    private db: Record<string, T> = {};

    set(id: string, value: T) {
      this.db[id] = value;
    }
    get(id: string) {
      return this.db[id];
    }
    getObject() {
      return this.db;
    }
  };
}

const StringDatabase = createSimpleMemoryDatabase<string>();

const myMSDNString1 = new StringDatabase();

myMSDNString1.set("a", "foo");
myMSDNString1.set("b", "fee");

console.log(myMSDNString1.getObject());

type Constructor<T> = new (...args: any[]) => T;

function Dumpable<
  T extends Constructor<{
    getObject(): object;
  }>
>(Base: T) {
  return class Dumpable extends Base {
    dump() {
      console.log(this.getObject());
    }
  };
}

const dumpableStringDatabase = Dumpable(StringDatabase);

const myMSDNString2 = new dumpableStringDatabase();

myMSDNString2.set("ubeyd", "Hello ubeyd");
myMSDNString2.dump()