import { useQuery } from '@tanstack/react-query';
import React, { lazy, Suspense } from 'react';
import { MdArrowForwardIos } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { fetchNowPlaying } from '../../utils/Data/helper';
const TrendingCarousel = lazy(() => import('../Trending/TrendingCarousel'));
const Carousel = lazy(() => import('../common/Carousel'));
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion';
import SkeletonLoader from '../common/SkeletonLoader';

const HeroSection = () => {
   const [hovered, setHovered] = React.useState(false);
   const { data, isLoading, error } = useQuery({
      queryKey: ['nowPlaying'],
      queryFn: fetchNowPlaying,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60,
      cacheTime: 1000 * 60 * 60 * 2,
      retry: true,
      retryDelay: 2000,
   });
   console.log(`Loading: ${isLoading}\nError: ${error}`);

   return (
      <div className='w-full min-w-[320px] text-white'>
         {/* Desktop Grid: Trending + Now Playing */}
         <div className='hidden lg:grid lg:grid-cols-[70%_30%] lg:gap-5'>
            <div>
               <Suspense fallback={<SkeletonLoader className='h-full w-full' />}>
                  <TrendingCarousel />
               </Suspense>
            </div>
            <div className='flex flex-col gap-3 px-2'>
               <header
                  className='flex h-fit w-fit items-center gap-2 px-1 hover:cursor-pointer'
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
               >
                  <h1 className='text-2xl font-bold'>Now Playing</h1>
                  <AnimatePresence>
                     {hovered && (
                        <motion.div
                           key='arrow'
                           initial={{ opacity: 0, x: 0 }}
                           animate={{ opacity: 1, x: 10 }}
                           exit={{ opacity: 0, x: 0 }}
                           transition={{
                              duration: 0.3,
                              ease: 'easeOut',
                              delay: 0.25,
                           }}
                        >
                           <Link
                              reloadDocument
                              to='/'
                              className='relative top-1.5 flex select-none gap-1 text-blue-500'
                           >
                              Explore All
                              <MdArrowForwardIos className='size-5 text-blue-500' />
                           </Link>
                        </motion.div>
                     )}
                  </AnimatePresence>
               </header>

               {isLoading || error ? (
                  // Render skeleton placeholders for the "Now Playing" cards
                  <>
                     <SkeletonLoader className='max-w-3/4 h-[30%] w-full' />
                     <SkeletonLoader className='max-w-3/4 h-[30%] w-full' />
                     <SkeletonLoader className='max-w-3/4 h-[30%] w-full' />
                  </>
               ) : (
                  // Render the actual Carousel components once data is available
                  data?.results?.slice(0, 3).map((item, index) => (
                     <Carousel
                        className='max-w-3/4 h-[30%]'
                        key={index}
                        data={item}
                        loading={false} // Pass false here
                     />
                  ))
               )}
            </div>
         </div>

         {/* Mobile View: Only Trending */}
         <div className='-top-19 relative !h-[430px] w-full lg:hidden'>
            <Suspense fallback={<SkeletonLoader className='h-full w-full' />}>
               <TrendingCarousel />
            </Suspense>
         </div>
      </div>
   );
};

export default HeroSection;
