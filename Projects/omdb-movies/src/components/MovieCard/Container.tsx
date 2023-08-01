import MovieCard from "./MovieCard"
import { AddToFavorite, RemoveFromFavorite } from '../Favorite'
import { IMovieCard } from "./types"
import { MoviePropTypes } from "../../@types"

const Container = (props: IMovieCard) => {
  return (<>
    {props.movieData.map((movie: MoviePropTypes) => (
      <MovieCard
        key={movie.imdbID}
        poster={movie.Poster === 'N/A' ? '/placeholder.png' : movie.Poster}
        title={movie.Title}
        year={movie.Year}
      >
        <div onClick={() => props.handleFavorite(movie)}>
          {props.isFavorite ? (<RemoveFromFavorite />) : (<AddToFavorite />)}
        </div>
      </MovieCard>
    ))}
  </>)
}

export default Container