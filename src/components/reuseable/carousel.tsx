import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";



const slides = [
  "https://i.ibb.co/ncrXc2V/1.png",
  "https://i.ibb.co/B3s7v4h/2.png",
  "https://i.ibb.co/XXR8kzF/3.png",
  "https://i.ibb.co/yg7BSdM/4.png",
];

interface Props {
  slides: { id: number, link: string }[]
}

export default function Carousel({ slides }: Props) {
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [snaps, setsnaps] = useState([]);
  const snap = slides;

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: false,
      // slidesToScroll:3,
      inViewThreshold: 1,
      skipSnaps: false,
      dragFree: false,
      containScroll: "keepSnaps",
      align: 'start',
      startIndex: 0,
      // Prevent dragging beyond edges
      watchDrag: (emblaApi) => {
        const engine = emblaApi.internalEngine();
        const location = engine.location;
        const target = engine.target;

        // If at the start, prevent dragging left
        if (location.get() === 0 && target.get() < 0) {
          return false;
        }

        // If at the end, prevent dragging right
        const maxScroll = emblaApi.scrollSnapList().length - 1;
        if (location.get() === maxScroll && target.get() > maxScroll) {
          return false;
        }

        return true;
      }
    },
  );

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );
  const scrollTo = useCallback(
    (index: any) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const generateRepeatedArray = (arr: any, times: any) => {
    return Array(times).fill(arr).flat();
  };

  const repeated = generateRepeatedArray(slides, 10);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());

    // if (emblaApi.selectedScrollSnap() === snap.length - 2 ) {
    //   snap.push(...repeated)
    //  }
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    // console.log(emblaApi.scrollSnapList());
    onSelect();
    setScrollSnaps(emblaApi?.scrollSnapList());
    emblaApi.on("select", onSelect);
  }, [emblaApi, selectedIndex, onSelect, setScrollSnaps]);

  //console.log(snap,snap.length);
  // console.log(repeated);
  return (
    <>
      <div className="embla h-full relative" ref={emblaRef}>
        <div className="embla__container h-full  ">
          {slides.map((slide, i) => (
            <div key={i} className="embla__slide w-full relative">
              <img
                src={slide.link}
                alt=""
                className="w-full h-full flex-shrink-0"
              />
              {/* <Image
                src={slide.link}
                alt={slide.id}
                className="w-full h-full"
                width={200}
                height={200}
              /> */}
            </div>
          ))}
        </div>
        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={`embla__dot ${index === selectedIndex ? "is-selected" : ""
                }`}
              type="button"
              onClick={() => scrollTo(index)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
