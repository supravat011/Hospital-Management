import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Building2,
  Users,
  UserCheck,
  UserX,
  TrendingUp,
  Activity,
  CheckCircle,
  XCircle,
  Clock,
  ChevronRight
} from 'lucide-react';

// Mock data
const pendingApprovals = [
  { id: 1, name: 'Dr. Suresh Kumar', role: 'Doctor', hospital: 'Apollo Hospitals', specialty: 'Cardiology', status: 'pending' },
  { id: 2, name: 'Lakshmi R', role: 'Staff', hospital: 'MIOT International', specialty: 'N/A', status: 'pending' },
  { id: 3, name: 'Dr. Priya Menon', role: 'Doctor', hospital: 'Ganga Hospital', specialty: 'Orthopedics', status: 'pending' },
];

const hospitalStats = [
  { name: 'Apollo Hospitals', city: 'Chennai', doctors: 45, patients: 1250, records: 3400, growth: 12 },
  { name: 'MIOT International', city: 'Chennai', doctors: 38, patients: 980, records: 2800, growth: 8 },
  { name: 'Ganga Hospital', city: 'Coimbatore', doctors: 32, patients: 720, records: 2100, growth: 15 },
  { name: 'PSG Hospitals', city: 'Coimbatore', doctors: 28, patients: 650, records: 1800, growth: 10 },
];

const AdminDashboard = () => {
  const stats = [
    { label: 'Total Hospitals', value: '6', icon: Building2, color: 'bg-primary' },
    { label: 'Active Doctors', value: '184', icon: UserCheck, color: 'bg-success' },
    { label: 'Total Patients', value: '4,520', icon: Users, color: 'bg-accent' },
    { label: 'Pending Approvals', value: '3', icon: Clock, color: 'bg-destructive' },
  ];

  return (
    <DashboardLayout title="Admin Dashboard">
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
          {/* Hospital Overview */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Hospital-wise Statistics</CardTitle>
                  <CardDescription>Usage metrics across all connected hospitals</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  View All
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {hospitalStats.map((hospital) => (
                  <div key={hospital.name} className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold">{hospital.name}</p>
                        <p className="text-sm text-muted-foreground">{hospital.city}</p>
                      </div>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        +{hospital.growth}%
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Doctors</p>
                        <p className="font-medium">{hospital.doctors}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Patients</p>
                        <p className="font-medium">{hospital.patients}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Records</p>
                        <p className="font-medium">{hospital.records}</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Active Usage</span>
                        <span>{Math.round((hospital.patients / 1500) * 100)}%</span>
                      </div>
                      <Progress value={(hospital.patients / 1500) * 100} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button>
                <Building2 className="w-4 h-4 mr-2" />
                Add Hospital
              </Button>
              <Button variant="outline">
                <Users className="w-4 h-4 mr-2" />
                Manage Users
              </Button>
              <Button variant="outline">
                <Activity className="w-4 h-4 mr-2" />
                View Reports
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pending Approvals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-accent" />
                Pending Approvals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingApprovals.map((approval) => (
                <div key={approval.id} className="p-3 rounded-lg border border-border">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium">{approval.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {approval.role} • {approval.hospital}
                      </p>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {approval.specialty}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Approve
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <XCircle className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-success" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: 'Database', status: 'Operational', ok: true },
                { label: 'API Services', status: 'Operational', ok: true },
                { label: 'Storage', status: '72% Used', ok: true },
                { label: 'Backup', status: 'Last: 2h ago', ok: true },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                  <span className="text-sm">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{item.status}</span>
                    <div className={`w-2 h-2 rounded-full ${item.ok ? 'bg-success' : 'bg-destructive'}`} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
