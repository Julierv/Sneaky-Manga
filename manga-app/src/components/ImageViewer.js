import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ImageViewer.css'

const ImageViewer = ({ match }) => {
  const { name, volume } = match.params;
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    axios.get(`https://34.173.150.41:3003/api/manga/${name}/${volume}`)
      .then(response => {
        setImages(response.data);
      })
      .catch(error => {
        console.error(`Error fetching images for ${name} - Volume ${volume}:`, error);
      });
  }, [name, volume]);

  const handleNextClick = () => {
    setCurrentImageIndex(prevIndex => Math.min(prevIndex + 1, images.length - 1));
  };

  const handlePrevClick = () => {
    setCurrentImageIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };

  const handleDropdownChange = (event) => {
    // Update the current image index based on the selected value from the dropdown
    const selectedIndex = parseInt(event.target.value, 10) - 1;
    setCurrentImageIndex(selectedIndex);
  };

  return (
    <div className="image-viewer-container">
      <div className="navigation-buttons">
        <button onClick={handlePrevClick} disabled={currentImageIndex === 0}>Previous</button>
        <button onClick={handleNextClick} disabled={currentImageIndex === images.length - 1}>Next</button>
        <label style={{top:'95%'}}>
          <select value={currentImageIndex + 1} onChange={handleDropdownChange}>
            {images.map((_, index) => (
              <option key={index} value={index + 1}>{index + 1}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="image-container">
        <img src={`https://dh4zx4a36rxfp.cloudfront.net/Manga/${name}/${volume}/${images[currentImageIndex]}`} alt={`Image ${currentImageIndex + 1}`} />
      </div>
    </div>
  );
};

export default ImageViewer;




