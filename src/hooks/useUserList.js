import * as React from 'react'
import FavoritesContext from '../context/FavoritesContext'

export const useUserList = () => {
    const {
        state: { favorites },
        getFavorites,
        deleteFavorite,
        addFavorite
    } = React.useContext(FavoritesContext)

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

    React.useEffect(() => {
        getFavorites()
    }, [])

    const onFilterChecked = (country) => {
        const replace = { ...filterCountries }
        replace[country].isChecked = !replace[country].isChecked
        setFilterCountries({ ...replace })
    }

    const updateFavorite = (user) => {
        if (favorites.find((favorit) => favorit.email === user.email)) {
            deleteFavorite(user.email)
        } else {
            addFavorite(user)
        }
    }


    return [filterCountries, onFilterChecked, updateFavorite]



}