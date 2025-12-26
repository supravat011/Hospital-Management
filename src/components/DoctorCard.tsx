import React from 'react';
import { Star, MapPin, Heart, Clock, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DoctorCardProps {
    name: string;
    specialty: string;
    image: string;
    location: string;
    distance: string;
    rating: number;
    votes: number;
    price: number;
    availaible?: boolean;
}

const DoctorCard = ({ name, specialty, image, location, distance, rating, votes, price, availaible = true }: DoctorCardProps) => {

    // Helper to get color based on specialty (mocking dynamic colors)
    const getSpecialtyColor = (spec: string) => {
        const colors = {
            blue: 'border-l-blue-600 text-blue-600',
            green: 'border-l-green-600 text-green-600',
            pink: 'border-l-pink-500 text-pink-500',
            purple: 'border-l-purple-600 text-purple-600',
            indigo: 'border-l-indigo-600 text-indigo-600',
        };

        const hash = spec.length % 5;
        if (hash === 0) return colors.blue;
        if (hash === 1) return colors.green;
        if (hash === 2) return colors.pink;
        if (hash === 3) return colors.purple;
        return colors.indigo;
    };

    const specialtyColorClass = getSpecialtyColor(specialty);

    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 p-4 group h-full flex flex-col">
            {/* Image Section */}
            <div className="relative mb-4">
                <div className="relative rounded-lg overflow-hidden aspect-[1.1] bg-[#f3f4f6]">
                    <img src={image} alt={name} className="w-full h-full object-cover mix-blend-multiply" />
                </div>

                {/* Rating Badge */}
                <div className="absolute top-3 left-3 bg-[#ff5200] text-white px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1 shadow-sm">
                    <Star className="w-3 h-3 fill-current" />
                    {rating.toFixed(1)}
                </div>

                {/* Favorite Button */}
                <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-300 hover:text-red-500 transition-colors shadow-sm">
                    <Heart className="w-5 h-5 fill-current" />
                </button>
            </div>

            {/* Content Section */}
            <div className="space-y-3 flex-1">
                <div className="flex items-center justify-between">
                    <div className={`pl-2 border-l-[3px] ${specialtyColorClass} text-sm font-bold uppercase tracking-wide leading-none py-0.5`}>
                        {specialty}
                    </div>
                    {availaible && (
                        <span className="text-[10px] font-bold bg-green-50 text-green-600 px-2 py-1 rounded-full flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                            Available
                        </span>
                    )}
                </div>

                <h3 className="font-bold text-lg text-[#15558d] line-clamp-1">
                    {name}
                </h3>

                <div className="flex items-center gap-2 text-xs text-gray-500 pb-3">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    <span className="truncate max-w-[120px]">{location}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    <Clock className="w-3 h-3 ml-0.5 text-gray-400" />
                    <span>{distance}</span>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-2 pt-4 border-t border-dashed border-gray-200 flex items-center justify-between">
                <div>
                    <p className="text-[10px] text-gray-400 font-medium">Consultation Fees</p>
                    <p className="text-xl font-bold text-[#f97316]">₹{price}</p>
                </div>
                <Button className="bg-[#0e2e50] hover:bg-[#15558d] text-white rounded-lg h-9 px-4 text-xs font-bold shadow-md transition-colors">
                    Book Now
                </Button>
            </div>
        </div>
    );
};

export default DoctorCard;
