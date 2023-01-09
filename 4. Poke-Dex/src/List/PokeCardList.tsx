import styled from "@emotion/styled";
import { useEffect } from "react";
import PokeCard from "./PokeCard";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { RootState, useAppDispatch } from "../Store";
import { fetchPokemons } from "../Store/pokemonsSlice";
import { useSelector } from "react-redux";

const PokeCardList = () => {
  const dispatch = useAppDispatch();
  const { pokemons } = useSelector((state: RootState) => state.pokemons);

  const [infiniteRef] = useInfiniteScroll({
    // infinite 스크롤(무한스크롤) 을 하게 해주는 커스텀 hook
    loading: false,
    hasNextPage: pokemons.next !== "",
    onLoadMore: async () => {
      dispatch(fetchPokemons(pokemons.next));
    },
    disabled: false,
    rootMargin: "0px 0px 200px 0px",
  });

  useEffect(() => {
    dispatch(fetchPokemons());
  }, [dispatch]);

  return (
    <>
      <List>
        {pokemons.results.map((pokemon) => {
          return <PokeCard key={pokemon.name} name={pokemon.name}></PokeCard>;
        })}
      </List>
      <div ref={infiniteRef}>
        <Loading>Loading...</Loading>
      </div>
    </>
  );
};

const Loading = styled.div`
  display: flex;
  justify-content: center;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 32px 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

export default PokeCardList;
