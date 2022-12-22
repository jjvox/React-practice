import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import {
  fetchPokemonsDetailAPI,
  PokemonDetailInfoType,
} from "../Service/pokemonService";

// First, create the thunk
export const fetchPokemonDetail = createAsyncThunk(
  "pokemon/fetchPokemonDetail",
  async (name: string) => {
    const response = await fetchPokemonsDetailAPI(name);
    return response;
  },
  {
    condition: (name, { getState }) => {
      // 세번째 인자로 온 condition은 옵셔널 이다. // getState는 store의 상태를 거져온다.
      const { pokemonDetail } = getState() as RootState;
      const pokemon = pokemonDetail.pokemonDetails[name];
      // getState로 가져온 store의 상태에 해당 값이 이미 등록 되어 있을때 false를 반환해서 재요청을 막는다.

      return !pokemon;
      // condition의 리턴값이 false일때 위에 있는 요청을 보내지 않는다.
      // 그러므로 한번 불러 왔던 데이터를 또 불러 오는것을 막을 수 있다.
    },
  }
);

interface PokemonDetailState {
  // pokemonDetails : {
  // '이상해씨' : PokemonDetailInfoType,
  // '피카츄' : PokemonDetailInfoType
  //}

  pokemonDetails: Record<string, PokemonDetailInfoType>; // Record의 첫번째로는 key값 두번째로는 벨류값이 들어간다.
}

const initialState = {
  pokemonDetails: {},
} as PokemonDetailState;

// Then, handle actions in your reducers:
const pokemonDetailSlice = createSlice({
  name: "pokemonDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchPokemonDetail.fulfilled,
      (state, action: PayloadAction<PokemonDetailInfoType>) => {
        state.pokemonDetails = {
          ...state.pokemonDetails,
          [action.payload.name]: action.payload,
        };
      }
    );
  },
});

export const pokemonDetailReducer = pokemonDetailSlice.reducer;
