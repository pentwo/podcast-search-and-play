import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import clsx from 'clsx';

import Episodes from './Episodes';
import Loading from '../assets/dual-ring-1s-200px.svg';

const Wrapper = styled.div`
  &.show {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  display: none;

  position: fixed;
  top: 0;
  left: 0;
  background-color: #00000064;
  width: 100%;
  height: 100%;
  z-index: 5000;

  .podcast-content {
    background: var(--white);
    padding: 1rem;
    border-radius: 5px;
    overflow: auto;

    width: 80vw;
    max-width: 100%;
    height: 80vh;
    max-height: 100%;

    position: fixed;
    z-index: 100;

    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
  }
  .podcast-info {
    .podcast-host {
      margin: 0 0 0.5rem 0;
      font-weight: 300;
      font-size: 1.2rem;
      a {
        text-decoration: none;
        color: var(--primary);
      }
    }
    .podcast-title {
      color: var(--dark);
      font-weight: 700;
      font-size: 3rem;
      margin: 0 0 1rem 0;
    }
    .podcast-description {
      line-height: 1.5;
    }
  }
  .podcast-cover {
    img {
      width: 100%;
    }
  }

  .clear-icon {
    width: 25px;
    position: absolute;
    top: 10px;
    right: 10px;
  }
`;

const Overlay = ({
  isVisible,
  setVisible,
  overlayData,
  setOverlayData,
  setPlaylist
}) => {
  const [isLoading, setLoading] = useState(false);

  const { host, title, image, episodes } = overlayData;

  // Remove HTML Tags
  let { description } = overlayData;
  if (description !== undefined) {
    description = description.replace(/(<([^>]+)>)/gi, '');
  }

  // Set loading image
  useEffect(() => {
    if (Object.keys(overlayData).length === 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [isVisible, overlayData]);

  return (
    <Wrapper
      className={clsx('podcast-overlay', { show: isVisible })}
      onClick={(e) => {
        if (e.target.classList.contains('show')) {
          setVisible(false);
          setOverlayData({});
        }
      }}
    >
      {isLoading ? (
        <img src={Loading} alt="loading" />
      ) : (
        <>
          <div className="podcast-content">
            <div className="podcast-info">
              <div className="podcast-host">{host}</div>
              <div className="podcast-title">{title}</div>
              <div className="podcast-description">{description}</div>
            </div>
            <div className="podcast-cover">
              <img src={image} alt="" />
            </div>
            {/*  */}

            {isVisible ? (
              <Episodes
                episodes={episodes}
                setPlaylist={setPlaylist}
                host={host}
                image={image}
              />
            ) : (
              ''
            )}
          </div>
          {/*  */}
        </>
      )}
      <img
        className="clear-icon"
        alt="clear-icon"
        src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxLjk3NiA1MS45NzYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxLjk3NiA1MS45NzY7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4Ij4KPGc+Cgk8cGF0aCBkPSJNNDQuMzczLDcuNjAzYy0xMC4xMzctMTAuMTM3LTI2LjYzMi0xMC4xMzgtMzYuNzcsMGMtMTAuMTM4LDEwLjEzOC0xMC4xMzcsMjYuNjMyLDAsMzYuNzdzMjYuNjMyLDEwLjEzOCwzNi43NywwICAgQzU0LjUxLDM0LjIzNSw1NC41MSwxNy43NCw0NC4zNzMsNy42MDN6IE0zNi4yNDEsMzYuMjQxYy0wLjc4MSwwLjc4MS0yLjA0NywwLjc4MS0yLjgyOCwwbC03LjQyNS03LjQyNWwtNy43NzgsNy43NzggICBjLTAuNzgxLDAuNzgxLTIuMDQ3LDAuNzgxLTIuODI4LDBjLTAuNzgxLTAuNzgxLTAuNzgxLTIuMDQ3LDAtMi44MjhsNy43NzgtNy43NzhsLTcuNDI1LTcuNDI1Yy0wLjc4MS0wLjc4MS0wLjc4MS0yLjA0OCwwLTIuODI4ICAgYzAuNzgxLTAuNzgxLDIuMDQ3LTAuNzgxLDIuODI4LDBsNy40MjUsNy40MjVsNy4wNzEtNy4wNzFjMC43ODEtMC43ODEsMi4wNDctMC43ODEsMi44MjgsMGMwLjc4MSwwLjc4MSwwLjc4MSwyLjA0NywwLDIuODI4ICAgbC03LjA3MSw3LjA3MWw3LjQyNSw3LjQyNUMzNy4wMjIsMzQuMTk0LDM3LjAyMiwzNS40NiwzNi4yNDEsMzYuMjQxeiIgZmlsbD0iIzAwMDAwMCIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo="
        onClick={(e) => {
          setVisible(false);
          setOverlayData({});
        }}
      />
    </Wrapper>
  );
};

export default Overlay;
