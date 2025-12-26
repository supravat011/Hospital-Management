import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { useHospital } from '@/contexts/HospitalContext';
import { useToast } from '@/hooks/use-toast';
import { 
  Mail, 
  Lock, 
  User, 
  Stethoscope, 
  Users, 
  Shield,
  Fingerprint,
  Hospital,
  Loader2
} from 'lucide-react';

const roleOptions: { value: UserRole; label: string; icon: React.ComponentType<{ className?: string }>; description: string }[] = [
  { value: 'patient', label: 'Patient', icon: User, description: 'View your medical records' },
  { value: 'doctor', label: 'Doctor', icon: Stethoscope, description: 'Manage patient diagnoses' },
  { value: 'staff', label: 'Hospital Staff', icon: Users, description: 'Access emergency records' },
  { value: 'admin', label: 'Admin', icon: Shield, description: 'System administration' },
];

const Login = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const { selectedHospital } = useHospital();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('patient');
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    if (password.length < 4) {
      toast({
        title: 'Error',
        description: 'Password must be at least 4 characters.',
        variant: 'destructive',
      });
      return;
    }

    const success = await login(email, password, role);
    
    if (success) {
      toast({
        title: 'Welcome!',
        description: `Successfully logged in as ${role}`,
      });
      
      // Redirect based on role
      switch (role) {
        case 'doctor':
          navigate('/dashboard/doctor');
          break;
        case 'patient':
          navigate('/dashboard/patient');
          break;
        case 'staff':
          navigate('/dashboard/staff');
          break;
        case 'admin':
          navigate('/dashboard/admin');
          break;
        default:
          navigate('/');
      }
    } else {
      toast({
        title: 'Login Failed',
        description: 'Invalid credentials. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <section className="flex-1 gradient-light py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto">
            {/* Hospital Context */}
            {selectedHospital && (
              <div className="mb-6 p-4 bg-card rounded-xl shadow-soft flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center">
                  <Hospital className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Logging in to</p>
                  <p className="font-semibold">{selectedHospital.name}</p>
                </div>
              </div>
            )}

            <Card className="shadow-card border-0">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl">
                  {isSignUp ? 'Create Account' : 'Welcome Back'}
                </CardTitle>
                <CardDescription>
                  {isSignUp 
                    ? 'Register to access the medical system'
                    : 'Sign in to access your dashboard'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="login" onClick={() => setIsSignUp(false)}>
                      Sign In
                    </TabsTrigger>
                    <TabsTrigger value="signup" onClick={() => setIsSignUp(true)}>
                      Register
                    </TabsTrigger>
                  </TabsList>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Role Selection */}
                    <div className="space-y-3">
                      <Label className="text-base font-semibold">Select Your Role</Label>
                      <RadioGroup
                        value={role}
                        onValueChange={(value) => setRole(value as UserRole)}
                        className="grid grid-cols-2 gap-3"
                      >
                        {roleOptions.map((option) => (
                          <Label
                            key={option.value}
                            htmlFor={option.value}
                            className={`flex flex-col items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                              role === option.value
                                ? 'border-primary bg-primary/5'
                                : 'border-border hover:border-primary/50'
                            }`}
                          >
                            <RadioGroupItem
                              value={option.value}
                              id={option.value}
                              className="sr-only"
                            />
                            <option.icon className={`w-8 h-8 mb-2 ${
                              role === option.value ? 'text-primary' : 'text-muted-foreground'
                            }`} />
                            <span className="font-medium text-sm">{option.label}</span>
                          </Label>
                        ))}
                      </RadioGroup>
                    </div>

                    {/* Name field for signup */}
                    {isSignUp && (
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input
                            id="name"
                            type="text"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="pl-10 h-12"
                          />
                        </div>
                      </div>
                    )}

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 h-12"
                          required
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10 h-12"
                          required
                        />
                      </div>
                    </div>

                    {/* Biometric Option */}
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full h-12"
                      onClick={() => {
                        toast({
                          title: 'Biometric Login',
                          description: 'Face recognition simulation activated. (Demo only)',
                        });
                      }}
                    >
                      <Fingerprint className="w-5 h-5 mr-2" />
                      Use Biometric Login
                    </Button>

                    {/* Submit */}
                    <Button type="submit" size="lg" className="w-full" disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Please wait...
                        </>
                      ) : (
                        isSignUp ? 'Create Account' : 'Sign In'
                      )}
                    </Button>
                  </form>
                </Tabs>

                {/* Demo credentials hint */}
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground text-center">
                    <strong>Demo:</strong> Use any email and password (min 4 chars) to login
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Login;
