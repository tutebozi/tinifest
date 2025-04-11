import React, { useState } from 'react';

interface ImageUploadProps {
  imageUrl: string;
  onImageChange: (url: string) => void;
  label: string;
}

export default function ImageUpload({ imageUrl, onImageChange, label }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar el tipo de archivo
    if (!file.type.startsWith('image/')) {
      setError('Por favor, selecciona un archivo de imagen válido');
      return;
    }

    // Validar el tamaño del archivo (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('La imagen debe ser menor a 5MB');
      return;
    }

    try {
      setIsUploading(true);
      setError(null);

      // Aquí normalmente subirías la imagen a un servicio de almacenamiento
      // Por ahora, crearemos una URL temporal
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageChange(reader.result as string);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError('Error al subir la imagen');
      setIsUploading(false);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          {imageUrl ? (
            <div className="relative">
              <img
                src={imageUrl}
                alt={label}
                className="mx-auto h-32 w-auto object-contain"
              />
              <button
                type="button"
                onClick={() => onImageChange('')}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
              >
                ✕
              </button>
            </div>
          ) : (
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          
          <div className="flex text-sm text-gray-600">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500"
            >
              <span>{imageUrl ? 'Cambiar imagen' : 'Subir imagen'}</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                accept="image/*"
                onChange={handleImageChange}
                disabled={isUploading}
              />
            </label>
          </div>
          
          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}
          
          {isUploading && (
            <div className="mt-2">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-purple-600 mx-auto"></div>
              <p className="mt-1 text-sm text-gray-500">Subiendo imagen...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 