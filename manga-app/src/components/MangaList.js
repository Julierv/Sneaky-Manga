import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './MangaList.css';

const MangaList = () => {
  const [mangaList, setMangaList] = useState([]);

  useEffect(() => {
    axios.get('https://34.173.150.41:3003/api/manga/')
      .then(response => {
        setMangaList(response.data);
      })
      .catch(error => {
        console.error('Error fetching manga list:', error);
      });
  }, []);

  return (
    <div>
      <div className="manga-covers">
        {mangaList.map(mangaName => (
          <MangaCover key={mangaName} mangaName={mangaName} />
        ))}
      </div>
    </div>
  );
};

const MangaCover = ({ mangaName }) => {
  const [cover, setCover] = useState('');

  useEffect(() => {
    axios.get(`https://34.173.150.41:3003/api/cover/${mangaName}`)
      .then(response => {
        setCover(response.data);
      })
      .catch(error => {
        console.error(`Error fetching cover for ${mangaName}:`, error);
      });
  }, [mangaName]);

  return (
    <Link to={`/manga/${mangaName}`} className="manga-link" id={`manga-link-${mangaName}`}>
      <img src={cover} alt={mangaName} />
      <h3>{mangaName}</h3>
    </Link>
  );
};

export default MangaList;


