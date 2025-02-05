export const BASE_URL = 'https://api.themoviedb.org/3'
export const IMG_BASE_URL = 'https://image.tmdb.org/t/p'
export const API_KEY = import.meta.env.VITE_TMDB_API_TOKEN
export const API_OPTIONS = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`
  }
}
