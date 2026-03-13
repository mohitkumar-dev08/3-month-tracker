import QuoteBanner from "../components/common/QuoteBanner";
import DailyQuote from "../components/inspiration/DailyQuote";

export default function InspirationPage({ streak }) {
  return (
    <div className="inspiration-page">
      <QuoteBanner streak={streak} />
      <DailyQuote />
    </div>
  );
}