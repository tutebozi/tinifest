import { RRPP, Sale } from '../types';
import { v4 as uuidv4 } from 'uuid';

const RRPP_STORAGE_KEY = 'rrpp_list';
const SALES_STORAGE_KEY = 'sales_list';

// Función auxiliar para obtener datos del localStorage
const getFromStorage = <T>(key: string): T[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

// Función auxiliar para guardar datos en localStorage
const saveToStorage = <T>(key: string, data: T[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(data));
};

// Generar código automático para RRPP
const generateRRPPCode = (name: string): string => {
  // Obtener las primeras 4 letras del nombre en mayúsculas
  const namePrefix = name.replace(/[^a-zA-Z]/g, '').substring(0, 4).toUpperCase();
  
  // Obtener la lista actual de RRPP
  const rrppList = getRRPPList();
  
  // Encontrar el número más alto usado con este prefijo
  const existingCodes = rrppList
    .map(rrpp => rrpp.code)
    .filter(code => code.startsWith(namePrefix))
    .map(code => {
      const num = parseInt(code.substring(namePrefix.length));
      return isNaN(num) ? 0 : num;
    });
  
  const highestNumber = Math.max(0, ...existingCodes);
  
  // Crear nuevo código con el siguiente número
  const newNumber = (highestNumber + 1).toString().padStart(3, '0');
  return `${namePrefix}${newNumber}`;
};

// Obtener lista de RRPP
export const getRRPPList = (): RRPP[] => {
  return getFromStorage<RRPP>(RRPP_STORAGE_KEY);
};

// Encontrar RRPP por código
export const getRRPPByCode = (code: string): RRPP | undefined => {
  const rrppList = getRRPPList();
  return rrppList.find(rrpp => rrpp.code === code);
};

// Crear nuevo RRPP
export const createRRPP = (rrppData: Omit<RRPP, 'id' | 'totalSales' | 'code'>): RRPP => {
  console.log('Creating RRPP with data:', rrppData);
  const code = generateRRPPCode(rrppData.name);
  console.log('Generated code:', code);
  
  const newRRPP: RRPP = {
    ...rrppData,
    id: uuidv4(),
    totalSales: 0,
    code
  };
  
  console.log('New RRPP object:', newRRPP);
  
  const rrppList = getRRPPList();
  rrppList.push(newRRPP);
  saveToStorage(RRPP_STORAGE_KEY, rrppList);
  
  return newRRPP;
};

// Actualizar RRPP existente
export const updateRRPP = (id: string, rrppData: Partial<RRPP>): RRPP | null => {
  const rrppList = getRRPPList();
  const index = rrppList.findIndex(rrpp => rrpp.id === id);
  
  if (index === -1) return null;
  
  rrppList[index] = {
    ...rrppList[index],
    ...rrppData
  };
  
  saveToStorage(RRPP_STORAGE_KEY, rrppList);
  return rrppList[index];
};

// Obtener ventas
export const getSales = (): Sale[] => {
  return getFromStorage<Sale>(SALES_STORAGE_KEY);
};

// Crear nueva venta
export const createSale = (saleData: Omit<Sale, 'id' | 'date'>): Sale => {
  const newSale: Sale = {
    ...saleData,
    id: uuidv4(),
    date: new Date().toISOString()
  };
  
  const sales = getSales();
  sales.push(newSale);
  saveToStorage(SALES_STORAGE_KEY, sales);
  
  // Actualizar total de ventas del RRPP si existe
  if (saleData.rrppCode) {
    const rrpp = getRRPPByCode(saleData.rrppCode);
    if (rrpp) {
      updateRRPP(rrpp.id, {
        totalSales: rrpp.totalSales + saleData.totalAmount
      });
    }
  }
  
  return newSale;
};

// Obtener ventas por RRPP
export const getSalesByRRPP = (rrppCode: string): Sale[] => {
  const sales = getSales();
  return sales.filter(sale => sale.rrppCode === rrppCode);
};

// Generar link de RRPP
export const generateRRPPLink = (rrppCode: string, eventId: string): string => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  return `${baseUrl}/eventos/${eventId}?rrpp=${rrppCode}`;
};

export const deleteRRPP = (id: string): void => {
  const rrppList = getRRPPList();
  const filteredList = rrppList.filter(rrpp => rrpp.id !== id);
  saveToStorage(RRPP_STORAGE_KEY, filteredList);
}; 