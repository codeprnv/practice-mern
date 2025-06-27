import React from "react";
import TrendingCarousel from "./TrendingCarousel";
import { MdArrowForwardIos } from "react-icons/md";
import { Link } from "react-router-dom";
import Carousel from "../common/Carousel";
import { fetchNowPlaying } from "../../utils/Data/helper";
import { useQuery } from "@tanstack/react-query";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const TrendingSection = () => {
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

  return (
    <>
      {/* Mobile Trending Section */}
      <div className="h-full w-full lg:hidden">
        <TrendingCarousel />
      </div>

      {/* Desktop Trending Section */}
      <div className="relative top-15 hidden h-3/4 w-full lg:block">
        {/* Trending Carousel */}
        <TrendingCarousel />
      </div>
      <div className="relative top-15 hidden h-3/4 w-full gap-3 lg:flex lg:flex-col">
        {/* Section header */}
        <header
          className="flex h-fit w-full items-center gap-2 px-1"
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
        {data?.results?.slice(0, 3).map((data, index) => (
          <Carousel key={index} data={data} loading={isLoading} error={error} />
        ))}
      </div>
    </>
  );
};

export default TrendingSection;
