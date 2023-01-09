import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { imageTypeReducer } from "./imageTypeSlice";
import { pokemonDetailReducer } from "./pokemonDetailSlice";
import { pokemonsReducer } from "./pokemonsSlice";

// 스토어 생성
export const store = configureStore({
  reducer: {
    imageType: imageTypeReducer, // store에 리듀서 등록 (image 종류 관리)
    pokemons: pokemonsReducer, // 포켓몬 리스트 관리
    pokemonDetail: pokemonDetailReducer, // 상세내용 관리
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>(); // 스토어에 데이터를 업데이트 할때 사용할 함수
