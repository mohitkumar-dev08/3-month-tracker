// components/gym/GymTarget93.jsx
import { useState, useEffect } from "react";
import GymPhotoUpload from "./GymPhotoUpload";
import GymPhotoGallery from "./GymPhotoGallery";

export default function GymTarget93() {
  const [targetData, setTargetData] = useState(() => {
    const saved = localStorage.getItem("gymTarget93");
    return saved ? JSON.parse(saved) : {
      startDate: new Date().toDateString(),
      totalDays: 52,
      completedDays: 0,
      skippedDays: 0, 
      skipHistory: [],
      lastMarkedDate: null,
      lastSkippedDate: null,
      photos: {}
    };
  });

  const [showHistory, setShowHistory] = useState(false);
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);
  const [currentDayForPhoto, setCurrentDayForPhoto] = useState(null);
  const [showGallery, setShowGallery] = useState(false);
  const [folderSelected, setFolderSelected] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  const remainingDays = targetData.totalDays - targetData.completedDays;
  const progressPercent = Math.round((targetData.completedDays / targetData.totalDays) * 100);
  const today = new Date().toDateString();

  // Save to localStorage whenever targetData changes
  useEffect(() => {
    try {
      localStorage.setItem("gymTarget93", JSON.stringify(targetData));
      window.dispatchEvent(new Event('gymTargetUpdated'));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [targetData]);

  // Check if folder was previously selected
  useEffect(() => {
    const folderPref = localStorage.getItem("gym93FolderSelected");
    if (folderPref === "true") {
      setFolderSelected(true);
    }
  }, []);

  const handleMarkDay = () => {
    if (targetData.completedDays >= targetData.totalDays) {
      alert("🎉 Congratulations! You've completed your 3 month gym target!");
      return;
    }

    if (targetData.lastMarkedDate === today) {
      alert("❌ You've already marked today!");
      return;
    }

    // Check if folder is selected
    if (!folderSelected) {
      const wantsToSelect = window.confirm(
        "📁 You haven't selected a folder for photos yet. Would you like to select one now?\n\nIf you skip, photos will be downloaded instead."
      );
      
      if (wantsToSelect) {
        setCurrentDayForPhoto(targetData.completedDays + 1);
        setShowPhotoUpload(true);
        return;
      }
    }

    // Ask for photo
    const wantsToUpload = window.confirm(
      `Day ${targetData.completedDays + 1} completed! 📸 Do you want to upload a progress photo?`
    );
    
    if (wantsToUpload) {
      setCurrentDayForPhoto(targetData.completedDays + 1);
      setShowPhotoUpload(true);
    } else {
      // Mark day without photo
      setTargetData(prev => {
        const updated = {
          ...prev,
          completedDays: prev.completedDays + 1,
          lastMarkedDate: today
        };
        console.log("Marked day without photo:", updated.completedDays);
        return updated;
      });
    }
  };

  const handlePhotoUploaded = (day, photoData) => {
    console.log("📸 Photo uploaded callback received for day:", day);
    
    try {
      // Prevent multiple uploads
      if (isUploading) {
        console.log("Already uploading, skipping...");
        return;
      }
      
      setIsUploading(true);
      
      // Close the modal first
      setShowPhotoUpload(false);
      
      // Update folder selected status
      setFolderSelected(true);
      
      // Update state with new data
      setTargetData(prev => {
        if (!prev) {
          console.error("Previous state is null!");
          return prev;
        }
        
        console.log("Previous completedDays:", prev.completedDays);
        
        // Calculate new completed days
        const newCompletedDays = prev.completedDays + 1;
        
        // Create updated photos object
        const updatedPhotos = {
          ...(prev.photos || {}),
          [`day${day}`]: {
            data: photoData,
            timestamp: new Date().toISOString(),
            day: day
          }
        };
        
        const updated = {
          ...prev,
          completedDays: newCompletedDays,
          lastMarkedDate: today,
          photos: updatedPhotos
        };
        
        console.log("New completedDays:", updated.completedDays);
        
        // Directly save to localStorage as backup
        try {
          localStorage.setItem("gymTarget93", JSON.stringify(updated));
        } catch (storageError) {
          console.error("Error saving to localStorage:", storageError);
        }
        
        return updated;
      });
      
      setCurrentDayForPhoto(null);
      setIsUploading(false);
      
      // Show success message after state update
      setTimeout(() => {
        alert(`✅ Day ${day} marked and photo saved in 186-days-progress folder!`);
      }, 100);
      
    } catch (error) {
      console.error("Error in handlePhotoUploaded:", error);
      setIsUploading(false);
      alert("❌ Error updating count. Please refresh the page.");
    }
  };

  const handleSkipDay = () => {
    if (targetData.lastSkippedDate === today) {
      alert("❌ Already skipped today!");
      return;
    }

    const reason = prompt("Why did you skip? (optional)");
    if (reason === null) return;

    setTargetData(prev => ({
      ...prev,
      skippedDays: prev.skippedDays + 1,
      lastSkippedDate: today,
      skipHistory: [
        { date: today, reason: reason || "No reason", timestamp: new Date().toISOString() },
        ...prev.skipHistory
      ].slice(0, 30)
    }));
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="gym-target-93">
      {/* Photo Upload Modal */}
      {showPhotoUpload && currentDayForPhoto && !isUploading && (
        <div className="photo-upload-modal">
          <div className="photo-upload-modal-content">
            <button 
              className="modal-close-btn"
              onClick={() => {
                setShowPhotoUpload(false);
                setCurrentDayForPhoto(null);
              }}
            >
              ✕
            </button>
            <GymPhotoUpload 
              dayNumber={currentDayForPhoto}
              onPhotoUploaded={handlePhotoUploaded}
            />
          </div>
        </div>
      )}

      {/* Gallery Modal */}
      {showGallery && (
        <div className="gallery-modal">
          <div className="gallery-modal-content">
            <button 
              className="modal-close-btn"
              onClick={() => setShowGallery(false)}
            >
              ✕
            </button>
            <GymPhotoGallery photos={targetData.photos} />
          </div>
        </div>
      )}

      <div className="gym-header">
        <h2>💪 52  Days Gym Target</h2>
        <span className="days-badge">{remainingDays} days left</span>
      </div>

      {/* Progress Circle */}
      <div className="progress-circle-large">
        <svg viewBox="0 0 120 120" className="progress-svg">
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="#e0e0e0"
            strokeWidth="12"
          />
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="12"
            strokeDasharray="339.292"
            strokeDashoffset={339.292 * (1 - targetData.completedDays / targetData.totalDays)}
            strokeLinecap="round"
            transform="rotate(-90 60 60)"
          />
          <text
            x="60"
            y="60"
            textAnchor="middle"
            dy="0.3em"
            fontSize="24"
            fontWeight="bold"
            fill="currentColor"
          >
            {targetData.completedDays}
          </text>
        </svg>
      </div>

      {/* Stats */}
      <div className="gym-stats">
        <div className="stat-item">
          <span className="stat-label">Completed</span>
          <span className="stat-value">{targetData.completedDays}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Remaining</span>
          <span className="stat-value">{remainingDays}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Skipped</span>
          <span className="stat-value">{targetData.skippedDays}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="gym-progress">
        <div className="progress-header">
          <span>Overall Progress</span>
          <span>{progressPercent}%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      {/* Folder Status */}
      {!folderSelected && (
        <div className="folder-reminder">
          <span>📁 No folder selected - photos will download</span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="gym-actions">
        <button onClick={handleMarkDay} className="btn btn-success">
          ✅ Mark Today
        </button>
        <button onClick={handleSkipDay} className="btn btn-warning">
          ⏭️ Skip Today
        </button>
      </div>

      {/* Gallery Button */}
      {Object.keys(targetData.photos || {}).length > 0 && (
        <button 
          className="gallery-toggle"
          onClick={() => setShowGallery(true)}
        >
          📸 View Progress Gallery ({Object.keys(targetData.photos).length} photos)
        </button>
      )}

      {/* History Toggle */}
      <button 
        className="history-toggle"
        onClick={() => setShowHistory(!showHistory)}
      >
        {showHistory ? '📋 Hide History' : '📋 Show Skip History'}
      </button>

      {/* Skip History */}
      {showHistory && (
        <div className="skip-history">
          <h4>Skip History</h4>
          {targetData.skipHistory.length > 0 ? (
            targetData.skipHistory.map((item, index) => (
              <div key={index} className="history-item">
                <span className="history-date">{formatDate(item.date)}</span>
                <span className="history-reason">{item.reason}</span>
              </div>
            ))
          ) : (
            <p className="no-history">No skips yet! Keep going! 💪</p>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="gym-footer">
        <span>Started: {formatDate(targetData.startDate)}</span>
        <span>Target: 52 days</span>
      </div>
    </div>
  );
}