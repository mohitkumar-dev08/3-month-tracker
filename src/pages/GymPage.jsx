import QuoteBanner from "../components/common/QuoteBanner";
import GymTarget93 from "../components/gym/GymTarget93";

export default function GymPage({ streak }) {
  return (
    <div className="gym-page">
      <QuoteBanner streak={streak} />
      <GymTarget93 />
    </div>
  );
}