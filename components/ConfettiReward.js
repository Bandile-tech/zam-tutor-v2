import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const ConfettiReward = () => {
  const { width, height } = useWindowSize();
  return <Confetti width={width} height={height} numberOfPieces={100} recycle={false} />;
};

export default ConfettiReward;