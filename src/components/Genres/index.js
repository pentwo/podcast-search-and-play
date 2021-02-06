import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import GenreTag from './GenreTag';

const Wrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Genres = ({ result, filter, setFilter }) => {
  const [types, setTypes] = useState({});

  useEffect(() => {
    setTypes(
      result.reduce(
        (pre, cur) => {
          let temp = pre;
          if (cur.genreName) {
            let name = cur.genreName;
            if (pre[name]) {
              temp[name] = pre[name] + 1;
            } else {
              temp[name] = 1;
            }
            temp.all = pre.all + 1;
          }

          return temp;
        },
        { all: 0 }
      )
    );
  }, [result]);

  return (
    <Wrapper className="genres">
      {types.all
        ? Object.keys(types).map((key) => {
            const isActive = key === filter;
            return (
              <GenreTag
                name={key}
                count={types[key]}
                key={key}
                isActive={isActive}
                setFilter={setFilter}
              />
            );
          })
        : ''}
    </Wrapper>
  );
};

export default Genres;
