import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HospitalCard from '@/components/HospitalCard';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useHospital } from '@/contexts/HospitalContext';
import { MapPin, Search, Filter } from 'lucide-react';

const cities = ['Chennai', 'Coimbatore', 'Madurai'];

const Hospitals = () => {
  const { selectedCity, setSelectedCity, hospitals } = useHospital();

  const filteredHospitals = useMemo(() => {
    if (!selectedCity) return hospitals;
    return hospitals.filter((h) => h.city === selectedCity);
  }, [selectedCity, hospitals]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Page Header */}
      <section className="gradient-light py-10 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Find <span className="text-primary">Hospitals</span> Near You
            </h1>
            <p className="text-muted-foreground mb-8">
              Discover trusted healthcare facilities across Tamil Nadu. Select your city to view available hospitals.
            </p>

            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger className="h-12 pl-10 bg-card border-border">
                    <SelectValue placeholder="Select City" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Cities</SelectItem>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button size="lg" className="h-12">
                <Search className="w-5 h-5 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12 flex-1">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-semibold">
                {filteredHospitals.length} Hospital{filteredHospitals.length !== 1 ? 's' : ''} Found
              </h2>
              {selectedCity && selectedCity !== 'all' && (
                <p className="text-muted-foreground text-sm">in {selectedCity}</p>
              )}
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          {filteredHospitals.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHospitals.map((hospital, index) => (
                <div
                  key={hospital.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <HospitalCard hospital={hospital} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <Search className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No Hospitals Found</h3>
              <p className="text-muted-foreground mb-6">
                Try selecting a different city or clearing filters.
              </p>
              <Button variant="outline" onClick={() => setSelectedCity('')}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Hospitals;
