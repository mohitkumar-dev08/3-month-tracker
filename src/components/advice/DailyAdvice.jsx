// components/advice/DailyAdvice.jsx
import { useState, useEffect } from "react";

export default function DailyAdvice() {
  const [advice, setAdvice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAdvice = async () => {
    setLoading(true);
    setAdvice(null);
    setError(null);
    
    try {
      // ✅ WORKING API - DummyJSON (हमेशा available)
      const response = await fetch('https://dummyjson.com/quotes/random');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Advice received:', data);
      
      // DummyJSON से quote लेकर advice की तरह show करेंगे
      setAdvice({
        text: data.quote,
        author: data.author
      });
      
    } catch (err) {
      console.error('Error fetching advice:', err);
      setError("❌ Could not fetch advice. Please try again later.");
      setAdvice(null); // Ensure no fallback advice is shown
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  const copyToClipboard = () => {
    if (advice) {
      navigator.clipboard.writeText(`"${advice.text}" — ${advice.author}`);
      alert("✅ Advice copied!");
    }
  };

  // Agar error hai to sirf error dikhao
  if (error) {
    return (
      <div className="advice-container">
        <div className="advice-error">
          <span className="error-emoji">😕</span>
          <p>{error}</p>
          <button onClick={fetchAdvice} className="retry-btn">
            🔄 Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="advice-container">
      {loading ? (
        <div className="advice-loading">
          <span className="spinner">💭</span>
          <p>Loading advice...</p>
        </div>
      ) : advice ? (
        <div className="advice-card">
          <div className="advice-icon">💡</div>
          <p className="advice-text">"{advice.text}"</p>
          <p className="advice-author">— {advice.author}</p>
          
          <div className="advice-actions">
            <button onClick={fetchAdvice} className="advice-btn refresh">
              🔄 New Advice
            </button>
            <button onClick={copyToClipboard} className="advice-btn copy">
              📋 Copy
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}