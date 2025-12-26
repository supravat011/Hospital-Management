import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SpecialtiesCarouselProps {
    children: React.ReactNode;
}

const SpecialtiesCarousel = ({ children }: SpecialtiesCarouselProps) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        loop: false,
        slidesToScroll: 1,
        breakpoints: {
            '(min-width: 768px)': { slidesToScroll: 2 },
            '(min-width: 1024px)': { slidesToScroll: 3 },
        },
    });

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    return (
        <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-6">
                    {children}
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center mt-12 gap-4">
                <Button
                    size="icon"
                    onClick={scrollPrev}
                    className="rounded-full w-12 h-12 bg-[#f0f6ff] hover:bg-[#15558d] text-[#15558d] hover:text-white transition-all shadow-sm"
                >
                    <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                    size="icon"
                    onClick={scrollNext}
                    className="rounded-full w-12 h-12 bg-[#f0f6ff] hover:bg-[#15558d] text-[#15558d] hover:text-white transition-all shadow-sm"
                >
                    <ChevronRight className="w-5 h-5" />
                </Button>
            </div>
        </div>
    );
};

export default SpecialtiesCarousel;
