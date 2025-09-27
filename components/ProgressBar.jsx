import { motion } from "framer-motion";

const ProgressBar = ({ progress }) => (
  <div className="w-full bg-gray-300 rounded-full h-4 my-4">
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      className="h-4 rounded-full bg-gradient-to-r from-primary to-accent"
    />
  </div>
);

export default ProgressBar;