import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { Brand } from '../types';
import { brands } from '../data/brands';

interface BrandContextType {
  selectedBrand: Brand | null;
  setSelectedBrand: (brand: Brand | null) => void;
  ensureBrandSelected: () => void;
}

const BrandContext = createContext<BrandContextType | undefined>(undefined);

export function BrandProvider({ children }: { children: ReactNode }) {
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const ensureBrandSelected = useCallback(() => {
    setSelectedBrand((prev) => (prev ?? brands[0]));
  }, []);
  return (
    <BrandContext.Provider value={{ selectedBrand, setSelectedBrand, ensureBrandSelected }}>
      {children}
    </BrandContext.Provider>
  );
}

export function useBrand() {
  const context = useContext(BrandContext);
  if (context === undefined) {
    throw new Error('useBrand must be used within a BrandProvider');
  }
  return context;
}
