import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { patientService } from '@/services/patientService';
import { toast } from 'sonner';
import {
    LayoutDashboard, Users, CreditCard, Receipt, MessageSquare,
    Activity, Settings, Calendar, Heart, FileText,
    LogOut, User, Pill
} from 'lucide-react';

interface PatientSidebarProps {
    activeSection?: string;
}

const PatientSidebar: React.FC<PatientSidebarProps> = ({ activeSection = 'Dashboard' }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [profile, setProfile] = useState<any>(null);
    const [profileImage, setProfileImage] = useState<string>('');

    useEffect(() => {
        // Only fetch if we don't have profile data
        if (!profile) {
            fetchProfile();
        }
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await patientService.getProfile();
            setProfile(response.data);
            if (response.data.profileImage) {
                setProfileImage(response.data.profileImage);
            }
        } catch (error) {
            console.error("Failed to fetch profile", error);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
        toast.success('Logged out successfully');
    };

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    // Determine active page from location
    const getActivePage = () => {
        if (location.pathname.includes('/appointments')) return 'My Appointments';
        if (location.pathname.includes('/favourites')) return 'Favourites';
        if (location.pathname.includes('/dependants')) return 'Dependants';
        if (location.pathname.includes('/medical-records')) return 'Medical Records';
        if (location.pathname.includes('/medicine')) return 'Medicine';
        if (location.pathname.includes('/wallet')) return 'Wallet';
        if (location.pathname.includes('/invoices')) return 'Invoices';
        if (location.pathname.includes('/messages')) return 'Message';
        if (location.pathname.includes('/vitals')) return 'Vitals';
        if (location.pathname.includes('/settings')) return 'Settings';
        return 'Dashboard';
    };

    const currentActive = getActivePage();

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/patient/dashboard' },
        { icon: Calendar, label: 'My Appointments', path: '/patient/appointments' },
        { icon: Heart, label: 'Favourites', path: '/patient/favourites' },
        { icon: Users, label: 'Dependants', path: '/patient/dependants' },
        { icon: FileText, label: 'Medical Records', path: '/patient/medical-records' },
        { icon: Pill, label: 'Medicine', path: '/patient/medicine' },
        { icon: CreditCard, label: 'Wallet', path: '/patient/wallet' },
        { icon: Receipt, label: 'Invoices', path: '/patient/invoices' },
        { icon: MessageSquare, label: 'Message', path: '/patient/messages', badge: true },
        { icon: Activity, label: 'Vitals', path: '/patient/vitals' },
        { icon: Settings, label: 'Settings', path: '/patient/settings' },
    ];

    return (
        <aside className="w-64 bg-white hidden lg:flex flex-col border-r border-gray-100 flex-shrink-0">
            {/* Profile Header */}
            <div className="relative h-48 bg-[#1a1f37] flex flex-col items-center justify-center text-white">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/medical-icons.png')]"></div>
                <div className="relative z-10 flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full border-4 border-white overflow-hidden mb-2 bg-gray-200">
                        {profileImage ? (
                            <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <User className="w-full h-full p-4 text-gray-400" />
                        )}
                    </div>
                    <h3 className="font-semibold text-lg">{profile?.name || 'User'}</h3>
                    <p className="text-xs text-blue-200">Patient ID : {profile?.patientId || '---'}</p>
                    <div className="flex items-center gap-2 mt-2">
                        <p className="text-xs text-blue-200">
                            {profile?.age ? `${profile.age} Years` : '--'} • {profile?.bloodGroup || '--'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => (
                    <button
                        key={item.label}
                        onClick={() => handleNavigation(item.path)}
                        className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-colors ${currentActive === item.label
                            ? 'bg-[#007bff] text-white shadow-md shadow-blue-500/30'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-[#007bff]'
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            <item.icon className="w-4 h-4" />
                            {item.label}
                        </div>
                        {item.badge && <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>}
                    </button>
                ))}
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors mt-4"
                >
                    <LogOut className="w-4 h-4" />
                    Logout
                </button>
            </nav>
        </aside>
    );
};

export default PatientSidebar;
