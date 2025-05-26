import React from 'react';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    icon: '🏢',
    title: 'Company Access & Admin Tools',
    description:
      'Easily register your organization, invite employees, and control data access with admin-level tools.',
  },
  {
    icon: '👥',
    title: 'Seamless Employee Onboarding',
    description:
      'Simple setup, secure authentication, and a guided onboarding process for new users.',
  },
  {
    icon: '🗺️',
    title: 'Interactive Property Map',
    description:
      'View, pan, and zoom across U.S. properties with dynamic clustering and filter capabilities.',
  },
  {
    icon: '🏡',
    title: 'Detailed Property Insights',
    description:
      'Access property size, value, history, ownership records, and even bookmark or export listings.',
  },
  {
    icon: '💰',
    title: 'Wealth Analysis Engine',
    description:
      'Evaluate owner financial profiles with net worth estimates, data sources, and wealth breakdowns.',
  },
  {
    icon: '🔍',
    title: 'Advanced Search & Filtering',
    description:
      'Instantly find properties or owners by address, value, size, and more, with saved filters and auto-suggestions.',
  },
  {
    icon: '📊',
    title: 'Data Exports & Reports',
    description:
      'Export data in multiple formats, schedule reports, and collaborate using powerful dashboards.',
  },
];

function LandingPage() {

  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-[#003c8f] via-[#3f51b5] to-[#7e57c2] h-full w-full text-white font-sans">
      <header className="flex justify-between items-center p-4">
        <div className="flex items-center space-x-2">
          <img src="/wealthmaplogo.jpg" alt="Logo" className="w-17 h-14 rounded-4xl" />
          <h1 className="text-2xl font-bold ">Wealth Map</h1>
        </div>
        <button 
          onClick={() => navigate('/login')}
          className="bg-pink-500 hover:bg-pink-700  text-white text-xl font-bold px-4 py-2 rounded-lg  md:w-[15vw] border-4 border-black cursor-pointer  hover:scale-85  transition duration-300 ease-in-out"> 
          Sign In
        </button>
      </header>

      <main className="px-6 md:px-20 py-10">
        <div className="flex mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              🌍 What is Wealth Map?
            </h2>
            <p className="text-2xl">
              Wealth Map is an advanced corporate intelligence platform designed to help
              companies and employees explore property ownership and net worth data across
              the United States. With powerful integrations and a sleek interactive map,
              users can uncover detailed property insights, track ownership histories, and
              analyse financial profiles all in one place.
            </p>
          </div>
         
        </div>

         <img
            src="/usmap.png"
            alt="US Map"
            className="mx-auto mb-10 w-1/3 h-1/4 rounded-lg "
          />
        
          <h3 className="text-2xl md:text-3xl font-bold mb-6">✨ Key Features</h3>
          <ul className="space-y-6">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start ml-10">
                <span className="text-xl md:text-3xl mr-2">{feature.icon}</span>
                <div>
                  <p className="font-bold text-md md:text-xl">{feature.title}</p>
                  <p className="text-md md:text-xl text-gray-200">{feature.description}</p>
                </div>
              </li>
            ))}
          </ul>
        
      </main>

      <footer className="mt-20 bg-[#001c45] text-sm text-gray-200 text-center py-4">
        © 2025 Wealth Map. All rights reserved.
      </footer>
    </div>
  )
}

export default LandingPage