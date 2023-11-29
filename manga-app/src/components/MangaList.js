import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from "./home.png";
import { Link } from 'react-router-dom';
import './MangaList.css';

const MangaList = () => {
  const [mangaList, setMangaList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('https://34.173.150.41:3003/api/manga/')
      .then(response => {
        setMangaList(response.data);
      })
      .catch(error => {
        console.error('Error fetching manga list:', error);
      });
  }, []);

  const filteredMangaList = mangaList.filter(mangaName =>
    mangaName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <header className="header">
        <Link to="/Sneaky-Manga" className="home-button">
          <img style={{height: '100%'}}src={logo} alt="Home" />
        </Link>
        <input
          type="text"
          placeholder="Search ..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </header>

      <div className="manga-covers">
        {filteredMangaList.map(mangaName => (
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
      <h3 style={{color:'#EEEEEE'}}>{mangaName}</h3>
    </Link>
  );
};

export default MangaList;





