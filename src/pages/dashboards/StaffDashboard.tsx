import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  Search,
  User,
  FileText,
  AlertTriangle,
  Fingerprint,
  Phone,
  Calendar,
  Pill,
  Activity,
  Clock
} from 'lucide-react';

// Mock patient lookup result
const mockPatientResult = {
  id: 'p1',
  name: 'Priya Sharma',
  age: 45,
  gender: 'Female',
  bloodGroup: 'B+',
  allergies: ['Penicillin', 'Sulfa drugs'],
  emergencyContact: '+91 98765 43210',
  lastVisit: '2024-01-15',
  currentMedications: [
    { name: 'Metformin 500mg', frequency: 'Twice daily' },
    { name: 'Glimepiride 1mg', frequency: 'Once daily' },
  ],
  recentDiagnosis: 'Type 2 Diabetes Management',
  vitals: {
    bp: '120/80 mmHg',
    pulse: '72 bpm',
    temperature: '98.6°F',
    weight: '65 kg',
  },
};

const StaffDashboard = () => {
  const { toast } = useToast();
  const [patientId, setPatientId] = useState('');
  const [searchResult, setSearchResult] = useState<typeof mockPatientResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientId.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a patient ID',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSearchResult(mockPatientResult);
    setIsLoading(false);
  };

  const handleBiometricSearch = () => {
    toast({
      title: 'Biometric Scan',
      description: 'Face recognition activated. Please position the patient in front of the camera. (Demo simulation)',
    });
    // Simulate biometric search
    setTimeout(() => {
      setSearchResult(mockPatientResult);
      toast({
        title: 'Patient Identified',
        description: `Patient ${mockPatientResult.name} has been identified.`,
      });
    }, 2000);
  };

  return (
    <DashboardLayout title="Hospital Staff Dashboard">
      {/* Search Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Patient Lookup</CardTitle>
          <CardDescription>
            Search for patient records using ID or biometric verification
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="patientId" className="sr-only">Patient ID</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="patientId"
                  placeholder="Enter Patient ID (e.g., P001)"
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>
            <Button type="submit" size="lg" disabled={isLoading}>
              <Search className="w-5 h-5 mr-2" />
              Search
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={handleBiometricSearch}
            >
              <Fingerprint className="w-5 h-5 mr-2" />
              Biometric Scan
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Search Result */}
      {searchResult && (
        <div className="space-y-6 animate-fade-in">
          {/* Emergency Alert Card */}
          <Card className="border-destructive/50 bg-destructive/5">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="w-5 h-5" />
                Emergency Medical Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-3 bg-card rounded-lg">
                  <p className="text-sm text-muted-foreground">Blood Group</p>
                  <p className="text-xl font-bold text-destructive">{searchResult.bloodGroup}</p>
                </div>
                <div className="p-3 bg-card rounded-lg">
                  <p className="text-sm text-muted-foreground">Known Allergies</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {searchResult.allergies.map((allergy) => (
                      <Badge key={allergy} variant="destructive" className="text-xs">
                        {allergy}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="p-3 bg-card rounded-lg">
                  <p className="text-sm text-muted-foreground">Emergency Contact</p>
                  <p className="font-medium flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    {searchResult.emergencyContact}
                  </p>
                </div>
                <div className="p-3 bg-card rounded-lg">
                  <p className="text-sm text-muted-foreground">Current Diagnosis</p>
                  <p className="font-medium">{searchResult.recentDiagnosis}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Patient Details */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Patient Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold">{searchResult.name}</p>
                    <p className="text-muted-foreground">
                      {searchResult.age} years • {searchResult.gender}
                    </p>
                  </div>
                </div>
                <div className="pt-4 border-t border-border space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Patient ID</span>
                    <span className="font-medium">{searchResult.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Blood Group</span>
                    <Badge variant="secondary">{searchResult.bloodGroup}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Visit</span>
                    <span className="font-medium">{searchResult.lastVisit}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Vitals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-success" />
                  Latest Vitals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(searchResult.vitals).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                    <span className="text-muted-foreground capitalize">
                      {key === 'bp' ? 'Blood Pressure' : key}
                    </span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Current Medications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Pill className="w-5 h-5 text-accent" />
                  Current Medications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {searchResult.currentMedications.map((med, index) => (
                  <div key={index} className="p-3 rounded-lg bg-muted/50">
                    <p className="font-medium">{med.name}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {med.frequency}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Read-only notice */}
          <Card className="bg-muted/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  <strong>Read-only access:</strong> As hospital staff, you can view patient records but cannot modify medical data. 
                  Contact the attending doctor for any updates.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Empty State */}
      {!searchResult && (
        <Card className="mt-8">
          <CardContent className="p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Search className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Search for Patient</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Enter a patient ID or use biometric scan to retrieve patient records for emergency medical summary.
            </p>
          </CardContent>
        </Card>
      )}
    </DashboardLayout>
  );
};

export default StaffDashboard;
