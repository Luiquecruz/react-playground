import {useState, useEffect} from "react";
import {API_OPTIONS, BASE_URL} from "./useApiConfig.js";

const useFetchImages = (movieId) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [images, setImages] = useState({})

  const fetchImages = async (id) => {
    setIsLoading(true)

    try {
      const endpoint = `${BASE_URL}/movie/${id}/images`
      const response = await fetch(endpoint, API_OPTIONS)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(`An error occurred while images movies: ${response.statusText}`)
      }

      setImages(data ?? {})
    } catch (error) {
      console.error(`An error occurred while fetching images data: ${error}`)
      setErrorMessage('An error occurred while fetching images, please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (movieId) fetchImages(movieId)
  }, [movieId])

  return {isLoading, errorMessage, images}
}

export default useFetchImages;