import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { authService } from '@/services/authService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { User, Heart, Activity } from 'lucide-react';

const PatientSignup = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        bloodGroup: '',
        height: '',
        weight: '',
        mobileNumber: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            const response = await authService.patientSignup({
                name: formData.name,
                age: parseInt(formData.age),
                bloodGroup: formData.bloodGroup,
                height: parseInt(formData.height),
                weight: parseInt(formData.weight),
                mobileNumber: formData.mobileNumber,
                password: formData.password
            });

            login(response.token, response.data, 'patient');
            toast.success(`Registration successful! Your Patient ID: ${response.data.patientId}`);
            navigate('/patient/dashboard');
        } catch (error: any) {
            toast.error(error.response?.data?.error || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#eef9ff] via-[#f0f9ff] to-[#e6f4ff] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/40 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-3xl -z-10"></div>

            <div className="w-full max-w-4xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                        <span className="text-4xl font-bold text-[#15558d] tracking-tight">EHR</span>
                        <span className="text-4xl font-bold text-[#09e5ab] tracking-tight ml-2">NOW</span>
                    </div>
                    <h1 className="text-3xl font-bold text-[#272b41] mb-2">Patient Registration</h1>
                    <p className="text-gray-600">Join our healthcare platform for better medical care</p>
                </div>

                <Card className="shadow-[0_10px_60px_rgba(0,0,0,0.1)] border-gray-100">
                    <CardHeader className="bg-gradient-to-r from-[#15558d] to-[#0092d6] text-white rounded-t-lg">
                        <CardTitle className="text-2xl flex items-center gap-2">
                            <User className="w-6 h-6" />
                            Create Your Patient Account
                        </CardTitle>
                        <CardDescription className="text-blue-100">
                            Fill in your details to get started with EHR NOW
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="name" className="text-[#272b41] font-semibold">Full Name *</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 border-gray-300 focus:border-[#15558d] focus:ring-[#15558d]"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="age" className="text-[#272b41] font-semibold">Age *</Label>
                                    <Input
                                        id="age"
                                        name="age"
                                        type="number"
                                        value={formData.age}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 border-gray-300 focus:border-[#15558d] focus:ring-[#15558d]"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="bloodGroup" className="text-[#272b41] font-semibold flex items-center gap-2">
                                        <Heart className="w-4 h-4 text-[#ff5722]" />
                                        Blood Group *
                                    </Label>
                                    <Select
                                        value={formData.bloodGroup}
                                        onValueChange={(value) => setFormData({ ...formData, bloodGroup: value })}
                                    >
                                        <SelectTrigger className="mt-1 border-gray-300 focus:border-[#15558d] focus:ring-[#15558d]">
                                            <SelectValue placeholder="Select blood group" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
                                                <SelectItem key={bg} value={bg}>{bg}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label htmlFor="height" className="text-[#272b41] font-semibold flex items-center gap-2">
                                        <Activity className="w-4 h-4 text-[#0092d6]" />
                                        Height (cm) *
                                    </Label>
                                    <Input
                                        id="height"
                                        name="height"
                                        type="number"
                                        value={formData.height}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 border-gray-300 focus:border-[#15558d] focus:ring-[#15558d]"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="weight" className="text-[#272b41] font-semibold">Weight (kg) *</Label>
                                    <Input
                                        id="weight"
                                        name="weight"
                                        type="number"
                                        value={formData.weight}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 border-gray-300 focus:border-[#15558d] focus:ring-[#15558d]"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="mobileNumber" className="text-[#272b41] font-semibold">Mobile Number *</Label>
                                    <Input
                                        id="mobileNumber"
                                        name="mobileNumber"
                                        value={formData.mobileNumber}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 border-gray-300 focus:border-[#15558d] focus:ring-[#15558d]"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="password" className="text-[#272b41] font-semibold">Password *</Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        minLength={6}
                                        className="mt-1 border-gray-300 focus:border-[#15558d] focus:ring-[#15558d]"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="confirmPassword" className="text-[#272b41] font-semibold">Confirm Password *</Label>
                                    <Input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                        minLength={6}
                                        className="mt-1 border-gray-300 focus:border-[#15558d] focus:ring-[#15558d]"
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-[#09e5ab] hover:bg-[#07c593] text-white rounded-full px-8 py-6 text-lg font-bold transition-all shadow-lg shadow-[#09e5ab]/20"
                                disabled={loading}
                            >
                                {loading ? 'Creating Account...' : 'Create Patient Account'}
                            </Button>

                            <div className="text-center">
                                <p className="text-gray-600">
                                    Already have an account?{' '}
                                    <Link to="/patient/login" className="text-[#15558d] hover:text-[#0092d6] font-semibold hover:underline">
                                        Login here
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Back to home */}
                <div className="text-center mt-6">
                    <Link to="/" className="text-[#15558d] hover:text-[#0092d6] font-semibold hover:underline">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PatientSignup;
