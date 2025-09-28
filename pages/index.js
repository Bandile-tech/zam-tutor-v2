import { useState } from "react";
import Header from "../components/Header";
import SubjectSelector from "../components/SubjectSelector";
import TutorChat from "../components/TutorChat";
import ProgressBar from "../components/ProgressBar";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";

export default function Home() {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [progress, setProgress] = useState(40);

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-200 via-blue-100 to-pink-200 animate-[pulse_10s_infinite] -z-10"></div>

      <Header />

      <main className="flex-1 relative z-10 p-4 space-y-6">
        <SubjectSelector onSelect={setSelectedSubject} />
        {selectedSubject && <TutorChat subject={selectedSubject} />}
        <ProgressBar progress={progress} />
        <CallToAction />
      </main>

      <Footer />
    </div>
  );
}