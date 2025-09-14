import { AnimatePresence } from "framer-motion";
import React from "react";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import SkeletonLoader from "../common/SkeletonLoader";
import HoveredCard from "./HoveredCard"; // ⬅️ import this
import Modal from "./Modal";

const Carousel = ({ data, loading, error, className = "" }) => {
  const [open, setOpen] = React.useState(false);
  const hoverRef = React.useRef(null);
  const [hoverPosition, setHoverPosition] = React.useState({ top: 0, left: 0 });
  const [hovered, setHovered] = React.useState(false);

  const toggleDialog = () => setOpen(!open);

  const handleIconClick = () => {
    if (hoverRef.current) {
      const rect = hoverRef.current.getBoundingClientRect();
      setHoverPosition({
        top: rect.top + rect.height / 2 + window.scrollY,
        left: rect.left + rect.width / 2 + window.scrollX,
      });
    }
    toggleDialog();
  };

  const handleMouseEnter = () => {
    if (hoverRef.current) {
      const rect = hoverRef.current.getBoundingClientRect();
      setHoverPosition({
        top: rect.top + rect.height / 2 + window.scrollY,
        left: rect.left + rect.width / 2 + window.scrollX,
      });
    }
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <>
      <div
        ref={hoverRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`group relative flex h-full min-h-[130px] w-full min-w-[220px] overflow-hidden rounded-lg select-none md:min-h-[160px] md:min-w-[270px] ${className}`}
      >
        {/* Gradient overlay */}
        <div className="pointer-events-none absolute top-0 left-0 z-0 h-full w-full bg-gradient-to-r from-black/20 to-transparent" />

        {loading || error ? (
          <SkeletonLoader height={100} width={100}/>
        ) : (
          <>
            <img
              src={`https://image.tmdb.org/t/p/w780${data.backdrop_path}`}
              alt={data.title || data.name}
              className="h-full w-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 flex w-full translate-y-full items-center justify-between bg-gradient-to-t from-black/90 to-transparent p-4 text-white transition-transform duration-300 group-hover:translate-y-0">
              <span>{data.title || data.name}</span>
              <button
                className="text-3xl hover:cursor-pointer"
                onClick={handleIconClick}
              >
                <MdOutlineArrowDropDownCircle />
              </button>
            </div>
          </>
        )}
      </div>

      {/* Hover Card Preview */}
      <AnimatePresence>
        {hovered && (
          <HoveredCard
            key={`hovered-${data.id}`}
            data={data}
            position={hoverPosition}
            onClose={handleMouseLeave}
          />
        )}
      </AnimatePresence>

      {/* Modal on click */}
      {open && (
        <Modal
          data={data}
          open={open}
          handler={toggleDialog}
          position={hoverPosition}
        />
      )}
    </>
  );
};

export default Carousel;
