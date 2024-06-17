import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const Signup = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();
    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <InputBox onChange={(e) => setName(e.target.value)} placeholder="John Doe" label={"Name"} />
        <InputBox onChange={(e) => setEmail(e.target.value)} placeholder="john@gmail.com" label={"Email"} />
        <InputBox onChange={(e) => setPassword(e.target.value)} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button onClick={async() => {
           const res = await axios.post("http://localhost:3000/user/signup", {
              name,
              email,
              password
            })
            localStorage.setItem("token", res.data);
            navigate("/todos")
          }} label={"Sign up"} />
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
}

export default Signup;