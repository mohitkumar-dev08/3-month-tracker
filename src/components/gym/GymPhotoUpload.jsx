// components/gym/GymPhotoUpload.jsx
import { useState, useEffect } from "react";

export default function GymPhotoUpload({ dayNumber, onPhotoUploaded }) {
  const [preview, setPreview] = useState(null);
  const [folderHandle, setFolderHandle] = useState(null);
  const [folderSelected, setFolderSelected] = useState(false);
  const [folderPath, setFolderPath] = useState("");

  // Check if folder was previously selected
  useEffect(() => {
    const savedFolder = localStorage.getItem("gym93FolderSelected");
    const savedPath = localStorage.getItem("gym93FolderPath");
    if (savedFolder === "true") {
      setFolderSelected(true);
      if (savedPath) setFolderPath(savedPath);
    }
  }, []);

  const selectFolder = async () => {
    try {
      // Ask user to select a folder
      const handle = await window.showDirectoryPicker({
        id: 'gym93-progress',
        mode: 'readwrite',
        startIn: 'documents'
      });
      
      // Create or get "186-days-progress" subfolder
      let gymFolder;
      try {
        gymFolder = await handle.getDirectoryHandle('186-days-progress', { create: true });
      } catch (err) {
        gymFolder = await handle.getDirectoryHandle('186-days-progress', { create: true });
      }
      
      // Store folder handle in state
      setFolderHandle(gymFolder);
      setFolderSelected(true);
      
      // Get folder path for display
      const path = handle.name + '/186-days-progress';
      setFolderPath(path);
      
      // Store flag and path in localStorage
      localStorage.setItem("gym186FolderSelected", "true");
      localStorage.setItem("gym186FolderPath", path);
      
      alert('✅ Folder "186-days-progress" selected/created! Photos will save there.');
      return gymFolder;
      
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Error selecting folder:', err);
        alert('❌ Could not select folder. Using download instead.');
      }
      return null;
    }
  };

  const saveToFolder = async (file, fileName) => {
    try {
      if (!folderHandle) {
        console.error('No folder handle available');
        return false;
      }
      
      // Create file in folder
      const fileHandle = await folderHandle.getFileHandle(fileName, { create: true });
      
      // Write file
      const writable = await fileHandle.createWritable();
      await writable.write(file);
      await writable.close();
      
      console.log(`✅ File saved to folder: ${fileName}`);
      return true;
    } catch (err) {
      console.error('Error saving to folder:', err);
      return false;
    }
  };

  const downloadPhoto = (base64Data, fileName) => {
    const link = document.createElement('a');
    link.href = base64Data;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('❌ Only image files are allowed!');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('❌ File size should be less than 10MB');
      return;
    }

    const extension = file.name.split('.').pop() || 'jpg';
    const fileName = `day-${dayNumber}.${extension}`;

    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const base64String = reader.result;
        let saved = false;
        let currentFolderHandle = folderHandle;
        
        // If no folder selected, try to select one
        if (!currentFolderHandle && !folderSelected) {
          const wantsToSelect = window.confirm(
            "📁 No folder selected. Would you like to select a folder for photos?\n\n" +
            "This will create a '186-days-progress' folder where all photos will be saved."
          );
          
          if (wantsToSelect) {
            currentFolderHandle = await selectFolder();
            setFolderHandle(currentFolderHandle);
          }
        }
        
        // Try to save to folder if handle exists
        if (currentFolderHandle) {
          saved = await saveToFolder(file, fileName);
          if (saved) {
            const folderPath = localStorage.getItem("gym186FolderPath") || "186-days-progress";
            alert(`✅ Photo saved as "${folderPath}/${fileName}"`);
          } else {
            downloadPhoto(base64String, fileName);
            alert(`✅ Photo downloaded as ${fileName} (Folder save failed)`);
          }
        } else {
          // No folder handle, just download
          downloadPhoto(base64String, fileName);
          alert(`✅ Photo downloaded as ${fileName}`);
        }
        
        setPreview(base64String);
        
        // Save to localStorage for gallery
        const existingPhotos = JSON.parse(localStorage.getItem("gymProgressPhotos") || "{}");
        const updatedPhotos = {
          ...existingPhotos,
          [`day${dayNumber}`]: {
            data: base64String,
            timestamp: new Date().toISOString(),
            day: dayNumber,
            fileName: fileName,
            folder: saved ? localStorage.getItem("gym186FolderPath") || '186-days-progress' : 'downloads'
          }
        };
        localStorage.setItem("gymProgressPhotos", JSON.stringify(updatedPhotos));
        
        // Call the callback to update parent
        if (onPhotoUploaded && typeof onPhotoUploaded === 'function') {
          console.log("Calling onPhotoUploaded with day:", dayNumber);
          setTimeout(() => {
            try {
              onPhotoUploaded(dayNumber, base64String);
            } catch (callbackError) {
              console.error("Error in onPhotoUploaded callback:", callbackError);
            }
          }, 100);
        }
      } catch (error) {
        console.error("Error in photo upload process:", error);
        alert("❌ An error occurred while processing the photo.");
      }
    };
    
    reader.readAsDataURL(file);
  };

  return (
    <div className="gym-photo-upload">
      <div className="photo-upload-header">
        <span className="photo-icon">📸</span>
        <h4>Day {dayNumber} Progress Photo</h4>
      </div>

      {!folderSelected ? (
        <div className="folder-select-section">
          <p className="folder-info">📁 Photos will save in "186-days-progress" folder</p>
          <button onClick={selectFolder} className="folder-select-btn">
            📂 Select/Create Folder
          </button>
          <p className="folder-hint">(Choose any location - a "186-days-progress" folder will be created)</p>
        </div>
      ) : (
        <div className="folder-selected-badge">
          ✅ Folder: {folderPath || '186-days-progress'}
        </div>
      )}

      {preview ? (
        <div className="photo-preview">
          <img src={preview} alt={`Day ${dayNumber}`} />
          <p className="photo-saved">
            ✅ Saved in: {folderSelected ? (folderPath || '186-days-progress') : 'Downloads'}
          </p>
          <button 
            className="change-photo-btn"
            onClick={() => setPreview(null)}
          >
            🔄 Change Photo
          </button>
        </div>
      ) : (
        <div className="photo-upload-area">
          <label htmlFor={`photo-${dayNumber}`} className="upload-label">
            <span className="upload-icon">📤</span>
            <span>Click to select photo</span>
            <span className="upload-hint">
              {folderSelected 
                ? `Will save in: ${folderPath || '186-days-progress'}`
                : 'Will download if no folder selected'}
            </span>
          </label>
          <input
            type="file"
            id={`photo-${dayNumber}`}
            accept="image/*"
            onChange={handlePhotoUpload}
            style={{ display: 'none' }}
          />
        </div>
      )}
    </div>
  );
}