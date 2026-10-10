import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto p-8">
        <Outlet />
      </main>

      <footer className="py-6 text-center text-xs text-gray-500">
        © 2024 Commerce
      </footer>
    </div>
  );
};

export default MainLayout;