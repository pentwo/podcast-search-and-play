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

        <Genres result={result} filter={filter} setFilter={setFilter} />
        <Podcasts result={result} handleClick={handleClick} filter={filter} />
        {isSearched && Object.keys(result).length < 1 && !isLoading
          ? 'No Search Result'
          : ''}
        {isLoading ? <img src={Loading} alt="loading" /> : ''}
        {/* {isLoading ? (
          <ContentLoader
            speed={3}
            width={'auto'}
            height={128}
            viewBox="0 0 640 128"
            backgroundColor="var(--white)"
            foregroundColor="var(--lightgray)"
          >
            <rect x="0" y="0" rx="8" ry="8" width="80" height="30" />
            <rect x="120" y="0" rx="8" ry="8" width="80" height="30" />
            <rect x="240" y="0" rx="8" ry="8" width="80" height="30" />
            <rect x="360" y="0" rx="8" ry="8" width="80" height="30" />
            <rect x="75" y="67" rx="4" ry="4" width="80" height="10" />
            <rect x="0" y="60" rx="12" ry="12" width="64" height="64" />
            <rect x="576" y="60" rx="12" ry="12" width="64" height="64" />
            <rect x="75" y="96" rx="4" ry="4" width="240" height="20" />
          </ContentLoader>
        ) : (
          ''
        )} */}

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
