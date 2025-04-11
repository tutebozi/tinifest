'use client';

import { useState } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface FormData {
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  password: string;
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(isLogin ? {
          email: formData.email,
          password: formData.password
        } : formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error en la autenticación');
      }

      localStorage.setItem('userToken', data.token);
      localStorage.setItem('userEmail', formData.email);
      if (!isLogin) {
        localStorage.setItem('userName', `${formData.nombre} ${formData.apellido}`);
      }
      
      onSuccess();
      onClose();
    } catch (error: any) {
      setError(error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      nombre: '',
      apellido: '',
      telefono: '',
      email: '',
      password: ''
    });
    setError('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
        <div className="p-8 md:p-12">
          <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
            {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
          </h2>

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg">
              <p className="font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">
                      Nombre
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      className="block w-full px-4 py-3 text-lg rounded-lg border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                      required
                      placeholder="Tu nombre"
                    />
                  </div>

                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">
                      Apellido
                    </label>
                    <input
                      type="text"
                      name="apellido"
                      value={formData.apellido}
                      onChange={handleChange}
                      className="block w-full px-4 py-3 text-lg rounded-lg border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                      required
                      placeholder="Tu apellido"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 text-lg rounded-lg border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                    required
                    placeholder="Tu número de teléfono"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full px-4 py-3 text-lg rounded-lg border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                required
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="block w-full px-4 py-3 text-lg rounded-lg border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                required
                placeholder="••••••••"
              />
            </div>

            <div className="flex flex-col space-y-4 mt-8">
              <button
                type="submit"
                className="w-full bg-purple-600 text-white text-lg font-semibold py-4 rounded-lg hover:bg-purple-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  resetForm();
                }}
                className="text-purple-600 hover:text-purple-700 text-lg font-medium text-center"
              >
                {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
              </button>
            </div>
          </form>
        </div>

        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
} 