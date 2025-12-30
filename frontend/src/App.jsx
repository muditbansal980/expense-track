
import Mainpage from "./components/mainpage";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/register/login"
import Signup from "./components/register/signup";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
export default function App() {
  const Router = createBrowserRouter([
    {
      path:"/",
      element:<Login/>
    },
    {
      path:"/Signup",
      element:<Signup/>
    },
    {
      path:"/main",
      element:<Mainpage/>
    }
  ])
  return (
    <div className = "App">
      <RouterProvider router={Router} />
    </div>
  )
}