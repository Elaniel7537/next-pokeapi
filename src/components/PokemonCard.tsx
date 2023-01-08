import { Card } from "antd";
import { useDispatch } from "react-redux";

import StarButton from "./StarButton";
import { setFavorite } from "../redux/slices/PolemonsSlice";

const { Meta } = Card;

const PokemonCard = ({ index, name, image, types, id, favorite }: any) => {
  const dispatch = useDispatch();
  const typesString = types?.map((elem: any) => elem.type.name).join(", ");

  const handleOnFavorite = () => {
    dispatch(setFavorite({ pokemonId: id }));
  };

  return (
    <Card
      key={index}
      title={name}
      cover={<img src={image} alt={name} />}
      extra={<StarButton isFavorite={favorite} onClick={handleOnFavorite} />}
    >
      <Meta description={typesString} />
    </Card>
  );
};

export default PokemonCard;
