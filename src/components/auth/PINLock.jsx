// components/auth/PINLock.jsx
import { useState, useEffect } from "react";

export default function PINLock({ onUnlock }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [lockUntil, setLockUntil] = useState(null);
  const [unlockTime, setUnlockTime] = useState(null);
  const [timeUntilLock, setTimeUntilLock] = useState(null);

  // 🔑 Set your PIN here
  const CORRECT_PIN = "2626";

  // Check if already authenticated in this session
  useEffect(() => {
    const checkAuth = () => {
      const lockUntilTime = localStorage.getItem("app_lock_until");
      const savedUnlockTime = sessionStorage.getItem("app_unlock_time");
      
      // Check if temporarily locked
      if (lockUntilTime) {
        const lockTime = parseInt(lockUntilTime);
        if (Date.now() < lockTime) {
          const remaining = Math.ceil((lockTime - Date.now()) / 1000);
          setTimeLeft(remaining);
          setLockUntil(lockTime);
          return;
        } else {
          localStorage.removeItem("app_lock_until");
        }
      }
      
      // Check if already unlocked
      if (savedUnlockTime) {
        const unlockTimestamp = parseInt(savedUnlockTime);
        setUnlockTime(unlockTimestamp);
      }
    };
    
    checkAuth();
  }, []);

  // Timer for auto-lock countdown - 25 SECONDS
  useEffect(() => {
    let interval;
    
    if (unlockTime) {
      interval = setInterval(() => {
        const now = Date.now();
        const elapsed = now - unlockTime;
        const AUTO_LOCK_TIME = 5 * 60 * 1000; // 5 minutes
        const remaining = AUTO_LOCK_TIME - elapsed;
        
        if (remaining <= 0) {
          // Time's up - lock the app
          sessionStorage.removeItem("app_unlock_time");
          window.location.reload();
        } else {
          // Show remaining time in seconds
          const remainingSeconds = Math.ceil(remaining / 1000);
          setTimeUntilLock(`${remainingSeconds}s`);
        }
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [unlockTime]);

  // Timer for lock countdown
  useEffect(() => {
    let interval;
    
    if (timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            setAttempts(0);
            setError("");
            localStorage.removeItem("app_lock_until");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [timeLeft]);

  // Handle refresh detection
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.removeItem("app_unlock_time");
    };
    
    const handlePageHide = () => {
      sessionStorage.removeItem("app_unlock_time");
    };
    
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        sessionStorage.removeItem("app_unlock_time");
      }
    };
    
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("pagehide", handlePageHide);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("pagehide", handlePageHide);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (lockUntil && Date.now() < lockUntil) {
      const remaining = Math.ceil((lockUntil - Date.now()) / 1000);
      setTimeLeft(remaining);
      return;
    }
    
    if (pin === CORRECT_PIN) {
      const now = Date.now();
      console.log("✅ Setting unlock time:", now);
      sessionStorage.setItem("app_unlock_time", now.toString());
      setUnlockTime(now);
      onUnlock();
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setError(`❌ Wrong PIN! ${3 - newAttempts} attempts left.`);
      setPin("");
      
      if (newAttempts >= 3) {
        const lockTime = Date.now() + 30 * 1000;
        localStorage.setItem("app_lock_until", lockTime.toString());
        setLockUntil(lockTime);
        setTimeLeft(30);
        setError("🔒 Too many attempts! Locked for 30 seconds.");
        setAttempts(0);
      }
    }
  };

  // If already unlocked, show nothing (app will render)
  if (unlockTime) {
    return null;
  }

  return (
    <div className="pin-lock-container">
      <div className="pin-lock-card">
        <div className="pin-lock-icon">🔒</div>
        <h2>Enter PIN</h2>
        
        {/* Auto-lock Timer - shows when app is unlocked */}
        {unlockTime && timeUntilLock && (
          <div className="auto-lock-timer">
            ⏰ Auto-lock in: <strong>{timeUntilLock}</strong>
          </div>
        )}
        
        {/* Lock Timer - shows when locked after wrong attempts */}
        {timeLeft > 0 ? (
          <div className="pin-timer">
            ⏱️ Locked for {timeLeft} seconds
          </div>
        ) : (
          <p className="pin-subtitle">
            <span>⏰ Auto-locks every 5 min</span>
            <span>🔄 Instant lock on refresh</span>
          </p>
        )}
        
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength="4"
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, ''))}
            placeholder="****"
            className="pin-input"
            autoFocus
            disabled={timeLeft > 0}
          />
          
          {error && <div className="pin-error">{error}</div>}
          
          <div className="pin-buttons">
            {[1,2,3,4,5,6,7,8,9].map(num => (
              <button
                key={num}
                type="button"
                className="pin-key"
                onClick={() => setPin(prev => (prev + num).slice(0,4))}
                disabled={timeLeft > 0}
              >
                {num}
              </button>
            ))}
            <button
              type="button"
              className="pin-key"
              onClick={() => setPin(prev => (prev + 0).slice(0,4))}
              disabled={timeLeft > 0}
            >
              0
            </button>
            <button
              type="button"
              className="pin-key backspace"
              onClick={() => setPin(prev => prev.slice(0, -1))}
              disabled={timeLeft > 0}
            >
              ⌫
            </button>
          </div>
          
          <button 
            type="submit" 
            className="pin-submit-btn"
            disabled={timeLeft > 0}
          >
            {timeLeft > 0 ? `Wait ${timeLeft}s` : 'Unlock'}
          </button>
        </form>
        
        <div className="pin-footer">
          <span>⏰ 5 min auto-lock</span>
          <span>🔄 Instant refresh lock</span>
            
        </div>  
      </div>
    </div>
  );
}