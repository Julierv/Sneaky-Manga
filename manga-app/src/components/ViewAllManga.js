import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ViewAll.css';

const ViewAllMangaPage = ({ match }) => {
  const { classification } = match.params;
  const [mangaList, setList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get(`https://34.173.150.41:3003/api/manga/${classification}`)
      .then(response => {
        setList(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching manga list:', error);
      });
  }, [classification]);

  const filteredMangaList = mangaList.filter(manga =>
    manga.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className='header2'>
        <h1 style={{ textAlign: 'left', marginLeft: '4%' }}>
          {classification.toLowerCase() === 'alphabetical' ? 'All' : classification[0].toUpperCase() + classification.slice(1)} Manga
        </h1>
        <input
          type="text"
          placeholder="Search"
          className="search-bar2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="manga-covers">
        {filteredMangaList.map(manga => (
          <MangaCover key={manga.name} manga={manga} />
        ))}
      </div>
    </div>
  );
};

const MangaCover = ({ manga }) => {
  const [cover, setCover] = useState('');

  useEffect(() => {
    axios.get(`https://34.173.150.41:3003/api/cover/${manga.name}`)
      .then(response => {
        setCover(response.data);
      })
      .catch(error => {
        console.error(`Error fetching cover for ${manga.name}:`, error);
      });
  }, [manga]);

  return (
    <Link to={`/Sneaky-Manga/manga/${manga.name}`} className="manga-link2" id={`manga-link2-${manga.name}`}>
      <img src={cover} alt={manga.name} />
      <h3>{manga.name}</h3>
    </Link>
  );
};

export default ViewAllMangaPage;
