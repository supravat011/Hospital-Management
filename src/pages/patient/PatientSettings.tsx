import React, { useState } from 'react';
import PatientSidebar from '@/components/PatientSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, Lock, User, Mail, Phone, Shield, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { patientService } from '@/services/patientService';

const PatientSettings = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [profileData, setProfileData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: ''
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [notificationSettings, setNotificationSettings] = useState({
        emailNotifications: true,
        smsNotifications: false,
        appointmentReminders: true,
        healthTips: true
    });

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfileData({
            ...profileData,
            [e.target.name]: e.target.value
        });
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordData({
            ...passwordData,
            [e.target.name]: e.target.value
        });
    };

    const handleNotificationChange = (key: string) => {
        setNotificationSettings({
            ...notificationSettings,
            [key]: !notificationSettings[key as keyof typeof notificationSettings]
        });
    };

    const handleProfileSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await patientService.updateProfile(profileData);
            toast.success('Profile updated successfully');
        } catch (error) {
            toast.error('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        if (passwordData.newPassword.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }

        setLoading(true);
        try {
            await patientService.changePassword({
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword
            });
            toast.success('Password changed successfully');
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error) {
            toast.error('Failed to change password');
        } finally {
            setLoading(false);
        }
    };

    const handleNotificationSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await patientService.updateNotificationSettings(notificationSettings);
            toast.success('Notification settings updated');
        } catch (error) {
            toast.error('Failed to update settings');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <PatientSidebar activeSection="Settings" />

            <main className="flex-1 p-4 lg:p-8 overflow-y-auto page-transition">
                <div className="max-w-4xl mx-auto space-y-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
                        <p className="text-gray-500 mt-1">Manage your account settings and preferences</p>
                    </div>

                    {/* Profile Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="w-5 h-5" />
                                Profile Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleProfileSubmit} className="space-y-4">
                                <div>
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={profileData.name}
                                        onChange={handleProfileChange}
                                        placeholder="Enter your full name"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={profileData.email}
                                        onChange={handleProfileChange}
                                        placeholder="Enter your email"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        value={profileData.phone}
                                        onChange={handleProfileChange}
                                        placeholder="Enter your phone number"
                                    />
                                </div>

                                <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700">
                                    {loading ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Security Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Lock className="w-5 h-5" />
                                Change Password
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handlePasswordSubmit} className="space-y-4">
                                <div>
                                    <Label htmlFor="currentPassword">Current Password</Label>
                                    <div className="relative">
                                        <Input
                                            id="currentPassword"
                                            name="currentPassword"
                                            type={showPassword ? 'text' : 'password'}
                                            value={passwordData.currentPassword}
                                            onChange={handlePasswordChange}
                                            placeholder="Enter current password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="newPassword">New Password</Label>
                                    <Input
                                        id="newPassword"
                                        name="newPassword"
                                        type={showPassword ? 'text' : 'password'}
                                        value={passwordData.newPassword}
                                        onChange={handlePasswordChange}
                                        placeholder="Enter new password"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                    <Input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={showPassword ? 'text' : 'password'}
                                        value={passwordData.confirmPassword}
                                        onChange={handlePasswordChange}
                                        placeholder="Confirm new password"
                                    />
                                </div>

                                <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700">
                                    {loading ? 'Changing...' : 'Change Password'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Notification Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Bell className="w-5 h-5" />
                                Notification Preferences
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleNotificationSubmit} className="space-y-4">
                                <div className="space-y-4">
                                    {Object.entries(notificationSettings).map(([key, value]) => (
                                        <div key={key} className="flex items-center justify-between py-2">
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Receive {key.toLowerCase().replace(/([A-Z])/g, ' $1')}
                                                </p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => handleNotificationChange(key)}
                                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${value ? 'bg-blue-600' : 'bg-gray-200'
                                                    }`}
                                            >
                                                <span
                                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${value ? 'translate-x-6' : 'translate-x-1'
                                                        }`}
                                                />
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700">
                                    {loading ? 'Saving...' : 'Save Preferences'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Privacy & Security Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Shield className="w-5 h-5" />
                                Privacy & Security
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <p className="text-sm text-gray-600">
                                Your data is encrypted and stored securely. We never share your personal information with third parties without your consent.
                            </p>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm">Download My Data</Button>
                                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">Delete Account</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
};

export default PatientSettings;
