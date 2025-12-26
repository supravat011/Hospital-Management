import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DoctorsCarouselProps {
    children: React.ReactNode;
}

const DoctorsCarousel = ({ children }: DoctorsCarouselProps) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        loop: false,
        slidesToScroll: 1,
        breakpoints: {
            '(min-width: 768px)': { slidesToScroll: 2 },
            '(min-width: 1024px)': { slidesToScroll: 2 },
        },
    });

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const scrollTo = useCallback((index: number) => {
        if (emblaApi) emblaApi.scrollTo(index);
    }, [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
    }, [emblaApi, onSelect]);

    return (
        <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-6 py-4">
                    {children}
                </div>
            </div>

            {/* Navigation Buttons - Bottom Center */}
            <div className="flex justify-center mt-8 gap-4">
                <Button
                    onClick={scrollPrev}
                    className="w-10 h-10 rounded-full bg-[#f3f4f6] hover:bg-[#15558d] text-[#15558d] hover:text-white border-0 transition-all duration-300 shadow-sm flex items-center justify-center p-0"
                    variant="ghost"
                >
                    <ChevronLeft className="w-5 h-5" />
                </Button>

                <Button
                    onClick={scrollNext}
                    className="w-10 h-10 rounded-full bg-[#f3f4f6] hover:bg-[#15558d] text-[#15558d] hover:text-white border-0 transition-all duration-300 shadow-sm flex items-center justify-center p-0"
                    variant="ghost"
                >
                    <ChevronRight className="w-5 h-5" />
                </Button>
            </div>
        </div>
    );
};

export default DoctorsCarousel;
