import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './MangaDetails.css';

const MangaDetails = ({ match }) => {
  const { name } = match.params;
  const [manga, setManga] = useState('');
  const [volumes, setVolumes] = useState([]);

  useEffect(() => {
    axios.get(`https://34.173.150.41:3003/api/name/${name}`)
      .then(response => {
        setManga(response.data);
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
        <img src={manga.cover_url} alt={`${name} Cover`} />
      </div>
      <div className="manga-details-content">
        <div className='header'>
          <h1>{name}</h1>
          <div className='date'>{manga.date}</div>
        </div>
        <div className='description'>
          <div className='p2'>{manga.description}</div>
          </div>
        <h2>Tags</h2>
        <div>
          {manga && manga.tags ? (
            manga.tags.map(tag => (
              <div className='tag' key={tag}>
                {tag}
              </div>
            ))
          ) : (
            <p>No tags available</p>
          )}
        </div>
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




