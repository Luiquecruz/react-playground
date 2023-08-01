import { useState, useEffect, useCallback } from 'react'
import { MoviePropTypes } from '../@types'

const useFavorites = () => {
  const [favorites, setFavorites] = useState<MoviePropTypes[]>([])

  const saveMovie = useCallback((movies: MoviePropTypes[]) => {
    localStorage.setItem('favorite-items', JSON.stringify(movies))
  }, [])

  const addFavorite = useCallback((movie: MoviePropTypes) => {
    const favoriteList = [...favorites, movie]
    setFavorites(favoriteList)
    saveMovie(favoriteList)
  }, [favorites, saveMovie])

  const removeFavorite = useCallback((movie: MoviePropTypes) => {
    const favoriteList = favorites.filter((fav: MoviePropTypes) => fav.imdbID !== movie.imdbID)

    setFavorites(favoriteList)
    saveMovie(favoriteList)
  }, [favorites, saveMovie])

  useEffect(() => {
    const favoriteMovies = localStorage.getItem('favorite-items') || '[]'
    setFavorites(JSON.parse(favoriteMovies))
  }, [])

  return {
    addFavorite,
    removeFavorite,
    favorites
  }
}

export default useFavorites