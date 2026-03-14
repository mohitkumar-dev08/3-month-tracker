import QuoteBanner from "../components/common/QuoteBanner";
import GymProgress from "../components/gym/GymProgress";

export default function GymProgressPage({ streak }) {
  return (
    <div className="gym-progress-page">
      <QuoteBanner streak={streak} />
      <GymProgress />
    </div>
  );
}