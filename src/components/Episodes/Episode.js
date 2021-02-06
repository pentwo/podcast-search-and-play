import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import clsx from 'clsx'
import dayjs from 'dayjs'

import playlistAddSVG from '../../assets/control/ic-playlist-add-48px.svg'

const limitLength = 200

const Wrapper = styled.div`
  margin-bottom: 1rem;
  .ep-title {
    color: var(--dark);
    font-size: 1.2rem;
  }
  .ep-date {
    color: var(--lightgray);
    font-size: 0.8rem;
    margin-bottom: 0.75rem;
  }
  .ep-description {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: var(--darkgray);
  }
  hr {
    color: var(--primary);
  }
  .btn-addPlaylist {
    width: 64px;
    height: 64px;
    border-radius: 4px;

    position: relative;
    &:hover {
      box-shadow: var(--shadow);
    }
    &:active {
      box-shadow: var(--shadow-inset);
    }
  }
`

const Episode = ({ ep, host, image, setPlaylist }) => {
  let description = ''

  // Remove unnecessary HTML tags
  if (ep.description) {
    description = ep.description.replace(/(<([^>]+)>)/gi, '')
  } else if (ep.summary) {
    description = ep.summary.replace(/(<([^>]+)>)/gi, '')
  } else {
    description = ''
  }

  // trim if description is too long
  if (description.length > limitLength) {
    description = description.substring(0, limitLength) + `...Read More`
  }

  const handleAddToPlaylist = () => {
    setPlaylist(prevList => {
      if (!prevList) return [{ ...ep, host, image }]
      return [...prevList, { ...ep, host, image }]
    })
  }

  return (
    <Wrapper className="ep-item">
      <div className="ep-title">{ep.title}</div>

      <div className="ep-date">{dayjs(ep.pubDate).format('DD MMMM YYYY')}</div>

      <div className="ep-description">
        <button
          className="btn-reset btn-addPlaylist"
          onClick={handleAddToPlaylist}
        >
          <img src={playlistAddSVG} alt="" />
        </button>
        <p>{description}</p>
      </div>
      <hr />
    </Wrapper>
  )
}

export default Episode

// dayjs('2019-01-25').format('DD/MM/YYYY')
