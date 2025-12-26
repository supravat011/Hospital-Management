import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useHospital } from '@/contexts/HospitalContext';
import { Button } from '@/components/ui/button';
import {
  Hospital,
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  User,
  Stethoscope,
  ClipboardList,
  Shield,
  Building2
} from 'lucide-react';
import { useState } from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => {
  const { user, logout } = useAuth();
  const { selectedHospital } = useHospital();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getNavItems = () => {
    switch (user?.role) {
      case 'doctor':
        return [
          { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard/doctor' },
          { icon: Users, label: 'Patients', path: '/dashboard/doctor/patients' },
          { icon: FileText, label: 'Records', path: '/dashboard/doctor/records' },
          { icon: ClipboardList, label: 'Queries', path: '/dashboard/doctor/queries' },
        ];
      case 'patient':
        return [
          { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard/patient' },
          { icon: FileText, label: 'My Records', path: '/dashboard/patient/records' },
          { icon: ClipboardList, label: 'Timeline', path: '/dashboard/patient/timeline' },
        ];
      case 'staff':
        return [
          { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard/staff' },
          { icon: Users, label: 'Patient Lookup', path: '/dashboard/staff/lookup' },
        ];
      case 'admin':
        return [
          { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard/admin' },
          { icon: Building2, label: 'Hospitals', path: '/dashboard/admin/hospitals' },
          { icon: Users, label: 'Users', path: '/dashboard/admin/users' },
          { icon: Shield, label: 'Approvals', path: '/dashboard/admin/approvals' },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  const getRoleIcon = () => {
    switch (user?.role) {
      case 'doctor': return Stethoscope;
      case 'patient': return User;
      case 'staff': return Users;
      case 'admin': return Shield;
      default: return User;
    }
  };

  const RoleIcon = getRoleIcon();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-border">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <Hospital className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">
                <span className="text-primary">Medi</span>
                <span className="text-secondary">Care</span>
              </span>
            </Link>
          </div>

          {/* Hospital Context */}
          {selectedHospital && (
            <div className="px-4 py-3 bg-muted/50 border-b border-border">
              <p className="text-xs text-muted-foreground">Connected to</p>
              <p className="text-sm font-medium truncate">{selectedHospital.name}</p>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Info & Logout */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <RoleIcon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{user?.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
              </div>
            </div>
            <Button variant="outline" className="w-full" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-card/95 backdrop-blur border-b border-border">
          <div className="flex items-center justify-between px-4 lg:px-8 h-16">
            <div className="flex items-center gap-4">
              <button
                className="lg:hidden p-2 rounded-lg hover:bg-muted"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <h1 className="text-xl font-semibold">{title}</h1>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link to="/dashboard/settings">
                  <Settings className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
