'use client';

import React, { useState, useEffect } from 'react';
import { RRPP, Sale } from '../../types';
import { getRRPPList, createRRPP, getSalesByRRPP, generateRRPPLink } from '../../services/rrppService';

export default function RRPPAdminPage() {
  const [rrppList, setRRPPList] = useState<RRPP[]>([]);
  const [selectedRRPP, setSelectedRRPP] = useState<RRPP | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    code: '',
    commission: 10,
    active: true
  });

  useEffect(() => {
    loadRRPPList();
  }, []);

  const loadRRPPList = () => {
    const list = getRRPPList();
    setRRPPList(list);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createRRPP(formData);
    setShowForm(false);
    setFormData({
      name: '',
      email: '',
      code: '',
      commission: 10,
      active: true
    });
    loadRRPPList();
  };

  const handleRRPPSelect = (rrpp: RRPP) => {
    setSelectedRRPP(rrpp);
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Administración de RRPP</h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700"
          >
            Nuevo RRPP
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-6">Nuevo RRPP</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-lg border-gray-300 px-4 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-lg border-gray-300 px-4 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Código
                </label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  className="w-full rounded-lg border-gray-300 px-4 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Comisión (%)
                </label>
                <input
                  type="number"
                  value={formData.commission}
                  onChange={(e) => setFormData({ ...formData, commission: Number(e.target.value) })}
                  className="w-full rounded-lg border-gray-300 px-4 py-2"
                  min="0"
                  max="100"
                  required
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rrppList.map((rrpp) => (
            <div
              key={rrpp.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{rrpp.name}</h3>
                <p className="text-gray-600 mb-4">{rrpp.email}</p>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Código:</span> {rrpp.code}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Comisión:</span> {rrpp.commission}%
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Ventas totales:</span> ${rrpp.totalSales}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm font-medium text-gray-700 mb-2">Link de ventas:</p>
                  <div className="bg-gray-50 p-2 rounded text-sm break-all">
                    {window.location.origin}/eventos?rrpp={rrpp.code}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 