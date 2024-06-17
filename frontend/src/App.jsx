import { BrowserRouter, Route, Routes } from "react-router-dom"
import Signup from "./pages/SignUp"
import Signin from "./pages/SignIn"
import Todos from "./pages/Todos"


function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element=<Signup /> />
      <Route path='/signin' element=<Signin /> />
      <Route path='/todos' element=<Todos /> />
    </Routes>
    </BrowserRouter>
  )
}

export default App
