import axios from "axios";

const remote = axios.create();

export interface PokemonListResponseType {
  count: number;
  next: string;
  results: {
    name: string;
    url: string;
  }[];
}

export const fetchPokemonsAPI = async (nextUrl?: string) => {
  const requesttUrl = nextUrl ? nextUrl : "https://pokeapi.co/api/v2/pokemon";

  const response = await remote.get<PokemonListResponseType>(requesttUrl);
  return response.data;
};

interface PokemonDetailResponseType {
  // axios로 받아온 값의 type
  id: number;
  name: string;
  types: {
    type: {
      name: string;
    };
  }[];
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    other: {
      dream_world: {
        front_default: string;
      };
      "official-artwork": {
        front_default: string;
      };
    };
  };
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
}

interface PokemonSpeciesResponseType {
  color: {
    name: string;
  };
  names: {
    name: string;
    language: {
      name: string;
    };
  }[];
}

export interface PokemonDetailInfoType {
  // axios로 받아온 값을 가공 후 반환할때 반환값의 type
  id: number;
  name: string;
  koreanName: string;
  color: string;
  types: string[];
  height: number;
  weight: number;
  images: {
    frontDefault: string;
    DreamWorldFront: string;
    officialArtworkFront: string;
  };
  baseStats: {
    name: string;
    value: number;
  }[];
}

export const fetchPokemonsDetailAPI = async (
  name: string
): Promise<PokemonDetailInfoType> => {
  const pokemonDetailUrl = `https://pokeapi.co/api/v2/pokemon/${name}`;
  const pokemonSpecieslUrl = `https://pokeapi.co/api/v2/pokemon-species/${name}`;
  const { data } = await remote.get<PokemonDetailResponseType>(
    pokemonDetailUrl
  );
  const speciesResponse = await remote.get<PokemonSpeciesResponseType>(
    pokemonSpecieslUrl
  );
  const species = speciesResponse.data;

  return {
    id: data.id,
    name: data.name,
    koreanName:
      species.names.find((item) => {
        return item.language.name === "ko";
      })?.name ?? data.name,
    color: species.color.name,
    types: data.types.map((item) => item.type.name),
    height: data.height / 10, // 미터단위
    weight: data.weight / 10, // kg 단위
    images: {
      frontDefault: data.sprites.front_default,
      DreamWorldFront: data.sprites.other.dream_world.front_default,
      officialArtworkFront:
        data.sprites.other["official-artwork"].front_default,
    },
    baseStats: data.stats.map((item) => {
      return {
        name: item.stat.name,
        value: item.base_stat,
      };
    }),
  };
};
