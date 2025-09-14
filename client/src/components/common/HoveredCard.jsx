// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const HoveredCard = ({ data, position, onClose }) => {
  // console.log("Position:", position);

  return (
    <motion.div
      className="fixed z-[999] w-[340px] overflow-hidden rounded-xl bg-[#181818] text-white shadow-2xl"
      initial={{
        top: position.top,
        left: position.left,
        scale: 0.5,
        opacity: 0,
        transform: "translate(-50%, -50%)",
      }}
      animate={{
        top: position.top - 100,
        left: position.left,
        scale: 1,
        opacity: 1,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      exit={{
        opacity: 0,
        scale: 0.5,
        transition: { duration: 0.25 },
      }}
      onMouseLeave={onClose}
    >
      <img
        src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
        alt={data.title || data.name}
        className="h-[160px] w-full object-cover"
        loading="lazy"
      />
      <div className="p-4">
        <h2 className="text-lg font-bold">{data.title || data.name}</h2>
        <p className="line-clamp-3 text-sm text-gray-300">{data.overview}</p>
      </div>
    </motion.div>
  );
};

export default HoveredCard;
