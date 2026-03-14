// pages/PsychologyPage.jsx
import QuoteBanner from "../components/common/QuoteBanner";
import PsychologyMaster from "../components/psychology/PsychologyMaster";

export default function PsychologyPage({ streak }) {
  return (
    <div className="psychology-page">
      <QuoteBanner streak={streak} />
      <PsychologyMaster />
    </div>
  );
}