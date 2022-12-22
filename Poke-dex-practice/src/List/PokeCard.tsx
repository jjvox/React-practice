import styled from "@emotion/styled";
import { useEffect } from "react";
import { useIntersectionObserver } from "react-intersection-observer-hook"; // 화면에 보이는 부분만 네트워크 통신을 해서 가져오게 한다.  근데 한번 불러 왔던 데이터도 화면에 다시 보이게 되면 또 호출을 한다.
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PokeMarkChip from "../Common/PokeMarkChip";
import PokeNameChip from "../Common/PokeNameChip";
import { RootState, useAppDispatch } from "../Store";
import { fetchPokemonDetail } from "../Store/pokemonDetailSlice";

interface PokeCardProps {
  name: string;
}

const PokeCard = (props: PokeCardProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const imageType = useSelector((state: RootState) => state.imageType.type);
  const { pokemonDetails } = useSelector(
    (state: RootState) => state.pokemonDetail
  );
  const pokemon = pokemonDetails[props.name];

  const [ref, { entry }] = useIntersectionObserver();
  const isVisible = entry && entry.isIntersecting;

  const handleClick = () => {
    navigate(`/pokemon/${props.name}`);
  };

  useEffect(() => {
    if (!isVisible) {
      // 화면에 보이지 않는 부분은 api호출을 하지 않는다.
      return;
    }
    dispatch(fetchPokemonDetail(props.name));
  }, [props.name, isVisible, dispatch]);

  if (!pokemon) {
    // 화면이 로딩중일때 표시
    return <Item color={"#ffffff"} ref={ref}></Item>;
  }

  return (
    <Item onClick={handleClick} color={pokemon.color} ref={ref}>
      <Header>
        <PokeNameChip
          name={pokemon.koreanName}
          color={pokemon.color}
          id={pokemon.id}
        />
      </Header>
      <Body>
        <Image src={pokemon.images[imageType]} alt={`${pokemon.name} 이미지`} />
      </Body>
      <Footer>
        <PokeMarkChip />
      </Footer>
    </Item>
  );
};

const Item = styled.li<{ color: string }>`
  display: flex;
  flex-direction: column;

  padding: 8px;

  width: 250px;
  height: 300px;

  border: 1px solid #c0c0c0;
  box-shadow: 1px 1px 2px 1px #c0c0c0;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    background-color: ${(props) => props.color};
    opacity: 0.8;
    transition: background-color 0s;
  }
`;

const Header = styled.section`
  display: flex;
  margin: 8px 0;
`;

const Body = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
`;

const Image = styled.img`
  width: 160px;
  height: 160px;
`;

const Footer = styled.section`
  display: flex;
  flex-direction: row;
  margin-top: 5px;
`;

export default PokeCard;
