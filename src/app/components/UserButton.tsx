'use client';

import { useState, useEffect } from 'react';
import AuthModal from './AuthModal';

export default function UserButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    const email = localStorage.getItem('userEmail');
    if (token && email) {
      setIsLoggedIn(true);
      setUserName(email.split('@')[0]); // Usamos la parte inicial del email como nombre por defecto
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.user-button-container')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
    const email = localStorage.getItem('userEmail');
    if (email) {
      setUserName(email.split('@')[0]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    setUserName('');
  };

  return (
    <>
      <div className="relative user-button-container">
        <button
          onClick={() => isLoggedIn ? setIsMenuOpen(!isMenuOpen) : setIsModalOpen(true)}
          className="flex items-center space-x-2 text-white hover:text-purple-300 transition-colors w-full"
        >
          <div className="flex items-center space-x-2 cursor-pointer">
            <div className="relative group">
              <svg
                className="w-8 h-8"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
                  clipRule="evenodd"
                />
              </svg>
              {isLoggedIn && (
                <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
              )}
            </div>
            {isLoggedIn && (
              <span className="text-sm font-medium">{userName}</span>
            )}
          </div>
        </button>

        {/* Menú desplegable para usuario autenticado */}
        {isLoggedIn && isMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </div>

      <AuthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          handleAuthSuccess();
          setIsModalOpen(false);
        }}
      />
    </>
  );
} 