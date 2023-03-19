import React, { useState } from 'react';
import styled from 'styled-components';

import Episode from './Episode';

const loadingEpisodesLimit = 5;

const Wrapper = styled.div`
  grid-column: 1/3;
  
`;

const StyledButton = styled.button`

    background-color: var(--primary);
    color: var(--white);
    border: none;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    margin: 1rem 0;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
`;

const Episodes = ({ episodes, setPlaylist, host, image }) => {
  const [currentLoad, setLoaded] = useState(loadingEpisodesLimit);

  // Load more 5 episodes
  const handleLoadMore = () => {
    setLoaded((pre) => {
      return (pre += loadingEpisodesLimit);
    });
  };

  return (
    <Wrapper className="episodes">
        
        {episodes?.length === 0 ? (
            <h3>No Episodes Found</h3>
        ) : <h3>Recent Episodes:</h3>}
      
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
      <div style={{
            display: 'flex',
            justifyContent: 'center',
      }}>
        {episodes?.length > currentLoad ? (
            <StyledButton onClick={handleLoadMore}>
            Load More
            </StyledButton>
        ) : (
            null
        )}
      </div>
    </Wrapper>
  );
};

export default Episodes;
