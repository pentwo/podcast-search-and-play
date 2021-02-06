import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.footer`
  position: fixed;
  bottom: 0;
  text-align: center;
  background: #fff;
  width: 100%;
  h5 {
    padding: 0;
    margin: 0;
  }
`;

const Footer = () => {
  return (
    <Wrapper>
      <h5>
        Made with{' '}
        <span role="img" aria-label="heart">
          ♥️
        </span>{' '}
        by{' '}
        <a
          href="https://www.stevenpeng.com.au"
          target="_blank"
          rel="noreferrer noopener"
        >
          Steven Peng
        </a>
        <br />
        Genre Icons by{' '}
        <a target="_blank" rel="noopener noreferrer" href="https://icons8.com">
          Icons8
        </a>
      </h5>
    </Wrapper>
  );
};

export default Footer;
