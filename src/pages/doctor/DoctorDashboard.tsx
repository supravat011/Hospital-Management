import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { doctorService } from '@/services/doctorService';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import {
    LayoutDashboard, Users, Calendar, Clock, UserCircle, Star,
    FileText, LogOut, Video, MessageSquare, Settings, Share2, KeyRound,
    Bell, DollarSign, Building2, TrendingUp, CheckCircle, XCircle, MoreHorizontal,
    ChevronDown, Eye, Check, X, ClipboardList
} from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from 'recharts';

const DoctorDashboard = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [stats, setStats] = useState<any>(null);
    const [appointmentRequests, setAppointmentRequests] = useState<any[]>([]);
    const [upcomingAppointment, setUpcomingAppointment] = useState<any>(null);
    const [patients, setPatients] = useState<any[]>([]);
    const [invoices, setInvoices] = useState<any[]>([]);
    const [weeklyData, setWeeklyData] = useState<any[]>([]);
    const [activeNav, setActiveNav] = useState('Dashboard');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const statsData = await doctorService.getStats();
            // Fetch separate "requests" if API existed, using regular appointments for now
            const requestsData = await doctorService.getAppointments('pending', 5);
            const upcomingData = await doctorService.getUpcomingAppointment();
            const patientsData = await doctorService.getAllPatients();
            const invoicesData = await doctorService.getInvoices(undefined, 5);
            const weeklyDataResponse = await doctorService.getWeeklyAnalytics();

            setStats(statsData.data || {});
            setAppointmentRequests(requestsData.data || []);
            setUpcomingAppointment(upcomingData.data || null);
            setPatients(patientsData.data || []);
            setInvoices(invoicesData.data || []);
            setWeeklyData(weeklyDataResponse.data || []);

        } catch (error) {
            console.error('Failed to fetch dashboard data:', error);
            // toast.error('Failed to load dashboard data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        navigate('/doctor/login');
        toast.success('Logged out successfully!');
    };

    const navItems = [
        { label: 'Dashboard', icon: LayoutDashboard, path: '/doctor/dashboard' },
        { label: 'Appointments', icon: Calendar, path: '/doctor/appointments' },
        { label: 'My Patients', icon: Users, path: '/doctor/patients' },
        { label: 'Requests', icon: ClipboardList, path: '/doctor/requests' },
        { label: 'Invoices', icon: FileText, path: '/doctor/invoices' },
        { label: 'Available Timings', icon: Clock, path: '/doctor/timings' },
        { label: 'Reviews', icon: Star, path: '/doctor/reviews' },
        { label: 'Accounts', icon: UserCircle, path: '/doctor/accounts' },
    ];

    const additionalNavItems = [
        { label: 'Profile Settings', icon: Settings, path: '/doctor/edit-profile' },
        { label: 'Change Password', icon: KeyRound, path: '/doctor/change-password' },
        { label: 'Social Media', icon: Share2, path: '/doctor/social-media' },
        { label: 'Payout Settings', icon: DollarSign, path: '/doctor/payout-settings' },
        { label: 'Messages', icon: MessageSquare, path: '/doctor/messages' },
    ];

    const handleNavClick = (label: string) => {
        setActiveNav(label);
        const item = [...navItems, ...additionalNavItems].find(i => i.label === label);
        if (item) {
            navigate(item.path);
        }
    };

    // Placeholder chart data if API returns empty
    const defaultChartData = [
        { day: 'M', value: 50 },
        { day: 'T', value: 40 },
        { day: 'W', value: 15 },
        { day: 'T', value: 45 },
        { day: 'F', value: 35 },
        { day: 'S', value: 48 },
        { day: 'S', value: 65 },
    ];

    // Use weeklyData if formatted correctly, else default
    const chartData = weeklyData.length > 0 ? weeklyData : defaultChartData;

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row font-sans">
            {/* Sidebar - Kept same style but ensured full height */}
            <div className="w-full lg:w-64 bg-white shadow-md border-r border-gray-200 flex-shrink-0 flex flex-col h-screen sticky top-0 overflow-y-auto">
                <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
                    <img src={user?.profileImage || 'https://github.com/shadcn.png'} alt="Doctor" className="w-10 h-10 rounded-full object-cover" />
                    <div>
                        <h3 className="font-bold text-gray-900 leading-tight">{user?.name || 'Dr. Name'}</h3>
                        <p className="text-xs text-gray-500">{user?.specialization || 'Specialist'}</p>
                    </div>
                </div>

                <nav className="flex-1 py-4 px-3 space-y-1">
                    {navItems.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => handleNavClick(item.label)}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all ${activeNav === item.label
                                ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                                }`}
                        >
                            <item.icon className={`w-4 h-4 ${activeNav === item.label ? 'text-white' : 'text-gray-500'}`} />
                            {item.label}
                        </button>
                    ))}

                    <div className="pt-4 mt-4 border-t border-gray-100">
                        {additionalNavItems.map((item) => (
                            <button
                                key={item.label}
                                onClick={() => handleNavClick(item.label)}
                                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all ${activeNav === item.label
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                                    }`}
                            >
                                <item.icon className="w-4 h-4 text-gray-500" />
                                {item.label}
                            </button>
                        ))}
                    </div>
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
                <div className="max-w-7xl mx-auto">

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                        {/* LEFT COLUMN (1/3 width) */}
                        <div className="xl:col-span-1 space-y-6">

                            {/* Stats Cards Vertical Stack */}
                            <div className="space-y-4">
                                {/* Card 1: Total Patient */}
                                <Card className="p-5 bg-white shadow-sm border border-gray-100 flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Total Patient</p>
                                        <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats?.totalPatients || '1,250'}</h3>
                                        <div className="flex items-center gap-1 mt-1">
                                            <TrendingUp className="w-3 h-3 text-green-500" />
                                            <span className="text-xs font-medium text-green-500">15% From Last Week</span>
                                        </div>
                                    </div>
                                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                                        <img src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png" alt="icon" className="w-8 h-8 opacity-80" />
                                    </div>
                                </Card>

                                {/* Card 2: Patients Today */}
                                <Card className="p-5 bg-white shadow-sm border border-gray-100 flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Patients Today</p>
                                        <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats?.patientsToday || '80'}</h3>
                                        <div className="flex items-center gap-1 mt-1">
                                            <TrendingUp className="w-3 h-3 text-green-500" />
                                            <span className="text-xs font-medium text-red-500">15% From Yesterday</span>
                                        </div>
                                    </div>
                                    <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                                        <img src="https://cdn-icons-png.flaticon.com/512/4807/4807695.png" alt="icon" className="w-8 h-8 opacity-80" />
                                    </div>
                                </Card>

                                {/* Card 3: Appointments Today */}
                                <Card className="p-5 bg-white shadow-sm border border-gray-100 flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Appointments Today</p>
                                        <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats?.appointmentsToday || '50'}</h3>
                                        <div className="flex items-center gap-1 mt-1">
                                            <TrendingUp className="w-3 h-3 text-green-500" />
                                            <span className="text-xs font-medium text-green-500">20% From Yesterday</span>
                                        </div>
                                    </div>
                                    <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
                                        <img src="https://cdn-icons-png.flaticon.com/512/2693/2693507.png" alt="icon" className="w-8 h-8 opacity-80" />
                                    </div>
                                </Card>
                            </div>

                            {/* Weekly Overview */}
                            <Card className="p-6 bg-white shadow-sm border border-gray-100">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="font-bold text-gray-900">Weekly Overview</h3>
                                    <p className="text-xs text-gray-400 font-medium">Mar 14 - Mar 21</p>
                                </div>
                                <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-1">
                                    <button className="text-sm font-semibold text-blue-600 border-b-2 border-blue-600 pb-2 -mb-2">Revenue</button>
                                    <button className="text-sm font-medium text-gray-400 pb-2">Appointments</button>
                                </div>
                                <div className="h-48 w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={chartData}>
                                            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} dy={10} />
                                            <Tooltip cursor={{ fill: '#F3F4F6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                                            <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={12}>
                                                {chartData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={index % 3 === 2 ? '#EAB308' : '#3B82F6'} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </Card>

                            {/* Recent Patients */}
                            <Card className="bg-white shadow-sm border border-gray-100">
                                <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                                    <h3 className="font-bold text-gray-900">Recent Patients</h3>
                                    <button className="text-xs font-bold text-blue-600 hover:underline">View All</button>
                                </div>
                                <div className="p-4 grid grid-cols-2 gap-4">
                                    {patients.slice(0, 2).map((patient, i) => (
                                        <div key={i} className="bg-blue-50/50 p-3 rounded-xl border border-blue-100 flex flex-col items-center text-center">
                                            <img src={patient.profileImage || `https://i.pravatar.cc/150?u=${patient._id}`} alt="Patient" className="w-14 h-14 rounded-lg object-cover mb-2 shadow-sm" />
                                            <h4 className="text-sm font-bold text-gray-900">{patient.name}</h4>
                                            <p className="text-xs text-blue-500 font-medium mb-3">Patient ID : #{patient._id.slice(-5)}</p>
                                            <p className="text-[10px] text-gray-400 text-left w-full mt-auto pt-2 border-t border-blue-200">
                                                Last Appointment <br /> <span className="text-gray-600 font-medium">15 Mar 2024</span>
                                            </p>
                                        </div>
                                    ))}
                                    {patients.length === 0 && (
                                        <p className="col-span-2 text-center text-sm text-gray-500 py-4">No recent patients</p>
                                    )}
                                </div>
                            </Card>

                            {/* Notifications (Moved to Left Col Bottom) */}
                            <Card className="bg-white shadow-sm border border-gray-100 flex flex-col rounded-xl overflow-hidden">
                                <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-white">
                                    <h3 className="font-bold text-gray-900">Notifications</h3>
                                    <button className="text-xs font-bold text-blue-600 hover:underline">View All</button>
                                </div>
                                <div className="p-4 space-y-3 bg-white">
                                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                        <div className="w-8 h-8 rounded-md bg-indigo-100 flex items-center justify-center flex-shrink-0">
                                            <Bell className="w-4 h-4 text-indigo-600" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs text-gray-800 leading-snug">
                                                Booking Confirmed on <span className="font-bold">21 Mar 2024</span>
                                            </p>
                                            <p className="text-[10px] text-gray-400 mt-1 font-medium">Just Now</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                        <div className="w-8 h-8 rounded-md bg-blue-100 flex items-center justify-center flex-shrink-0">
                                            <Star className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs text-gray-800 leading-snug">
                                                New Review received
                                            </p>
                                            <p className="text-[10px] text-gray-400 mt-1 font-medium">5 Days ago</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                        <div className="w-8 h-8 rounded-md bg-yellow-100 flex items-center justify-center flex-shrink-0">
                                            <DollarSign className="w-4 h-4 text-yellow-600" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs text-gray-800 leading-snug">
                                                Payment received <span className="font-bold">$200</span>
                                            </p>
                                            <p className="text-[10px] text-gray-400 mt-1 font-medium">2 Days ago</p>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                        </div>

                        {/* RIGHT COLUMN (2/3 width) */}
                        <div className="xl:col-span-2 space-y-6">

                            {/* Appointment Requests ("Appointment") */}
                            <Card className="bg-white shadow-sm border border-gray-100 overflow-hidden">
                                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                                    <h3 className="text-xl font-bold text-gray-900">Appointment</h3>
                                    <div className="bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 flex items-center gap-2 cursor-pointer">
                                        Last 7 Days <ChevronDown className="w-4 h-4" />
                                    </div>
                                </div>
                                <div className="p-0">
                                    {[1, 2, 3, 4, 5].map((item, i) => (
                                        <div key={i} className="flex flex-col md:flex-row items-center justify-between p-5 border-b border-gray-50 hover:bg-gray-50/50 transition-colors gap-4">
                                            <div className="flex items-center gap-4 w-full md:w-auto">
                                                <img src={`https://i.pravatar.cc/150?u=${i}`} alt="Patient" className="w-12 h-12 rounded-lg object-cover shadow-sm bg-yellow-100" />
                                                <div>
                                                    <p className="text-xs font-bold text-blue-500 mb-0.5">#Apt000{i + 1}</p>
                                                    <h4 className="text-base font-bold text-gray-900">Adrian Marshall</h4>
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-start md:items-start min-w-[200px]">
                                                <p className="text-sm font-bold text-gray-700">11 Nov 2024 <span className="text-gray-500 font-normal">10.45 AM</span></p>
                                                <span className="mt-1 px-3 py-0.5 rounded-full text-[10px] font-bold text-white bg-blue-500 uppercase tracking-wide">
                                                    {i % 2 === 0 ? 'General' : 'Clinic Consulting'}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <button className="w-9 h-9 rounded-full border border-green-500 flex items-center justify-center text-green-500 hover:bg-green-50 transition-colors">
                                                    <Check className="w-5 h-5" />
                                                </button>
                                                <button className="w-9 h-9 rounded-full border border-red-500 flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors">
                                                    <X className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            {/* Upcoming Appointment Banner */}
                            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 p-6 md:p-8 text-white shadow-lg">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                                <h3 className="text-lg font-bold mb-6">Upcoming Appointment</h3>

                                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-white rounded-xl p-0.5 shadow-md">
                                            <img src="https://i.pravatar.cc/150?u=a" alt="Patient" className="w-full h-full rounded-lg object-cover" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-blue-100 mb-0.5">#Apt0001</p>
                                            <h4 className="text-xl font-bold">Adrian Marshall</h4>
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <p className="text-sm text-blue-100">General visit</p>
                                        <p className="text-lg font-bold">Today, 10:45 AM</p>
                                    </div>
                                </div>

                                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/20 pt-6">
                                    <div className="flex items-center gap-2 text-sm font-medium">
                                        <Video className="w-5 h-5" />
                                        Video Appointment
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button className="px-6 py-2 bg-white text-blue-600 rounded-full text-sm font-bold shadow-sm hover:bg-blue-50 transition-colors">Chat Now</button>
                                        <button className="px-6 py-2 bg-blue-700 text-white rounded-full text-sm font-bold shadow-sm border border-blue-400 hover:bg-blue-800 transition-colors">Start Appointment</button>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Invoices */}
                            <Card className="bg-white shadow-sm border border-gray-100">
                                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                                    <h3 className="text-xl font-bold text-gray-900">Recent Invoices</h3>
                                    <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">View All</button>
                                </div>
                                <div className="p-6 space-y-6">
                                    {invoices.slice(0, 5).map((invoice, i) => (
                                        <div key={i} className="flex items-center justify-between">
                                            <div className="flex items-center gap-4 w-1/3">
                                                <img src={invoice.patientId?.profileImage || `https://i.pravatar.cc/150?u=${invoice._id}`} alt="Patient" className="w-12 h-12 rounded-xl object-cover" />
                                                <div>
                                                    <h4 className="font-bold text-gray-900">{invoice.patientId?.name || 'Patient Name'}</h4>
                                                    <p className="text-xs text-blue-500 font-medium">{invoice.invoiceId || '#Apt0001'}</p>
                                                </div>
                                            </div>
                                            <div className="w-1/4">
                                                <p className="text-xs text-gray-500 mb-0.5">Amount</p>
                                                <p className="font-bold text-gray-900">${invoice.amount || '450'}</p>
                                            </div>
                                            <div className="w-1/4">
                                                <p className="text-xs text-gray-500 mb-0.5">Paid On</p>
                                                <p className="font-bold text-gray-900">{new Date(invoice.date || Date.now()).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                            </div>
                                            <button className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                    {invoices.length === 0 && (
                                        [1, 2, 3, 4].map((_, i) => (
                                            <div key={i} className="flex items-center justify-between">
                                                <div className="flex items-center gap-4 w-1/3">
                                                    <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="Patient" className="w-12 h-12 rounded-xl object-cover" />
                                                    <div>
                                                        <h4 className="font-bold text-gray-900">Adrian Marshall</h4>
                                                        <p className="text-xs text-blue-500 font-medium">#Apt000{i}</p>
                                                    </div>
                                                </div>
                                                <div className="w-1/4">
                                                    <p className="text-xs text-gray-500 mb-0.5">Amount</p>
                                                    <p className="font-bold text-gray-900">$450</p>
                                                </div>
                                                <div className="w-1/4">
                                                    <p className="text-xs text-gray-500 mb-0.5">Paid On</p>
                                                    <p className="font-bold text-gray-900">11 Nov 2024</p>
                                                </div>
                                                <button className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </Card>

                            {/* Clinics & Availability */}
                            <Card className="bg-white shadow-sm border border-gray-100 flex flex-col rounded-xl overflow-hidden">
                                <div className="p-5 border-b border-gray-100 bg-white">
                                    <h3 className="text-lg font-bold text-gray-900">Clinics & Availability</h3>
                                </div>

                                <div className="p-5 space-y-4 flex-1 bg-white">
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-lg bg-white overflow-hidden flex-shrink-0 shadow-sm">
                                                    <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=100&h=100&fit=crop" alt="Clinic" className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-gray-900 text-base">Sofi's Clinic</h4>
                                                </div>
                                            </div>
                                            <span className="font-bold text-gray-900">$900</span>
                                        </div>

                                        <div className="bg-white rounded-lg p-3 flex items-end justify-between">
                                            <div className="space-y-1.5 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-gray-500 font-medium w-10">Tue :</span>
                                                    <span className="text-gray-600">07:00 AM - 09:00 PM</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-gray-500 font-medium w-10">Wed :</span>
                                                    <span className="text-gray-600">07:00 AM - 09:00 PM</span>
                                                </div>
                                            </div>
                                            <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 underline decoration-blue-600/30">Change</button>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-lg bg-white overflow-hidden flex-shrink-0 shadow-sm">
                                                    <img src="https://images.unsplash.com/photo-1516549655169-df83a253831f?w=100&h=100&fit=crop" alt="Clinic" className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-gray-900 text-base">The Family Dentistry...</h4>
                                                </div>
                                            </div>
                                            <span className="font-bold text-gray-900">$600</span>
                                        </div>

                                        <div className="bg-white rounded-lg p-3 flex items-end justify-between">
                                            <div className="space-y-1.5 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-gray-500 font-medium w-10">Sat :</span>
                                                    <span className="text-gray-600">07:00 AM - 09:00 PM</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-gray-500 font-medium w-10">Tue :</span>
                                                    <span className="text-gray-600">07:00 AM - 09:00 PM</span>
                                                </div>
                                            </div>
                                            <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 underline decoration-blue-600/30">Change</button>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorDashboard;
