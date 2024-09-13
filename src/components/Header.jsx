import { useState } from "react";
import { IoIosLogIn } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { IoIosFlame } from "react-icons/io";
import { Link } from "react-router-dom";
import Search from "./Search";

export default function Header() {
    const [showInput, setShowInput] = useState(false)

    return (
        <header className='flex justify-evenly bg-slate-900 items-center z-50 sticky w-full top-0'>
            <div className='w-16 h-16'>
                <Link to="/">
                <img className='text-white' src="src/images/logo-removebg-preview (1).png"/>
                </Link>
            </div>
            <ul className='text-white flex justify-evenly w-4/5'>
                {showInput ? <Search setShowInput={setShowInput} />  :
                <div className="text-white flex justify-evenly w-4/5">
                    <li><Link className="flex justify-center items-center" to="/popular"><IoIosFlame className="mr-1" color="white" />Popular</Link></li>
                    <li><button
                            onClick={() => setShowInput(true)} 
                            className="flex justify-center items-center" 
                            >
                                <IoIosSearch className="mr-1" color="white" />  
                                Search 
                        </button>
                    </li>
                    <li><Link className="flex justify-center items-center" to="/favorites"><IoIosHeart className="mr-1" color="white" /> Favorites </Link></li>
                </div>
                }
                
            </ul>
            <div >
                <Link className='flex justify-center items-center' to="/login">
                    <IoIosLogIn className="mr-1" color="white"/>
                    <p className='text-white'>Log in</p>
                </Link>
            </div>
        </header>
    )
}
