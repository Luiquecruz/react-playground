import {useMemo} from "react";
import PropTypes from 'prop-types'
import useFetchImages from "../hooks/useFetchImages";
import {IMG_BASE_URL} from "../hooks/useApiConfig";
import Loader from "./Loader.jsx";

const getBackdropPath = (backdrop) => `${IMG_BASE_URL}/w1280/${backdrop.file_path}`
const getPosterPath = (poster) => `${IMG_BASE_URL}/w500/${poster.file_path}`

const Gallery = ({movieId}) => {
  const {isLoading, errorMessage, images} = useFetchImages(movieId)

  const processedBackdrops = useMemo(() => (
    images?.backdrops?.map(backdrop => ({
      ...backdrop,
      url: getBackdropPath(backdrop)
    })) || []
  ), [images?.backdrops])

  const processedPosters = useMemo(() => (
    images?.posters?.map(poster => ({
      ...poster,
      url: getPosterPath(poster)
    })) || []
  ), [images?.posters])


  return (
    <>
      {isLoading && <Loader />}
      {errorMessage && <p className="error-message text-center text-red-500">{errorMessage}</p>}

      {images &&
        <ul className="text-white max-md:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {processedBackdrops.map(backdrop => (
            <img key={backdrop.file_path} src={backdrop.url} alt="backdrop"
                 loading="lazy" width="1280" height="720" className="rounded-2xl object-cover w-full h-full"/>
          ))}

          {processedPosters.map(poster => (
            <img key={poster.file_path} src={poster.url} alt="poster"
                 loading="lazy" width="500" height="750" className="rounded-2xl object-cover w-full h-full"/>
          ))}
        </ul>
      }
    </>
  )
}

Gallery.propTypes = {
  movieId: PropTypes.number
}

export default Gallery;