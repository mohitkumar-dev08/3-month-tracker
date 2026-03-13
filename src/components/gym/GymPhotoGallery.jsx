// components/gym/GymPhotoGallery.jsx
import { useState } from "react";

export default function GymPhotoGallery({ photos }) {
  const [selectedDay, setSelectedDay] = useState(null);

  // Convert photos object to array
  const photosArray = Object.entries(photos || {})
    .map(([key, value]) => ({
      day: value.day,
      data: value.data,
      timestamp: value.timestamp
    }))
    .sort((a, b) => a.day - b.day);

  return (
    <div className="gym-photo-gallery">
      <div className="gallery-header">
        <h3>📸 Progress Gallery</h3>
        <span className="photo-count">{photosArray.length} photos</span>
      </div>

      {photosArray.length > 0 ? (
        <div className="gallery-grid">
          {photosArray.map((photo) => (
            <div 
              key={photo.day} 
              className="gallery-item"
              onClick={() => setSelectedDay(photo.day)}
            >
              <img src={photo.data} alt={`Day ${photo.day}`} />
              <div className="photo-day">Day {photo.day}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-photos">
          <span className="no-photos-icon">📷</span>
          <p>No progress photos yet</p>
          <p className="no-photos-hint">Mark a day and upload your first photo!</p>
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedDay && (
        <div className="photo-lightbox" onClick={() => setSelectedDay(null)}>
          <div className="lightbox-content">
            <img 
              src={photosArray.find(p => p.day === selectedDay)?.data} 
              alt={`Day ${selectedDay}`}
            />
            <button className="close-lightbox" onClick={(e) => {
              e.stopPropagation();
              setSelectedDay(null);
            }}>✕</button>
            <div className="lightbox-day">Day {selectedDay}</div>
          </div>
        </div>
      )}
    </div>
  );
}