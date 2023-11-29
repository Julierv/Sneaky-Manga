import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './MangaDetails.css';

const MangaDetails = ({ match }) => {
  const { name } = match.params;
  const [cover, setCover] = useState('');
  const [volumes, setVolumes] = useState([]);

  useEffect(() => {
    axios.get(`https://34.173.150.41:3003/api/cover/${name}`)
      .then(response => {
        setCover(response.data);
      })
      .catch(error => {
        console.error(`Error fetching cover for ${name}:`, error);
      });

    axios.get(`https://34.173.150.41:3003/api/manga/${name}/nums`)
      .then(response => {
        const sortedVolumes = response.data.sort((a, b) => {
          const numA = parseInt(a.match(/\d+/)[0], 10);
          const numB = parseInt(b.match(/\d+/)[0], 10);
          return numA - numB;
        });

        setVolumes(sortedVolumes);
      })
      .catch(error => {
        console.error(`Error fetching volumes for ${name}:`, error);
      });
  }, [name]);

  return (
    <div className="manga-details-container">
      <div className="manga-cover-container">
        <img src={cover} alt={`${name} Cover`} />
      </div>
      <div className="manga-details-content">
        <h1>{name}</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et convallis lacus, quis pulvinar augue. In hac habitasse platea dictumst. Etiam ut mattis libero.</p>
        <h2>Tags</h2>
        <p>Lorem - ipsum - dolor</p>
        <h2>Volume List</h2>
        <ul className="volume-list">
          {volumes.map(volume => (
            <li key={volume}>
              <Link to={`/manga/${name}/${volume}`} className="volume-link">
                {volume.replace(/[()]/g, '')}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MangaDetails;




