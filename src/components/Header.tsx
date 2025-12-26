import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Search, ChevronDown, User, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, userRole, logout } = useAuth();


  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/path-to-logo-if-exists"
              alt="EHR NOW"
              className="hidden" // Placeholder until we have the real logo asset, using text for now
            />
            <div className="flex items-center">
              <span className="text-3xl font-bold text-[#15558d] tracking-tight">EHR</span>
              <span className="text-3xl font-bold text-[#09e5ab] tracking-tight ml-2">NOW</span>
              <div className="ml-2 relative top-1">
                {/* Vector Stethoscope Icon mockup */}
                <div className="w-6 h-6 border-2 border-[#09e5ab] rounded-full border-t-0 border-l-0 rotate-45"></div>
              </div>
            </div>
          </Link>



          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search doctors, specialties..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#09e5ab] focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center gap-4">

            {isAuthenticated ? (
              /* User Profile Dropdown */
              <div className="group relative">
                <Button
                  variant="outline"
                  className="gap-2 border-[#15558d] text-[#15558d] hover:bg-[#15558d] hover:text-white"
                >
                  <User className="w-4 h-4" />
                  {user?.name || 'User'}
                  <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform" />
                </Button>

                {/* Dropdown Menu */}
                <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                  <div className="absolute -top-2 right-6 w-4 h-4 bg-white rotate-45 border-t border-r border-gray-100"></div>

                  <div className="relative bg-white rounded-lg overflow-hidden">
                    <div className="px-5 py-3 border-b border-gray-100">
                      <p className="font-semibold text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500 capitalize">{userRole}</p>
                    </div>

                    <Link
                      to={userRole === 'patient' ? '/patient/dashboard' : '/doctor/dashboard'}
                      className="block px-5 py-3 text-[14px] text-gray-600 hover:text-[#09e5ab] hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Dashboard
                      </div>
                    </Link>

                    <button
                      onClick={() => {
                        logout();
                        navigate('/');
                      }}
                      className="w-full text-left px-5 py-3 text-[14px] text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors border-t border-gray-100"
                    >
                      <div className="flex items-center gap-2">
                        <LogOut className="w-4 h-4" />
                        Logout
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Login Buttons */
              <>
                <Button
                  asChild
                  className="bg-[#09e5ab] hover:bg-[#07c593] text-white rounded-md px-6 font-medium h-10 transition-all border-none"
                >
                  <Link to="/patient/login">Patient Login</Link>
                </Button>
                <Button
                  asChild
                  className="bg-[#15558d] hover:bg-[#104470] text-white rounded-md px-6 font-medium h-10 transition-all"
                >
                  <Link to="/doctor/login">Doctor Login</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 py-4 px-4 shadow-lg absolute w-full left-0 top-20">
          <nav className="flex flex-col gap-2">
            <div className="flex flex-col gap-3 mt-4">
              {!isAuthenticated ? (
                <>
                  <Button asChild variant="outline" className="w-full border-[#09e5ab] text-[#09e5ab]">
                    <Link to="/patient/login">Patient Login</Link>
                  </Button>
                  <Button asChild className="w-full bg-[#15558d]">
                    <Link to="/doctor/login">Doctor Login</Link>
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => {
                    logout();
                    navigate('/');
                    setMobileMenuOpen(false);
                  }}
                  variant="outline"
                  className="w-full border-red-500 text-red-500"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
