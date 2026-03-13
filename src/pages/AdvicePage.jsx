import QuoteBanner from "../components/common/QuoteBanner";
import DailyAdvice from "../components/advice/DailyAdvice";

export default function AdvicePage({ streak }) {
  return (
    <div className="advice-page">
      <QuoteBanner streak={streak} />
      <DailyAdvice />
    </div>
  );
}