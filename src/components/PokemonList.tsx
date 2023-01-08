import PokemonCard from "./PokemonCard";

const PokemonList = ({ pokemons }: any) => {
  return (
    <div className="PokemonList">
      {pokemons.map((pokemon: any, index: any) => {
        return (
          <PokemonCard
            key={index}
            name={pokemon?.name}
            image={pokemon?.sprites?.front_default}
            types={pokemon?.types}
            id={pokemon?.id}
            favorite={pokemon?.favorite}
          />
        );
      })}
    </div>
  );
};

PokemonList.defaultProps = {
  pokemons: Array(10).fill(""),
};

export default PokemonList;
