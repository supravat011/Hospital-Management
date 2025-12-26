import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { patientService } from '@/services/patientService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { User, Camera, Save, ArrowLeft } from 'lucide-react';

const PatientEditProfile = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [profileImage, setProfileImage] = useState<string>('');
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        bloodGroup: '',
        height: '',
        weight: '',
        mobileNumber: ''
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await patientService.getProfile();
            const data = response.data;
            setFormData({
                name: data.name || '',
                age: data.age?.toString() || '',
                bloodGroup: data.bloodGroup || '',
                height: data.height?.toString() || '',
                weight: data.weight?.toString() || '',
                mobileNumber: data.mobileNumber || ''
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            await patientService.updateProfile({
                ...formData,
                age: parseInt(formData.age),
                height: parseInt(formData.height),
                weight: parseInt(formData.weight),
                profileImage
            });
            toast.success('Profile updated successfully');
            navigate('/patient/dashboard');
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
                        onClick={() => navigate('/patient/dashboard')}
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
                                    <Label htmlFor="bloodGroup">Blood Group</Label>
                                    <Input
                                        id="bloodGroup"
                                        name="bloodGroup"
                                        value={formData.bloodGroup}
                                        onChange={handleChange}
                                        placeholder="e.g., O+, A-, B+"
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="height">Height (cm)</Label>
                                    <Input
                                        id="height"
                                        name="height"
                                        type="number"
                                        value={formData.height}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="weight">Weight (kg)</Label>
                                    <Input
                                        id="weight"
                                        name="weight"
                                        type="number"
                                        value={formData.weight}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="mobileNumber">Mobile Number</Label>
                                    <Input
                                        id="mobileNumber"
                                        name="mobileNumber"
                                        value={formData.mobileNumber}
                                        onChange={handleChange}
                                        disabled
                                        className="bg-gray-100"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Mobile number cannot be changed</p>
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
                                    onClick={() => navigate('/patient/dashboard')}
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

export default PatientEditProfile;
