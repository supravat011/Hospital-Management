import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { authService } from '@/services/authService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const DoctorSignup = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        phoneNumber: '',
        email: '',
        medicalLicenseNumber: '',
        specialization: '',
        hospitalName: '',
        hospitalAddress: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            const response = await authService.doctorSignup({
                name: formData.name,
                age: parseInt(formData.age),
                phoneNumber: formData.phoneNumber,
                email: formData.email,
                medicalLicenseNumber: formData.medicalLicenseNumber,
                specialization: formData.specialization,
                hospitalName: formData.hospitalName,
                hospitalAddress: formData.hospitalAddress,
                password: formData.password
            });

            login(response.token, response.data, 'doctor');
            toast.success(`Registration successful! Your Doctor ID: ${response.data.doctorId}`);
            navigate('/doctor/dashboard');
        } catch (error: any) {
            toast.error(error.response?.data?.error || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl text-[#15558d]">Doctor Registration</CardTitle>
                    <CardDescription>Create your EHR NOW doctor account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="name">Full Name *</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="age">Age *</Label>
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
                                <Label htmlFor="phoneNumber">Phone Number *</Label>
                                <Input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="email">Email *</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="medicalLicenseNumber">Medical License Number *</Label>
                                <Input
                                    id="medicalLicenseNumber"
                                    name="medicalLicenseNumber"
                                    value={formData.medicalLicenseNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="specialization">Specialization *</Label>
                                <Input
                                    id="specialization"
                                    name="specialization"
                                    value={formData.specialization}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="md:col-span-2">
                                <Label htmlFor="hospitalName">Hospital Name *</Label>
                                <Input
                                    id="hospitalName"
                                    name="hospitalName"
                                    value={formData.hospitalName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="md:col-span-2">
                                <Label htmlFor="hospitalAddress">Hospital Address *</Label>
                                <textarea
                                    id="hospitalAddress"
                                    name="hospitalAddress"
                                    value={formData.hospitalAddress}
                                    onChange={handleChange}
                                    required
                                    className="w-full min-h-[80px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#15558d]"
                                />
                            </div>

                            <div>
                                <Label htmlFor="password">Password *</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    minLength={6}
                                />
                            </div>

                            <div>
                                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    minLength={6}
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-[#15558d] hover:bg-[#104470]"
                            disabled={loading}
                        >
                            {loading ? 'Registering...' : 'Register'}
                        </Button>

                        <p className="text-center text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link to="/doctor/login" className="text-[#15558d] hover:underline">
                                Login here
                            </Link>
                        </p>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default DoctorSignup;
