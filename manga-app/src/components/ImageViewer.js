import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './ImageViewer.css';

const ImageViewer = ({ match }) => {
  const { name, volume } = match.params;
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageContainerRef = useRef(null);
  const history = useHistory();

  useEffect(() => {
    axios.get(`https://35.196.229.17/api/manga/${name}/${volume}`)
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
    const selectedIndex = parseInt(event.target.value, 10) - 1;
    setCurrentImageIndex(selectedIndex);
  };

  const handleExitClick = () => {
    history.goBack();
  };

  const handleImageClick = (event) => {
    const { clientX } = event;
    const { offsetWidth, offsetLeft } = imageContainerRef.current;

    const clickPosition = clientX - offsetLeft;

    if (clickPosition < offsetWidth / 2) {
      handlePrevClick();
    } else {
      handleNextClick();
    }
  };

  return (
    <div className="image-viewer-container">
      <div className="navigation-buttons">
        <button style={{backgroundColor: 'red'}} onClick={handleExitClick}>Exit</button>
        <button onClick={handlePrevClick} disabled={currentImageIndex === 0}>Previous</button>
        <button onClick={handleNextClick} disabled={currentImageIndex === images.length - 1}>Next</button>
        <label style={{ top: '95%' }}>
          <select value={currentImageIndex + 1} onChange={handleDropdownChange}>
            {images.map((_, index) => (
              <option key={index} value={index + 1}>{index + 1}</option>
            ))}
          </select>
        </label>
      </div>
      <div
        className="image-container"
        onClick={handleImageClick}
        ref={imageContainerRef}
      >
        <img src={`https://dh4zx4a36rxfp.cloudfront.net/Manga/${name}/${volume}/${images[currentImageIndex]}`} alt={`Image ${currentImageIndex + 1}`} className='manga-page' />
      </div>
    </div>
  );
};

export default ImageViewer;







