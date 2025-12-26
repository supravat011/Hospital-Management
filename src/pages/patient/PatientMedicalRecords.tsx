import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Link as LinkIcon, Edit2, Trash2, Download } from 'lucide-react';
import PatientSidebar from '@/components/PatientSidebar';
import { cn } from '@/lib/utils';
import AddMedicalRecordModal from '@/components/modals/AddMedicalRecordModal';
import ConfirmDialog from '@/components/modals/ConfirmDialog';
import { toast } from 'sonner';

const PatientMedicalRecords = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState<'records' | 'prescriptions'>('records');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState<any>(null);

    // Mock Data based on the mockup
    const RECORDS = [
        {
            id: '#MR1236',
            name: 'Electro cardiography',
            date: '24 Mar 2024',
            for: { name: 'Hendrita Clark', image: 'https://randomuser.me/api/portraits/women/11.jpg' },
            comments: 'Take Good Rest'
        },
        {
            id: '#MR3656',
            name: 'Complete Blood Count',
            date: '27 Mar 2024',
            for: { name: 'Laura Stewart', image: 'https://randomuser.me/api/portraits/men/11.jpg' },
            comments: 'Stable, no change'
        },
        {
            id: '#MR1246',
            name: 'Blood Glucose Test',
            date: '10 Apr 2024',
            for: { name: 'Mathew Charles', image: 'https://randomuser.me/api/portraits/women/32.jpg' },
            comments: 'All Clear'
        },
        {
            id: '#MR6985',
            name: 'Liver Function Tests',
            date: '19 Apr 2024',
            for: { name: 'Christopher Joseph', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
            comments: 'Stable, no change'
        },
        {
            id: '#MR3659',
            name: 'Blood Cultures',
            date: '27 Apr 2024',
            for: { name: 'Elisa Salcedo', image: 'https://randomuser.me/api/portraits/women/28.jpg' },
            comments: 'Take Good Rest'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Shared Sidebar */}
            <PatientSidebar activeSection="Medical Records" />

            {/* Main Content */}
            <main className="flex-1 p-4 lg:p-8 overflow-y-auto page-transition">
                <div className="max-w-6xl mx-auto">

                    {/* Header & Tabs */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                        <h1 className="text-2xl font-bold text-slate-900">Records</h1>

                        <div className="flex bg-gray-100 p-1 rounded-lg">
                            <button
                                onClick={() => setActiveTab('records')}
                                className={cn(
                                    "px-4 py-2 text-sm font-medium rounded-md transition-all",
                                    activeTab === 'records' ? "bg-blue-600 text-white shadow-sm" : "text-gray-600 hover:text-gray-900"
                                )}
                            >
                                Medical Records
                            </button>
                            <button
                                onClick={() => setActiveTab('prescriptions')}
                                className={cn(
                                    "px-4 py-2 text-sm font-medium rounded-md transition-all",
                                    activeTab === 'prescriptions' ? "bg-blue-600 text-white shadow-sm" : "text-gray-600 hover:text-gray-900"
                                )}
                            >
                                Prescriptions
                            </button>
                        </div>
                    </div>

                    {/* Controls Row */}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 border-t border-gray-100 pt-6">
                        <div className="relative w-full sm:w-72">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                                placeholder="Search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-9 bg-white border-gray-200"
                            />
                        </div>
                        <Button
                            className="bg-[#009ef7] hover:bg-[#008bd9] text-white"
                            onClick={() => setShowAddModal(true)}
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Medical Record
                        </Button>
                    </div>

                    {/* Records Table */}
                    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-[#e9ecef]">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">ID</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Record For</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Comments</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {RECORDS.map((record) => (
                                        <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-500">
                                                {record.id}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {record.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {record.date}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={record.for.image}
                                                        alt={record.for.name}
                                                        className="w-8 h-8 rounded-lg object-cover"
                                                    />
                                                    <span className="text-sm text-gray-900">{record.for.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {record.comments}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors border border-gray-200">
                                                        <LinkIcon className="w-3.5 h-3.5" />
                                                    </button>
                                                    <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors border border-gray-200">
                                                        <Edit2 className="w-3.5 h-3.5" />
                                                    </button>
                                                    <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors border border-gray-200">
                                                        <Download className="w-3.5 h-3.5" />
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

                    {/* Pagination */}
                    <div className="flex justify-center mt-8 gap-2">
                        <Button variant="outline" size="sm" className="h-8 text-xs">Prev</Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-xs text-gray-600">1</Button>
                        <Button variant="default" size="sm" className="h-8 w-8 p-0 text-xs bg-blue-600 text-white">2</Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-xs text-gray-600">3</Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-xs text-gray-600">4</Button>
                        <Button variant="outline" size="sm" className="h-8 text-xs">Next</Button>
                    </div>

                </div>
            </main>

            {/* Modals */}
            <AddMedicalRecordModal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSuccess={() => {
                    setShowAddModal(false);
                    toast.success('Medical record added successfully');
                }}
            />

            <ConfirmDialog
                isOpen={showDeleteDialog}
                onClose={() => setShowDeleteDialog(false)}
                onConfirm={() => {
                    toast.success('Record deleted successfully');
                }}
                title="Delete Medical Record"
                message={`Are you sure you want to delete this record? This action cannot be undone.`}
                confirmText="Delete"
                variant="danger"
            />
        </div>
    );
};

export default PatientMedicalRecords;
