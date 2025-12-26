import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Edit2, Trash2, User } from 'lucide-react';
import PatientSidebar from '@/components/PatientSidebar';
import { Switch } from '@/components/ui/switch';
import AddDependantModal from '@/components/modals/AddDependantModal';
import ConfirmDialog from '@/components/modals/ConfirmDialog';
import { patientService } from '@/services/patientService';
import { toast } from 'sonner';

const PatientDependants = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [selectedDependant, setSelectedDependant] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Mock Data based on the design mockup
    const [dependants, setDependants] = useState([
        {
            id: 1,
            name: 'Laura',
            relation: 'Mother',
            gender: 'Female',
            age: '58 Years 20 Days',
            bloodGroup: 'AB+ve',
            image: 'https://randomuser.me/api/portraits/women/11.jpg',
            active: true
        },
        {
            id: 2,
            name: 'Mathew',
            relation: 'Father',
            gender: 'Male',
            age: '59 Years 15 Days',
            bloodGroup: 'AB+ve',
            image: 'https://randomuser.me/api/portraits/men/11.jpg',
            active: true
        },
        {
            id: 3,
            name: 'Christopher',
            relation: 'Brother',
            gender: 'Male',
            age: '32 Years 6 Months',
            bloodGroup: 'A+ve',
            image: 'https://randomuser.me/api/portraits/men/32.jpg',
            active: true
        },
        {
            id: 4,
            name: 'Elisa',
            relation: 'Sister',
            gender: 'Female',
            age: '28 Years 4 Months',
            bloodGroup: 'B+ve',
            image: 'https://randomuser.me/api/portraits/women/28.jpg',
            active: false
        }
    ]);

    useEffect(() => {
        fetchDependants();
    }, []);

    const fetchDependants = async () => {
        try {
            const response = await patientService.getDependants();
            if (response.data && response.data.length > 0) {
                setDependants(response.data);
            }
        } catch (error) {
            console.error('Failed to fetch dependants', error);
        } finally {
            setLoading(false);
        }
    };

    const handleToggle = (id: number) => {
        setDependants(dependants.map(dep =>
            dep.id === id ? { ...dep, active: !dep.active } : dep
        ));
    };

    const handleDelete = async () => {
        if (!selectedDependant) return;

        try {
            await patientService.deleteDependant(selectedDependant.id);
            setDependants(dependants.filter(dep => dep.id !== selectedDependant.id));
            toast.success('Dependant removed successfully');
        } catch (error) {
            toast.error('Failed to remove dependant');
        }
    };

    const filteredDependants = dependants.filter(dep =>
        dep.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Shared Sidebar */}
            <PatientSidebar activeSection="Dependants" />

            {/* Main Content */}
            <main className="flex-1 p-4 lg:p-8 overflow-y-auto page-transition">
                <div className="max-w-5xl mx-auto">
                    {/* Header Title */}
                    <h1 className="text-2xl font-bold text-slate-900 mb-6">Dependants</h1>

                    {/* Controls Row */}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
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
                            Add Dependants
                        </Button>
                    </div>

                    {/* Dependants List */}
                    <div className="space-y-4">
                        {filteredDependants.map((dep) => (
                            <div key={dep.id} className="bg-white rounded-xl border border-gray-100 p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-6 shadow-sm hover:shadow-md transition-shadow">
                                {/* Avatar */}
                                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                                    <img
                                        src={dep.image}
                                        alt={dep.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Info */}
                                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full text-center sm:text-left">
                                    <div className="space-y-1">
                                        <h3 className="text-lg font-bold text-slate-900">{dep.name}</h3>
                                        <div className="text-sm text-gray-500 flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                                            <span>{dep.relation}</span>
                                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                            <span>{dep.gender}</span>
                                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                            <span>{dep.age}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col justify-center sm:items-start">
                                        <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">Blood Group</span>
                                        <span className="font-bold text-slate-900">{dep.bloodGroup}</span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-4 border-t sm:border-t-0 border-gray-100 pt-4 sm:pt-0 w-full sm:w-auto justify-center sm:justify-end">
                                    <Switch
                                        checked={dep.active}
                                        onCheckedChange={() => handleToggle(dep.id)}
                                        className="data-[state=checked]:bg-green-500"
                                    />

                                    <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                                        <Edit2 className="w-4 h-4" />
                                    </button>

                                    <button
                                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        onClick={() => {
                                            setSelectedDependant(dep);
                                            setShowDeleteDialog(true);
                                        }}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Modals */}
            <AddDependantModal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSuccess={fetchDependants}
            />

            <ConfirmDialog
                isOpen={showDeleteDialog}
                onClose={() => setShowDeleteDialog(false)}
                onConfirm={handleDelete}
                title="Remove Dependant"
                message={`Are you sure you want to remove ${selectedDependant?.name}? This action cannot be undone.`}
                confirmText="Remove"
                variant="danger"
            />
        </div>
    );
};

export default PatientDependants;
