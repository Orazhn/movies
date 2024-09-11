import {useEffect, useState} from 'react';




function Search(props) {

    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchValue, setSearchValue] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const [results, setResults] = useState([])

    const getMovies = async () => {
        setLoading(true);
        try {
            const res = await fetch('src/db.json');
            const data = await res.json();
            setMovies(data.results)
            setLoading(false);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getMovies()
    }, [])

    const searchHandler = (e) => {
        setSearchValue(e.target.value)
        movies.map((movie) => {
            console.log(movie);
            movie.title.toLowerCase().slice(1 ,movie.title.length) === searchValue.toLowerCase().slice(1 ,movie.title.length) && setSuggestions([ ...suggestions , movie.title])
        })
        drawSuggestion()
    }
    function drawSuggestion() {
        console.log(suggestions)
        suggestions.length > 0 &&
        setResults(<div>
                    {suggestions.map((movieName, index) => <li className='w-full h-10 pl-5 flex bg-white items-center rounded-3xl text-black' key={index}>{movieName}</li>)}
                </div>)

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
            {results}



        </div>
    )
}
export default Search;