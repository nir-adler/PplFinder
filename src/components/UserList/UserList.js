import React, { useEffect, useState } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";
import FavoritesContext from '../../context/FavoritesContext'
import { useUserList } from '../../hooks/useUserList'


const UserList = ({ users, isLoading }) => {
  const {
    state: { favorites }
  } = React.useContext(FavoritesContext)

  const [filterCountries, onFilterChecked, updateFavorite] = useUserList()
  const [hoveredUserId, setHoveredUserId] = useState()


  const handleMouseEnter = (index) => {
    setHoveredUserId(index)
  }

  const handleMouseLeave = () => {
    setHoveredUserId()
  }

  return (
    <S.UserList>
      <S.Filters>
        {Object.keys(filterCountries).map((country) => <CheckBox
          key={country}
          value={country}
          label={filterCountries[country].name}
          onChange={onFilterChecked}
          isChecked={country.isChecked}
        />)}
      </S.Filters>
      <S.List>
        {users.filter((user) => {
          const filterValues = Object.keys(filterCountries)
            .filter((country) => filterCountries[country].isChecked)
          if (filterValues.length > 0) {
            return filterValues.includes(user.nat)
          }
          return true
        })
          .map((user, index) => {
            return (
              <S.User
                key={user.email.toString()}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <S.UserPicture src={user?.picture.large} alt="" />
                <S.UserInfo>
                  <Text size="22px" bold>
                    {user?.name.title} {user?.name.first} {user?.name.last}
                  </Text>
                  <Text size="14px">{user?.email}</Text>
                  <Text size="14px">
                    {user?.location.street.number} {user?.location.street.name}
                  </Text>
                  <Text size="14px">
                    {user?.location.city} {user?.location.country}
                  </Text>
                </S.UserInfo>
                <S.IconButtonWrapper isVisible={index === hoveredUserId || favorites.find((favorit) => favorit.email === user.email)}>
                  <IconButton
                    onClick={() => updateFavorite(user)}
                  >
                    <FavoriteIcon color="error" />
                  </IconButton>
                </S.IconButtonWrapper>
              </S.User>
            );
          })}
        {isLoading && (
          <S.SpinnerWrapper>
            <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
          </S.SpinnerWrapper>
        )}
      </S.List>
    </S.UserList>
  );
};

export default UserList;
