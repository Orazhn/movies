import { useState } from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import axios from "axios";
import toast from "react-hot-toast";


export default function Card(props) {
    const {movie} = props
    const [like, setLike] = useState(false)
   
    const handleLike = () => {
        setLike(!like)
        if (!like)
        {
            axios.post('http://localhost:8080/favorite_movies', {
                'ID': movie.id,
                'Title': movie.title,
                'poster': movie.poster,
                'rating': rating,
                'reviews': movie.vote_count,
                'overview': movie.overview,
                'original_language': movie.original_language,
                'release_date': movie.release_date,
            })
            .then( () => {
                toast('✅added to Favorite Movies',{
                    style: {
                        border: '1px solid black',
                    }})
            })
            .catch(function (error) {
                console.log(error);
            })
        }
    }

    const rating = Math.round(movie.vote_average)

  return (
    <>  
        <div 
            className="
                max-w-sm 
                bg-white border 
                border-gray-200 
                rounded-lg shadow
                mt-14
                dark:bg-gray-800 
                dark:border-gray-700  
                cursor-pointer 
            "
        >
                <div className='h-3/5'>
                    <img className="rounded-t-lg w-full h-full" src = {movie.poster}/>
                </div>
        
            <div className="p-5">
                <div className='flex justify-between items-baseline'>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{movie.title}</h5>
                    {like ? 
                        <FaHeart onClick={() => handleLike()} icon="fa-solid fa-heart" style={{color: "red",}} />
                        : <FaHeart onClick={() => handleLike()} icon="fa-solid fa-heart" style={{color: "white",}} />
                    }   
                </div>
                    
            
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {movie.overview.slice(0,190) + '...'}
                </p>

                <Link
                    to ={`/popular/${movie.id}`}>

                    <Button
                        sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            paddingLeft: '0.75rem',
                            paddingRight: '0.75rem',
                            paddingTop: '0.5rem',
                            paddingBottom: '0.5rem',
                            fontSize: '0.875rem',
                            lineHeight: '1.25rem',
                            fontWeight: '500',
                            backgroundColor: '#1D4ED8',
                            color: 'white',
                            borderRadius: '15px',
                            ":hover": {backgroundColor: '#1E40AF'}
                        }}
                        variant="outlined">
                            Read More
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>

                    </Button>

                </Link>


            </div>
        </div>

    </>
  )
}
