import {Link, useParams} from 'react-router-dom';
import {results as data} from '../db';
import {favorite_movies as favorites} from '../favorites.json';
import {FaStar, FaHeart, FaArrowLeft} from "react-icons/fa6";
import { useState} from "react";
import toast, {Toaster} from "react-hot-toast";


function MoviePage() {
    const [like, setLike] = useState(false)
    const [isActive, setIsActive] = useState(false);
    const {id} = useParams()
    const movie = data.find(item => item.id == id)


    const liked = favorites.find(item => item.id === id)
    console.log(liked)
    liked && setLike(true)

    const handleLike = () => {
        setLike(!like)
        setIsActive(true)
        if (!like)
        {
            fetch('http://localhost:3000/favorite_movies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'ID': movie.id,
                    'Title': movie.title,
                    'poster': movie.poster,
                    'rating': rating,
                    'reviews': movie.vote_count,
                    'overview': movie.overview,
                    'original_language': movie.original_language,
                    'release_date': movie.release_date,
                })
            }).then(response => {
                console.log(response.json())
            })
            toast('✅added to Favorite Movies',{
                style: {
                    border: '1px solid black',
                }})
        }
    }

    const rating = Math.round(movie.vote_average)

    const stars = [
        <FaStar size={23}/>,
        <FaStar size={23}/>,
        <FaStar size={23}/>,
        <FaStar size={23}/>,
        <FaStar size={23}/>,
        <FaStar size={23}/>,
        <FaStar size={23}/>,
        <FaStar size={23}/>,
        <FaStar size={23}/>,
        <FaStar size={23}/>,
    ]
    const shinyStars = stars.slice(0, rating)
    const lastStars = stars.slice(0, 10 - rating)


  return (
      <div className="font-sans bg-slate-800 h-full">
          <Link to="/popular">
              <FaArrowLeft className='fixed mt-8 ml-8 ' color='white' size={20}/>
          </Link>

          <div className="p-4 lg:max-w-7xl max-w-2xl max-lg:mx-auto bg-slate-800">
              <div className="grid pt-10 items-start grid-cols-1 lg:grid-cols-5 gap-12 bg-slate-800">
                  <div className="lg:col-span-3 w-full top-0 text-center bg-slate-800">
                      <div className="bg-gray-800 px-7 rounded-xl ">
                          <img src={movie.poster} alt="Product"
                               className="w-9/12  rounded object-cover mx-auto"/>
                      </div>

                  </div>

                  <div className="lg:col-span-2 bg-slate-800">
                      <h2 className="text-3xl font-semibold text-white">{movie.title}</h2>

                      <div className="flex space-x-2 mt-4 list-none">
                          {shinyStars.map((star, index) => <li key={index}><FaStar color='#FFD43B' size={23}/></li>)}
                          {lastStars.map((star, index) => <li key={index}><FaStar size={23}/></li>)}

                          <h4 className="text-white text-base">{movie.vote_count} Reviews</h4>
                      </div>

                      <div className="flex justify-between items-baseline bg-slate-800">
                          <div className='flex flex-wrap gap-4 mt-8'>
                              <p className="text-white text-4xl font-semibold">$12</p>
                              <p className="text-gray-400 text-base"><strike>$16</strike> <span
                                  className="text-sm ml-1">Tax included</span></p></div>

                          <div className='pr-12'>
                              <button disabled={isActive}>
                                  <FaHeart className='cursor-pointer' size={23} color={like && 'red'}
                                           onClick={() => handleLike()}/>
                              </button>
                          </div>
                      </div>

                      <div className="flex flex-wrap gap-4 mt-8">
                          <button type="button"
                                  className="min-w-[200px] text-white px-4 py-3 bg-button-color hover:bg-button-hover-color  text-sm font-semibold rounded">
                              Buy Premium
                          </button>
                          <button type="button"
                                  className="min-w-[200px] opacity-75 text-white px-4 py-3 bg-button-color hover:bg-button-hover-color text-sm font-semibold rounded">
                              Buy to watch
                          </button>
                      </div>

                      <div className="mt-8 flex flex-col gap-6 opacity-80 bg-slate-800">
                          <div className=' bg-slate-900 rounded-2xl'>
                              <video className=' p-3 rounded-lg w-full h-72' autoPlay={true}>
                                  <source src={movie.trailer} />

                              </video>
                          </div>
                          <div className='flex flex-col gap-4 p-6 bg-slate-900 rounded-2xl'>
                              <h3 className="text-xl font-semibold text-white">About the Movie</h3>
                              <div className="text-lg text-white">
                                  <p>{movie.overview}</p>
                              </div>
                          </div>
                          <div className='flex flex-col gap-4 p-6 bg-slate-900 rounded-2xl'>
                              <h3 className='text-xl font-semibold text-white'>Release Date
                                  <span className='font-light'>: {movie.release_date}</span>
                              </h3>
                              <h3 className='text-xl font-semibold text-white'>Original language
                                  <span className='font-light'>: {movie.original_language}</span>
                              </h3>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <Toaster/>
      </div>

  )
}

export default MoviePage