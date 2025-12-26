import React from 'react';
import { Hospital } from '@/contexts/HospitalContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Star, Heart, Stethoscope, Brain, Bone, Baby } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HospitalCardProps {
  hospital: Hospital;
}

const specialtyIcons: Record<string, React.ReactNode> = {
  Cardiology: <Heart className="w-4 h-4" />,
  Neurology: <Brain className="w-4 h-4" />,
  Orthopedics: <Bone className="w-4 h-4" />,
  Pediatrics: <Baby className="w-4 h-4" />,
};

const HospitalCard: React.FC<HospitalCardProps> = ({ hospital }) => {
  return (
    <Card className="group overflow-hidden hover:shadow-hover transition-all duration-300 border-border/50">
      <div className="relative h-48 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
        <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center shadow-soft">
          <Stethoscope className="w-10 h-10 text-primary-foreground" />
        </div>
        <div className="absolute top-4 right-4 flex items-center gap-1 bg-card px-2 py-1 rounded-full shadow-sm">
          <Star className="w-4 h-4 text-accent fill-accent" />
          <span className="text-sm font-semibold">{hospital.rating}</span>
        </div>
      </div>
      <CardContent className="p-5">
        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {hospital.name}
        </h3>
        
        <div className="flex items-start gap-2 text-muted-foreground mb-2">
          <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
          <span className="text-sm line-clamp-2">{hospital.address}</span>
        </div>
        
        <div className="flex items-center gap-2 text-muted-foreground mb-4">
          <Phone className="w-4 h-4" />
          <span className="text-sm">{hospital.phone}</span>
        </div>

        {/* Specialties */}
        <div className="flex flex-wrap gap-2 mb-4">
          {hospital.departments.slice(0, 4).map((dept) => (
            <span
              key={dept}
              className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
            >
              {specialtyIcons[dept] || <Stethoscope className="w-3 h-3" />}
              {dept}
            </span>
          ))}
        </div>

        <Button asChild className="w-full" size="lg">
          <Link to={`/hospital/${hospital.id}`}>View Details</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default HospitalCard;
