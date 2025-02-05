import {useState, useEffect} from "react";
import {BASE_URL, API_OPTIONS} from "./useApiConfig"

const useFetchMovies = (debouncedSearchTerm, page) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [activeSearchTerm, setActiveSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);

  const fetchMovies = async (query = '') => {
    setIsLoading(true)

    try {
      const endpoint = query
        ? `${BASE_URL}/search/movie?query=${encodeURI(query)}&include_adult=true&page=${page}`
        : `${BASE_URL}/discover/movie?include_adult=true&page=${page}`

      const response = await fetch(endpoint, API_OPTIONS)

      const data = await response.json()

      if (!response.ok) {
        throw new Error(`An error occurred while fetching movies: ${response.statusText}`)
      }

      if (query !== activeSearchTerm) {
        setMovies(data.results)
        setActiveSearchTerm(query)
      } else {
        setMovies(movies.concat(data.results))
      }
    } catch (error) {
      console.error(`An error occurred while fetching movies data: ${error}`)
      setErrorMessage('An error occurred while fetching movies, please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [page, debouncedSearchTerm]);

  return { isLoading, errorMessage, movies };
}

export default useFetchMovies