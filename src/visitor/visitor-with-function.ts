import fetch from "node-fetch";

type JsonT<DataType> = {
    next?: string | undefined;
    results: DataType[];
}

async function visit<DataType>(
  baseUrl: string,
  visitor: (results: DataType[]) => void
) {
  let nextUrl: string | undefined = baseUrl;
  do {
    const response = await fetch(nextUrl);
    const json: JsonT<DataType> = await response.json();
    visitor(json.results);
    nextUrl = json.next;
  } while (nextUrl);
}

interface Pokemon {
  name: string;
  url: string;
}

visit<Pokemon[]>("https://pokeapi.co/api/v2/pokemon/", (results) => {
  console.log(results);
});