'use client';

import { useState, useEffect } from 'react';
import { RRPP, RRPPFormData } from '../types';
import { getRRPPList, createRRPP, updateRRPP, deleteRRPP, getSalesByRRPP, generateRRPPLink } from '../services/rrppService';

export default function RRPPManagement() {
  const [rrppList, setRRPPList] = useState<RRPP[]>([]);
  const [selectedRRPP, setSelectedRRPP] = useState<RRPP | null>(null);
  const [formData, setFormData] = useState<RRPPFormData>({
    name: '',
    email: '',
    phone: '',
    commission: 10, // Comisión por defecto del 10%
    active: true
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadRRPPList();
  }, []);

  const loadRRPPList = () => {
    const list = getRRPPList();
    setRRPPList(list);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : 
              name === 'commission' ? Number(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing && selectedRRPP) {
      updateRRPP(selectedRRPP.id, formData);
    } else {
      const newRRPP = createRRPP(formData);
      // Aquí deberíamos enviar el correo al RRPP
      sendWelcomeEmail(newRRPP);
    }
    
    resetForm();
    loadRRPPList();
  };

  const handleEdit = (rrpp: RRPP) => {
    setSelectedRRPP(rrpp);
    setFormData({
      name: rrpp.name,
      email: rrpp.email,
      phone: rrpp.phone,
      commission: rrpp.commission,
      active: rrpp.active
    });
    setIsEditing(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      commission: 10,
      active: true
    });
    setSelectedRRPP(null);
    setIsEditing(false);
  };

  const sendWelcomeEmail = async (rrpp: RRPP) => {
    try {
      const response = await fetch('/api/send-rrpp-welcome', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: rrpp.name,
          email: rrpp.email,
          code: rrpp.code,
          commission: rrpp.commission
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Error al enviar el correo:', data);
        alert('Error al enviar el correo de bienvenida. Por favor, intenta nuevamente.');
        return;
      }

      console.log('Respuesta del servidor:', data);
      alert('RRPP creado exitosamente y correo de bienvenida enviado.');
    } catch (error) {
      console.error('Error:', error);
      alert('Error al enviar el correo de bienvenida. Por favor, intenta nuevamente.');
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este RRPP?')) {
      deleteRRPP(id);
      loadRRPPList();
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Administración de RRPP</h2>
      
      {/* Formulario */}
      <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Teléfono</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Comisión (%)</label>
            <input
              type="number"
              name="commission"
              value={formData.commission}
              onChange={handleInputChange}
              min="0"
              max="100"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleInputChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">Activo</label>
          </div>
        </div>
        
        <div className="mt-4 flex gap-2">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isEditing ? 'Actualizar' : 'Crear'} RRPP
          </button>
          
          {isEditing && (
            <button
              type="button"
              onClick={resetForm}
              className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* Lista de RRPP */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comisión</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Ventas</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rrppList.map((rrpp) => (
              <tr key={rrpp.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{rrpp.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rrpp.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rrpp.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rrpp.commission}%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${rrpp.totalSales}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    rrpp.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {rrpp.active ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleEdit(rrpp)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(rrpp.id)}
                      className="text-red-600 hover:text-red-900"
                      title="Eliminar RRPP"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 