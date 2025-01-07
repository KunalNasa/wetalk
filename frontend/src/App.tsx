import { Navigate, Route, Routes } from "react-router-dom"
import useAuthStore from "./store/useAuthUser"
import LogIn from "./pages/Login/LogIn";
import SignUp from "./pages/Signup/SignUp";
import Home from "./pages/Home/Home";
import { Toaster } from "react-hot-toast";

function App() {
  const {authUser} = useAuthStore();
  return (
    <div>
      <Routes>
        <Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />}/>
        <Route path='/login' element={authUser ? <Navigate to={"/"} /> : <LogIn/>}/>
        <Route path='/signup' element={authUser ? <Navigate to={"/"} /> : <SignUp/>}/>
      </Routes>
      <Toaster/>

    </div>
  )
}

export default App
