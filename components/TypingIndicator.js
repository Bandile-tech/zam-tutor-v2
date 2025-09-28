const TypingIndicator = () => (
  <div className="flex gap-1 ml-2">
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-400"></div>
  </div>
);

export default TypingIndicator;