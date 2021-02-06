import React, { useState } from 'react';
import styled from 'styled-components';

import Episode from './Episode';

const loadingEpisodesLimit = 5;

const Wrapper = styled.div`
  grid-column: 1/3;
`;

const Episodes = ({ episodes, setPlaylist, host, image }) => {
  const [currentLoad, setLoaded] = useState(5);

  // Load more 5 episodes
  const handleLoadMore = () => {
    setLoaded((pre) => {
      return (pre += loadingEpisodesLimit);
    });
  };

  return (
    <Wrapper className="episodes">
      <h3>Recent Episodes:</h3>
      {episodes?.slice(0, currentLoad).map((item) => {
        return (
          <Episode
            ep={item}
            key={item.pubDate}
            setPlaylist={setPlaylist}
            host={host}
            image={image}
          />
        );
      })}
      {episodes?.length > currentLoad ? (
        <h3 style={{ textAlign: 'center' }} onClick={handleLoadMore}>
          ...Load More...
        </h3>
      ) : (
        ''
      )}
    </Wrapper>
  );
};

export default Episodes;
