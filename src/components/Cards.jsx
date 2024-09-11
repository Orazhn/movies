import { useEffect, useState } from 'react'
import Card from './Card.jsx'

export default function Cards(props) {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)

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

    let newMovies;
    props.isShort ? newMovies =  movies.slice(0, 3) : newMovies =  movies
    
  return (
    <>
        {loading ?
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                <h1 className='text-4xl relative'>Loading...</h1> 
            </div> :
            <section className='mt-24 flex flex-col'>
                <h1 className='text-7xl text-white text-center'>
                    Movies for You
                </h1>
                <ul className='flex mt-10 justify-evenly list-none flex-wrap'>
                    {newMovies.map((movie) => 
                        <Card
                            key={movie.id}
                            movie={movie}
                        />
                    )}
                </ul>
            </section>
        }
  </>
)}
