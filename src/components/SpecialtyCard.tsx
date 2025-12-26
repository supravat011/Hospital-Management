import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SpecialtyCardProps {
    name: string;
    count: number;
    icon: LucideIcon;
    image: string;
}

const SpecialtyCard = ({ name, count, icon: Icon, image }: SpecialtyCardProps) => {
    return (
        <div className="flex flex-col items-center group cursor-pointer w-full">
            <div className="relative w-full aspect-square rounded-[20px] overflow-hidden mb-4 shadow-md group-hover:shadow-lg transition-all">
                {/* Background Image (Photo) */}
                <div className="absolute inset-0 bg-gray-100">
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </div>
                {/* Subtle Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />

                {/* Centered Icon with White Background */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-7 h-7 text-[#15558d]" />
                    </div>
                </div>
            </div>

            <h3 className="font-bold text-[#272b41] text-base mb-1 group-hover:text-[#09e5ab] transition-colors text-center">{name}</h3>
            <p className="text-gray-500 text-sm font-medium">{count} Doctors</p>
        </div>
    );
};

export default SpecialtyCard;
