// FRAMER MOTION
import { motion } from "framer-motion";

const Skeleton = ({ className }) => (
  <motion.div
    className={`bg-gray-300 animate-pulse ${className}`}
    initial={{ opacity: 0.5 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1, ease: "easeInOut" }}
  />
);

const SkeletonPlay = () => (
  <div className="w-10 h-10 border-4 border-t-2 border-gray-200 border-solid rounded-full animate-spin" />
);

export { Skeleton, SkeletonPlay };
