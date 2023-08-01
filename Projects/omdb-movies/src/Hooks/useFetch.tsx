import { useState, useEffect } from 'react'
import { MoviePropTypes } from '../@types'

const useFetch = (
  url: string,
  searchVal: string,
  key: string,
  page?: string | number
) => {
  const [data, setData] = useState<MoviePropTypes[]>([])

  const query = `${url}/?s=${searchVal}&apikey=${key}&page=${page || 1}`

  useEffect(() => {
    fetch(query)
      .then((res) => res.json())
      .then((data) => data.Search ? setData(data.Search) : null)
  }, [query])

  return { data }
}

export default useFetch