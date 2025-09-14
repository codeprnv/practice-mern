import { useQuery } from "@tanstack/react-query";
import React, { useRef } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { Link } from "react-router-dom";
import "swiper/css/bundle";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Carousel from "./Carousel";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import SkeletonLoader from "./SkeletonLoader";

const CategorySections = ({ title = "", queryKey = "", queryFn }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [queryKey],
    queryFn: queryFn,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60 * 2,
    retry: true,
    retryDelay: 2000,
  });

  const swiperRef = useRef(null);
  const [headerHovered, setHeaderHovered] = React.useState(false);
  const [h1Hovered, setH1Hovered] = React.useState(false);

  const handleReachEnd = (swiper) => {
    // Delay 2s then reset to start
    setTimeout(() => {
      if (!swiper.destroyed) {
        swiper.slideTo(0);
      }
    }, 7000);
  };

  if (isLoading || error) {
     return (
        <div className='flex h-full w-full select-none flex-col justify-center gap-2 p-2 lg:mx-2 lg:mt-8'>
           <h1 className='mb-4 cursor-pointer px-2 text-xl font-semibold text-white md:text-xl lg:text-2xl'>
              {title}
           </h1>
           <div className='flex space-x-4 overflow-hidden px-2'>
              {/* Render 6 skeleton cards to mimic the carousel */}
              {[...Array(6)].map((_, i) => (
                 <SkeletonLoader
                    key={i}
                    className='!h-[130px] !w-[220px] flex-shrink-0 md:!h-[160px] md:!w-[270px]'
                 />
              ))}
           </div>
        </div>
     );
  }

  return (
    <div className="flex h-full w-full flex-col justify-center gap-2 p-2 select-none lg:mx-2 lg:mt-8">
      <header
        className="flex w-full items-start gap-2"
        onMouseEnter={() => setHeaderHovered(true)}
        onMouseLeave={() => {
          setHeaderHovered(false);
          setH1Hovered(false);
        }}
      >
        <motion.div
          onMouseEnter={() => setH1Hovered(true)}
          onMouseLeave={() => setH1Hovered(false)}
          animate={{ width: h1Hovered ? "auto" : "fit-content" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center gap-2 overflow-visible"
        >
          <h1 className="cursor-pointer text-xl font-semibold text-white md:text-xl lg:text-2xl">
            {title}
          </h1>

          <AnimatePresence>
            {(headerHovered || h1Hovered) && (
              <motion.div
                className="relative -top-2"
                key="hover-content"
                initial={{ opacity: 0, x: 0 }}
                animate={{ opacity: 1, x: 10 }}
                exit={{ opacity: 0, x: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <Link
                  reloadDocument
                  to="/"
                  className="relative top-1.5 flex gap-1 text-blue-500 select-none"
                >
                  {h1Hovered && "Explore All"}
                  <MdArrowForwardIos className="size-5 text-blue-500" />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </header>
      <Swiper
        className="w-full px-2 py-4 select-none"
        spaceBetween={16}
        modules={[Navigation]}
        navigation={true}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onReachEnd={handleReachEnd}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 16, slidesPerGroup: 2 },
          768: { slidesPerView: 3.2, spaceBetween: 24, slidesPerGroup: 2.6 },
          1024: { slidesPerView: 6, spaceBetween: 28, slidesPerGroup: 3 },
        }}
      >
        {data?.results?.map((item, index) => (
          <SwiperSlide
            key={index}
            className="!h-[130px] !w-[220px] md:!h-[160px] md:!w-[270px]"
            style={{ overflow: "visible" }}
          >
            <Carousel data={item} loading={isLoading} error={error} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategorySections;
