import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Clock } from 'lucide-react';

const DoctorTimings = () => {
    const [activeTab, setActiveTab] = useState<'general' | 'clinic'>('general');
    const [selectedDay, setSelectedDay] = useState<string>('Monday');
    const [fees, setFees] = useState<string>('254');

    // Mock state for slots - In real app, fetching from API
    const [schedule, setSchedule] = useState<Record<string, string[]>>({
        'Monday': ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM'],
        'Tuesday': ['09:00 AM', '11:00 AM'],
        'Wednesday': ['02:00 PM', '04:00 PM'],
        'Thursday': [],
        'Friday': ['10:00 AM'],
        'Saturday': ['09:00 AM', '12:00 PM'],
        'Sunday': []
    });

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const handleAddSlot = () => {
        // For now, just adding a dummy slot for demonstration
        const newSlot = '12:00 PM';
        if (!schedule[selectedDay].includes(newSlot)) {
            setSchedule(prev => ({
                ...prev,
                [selectedDay]: [...prev[selectedDay], newSlot].sort()
            }));
            toast.success(`Slot added to ${selectedDay}`);
        } else {
            toast.error('Slot already exists');
        }
    };

    const handleDeleteAll = () => {
        setSchedule(prev => ({
            ...prev,
            [selectedDay]: []
        }));
        toast.success(`All slots deleted for ${selectedDay}`);
    };

    const handleSave = () => {
        toast.success('Schedule and fees saved successfully!');
        console.log({ schedule, fees });
    };

    return (
        <div className="min-h-screen bg-white p-6 md:p-8 font-sans text-gray-900">
            <h1 className="text-2xl font-bold text-slate-900 mb-6">Available Timings</h1>

            {/* Tabs */}
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => setActiveTab('general')}
                    className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'general'
                            ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                            : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                >
                    General Availability
                </button>
                <button
                    onClick={() => setActiveTab('clinic')}
                    className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'clinic'
                            ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                            : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                >
                    Clinic Availability
                </button>
            </div>

            <Card className="p-6 md:p-8 border border-gray-200 shadow-sm rounded-xl">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Select Available Slots</h2>

                {/* Day Selection */}
                <div className="mb-8">
                    <p className="text-sm font-medium text-gray-600 mb-3">Select Available days</p>
                    <div className="flex flex-wrap gap-3">
                        {days.map((day) => (
                            <button
                                key={day}
                                onClick={() => setSelectedDay(day)}
                                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${selectedDay === day
                                        ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                                        : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                {day}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Slots Area */}
                <div className="border border-gray-200 rounded-xl p-6 mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-gray-900">{selectedDay}</h3>
                        <div className="flex gap-4 text-sm font-semibold">
                            <button
                                onClick={handleAddSlot}
                                className="text-blue-600 hover:underline"
                            >
                                Add Slots
                            </button>
                            <button
                                onClick={handleDeleteAll}
                                className="text-red-500 hover:underline"
                            >
                                Delete All
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        {schedule[selectedDay]?.length > 0 ? (
                            schedule[selectedDay].map((slot, index) => (
                                <div key={index} className="flex items-center gap-2 bg-gray-100 px-4 py-2.5 rounded-lg text-sm font-semibold text-gray-700">
                                    <Clock className="w-4 h-4 text-gray-500" />
                                    {slot}
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-400 italic">No slots available for this day.</p>
                        )}
                    </div>
                </div>

                {/* Fees Input */}
                <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-600 mb-2">Appointment Fees ($)</label>
                    <Input
                        value={fees}
                        onChange={(e) => setFees(e.target.value)}
                        className="max-w-full h-12 text-base"
                    />
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                    <button className="px-6 py-2.5 rounded-full text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors">
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-6 py-2.5 rounded-full text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-200 transition-colors"
                    >
                        Save Changes
                    </button>
                </div>

            </Card>
        </div>
    );
};

export default DoctorTimings;
