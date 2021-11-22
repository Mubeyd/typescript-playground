function timing(name: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const fn = descriptor.value;
    descriptor.value = (...args: any[]) => {
      console.time(name);
      const v = fn(...args);
      console.timeEnd(name);
      return v;
    };
  };
}

class Cls {
  @timing("C.method")
  method(name: string) {
    console.log("method called", name);
    for (let i = 0; i < 1000000000; i++) {}
  }
}

new Cls().method("Ubeyd");
