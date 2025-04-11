'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminNav() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16">
          <div className="flex space-x-4">
            <Link
              href="/admin"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/admin')
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/admin/events"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/admin/events')
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              Eventos
            </Link>
            <Link
              href="/admin/users"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/admin/users')
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              Usuarios
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 