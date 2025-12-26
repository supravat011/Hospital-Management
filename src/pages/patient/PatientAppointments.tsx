import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { patientService } from '@/services/patientService';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import {
    LayoutDashboard, Users, CreditCard, Receipt, MessageSquare,
    Activity, Settings, Calendar, Heart, FileText,
    LogOut, User, Video, Phone, Mail, Clock, MapPin, Eye,
    Home, ChevronRight, Download
} from 'lucide-react';
import PatientSidebar from '@/components/PatientSidebar';

const PatientAppointments = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [profile, setProfile] = useState<any>(null);
    const [visits, setVisits] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [profileData, visitsData] = await Promise.all([
                patientService.getProfile(),
                patientService.getVisitHistory()
            ]);
            setProfile(profileData.data);
            setVisits(visitsData.data);
        } catch (error: any) {
            toast.error('Failed to load appointments');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
        toast.success('Logged out successfully');
    };

    // Mock data matching the design exactly for fallback
    const MOCK_VISITS = [
        {
            _id: 'mock1',
            visitId: 'Apt0001',
            doctorName: 'Dr Edalin Hendry',
            visitDate: '2023-07-22T12:00:00',
            status: 'Reschedule',
            type: 'Video Call',
            fees: '$200',
            patientName: 'Andrew',
            doctorEmail: 'edalin@Example.Com',
            doctorPhone: '+1 504 368 6874',
            doctorImg: 'https://randomuser.me/api/portraits/men/32.jpg'
        },
        {
            _id: 'mock2',
            visitId: 'Apt0001',
            doctorName: 'Dr Edalin Hendry',
            visitDate: '2023-07-22T12:00:00',
            status: 'Completed',
            type: 'Video Call',
            fees: '$200',
            patientName: 'Andrew',
            doctorEmail: 'edalin@Example.Com',
            doctorPhone: '+1 504 368 6874',
            doctorImg: 'https://randomuser.me/api/portraits/men/32.jpg'
        }
    ];

    const MOCK_RECENT = [
        {
            visitId: 'Apt0002',
            doctorName: 'Dr.Shanta Nesmith',
            visitDate: '2024-11-11T10:45:00',
            email: 'shanta@example.com',
            phone: '+1 504 368 6874',
            img: 'https://randomuser.me/api/portraits/women/44.jpg',
            type: 'General Visit',
            mode: 'Chat'
        },
        {
            visitId: 'Apt0003',
            doctorName: 'Dr.John Ewel',
            visitDate: '2024-10-27T09:30:00',
            email: 'john@example.com',
            phone: '+1 749 104 6291',
            img: 'https://randomuser.me/api/portraits/men/45.jpg',
            type: 'General Visit',
            mode: 'Video Call'
        }
    ];

    // Use visits if available, otherwise use mock data for design showcase
    const displayVisits = visits.length > 0 ? visits : MOCK_VISITS;
    const displayRecent = visits.length > 0 ? visits.slice(0, 3) : MOCK_RECENT;

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Shared Sidebar */}
            <PatientSidebar />


            {/* Main Content */}
            <main className="flex-1 p-4 lg:p-8 overflow-y-auto page-transition">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-gray-900">My Appointments</h1>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate('/')}
                            className="flex items-center gap-2"
                        >
                            <Home className="w-4 h-4" />
                            Back to Home
                        </Button>
                    </div>

                    {/* Active/Cards Section */}
                    <div className="space-y-6">
                        {loading ? (
                            <p className="text-gray-500">Loading appointments...</p>
                        ) : displayVisits.length > 0 ? (
                            displayVisits.map((visit: any, index: number) => {
                                const visitDate = new Date(visit.visitDate);
                                // Logic for status and styling
                                const status = visit.status || (index === 0 ? 'Reschedule' : 'Completed'); // Use mock or default
                                const isReschedule = status === 'Reschedule';
                                const statusColor = isReschedule ? 'bg-red-600' : 'bg-green-500';
                                const statusLabel = isReschedule ? 'Cancelled' : 'Completed'; // As per design Cancelled is red

                                return (
                                    <div key={visit._id || index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                        {/* Top Section */}
                                        <div className="flex flex-col md:flex-row justify-between gap-6 mb-6">
                                            {/* Doctor Info */}
                                            <div className="flex gap-4">
                                                <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                                                    <img
                                                        src={visit.doctorImg || "https://randomuser.me/api/portraits/men/32.jpg"}
                                                        alt="Doctor"
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <div className="text-blue-500 text-sm font-medium">#{visit.visitId}</div>
                                                    <h3 className="text-lg font-bold text-gray-900">{visit.doctorName}</h3>
                                                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                                                        <Mail className="w-3 h-3" />
                                                        {visit.doctorEmail || visit.doctorId?.email || 'email@example.com'}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                                                        <Phone className="w-3 h-3" />
                                                        {visit.doctorPhone || '+1 504 368 6874'}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Patient Info */}
                                            <div className="space-y-1">
                                                <p className="text-sm text-gray-500">Person with patient</p>
                                                <p className="font-semibold text-gray-900">{visit.patientName || profile?.name || 'Andrew'}</p>
                                                <p className="text-sm text-gray-500 mt-2">Type of Appointment</p>
                                                <div className="flex items-center gap-2 text-blue-600 font-medium text-sm">
                                                    <Video className="w-4 h-4" />
                                                    {visit.type || 'Video Call'}
                                                </div>
                                            </div>

                                            {/* Status & Actions */}
                                            <div className="flex flex-col items-end gap-2">
                                                <div className="flex items-center gap-2">
                                                    <span className={`${statusColor} text-white px-3 py-1 rounded-full text-xs font-semibold`}>
                                                        {statusLabel}
                                                    </span>
                                                    {isReschedule && <span className="text-xs underline text-gray-900 font-medium cursor-pointer">Reason</span>}
                                                </div>
                                                <p className="text-sm font-semibold text-gray-700 mt-1">Consultation Fees : {visit.fees || '$200'}</p>
                                                <Button variant="ghost" size="icon" className="bg-gray-100 rounded-full h-8 w-8 mt-auto">
                                                    <Eye className="w-4 h-4 text-gray-600" />
                                                </Button>
                                            </div>
                                        </div>

                                        {/* Divider */}
                                        <div className="h-px bg-gray-100 my-4" />

                                        {/* Bottom Details */}
                                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                                            <div className="grid grid-cols-2 gap-x-12 gap-y-2">
                                                <div>
                                                    <p className="text-sm text-gray-500">Appointment Date & Time</p>
                                                    <p className="font-medium text-gray-900">
                                                        {new Date(visit.visitDate).toLocaleString('en-US', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">Visit Type</p>
                                                    <p className="font-medium text-gray-900">General</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                {isReschedule && (
                                                    <span className="bg-red-50 text-red-500 px-3 py-1.5 rounded-lg text-xs font-medium">Status : Reschedule</span>
                                                )}

                                                {status === 'Completed' ? (
                                                    <Button variant="default" className="bg-[#007bff] hover:bg-blue-600">
                                                        Download Prescription
                                                    </Button>
                                                ) : null}

                                                <Button variant="outline" className="text-blue-500 border-blue-500 hover:bg-blue-50">
                                                    Reschedule Appointment
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900">No appointments found</h3>
                                <p className="text-gray-500">Book your first appointment to see it here</p>
                            </div>
                        )}
                    </div>

                    {/* Recent Appointments List */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-gray-900">Recent Appointments</h2>
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
                            {displayRecent.map((visit: any, i: number) => (
                                <div key={i} className="flex flex-col md:flex-row items-center justify-between p-6 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-4 w-full md:w-auto">
                                        <img
                                            src={visit.img || "https://randomuser.me/api/portraits/women/44.jpg"}
                                            alt="Doctor"
                                            className="w-12 h-12 rounded-xl object-cover"
                                        />
                                        <div>
                                            <div className="text-blue-500 text-xs font-medium">#{visit.visitId}</div>
                                            <h4 className="font-bold text-gray-900">{visit.doctorName}</h4>
                                        </div>
                                    </div>

                                    <div className="flex flex-col md:flex-row gap-6 md:gap-16 w-full md:w-auto mt-4 md:mt-0">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-sm text-gray-900 font-medium">
                                                <Clock className="w-4 h-4 text-[#1a1f37]" />
                                                {new Date(visit.visitDate).toLocaleString('en-US', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <span className="font-medium text-blue-600">{visit.type || 'General Visit'}</span>
                                                <span>|</span>
                                                <span className="font-medium text-gray-600">{visit.mode || 'Chat'}</span>
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Mail className="w-3 h-3" />
                                                {visit.email || 'doctor@example.com'}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Phone className="w-3 h-3" />
                                                {visit.phone || '+1 504 368 6874'}
                                            </div>
                                        </div>
                                    </div>

                                    <Button variant="ghost" size="icon" className="bg-gray-100 rounded-full h-8 w-8 mt-4 md:mt-0">
                                        <Eye className="w-4 h-4 text-gray-600" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default PatientAppointments;
