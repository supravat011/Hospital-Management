import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Hospital {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  departments: string[];
  specialties: string[];
  emergencyContact: string;
  rating: number;
  image: string;
}

interface HospitalContextType {
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  selectedHospital: Hospital | null;
  setSelectedHospital: (hospital: Hospital | null) => void;
  hospitals: Hospital[];
}

const HospitalContext = createContext<HospitalContextType | undefined>(undefined);

const mockHospitals: Hospital[] = [
  {
    id: '1',
    name: 'Apollo Hospitals',
    city: 'Chennai',
    address: '21, Greams Lane, Off Greams Road, Chennai - 600006',
    phone: '+91 44 2829 0200',
    email: 'info@apollochennai.com',
    departments: ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Oncology'],
    specialties: ['Heart Surgery', 'Brain Surgery', 'Joint Replacement'],
    emergencyContact: '+91 44 2829 3333',
    rating: 4.8,
    image: '/placeholder.svg',
  },
  {
    id: '2',
    name: 'MIOT International',
    city: 'Chennai',
    address: '4/112, Mount Poonamallee Road, Manapakkam, Chennai - 600089',
    phone: '+91 44 4200 2288',
    email: 'info@miotinternational.com',
    departments: ['Orthopedics', 'Cardiology', 'Gastroenterology', 'Nephrology'],
    specialties: ['Joint Replacement', 'Spine Surgery', 'Cardiac Care'],
    emergencyContact: '+91 44 4200 2200',
    rating: 4.6,
    image: '/placeholder.svg',
  },
  {
    id: '3',
    name: 'Ganga Hospital',
    city: 'Coimbatore',
    address: '313, Mettupalayam Road, Coimbatore - 641043',
    phone: '+91 422 248 5000',
    email: 'info@gangahospital.com',
    departments: ['Orthopedics', 'Trauma Care', 'Plastic Surgery', 'Hand Surgery'],
    specialties: ['Accident Care', 'Reconstructive Surgery', 'Burns Treatment'],
    emergencyContact: '+91 422 248 5111',
    rating: 4.7,
    image: '/placeholder.svg',
  },
  {
    id: '4',
    name: 'PSG Hospitals',
    city: 'Coimbatore',
    address: 'Peelamedu, Coimbatore - 641004',
    phone: '+91 422 257 0170',
    email: 'info@psghospitals.com',
    departments: ['General Medicine', 'Surgery', 'Pediatrics', 'Gynecology', 'ENT'],
    specialties: ['Multi-specialty Care', 'Medical Education', 'Research'],
    emergencyContact: '+91 422 257 3229',
    rating: 4.5,
    image: '/placeholder.svg',
  },
  {
    id: '5',
    name: 'Meenakshi Mission Hospital',
    city: 'Madurai',
    address: 'Lake Area, Melur Road, Madurai - 625107',
    phone: '+91 452 258 8741',
    email: 'info@meenakshimission.com',
    departments: ['Cardiology', 'Neurology', 'Urology', 'Oncology', 'Gastroenterology'],
    specialties: ['Heart Care', 'Cancer Treatment', 'Kidney Transplant'],
    emergencyContact: '+91 452 258 8000',
    rating: 4.6,
    image: '/placeholder.svg',
  },
  {
    id: '6',
    name: 'Vadamalayan Hospital',
    city: 'Madurai',
    address: 'Thallakulam, Madurai - 625002',
    phone: '+91 452 253 5353',
    email: 'info@vadamalayan.com',
    departments: ['General Medicine', 'Surgery', 'Orthopedics', 'Pediatrics'],
    specialties: ['Multi-specialty Care', 'Emergency Services'],
    emergencyContact: '+91 452 253 5300',
    rating: 4.4,
    image: '/placeholder.svg',
  },
];

export const HospitalProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);

  return (
    <HospitalContext.Provider
      value={{
        selectedCity,
        setSelectedCity,
        selectedHospital,
        setSelectedHospital,
        hospitals: mockHospitals,
      }}
    >
      {children}
    </HospitalContext.Provider>
  );
};

export const useHospital = () => {
  const context = useContext(HospitalContext);
  if (!context) {
    throw new Error('useHospital must be used within a HospitalProvider');
  }
  return context;
};
