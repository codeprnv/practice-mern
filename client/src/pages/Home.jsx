import Header from "../components/Header/Header";
import HeroSection from "../components/Hero/HeroSection";
import CategorySections from "../components/common/CategorySections";
import { sections } from "../utils/Data/sections";

const Home = () => {
  return (
    <div className="flex relative min-h-screen w-full min-w-[320px] flex-col overflow-x-hidden bg-black/90">
      {/* black gradient overlay */}
      <div className="pointer-events-none absolute inset-0 top-0 left-0 z-10 h-full w-[60vw] bg-gradient-to-r from-black/30 to-transparent transition-colors duration-200 ease-in md:w-[70vw]" />

      <Header />
      <HeroSection />

      {/* "Now Playing" only for mobile */}
      <div className="relative -top-6 w-full lg:hidden">
        <CategorySections
          title="Now Playing"
          queryKey="nowPlaying"
          queryFn="fetchNowPlaying"
        />
      </div>
      {sections?.map((section, index) => (
        <CategorySections
          key={index}
          title={section.title}
          queryKey={section.queryKey}
          queryFn={section.queryFn}
        />
      ))}
    </div>
  );
};

export default Home;
