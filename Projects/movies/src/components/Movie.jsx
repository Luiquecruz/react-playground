import {useMemo} from "react";
import PropTypes from "prop-types";
import {IMG_BASE_URL} from "../hooks/useApiConfig";

const getPosterPath = (poster_path) => poster_path ? `${IMG_BASE_URL}/w500/${poster_path}` : './no-movie.png'
const getRating = (vote_average) => vote_average ? vote_average.toFixed(1) : 'N/A'
const getYear = (release_date) => release_date ? release_date.split('-')[0] : 'N/A'

const Movie = ({data: { poster_path, title, vote_average, release_date, original_language }, openDetails}) => {
  const posterPath = useMemo(() => getPosterPath(poster_path), [poster_path]);
  const rating = useMemo(() => getRating(vote_average), [vote_average]);
  const year = useMemo(() => getYear(release_date), [release_date]);

  return (
    <div className="movie-card" role="button" tabIndex={0} aria-label={title} onClick={openDetails}>
      <img src={posterPath} alt={title} loading="lazy" width="500" height="750" />

      <h3 className="mt-4">{title}</h3>

      <div className="content">
        <div className="rating">
          <img src="./star.svg" alt="star icon"/>
          <p>{rating}</p>
        </div>

        <span aria-hidden="true">•</span>
        <p className="lang">{original_language}</p>

        <span aria-hidden="true">•</span>
        <p className="year">{year}</p>
      </div>
    </div>
  )
}

Movie.propTypes = {
  data: PropTypes.shape({
    poster_path: PropTypes.string,
    title: PropTypes.string,
    vote_average: PropTypes.number,
    release_date: PropTypes.string,
    original_language: PropTypes.string,
  }),
  openDetails: PropTypes.func.isRequired
}

export default Movie