import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { patientService } from '@/services/patientService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import {
    Calendar, Download, FileText, Home, LogOut, User,
    Volume2, Camera, Edit, X, Save,
    LayoutDashboard, Users, CreditCard, Receipt, MessageSquare,
    Activity, Settings, ChevronRight, ChevronLeft, Droplets, Thermometer,
    Heart, Weight, Search, Bell, Star, Plus, MapPin, Clock, Eye, Video
} from 'lucide-react';
import { speakTamil } from '@/utils/audioUtils';
import { downloadPDF } from '@/utils/pdfUtils';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';
import PatientSidebar from '@/components/PatientSidebar';

// Mock Data for Charts if real data is missing
const analyticsData = [
    { name: 'Mon', heartRate: 140, bp: 100 },
    { name: 'Tue', heartRate: 100, bp: 120 },
    { name: 'Wed', heartRate: 180, bp: 130 },
    { name: 'Thu', heartRate: 130, bp: 100 },
    { name: 'Fri', heartRate: 130, bp: 90 },
    { name: 'Sat', heartRate: 0, bp: 0 },
];

const healthStatusData = [
    { name: 'Normal', value: 95, color: '#09e5ab' },
    { name: 'Issues', value: 5, color: '#f0f0f0' },
];

const PatientDashboard = () => {
    const { user, logout, userRole } = useAuth();
    const navigate = useNavigate();
    const [profile, setProfile] = useState<any>(null);
    const [visits, setVisits] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [saving, setSaving] = useState(false);
    const [profileImage, setProfileImage] = useState<string>('');
    const [editFormData, setEditFormData] = useState({
        name: '',
        age: '',
        bloodGroup: '',
        height: '',
        weight: ''
    });
    const [notifications, setNotifications] = useState<any[]>([]);
    const [dependants, setDependants] = useState<any[]>([]);
    const [favourites, setFavourites] = useState<any[]>([]);
    const [activeSection, setActiveSection] = useState('Dashboard');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [profileData, visitsData, notificationsData, dependantsData, favouritesData] = await Promise.all([
                patientService.getProfile(),
                patientService.getVisitHistory(),
                patientService.getNotifications().catch(() => ({ data: [] })),
                patientService.getDependants().catch(() => ({ data: [] })),
                patientService.getFavourites().catch(() => ({ data: [] }))
            ]);
            setProfile(profileData.data);
            setVisits(visitsData.data);
            setNotifications(notificationsData.data || []);
            setDependants(dependantsData.data || []);
            setFavourites(favouritesData.data || []);
            setProfileImage(profileData.data.profileImage || '');
            setEditFormData({
                name: profileData.data.name || '',
                age: profileData.data.age?.toString() || '',
                bloodGroup: profileData.data.bloodGroup || '',
                height: profileData.data.height?.toString() || '',
                weight: profileData.data.weight?.toString() || ''
            });
        } catch (error: any) {
            toast.error('Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error('Image size should be less than 5MB');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditFormData({
            ...editFormData,
            [e.target.name]: e.target.value
        });
    };

    const handleSaveProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const response = await patientService.updateProfile({
                ...editFormData,
                age: parseInt(editFormData.age),
                height: parseInt(editFormData.height),
                weight: parseInt(editFormData.weight),
                profileImage
            });
            setProfile(response.data);
            setEditMode(false);
            toast.success('Profile updated successfully');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
        toast.success('Logged out successfully');
    };

    const handleSectionClick = (section: string) => {
        if (section === 'My Appointments') {
            navigate('/patient/appointments');
            return;
        }
        if (section === 'Favourites') {
            navigate('/patient/favourites');
            return;
        }

        setActiveSection(section);

        // Scroll to section if it exists
        const sectionMap: any = {
            'Dashboard': 'health-records-section',
            'Dependants': 'dependants-section',
            'Medical Records': 'reports-section',
            'Vitals': 'health-records-section'
        };

        const elementId = sectionMap[section];
        if (elementId) {
            const element = document.getElementById(elementId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }

        // Show toast for sections not yet implemented
        if (['Wallet', 'Invoices', 'Message', 'Settings'].includes(section)) {
            toast.info(`${section} section coming soon!`);
        }
    };

    // Derived Data for UI
    const latestVisit = visits[0] || {};

    // Calculate BMI from profile data
    const calculateBMI = () => {
        if (profile?.height && profile?.weight) {
            const heightInMeters = profile.height / 100;
            const bmi = profile.weight / (heightInMeters * heightInMeters);
            return bmi.toFixed(1);
        }
        return '20.1';
    };

    const vitals = {
        heartRate: latestVisit.heartRate || '72',
        temp: '37.5', // Mock as not in visit schema usually
        glucose: '70-90',
        spo2: latestVisit.spo2 || '96',
        bp: latestVisit.bloodPressure || '120/80',
        bmi: calculateBMI()
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Shared Sidebar */}
            <PatientSidebar />


            {/* Main Content */}
            <main className="flex-1 p-4 lg:p-8 overflow-y-auto page-transition">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                        <div className="flex items-center gap-2">
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
                    </div>

                    {editMode ? (
                        <Card>
                            <CardHeader>
                                <CardTitle>Edit Profile</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSaveProfile} className="space-y-6">
                                    <div className="flex flex-col items-center gap-4 mb-6">
                                        <div className="relative">
                                            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                                {profileImage ? (
                                                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                                                ) : (
                                                    <User className="w-16 h-16 text-gray-400" />
                                                )}
                                            </div>
                                            <label className="absolute bottom-0 right-0 bg-[#007bff] text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors">
                                                <Camera className="w-4 h-4" />
                                                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                                            </label>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div><Label>Name</Label><Input name="name" value={editFormData.name} onChange={handleEditChange} /></div>
                                        <div><Label>Age</Label><Input name="age" value={editFormData.age} onChange={handleEditChange} /></div>
                                        <div><Label>Blood Group</Label><Input name="bloodGroup" value={editFormData.bloodGroup} onChange={handleEditChange} /></div>
                                        <div><Label>Height (cm)</Label><Input name="height" value={editFormData.height} onChange={handleEditChange} /></div>
                                        <div><Label>Weight (kg)</Label><Input name="weight" value={editFormData.weight} onChange={handleEditChange} /></div>
                                    </div>
                                    <Button type="submit" disabled={saving} className="bg-[#007bff] text-white w-full">{saving ? 'Saving...' : 'Save Changes'}</Button>
                                </form>
                            </CardContent>
                        </Card>
                    ) : (
                        <>
                            {/* Top Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Health Records Card */}
                                <Card className="lg:col-span-2 shadow-sm border-gray-100">
                                    <CardHeader>
                                        <CardTitle className="text-lg font-semibold text-gray-800">Health Records</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-col md:flex-row gap-6">
                                            <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-6">
                                                <VitalStat icon={Heart} label="Heart Rate" value={`${vitals.heartRate} Bpm`} trend="2%" color="text-red-500" />
                                                <VitalStat icon={Thermometer} label="Body Temperature" value={`${vitals.temp} C`} color="text-orange-500" />
                                                <VitalStat icon={Droplets} label="Glucose Level" value={vitals.glucose} trend="6%" color="text-blue-500" />
                                                <VitalStat icon={Activity} label="SP02" value={vitals.spo2} color="text-indigo-500" />
                                                <VitalStat icon={Activity} label="Blood Pressure" value={`${vitals.bp} mg/dl`} trend="2%" color="text-red-600" />
                                                <VitalStat icon={Weight} label="BMI" value={`${vitals.bmi} kg/m2`} color="text-purple-500" />
                                            </div>
                                            <div className="w-full md:w-48 flex flex-col items-center justify-center border-l border-gray-100 px-4">
                                                <h4 className="text-sm font-medium text-gray-500 mb-4">Overall Report</h4>
                                                <div className="relative w-32 h-32">
                                                    <ResponsiveContainer width="100%" height="100%">
                                                        <PieChart>
                                                            <Pie
                                                                data={healthStatusData}
                                                                innerRadius={45}
                                                                outerRadius={55}
                                                                startAngle={90}
                                                                endAngle={-270}
                                                                dataKey="value"
                                                            >
                                                                {healthStatusData.map((entry, index) => (
                                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                                ))}
                                                            </Pie>
                                                        </PieChart>
                                                    </ResponsiveContainer>
                                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                                        <span className="text-2xl font-bold text-[#09e5ab]">95%</span>
                                                    </div>
                                                </div>
                                                <p className="text-xs text-center text-gray-500 mt-2">Your health is <br /> <span className="text-[#09e5ab] font-bold">95% Normal</span></p>
                                                <Button size="sm" className="mt-4 w-full bg-[#1a1f37] text-white hover:bg-[#2a3055]">View Details</Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Right Column Widgets */}
                                <div className="space-y-6">
                                    {/* Book Appointment Banner */}
                                    <div className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-xl p-6 text-white shadow-lg relative overflow-hidden group cursor-pointer hover:shadow-xl transition-all">
                                        <div className="relative z-10">
                                            <h3 className="font-semibold text-lg mb-1">Book a new</h3>
                                            <h2 className="text-2xl font-bold mb-4">Appointment</h2>
                                            <div className="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center">
                                                <ChevronRight className="w-5 h-5" />
                                            </div>
                                        </div>
                                        <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-4 translate-y-4">
                                            <Calendar className="w-32 h-32" />
                                        </div>
                                    </div>

                                    {/* Favourites */}
                                    <Card className="shadow-sm border-gray-100">
                                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                                            <CardTitle className="text-base font-semibold">Favourites</CardTitle>
                                            <Button variant="link" className="text-blue-600 text-xs p-0 h-auto">View All</Button>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                {favourites.length > 0 ? favourites.slice(0, 3).map((doc: any, i) => (
                                                    <div key={doc._id || i} className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                                                <User className="w-6 h-6 text-gray-400" />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-semibold text-gray-900">{doc.name}</p>
                                                                <p className="text-xs text-gray-500">{doc.specialization}</p>
                                                            </div>
                                                        </div>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400"><Users className="w-4 h-4" /></Button>
                                                    </div>
                                                )) : (
                                                    <p className="text-sm text-gray-400 text-center py-4">No favourite doctors yet</p>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>

                            {/* Middle Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Appointments */}
                                <Card className="shadow-sm border-gray-100">
                                    <CardHeader className="flex flex-row items-center justify-between">
                                        <CardTitle className="text-lg font-semibold">Appointment</CardTitle>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="icon" className="h-6 w-6"><ChevronRight className="w-4 h-4 rotate-180" /></Button>
                                            <Button variant="outline" size="icon" className="h-6 w-6"><ChevronRight className="w-4 h-4" /></Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex justify-between mb-6 pb-4 border-b border-gray-50">
                                            {[
                                                { day: '19', label: 'Mon' },
                                                { day: '20', label: 'Tue' },
                                                { day: '21', label: 'Wed', active: true },
                                                { day: '22', label: 'Thu' },
                                                { day: '23', label: 'Fri' }
                                            ].map((date, i) => (
                                                <div key={i} className={`flex flex-col items-center p-2 rounded-lg cursor-pointer ${date.active ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}>
                                                    <span className="text-lg font-bold">{date.day}</span>
                                                    <span className="text-xs">{date.label}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex gap-3">
                                                    <img src="https://randomuser.me/api/portraits/men/32.jpg" className="w-12 h-12 rounded-lg object-cover" alt="Doctor" />
                                                    <div>
                                                        <h4 className="font-semibold text-gray-900">Dr. Edalin Hendry</h4>
                                                        <p className="text-xs text-blue-600 font-medium">Dentist</p>
                                                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                                                            <span>21 Mar 2024</span>
                                                            <span>•</span>
                                                            <span>10:30 AM</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Button variant="ghost" size="icon" className="bg-white"><FileText className="w-4 h-4" /></Button>
                                            </div>
                                            <div className="flex gap-3">
                                                <Button variant="outline" className="flex-1 bg-white border-none shadow-sm text-gray-700">Chat Now</Button>
                                                <Button className="flex-1 bg-[#09e5ab] hover:bg-[#07c593] text-white border-none">Attend</Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Analytics */}
                                <Card className="shadow-sm border-gray-100">
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-lg font-semibold">Analytics</CardTitle>
                                        <select className="text-xs border-none bg-transparent text-gray-500 focus:ring-0">
                                            <option>Mar 14 - Mar 21</option>
                                        </select>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="h-64 mt-4">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart data={analyticsData}>
                                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dy={10} />
                                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                                                    <RechartsTooltip cursor={{ fill: '#f8f9fa' }} />
                                                    <Bar dataKey="heartRate" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={30} />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Bottom Grid - Notifications, Past Apps, Dependants */}
                            <div id="dependants-section" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Notifications - Col Span 1 */}
                                <Card className="shadow-sm border-gray-100 h-full flex flex-col">
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-lg font-semibold">Notifications</CardTitle>
                                        <Button variant="link" className="text-blue-600 text-xs p-0 h-auto">View All</Button>
                                    </CardHeader>
                                    <CardContent className="flex-1 flex flex-col">
                                        <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar min-h-[300px]">
                                            {notifications.length > 0 ? notifications.slice(0, 5).map((notif, i) => {
                                                const iconMap: any = {
                                                    'booking': { icon: Bell, color: 'bg-indigo-100 text-indigo-600' },
                                                    'review': { icon: Star, color: 'bg-blue-100 text-blue-600' },
                                                    'appointment': { icon: Calendar, color: 'bg-red-100 text-red-600' },
                                                    'payment': { icon: CreditCard, color: 'bg-yellow-100 text-yellow-600' },
                                                    'general': { icon: Bell, color: 'bg-gray-100 text-gray-600' }
                                                };
                                                const iconData = iconMap[notif.type] || iconMap['general'];
                                                const Icon = iconData.icon;
                                                const timeAgo = new Date(notif.createdAt).toLocaleDateString();

                                                return (
                                                    <div key={notif._id || i} className="flex gap-3 items-start">
                                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${iconData.color}`}>
                                                            <Icon className="w-5 h-5" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-800 line-clamp-2">{notif.title}</p>
                                                            <p className="text-xs text-gray-500 mt-1">{timeAgo}</p>
                                                        </div>
                                                    </div>
                                                );
                                            }) : (
                                                <div className="flex items-center justify-center h-full text-gray-400">
                                                    <p className="text-sm">No notifications yet</p>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex justify-between items-center mt-4 pt-2 border-t border-gray-100">
                                            <Button variant="ghost" size="icon" className="h-6 w-6"><ChevronLeft className="w-4 h-4 text-gray-400" /></Button>
                                            <div className="h-2 flex-1 mx-4 bg-gray-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-gray-400 w-1/2 rounded-full"></div>
                                            </div>
                                            <Button variant="ghost" size="icon" className="h-6 w-6"><ChevronRight className="w-4 h-4 text-gray-400" /></Button>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Right Side Stack - Col Span 2 */}
                                <div className="lg:col-span-2 space-y-8">
                                    {/* Past Appointments */}
                                    <Card className="shadow-sm border-gray-100">
                                        <CardHeader className="flex flex-row items-center justify-between">
                                            <CardTitle className="text-lg font-semibold">Past Appointments</CardTitle>
                                            <div className="flex gap-2">
                                                <Button variant="outline" size="icon" className="h-8 w-8"><ChevronLeft className="w-4 h-4" /></Button>
                                                <Button variant="outline" size="icon" className="h-8 w-8"><ChevronRight className="w-4 h-4" /></Button>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex flex-col md:flex-row gap-6">
                                                <div className="flex items-start gap-4">
                                                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Doctor" className="w-14 h-14 rounded-lg object-cover" />
                                                    <div>
                                                        <h4 className="font-bold text-gray-900 text-lg">Dr.Edalin Hendry</h4>
                                                        <p className="text-sm text-gray-500">Dental Specialist</p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-2 flex-1">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h4 className="font-semibold text-gray-900 mb-2">Thursday, Mar 2024</h4>
                                                            <div className="space-y-2">
                                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                                    <Clock className="w-4 h-4 text-[#1a1f37]" />
                                                                    <span>Time : 04:00 PM - 04:30 PM (30 Min)</span>
                                                                </div>
                                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                                    <MapPin className="w-4 h-4 text-[#1a1f37]" />
                                                                    <span>Newyork, United States</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <span className="bg-[#e93b3b] text-white text-xs font-bold px-3 py-1.5 rounded-md flex items-center gap-1">
                                                            <Video className="w-3 h-3 fill-white" /> 30 Min
                                                        </span>
                                                    </div>
                                                    <div className="flex gap-4 mt-4">
                                                        <Button variant="outline" className="flex-1 border-blue-500 text-blue-500 hover:bg-blue-50">Reschedule</Button>
                                                        <Button className="flex-1 bg-[#007bff] hover:bg-blue-600 text-white">View Details</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Dependant */}
                                    <Card className="shadow-sm border-gray-100">
                                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                                            <CardTitle className="text-lg font-semibold">Dependant</CardTitle>
                                            <div className="flex items-center gap-4">
                                                <Button variant="ghost" className="text-[#1a1f37] hover:text-blue-600 text-sm font-medium p-0 h-auto gap-1">
                                                    <Plus className="w-4 h-4 bg-[#1a1f37] text-white rounded-full p-0.5" />
                                                    Add New
                                                </Button>
                                                <Button variant="link" className="text-blue-600 text-sm p-0 h-auto">View All</Button>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                {dependants.length > 0 ? dependants.map((dep: any, i) => {
                                                    const ageDisplay = `${dep.calculatedAge || dep.age} years ${dep.ageInDays || 0} days`;
                                                    return (
                                                        <div key={dep._id || i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50/50 hover:bg-gray-50 transition-colors">
                                                            <div className="flex items-center gap-4">
                                                                <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center overflow-hidden">
                                                                    {dep.profileImage ? (
                                                                        <img src={dep.profileImage} alt={dep.name} className="w-full h-full object-cover" />
                                                                    ) : (
                                                                        <User className="w-6 h-6 text-gray-400" />
                                                                    )}
                                                                </div>
                                                                <div>
                                                                    <h4 className="font-semibold text-gray-900">{dep.name}</h4>
                                                                    <p className="text-sm text-gray-500">{dep.relation} - {ageDisplay}</p>
                                                                </div>
                                                            </div>
                                                            <div className="flex gap-2">
                                                                <Button variant="ghost" size="icon" className="bg-blue-100 text-blue-700 hover:bg-blue-200 h-8 w-8 rounded-full">
                                                                    <Calendar className="w-4 h-4" />
                                                                </Button>
                                                                <Button variant="ghost" size="icon" className="bg-blue-100 text-blue-700 hover:bg-blue-200 h-8 w-8 rounded-full">
                                                                    <Eye className="w-4 h-4" />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    );
                                                }) : (
                                                    <p className="text-sm text-gray-400 text-center py-4">No dependants added yet</p>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>

                            {/* Reports Section */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold text-gray-900">Reports</h3>

                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                    <div className="p-6 border-b border-gray-100 flex flex-wrap gap-2">
                                        {['Appointments', 'Medical Records', 'Prescriptions', 'Invoices'].map((tab, i) => (
                                            <Button
                                                key={tab}
                                                variant={i === 0 ? 'default' : 'secondary'}
                                                className={`rounded-full px-6 ${i === 0 ? 'bg-[#007bff] hover:bg-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                            >
                                                {tab}
                                            </Button>
                                        ))}
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead className="bg-gray-100/80">
                                                <tr className="text-left text-sm font-semibold text-gray-900 border-b border-gray-100">
                                                    <th className="p-4 pl-6 font-medium text-gray-700">ID</th>
                                                    <th className="p-4 font-medium text-gray-700">Doctor</th>
                                                    <th className="p-4 font-medium text-gray-700">Date</th>
                                                    <th className="p-4 font-medium text-gray-700">Type</th>
                                                    <th className="p-4 font-medium text-gray-700">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {visits.length > 0 ? visits.slice(0, 10).map((visit: any, i) => {
                                                    const visitDate = new Date(visit.visitDate).toLocaleDateString('en-US', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    });
                                                    const isPast = new Date(visit.visitDate) < new Date();
                                                    const status = isPast ? 'Completed' : 'Upcoming';
                                                    const statusClass = isPast ? 'bg-green-100 text-green-600' : 'bg-purple-100 text-purple-600';

                                                    return (
                                                        <tr key={visit._id || i} className="hover:bg-gray-50/50 transition-colors">
                                                            <td className="p-4 pl-6 text-blue-500 font-medium">#{visit.visitId}</td>
                                                            <td className="p-4">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="w-10 h-10 rounded-xl bg-gray-200 flex items-center justify-center overflow-hidden">
                                                                        <User className="w-6 h-6 text-gray-400" />
                                                                    </div>
                                                                    <span className="font-medium text-gray-900">{visit.doctorName || visit.doctorId?.name || 'Unknown'}</span>
                                                                </div>
                                                            </td>
                                                            <td className="p-4 text-gray-600">{visitDate}</td>
                                                            <td className="p-4 text-gray-600">Clinic Visit</td>
                                                            <td className="p-4">
                                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${statusClass}`}>
                                                                    <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                                                                    {status}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    );
                                                }) : (
                                                    <tr>
                                                        <td colSpan={5} className="p-8 text-center text-gray-400">
                                                            No appointments found
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
};

// Helper Component for Vital Stats
const VitalStat = ({ icon: Icon, label, value, trend, color }: any) => (
    <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 mb-1">
            <Icon className={`w-4 h-4 ${color}`} />
            <span className="text-xs text-gray-500 font-medium">{label}</span>
        </div>
        <div className="flex items-end gap-2">
            <span className="text-xl font-bold text-gray-900">{value}</span>
            {trend && <span className="text-[10px] text-[#09e5ab] font-bold mb-1">{trend}%</span>}
        </div>
    </div>
);

export default PatientDashboard;
