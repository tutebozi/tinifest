'use client';

import React, { useRef } from 'react';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  currentImage?: string;
}

export default function ImageUpload({ onImageSelect, currentImage }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  };

  return (
    <div className="space-y-4">
      <div 
        onClick={handleClick}
        className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-purple-500 transition-colors"
      >
        {currentImage ? (
          <div className="h-64 w-full flex items-center justify-center bg-gray-100">
            <img
              src={currentImage}
              alt="Vista previa"
              className="h-full w-full object-contain"
            />
          </div>
        ) : (
          <div className="h-64 w-full flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <svg
                className="h-12 w-12 text-gray-400 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="mt-1 text-sm text-gray-600">
                Haz clic para seleccionar una imagen
              </p>
            </div>
          </div>
        )}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
} 