import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ArrowLeft, Star, StarHalf, MessageSquare, ThumbsUp } from 'lucide-react';

const DoctorReviews = () => {
    const navigate = useNavigate();

    // Mock Data
    const reviews = [
        {
            id: 1,
            patientName: 'Adrian Marshall',
            patientImage: 'https://i.pravatar.cc/150?u=1',
            date: '12 Nov 2024',
            rating: 5,
            comment: 'Dr. Smith was incredibly professional and attentive. He took the time to explain everything clearly and made me feel very comfortable throughout the consultation. Highly recommended!',
            likes: 12
        },
        {
            id: 2,
            patientName: 'Kelly Stevens',
            patientImage: 'https://i.pravatar.cc/150?u=2',
            date: '10 Nov 2024',
            rating: 4.5,
            comment: 'Great experience overall. The clinic is clean and modern. The waiting time was a bit longer than expected, but the doctor was worth the wait.',
            likes: 8
        },
        {
            id: 3,
            patientName: 'Samuel James',
            patientImage: 'https://i.pravatar.cc/150?u=3',
            date: '08 Nov 2024',
            rating: 5,
            comment: 'Excellent service! The diagnosis was spot on and the treatment plan is working wonders. Thank you so much!',
            likes: 5
        },
        {
            id: 4,
            patientName: 'Catherine Gracey',
            patientImage: 'https://i.pravatar.cc/150?u=4',
            date: '05 Nov 2024',
            rating: 4,
            comment: 'Very kind and knowledgeable doctor. Staff was also very friendly.',
            likes: 3
        },
        {
            id: 5,
            patientName: 'Robert Miller',
            patientImage: 'https://i.pravatar.cc/150?u=5',
            date: '01 Nov 2024',
            rating: 5,
            comment: 'Best doctor in the city! I have recommended him to all my friends and family.',
            likes: 15
        }
    ];

    const renderStars = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
        }

        if (hasHalfStar) {
            stars.push(<StarHalf key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
        }

        const emptyStars = 5 - stars.length;
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
        }

        return stars;
    };

    const handleReply = (name: string) => {
        toast.info(`Reply feature for ${name}'s review coming soon!`);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-8 font-sans text-gray-900">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Button
                    onClick={() => navigate('/doctor/dashboard')}
                    variant="ghost"
                    className="gap-2"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </Button>
                <h1 className="text-2xl font-bold text-slate-900">Reviews</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Summary */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl text-center">
                        <h2 className="text-lg font-bold text-gray-900 mb-2">Overall Rating</h2>
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <span className="text-4xl font-bold text-slate-900">4.8</span>
                            <Star className="w-8 h-8 fill-yellow-400 text-yellow-400" />
                        </div>
                        <p className="text-sm text-gray-500 mb-6">Based on {reviews.length} reviews</p>

                        <div className="space-y-2">
                            {[5, 4, 3, 2, 1].map((star) => (
                                <div key={star} className="flex items-center gap-3 text-sm">
                                    <span className="font-bold text-gray-700 w-3">{star}</span>
                                    <Star className="w-3 h-3 text-gray-400" />
                                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-yellow-400 rounded-full"
                                            style={{ width: star === 5 ? '70%' : star === 4 ? '20%' : '5%' }}
                                        ></div>
                                    </div>
                                    <span className="text-xs text-gray-400 w-8 text-right">
                                        {star === 5 ? '70%' : star === 4 ? '20%' : '5%'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Right Column: Reviews List */}
                <div className="lg:col-span-2 space-y-4">
                    {reviews.map((review) => (
                        <Card key={review.id} className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-4">
                                <img src={review.patientImage} alt={review.patientName} className="w-12 h-12 rounded-full object-cover border border-gray-100" />
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className="font-bold text-gray-900">{review.patientName}</h3>
                                        <span className="text-xs text-gray-400">{review.date}</span>
                                    </div>
                                    <div className="flex items-center gap-1 mb-3">
                                        {renderStars(review.rating)}
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                        "{review.comment}"
                                    </p>

                                    <div className="flex items-center gap-4 pt-4 border-t border-gray-50">
                                        <button className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-blue-600 transition-colors">
                                            <ThumbsUp className="w-3.5 h-3.5" />
                                            Helpful ({review.likes})
                                        </button>
                                        <button
                                            onClick={() => handleReply(review.patientName)}
                                            className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                                        >
                                            <MessageSquare className="w-3.5 h-3.5" />
                                            Reply
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}

                    <div className="flex justify-center pt-4">
                        <Button variant="outline" className="min-w-[150px]">Load More</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorReviews;
