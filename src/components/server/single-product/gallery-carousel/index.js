"use client";
import { isEmpty, isArray } from "lodash";
import Image from "next/image";
import { useState, useRef } from "react";

const GalleryCarousel = ({ gallery }) => {
    // Hooks must be called at the top level, outside any conditionals
    const activeIndexRef = useRef({ activeIndex: 0 });
    const slideRef = useRef(0);
    const [slide, setSlide] = useState(0);
    const [restartSlide, setRestartSlide] = useState(0);

    if (isEmpty(gallery) || !isArray(gallery)) {
        return null;
    }

    const { activeIndex } = activeIndexRef.current;

    const nextSlide = () => {
        if (gallery.length === 1) {
            return;
        }

        if (activeIndexRef.current.activeIndex === gallery.length - 1) {
            activeIndexRef.current.activeIndex = 0;
            setRestartSlide(restartSlide + 1);
        } else {
            activeIndexRef.current.activeIndex += 1;
        }

        slideRef.current += 1;
        setSlide(slideRef.current);
    };

    return (
        <div className="banner flex flex-col sm:flex-row justify-between overflow-hidden md:mr-4">
            <div className="banner-img w-full">
                {gallery.map((item, index) => {
                    const opacity = activeIndex === index || gallery.length === 1 ? "opacity-100" : "opacity-0";
                    return (
                        <div key={item?.id} className={`${opacity} banner-img-container absolute top-0 left-0`}>
                            <Image
                                src={item?.mediaItemUrl}
                                alt={item?.altText || item?.title}
                                width={500} // Set appropriate width
                                height={300} // Set appropriate height
                                priority={activeIndex === index} // Loads first image eagerly
                            />  
                        </div>
                    );
                })}
                <div className="slider-button">
                    <button className="focus:outline-none" onClick={nextSlide}>
                        <svg
                            width="25px"
                            className="inline-block mr-3"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                        </svg>
                    </button>
                    <button className="focus:outline-none" onClick={nextSlide}>
                        <svg
                            width="25px"
                            className="inline-block"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GalleryCarousel;
