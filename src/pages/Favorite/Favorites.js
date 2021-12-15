import React from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import FavoritesContext from '../../context/FavoritesContext'
import * as S from "./style";

const Favorites = () => {
  const {
    state: { favorites, isLoading },
    getFavorites
  } = React.useContext(FavoritesContext)

  React.useEffect(() => {
    getFavorites()
  }, [])

  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            Favorites
          </Text>
        </S.Header>
        <UserList users={favorites.map((favorite)=>JSON.parse(favorite.data))} isLoading={isLoading} />
      </S.Content>
    </S.Home>
  );
};

export default Favorites;
