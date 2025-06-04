import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

function SignUp() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setMsg('');

    try {
      // Step 1: Check if email exists in Users collection
      const usersRef = collection(db, 'Users');
      const q = query(usersRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setMsg('Email not authorized for registration. Contact admin.');
        return;
      }

      // Step 2: Create user in Firebase Auth
      await createUserWithEmailAndPassword(auth, email, password);
      setMsg("Registered successfully!");
      navigate('/usmap'); // Change this to your success route
    } catch (err) {
      setMsg(err.message);
    }
  };


  return (
    <div className="min-h-screen items-center justify-center bg-gradient-to-r from-pink-500 to-blue-800 p-4">
      <div className="flex items-center space-x-2  ">
          <img src='/rightarrow.png' alt="Left Arrow" onClick={() => navigate('/')} className="w-15 h-13 rounded-4xl border-4 border-white transform hover:scale-110 cursor-pointer " />
          <img src="/wealthmaplogo.jpg" alt="Logo" className="w-17 h-14 rounded-4xl md:ml-[30%] lg:ml-[38%]" />
          <h1 className="text-2xl font-bold ">Wealth Map</h1> 
      </div>
      <div className={'w-fit  bg-white rounded-2xl md:ml-[30%] lg:ml-[27%] items-center justify-center ' }>{msg && <p className = "p-2 text-2xl text-red-600 font-bold text-center m-10" >{msg}</p>}</div>
        
      <div className="bg-black bg-opacity-10 backdrop-blur-md rounded-xl shadow-lg w-[85vw] h-[70vh] m-15 flex flex-col md:flex-row p-8">
        {/* Left Section */}
        <div className=" w-1/2 text-white p-4">
          
          <h2 className="text-3xl font-bold mb-15">Register Here,</h2>
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
              onClick={handleSignup}
              className="w-full bg-gradient-to-r from-blue-500 to-pink-600 text-white text-xl mt-5 cursor-pointer font-bold p-3 rounded-lg hover:scale-90 transition"
            >
              Sign Up
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
  )
}

export default SignUp