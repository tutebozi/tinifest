import { RRPP, RRPPFormData, Sale } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Funciones auxiliares para localStorage
const getFromStorage = <T>(key: string): T[] => {
  try {
    if (typeof window === 'undefined') return [];
    const data = window.localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(`Error al obtener datos de ${key}:`, error);
    return [];
  }
};

const saveToStorage = <T>(key: string, data: T[]): void => {
  try {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error al guardar datos en ${key}:`, error);
  }
};

// Funciones de RRPP
export const getRRPPList = (): RRPP[] => {
  'use client';
  return getFromStorage<RRPP>('rrppList');
};

export const getRRPPByCode = (code: string): RRPP | undefined => {
  'use client';
  const rrppList = getRRPPList();
  return rrppList.find(rrpp => rrpp.code === code);
};

export const createRRPP = (data: RRPPFormData): RRPP => {
  'use client';
  const rrppList = getRRPPList();
  
  // Generar un código único si no se proporciona uno
  const code = data.code || `RRPP${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
  
  // Verificar si el código ya existe
  if (rrppList.some(rrpp => rrpp.code === code)) {
    throw new Error('El código RRPP ya existe');
  }

  const newRRPP: RRPP = {
    ...data,
    id: uuidv4(),
    code,
    totalSales: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  rrppList.push(newRRPP);
  saveToStorage('rrppList', rrppList);
  return newRRPP;
};

export const updateRRPP = (id: string, data: Partial<RRPPFormData>): RRPP => {
  const rrppList = getRRPPList();
  const index = rrppList.findIndex(rrpp => rrpp.id === id);
  
  if (index === -1) {
    throw new Error('RRPP no encontrado');
  }

  // Verificar si el nuevo código ya existe en otro RRPP
  if (data.code && rrppList.some(rrpp => rrpp.code === data.code && rrpp.id !== id)) {
    throw new Error('El código RRPP ya existe');
  }

  const updatedRRPP = {
    ...rrppList[index],
    ...data,
    updatedAt: new Date().toISOString()
  };

  rrppList[index] = updatedRRPP;
  saveToStorage('rrppList', rrppList);
  return updatedRRPP;
};

export const deleteRRPP = (id: string): void => {
  const rrppList = getRRPPList();
  const filteredList = rrppList.filter(rrpp => rrpp.id !== id);
  saveToStorage('rrppList', filteredList);
};

// Funciones de ventas
export const getSales = (): Sale[] => {
  return getFromStorage<Sale>('sales');
};

export const createSale = (saleData: Omit<Sale, 'id' | 'createdAt'>): Sale => {
  const sales = getSales();
  const newSale: Sale = {
    ...saleData,
    id: uuidv4(),
    createdAt: new Date().toISOString()
  };

  // Si hay un código RRPP, actualizar sus ventas totales
  if (saleData.rrppCode) {
    const rrppList = getRRPPList();
    const rrppIndex = rrppList.findIndex(rrpp => rrpp.code === saleData.rrppCode);
    
    if (rrppIndex !== -1) {
      rrppList[rrppIndex].totalSales += saleData.amount;
      saveToStorage('rrppList', rrppList);
    }
  }

  sales.push(newSale);
  saveToStorage('sales', sales);
  return newSale;
};

export const getSalesByRRPP = (rrppCode: string): Sale[] => {
  const sales = getSales();
  return sales.filter(sale => sale.rrppCode === rrppCode);
};

// Funciones de utilidad
export const generateRRPPLink = (rrppCode: string, eventId: string): string => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  return `${baseUrl}/eventos/${eventId}?rrpp=${rrppCode}`;
}; 