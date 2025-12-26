import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import VoiceButton from '@/components/VoiceButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useHospital } from '@/contexts/HospitalContext';
import {
  FileText,
  Download,
  Calendar,
  Pill,
  Apple,
  Stethoscope,
  Clock,
  ChevronRight,
  Volume2
} from 'lucide-react';

// Mock medical records
const mockRecords = [
  {
    id: 'r1',
    date: '2024-01-15',
    doctor: 'Dr. Rajesh Kumar',
    diagnosis: 'Type 2 Diabetes Management',
    diagnosisTamil: 'நீரிழிவு நோய் கட்டுப்பாடு - இரத்த சர்க்கரை அளவை சீராக பராமரிக்க வேண்டும்',
    medicines: 'Metformin 500mg - twice daily after meals\nGlimepiride 1mg - once daily before breakfast',
    medicinesTamil: 'மெட்ஃபார்மின் 500 மில்லிகிராம் - தினமும் இரு வேளை உணவுக்குப் பிறகு. க்ளிமிபிரைட் 1 மில்லிகிராம் - தினமும் காலை உணவுக்கு முன்',
    diet: 'Avoid sugar and refined carbs. Eat more vegetables, whole grains, and lean proteins. Small frequent meals.',
    dietTamil: 'சர்க்கரை மற்றும் வெள்ளை அரிசி தவிர்க்கவும். காய்கறிகள், முழு தானியங்கள் மற்றும் புரதம் அதிகம் சாப்பிடுங்கள். சிறிய அளவில் அடிக்கடி சாப்பிடுங்கள்.',
    followUp: '2024-02-15',
    hasReport: true,
  },
  {
    id: 'r2',
    date: '2023-12-20',
    doctor: 'Dr. Anitha Devi',
    diagnosis: 'Routine Health Checkup',
    diagnosisTamil: 'வழக்கமான உடல்நல பரிசோதனை - அனைத்து அளவுகளும் சாதாரணமாக உள்ளன',
    medicines: 'Vitamin D3 60000 IU - once weekly\nCalcium 500mg - once daily',
    medicinesTamil: 'வைட்டமின் டி3 - வாரம் ஒருமுறை. கால்சியம் 500 மில்லிகிராம் - தினமும் ஒரு முறை',
    diet: 'Balanced diet with adequate protein. Include dairy products and green leafy vegetables.',
    dietTamil: 'புரதம் நிறைந்த சமச்சீர் உணவு. பால் பொருட்கள் மற்றும் கீரைகள் சேர்க்கவும்.',
    followUp: '2024-06-20',
    hasReport: true,
  },
];

const PatientDashboard = () => {
  const { selectedHospital } = useHospital();

  return (
    <DashboardLayout title="Patient Dashboard">
      {/* Welcome Message */}
      <Card className="mb-6 gradient-primary text-primary-foreground">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-2">Welcome to Your Health Portal</h2>
          <p className="text-primary-foreground/80">
            Access your medical records, prescriptions, and health information from {selectedHospital?.name || 'your connected hospitals'}.
          </p>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Records', value: '12', icon: FileText, color: 'bg-primary' },
          { label: 'Prescriptions', value: '8', icon: Pill, color: 'bg-accent' },
          { label: 'Scan Reports', value: '5', icon: Download, color: 'bg-success' },
          { label: 'Next Follow-up', value: 'Feb 15', icon: Calendar, color: 'bg-destructive' },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Medical Records */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Your Medical Records</h3>
          <Badge variant="secondary">View Only</Badge>
        </div>

        {mockRecords.map((record, index) => (
          <Card
            key={record.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Stethoscope className="w-5 h-5 text-primary" />
                    {record.diagnosis}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-4 mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {record.date}
                    </span>
                    <span>{record.doctor}</span>
                  </CardDescription>
                </div>
                {record.hasReport && (
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download Report
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Diagnosis */}
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <Stethoscope className="w-4 h-4 text-primary" />
                    Diagnosis
                  </h4>
                  <VoiceButton text={record.diagnosisTamil} size="lg" label="Listen in Tamil" />
                </div>
                <p className="text-muted-foreground">{record.diagnosis}</p>
              </div>

              {/* Medicines */}
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <Pill className="w-4 h-4 text-primary" />
                    Prescribed Medicines
                  </h4>
                  <VoiceButton text={record.medicinesTamil} size="lg" label="Listen in Tamil" />
                </div>
                <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-sans">
                  {record.medicines}
                </pre>
              </div>

              {/* Diet Instructions */}
              <div className="p-4 rounded-lg bg-success/5 border border-success/20">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <Apple className="w-4 h-4 text-success" />
                    Diet Instructions
                  </h4>
                  <VoiceButton text={record.dietTamil} size="lg" label="Listen in Tamil" />
                </div>
                <p className="text-muted-foreground">{record.diet}</p>
              </div>

              {/* Follow-up */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-accent/10 border border-accent/20">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-accent" />
                  <div>
                    <p className="font-medium">Next Follow-up</p>
                    <p className="text-sm text-muted-foreground">{record.followUp}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  View Details
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Voice Assistance Info */}
      <Card className="mt-8 border-primary/20 bg-primary/5">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shrink-0">
              <Volume2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h4 className="font-semibold mb-1">Tamil Voice Assistance</h4>
              <p className="text-sm text-muted-foreground">
                Click the speaker button next to any medical instruction to hear it in Tamil. 
                This feature is designed for elderly patients who prefer audio assistance.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default PatientDashboard;
