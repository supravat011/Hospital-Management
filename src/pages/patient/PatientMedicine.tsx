import React, { useState } from 'react';
import PatientSidebar from '@/components/PatientSidebar';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Pill, Clock, Calendar, AlertCircle, MapPin, UserMd } from 'lucide-react';

const PatientMedicine = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState<'current' | 'past'>('current');

    // Mock data with hospital/clinic info
    const currentMedicines = [
        {
            id: 1,
            name: 'Amoxicillin',
            dosage: '500mg',
            frequency: '3 times daily',
            duration: '7 days',
            prescribedBy: 'Dr. John Smith',
            hospitalName: 'General Hospital',
            prescribedDate: '2024-03-20',
            startDate: '2024-03-20',
            endDate: '2024-03-27',
            instructions: 'Take with food to avoid stomach upset',
            status: 'active'
        },
        {
            id: 2,
            name: 'Metformin',
            dosage: '500mg',
            frequency: 'Twice daily',
            duration: 'Ongoing',
            prescribedBy: 'Dr. Emily Chen',
            hospitalName: 'City Care Clinic',
            prescribedDate: '2024-02-15',
            startDate: '2024-02-15',
            endDate: '2024-08-15',
            instructions: 'Take with evening meal',
            status: 'active'
        },
        {
            id: 3,
            name: 'Lisinopril',
            dosage: '10mg',
            frequency: 'Once daily',
            duration: '90 days',
            prescribedBy: 'Dr. Sarah Johnson',
            hospitalName: 'Family Health Center',
            prescribedDate: '2024-03-10',
            startDate: '2024-03-10',
            endDate: '2024-06-08',
            instructions: 'Take in the morning',
            status: 'active'
        },
        {
            id: 4,
            name: 'Atorvastatin',
            dosage: '20mg',
            frequency: 'Once at night',
            duration: 'Ongoing',
            prescribedBy: 'Dr. Michael Brown',
            hospitalName: 'Heart Institute',
            prescribedDate: '2024-01-05',
            startDate: '2024-01-05',
            endDate: '2025-01-05',
            instructions: 'Avoid grapefruit juice',
            status: 'active'
        },
        {
            id: 5,
            name: 'Levothyroxine',
            dosage: '50mcg',
            frequency: 'Once daily',
            duration: 'Ongoing',
            prescribedBy: 'Dr. David Lee',
            hospitalName: 'Endocrine Specialists',
            prescribedDate: '2023-11-20',
            startDate: '2023-11-20',
            endDate: '2024-11-20',
            instructions: 'Take 30 mins before breakfast on empty stomach',
            status: 'active'
        }
    ];

    const pastMedicines = [
        {
            id: 6,
            name: 'Azithromycin',
            dosage: '250mg',
            frequency: 'Once daily',
            duration: '5 days',
            prescribedBy: 'Dr. John Smith',
            hospitalName: 'General Hospital',
            prescribedDate: '2024-02-10',
            startDate: '2024-02-10',
            endDate: '2024-02-15',
            instructions: 'Take on empty stomach',
            status: 'completed'
        },
        {
            id: 7,
            name: 'Ibuprofen',
            dosage: '400mg',
            frequency: 'As needed',
            duration: '14 days',
            prescribedBy: 'Dr. Sarah Johnson',
            hospitalName: 'Family Health Center',
            prescribedDate: '2024-01-15',
            startDate: '2024-01-15',
            endDate: '2024-01-29',
            instructions: 'Take with food for pain',
            status: 'completed'
        },
        {
            id: 8,
            name: 'Prednisone',
            dosage: '10mg',
            frequency: 'Once daily',
            duration: '5 days',
            prescribedBy: 'Dr. Jessica Williams',
            hospitalName: 'Community Hospital',
            prescribedDate: '2023-12-01',
            startDate: '2023-12-01',
            endDate: '2023-12-06',
            instructions: 'Take with food in the morning',
            status: 'completed'
        }
    ];

    const medicines = activeTab === 'current' ? currentMedicines : pastMedicines;

    const filteredMedicines = medicines.filter(med =>
        med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.prescribedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.hospitalName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex min-h-screen bg-gray-50">
            <PatientSidebar activeSection="Medicine" />

            <div className="flex-1 p-6 md:p-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">My Medications</h1>
                    <p className="text-gray-600">Track your current prescriptions and medication history</p>
                </div>

                {/* Search Bar */}
                <div className="mb-6">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                            placeholder="Search by medicine, doctor, or hospital..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 h-12 rounded-lg border-gray-200 bg-white shadow-sm focus:ring-2 focus:ring-blue-100 transition-all"
                        />
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-8 border-b border-gray-200">
                    <button
                        onClick={() => setActiveTab('current')}
                        className={`px-6 py-3 font-semibold text-sm transition-all relative ${activeTab === 'current'
                                ? 'text-blue-600'
                                : 'text-gray-500 hover:text-gray-900'
                            }`}
                    >
                        Current Prescriptions
                        {activeTab === 'current' && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full"></div>
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('past')}
                        className={`px-6 py-3 font-semibold text-sm transition-all relative ${activeTab === 'past'
                                ? 'text-blue-600'
                                : 'text-gray-500 hover:text-gray-900'
                            }`}
                    >
                        Past Medications
                        {activeTab === 'past' && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full"></div>
                        )}
                    </button>
                </div>

                {/* Medicine Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredMedicines.length > 0 ? (
                        filteredMedicines.map((medicine) => (
                            <Card key={medicine.id} className="hover:shadow-xl transition-shadow border-gray-100 overflow-hidden group">
                                <CardContent className="p-0">
                                    {/* Card Header with Status */}
                                    <div className={`px-6 py-4 flex items-center justify-between ${medicine.status === 'active' ? 'bg-blue-50/50' : 'bg-gray-50'
                                        }`}>
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${medicine.status === 'active' ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-500'
                                                }`}>
                                                <Pill className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900 leading-tight">{medicine.name}</h3>
                                                <p className="text-sm font-medium text-gray-500">{medicine.dosage}</p>
                                            </div>
                                        </div>
                                        <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wide rounded-full ${medicine.status === 'active'
                                                ? 'bg-blue-100 text-blue-700'
                                                : 'bg-gray-200 text-gray-600'
                                            }`}>
                                            {medicine.status}
                                        </span>
                                    </div>

                                    <div className="p-6">
                                        {/* Prescriber Info */}
                                        <div className="flex items-start gap-4 mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-gray-100 shadow-sm text-gray-400">
                                                <UserMd className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900">{medicine.prescribedBy}</p>
                                                <div className="flex items-center gap-1.5 mt-0.5 text-xs text-gray-500">
                                                    <MapPin className="w-3 h-3" />
                                                    <span>{medicine.hospitalName}</span>
                                                </div>
                                            </div>
                                            <div className="ml-auto text-right">
                                                <p className="text-xs text-gray-400">Prescribed</p>
                                                <p className="text-xs font-medium text-gray-700">
                                                    {new Date(medicine.prescribedDate).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Details Grid */}
                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <div className="flex items-center gap-2 text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
                                                    <Clock className="w-3 h-3" /> Frequency
                                                </div>
                                                <p className="text-sm font-semibold text-gray-700">{medicine.frequency}</p>
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
                                                    <Calendar className="w-3 h-3" /> Duration
                                                </div>
                                                <p className="text-sm font-semibold text-gray-700">{medicine.duration}</p>
                                            </div>
                                        </div>

                                        {/* Instructions */}
                                        <div className="pt-4 border-t border-gray-100">
                                            <div className="flex items-start gap-2">
                                                <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                                                <div>
                                                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Instructions</span>
                                                    <p className="text-sm font-medium text-gray-800 mt-0.5">{medicine.instructions}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Footer with Date Range */}
                                    {medicine.status === 'active' && (
                                        <div className="px-6 py-3 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                                            <span>Start: <span className="font-semibold text-gray-700">{new Date(medicine.startDate).toLocaleDateString()}</span></span>
                                            <span>End: <span className="font-semibold text-gray-700">{new Date(medicine.endDate).toLocaleDateString()}</span></span>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <div className="col-span-full py-16 flex flex-col items-center justify-center text-center bg-white rounded-xl border border-dashed border-gray-200">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                <Pill className="w-8 h-8 text-gray-300" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">No medicines found</h3>
                            <p className="text-gray-500 max-w-xs mx-auto">
                                We couldn't find any medications matching your search criteria.
                            </p>
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-700"
                                >
                                    Clear Search
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PatientMedicine;
