import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import toast, {Toaster} from "react-hot-toast";

function LogInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [warning, setWarning] = useState('');
    const [userData, setUserData] = useState({});
    const [buttonText, setButtonText] = useState(
        <button type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            Log In
        </button>
    );

    const getUserData = async () => {
        try {
            const res = await fetch('http://localhost:8080/users');
            const data = await res.json();
            setUserData(data)

        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getUserData()
    }, [])


    const sendingRequest = (e) => {
        e.preventDefault();
        if (email && password.length >= 8 ) {
            setWarning('')
            const user =  userData.find(user => user.email === email && user.password === password)
            if  (user) {
                setButtonText(
                    <Link to='/'>
                        <button type="submit"
                                className="w-full text-white bg-blue-700 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                            Enter
                        </button>
                    </Link>)
                toast('🎉 You entered account', {style: {backgroundColor: 'green', color: 'white'}})
        }else {
                toast('Email or Password are wrong', {style: {backgroundColor: 'red', color: "white"}})
            }
        } else if (password.length < 8) setWarning('Password must be at least 8 characters');
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div
                    className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 dark:bg-gray-800 dark:border-gray-700 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Log in an account
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={sendingRequest}>
                                <div>
                                    <label htmlFor="email"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                        email</label>
                                    <input type="email" name="email" id="email"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           placeholder="name@company.com" required="" value={email} onChange={(e) => setEmail(e.target.value)}
                                           autoComplete='off'
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           required="" value={password} onChange={(e) => setPassword(e.target.value)}

                                    />
                                </div>

                                <div className="flex items-start">
                                    <div className='text-medium'>
                                        <p className='text-red-800'>{warning}</p>
                                    </div>
                                </div>
                                {buttonText}
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Do not have an account? <Link to="/signUp"
                                                                   className="font-medium text-blue-600 hover:underline dark:text-primary-500">Sign Up
                                    here</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            <Toaster/>
            </section>

    )
}

export default LogInPage;