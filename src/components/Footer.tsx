import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  return (
    <footer className="bg-white pt-0 font-sans relative">
      {/* Top Blue Banner */}
      <div className="bg-[#00a3f5] py-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-full bg-white/5 skew-x-12"></div>
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
          <h2 className="text-3xl font-bold text-white tracking-wide">Working for Your Better Health.</h2>
          <div className="flex flex-col md:flex-row gap-8 text-white">
            <div className="flex items-center gap-3 bg-white/10 px-5 py-3 rounded-xl hover:bg-white/20 transition-colors backdrop-blur-sm cursor-pointer">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#00a3f5]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M20 15.5c-1.25 0-2.45-.2-3.57-.59-.35-.15-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.21c.28-.26.4-.67.25-1.02A11.36 11.36 0 018.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z" /></svg>
              </div>
              <div>
                <p className="text-xs opacity-80 uppercase tracking-wider font-medium">Customer Support</p>
                <p className="font-bold text-lg leading-none mt-0.5">+1 56589 54598</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/10 px-5 py-3 rounded-xl hover:bg-white/20 transition-colors backdrop-blur-sm cursor-pointer">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#00a3f5]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
              </div>
              <div>
                <p className="text-xs opacity-80 uppercase tracking-wider font-medium">Drop Us an Email</p>
                <p className="font-bold text-lg leading-none mt-0.5">info1256@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#f2f6f9] pt-16 pb-8 text-[#272b41]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
            {/* Company Column */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-[#272b41]">Company</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/about" className="text-gray-500 hover:text-[#09e5ab] transition-colors">About</Link></li>
                <li><Link to="/features" className="text-gray-500 hover:text-[#09e5ab] transition-colors">Features</Link></li>
                <li><Link to="/works" className="text-gray-500 hover:text-[#09e5ab] transition-colors">Works</Link></li>
                <li><Link to="/career" className="text-gray-500 hover:text-[#09e5ab] transition-colors">Careers</Link></li>
                <li><Link to="/locations" className="text-gray-500 hover:text-[#09e5ab] transition-colors">Locations</Link></li>
              </ul>
            </div>

            {/* Treatments Column */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-[#272b41]">Treatments</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/dental" className="text-gray-500 hover:text-[#09e5ab] transition-colors">Dental</Link></li>
                <li><Link to="/cardiac" className="text-gray-500 hover:text-[#09e5ab] transition-colors">Cardiac</Link></li>
                <li><Link to="/spinal-cord" className="text-gray-500 hover:text-[#09e5ab] transition-colors">Spinal Cord</Link></li>
                <li><Link to="/hair-growth" className="text-gray-500 hover:text-[#09e5ab] transition-colors">Hair Growth</Link></li>
                <li><Link to="/anemia" className="text-gray-500 hover:text-[#09e5ab] transition-colors">Anemia & Disorder</Link></li>
              </ul>
            </div>

            {/* Specialities Column */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-[#272b41]">Specialities</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/transplant" className="text-gray-500 hover:text-[#09e5ab] transition-colors">Transplant</Link></li>
                <li><Link to="/cardiologist" className="text-gray-500 hover:text-[#09e5ab] transition-colors">Cardiologist</Link></li>
                <li><Link to="/oncology" className="text-gray-500 hover:text-[#09e5ab] transition-colors">Oncology</Link></li>
                <li><Link to="/pediatrics" className="text-gray-500 hover:text-[#09e5ab] transition-colors">Pediatrics</Link></li>
                <li><Link to="/gynecology" className="text-gray-500 hover:text-[#09e5ab] transition-colors">Gynacology</Link></li>
              </ul>
            </div>

            {/* Utilities Column */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-[#272b41]">Utilites</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/pricing" className="text-gray-500 hover:text-[#09e5ab] transition-colors">Pricing</Link></li>
                <li><Link to="/contact" className="text-gray-500 hover:text-[#09e5ab] transition-colors">Contact</Link></li>
                <li><Link to="/quote" className="text-gray-500 hover:text-[#09e5ab] transition-colors">Request A Quote</Link></li>
                <li><Link to="/membership" className="text-gray-500 hover:text-[#09e5ab] transition-colors">Premium Membership</Link></li>
                <li><Link to="/integrations" className="text-gray-500 hover:text-[#09e5ab] transition-colors">Integrations</Link></li>
              </ul>
            </div>

            {/* Newsletter Column */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-[#272b41]">Newsletter</h3>
              <p className="text-gray-500 mb-6 text-sm leading-relaxed">Subscribe & Stay Updated from EHR NOW</p>
              <div className="flex gap-2 bg-white p-1 rounded-lg border border-gray-200 mb-8 shadow-sm">
                <Input
                  type="email"
                  placeholder="Enter Email Address"
                  className="bg-transparent text-black border-none h-10 w-full focus-visible:ring-0"
                />
                <Button size="sm" className="bg-[#00a3f5] hover:bg-[#008bd1] h-10 px-6 rounded-md">
                  Send
                </Button>
              </div>

              <h3 className="text-lg font-bold mb-4 text-[#272b41]">Connect With Us</h3>
              <div className="flex gap-3">
                <a href="#" className="w-8 h-8 rounded-full bg-[#15558d] text-white flex items-center justify-center hover:bg-[#09e5ab] transition-colors shadow-md">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-[#15558d] text-white flex items-center justify-center hover:bg-[#09e5ab] transition-colors shadow-md">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-[#15558d] text-white flex items-center justify-center hover:bg-[#09e5ab] transition-colors shadow-md">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-[#15558d] text-white flex items-center justify-center hover:bg-[#09e5ab] transition-colors shadow-md">
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-200/60 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm font-medium">
              Copyright © 2025 EHR NOW. All Rights Reserved
            </p>
            <div className="flex items-center gap-6">
              <span className="text-sm text-[#15558d] font-medium hover:text-[#09e5ab] cursor-pointer">Legal Notice</span>
              <span className="text-sm text-gray-400">•</span>
              <span className="text-sm text-[#15558d] font-medium hover:text-[#09e5ab] cursor-pointer">Privacy Policy</span>
              <span className="text-sm text-gray-400">•</span>
              <span className="text-sm text-[#15558d] font-medium hover:text-[#09e5ab] cursor-pointer">Refund Policy</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-white border border-gray-100 p-1 rounded h-8 w-12 flex items-center justify-center">
                <span className="font-bold text-blue-800 text-xs italic">VISA</span>
              </div>
              <div className="bg-white border border-gray-100 p-1 rounded h-8 w-12 flex items-center justify-center">
                <span className="font-bold text-blue-500 text-xs">AMEX</span>
              </div>
              <div className="bg-white border border-gray-100 p-1 rounded h-8 w-12 flex items-center justify-center">
                <div className="flex -space-x-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-80"></div>
                </div>
              </div>
              <div className="bg-white border border-gray-100 p-1 rounded h-8 w-12 flex items-center justify-center">
                <span className="font-bold text-indigo-600 text-[10px]">Stripe</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
