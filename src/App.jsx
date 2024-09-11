import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import HomePage  from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import PopularPage from "./pages/PopularPage";
import MoviePage from "./pages/MoviePage";
import FavoritesPage from "./pages/FavoritesPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage.jsx";



const router = createBrowserRouter(
    [{
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/homepage",
                element: <HomePage />,
            },
            {
                path: "/popular",
                element: <PopularPage />,
            },
            {
                path: "/favorites",
                element: <FavoritesPage />,
            },
            {
                path: "/popular/:id",
                element: <MoviePage/>,
            },
            {
                path: '/signUp',
                element: <SignUpPage />,
            },
            {
                path: '/login',
                element: <LoginPage />,
            }

        ]
    }]
)


function App() {
  return (
    <RouterProvider router = {router} />
  )
}


export default App
