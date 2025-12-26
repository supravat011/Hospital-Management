import React from 'react';
import { Calendar } from 'lucide-react';

interface BlogCardProps {
    image: string;
    category: string;
    date: string;
    title: string;
    description: string;
    authorName: string;
    authorImage: string;
}

const BlogCard = ({ image, category, date, title, description, authorName, authorImage }: BlogCardProps) => {
    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] hover:shadow-lg transition-all duration-300 group flex flex-col md:flex-row h-full">
            <div className="relative w-full md:w-5/12 overflow-hidden h-48 md:h-auto">
                <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />

                {/* Date Badge */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur rounded-lg p-2 text-center min-w-[60px] shadow-sm">
                    <span className="block text-xl font-bold text-[#272b41]">{date.split(' ')[0]}</span>
                    <span className="block text-xs font-medium text-gray-500">{date.split(' ')[1]}</span>
                </div>
            </div>

            <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
                <div>
                    <span className="inline-block px-3 py-1 bg-[#09e5ab] text-white text-xs font-bold rounded-full mb-3">
                        {category}
                    </span>
                </div>

                <h3 className="text-xl font-bold text-[#272b41] mb-3 group-hover:text-[#15558d] transition-colors cursor-pointer leading-tight">
                    {title}
                </h3>

                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">
                    {description}
                </p>

                {/* Optional: Add a "Read More" text or arrow if desired, based on design usually implied */}
            </div>
        </div>
    );
};

export default BlogCard;
