import React, { useEffect, useState } from "react";
import { auth, db } from "../config/firebase"; // Adjust the path as necessary
import { collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import {useNavigate} from 'react-router-dom';
import { signOut } from "firebase/auth";

const Profile = () => {

    const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

   const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const q = query(
            collection(db, "Users"),
            where("email", "==", user.email)
          );
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            setUserInfo(userData);
          } else {
          console.error("User document not found in Firestore.");
        }
        } catch (error) {
          console.error("Error fetching user data by email:", error);
        } finally {
          setLoading(false);
        }
        
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div className="p-6">Loading profile...</div>;

  if (!userInfo)
    return <div className="p-6 text-red-600">No user data found.</div>;

  return (
    <div className="flex-col  bg-[#005A76] w-full min-h-screen">
        <h2 className="text-3xl text-white text-center font-bold mb-4">My Profile</h2>
        <div className="flex justfy-center items-center space-x-80 max-w-7xl max-h-screen p-6 mx-auto bg-white shadow-md rounded-md">
            <div className="flex-col mx-50   p-6">
                <img src="/profile_icon.png" alt="Profile" className="w-50 h-50  rounded-full border-4 border-gray-300 mb-4" />
                <h1 className="text-3xl text-orange-500 font-bold text-center">{userInfo.name}</h1>
            </div>
            
            <div className="space-y-4 text-xl">
            <p>
                <strong>Email:</strong> {userInfo.email}
            </p>
            <p>
                <strong>Phone:</strong> {userInfo.phone}
            </p>
            <p>
                <strong>Role:</strong> {userInfo.role}
            </p>
            <p>
                <strong>Organization:</strong> {userInfo.organization}
            </p>
            <p>
                <strong>Joining Date:</strong> {userInfo.joiningDate}
            </p>
            <p>
                <strong>Status:</strong> {userInfo.status}
            </p>
            </div>
        </div>
        <h1 className="text-2xl text-white font-bold text-centre p-4 ml-25">Address : {userInfo.address} </h1> 
         <div className="mt-6  justify-end flex m-25">
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md flex items-center gap-2 cursor-pointer hover:scale-110"
          >
            <p className="font-bold">Logout</p>
          </button>
        </div>
    </div>
  );
};

export default Profile;
