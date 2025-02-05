import {useState} from "react";
import {useDebounce} from "react-use";

import useFetchMovies from "./hooks/useFetchMovies";

import Search from "./components/Search.jsx";
import Loader from "./components/Loader.jsx";
import Movie from "./components/Movie.jsx";
import Modal from "./components/Modal.jsx";
import Gallery from "./components/Gallery.jsx";

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [page, setPage] = useState(1)
  // const [genres, setGenres] = useState({})

  const {movies, isLoading: isMoviesLoading, errorMessage: moviesErrorMessage} = useFetchMovies(debouncedSearchTerm, page)

  // const fetchGenres = async () => {
  //   setIsLoading(true)
  //
  //   try {
  //     const endpoint = `${BASE_URL}/genre/movie/list`
  //     const response = await fetch(endpoint, API_OPTIONS)
  //
  //     if (!response.ok) throw new Error(`An error occurred while genres movies: ${response.statusText}`)
  //
  //     const data = await response.json()
  //     console.log(data)
  //     setGenres(data.results || {})
  //   } catch (error) {
  //     console.error(`An error occurred while fetching genres data: ${error}`)
  //     setErrorMessage('An error occurred while fetching genres, please try again.')
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  const openModal = (movie) => {
    setSelectedMovie(movie)
    document.body.classList.add('overflow-hidden')
  }

  const closeModal = () => {
    setSelectedMovie(null)
    document.body.classList.remove('overflow-hidden')
  }

  const loadMore = () => {
    setPage((prev) => prev + 1)
  }

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm])

  return (
    <main>
      <div className="pattern"/>

      <div className="wrapper">
        <header>
          <h1>
            Find <span className="text-gradient">Movies</span> You'll enjoy Without the hassle
          </h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>

        <section className="all-movies">
          <h2 className="mt-10">All Movies</h2>

          {isMoviesLoading && <Loader />}
          {moviesErrorMessage && <p className="error-message text-center text-red-500">{moviesErrorMessage}</p>}

          <button className="fixed bottom-0 left-[50%] translate-x-[-50%] max-w-xl w-full text-white text-xl font-bold border-2 border-[#AB8BFF] bg-[#030014] px-4 py-2 rounded-lg cursor-pointer"
                  type="button" onClick={loadMore}>Load more</button>

          <ul>
            {movies.map(movie => (
              <li key={movie.id + Math.random()} className="text-white">
                <Movie data={movie} openDetails={() => openModal(movie)} />
              </li>
            ))}
          </ul>

          <Modal
            name="movie-details"
            title={selectedMovie?.title}
            isOpen={!!selectedMovie}
            onClose={() => closeModal()}
          >
            <Gallery movieId={selectedMovie?.id} />
          </Modal>
        </section>
      </div>
    </main>
  );
};

export default App;