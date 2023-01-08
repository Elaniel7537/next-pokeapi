import { useDispatch } from "react-redux";
import { Input } from "antd";
import { setFilter } from "../redux/slices/PolemonsSlice";

const InputSearch = () => {
  const dispatch = useDispatch();

  const onSearch = (value: any) => {
    dispatch(setFilter(value));
  };

  return (
    <Input.Search
      placeholder="Buscar..."
      onSearch={onSearch}
      style={{ marginBottom: "10px" }}
    />
  );
};

export default InputSearch;
