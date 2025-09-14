import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { FaPlay } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import 'swiper/css/bundle';
import 'swiper/modules';
import { Autoplay, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import imdb_logo from '../../assets/imdb_logo.png';
import {
  extractYear,
  fetchTrending,
  truncateText,
} from '../../utils/Data/helper.js';
import SkeletonLoader from '../common/SkeletonLoader.jsx';

const TrendingCarousel = () => {
   const { data, isLoading, error } = useQuery({
      queryKey: ['trending'],
      queryFn: fetchTrending,
      refetchOnWindowFocus: true,
      staleTime: 1000 * 60 * 60,
      cacheTime: 1000 * 60 * 60 * 2,
      retry: true,
      retryDelay: 3000,
   });
   useEffect(() => {
      console.log('Data: ', data);
   }, [data]);

   return (
      <div className='flex h-[45dvh] w-full overflow-hidden rounded-lg shadow-xl shadow-[#E6020C] sm:h-full lg:ml-2 lg:w-[98%] lg:border lg:shadow-2xl'>
         {isLoading || error ? (
            <SkeletonLoader />
         ) : (
            <div className='h-full w-full select-none overflow-hidden'>
               <Swiper
                  modules={[Autoplay, EffectFade]}
                  effect='fade'
                  loop={data.results?.length > 2}
                  slidesPerView={1}
                  autoplay={{
                     delay: 7000,
                     disableOnInteraction: false,
                     waitForTransition: true,
                  }}
                  className='h-full w-full'
               >
                  {data?.results?.slice(0, 7).map((item) => (
                     <SwiperSlide key={item?.id}>
                        <div className='pointer-events-none absolute left-0 top-0 z-0 h-full w-full bg-gradient-to-r from-black/20 to-transparent transition-colors duration-200 ease-in' />
                        <div className='absolute bottom-20 mx-2 my-2 flex h-1/5 w-full flex-col gap-1 px-3 lg:bottom-16'>
                           <div className='z-10 flex items-center gap-2'>
                              <span className='text-xl font-bold text-white md:text-2xl lg:text-4xl'>
                                 {item?.title || item?.name}
                              </span>
                              <img
                                 src={imdb_logo}
                                 alt='imdb-logo'
                                 className='h-3 w-6 md:h-4 md:w-8'
                              />
                              <span className='text-sm font-medium text-white md:text-xl'>
                                 {item?.omdb?.imdbRating &&
                                 item.omdb.imdbRating !== 'N/A'
                                    ? `${item.omdb.imdbRating}/10`
                                    : item?.vote_average
                                      ? `${item.vote_average.toFixed(1)}/10`
                                      : 'N/A'}
                              </span>
                           </div>
                           {/* Mobile Overview */}
                           <span className='block text-sm font-medium text-white md:hidden'>
                              {truncateText(item?.overview, 80)}
                           </span>

                           {/* Tablet/Desktop Overview */}
                           <span className='hidden text-base font-medium text-white md:block'>
                              {truncateText(item?.overview, 160)}
                           </span>
                           <div className='mt-3 flex w-full items-center gap-3'>
                              <button className='flex min-w-fit shrink-0 cursor-pointer items-center justify-center gap-1 rounded-md bg-white px-3 py-1.5 text-sm font-medium text-black/80 transition-colors duration-200 hover:bg-red-700/60 hover:text-white md:gap-2 md:rounded-lg md:px-4 md:py-2 md:text-lg'>
                                 <span>
                                    <FaPlay />
                                 </span>
                                 Play
                              </button>
                              <span className='relative -top-2 hidden text-2xl font-bold text-white md:-top-3 md:block md:text-4xl md:font-semibold'>
                                 .
                              </span>
                              <span className='hidden text-sm font-medium text-white md:block md:text-base'>
                                 {item?.omdb?.Year
                                    ? item?.omdb.Year
                                    : item?.release_date
                                      ? extractYear(item.release_date)
                                      : 'N/A'}
                              </span>
                              <span className='relative -top-2 hidden text-2xl font-bold text-white md:-top-3 md:block md:text-4xl md:font-semibold'>
                                 .
                              </span>
                              {item?.omdb?.Genre ? (
                                 item.omdb.Genre.split(', ').map(
                                    (genre) => (
                                       <Link
                                          key={genre}
                                          className='hidden text-sm font-medium text-white hover:text-blue-400 hover:underline md:block md:text-base'
                                          reloadDocument
                                       >
                                          {genre}
                                       </Link>
                                    )
                                 )
                              ) : (
                                 <div></div>
                              )}
                           </div>
                        </div>
                        <img
                           src={`https://image.tmdb.org/t/p/original${item?.backdrop_path}`}
                           alt={item?.title || item?.name}
                           className='h-full w-full object-cover object-center'
                           loading='lazy'
                        />
                     </SwiperSlide>
                  ))}
               </Swiper>
            </div>
         )}
      </div>
   );
};

export default TrendingCarousel;
