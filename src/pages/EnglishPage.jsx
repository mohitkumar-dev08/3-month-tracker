import QuoteBanner from "../components/common/QuoteBanner";
import EnglishMaster from "../components/english/EnglishMaster";

export default function EnglishPage({ streak }) {
  return (
    <div className="english-page">
      <QuoteBanner streak={streak} />
      <EnglishMaster />
    </div>
  );
}