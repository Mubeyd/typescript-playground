type Map<T> = (data: T) => T;

type Filter<T> = (data: T) => boolean;

type Handler<T> = {
  [Prop in keyof T as `map${Capitalize<string & Prop>}`]?: Map<T[Prop]>;
} & {
  [Prop in keyof T as `filter${Capitalize<string & Prop>}`]?: Filter<T[Prop]>;
};

type ProcessedEvent<T> = {
  eventName: keyof T;
  data: T[keyof T];
};

class EventProcessorAd<T extends {}> {
  private handlers: Handler<T>[] = [];
  private processed: ProcessedEvent<T>[] = [];

  handleEvent<K extends keyof T>(eventName: K, data: T[K]): void {
    let allowEvent = true;

    const capitalize = (s: string) =>
      `${s.charAt(0).toUpperCase()}${s.slice(1)}`;

    for (const handler of this.handlers) {
      const filterFunc = handler[
        `filter${capitalize(eventName as string)}` as keyof Handler<T>
      ] as unknown as ((value: T[K]) => boolean) | undefined;
      if (filterFunc && !filterFunc(data)) {
        allowEvent = false;
        break;
      }
    }
    if (allowEvent) {
      let mappedData = { ...data };
      for (const handler of this.handlers) {
        const mapFunc = handler[
          `map${capitalize(eventName as string)}` as keyof Handler<T>
        ] as unknown as ((value: T[K]) => T[K]) | undefined;
        if (mapFunc) {
          mappedData = mapFunc(mappedData) as T[K];
        }
      }
      this.processed.push({
        eventName,
        data: mappedData,
      });
    }
  }

  addHandler(handler: Handler<T>): void {
    this.handlers.push(handler);
  }

  getProcessedEvents() {
    return this.processed;
  }
}

interface EventMap {
  login: { user?: string; name?: string; hasSession?: boolean };
  logout: { user?: string };
}

class UserEventProcessorAd extends EventProcessorAd<EventMap> {}

const uepAd = new UserEventProcessorAd();

uepAd.addHandler({
  filterLogin: ({ user }) => Boolean(user),
  mapLogin: data => ({
    ...data,
    hasSession: Boolean(data.user && data.name),
  }),
});

uepAd.handleEvent("login", {
  name: "jack",
});
uepAd.handleEvent("login", {
  user: "tom",
  name: "tomas",
});
uepAd.handleEvent("logout", {
  user: "tom",
});

console.log(uepAd.getProcessedEvents());

/*
Result:
[
  {
    eventName: 'login',
    data: { user: 'tom', name: 'tomas', hasSession: true }
  },
  { eventName: 'logout', data: { user: 'tom' } }
]
*/
