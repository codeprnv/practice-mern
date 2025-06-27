import React from "react";
import TrendingCarousel from "../Trending/TrendingCarousel";
import Carousel from "../common/Carousel";
import { fetchNowPlaying } from "../../utils/Data/helper";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { MdArrowForwardIos } from "react-icons/md";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const HeroSection = () => {
  const [hovered, setHovered] = React.useState(false);
  const { data, isLoading, error } = useQuery({
    queryKey: ["nowPlaying"],
    queryFn: fetchNowPlaying,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60 * 2,
    retry: true,
    retryDelay: 2000,
  });
  console.log(`Loading: ${isLoading}\nError: ${error}`);
  return (
    <div className="w-full min-w-[320px] text-white">
      {/* Desktop Grid: Trending + Now Playing */}
      <div className="hidden lg:grid lg:grid-cols-[70%_30%] lg:gap-5">
        <div>
          <TrendingCarousel />
        </div>
        <div className="flex flex-col gap-3 px-2">
          <header
            className="flex h-fit w-fit items-center gap-2 px-1 hover:cursor-pointer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <h1 className="text-2xl font-bold">Now Playing</h1>
            <AnimatePresence>
              {hovered && (
                <motion.div
                  key="arrow"
                  initial={{ opacity: 0, x: 0 }}
                  animate={{ opacity: 1, x: 10 }}
                  exit={{ opacity: 0, x: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut", delay: 0.25 }}
                >
                  <Link
                    reloadDocument
                    to="/"
                    className="relative top-1.5 flex gap-1 text-blue-500 select-none"
                  >
                    Explore All
                    <MdArrowForwardIos className="size-5 text-blue-500" />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </header>

          {data?.results?.slice(0, 3).map((item, index) => (
            <Carousel
              className="h-[30%] max-w-3/4"
              key={index}
              data={item}
              loading={isLoading}
              error={error}
            />
          ))}
        </div>
      </div>

      {/* Mobile View: Only Trending */}
      <div className="relative -top-19 !h-[430px] w-full lg:hidden">
        <TrendingCarousel />
      </div>
    </div>
  );
};

export default HeroSection;
