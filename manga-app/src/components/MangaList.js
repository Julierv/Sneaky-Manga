import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './MangaList.css';

const MangaList = () => {
  const [popularMangaList, setPopularMangaList] = useState([]);
  const [updatedMangaList, setUpdatedMangaList] = useState([]);
  const [completedMangaList, setCompletedMangaList] = useState([]);
  const [allMangaList, setAllMangaList] = useState([]);

  useEffect(() => {
    // Fetch data for the Popular carousel
    axios.get('https://34.173.150.41:3003/api/manga/popular-10')
      .then(response => {
        setPopularMangaList(response.data);
      })
      .catch(error => {
        console.error('Error fetching popular manga list:', error);
      });

    // Fetch data for the Last Updated carousel
    axios.get('https://34.173.150.41:3003/api/manga/latest-10')
      .then(response => {
        setUpdatedMangaList(response.data);
      })
      .catch(error => {
        console.error('Error fetching last updated manga list:', error);
      });

    // Fetch data for the Completed carousel
    axios.get('https://34.173.150.41:3003/api/manga/completed-10')
      .then(response => {
        setCompletedMangaList(response.data);
      })
      .catch(error => {
        console.error('Error fetching completed manga list:', error);
      });

    // Fetch data for the All carousel
    axios.get('https://34.173.150.41:3003/api/manga/alphabetical-10')
      .then(response => {
        setAllMangaList(response.data);
      })
      .catch(error => {
        console.error('Error fetching all manga list:', error);
      });
  }, []);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2
    }
  };

  return (
    <div>
      <div>
        <div style={{marginTop:'20px'}}className="row-title"> 
          <div  className='clasification'>Popular</div>
          <Link to="/view-all/popular" className='view-class'>more</Link>
        </div>
        <Carousel itemClass="carousel-item" responsive={responsive} sliderClass= "react-multi-carousel-track">
          {popularMangaList.map(mangaName => (
            <MangaCover key={mangaName} mangaName={mangaName} />
          ))}
        </Carousel>
      </div>
        
      <div>
          <div className="row-title"> 
            <div  className='clasification'>Updates</div>
            <Link to="/view-all/latest" className='view-class'>more</Link>
          </div>
          <Carousel itemClass="carousel-item" responsive={responsive} sliderClass= "react-multi-carousel-track">
            {updatedMangaList.map(mangaName => (
              <MangaCover key={mangaName} mangaName={mangaName} />
            ))}
          </Carousel>
      </div>

      <div style={{marginBottom:'0px'}}className="row-title"> 
          <div  className='clasification'>Genres</div>
          </div>
      <div className='genres'>
        <Link to="/view-all/action" className='genre-button1'>
          Action
        </Link>
        <Link to="/view-all/adventure" className='genre-button2'>
          Adventure
        </Link>
        <Link to="/view-all/comedy" className='genre-button3'>
          Comedy
        </Link>
        <Link to="/view-all/horror" className='genre-button4'>
          Horror
        </Link>
      </div>

      <div>
          <div className="row-title"> 
           <div  className='clasification'>Completed</div>
           <Link to="/view-all/completed" className='view-class'>more</Link>
          </div>
          <Carousel itemClass="carousel-item" responsive={responsive} sliderClass= "react-multi-carousel-track">
            {completedMangaList.map(mangaName => (
              <MangaCover key={mangaName} mangaName={mangaName} />
            ))}
          </Carousel>
      </div>

      <div>
          <div className="row-title"> 
          <div  className='clasification'>All</div>
          <Link to="/view-all/alphabetical" className='view-class'>more</Link>
          </div>
          <Carousel itemClass="carousel-item" responsive={responsive} sliderClass= "react-multi-carousel-track">
            {allMangaList.map(mangaName => (
              <MangaCover key={mangaName} mangaName={mangaName} />
            ))}
          </Carousel>
      </div>
    </div>
    
  );
};

const MangaCover = ({ mangaName }) => {
  const [cover, setCover] = useState('');

  useEffect(() => {
    axios.get(`https://34.173.150.41:3003/api/cover/${mangaName.name}`)
      .then(response => {
        setCover(response.data);
      })
      .catch(error => {
        console.error(`Error fetching cover for ${mangaName}:`, error);
      });
  }, [mangaName]);

  return (
    <Link to={`/manga/${mangaName.name}`} className="manga-link" id={`manga-link-${mangaName.name}`}>
      <img src={cover} alt={mangaName.name} />
      <h3>{mangaName.name}</h3>
    </Link>
  );
};

export default MangaList;

