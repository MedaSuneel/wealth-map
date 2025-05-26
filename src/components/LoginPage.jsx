import React ,{useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../config/firebase';

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMsg("Please fill in all fields !...");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMsg("Login successful!");
      navigate('/usmap');
    } catch (err) {
      setMsg("Invalid credentials. Try again.");
    }
  };

  return (
    <div className="min-h-screen items-center justify-center bg-gradient-to-r from-pink-500 to-blue-800 p-4">
      <div className="flex items-center space-x-2  ">
          <img src='/rightarrow.png' alt="Left Arrow" onClick={() => navigate('/')} className="w-15 h-13 rounded-4xl border-4 border-white transform hover:scale-110 cursor-pointer " />
          <img src="/wealthmaplogo.jpg" alt="Logo" className="w-17 h-14 rounded-4xl md:ml-[30%] lg:ml-[38%]" />
          <h1 className="text-2xl font-bold ">Wealth Map</h1>
      </div>
      <div className={'w-fit  bg-white rounded-2xl md:ml-[30%] lg:ml-[38%] items-center justify-center ' }>{msg && <p className = "p-2 text-2xl text-red-600 font-bold text-center m-10" >{msg}</p>}</div>
        
      <div className="bg-black bg-opacity-10 backdrop-blur-md rounded-xl shadow-lg w-[85vw] h-[70vh] m-15 flex flex-col md:flex-row p-8">
        {/* Left Section */}
        <div className=" w-1/2 text-white p-4">
          
          <h2 className="text-3xl font-bold mb-15">Welcome back,</h2>
          <form className="space-y-4">
            <div>
              <p className="text-xl font-bold mb-2">Email</p>
              <input
                type="email"
                className="w-full p-2 rounded border"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <p className="text-xl font-bold mb-2">Password</p>
              <input
                type="password"
                className="w-full p-2 rounded border"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <button
              type="submit"
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-blue-500 to-pink-600 text-white text-xl mt-5 cursor-pointer font-bold p-3 rounded-lg hover:scale-90 transition"
            >
              LOGIN
            </button>
          </form>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex w-1/2 items-center justify-center">
          <img
            src="/usmap.png"
            alt="map"
            className="w-full h-[80%] px-10 rounded-lg"
          />
        </div>
      </div>
      
    </div>
  );
}

export default LoginPage