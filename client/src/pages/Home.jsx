import React from 'react';
import { Link } from 'react-router-dom';

const ButtonLink = ({ to, children, className }) => (
  <Link to={to} className={`hover:underline ${className}`}>
    {children}
  </Link>
);

const Home = () => {
  return (
    <div className="min-h-screen text-white relative bg-img">
      <div className="container mx-auto flex items-center justify-between py-4 relative z-20">
        <div className="flex items-center mt-10">
          <img
            src="https://picsum.photos/200/300" 
            alt="Travel Mate Logo"
            className="h-8 w-8 ml-10"
          />
          <span className="text-2xl font-bold drop-shadow-lg" style={{ color: '#fff', marginLeft: '4px' }}>
            Travel Mate
          </span>
        </div>

        <div className='mr-10 mt-10'>
          <ButtonLink to="/login" className="text-white">
            <button
              className="bg-[#FFF] text-[#00c2ff] py-1 px-4 rounded-[10px] sm:rounded-[15px] font-semibold text-2xl hover:scale-110"
            >
              LOGIN
            </button>
          </ButtonLink>
        </div>
      </div>

      <div className="absolute left-10 right-10 bg-white p-8 rounded-[30px] mt-18 h-96">
        <img
          src="https://picsum.photos/200/300"
          alt="Airplane"
          className="h-3/4 w-3/4 mx-auto"
        />
      </div>
    </div>
  );
};

export default Home;
