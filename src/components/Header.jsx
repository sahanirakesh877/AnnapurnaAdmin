import React from "react";

const Header = () => {
   
  return (
    <header className="bg-white shadow-md px-4 py-3 flex justify-between items-center container mx-auto">
      <div className="text-2xl font-bold text-gray-800">Annapurna</div>
      <div className="flex items-center space-x-4">
      <button  className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
          R
        </button>
        <button  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-blue-600">
          Logout
        </button>
       
      </div>
    </header>
  );
};

export default Header;
