import React from 'react';
import styled from 'styled-components';
import clsx from 'clsx';

const Tag = styled.li`
  text-transform: capitalize;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0 1rem;
  align-items: center;
  padding: 5px 8px;
  border-radius: 4px;

  text-decoration: none;

  font-size: clamp(1rem, 1.4vw, 2rem);

  transform: skew(2deg, -4deg);
  transition: all 0.1s ease-out;

  :hover {
    cursor: pointer;
    transform: skew(0);
    box-shadow: var(--shadow);
  }
  :active {
    box-shadow: var(--shadow-inset);
  }

  &.active {
    font-family: var(--displayFont), sans-serif;
    background: var(--dark);
    color: var(--white);
    transform: skew(0);
    .count {
      background: white;
      color: var(--dark);
    }
  }

  .count {
    background: white;
    padding: 2px 5px;
    border-radius: 4px;
  }
  background: var(--primary);
`;

const GenreTag = ({ name, count, isActive, setFilter }) => {
  return (
    <Tag
      className={clsx('tag', { active: isActive })}
      onClick={() => setFilter(name)}
    >
      <span className="name">{name}</span>
      <span className="count">{count}</span>
    </Tag>
  );
};

export default GenreTag;
