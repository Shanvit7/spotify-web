import { FC } from "react";
import { motion } from "framer-motion";

const SkeletonCard: FC = () => (
  <motion.li
    className="flex items-center space-x-4 py-2 px-4 rounded-md cursor-pointer"
    animate={{ opacity: [0.7, 1] }}
    transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
  >
    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-700"></div>
    <div className="flex-grow min-w-0 space-y-2">
      <div className="h-4 bg-gray-700 rounded w-3/4"></div>
      <div className="h-3 bg-gray-700 rounded w-1/2"></div>
    </div>
  </motion.li>
);

const SkeletonList: FC = () => (
  <>
    {Array.from({ length: 5 }).map((_, index) => (
      <SkeletonCard key={index} />
    ))}
  </>
);

const SkeletonCoverImage: FC = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-gray-700 animate-pulse">
    <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
  </div>
);

export { SkeletonList, SkeletonCoverImage };
