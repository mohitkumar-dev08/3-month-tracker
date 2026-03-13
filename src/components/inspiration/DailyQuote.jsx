// components/inspiration/DailyQuote.jsx
import { useState, useEffect } from "react";

export default function DailyQuote() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuote = async () => {
    setLoading(true);
    setError(null);
    
    // Multiple APIs with fallback
    const apis = [
      {
        // API 1: DummyJSON (No CORS issues)
        url: 'https://dummyjson.com/quotes/random',
        parser: (data) => ({ text: data.quote, author: data.author })
      },
      {
        // API 2: ZenQuotes
        url: 'https://zenquotes.io/api/random',
        parser: (data) => ({ text: data[0].q, author: data[0].a })
      },
      {
        // API 3: quotable.io 
        url: 'https://api.quotable.io/random',
        parser: (data) => ({ text: data.content, author: data.author })
      }
    ];
    
    // Try each API one by one
    for (let i = 0; i < apis.length; i++) {
      try {
        console.log(`Trying API ${i + 1}:`, apis[i].url);
        const response = await fetch(apis[i].url);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Quote received:', data);
        
        const quoteData = apis[i].parser(data);
        setQuote(quoteData);
        setLoading(false);
        return; // Success! Exit function
        
      } catch (err) {
        console.log(`API ${i + 1} failed:`, err.message);
        // Continue to next API
      }
    }
    
    // If all APIs fail, show error
    setError("❌ Could not fetch quote. Please try again later.");
    setLoading(false);
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const copyToClipboard = () => {
    if (quote) {
      navigator.clipboard.writeText(`"${quote.text}" — ${quote.author}`);
      alert("✅ Quote copied!");
    }
  };

  if (error) {
    return (
      <div className="quote-container">
        <div className="quote-error">
          <span className="error-emoji">😕</span>
          <p>{error}</p>
          <button onClick={fetchQuote} className="retry-btn">
            🔄 Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quote-container">
      {loading ? (
        <div className="quote-loading">
          <span className="spinner">💭</span>
          <p>Loading inspiration...</p>
        </div>
      ) : quote ? (
        <div className="quote-card">
          <div className="quote-icon">"</div>
          <p className="quote-text">{quote.text}</p>
          <p className="quote-author">— {quote.author}</p>
          
          <div className="quote-actions">
            <button onClick={fetchQuote} className="quote-btn refresh">
              🔄 New Quote
            </button>
            <button onClick={copyToClipboard} className="quote-btn copy">
              📋 Copy
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}