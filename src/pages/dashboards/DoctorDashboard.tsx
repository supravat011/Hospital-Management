import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import {
  Users,
  FileText,
  MessageSquare,
  Plus,
  Upload,
  Calendar,
  User,
  Pill,
  Apple,
  Stethoscope,
  Clock
} from 'lucide-react';

// Mock patient data
const mockPatients = [
  { id: 'p1', name: 'Priya Sharma', age: 45, lastVisit: '2024-01-10', condition: 'Diabetes' },
  { id: 'p2', name: 'Rajesh Kumar', age: 62, lastVisit: '2024-01-12', condition: 'Hypertension' },
  { id: 'p3', name: 'Anitha Devi', age: 35, lastVisit: '2024-01-14', condition: 'Thyroid' },
  { id: 'p4', name: 'Murugan S', age: 58, lastVisit: '2024-01-15', condition: 'Cardiac' },
];

const DoctorDashboard = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [formData, setFormData] = useState({
    bodyCondition: '',
    diagnosis: '',
    medicines: '',
    dietInstructions: '',
    followUpDate: '',
  });

  const stats = [
    { label: 'Total Patients', value: '124', icon: Users, color: 'bg-primary' },
    { label: 'Today\'s Appointments', value: '8', icon: Calendar, color: 'bg-accent' },
    { label: 'Pending Records', value: '5', icon: FileText, color: 'bg-success' },
    { label: 'Patient Queries', value: '3', icon: MessageSquare, color: 'bg-destructive' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Record Saved',
      description: 'Patient medical record has been updated successfully.',
    });
    setIsDialogOpen(false);
    setFormData({
      bodyCondition: '',
      diagnosis: '',
      medicines: '',
      dietInstructions: '',
      followUpDate: '',
    });
  };

  return (
    <DashboardLayout title="Doctor Dashboard">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Card key={stat.label} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="lg">
                    <Plus className="w-5 h-5 mr-2" />
                    New Medical Record
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create Medical Record</DialogTitle>
                    <DialogDescription>
                      Enter patient diagnosis and prescription details
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label>Select Patient</Label>
                      <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a patient" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockPatients.map((patient) => (
                            <SelectItem key={patient.id} value={patient.id}>
                              {patient.name} - {patient.age} years
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bodyCondition">Body Condition</Label>
                      <Textarea
                        id="bodyCondition"
                        placeholder="Describe the patient's current body condition..."
                        value={formData.bodyCondition}
                        onChange={(e) => setFormData({ ...formData, bodyCondition: e.target.value })}
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="diagnosis">Diagnosis Explanation</Label>
                      <Textarea
                        id="diagnosis"
                        placeholder="Detailed diagnosis and medical findings..."
                        value={formData.diagnosis}
                        onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
                        rows={4}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="medicines">
                        <Pill className="w-4 h-4 inline mr-1" />
                        Prescribed Medicines
                      </Label>
                      <Textarea
                        id="medicines"
                        placeholder="List of medicines with dosage and frequency..."
                        value={formData.medicines}
                        onChange={(e) => setFormData({ ...formData, medicines: e.target.value })}
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dietInstructions">
                        <Apple className="w-4 h-4 inline mr-1" />
                        Diet Instructions
                      </Label>
                      <Textarea
                        id="dietInstructions"
                        placeholder="Dietary recommendations and restrictions..."
                        value={formData.dietInstructions}
                        onChange={(e) => setFormData({ ...formData, dietInstructions: e.target.value })}
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="followUpDate">Follow-up Date</Label>
                      <Input
                        id="followUpDate"
                        type="date"
                        value={formData.followUpDate}
                        onChange={(e) => setFormData({ ...formData, followUpDate: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Upload Scan Reports</Label>
                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                        <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Drag and drop PDF or JPG files here
                        </p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Browse Files
                        </Button>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" className="flex-1">
                        Save Record
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
              <Button variant="outline" size="lg">
                <FileText className="w-5 h-5 mr-2" />
                View Records
              </Button>
              <Button variant="outline" size="lg">
                <MessageSquare className="w-5 h-5 mr-2" />
                Patient Queries
              </Button>
            </CardContent>
          </Card>

          {/* Recent Patients */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Patients</CardTitle>
              <CardDescription>Patients you've treated recently</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockPatients.map((patient) => (
                  <div
                    key={patient.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{patient.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {patient.age} years • {patient.condition}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Last Visit</p>
                      <p className="font-medium">{patient.lastVisit}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Today's Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Today's Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { time: '09:00 AM', patient: 'Priya Sharma', type: 'Follow-up' },
                { time: '10:30 AM', patient: 'New Patient', type: 'Consultation' },
                { time: '02:00 PM', patient: 'Rajesh Kumar', type: 'Check-up' },
              ].map((appointment, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="text-center">
                    <p className="text-sm font-medium text-primary">{appointment.time}</p>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{appointment.patient}</p>
                    <Badge variant="secondary" className="text-xs">{appointment.type}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Pending Queries */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-accent" />
                Pending Queries
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { patient: 'Anitha Devi', query: 'Question about medication dosage' },
                { patient: 'Murugan S', query: 'Diet clarification needed' },
              ].map((query, index) => (
                <div key={index} className="p-3 rounded-lg border border-border">
                  <p className="font-medium text-sm">{query.patient}</p>
                  <p className="text-sm text-muted-foreground">{query.query}</p>
                  <Button variant="link" size="sm" className="px-0 mt-1">
                    Respond →
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DoctorDashboard;
