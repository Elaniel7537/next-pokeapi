import { configureStore } from "@reduxjs/toolkit";
import PokemonsSlice from "./slices/PolemonsSlice";

export const store = configureStore({
  reducer: {
    PokemonsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
