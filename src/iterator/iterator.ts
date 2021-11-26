import fetch from "node-fetch";

type JsonT<DataType> = {
  next?: string | undefined;
  results: DataType[];
};

async function* iterateResults<DataType>(url: string) {
  let nextUrl: string | undefined = url;

  do {
    const response = await fetch(nextUrl);
    const json: JsonT<DataType> = await response.json();

    yield* json.results;

    nextUrl = json.next;
  } while (nextUrl);
}

interface Pokemon {
  name: string;
  url: string;
}

(async function () {
  for await (const result of iterateResults<Pokemon>(
    "https://pokeapi.co/api/v2/pokemon/"
  )) {
    console.log("results :>> ", result);
    if (result.name === "pikachu") {
      break;
    }
  }
})();
