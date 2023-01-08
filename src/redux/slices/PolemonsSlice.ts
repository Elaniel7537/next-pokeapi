import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getPokemon, getPokemonsDetails } from "../../services";

// interface dataPokemon {
//   id: number;
//   name: string;
//   favorite: boolean;
//   sprites: {
//     front_default: string;
//   };
//   types: [];
// }

const initialState = {
  list: { data: [] as any, loading: false },
  listFilters: [] as any,
  loading: "idle",
};

export const fetchPokemonsDetails = createAsyncThunk(
  "pokemons/getPokemonsDetails",
  async (_) => {
    const pokemonsRes = await getPokemon();
    const getPokemonsDetailed = await Promise.all(
      pokemonsRes.map((pokemon: any) => getPokemonsDetails(pokemon))
    );
    return getPokemonsDetailed;
  }
);

export const PokemonsSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    setPokemons: (state, action) => {
      state.list.data = action.payload;
    },
    setFavorite: (state, action) => {
      const indexPokemon = state.list.data.findIndex((pokemon: any) => {
        return pokemon.id === action.payload.pokemonId;
      });
      if (indexPokemon >= 0) {
        const isFavorite = state.list.data[indexPokemon].favorite;
        state.list.data[indexPokemon].favorite = !isFavorite;
      }
    },
    setFilter: (state, action) => {
      const filterSearch = state.list.data.filter((pokemon: any) =>
        pokemon.name.includes(action.payload)
      );
      state.listFilters = filterSearch;
    },
  },
  extraReducers: {
    [String(fetchPokemonsDetails.pending)]: (state) => {
      state.list.loading = true;
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    },
    [String(fetchPokemonsDetails.fulfilled)]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.list = { loading: false, data: action.payload };
      }
    },
    [String(fetchPokemonsDetails.rejected)]: (state, action) => {
      state.list.loading = false;
      if (state.loading === "pending") {
        state.loading = "idle";
      }
    },
  },
});

export const { setPokemons, setFavorite, setFilter } = PokemonsSlice.actions;

export default PokemonsSlice.reducer;
