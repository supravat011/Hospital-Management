import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { doctorService } from '@/services/doctorService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { User, Camera, Save, ArrowLeft } from 'lucide-react';

const DoctorEditProfile = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [profileImage, setProfileImage] = useState<string>('');
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        phoneNumber: '',
        email: '',
        specialization: '',
        hospitalName: '',
        hospitalAddress: '',
        medicalLicenseNumber: ''
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await doctorService.getProfile();
            const data = response.data;
            setFormData({
                name: data.name || '',
                age: data.age?.toString() || '',
                phoneNumber: data.phoneNumber || '',
                email: data.email || '',
                specialization: data.specialization || '',
                hospitalName: data.hospitalName || '',
                hospitalAddress: data.hospitalAddress || '',
                medicalLicenseNumber: data.medicalLicenseNumber || ''
            });
            setProfileImage(data.profileImage || '');
        } catch (error) {
            toast.error('Failed to load profile');
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            await doctorService.updateProfile({
                ...formData,
                age: parseInt(formData.age),
                profileImage
            });
            toast.success('Profile updated successfully');
            navigate('/doctor/dashboard');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-4">
                    <Button
                        onClick={() => navigate('/doctor/dashboard')}
                        variant="ghost"
                        className="gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Dashboard
                    </Button>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                <Card className="max-w-2xl mx-auto">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="w-5 h-5" />
                            Edit Profile
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Profile Image */}
                            <div className="flex flex-col items-center gap-4">
                                <div className="relative">
                                    <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                        {profileImage ? (
                                            <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            <User className="w-16 h-16 text-gray-400" />
                                        )}
                                    </div>
                                    <label className="absolute bottom-0 right-0 bg-[#15558d] text-white p-2 rounded-full cursor-pointer hover:bg-[#104470] transition-colors">
                                        <Camera className="w-4 h-4" />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                                <p className="text-sm text-gray-500">Click camera icon to upload photo</p>
                            </div>

                            {/* Form Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="age">Age</Label>
                                    <Input
                                        id="age"
                                        name="age"
                                        type="number"
                                        value={formData.age}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        disabled
                                        className="bg-gray-100"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                                </div>

                                <div>
                                    <Label htmlFor="phoneNumber">Phone Number</Label>
                                    <Input
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        disabled
                                        className="bg-gray-100"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Phone cannot be changed</p>
                                </div>

                                <div>
                                    <Label htmlFor="specialization">Specialization</Label>
                                    <Input
                                        id="specialization"
                                        name="specialization"
                                        value={formData.specialization}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="medicalLicenseNumber">Medical License Number</Label>
                                    <Input
                                        id="medicalLicenseNumber"
                                        name="medicalLicenseNumber"
                                        value={formData.medicalLicenseNumber}
                                        onChange={handleChange}
                                        disabled
                                        className="bg-gray-100"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">License number cannot be changed</p>
                                </div>

                                <div className="md:col-span-2">
                                    <Label htmlFor="hospitalName">Hospital Name</Label>
                                    <Input
                                        id="hospitalName"
                                        name="hospitalName"
                                        value={formData.hospitalName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <Label htmlFor="hospitalAddress">Hospital Address</Label>
                                    <Textarea
                                        id="hospitalAddress"
                                        name="hospitalAddress"
                                        value={formData.hospitalAddress}
                                        onChange={handleChange}
                                        rows={3}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex gap-3">
                                <Button
                                    type="submit"
                                    disabled={saving}
                                    className="bg-[#15558d] hover:bg-[#104470] gap-2"
                                >
                                    <Save className="w-4 h-4" />
                                    {saving ? 'Saving...' : 'Save Changes'}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => navigate('/doctor/dashboard')}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default DoctorEditProfile;
