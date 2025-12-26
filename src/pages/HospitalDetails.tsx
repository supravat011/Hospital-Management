import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useHospital } from '@/contexts/HospitalContext';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Star, 
  Stethoscope,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Heart,
  Brain,
  Bone,
  Baby,
  Microscope,
  Syringe
} from 'lucide-react';

const departmentIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Cardiology: Heart,
  Neurology: Brain,
  Orthopedics: Bone,
  Pediatrics: Baby,
  Oncology: Microscope,
  'General Medicine': Stethoscope,
  Surgery: Syringe,
};

const HospitalDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { hospitals, setSelectedHospital } = useHospital();

  const hospital = hospitals.find((h) => h.id === id);

  if (!hospital) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Hospital Not Found</h2>
            <p className="text-muted-foreground mb-4">The hospital you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/hospitals">Browse Hospitals</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleProceedToLogin = () => {
    setSelectedHospital(hospital);
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-muted/50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/hospitals" className="text-muted-foreground hover:text-primary">
              <ArrowLeft className="w-4 h-4 inline mr-1" />
              Back to Hospitals
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="font-medium">{hospital.name}</span>
          </div>
        </div>
      </div>

      {/* Hospital Header */}
      <section className="gradient-light py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Hospital Logo/Image */}
            <div className="w-32 h-32 rounded-2xl gradient-primary flex items-center justify-center shadow-hover shrink-0">
              <Stethoscope className="w-16 h-16 text-primary-foreground" />
            </div>

            {/* Hospital Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">{hospital.name}</h1>
                  <div className="flex items-center gap-4 text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{hospital.city}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-accent fill-accent" />
                      <span className="font-semibold text-foreground">{hospital.rating}</span>
                    </div>
                  </div>
                </div>
                <Button size="lg" onClick={handleProceedToLogin}>
                  Proceed to Login
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

              {/* Quick Info */}
              <div className="flex flex-wrap gap-3">
                {hospital.departments.map((dept) => (
                  <Badge key={dept} variant="secondary" className="text-sm">
                    {dept}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-10 flex-1">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-muted-foreground">{hospital.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-muted-foreground">{hospital.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">{hospital.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Working Hours</p>
                      <p className="text-muted-foreground">24/7 Emergency Services</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Departments */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Departments Available</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {hospital.departments.map((dept) => {
                      const IconComponent = departmentIcons[dept] || Stethoscope;
                      return (
                        <div
                          key={dept}
                          className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                        >
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <IconComponent className="w-5 h-5 text-primary" />
                          </div>
                          <span className="font-medium">{dept}</span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Specialties */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Our Specialties</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {hospital.specialties.map((specialty) => (
                      <li key={specialty} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span>{specialty}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Emergency Card */}
              <Card className="border-destructive/50 bg-destructive/5">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2 text-destructive">
                    <AlertCircle className="w-5 h-5" />
                    Emergency Contact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-destructive mb-2">
                    {hospital.emergencyContact}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Available 24/7 for medical emergencies
                  </p>
                  <Button variant="destructive" className="w-full mt-4" size="lg">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Emergency
                  </Button>
                </CardContent>
              </Card>

              {/* CTA Card */}
              <Card className="gradient-primary text-primary-foreground">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-2">Ready to Access Your Records?</h3>
                  <p className="text-primary-foreground/80 mb-4 text-sm">
                    Login to view your medical history, diagnoses, and prescriptions.
                  </p>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full"
                    onClick={handleProceedToLogin}
                  >
                    Proceed to Login
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HospitalDetails;
