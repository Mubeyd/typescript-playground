import { performance } from "perf_hooks";
import "reflect-metadata";

const importantMetadataKey = Symbol("important");

export function important(
  target: Object,
  propertyKey: string | symbol,
  parameterIndex: number
) {
  let existingRequiredParameters: number[] =
    Reflect.getOwnMetadata(importantMetadataKey, target, propertyKey) || [];
  existingRequiredParameters.push(parameterIndex);
  Reflect.defineMetadata(
    importantMetadataKey,
    existingRequiredParameters,
    target,
    propertyKey
  );
}

export function logTimings<T extends { new (...args: any[]): {} }>(
  constructor: T
) {
  return class extends constructor {
    __timing = [];
    printTimings() {
      console.log(this.__timing);
    }
  };
}

interface ThisWithTimings {
  __timing: unknown[];
}

export function timing() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const value = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const start = performance.now();
      const out = await value.apply(this, args);
      const end = performance.now();

      const importantParams: unknown[] = [];
      let importantParameters: number[] = Reflect.getOwnMetadata(
        importantMetadataKey,
        target,
        propertyKey
      );
      if (importantParameters) {
        for (let parameterIndex of importantParameters) {
          if (
            parameterIndex >= args.length ||
            args[parameterIndex] === undefined
          ) {
            throw new Error("Missing required argument.");
          }
          importantParams.push(args[parameterIndex]);
        }
      }

      if ((this as ThisWithTimings).__timing) {
        (this as ThisWithTimings).__timing.push({
          method: propertyKey,
          timing: end - start,
          importantParams,
        });
      } else {
        console.log(end - start);
      }
      return out;
    };
  };
}
