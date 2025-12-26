import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { authService } from '@/services/authService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { LogIn, Stethoscope } from 'lucide-react';

const DoctorLogin = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        identifier: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await authService.doctorLogin(formData.identifier, formData.password);
            login(response.token, response.data, 'doctor');
            toast.success('Login successful!');
            navigate('/doctor/dashboard');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#eef9ff] via-[#f0f9ff] to-[#e6f4ff] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/40 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-3xl -z-10"></div>

            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                        <span className="text-4xl font-bold text-[#15558d] tracking-tight">EHR</span>
                        <span className="text-4xl font-bold text-[#09e5ab] tracking-tight ml-2">NOW</span>
                    </div>
                    <h1 className="text-3xl font-bold text-[#272b41] mb-2">Doctor Portal</h1>
                    <p className="text-gray-600">Access your professional dashboard</p>
                </div>

                <Card className="shadow-[0_10px_60px_rgba(0,0,0,0.1)] border-gray-100">
                    <CardHeader className="bg-gradient-to-r from-[#15558d] to-[#0092d6] text-white rounded-t-lg">
                        <CardTitle className="text-2xl flex items-center gap-2">
                            <Stethoscope className="w-6 h-6" />
                            Doctor Login
                        </CardTitle>
                        <CardDescription className="text-blue-100">
                            Manage your patients and appointments
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <Label htmlFor="identifier" className="text-[#272b41] font-semibold">
                                    Email or Phone Number
                                </Label>
                                <Input
                                    id="identifier"
                                    name="identifier"
                                    value={formData.identifier}
                                    onChange={handleChange}
                                    placeholder="doctor@example.com or phone"
                                    required
                                    className="mt-1 border-gray-300 focus:border-[#15558d] focus:ring-[#15558d]"
                                />
                            </div>

                            <div>
                                <Label htmlFor="password" className="text-[#272b41] font-semibold">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 border-gray-300 focus:border-[#15558d] focus:ring-[#15558d]"
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-[#15558d] hover:bg-[#104470] text-white rounded-full px-8 py-6 text-lg font-bold transition-all shadow-lg shadow-[#15558d]/20"
                                disabled={loading}
                            >
                                {loading ? 'Logging in...' : 'Access Dashboard'}
                            </Button>

                            <div className="text-center space-y-2">
                                <p className="text-gray-600">
                                    Don't have an account?{' '}
                                    <Link to="/doctor/signup" className="text-[#15558d] hover:text-[#0092d6] font-semibold hover:underline">
                                        Register here
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

export default DoctorLogin;
