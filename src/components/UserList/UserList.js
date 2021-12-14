import React, { useEffect, useState } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";

const UserList = ({ users, isLoading }) => {
  const [hoveredUserId, setHoveredUserId] = useState();
  const [filterCountries, setFilterCountries] = React.useState({
    BR: {
      isChecked: false,
      name: 'Brazil'
    },
    AU: {
      isChecked: false,
      name: 'Australia'
    },
    CA: {
      isChecked: false,
      name: 'Canada'
    },
    DE: {
      isChecked: false,
      name: 'Germany'
    },
    CH: {
      isChecked: false,
      name: 'Switzerland'
    }
  })


  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };
  // console.log(users)
  // console.log(Object.keys(filterCountries))
  // console.log(filterCountries)

  const onFilterChecked = (country) => {
    const replace = { ...filterCountries }
    replace[country].isChecked = !replace[country].isChecked
    setFilterCountries({ ...replace })
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
          // console.log(filterValues)
          if (filterValues.length > 0) {
            return filterValues.includes(user.nat)
          }
          return true
        })
          .map((user, index) => {
            return (
              <S.User
                key={index}
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
                <S.IconButtonWrapper isVisible={index === hoveredUserId}>
                  <IconButton>
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
