import { useState } from 'react'
import useFetch from '../../Hooks/useFetch'
import useFavorites from '../../Hooks/useFavorites'

import Search from '../../components/Search'
import MovieCard from '../../components/MovieCard'
import SideBar from '../../components/SideBar'

import { Content } from '../Home/styles'
import Motions from '../../components/Samples/Motions'

const Home = () => {
  const [searchVal, setSearchVal] = useState('')

  const ENDPOINT = import.meta.env.VITE_TEST_OMDB_ENDPOINT
  const API_KEY = import.meta.env.VITE_OMDB_KEY

  const { data } = useFetch(ENDPOINT, searchVal, API_KEY)
  const { addFavorite, removeFavorite, favorites } = useFavorites()

  return (<>
    <Search value={searchVal} query={setSearchVal} />

    {/* <Motions /> */}

    <SideBar>
      <MovieCard
        movieData={favorites}
        handleFavorite={removeFavorite}
        isFavorite
      />
    </SideBar>

    <Content>
      <MovieCard
        movieData={data}
        handleFavorite={addFavorite}
        isFavorite={false}
      />
    </Content>
  </>)
}

export default Home