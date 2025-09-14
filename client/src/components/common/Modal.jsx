import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { FaPlay } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import { SlLike } from "react-icons/sl";
import { MdBookmarkAdded } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";

export default function Modal({ open, handler, position, data }) {
  const [watched, setWatched] = React.useState(false);
  const [liked, setLiked] = React.useState(false);

  return (
    <Dialog
      open={open}
      handler={handler}
      className="bg-transparent p-0 shadow-xl"
      dismiss={{ outsidePress: true }}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              top: position.top,
              left: position.left,
              scale: 0.5,
              opacity: 0,
              position: "absolute",
              transform: "translate(-50%,10%)",
            }}
            animate={{
              top: "50%",
              left: "50%",
              scale: 1,
              opacity: 1,
              transition: { duration: 0.38, ease: "easeIn" },
            }}
            exit={{
              top: position.top,
              left: position.left,
              scale: 0.5,
              opacity: 0,
              transition: { duration: 0.38, ease: "easeOut" },
            }}
            className="z-[9999] max-h-[90vh] w-[100vw] max-w-[850px] overflow-y-auto rounded-xl bg-[#181818] text-white shadow-xl"
          >
            <DialogHeader className="relative h-[50vh] max-h-[50vh] w-full overflow-hidden rounded-xl p-0">
              <img
                src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
                alt={data.title || data.name}
                className="absolute top-0 left-0 h-full w-full object-cover"
                loading="lazy"
              />
              {/* Gradient Transition */}
              <div className="pointer-events-none absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-t from-[#181818] to-transparent select-none" />
              {/* Title */}
              <div className="absolute bottom-0 left-0 flex flex-col gap-4 p-6">
                <span className="text-2xl font-semibold text-white lg:text-3xl">
                  {data?.title}
                </span>
                <div className="flex w-full items-center gap-3">
                  <button className="flex w-[8vw] shrink-0 cursor-pointer items-center justify-center gap-1 rounded-md bg-white px-3 py-1.5 text-sm font-medium text-black/80 transition-colors duration-200 hover:bg-red-700/60 hover:text-white focus:outline-none md:gap-2 md:rounded-lg md:px-4 md:py-2 md:text-lg">
                    <span>
                      <FaPlay />
                    </span>
                    Play
                  </button>
                  <button
                    className="text-2xl font-bold hover:cursor-pointer hover:text-gray-400 focus:outline-none lg:text-4xl"
                    onClick={() => setWatched(!watched)}
                  >
                    {!watched ? <IoAddCircleOutline /> : <MdBookmarkAdded />}
                  </button>
                  <button
                    className="text-xl font-bold hover:cursor-pointer hover:text-gray-400 focus:outline-none lg:text-3xl"
                    onClick={() => setLiked(!liked)}
                  >
                    {!liked ? <SlLike /> : <AiFillLike />}
                  </button>
                </div>
              </div>
            </DialogHeader>
            <DialogBody>{data?.overview}</DialogBody>
            <DialogFooter>
              <Button
                onClick={handler}
                className="mr-1 bg-white p-3 text-red-500 hover:cursor-pointer hover:text-red-700 focus:outline-none"
              >
                Cancel
              </Button>
              <Button
                onClick={handler}
                className="bg-green-500 p-3 hover:cursor-pointer hover:bg-green-700 focus:outline-none"
              >
                Confirm
              </Button>
            </DialogFooter>
          </motion.div>
        )}
      </AnimatePresence>
    </Dialog>
  );
}
