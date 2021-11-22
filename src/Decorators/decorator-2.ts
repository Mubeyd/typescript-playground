function g(name: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
      const fn = descriptor.value
    descriptor.value = () => fn(name);
  };
}

class C {
  @g('John')
  method(name: string) {
    console.log("method called", name);
  }
}

new C().method('Ubeyd');
