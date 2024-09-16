import Header from "../components/Header.jsx";
import Favorite from "../components/Favorite.jsx";
import {useEffect, useState} from "react";
import axios from "axios";

export default function FavoritesPage() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [reload, setReload] = useState(1)

  const getMovies = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/src/favorites.json');
      setMovies(res.data.favorite_movies)
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getMovies()
  }, [reload])



  return (
      <>
        <Header/>
        <div className='h-screen bg-slate-800'>
          {movies.length == 0 &&
              <div className='h-screen flex justify-center items-center'><h1 className='text-white text-5xl'>Like a
                movie to see here :)</h1></div>}
          {loading ?
              <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                <h1 className='text-4xl relative'>Loading...</h1>
              </div> :
              <div className='list-none flex flex-col gap-10 pt-20 bg-slate-800'>
                {movies.map((movie) => <li key={movie.id}>{<Favorite reload = {reload} setReload = {setReload} movie={movie}/>}</li>)}
              </div>
          }

        </div>
      </>

  )
}