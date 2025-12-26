import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DoctorCard from '@/components/DoctorCard';
import SpecialtyCard from '@/components/SpecialtyCard';
import SpecialtiesCarousel from '@/components/SpecialtiesCarousel';
import DoctorsCarousel from '@/components/DoctorsCarousel';
import BlogCard from '@/components/BlogCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import {
  Search,
  MapPin,
  Calendar,
  Heart,
  Activity,
  Brain,
  Baby,
  Syringe,
  Wind,
  CheckCircle2,
  Eye,
  Stethoscope,
  Bone,
  Quote,
  Star,
  Video,
  Building,
  Briefcase,
  FlaskConical,
  Home,
  Shield,
  Target,
  MessageCircle,
  Plus,
  Minus
} from 'lucide-react';
// Import assets (using placeholder for now, would use real assets in prod)
import heroDoctor from '@/assets/hero-doctor.jpg';

const Index = () => {
  const [activeAccordion, setActiveAccordion] = React.useState('vision');

  // Initialize scroll animations for each section
  const specialtiesSection = useScrollAnimation();
  const doctorsSection = useScrollAnimation();
  const reasonsSection = useScrollAnimation();
  const committedSection = useScrollAnimation();
  const testimonialsSection = useScrollAnimation();
  const faqSection = useScrollAnimation();
  const blogSection = useScrollAnimation();

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-40 overflow-hidden min-h-screen flex flex-col justify-center bg-white">
        {/* Subtle Background Shapes */}
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-gray-50 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-gray-50 rounded-full blur-3xl -z-10 animate-pulse-slow delay-1000"></div>
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-[url('https://doccure.dreamstechnologies.com/html/template/assets/img/shape-01.png')] bg-contain bg-no-repeat opacity-5 -z-10"></div>

        {/* Decorative Elements */}
        <div className="absolute top-40 left-10 text-[#09e5ab] opacity-20 hidden md:block">
          <div className="w-16 h-16 rounded-full border-4 border-current border-dashed animate-spin-slow"></div>
        </div>
        <div className="absolute top-20 left-1/2 text-[#15558d] opacity-10 hidden md:block">
          <Star className="w-8 h-8 fill-current animate-bounce-slow" />
        </div>


        <div className="container mx-auto px-4 mt-8">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Hero Content */}
            <div className="lg:w-1/2 space-y-8 z-10">
              <div className="inline-flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-sm mb-2 border border-blue-50">
                <div className="flex -space-x-3">
                  <img src="https://doccure.dreamstechnologies.com/html/template/assets/img/doctors/doctor-01.jpg" className="w-8 h-8 rounded-full border-2 border-white" alt="Doc 1" />
                  <img src="https://doccure.dreamstechnologies.com/html/template/assets/img/doctors/doctor-02.jpg" className="w-8 h-8 rounded-full border-2 border-white" alt="Doc 2" />
                  <img src="https://doccure.dreamstechnologies.com/html/template/assets/img/doctors/doctor-03.jpg" className="w-8 h-8 rounded-full border-2 border-white" alt="Doc 3" />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-sm font-bold text-[#15558d]">5K+ Appointments</span>
                  <div className="flex text-yellow-400 text-[10px]">
                    <Star className="w-2.5 h-2.5 fill-current" />
                    <Star className="w-2.5 h-2.5 fill-current" />
                    <Star className="w-2.5 h-2.5 fill-current" />
                    <Star className="w-2.5 h-2.5 fill-current" />
                    <Star className="w-2.5 h-2.5 fill-current" />
                    <span className="text-gray-500 ml-1">5.0 Ratings</span>
                  </div>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-[64px] font-bold text-[#272b41] leading-[1.2]">
                Discover Health: Find Your Trusted
                <span className="mx-3 inline-flex items-center justify-center bg-[#ffe0e0] rounded-full w-8 h-8 md:w-12 md:h-12 align-middle relative top-[-5px]">
                  <Video className="w-4 h-4 md:w-6 md:h-6 text-[#ff0000]" />
                </span>
                <span className="text-[#09e5ab]">Doctors</span> Today
              </h1>

              {/* Search Bar */}
              <div className="bg-white p-2 rounded-full shadow-xl max-w-4xl border border-blue-100 relative z-20 mt-8">
                <div className="flex flex-col md:flex-row items-center divide-y md:divide-y-0 md:divide-x divide-gray-100">
                  {/* Search Input */}
                  <div className="flex-1 w-full relative px-4 py-2">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <Search className="w-4 h-4" />
                    </div>
                    <Input
                      type="text"
                      placeholder="Search doctors, clinics, hospital"
                      className="pl-8 border-none shadow-none focus-visible:ring-0 text-gray-600 placeholder:text-gray-400 h-10 bg-transparent"
                    />
                  </div>

                  {/* Location Input */}
                  <div className="flex-1 w-full relative px-4 py-2">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <Input
                      type="text"
                      placeholder="Location"
                      className="pl-8 border-none shadow-none focus-visible:ring-0 text-gray-600 placeholder:text-gray-400 h-10 bg-transparent"
                    />
                  </div>

                  {/* Date Input */}
                  <div className="flex-1 w-full relative px-4 py-2">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <Input
                      type="text"
                      placeholder="Date"
                      className="pl-8 border-none shadow-none focus-visible:ring-0 text-gray-600 placeholder:text-gray-400 h-10 bg-transparent"
                    />
                  </div>

                  {/* Search Button */}
                  <div className="p-1.5 w-full md:w-auto">
                    <Button className="w-full md:w-auto bg-[#09e5ab] hover:bg-[#07c593] text-white rounded-full px-8 py-3 h-auto font-bold text-base transition-all flex items-center gap-2 shadow-lg shadow-[#09e5ab]/20">
                      <Search className="w-4 h-4" />
                      Search
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Image & Floating Cards */}
            <div className="lg:w-1/2 relative z-10 mt-12 lg:mt-0">
              <div className="relative">
                {/* Main Doctor Image */}
                <div className="bg-[#15558d] rounded-[40px] rounded-br-[150px] absolute top-10 right-4 w-[90%] h-[90%] -z-10 rotate-[-3deg]"></div>
                <img src={heroDoctor} alt="Hero Doctor" className="relative z-10 mx-auto max-h-[600px] object-cover rounded-b-3xl" />

                {/* Floating Card: Appointments */}
                <div className="absolute top-[30%] right-0 bg-white p-4 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] animate-bounce-slow hidden md:block z-20">
                  <div className="flex items-center gap-3">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-[#15558d]">1K</p>
                      <p className="text-[10px] text-gray-500 leading-tight">Appointments<br />Completed</p>
                    </div>
                  </div>
                </div>

                {/* Floating Card: Satisfied Patients */}
                <div className="absolute bottom-20 left-0 bg-[#0a1829] text-white p-4 rounded-xl shadow-xl animate-bounce-slow hidden md:block z-20">
                  <div className="flex -space-x-2 mb-2 justify-center">
                    <img src="https://doccure.dreamstechnologies.com/html/template/assets/img/patients/patient1.jpg" className="w-8 h-8 rounded-full border-2 border-[#0a1829]" alt="Pat 1" />
                    <img src="https://doccure.dreamstechnologies.com/html/template/assets/img/patients/patient2.jpg" className="w-8 h-8 rounded-full border-2 border-[#0a1829]" alt="Pat 2" />
                    <img src="https://doccure.dreamstechnologies.com/html/template/assets/img/patients/patient3.jpg" className="w-8 h-8 rounded-full border-2 border-[#0a1829]" alt="Pat 3" />
                  </div>
                  <p className="text-center font-bold text-sm">15K+</p>
                  <p className="text-[10px] text-gray-400 text-center">Satisfied Patients</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Services Bar */}
        <div className="container mx-auto px-4 mt-20 relative z-30">
          <div className="bg-white rounded-2xl shadow-[0_10px_60px_rgba(0,0,0,0.05)] p-8 md:p-12 border border-gray-100 transform translate-y-1/4">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 justify-items-center">
              {/* Item 1 */}
              <div className="text-center group cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-[#7b46be] flex items-center justify-center mb-3 group-hover:-translate-y-2 transition-transform duration-300 shadow-lg shadow-[#7b46be]/20">
                  <Calendar className="w-7 h-7 text-white" />
                </div>
                <p className="text-sm font-semibold text-gray-700 group-hover:text-[#09e5ab] transition-colors">Book Appointment</p>
              </div>

              {/* Item 2 */}
              <div className="text-center group cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-[#007bff] flex items-center justify-center mb-3 group-hover:-translate-y-2 transition-transform duration-300 shadow-lg shadow-[#007bff]/20">
                  <Stethoscope className="w-7 h-7 text-white" />
                </div>
                <p className="text-sm font-semibold text-gray-700 group-hover:text-[#09e5ab] transition-colors">Talk to Doctors</p>
              </div>

              {/* Item 3 */}
              <div className="text-center group cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-[#e91e63] flex items-center justify-center mb-3 group-hover:-translate-y-2 transition-transform duration-300 shadow-lg shadow-[#e91e63]/20">
                  <Building className="w-7 h-7 text-white" />
                </div>
                <p className="text-sm font-semibold text-gray-700 group-hover:text-[#09e5ab] transition-colors">Hospitals & Clinics</p>
              </div>

              {/* Item 4 */}
              <div className="text-center group cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-[#00bcd4] flex items-center justify-center mb-3 group-hover:-translate-y-2 transition-transform duration-300 shadow-lg shadow-[#00bcd4]/20">
                  <Heart className="w-7 h-7 text-white" />
                </div>
                <p className="text-sm font-semibold text-gray-700 group-hover:text-[#09e5ab] transition-colors">Healthcare</p>
              </div>

              {/* Item 5 */}
              <div className="text-center group cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-[#7b46be] flex items-center justify-center mb-3 group-hover:-translate-y-2 transition-transform duration-300 shadow-lg shadow-[#7b46be]/20">
                  <FlaskConical className="w-7 h-7 text-white" />
                </div>
                <p className="text-sm font-semibold text-gray-700 group-hover:text-[#09e5ab] transition-colors">Medicine & Supplies</p>
              </div>

              {/* Item 6 */}
              <div className="text-center group cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-[#ff5722] flex items-center justify-center mb-3 group-hover:-translate-y-2 transition-transform duration-300 shadow-lg shadow-[#ff5722]/20">
                  <FlaskConical className="w-7 h-7 text-white" />
                </div>
                <p className="text-sm font-semibold text-gray-700 group-hover:text-[#09e5ab] transition-colors">Lab Testing</p>
              </div>

              {/* Item 7 */}
              <div className="text-center group cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-[#009688] flex items-center justify-center mb-3 group-hover:-translate-y-2 transition-transform duration-300 shadow-lg shadow-[#009688]/20">
                  <Briefcase className="w-7 h-7 text-white" />
                </div>
                <p className="text-sm font-semibold text-gray-700 group-hover:text-[#09e5ab] transition-colors">Home Care</p>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Specialties Section */}
      <section
        ref={specialtiesSection.ref as React.RefObject<HTMLElement>}
        className={`py-20 bg-white scroll-fade-up ${specialtiesSection.isVisible ? 'visible' : ''}`}
      >
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="text-white font-bold text-sm bg-[#007bff] px-6 py-2 rounded-full inline-block mb-4 shadow-md flex items-center gap-2 mx-auto w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
              Top Specialties
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#15558d] mt-2">Highlighting the Care & Support</h2>
          </div>

          <SpecialtiesCarousel>
            <div className="flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_20%] min-w-0 px-3">
              <SpecialtyCard
                name="Orthopedics"
                count={151}
                icon={Activity}
                image="https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&h=400&fit=crop&q=80"
              />
            </div>
            <div className="flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_20%] min-w-0 px-3">
              <SpecialtyCard
                name="Neurology"
                count={176}
                icon={Brain}
                image="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=400&h=400&fit=crop&q=80"
              />
            </div>
            <div className="flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_20%] min-w-0 px-3">
              <SpecialtyCard
                name="Pediatrics"
                count={124}
                icon={Baby}
                image="https://images.unsplash.com/photo-1581594549595-35f6edc7b762?w=400&h=400&fit=crop&q=80"
              />
            </div>
            <div className="flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_20%] min-w-0 px-3">
              <SpecialtyCard
                name="Psychiatry"
                count={112}
                icon={Heart}
                image="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&q=80"
              />
            </div>
            <div className="flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_20%] min-w-0 px-3">
              <SpecialtyCard
                name="Endocrinology"
                count={104}
                icon={Syringe}
                image="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&q=80"
              />
            </div>
            <div className="flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_20%] min-w-0 px-3">
              <SpecialtyCard
                name="Pulmonology"
                count={41}
                icon={Wind}
                image="https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=400&fit=crop&q=80"
              />
            </div>
            <div className="flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_20%] min-w-0 px-3">
              <SpecialtyCard
                name="Urology"
                count={39}
                icon={CheckCircle2}
                image="https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=400&fit=crop&q=80"
              />
            </div>
            <div className="flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_20%] min-w-0 px-3">
              <SpecialtyCard
                name="Cardiology"
                count={254}
                icon={Heart}
                image="https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=400&h=400&fit=crop&q=80"
              />
            </div>
            <div className="flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_20%] min-w-0 px-3">
              <SpecialtyCard
                name="Dermatology"
                count={87}
                icon={Activity}
                image="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=400&fit=crop&q=80"
              />
            </div>
            <div className="flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_20%] min-w-0 px-3">
              <SpecialtyCard
                name="Ophthalmology"
                count={65}
                icon={Eye}
                image="https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=400&fit=crop&q=80"
              />
            </div>
          </SpecialtiesCarousel>
        </div>
      </section>

      {/* Featured Doctors Section */}
      <section
        ref={doctorsSection.ref as React.RefObject<HTMLElement>}
        className={`py-20 bg-white scroll-fade-up ${doctorsSection.isVisible ? 'visible' : ''}`}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-white font-bold text-sm bg-[#007bff] px-6 py-2 rounded-full inline-block mb-4 shadow-md flex items-center gap-2 mx-auto w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
              Featured Doctors
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#15558d] mt-2">Top Indian Doctors</h2>
          </div>

          <DoctorsCarousel>
            <div className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_25%] min-w-0 px-3">
              <DoctorCard
                name="Dr. Ruby Perrin"
                specialty="Dentist"
                image="https://doccure.dreamstechnologies.com/html/template/assets/img/doctors/doctor-01.jpg"
                location="Mumbai, Maharashtra"
                distance="15 Min"
                rating={4.9}
                votes={55}
                price={1500}
              />
            </div>
            <div className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_25%] min-w-0 px-3">
              <DoctorCard
                name="Dr. Darren Elder"
                specialty="Cardiologist"
                image="https://doccure.dreamstechnologies.com/html/template/assets/img/doctors/doctor-02.jpg"
                location="Delhi, NCR"
                distance="25 Min"
                rating={4.8}
                votes={42}
                price={2000}
              />
            </div>
            <div className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_25%] min-w-0 px-3">
              <DoctorCard
                name="Dr. Deborah Angel"
                specialty="Neurologist"
                image="https://doccure.dreamstechnologies.com/html/template/assets/img/doctors/doctor-03.jpg"
                location="Bangalore, Karnataka"
                distance="40 Min"
                rating={4.7}
                votes={38}
                price={1800}
              />
            </div>
            <div className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_25%] min-w-0 px-3">
              <DoctorCard
                name="Dr. Sofia Brient"
                specialty="Urologist"
                image="https://doccure.dreamstechnologies.com/html/template/assets/img/doctors/doctor-04.jpg"
                location="Chennai, Tamil Nadu"
                distance="20 Min"
                rating={4.9}
                votes={60}
                price={1200}
              />
            </div>
            <div className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_25%] min-w-0 px-3">
              <DoctorCard
                name="Dr. Marvin Campbell"
                specialty="Orthopedics"
                image="https://doccure.dreamstechnologies.com/html/template/assets/img/doctors/doctor-05.jpg"
                location="Hyderabad, Telangana"
                distance="35 Min"
                rating={4.6}
                votes={30}
                price={1600}
              />
            </div>
            <div className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_25%] min-w-0 px-3">
              <DoctorCard
                name="Dr. Amit Patel"
                specialty="Orthopedic"
                image="https://doccure.dreamstechnologies.com/html/template/assets/img/doctors/doctor-06.jpg"
                location="Ahmedabad, Gujarat"
                distance="20 Min"
                rating={4.8}
                votes={45}
                price={1400}
              />
            </div>
            <div className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_25%] min-w-0 px-3">
              <DoctorCard
                name="Dr. Sanya Gupta"
                specialty="Dermatologist"
                image="https://doccure.dreamstechnologies.com/html/template/assets/img/doctors/doctor-07.jpg"
                location="Pune, Maharashtra"
                distance="15 Min"
                rating={4.7}
                votes={50}
                price={1100}
              />
            </div>
            <div className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_25%] min-w-0 px-3">
              <DoctorCard
                name="Dr. Rajesh Kumar"
                specialty="Ophthalmologist"
                image="https://doccure.dreamstechnologies.com/html/template/assets/img/doctors/doctor-08.jpg"
                location="Kolkata, West Bengal"
                distance="30 Min"
                rating={4.9}
                votes={35}
                price={900}
              />
            </div>
            <div className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_25%] min-w-0 px-3">
              <DoctorCard
                name="Dr. Preeti Singh"
                specialty="Pulmonologist"
                image="https://doccure.dreamstechnologies.com/html/template/assets/img/doctors/doctor-09.jpg"
                location="Jaipur, Rajasthan"
                distance="25 Min"
                rating={4.6}
                votes={28}
                price={1300}
              />
            </div>
          </DoctorsCarousel>
        </div>
      </section>

      {/* India's Best Hospitals Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="text-white font-bold text-sm bg-[#007bff] px-6 py-2 rounded-full inline-block mb-4 shadow-md flex items-center gap-2 mx-auto w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
              India's Best Hospitals
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#272b41] mt-2">
              Top Healthcare Facilities
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Partner hospitals providing world-class medical care and advanced treatment facilities
            </p>
          </div>

          {/* Hospital Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Hospital 1 - AIIMS */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-2">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop"
                  alt="AIIMS Delhi"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                  <p className="text-xs font-semibold text-[#15558d]">500+ Beds</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg text-[#272b41] mb-2">AIIMS Delhi</h3>
                <p className="text-sm text-gray-500 mb-3">All India Institute of Medical Sciences</p>
                <div className="flex items-center gap-2 text-xs text-gray-600 mb-3">
                  <MapPin className="w-4 h-4 text-[#09e5ab]" />
                  <span>New Delhi, India</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-500">Multi-Specialty</span>
                  <Button size="sm" variant="ghost" className="text-[#15558d] hover:text-[#0092d6]">
                    View Details →
                  </Button>
                </div>
              </div>
            </div>

            {/* Hospital 2 - Apollo */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-2">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=400&h=300&fit=crop"
                  alt="Apollo Hospital"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                  <p className="text-xs font-semibold text-[#09e5ab]">1000+ Beds</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg text-[#272b41] mb-2">Apollo Hospital</h3>
                <p className="text-sm text-gray-500 mb-3">Leading Healthcare Provider</p>
                <div className="flex items-center gap-2 text-xs text-gray-600 mb-3">
                  <MapPin className="w-4 h-4 text-[#09e5ab]" />
                  <span>Chennai, India</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-500">Multi-Specialty</span>
                  <Button size="sm" variant="ghost" className="text-[#15558d] hover:text-[#0092d6]">
                    View Details →
                  </Button>
                </div>
              </div>
            </div>

            {/* Hospital 3 - Fortis */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-2">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400&h=300&fit=crop"
                  alt="Fortis Hospital"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                  <p className="text-xs font-semibold text-[#7b46be]">400+ Beds</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg text-[#272b41] mb-2">Fortis Hospital</h3>
                <p className="text-sm text-gray-500 mb-3">Advanced Medical Care</p>
                <div className="flex items-center gap-2 text-xs text-gray-600 mb-3">
                  <MapPin className="w-4 h-4 text-[#09e5ab]" />
                  <span>Mumbai, India</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-500">Multi-Specialty</span>
                  <Button size="sm" variant="ghost" className="text-[#15558d] hover:text-[#0092d6]">
                    View Details →
                  </Button>
                </div>
              </div>
            </div>

            {/* Hospital 4 - Max Healthcare */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-2">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=300&fit=crop"
                  alt="Max Healthcare"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                  <p className="text-xs font-semibold text-[#ff5722]">600+ Beds</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg text-[#272b41] mb-2">Max Healthcare</h3>
                <p className="text-sm text-gray-500 mb-3">Premium Healthcare Services</p>
                <div className="flex items-center gap-2 text-xs text-gray-600 mb-3">
                  <MapPin className="w-4 h-4 text-[#09e5ab]" />
                  <span>Delhi NCR, India</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-500">Multi-Specialty</span>
                  <Button size="sm" variant="ghost" className="text-[#15558d] hover:text-[#0092d6]">
                    View Details →
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <Button className="bg-[#09e5ab] hover:bg-[#07c593] text-white px-8 py-6 rounded-full font-semibold shadow-lg shadow-[#09e5ab]/20">
              View All Hospitals
            </Button>
          </div>
        </div>
      </section>

      {/* Scrolling Services Bar */}
      <div className="bg-[#0092d6] py-3 overflow-hidden relative whitespace-nowrap">
        <div className="inline-block animate-scroll text-white font-medium text-xs uppercase tracking-wider">
          {/* Set 1 */}
          <span className="mx-6">Health Care Services</span> <span className="opacity-50 mx-4">________</span>
          <span className="mx-6">Talk to Doctors</span> <span className="opacity-50 mx-4">________</span>
          <span className="mx-6">Home Care Services</span> <span className="opacity-50 mx-4">________</span>
          <span className="mx-6">Multi Speciality Treatments & Doctors</span> <span className="opacity-50 mx-4">________</span>
          <span className="mx-6">Lab Testing Services</span> <span className="opacity-50 mx-4">________</span>
          <span className="mx-6">Medicines & Supplies</span> <span className="opacity-50 mx-4">________</span>
          <span className="mx-6">Hospitals & Clinics</span> <span className="opacity-50 mx-4">________</span>

          {/* Set 2 (Duplicate for infinite scroll) */}
          <span className="mx-6">Health Care Services</span> <span className="opacity-50 mx-4">________</span>
          <span className="mx-6">Talk to Doctors</span> <span className="opacity-50 mx-4">________</span>
          <span className="mx-6">Home Care Services</span> <span className="opacity-50 mx-4">________</span>
          <span className="mx-6">Multi Speciality Treatments & Doctors</span> <span className="opacity-50 mx-4">________</span>
          <span className="mx-6">Lab Testing Services</span> <span className="opacity-50 mx-4">________</span>
          <span className="mx-6">Medicines & Supplies</span> <span className="opacity-50 mx-4">________</span>
          <span className="mx-6">Hospitals & Clinics</span> <span className="opacity-50 mx-4">________</span>
        </div>
      </div>

      {/* Decorative Dots Pattern */}
      <div className="h-4 w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-70"></div>

      {/* Compelling Reasons Section */}
      <section
        ref={reasonsSection.ref as React.RefObject<HTMLElement>}
        className={`py-20 bg-white scroll-fade-up ${reasonsSection.isVisible ? 'visible' : ''}`}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-white font-bold text-xs bg-[#007bff] px-6 py-2 rounded-full inline-block mb-4 shadow-md flex items-center gap-2 mx-auto w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
              Why Book With Us
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#15558d] mt-2">Compelling Reasons to Choose</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 mx-auto relative max-w-6xl">
            {/* Vertical Dotted Dividers (Hidden on Mobile) */}
            <div className="hidden md:block absolute top-0 bottom-0 left-1/3 w-px border-l border-dashed border-gray-200"></div>
            <div className="hidden md:block absolute top-0 bottom-0 left-2/3 w-px border-l border-dashed border-gray-200"></div>

            {/* Item 1 */}
            <div className="p-8 hover:bg-gray-50 transition-colors">
              <div className="flex gap-4">
                <Shield className="w-6 h-6 text-[#ff5722] mt-1 shrink-0" />
                <div>
                  <h3 className="text-base font-bold text-[#0e2e50] mb-2">Follow-Up Care</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    We ensure continuity of care through regular follow-ups and communication, helping you stay on track with health goals.
                  </p>
                </div>
              </div>
            </div>

            {/* Item 2 */}
            <div className="p-8 hover:bg-gray-50 transition-colors">
              <div className="flex gap-4">
                <Target className="w-6 h-6 text-[#7b46be] mt-1 shrink-0" />
                <div className="relative w-full">
                  <h3 className="text-base font-bold text-[#0e2e50] mb-2">Patient-Centered Approach</h3>
                  <p className="text-xs text-gray-500 leading-relaxed mb-4 pr-8">
                    We prioritize your comfort and preferences, tailoring our services to meet your individual needs and Care from Our Experts
                  </p>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4">
                    <div className="w-6 h-6 rounded-full border-2 border-[#007bff] flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#007bff]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Item 3 */}
            <div className="p-8 hover:bg-gray-50 transition-colors">
              <div className="flex gap-4">
                <Briefcase className="w-6 h-6 text-[#00bcd4] mt-1 shrink-0" />
                <div>
                  <h3 className="text-base font-bold text-[#0e2e50] mb-2">Convenient Access</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Easily book appointments online or through our dedicated customer service team, with flexible hours to fit your schedule.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Committed to Care Section */}
      <section
        ref={committedSection.ref as React.RefObject<HTMLElement>}
        className={`py-20 bg-[#020f1e] text-white overflow-hidden scroll-fade-up ${committedSection.isVisible ? 'visible' : ''}`}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 mb-20">
            {/* Left Column: Image Grid */}
            <div className="lg:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 rounded-2xl overflow-hidden h-64">
                  <img src="https://doccure.dreamstechnologies.com/html/template/assets/img/features/feature-01.jpg" alt="Team" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="rounded-2xl overflow-hidden h-48">
                  <img src="https://doccure.dreamstechnologies.com/html/template/assets/img/features/feature-02.jpg" alt="Doctor" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="rounded-2xl overflow-hidden h-48">
                  <img src="https://doccure.dreamstechnologies.com/html/template/assets/img/features/feature-03.jpg" alt="Lab" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
            </div>

            {/* Right Column: Content & Accordion */}
            <div className="lg:w-1/2">
              <span className="text-white font-bold text-xs bg-[#007bff] px-4 py-1.5 rounded-full inline-block mb-6 shadow-sm flex items-center gap-2 w-fit">
                <span className="w-1 h-1 rounded-full bg-white"></span>
                Why Book With Us
                <span className="w-1 h-1 rounded-full bg-white"></span>
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                We are committed to understanding your <span className="text-[#0092d6]">unique needs and delivering care.</span>
              </h2>
              <p className="text-gray-400 mb-8 leading-relaxed text-sm">
                As a trusted healthcare provider in our community, we are passionate about promoting health and wellness beyond the clinic. We actively engage in community outreach programs, health fairs, and educational workshop.
              </p>

              <div className="space-y-4">
                {/* Accordion Item 1 */}
                <div className="border border-white/10 rounded-lg bg-[#0a1829] overflow-hidden">
                  <button
                    className={`w-full px-6 py-4 flex items-center justify-between text-left font-bold transition-colors duration-300 ${activeAccordion === 'vision' ? 'text-[#0092d6]' : 'text-white hover:text-[#0092d6]'}`}
                    onClick={() => setActiveAccordion(activeAccordion === 'vision' ? '' : 'vision')}
                  >
                    01. Our Vision
                    <div className={`p-0.5 rounded transition-colors duration-300 ${activeAccordion === 'vision' ? 'bg-[#007bff] text-white' : 'bg-[#1b2a3d] text-gray-400'}`}>
                      {activeAccordion === 'vision' ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>
                  <div className={`transition-all duration-500 ease-in-out overflow-hidden ${activeAccordion === 'vision' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-6 pb-6 text-sm text-gray-400 leading-relaxed">
                      We envision a community where everyone has access to high-quality healthcare and the resources they need to lead healthy, fulfilling lives.
                    </div>
                  </div>
                </div>

                {/* Accordion Item 2 */}
                <div className="border border-white/10 rounded-lg bg-[#0a1829] overflow-hidden">
                  <button
                    className={`w-full px-6 py-4 flex items-center justify-between text-left font-bold transition-colors duration-300 ${activeAccordion === 'mission' ? 'text-[#0092d6]' : 'text-white hover:text-[#0092d6]'}`}
                    onClick={() => setActiveAccordion(activeAccordion === 'mission' ? '' : 'mission')}
                  >
                    02. Our Mission
                    <div className={`p-0.5 rounded transition-colors duration-300 ${activeAccordion === 'mission' ? 'bg-[#007bff] text-white' : 'bg-[#1b2a3d] text-gray-400'}`}>
                      {activeAccordion === 'mission' ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>
                  <div className={`transition-all duration-500 ease-in-out overflow-hidden ${activeAccordion === 'mission' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-6 pb-6 text-sm text-gray-400 leading-relaxed">
                      Our mission is to provide compassionate, patient-centered care that improves the quality of life for individuals and families in our community.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Process Flow */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative mt-16 px-4">
            {/* Step 1 */}
            <div className="text-center relative group">
              <div className="w-16 h-16 mx-auto bg-[#007bff] rounded-xl flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(0,123,255,0.3)] hover:scale-105 transition-transform duration-300">
                <Search className="w-7 h-7 text-white transition-transform duration-300" />
              </div>
              <h3 className="font-bold text-lg mb-2">Search For Doctors</h3>
              <p className="text-xs text-gray-400 leading-relaxed px-2">Search for a doctor based on specialization, location, or availability for your Treataments</p>

              {/* Connector Arrow (Desktop Only) */}
              <div className="hidden md:block absolute top-8 left-1/2 w-full h-[2px] border-t-2 border-dashed border-[#007bff]/30 -z-10 translate-x-[50%]"></div>
            </div>

            {/* Step 2 */}
            <div className="text-center relative group">
              <div className="w-16 h-16 mx-auto bg-[#ff5722] rounded-xl flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(255,87,34,0.3)] hover:scale-105 transition-transform duration-300">
                <Shield className="w-7 h-7 text-white transition-transform duration-300" />
              </div>
              <h3 className="font-bold text-lg mb-2">Check Doctor Profile</h3>
              <p className="text-xs text-gray-400 leading-relaxed px-2">Explore detailed doctor profiles on our platform to make informed healthcare decisions.</p>

              {/* Connector Arrow */}
              <div className="hidden md:block absolute top-8 left-1/2 w-full h-[2px] border-t-2 border-dashed border-[#007bff]/30 -z-10 translate-x-[50%]"></div>
            </div>

            {/* Step 3 */}
            <div className="text-center relative group">
              <div className="w-16 h-16 mx-auto bg-[#00bcd4] rounded-xl flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(0,188,212,0.3)] hover:scale-105 transition-transform duration-300">
                <Calendar className="w-7 h-7 text-white transition-transform duration-300" />
              </div>
              <h3 className="font-bold text-lg mb-2">Schedule Appointment</h3>
              <p className="text-xs text-gray-400 leading-relaxed px-2">After choose your preferred doctor, select a convenient time slot, & confirm your appointment.</p>

              {/* Connector Arrow */}
              <div className="hidden md:block absolute top-8 left-1/2 w-full h-[2px] border-t-2 border-dashed border-[#007bff]/30 -z-10 translate-x-[50%]"></div>
            </div>

            {/* Step 4 */}
            <div className="text-center relative group">
              <div className="w-16 h-16 mx-auto bg-[#7b46be] rounded-xl flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(123,70,190,0.3)] hover:scale-105 transition-transform duration-300">
                <MessageCircle className="w-7 h-7 text-white transition-transform duration-300" />
              </div>
              <h3 className="font-bold text-lg mb-2">Get Your Solution</h3>
              <p className="text-xs text-gray-400 leading-relaxed px-2">Discuss your health concerns with the doctor and receive the personalized advice & with solution.</p>
            </div>
          </div>
        </div>
      </section>
      <section
        ref={testimonialsSection.ref as React.RefObject<HTMLElement>}
        className={`py-20 bg-gradient-to-br from-[#eef9ff] via-[#f0f9ff] to-[#e6f4ff] relative overflow-hidden scroll-fade-up ${testimonialsSection.isVisible ? 'visible' : ''}`}
      >
        {/* Background Shapes */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/40 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-3xl -z-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="text-white font-bold text-sm bg-[#007bff] px-6 py-2 rounded-full inline-block mb-4 shadow-md">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#15558d] mt-2">15k Users Trust EHR NOW Worldwide</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {/* Review 1 */}
            <div className="bg-white p-8 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
              <div className="flex justify-between items-start mb-6">
                <div className="flex text-yellow-400 gap-1"><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /></div>
                <Quote className="text-[#ff5722] w-10 h-10 fill-[#ff5722]/10" />
              </div>
              <h3 className="font-bold text-[#15558d] text-lg mb-3">Nice Treatment</h3>
              <p className="text-gray-500 mb-8 text-sm leading-relaxed">"I had a wonderful experience the staff was friendly and attentive, and Dr. Smith took the time to explain everything clearly."</p>
              <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
                <img src="https://doccure.dreamstechnologies.com/html/template/assets/img/patients/patient1.jpg" alt="Patient" className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100" />
                <div>
                  <p className="font-bold text-[#15558d]">Deny Hendrawan</p>
                  <p className="text-xs text-gray-500">United States</p>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-white p-8 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-gray-100 hover:-translate-y-2 transition-transform duration-300 relative">
              <div className="flex justify-between items-start mb-6">
                <div className="flex text-yellow-400 gap-1"><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /></div>
                <Quote className="text-[#ff5722] w-10 h-10 fill-[#ff5722]/10" />
              </div>
              <h3 className="font-bold text-[#15558d] text-lg mb-3">Good Hospitability</h3>
              <p className="text-gray-500 mb-8 text-sm leading-relaxed">"Genuinely cares about his patients. He helped me understand my condition and worked with me to create a plan."</p>
              <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
                <img src="https://doccure.dreamstechnologies.com/html/template/assets/img/patients/patient2.jpg" alt="Patient" className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100" />
                <div>
                  <p className="font-bold text-[#15558d]">Johnson Dwayne</p>
                  <p className="text-xs text-gray-500">United States</p>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-white p-8 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
              <div className="flex justify-between items-start mb-6">
                <div className="flex text-yellow-400 gap-1"><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /></div>
                <Quote className="text-[#ff5722] w-10 h-10 fill-[#ff5722]/10" />
              </div>
              <h3 className="font-bold text-[#15558d] text-lg mb-3">Nice Treatment</h3>
              <p className="text-gray-500 mb-8 text-sm leading-relaxed">"I had a great experience with Dr. Chen. She was not only professional but also made me feel comfortable discussing."</p>
              <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
                <img src="https://doccure.dreamstechnologies.com/html/template/assets/img/patients/patient3.jpg" alt="Patient" className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100" />
                <div>
                  <p className="font-bold text-[#15558d]">Rayan Smith</p>
                  <p className="text-xs text-gray-500">United States</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center border-t border-gray-200/50 pt-12 items-end">
            <div className="flex flex-col items-center gap-2 group cursor-pointer">
              <h3 className="text-4xl font-bold text-[#272b41] group-hover:scale-110 transition-transform">500+</h3>
              <div className="h-1 w-12 bg-[#09e5ab] rounded-full"></div>
              <p className="text-gray-500 text-sm">Doctors Available</p>
            </div>
            <div className="flex flex-col items-center gap-2 group cursor-pointer">
              <h3 className="text-4xl font-bold text-[#272b41] group-hover:scale-110 transition-transform">18+</h3>
              <div className="h-1 w-12 bg-[#7b46be] rounded-full"></div>
              <p className="text-gray-500 text-sm">Specialities</p>
            </div>
            <div className="flex flex-col items-center gap-2 group cursor-pointer">
              <h3 className="text-4xl font-bold text-[#272b41] group-hover:scale-110 transition-transform">30K</h3>
              <div className="h-1 w-12 bg-[#15558d] rounded-full"></div>
              <p className="text-gray-500 text-sm">Bookings Done</p>
            </div>
            <div className="flex flex-col items-center gap-2 group cursor-pointer">
              <h3 className="text-4xl font-bold text-[#272b41] group-hover:scale-110 transition-transform">97+</h3>
              <div className="h-1 w-12 bg-[#e91e63] rounded-full"></div>
              <p className="text-gray-500 text-sm">Hospitals & Clinic</p>
            </div>
            <div className="flex flex-col items-center gap-2 group cursor-pointer">
              <h3 className="text-4xl font-bold text-[#272b41] group-hover:scale-110 transition-transform">317+</h3>
              <div className="h-1 w-12 bg-[#ffbd00] rounded-full"></div>
              <p className="text-gray-500 text-sm">Lab Tests Available</p>
            </div>
          </div>
        </div>
      </section>



      {/* FAQ Section */}
      {/* FAQ Section */}
      <section
        ref={faqSection.ref as React.RefObject<HTMLElement>}
        className={`py-20 bg-white scroll-fade-up ${faqSection.isVisible ? 'visible' : ''}`}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-white font-bold text-sm bg-[#007bff] px-6 py-2 rounded-full inline-block mb-4 shadow-md">FAQ'S</span>
            <h2 className="text-3xl font-bold text-[#15558d] mt-2">Your Questions are Answered</h2>
          </div>

          <div className="max-w-3xl mx-auto">
            {/* Item 1 */}
            <div className="border-b border-gray-100 py-6">
              <div
                className="flex justify-between items-center cursor-pointer group"
                onClick={() => setActiveAccordion(activeAccordion === 'booking' ? '' : 'booking')}
              >
                <h3 className={`font-bold text-lg transition-colors ${activeAccordion === 'booking' ? 'text-[#15558d]' : 'text-[#272b41] group-hover:text-[#15558d]'}`}>
                  How do I book an appointment with a doctor?
                </h3>
                <div className={`w-6 h-6 rounded flex items-center justify-center transition-all duration-300 ${activeAccordion === 'booking' ? 'bg-[#007bff] text-white' : 'text-[#007bff]'}`}>
                  {activeAccordion === 'booking' ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </div>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${activeAccordion === 'booking' ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Yes, simply visit our website and log in or create an account. Search for a doctor based on specialization, location, or availability & confirm your booking.
                </p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="border-b border-gray-100 py-6">
              <div
                className="flex justify-between items-center cursor-pointer group"
                onClick={() => setActiveAccordion(activeAccordion === 'doctor' ? '' : 'doctor')}
              >
                <h3 className={`font-bold text-lg transition-colors ${activeAccordion === 'doctor' ? 'text-[#15558d]' : 'text-[#272b41] group-hover:text-[#15558d]'}`}>
                  Can I request a specific doctor when booking my appointment?
                </h3>
                <div className={`w-6 h-6 rounded flex items-center justify-center transition-all duration-300 ${activeAccordion === 'doctor' ? 'bg-[#007bff] text-white' : 'text-[#007bff]'}`}>
                  {activeAccordion === 'doctor' ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </div>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${activeAccordion === 'doctor' ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Yes, you can filter doctors by name or specialization and choose the specific doctor you prefer for your appointment.
                </p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="border-b border-gray-100 py-6">
              <div
                className="flex justify-between items-center cursor-pointer group"
                onClick={() => setActiveAccordion(activeAccordion === 'cancel' ? '' : 'cancel')}
              >
                <h3 className={`font-bold text-lg transition-colors ${activeAccordion === 'cancel' ? 'text-[#15558d]' : 'text-[#272b41] group-hover:text-[#15558d]'}`}>
                  What should I do if I need to cancel or reschedule my appointment?
                </h3>
                <div className={`w-6 h-6 rounded flex items-center justify-center transition-all duration-300 ${activeAccordion === 'cancel' ? 'bg-[#007bff] text-white' : 'text-[#007bff]'}`}>
                  {activeAccordion === 'cancel' ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </div>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${activeAccordion === 'cancel' ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                <p className="text-gray-500 text-sm leading-relaxed">
                  You can manage your appointments from your dashboard. Simply select the appointment and choose the cancel or reschedule option at least 24 hours in advance.
                </p>
              </div>
            </div>

            {/* Item 4 */}
            <div className="border-b border-gray-100 py-6">
              <div
                className="flex justify-between items-center cursor-pointer group"
                onClick={() => setActiveAccordion(activeAccordion === 'late' ? '' : 'late')}
              >
                <h3 className={`font-bold text-lg transition-colors ${activeAccordion === 'late' ? 'text-[#15558d]' : 'text-[#272b41] group-hover:text-[#15558d]'}`}>
                  What if I'm running late for my appointment?
                </h3>
                <div className={`w-6 h-6 rounded flex items-center justify-center transition-all duration-300 ${activeAccordion === 'late' ? 'bg-[#007bff] text-white' : 'text-[#007bff]'}`}>
                  {activeAccordion === 'late' ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </div>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${activeAccordion === 'late' ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Please contact the clinic immediately. While we try to accommodate, significant delays may require rescheduling to avoid disrupting other patients.
                </p>
              </div>
            </div>

            {/* Item 5 */}
            <div className="border-b border-gray-100 py-6">
              <div
                className="flex justify-between items-center cursor-pointer group"
                onClick={() => setActiveAccordion(activeAccordion === 'family' ? '' : 'family')}
              >
                <h3 className={`font-bold text-lg transition-colors ${activeAccordion === 'family' ? 'text-[#15558d]' : 'text-[#272b41] group-hover:text-[#15558d]'}`}>
                  Can I book appointments for family members or dependents?
                </h3>
                <div className={`w-6 h-6 rounded flex items-center justify-center transition-all duration-300 ${activeAccordion === 'family' ? 'bg-[#007bff] text-white' : 'text-[#007bff]'}`}>
                  {activeAccordion === 'family' ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </div>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${activeAccordion === 'family' ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Yes, you can add family members to your profile and book appointments on their behalf easily through the patient portal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section
        ref={blogSection.ref as React.RefObject<HTMLElement>}
        className={`py-20 bg-white scroll-fade-up ${blogSection.isVisible ? 'visible' : ''}`}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-white font-bold text-sm bg-[#007bff] px-6 py-2 rounded-full inline-block mb-4 shadow-md">Recent Blogs</span>
            <h2 className="text-3xl font-bold text-[#15558d] mt-2">Stay Updated With Our Latest Articles</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <BlogCard
              date="15 May"
              category="Treatments"
              title="Understanding and Preventing Glaucoma: A Detailed Guide"
              description="Glaucoma is a leading cause of blind worldwide, yet many..."
              image="https://doccure.dreamstechnologies.com/html/template/assets/img/blog/blog-01.jpg"
              authorName="Dr. Debbie"
              authorImage="https://doccure.dreamstechnologies.com/html/template/assets/img/doctors/doctor-01.jpg"
            />
            <BlogCard
              date="18 May"
              category="Neurology"
              title="Understanding and Preventing Glaucoma: A Detailed Guide"
              description="Discover the intersection of technology and neurology, transforming..."
              image="https://doccure.dreamstechnologies.com/html/template/assets/img/blog/blog-02.jpg"
              authorName="Dr. Debbie"
              authorImage="https://doccure.dreamstechnologies.com/html/template/assets/img/doctors/doctor-01.jpg"
            />
            <BlogCard
              date="21 Apr"
              category="Dental"
              title="5 Essential Tips for Maintaining Optimal Oral Health"
              description="Learn the top five daily practices to keep your teeth..."
              image="https://doccure.dreamstechnologies.com/html/template/assets/img/blog/blog-03.jpg"
              authorName="Dr. Ruby Perrin"
              authorImage="https://doccure.dreamstechnologies.com/html/template/assets/img/doctors/doctor-02.jpg"
            />
            <BlogCard
              date="22 Jan"
              category="Care & Treatment"
              title="Beating Strong: The Digital Revolution in Cardiac Care"
              description="Discover how digital advancements are transforming cardiac care..."
              image="https://doccure.dreamstechnologies.com/html/template/assets/img/blog/blog-04.jpg"
              authorName="Dr. Darren Elder"
              authorImage="https://doccure.dreamstechnologies.com/html/template/assets/img/doctors/doctor-04.jpg"
            />
          </div>

          <div className="text-center mt-12">
            <Button className="bg-[#15558d] hover:bg-[#104470] rounded-full px-8">View All Articles</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
