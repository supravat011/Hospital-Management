import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button'; // Assuming Button is available
import { Search, Filter, Calendar, MapPin, Clock } from 'lucide-react';

const DoctorPatients = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'active' | 'inactive'>('active');

    // Mock Data to match reference image exactly
    const patients = [
        {
            id: '#Apt0001',
            name: 'Adrian',
            image: 'https://i.pravatar.cc/150?u=1',
            age: 42,
            gender: 'Male',
            bloodGroup: 'AB+',
            date: '11 Nov 2024',
            time: '10.45 AM',
            location: 'Alabama, USA',
            lastBooking: '27 Feb 2024',
            bg: 'bg-yellow-100'
        },
        {
            id: '#Apt0002',
            name: 'Kelly Stevens',
            image: 'https://i.pravatar.cc/150?u=2',
            age: 37,
            gender: 'Female',
            bloodGroup: 'O+',
            date: '05 Nov 2024',
            time: '11.50 AM',
            location: 'San Diego, USA',
            lastBooking: '20 Mar 2024',
            bg: 'bg-blue-100'
        },
        {
            id: '#Apt0003',
            name: 'Samuel James',
            image: 'https://i.pravatar.cc/150?u=3',
            age: 43,
            gender: 'Male',
            bloodGroup: 'B+',
            date: '27 Oct 2024',
            time: '09.30 AM',
            location: 'Chicago, USA',
            lastBooking: '12 Mar 2024',
            bg: 'bg-orange-100'
        },
        {
            id: '#Apt0004',
            name: 'Catherine Gracey',
            image: 'https://i.pravatar.cc/150?u=4',
            age: 36,
            gender: 'Female',
            bloodGroup: 'AB-',
            date: '18 Oct 2024',
            time: '12.20 PM',
            location: 'Los Angeles, USA',
            lastBooking: '27 Feb 2024',
            bg: 'bg-pink-100'
        },
        {
            id: '#Apt0005',
            name: 'Robert Miller',
            image: 'https://i.pravatar.cc/150?u=5',
            age: 38,
            gender: 'Male',
            bloodGroup: 'A+',
            date: '10 Oct 2024',
            time: '11.30 AM',
            location: 'Dallas, USA',
            lastBooking: '18 Feb 2024',
            bg: 'bg-green-100'
        },
        {
            id: '#Apt0006',
            name: 'Anderea Kearns',
            image: 'https://i.pravatar.cc/150?u=6',
            age: 40,
            gender: 'Female',
            bloodGroup: 'B-',
            date: '26 Sep 2024',
            time: '10.20 AM',
            location: 'San Francisco, USA',
            lastBooking: '11 Feb 2024',
            bg: 'bg-gray-200'
        },
        {
            id: '#Apt0007',
            name: 'Peter Anderson',
            image: 'https://i.pravatar.cc/150?u=7',
            age: 30,
            gender: 'Male',
            bloodGroup: 'A-',
            date: '14 Sep 2024',
            time: '08.10 AM',
            location: 'Austin, USA',
            lastBooking: '25 Jan 2024',
            bg: 'bg-red-100'
        },
        {
            id: '#Apt0008',
            name: 'Emily Musick',
            image: 'https://i.pravatar.cc/150?u=8',
            age: 32,
            gender: 'Female',
            bloodGroup: 'O-',
            date: '03 Sep 2024',
            time: '06.00 PM',
            location: 'Nashville, USA',
            lastBooking: '13 Jan 2024',
            bg: 'bg-yellow-200'
        },
        {
            id: '#Apt0009',
            name: 'Darrell Tan',
            image: 'https://i.pravatar.cc/150?u=9',
            age: 31,
            gender: 'Male',
            bloodGroup: 'AB+',
            date: '25 Aug 2024',
            time: '10.45 AM',
            location: 'San Antonio, USA',
            lastBooking: '03 Jan 2024',
            bg: 'bg-lime-100'
        }
    ];

    return (
        <div className="min-h-screen bg-white p-6 md:p-8 font-sans text-gray-900">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
                <h1 className="text-2xl font-bold text-slate-900">My Patients</h1>

                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                        placeholder="Search"
                        className="pl-9 h-10 rounded-lg border-gray-200 bg-white"
                    />
                </div>
            </div>

            {/* Filters Row */}
            <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setActiveTab('active')}
                        className={`px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'active'
                                ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        Active
                        <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${activeTab === 'active' ? 'bg-white text-blue-600' : 'bg-white text-gray-600'
                            }`}>200</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('inactive')}
                        className={`px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'inactive'
                                ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        InActive
                        <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${activeTab === 'inactive' ? 'bg-white text-blue-600' : 'bg-white text-gray-600'
                            }`}>22</span>
                    </button>
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
                    <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 min-w-[200px]">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>12/20/2025 - 12/26/2025</span>
                    </div>
                    <button className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">
                        <Filter className="w-4 h-4" />
                        Filter By
                    </button>
                </div>
            </div>

            {/* Patients Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {patients.map((patient, index) => (
                    <Card key={index} className="p-5 bg-white border border-blue-50/50 shadow-sm hover:shadow-md transition-shadow rounded-2xl flex flex-col gap-4">
                        {/* Card Header */}
                        <div className="flex items-start gap-4">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center overflow-hidden flex-shrink-0 ${patient.bg}`}>
                                <img src={patient.image} alt={patient.name} className="w-full h-full object-cover mix-blend-multiply" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-bold text-blue-500 mb-0.5">{patient.id}</p>
                                <h3 className="font-bold text-gray-900 text-base mb-1 truncate">{patient.name}</h3>
                                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium whitespace-nowrap">
                                    <span>Age : {patient.age}</span>
                                    <span className="w-px h-3 bg-slate-300"></span>
                                    <span>{patient.gender}</span>
                                    <span className="w-px h-3 bg-slate-300"></span>
                                    <span>{patient.bloodGroup}</span>
                                </div>
                            </div>
                        </div>

                        {/* Card Content - Blue Box */}
                        <div className="bg-slate-50/80 rounded-xl p-4 space-y-2">
                            <div className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                                <Clock className="w-4 h-4 text-slate-900" />
                                {patient.date} <span className="text-slate-500 font-normal">{patient.time}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                                <MapPin className="w-4 h-4 text-slate-900" />
                                <span className="text-slate-500 font-normal">{patient.location}</span>
                            </div>
                        </div>

                        {/* Card Footer */}
                        <div className="border-t border-gray-100 pt-4 mt-auto">
                            <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                                <Calendar className="w-3.5 h-3.5" />
                                Last Booking <span className="text-gray-600">{patient.lastBooking}</span>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="flex justify-center mt-10">
                <button className="px-6 py-2.5 bg-white border border-gray-200 text-slate-900 font-bold rounded-lg text-sm hover:bg-gray-50 transition-colors shadow-sm">
                    Load More
                </button>
            </div>
        </div>
    );
};

export default DoctorPatients;
