import { important, logTimings, timing } from './perfDecorators';

const delay = <T,>(time: number, data: T): Promise<T> =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve(data);
    }, time)
  );


@logTimings
class Users {

  // constructor(public timings: []){}

  @timing()
  async getUsers() {
    return await delay(1000, []);
  }

  @timing()
  async getUser(@important id: number) {
    return await delay(50, {
      id: `user:${id}`,
    });
  }
}

(async function () {
  const users = new Users();

  const user = await users.getUser(22);
  console.log(`Got ${JSON.stringify(user)}`);

  const user42 = await users.getUser(42);
  console.log(`Got ${JSON.stringify(user42)}`);

  const allUsers = await users.getUsers();
  console.log(`Got ${JSON.stringify(allUsers)}`);

  // @ts-ignore
  users?.printTimings()
})();