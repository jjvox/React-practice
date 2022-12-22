import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { POKEMON_IMAGE_TYPE } from "../Constents/index";

export type PokemonImageKeyType =
  typeof POKEMON_IMAGE_TYPE[keyof typeof POKEMON_IMAGE_TYPE];
// key값들의 타입을 가져 온다.

export interface ImageTypeState {
  type: PokemonImageKeyType; // image들의 타입
}

const initialState: ImageTypeState = {
  // 기본 초기 이미지 값
  type: POKEMON_IMAGE_TYPE.FRONT_DEFAULT,
};

export const imageTypeSlice = createSlice({
  name: "imageType",
  initialState,
  reducers: {
    //리듀서
    changeImageType: (state, action: PayloadAction<ImageTypeState>) => {
      //액션함수
      state.type = action.payload.type; // 전달된 action값을 state에 업데이트
    },
  },
});

export const { changeImageType } = imageTypeSlice.actions; // 액션함수

export const imageTypeReducer = imageTypeSlice.reducer; // 리듀서

//createSlice -> 초기값, 액션함수, 리듀서를 한번에 생성해줌
