import { motion } from "framer-motion";

const ChatBubble = ({ message, isUser }) => (
  <motion.div
    initial={{ opacity: 0, x: isUser ? 50 : -50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0 }}
    className={`p-3 rounded-lg max-w-xs ${isUser ? 'bg-primary text-white ml-auto' : 'bg-gray-200 text-black'}`}
  >
    {message}
  </motion.div>
);

export default ChatBubble;