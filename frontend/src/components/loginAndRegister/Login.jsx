import React, { useState } from 'react';
import axios from 'axios';



function Login({setIsOpen}) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setmessage] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const res = (isSignup) ? await axios.post("http://localhost:5000/register", formData) : await axios.post("http://localhost:5000/login", formData);
        localStorage.setItem("token",res.data)
        console.log(res.data)
        setIsOpen(false)
        window.location.reload()
    }catch(err){
        console.log(err)
        setmessage(err.response.data.message)
    }
  };

  return (
    <div>
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center" onClick={()=>setIsOpen(false)}>
        <div className="bg-white p-8 w-1/4 rounded-lg" onClick={(e)=>e.stopPropagation()}>
          <h1 className="text-2xl font-bold">{(isSignup)? "Sign up" : "Login"}</h1>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email" // Add name attribute
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 p-2 my-2 rounded-md"
              required
            />
            <input
              type="password"
              name="password" // Add name attribute
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="border border-gray-300 p-2 my-2 rounded-md"
              required
            />
            <button
              type="submit" // Ensure this is a submit button
              className="bg-emerald-600 text-white p-2 rounded-md"
            >
              {(isSignup)? "Sign up" : "Login"}
            </button>
          </form>
          <div className='text-center cursor-pointer' onClick={()=>setIsSignup(!isSignup)}>{(isSignup) ? "Already have an account" : "Create an account"}</div>
          {message && <p className='text-red-500 text-center'>{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default Login;
