import React, { useState, useRef, useEffect } from 'react';

import 'normalize.css';
import './styles.css';

import styled from 'styled-components';
import ContentLoader from 'react-content-loader';

import Header from './components/Header';
import Search from './components/Search';
import Genres from './components/Genres';
import Podcasts from './components/Podcasts';
import Overlay from './components/Overlay';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import { fetchPodcastData } from './utility/searchApi';

import Loading from './assets/dual-ring-1s-200px.svg';

const Wrapper = styled.div``;

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState([]);
  const [overlayData, setOverlayData] = useState({});
  const [filter, setFilter] = useState('all');
  const [isLoading, setLoading] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const [isSearched, setSearched] = useState(false);
  const [playlist, setPlaylist] = useState(null);

  const handleClick = async (e, info) => {
    setOverlayData({});
    setVisible(true);

    const fetchResult = await fetchPodcastData(info.feedUrl);

    setOverlayData({ ...fetchResult });
  };

  // window.onscroll = () => {
  //   if (
  //     window.innerHeight + document.documentElement.scrollTop ===
  //     document.documentElement.offsetHeight
  //   ) {
  //     console.log("it's the end");
  //   }
  // };

  return (
    <Wrapper className="app">
      <div className="container">
        <Header />
        <Search
          inputValue={inputValue}
          setInputValue={setInputValue}
          setResult={setResult}
          setLoading={setLoading}
          setSearched={setSearched}
          setFilter={setFilter}
        />
        {!isLoading && inputValue && (
            <h3>Search Result for "{inputValue}"</h3>
        )}
        <Genres result={result} filter={filter} setFilter={setFilter} />
        <Podcasts result={result} handleClick={handleClick} filter={filter} />
        {isSearched && Object.keys(result).length < 1 && !isLoading
          ? 'No Search Result'
          : ''}
        {isLoading ? <img src={Loading} alt="loading" /> : ''}


        <Overlay
          isVisible={isVisible}
          setVisible={setVisible}
          overlayData={overlayData}
          setOverlayData={setOverlayData}
          setPlaylist={setPlaylist}
        />
        <Footer />
      </div>
      <Sidebar width={'350'} height={document.documentElement.scrollHeight}>
        <Player playlist={playlist} setPlaylist={setPlaylist} />
      </Sidebar>
    </Wrapper>
  );
}
