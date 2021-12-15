import * as React from 'react'
import Cookies from 'js-cookie'
import favoritesApi from 'api/favoritesApi'

const FavoritesContext = React.createContext()
const reducer = (state, action) => {
    switch (action.type) {
        case 'set_favorites':
            return { ...state, favorites: [...action.payload] }
        case 'set_is_loading':
            return { ...state, isLoading: action.payload }
        default:
            return state
    }
}

export const Provider = ({ children }) => {
    const [state, dispatch] = React.useReducer(reducer, {
        favorites: [],
        isLoading: false
    })

    const getFavorites = async () => {
        dispatch({ type: 'set_is_loading', payload: true })
        try {
            const response = await favoritesApi.get('/favorite')
            dispatch({ type: 'set_favorites', payload: [...response.data] })
            dispatch({ type: 'set_is_loading', payload: false })

        } catch (e) {
            dispatch({ type: 'set_is_loading', payload: false })
            console.log(e.response.data)
            console.log(e.name)
            console.log(e.code)
            console.log(e.message)
        }

    }

    const addFavorite = async (user) => {
        try {
            dispatch({ type: 'set_is_loading', payload: true })
            const response = await favoritesApi.post('/favorite', {
                email: user.email,
                data: JSON.stringify(user)
            })
            dispatch({ type: 'set_is_loading', payload: false })
            getFavorites()
        } catch (e) {
            console.log(e.response.data)
            console.log(e.name)
            console.log(e.code)
            console.log(e.message)
            dispatch({ type: 'set_is_loading', payload: false })
        }
    }

    const deleteFavorite = async (email) => {
        try {
            dispatch({ type: 'set_is_loading', payload: true })
            const response = await favoritesApi.delete(`/favorite?email=${email}`)
            dispatch({ type: 'set_is_loading', payload: false })
            getFavorites()
        } catch (e) {
            console.log(e.name)
            console.log(e.code)
            console.log(e.message)
            dispatch({ type: 'set_is_loading', payload: false })
        }
    }



    return <FavoritesContext.Provider
        value={{
            state,
            getFavorites,
            addFavorite,
            deleteFavorite
        }}
    >
        {children}
    </FavoritesContext.Provider>
}

export default FavoritesContext