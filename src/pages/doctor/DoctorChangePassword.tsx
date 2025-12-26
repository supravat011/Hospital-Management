import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doctorService } from '@/services/doctorService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const DoctorChangePassword = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState({
        old: false,
        new: false,
        confirm: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const toggleVisibility = (field: 'old' | 'new' | 'confirm') => {
        setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.newPassword !== formData.confirmPassword) {
            toast.error("New passwords don't match");
            return;
        }

        if (formData.newPassword.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }

        try {
            setLoading(true);
            await doctorService.changePassword({
                oldPassword: formData.oldPassword,
                newPassword: formData.newPassword
            });
            toast.success("Password changed successfully");
            // Optional: Logout or redirect
            setFormData({ oldPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error: any) {
            console.error('Failed to change password:', error);
            const errorMessage = error.response?.data?.message || 'Failed to change password';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-8 font-sans">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold text-slate-900 mb-6">Change Password</h1>

                <Card className="bg-white border border-gray-100 shadow-sm rounded-xl">
                    <CardContent className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">

                            {/* Old Password */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Old Password</label>
                                <div className="relative">
                                    <Input
                                        type={showPassword.old ? "text" : "password"}
                                        name="oldPassword"
                                        value={formData.oldPassword}
                                        onChange={handleChange}
                                        placeholder="Enter old password"
                                        className="pr-10 h-11 border-gray-200"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => toggleVisibility('old')}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showPassword.old ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* New Password */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">New Password</label>
                                <div className="relative">
                                    <Input
                                        type={showPassword.new ? "text" : "password"}
                                        name="newPassword"
                                        value={formData.newPassword}
                                        onChange={handleChange}
                                        placeholder="Enter new password"
                                        className="pr-10 h-11 border-gray-200"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => toggleVisibility('new')}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showPassword.new ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Confirm Password</label>
                                <div className="relative">
                                    <Input
                                        type={showPassword.confirm ? "text" : "password"}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Confirm new password"
                                        className="pr-10 h-11 border-gray-200"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => toggleVisibility('confirm')}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showPassword.confirm ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center justify-end gap-3 pt-4">
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={() => navigate('/doctor/dashboard')}
                                    className="bg-gray-200 text-gray-700 hover:bg-gray-300 font-semibold px-6"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        'Save Changes'
                                    )}
                                </Button>
                            </div>

                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default DoctorChangePassword;
