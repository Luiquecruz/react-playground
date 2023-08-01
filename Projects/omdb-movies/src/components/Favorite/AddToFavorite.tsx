import { AddFavoriteButton } from "./style"

const AddToFavorite = () => {
  return (
    <AddFavoriteButton type="button">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48px" height="48px">
        <path d="M16.256,3.005C13.515,3.117,12,5.09,12,5.09s-1.515-1.973-4.256-2.085C5.906,2.93,4.221,3.845,3.111,5.312 c-3.862,5.104,3.45,11.075,5.17,12.678c1.029,0.959,2.299,2.098,3.057,2.773c0.379,0.338,0.944,0.338,1.323,0 c0.758-0.675,2.028-1.814,3.057-2.773c1.72-1.603,9.033-7.574,5.17-12.678C19.779,3.845,18.094,2.93,16.256,3.005z" />
      </svg>
    </AddFavoriteButton>
  )
}

export default AddToFavorite