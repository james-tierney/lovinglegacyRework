import React from 'react';

export default function Profile() {
  return (
    <div className="bg-gray-100 p-4">
      <div className="text-center">
        <header className="mb-4">
          <h1 className="text-2xl font-bold text-gray-700">timeless tiles</h1>
        </header>
        <img
          src="https://file.rendit.io/n/SWhoOo69tRsDmIiEtPiN.png"
          alt="Kelli Maroney"
          className="mx-auto rounded shadow-md mb-4"
        />
        <h2 className="text-lg font-semibold">Kelli Maroney</h2>
        <p className="text-sm text-gray-600 mb-2">15-10-1943 - 17-12-2018</p>
        <div className="text-sm text-gray-600 mb-4">
          <p>Forest Lawn Memorial Park</p>
          <p>Hollywood Hills, California</p>
          <p>Plot Number: Lincoln Terrace section, Map #H89, Lot 5245, Companion Garden Crypt 2</p>
          <button className="text-blue-500 underline">Map</button>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors mb-4">
          Click to share!
        </button>
        <footer className="flex justify-around text-sm text-gray-600 border-t pt-2">
          <a href="#" className="hover:text-blue-500 transition-colors">Bio</a>
          <a href="#" className="hover:text-blue-500 transition-colors">Photos</a>
          <a href="#" className="hover:text-blue-500 transition-colors">Videos</a>
          <a href="#" className="hover:text-blue-500 transition-colors">Links</a>
        </footer>
      </div>
    </div>
  );
}