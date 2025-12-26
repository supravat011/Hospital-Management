import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Calendar, Activity, Heart, Thermometer, Scale, Link as LinkIcon, Edit2, Trash2 } from 'lucide-react';
import PatientSidebar from '@/components/PatientSidebar';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AddVitalsModal from '@/components/modals/AddVitalsModal';

const PatientVitals = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);

    const VITALS_HISTORY = [
        {
            id: '#MD1236',
            patient: { name: 'Hendrita Kearns', image: 'https://randomuser.me/api/portraits/women/11.jpg' },
            bmi: '23.5',
            heartRate: '89',
            fbcStatus: '140',
            weight: '74Kg',
            addedOn: '22 Mar 2024'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Shared Sidebar */}
            <PatientSidebar activeSection="Vitals" />

            {/* Main Content */}
            <main className="flex-1 p-4 lg:p-8 overflow-y-auto page-transition">
                <div className="max-w-6xl mx-auto space-y-8">

                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <h1 className="text-2xl font-bold text-slate-900">Vitals</h1>
                    </div>

                    {/* Latest Vitals Card */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-b border-gray-100">
                            <h3 className="font-semibold text-gray-900 text-lg">Latest Updated Vitals</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Calendar className="w-4 h-4" />
                                <span>Last update on : 24Mar 2023</span>
                            </div>
                        </div>

                        <div className="p-6 md:p-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">

                            {/* Blood Pressure */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                                    <Activity className="w-4 h-4 text-red-500" />
                                    Blood Pressure
                                </div>
                                <div className="text-xl font-bold text-slate-900">100 mg/dl</div>
                            </div>

                            {/* Heart Rate */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                                    <Heart className="w-4 h-4 text-orange-500" />
                                    Heart Rate
                                </div>
                                <div className="text-xl font-bold text-slate-900">140 Bpm</div>
                            </div>

                            {/* Glucose Level */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                                    <Activity className="w-4 h-4 text-blue-500" />
                                    Glucose Level
                                </div>
                                <div className="text-xl font-bold text-slate-900">70 - 90</div>
                            </div>

                            {/* Body Temperature */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                                    <Thermometer className="w-4 h-4 text-yellow-500" />
                                    Body Temprature
                                </div>
                                <div className="text-xl font-bold text-slate-900">37.5 C</div>
                            </div>

                            {/* BMI */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                                    <Scale className="w-4 h-4 text-purple-500" />
                                    BMI
                                </div>
                                <div className="text-xl font-bold text-slate-900">20.1 kg/m2</div>
                            </div>

                            {/* SP02 */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                                    <Activity className="w-4 h-4 text-indigo-500" />
                                    SP02
                                </div>
                                <div className="text-xl font-bold text-slate-900">96%</div>
                            </div>

                        </div>
                    </div>

                    {/* Controls Row */}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="relative w-full sm:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                                placeholder="Search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-9 bg-white border-gray-200"
                            />
                        </div>
                        <Button
                            className="bg-[#009ef7] hover:bg-[#008bd9] text-white rounded-full px-6"
                            onClick={() => setShowAddModal(true)}
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Vitals
                        </Button>
                    </div>

                    {/* Vitals History Table */}
                    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-[#e9ecef]">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">ID</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Patient Name</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">BMI</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Heart Rate</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">FBC Status</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Weight</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Added on</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {VITALS_HISTORY.map((record) => (
                                        <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-500">
                                                {record.id}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="w-8 h-8 rounded-lg">
                                                        <AvatarImage src={record.patient.image} />
                                                        <AvatarFallback>HK</AvatarFallback>
                                                    </Avatar>
                                                    <span className="text-sm font-medium text-gray-900">{record.patient.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {record.bmi}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {record.heartRate}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {record.fbcStatus}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {record.weight}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {record.addedOn}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors border border-gray-200">
                                                        <LinkIcon className="w-3.5 h-3.5" />
                                                    </button>
                                                    <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors border border-gray-200">
                                                        <Edit2 className="w-3.5 h-3.5" />
                                                    </button>
                                                    <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors border border-gray-200">
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </main>

            {/* Modals */}
            <AddVitalsModal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSuccess={() => {
                    setShowAddModal(false);
                    // Refresh vitals list
                }}
            />
        </div>
    );
};

export default PatientVitals;
