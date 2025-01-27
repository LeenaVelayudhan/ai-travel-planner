import { Button } from '@/components/ui/button';
import React from 'react';

function Header() {
  return (
    <div className="p-4 shadow-lg flex justify-between items-center bg-white">
      {/* Logo Section */}
      <img src="/logo.svg" alt="Logo" className="h-10 w-auto cursor-pointer hover:scale-105 transition-transform duration-200" />

      {/* Buttons Section */}
      <div className="space-x-4">
        <Button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md">
          Sign In
        </Button>
      </div>
    </div>
  );
}

export default Header;
