import { useState } from "react"

const Search = (props) => {
    const [filter, setFilter] = useState('')

    const updateFilter = (e) => {
        setFilter(e.target.value)
    }

    return (
    <div>
        <label>
            <input className='search' type='text' value={filter} onChange={updateFilter}/>
        </label>
        <button onClick={() => props.search(filter)} className='search-btn swag-btn'>Search</button>
    </div>
    )
}

export default Search