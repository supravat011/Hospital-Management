import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { patientService } from '@/services/patientService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import {
    LayoutDashboard, Users, CreditCard, Receipt, MessageSquare,
    Activity, Settings, Calendar, Heart, FileText,
    LogOut, User, Search, MapPin, Star, CheckCircle, Clock
} from 'lucide-react';
import PatientSidebar from '@/components/PatientSidebar';

const PatientFavourites = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await patientService.getProfile();
                setProfile(response.data);
            } catch (error) {
                console.error("Failed to fetch profile", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/');
        toast.success('Logged out successfully');
    };

    // Mock Data to match the design EXACTLY
    const FAVOURITES = [
        {
            id: 1,
            name: 'Dr.Edalin Hendry',
            specialty: 'MD - Cardiology',
            rating: 5.0,
            reviews: 45, // Not in mockup explicitly but implied by stars
            nextAvailable: '23 Mar 2024',
            location: 'Newyork, USA',
            lastBooked: '21 Jan 2023',
            image: 'https://randomuser.me/api/portraits/men/32.jpg'
        },
        {
            id: 2,
            name: 'Dr.Shanta Nesmith',
            specialty: 'DO - Oncology',
            rating: 4.5, // 4 stars and a half roughly
            reviews: 35,
            nextAvailable: '27 Mar 2024',
            location: 'Los Angeles, USA',
            lastBooked: '18 Jan 2023',
            image: 'https://randomuser.me/api/portraits/women/44.jpg'
        },
        {
            id: 3,
            name: 'Dr.John Ewel',
            specialty: 'MD - Orthopedics',
            rating: 5.0,
            reviews: 50,
            nextAvailable: '02 Apr 2024',
            location: 'Dallas, USA',
            lastBooked: '28 Jan 2023',
            image: 'https://randomuser.me/api/portraits/men/45.jpg'
        },
        {
            id: 4,
            name: 'Dr.Susan Fenimore',
            specialty: 'DO - Dermatology',
            rating: 4.0,
            reviews: 20,
            nextAvailable: '11 Apr 2024',
            location: 'Chicago, USA',
            lastBooked: '08 Feb 2023',
            image: 'https://randomuser.me/api/portraits/women/68.jpg'
        },
        {
            id: 5,
            name: 'Dr.Juliet Rios',
            specialty: 'MD - Neurology',
            rating: 5.0,
            reviews: 12,
            nextAvailable: '18 Apr 2024',
            location: 'Detroit, USA',
            lastBooked: '16 Feb 2023',
            image: 'https://randomuser.me/api/portraits/women/90.jpg'
        },
        {
            id: 6,
            name: 'Dr.Joseph Engels',
            specialty: 'MD - Pediatrics',
            rating: 4.0,
            reviews: 28,
            nextAvailable: '10 May 2024',
            location: 'Las Vegas, USA',
            lastBooked: '08 Mar 2023',
            image: 'https://randomuser.me/api/portraits/men/85.jpg'
        }
    ];

    const filteredFavourites = FAVOURITES.filter(doc =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Shared Sidebar */}
            <PatientSidebar />


            {/* Main Content */}
            <main className="flex-1 p-4 lg:p-8 overflow-y-auto page-transition">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <h1 className="text-2xl font-bold text-gray-900">Favourites</h1>
                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                                placeholder="Search"
                                className="pl-9 bg-white"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Favourites Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {loading ? (
                            <p className="text-gray-500">Loading favourites...</p>
                        ) : filteredFavourites.length > 0 ? (
                            filteredFavourites.map((doc) => (
                                <div key={doc.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col items-center relative group hover:shadow-md transition-shadow">
                                    {/* Heart Icon top right */}
                                    <button className="absolute top-4 right-4 text-red-500 bg-red-50 p-1.5 rounded-full hover:bg-red-100 transition-colors">
                                        <Heart className="w-4 h-4 fill-current" />
                                    </button>

                                    {/* Image */}
                                    <div className="w-24 h-24 rounded-lg overflow-hidden mb-4 bg-gray-100">
                                        <img src={doc.image} alt={doc.name} className="w-full h-full object-cover" />
                                    </div>

                                    {/* Name & Badge */}
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <h3 className="font-bold text-gray-900 text-lg">{doc.name}</h3>
                                        <CheckCircle className="w-4 h-4 text-green-500 fill-green-500 text-white" />
                                    </div>

                                    {/* Specialty */}
                                    <p className="text-blue-500 text-sm font-medium mb-2">{doc.specialty}</p>

                                    {/* Rating */}
                                    <div className="flex items-center gap-1 mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${i < Math.floor(doc.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`}
                                            />
                                        ))}
                                        <span className="text-sm font-semibold text-gray-700 ml-1">{doc.rating}</span>
                                        {doc.reviews && <span className="text-xs text-gray-400">({doc.reviews})</span>}
                                    </div>

                                    {/* Details List */}
                                    <div className="w-full text-sm space-y-2 mb-6">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Calendar className="w-4 h-4 text-[#1a1f37]" />
                                            <span>Next Availability : <span className="text-gray-900 font-medium">{doc.nextAvailable}</span></span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <MapPin className="w-4 h-4 text-[#1a1f37]" />
                                            <span>Location : <span className="text-gray-900 font-medium">{doc.location}</span></span>
                                        </div>
                                    </div>

                                    {/* Last Booked Box */}
                                    <div className="w-full bg-blue-50 text-blue-600 text-center py-2.5 rounded-lg text-sm font-medium mb-4">
                                        Last Book on {doc.lastBooked}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="w-full flex gap-3 mt-auto">
                                        <Button variant="outline" className="flex-1 border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                                            View Profile
                                        </Button>
                                        <Button variant="outline" className="flex-1 border-blue-500 text-blue-500 hover:bg-blue-50">
                                            Book Now
                                        </Button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12 bg-white rounded-xl border border-gray-100">
                                <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900">No favourites yet</h3>
                                <p className="text-gray-500">Mark doctors as favourites to see them here</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PatientFavourites;
