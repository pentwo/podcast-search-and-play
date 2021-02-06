import './Sidebar.css';
import React, { useEffect } from 'react';
import styled from 'styled-components';

import playerImage from '../../assets/icons8-playlist.png';

const Wrapper = styled.div`
  height: 100% !important;
  display: flex;
  position: absolute;
  top: 0;
  flex-direction: column;

  width: ${(props) => props.width}px;
  transform: translateX(${(props) => `${props.xPosition}px`});
  min-height: ${(props) => props.minHeight}px;

  border-right: 2px solid;
  border-radius: 0;
  border-color: var(--dark);
  background-color: var(--white);
  transition: 0.4s ease;

  box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
`;

const Sidebar = ({ width, height, children }) => {
  const [xPosition, setX] = React.useState(-width);

  const toggleMenu = () => {
    if (xPosition < 0) {
      setX(0);
    } else {
      setX(-width);
    }
  };

  useEffect(() => {
    setX(-width);
  }, []);

  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <Wrapper
        className="side-bar"
        width={width}
        xPosition={xPosition}
        minHeight={height}
      >
        <button
          onClick={() => toggleMenu()}
          className="toggle-menu"
          style={{
            transform: `translate(${width}px, 10vh)`
          }}
        >
          <img
            className="player-icon"
            src={playerImage}
            alt="sidebar: player"
          />
        </button>
        <div className="content">{children}</div>
      </Wrapper>
    </React.Fragment>
  );
};
export default Sidebar;
