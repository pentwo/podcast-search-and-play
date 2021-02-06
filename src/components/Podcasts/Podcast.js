import React from 'react';
import styled from 'styled-components';

const Item = styled.div`
  padding: 5px;
  min-width: 60vw;
  max-width: 720px;

  border-radius: 3px;
  margin-bottom: 0.25rem;
  box-shadow: var(--shadow);
  .podcast-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .podcast-cover {
    height: 75px;
    width: 75px;
    margin: 0 1rem;
    border-radius: 5px;
  }
  .podcast-text {
    width: 100%;
    .podcast-host {
      margin: 0 0 0.5rem 0;
      font-weight: 300;
      font-size: 1rem;
      a {
        text-decoration: none;
        color: var(--primary);
      }
    }
    .podcast-title {
      color: var(--dark);
      font-weight: 700;
      font-size: 1.5rem;
      /* margin: 0 0 1rem 0; */
      margin: 0;
    }
  }
  .podcast-genre-icon {
    width: 15%;
    margin: 0 0.5rem;
    text-align: center;
    img {
      width: 35px;
      height: 100%;
    }
    figcaption {
      font-size: 0.6rem;
      letter-spacing: 1px;
    }
  }
`;

const Podcast = ({ info, handleClick }) => {
  const {
    artworkUrl100,
    artistName,
    collectionName,
    collectionViewUrl,
    genreName,
    genreImageUrl
  } = info;
  return (
    <Item>
      <div
        className="podcast-item"
        onClick={(e) => {
          handleClick(e, info);
        }}
      >
        <img
          className="podcast-cover"
          src={artworkUrl100}
          alt="podcast-cover"
        />
        <div className="podcast-text">
          <h5 className="podcast-host">
            <a
              href={collectionViewUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              {artistName}
            </a>
          </h5>
          <h3 className="podcast-title">{collectionName}</h3>
        </div>

        {genreImageUrl && (
          <figure className="podcast-genre-icon">
            <img
              // className="podcast-genre-icon"
              src={genreImageUrl}
              alt={`Podcast Genre: ${genreName}`}
            />
            <figcaption>{genreName}</figcaption>
          </figure>
        )}
      </div>
    </Item>
  );
};
export default Podcast;
