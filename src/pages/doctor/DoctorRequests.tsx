import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import {
    Clock, Video, Mic, MapPin, Check, X, ChevronDown, Info
} from 'lucide-react';
import { doctorService } from '@/services/doctorService';

const DoctorRequests = () => {
    const [loading, setLoading] = useState(false);
    // Mock Data to match the reference image exactly
    const [requests, setRequests] = useState<any[]>([
        {
            id: 1,
            aptId: '#Apt0001',
            name: 'Adrian',
            image: 'https://i.pravatar.cc/150?u=1',
            date: '11 Nov 2024',
            time: '10.45 AM',
            reason: 'General Visit',
            type: 'Video Call',
            typeIcon: Video,
            isNew: true
        },
        {
            id: 2,
            aptId: '#Apt0002',
            name: 'Kelly',
            image: 'https://i.pravatar.cc/150?u=2',
            date: '10 Nov 2024',
            time: '02.00 PM',
            reason: 'General Visit',
            type: 'Direct Visit',
            typeIcon: MapPin,
            isNew: false
        },
        {
            id: 3,
            aptId: '#Apt0003',
            name: 'Samuel',
            image: 'https://i.pravatar.cc/150?u=3',
            date: '08 Nov 2024',
            time: '08.30 AM',
            reason: 'Consultation for Cardio',
            type: 'Audio Call',
            typeIcon: Mic,
            isNew: false
        },
        {
            id: 4,
            aptId: '#Apt0004',
            name: 'Anderea',
            image: 'https://i.pravatar.cc/150?u=4',
            date: '05 Nov 2024',
            time: '11.00 AM',
            reason: 'Consultation for Dental',
            type: 'Audio Call',
            typeIcon: Mic,
            isNew: false
        },
        {
            id: 5,
            aptId: '#Apt0005',
            name: 'Robert',
            image: 'https://i.pravatar.cc/150?u=5',
            date: '07 Nov 2024',
            time: '11.00 AM',
            reason: 'General Visit',
            type: 'Audio Call',
            typeIcon: Mic,
            isNew: false
        }
    ]);

    const handleAccept = (id: number, name: string) => {
        toast.success(`Accepted request from ${name}`);
        setRequests(requests.filter(req => req.id !== id));
    };

    const handleReject = (id: number, name: string) => {
        toast.error(`Rejected request from ${name}`);
        setRequests(requests.filter(req => req.id !== id));
    };

    return (
        <div className="min-h-screen bg-white p-6 md:p-8 font-sans text-gray-900">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Requests</h1>
                <div className="relative">
                    <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                        Last 7 Days <ChevronDown className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {requests.map((req) => (
                    <Card key={req.id} className="p-4 md:p-6 bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md transition-shadow">
                        <div className="flex flex-col xl:flex-row items-center justify-between gap-6">

                            {/* Patient */}
                            <div className="flex items-center gap-4 w-full xl:w-1/4">
                                <div className="relative">
                                    <img src={req.image} alt={req.name} className="w-12 h-12 rounded-xl object-cover bg-yellow-100" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold text-blue-500 mb-0.5">{req.aptId}</span>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-gray-900 text-base">{req.name}</h3>
                                        {req.isNew && (
                                            <span className="bg-purple-600 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">New</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Date/Time & Reason */}
                            <div className="flex flex-col gap-1 w-full xl:w-1/4">
                                <div className="flex items-center gap-2 text-sm font-bold text-gray-600">
                                    <Clock className="w-4 h-4 text-slate-900" />
                                    <span className="text-slate-900">{req.date}</span>
                                    <span className="font-normal text-gray-500">{req.time}</span>
                                </div>
                                <p className="text-sm font-semibold text-slate-900 pl-6">{req.reason}</p>
                            </div>

                            {/* Type */}
                            <div className="flex flex-col gap-1 w-full xl:w-1/4">
                                <p className="text-sm font-bold text-slate-900">Type of Appointment</p>
                                <div className={`flex items-center gap-2 text-sm font-semibold ${req.type.includes('Video') ? 'text-blue-500' : req.type.includes('Direct') ? 'text-green-600' : 'text-indigo-600'}`}>
                                    <req.typeIcon className="w-4 h-4" />
                                    {req.type}
                                    {req.type.includes('Direct') && <Info className="w-3 h-3 text-slate-900 fill-black ml-1" />}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-6 w-full xl:w-auto mt-4 xl:mt-0 pt-4 xl:pt-0 border-t xl:border-t-0 border-gray-100">
                                <button
                                    onClick={() => handleAccept(req.id, req.name)}
                                    className="flex items-center gap-2 text-sm font-bold text-green-500 hover:text-green-600 transition-colors"
                                >
                                    <Check className="w-4 h-4" />
                                    Accept
                                </button>
                                <div className="h-4 w-px bg-gray-200 hidden xl:block"></div>
                                <button
                                    onClick={() => handleReject(req.id, req.name)}
                                    className="flex items-center gap-2 text-sm font-bold text-red-500 hover:text-red-600 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                    Reject
                                </button>
                            </div>

                        </div>
                    </Card>
                ))}
            </div>

            <div className="flex justify-center mt-8">
                <button
                    onClick={() => toast.info('Load More clicked')}
                    className="px-6 py-2.5 bg-white border border-gray-200 text-slate-900 font-bold rounded-lg text-sm hover:bg-gray-50 transition-colors shadow-sm"
                >
                    Load More
                </button>
            </div>
        </div>
    );
};

export default DoctorRequests;
