'use client';

import UserList from '../components/UserList';

export default function UsersAdminPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Administración de Usuarios
        </h1>
      </div>

      <UserList />
    </div>
  );
} 