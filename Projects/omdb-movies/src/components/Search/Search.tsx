import { IProps } from "./types"
import { SearchBox, SearchField } from './style'

const Search = (props: IProps) => {
  return (
    <SearchBox className="search-field">
      <label htmlFor="search" style={{ 'display': 'none' }}>
        search
      </label>

      <SearchField
        type="text"
        id="search"
        placeholder="Type a movie . . ."
        value={props.value}
        onChange={props.changeEvent}
      />
    </SearchBox>
  )
}

export default Search