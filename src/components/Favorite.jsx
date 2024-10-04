import {useState} from "react";
import {FaHeart} from "react-icons/fa6";
import {Link} from "react-router-dom";
import toast, {Toaster} from "react-hot-toast";
import axios from "axios";

function Favorite(props) {
    const {movie} = props
    const [liked, setLiked] = useState(true)

    const handleAction = () => {
        setLiked(!liked)
        if (liked) {
            axios.delete(`http://localhost:3000/favorite_movies/${movie.id}`)
            window.location.reload()
            .catch(error => console.log(error))
            props.setReload(props.reload + 1)
            toast('Movie was deleted successfully !')
        }
    }

    return (
            <div
                className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto bg-white">
                <div className="w-full md:w-1/3 bg-white grid place-items-center">
                    <img
                        src={movie.poster}
                        alt="tailwind logo" className="rounded-xl"/>
                </div>
                <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
                    <div className="flex justify-between items-start">
                        <div className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500"
                                 viewBox="0 0 20 20"
                                 fill="currentColor">
                                <path
                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                            </svg>
                            <p className="text-gray-600 font-bold text-sm ml-1">
                                {movie.rating}
                                <span className="text-gray-500 font-normal"> ({movie.reviews} reviews)</span>
                            </p>
                        </div>
                        <div >
                            {<FaHeart className ='cursor-pointer' color={liked && 'red' } onClick={handleAction}/>}
                        </div>
                        <div
                            className="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-800 hidden md:block">
                            {movie.original_language}
                        </div>
                    </div>
                    <h3 className="font-black text-gray-800 md:text-3xl text-xl">{movie.Title}</h3>
                    <p className="md:text-lg text-gray-500 text-base">{movie.overview}</p>
                    <Link to ={`/popular/${movie.ID}`}>
                        <button type="button"
                                className=" min-w-[200px] text-white px-4 py-3 bg-button-color hover:bg-button-hover-color  text-sm font-semibold rounded">
                            Read more
                        </button>
                    </Link>
                </div>
                <Toaster/>
            </div>
    );
}

export default Favorite;