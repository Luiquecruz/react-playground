import { PropsWithChildren } from 'react'
import { MoviePropTypes } from "../../@types"

export interface IMovieCard {
  movieData: MoviePropTypes[]
  isFavorite?: boolean;
  handleFavorite: (movie: MoviePropTypes) => void;
}

export interface IProps extends PropsWithChildren {
  poster: string
  title: string
  year?: string | number
}