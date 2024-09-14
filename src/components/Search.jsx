import {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

function Search(props) {

    const [movies, setMovies] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [filteredMovies, setFilteredMovies] = useState([])

    const getMovies = async () => {
        try {
            const res = await fetch('src/db.json');
            const data = await res.json();
            setMovies(data.results)
            setFilteredMovies(data.results)

        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getMovies()
    }, [])

    const searchHandler = (e) => {
        setSearchValue(e.target.value)
        const filteringMovies = movies.filter(movie => movie.title.toLowerCase().includes(searchValue.toLowerCase()))
        setFilteredMovies(filteringMovies)
    }


    return (
        <div className='flex flex-col w-4/5 items-center h-10'>
            <div className="rounded-3xl w-4/5 h-10 bg-white flex justify-between items-center ">
                <input
                    placeholder="Write a movie"
                    value={searchValue}
                    onChange={searchHandler}
                    className="outline-none	rounded-3xl h-full w-full pl-4 bg-white text-black"
                    type="text"
                />
                <div className="flex">
                    <button
                        onClick={() => {
                            props.setShowInput(false)
                            setSearchValue('')
                        }}
                        className="pr-4 text-black text-lg">
                        x
                    </button>
                </div>

            </div>
            <div className = 'absolute bg-gray-800 w-3/5 rounded-xl top-14'>
                {searchValue.length === 0 ?
                    <ul>
                       {movies.map(movie => <Link to = {`/popular/${movie.id}`}> <li className='text-white py-1 pl-6 border-b border-gray-600 hover:bg-gray-700 ' key={movie.id}>{movie.title}</li> </Link> )}
                    </ul>
                    :
                    <ul>
                        {filteredMovies.map(movie =><Link to = {`/popular/${movie.id}`}> <li className='text-white py-1 pl-6 border-b border-gray-600 hover:bg-gray-700' key={movie.id}>{movie.title}</li> </Link>)}
                    </ul>
                }
            </div>


        </div>
    )
}

export default Search;