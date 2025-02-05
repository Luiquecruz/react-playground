import PropTypes from "prop-types";

const Search = ({searchTerm, setSearchTerm}) => {
  return (
    <div className="search">
      <div>
        <img src="./search.svg" alt="search"/>
        <label htmlFor="search" className="hidden">Search</label>
        <input type="text" id="search" placeholder="Search throught a thoulsands of movies"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}/>
      </div>
    </div>
  )
}

Search.propTypes = {
  searchTerm: PropTypes.string,
  setSearchTerm: PropTypes.func.isRequired,
}

export default Search;