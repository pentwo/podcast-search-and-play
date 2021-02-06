import React, { useEffect, useState, useRef } from 'react';
import ReactPlayer from 'react-player/';
import clsx from 'clsx';
import dayjs from 'dayjs';

import styled from 'styled-components';

import playingGif from '../../assets/sound-nobg.gif';
import playSVG from '../../assets/control/ic-play-arrow-48px.svg';
import pauseSVG from '../../assets/control/ic-pause-48px.svg';
import forwardSVG from '../../assets/control/ic-forward-30-48px.svg';
import backwardSVG from '../../assets/control/ic-replay-30-48px.svg';
import skipSVG from '../../assets/control/ic-skip-next-48px.svg';
import deleteSVG from '../../assets/control/ic-delete-48px.svg';

import { CustomInput } from './RangeInput';

import { secondsToMinutes } from '../../utility/tools';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;

  &.playing {
    .podcast-cover {
      img {
        transform: scale(0.9);
        box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
          rgba(0, 0, 0, 0.08) 0px 0px 0px 1px,
          rgba(149, 157, 165, 0.2) 0px 8px 24px;
        filter: grayscale(0);
      }
    }
  }
  .podcast-cover {
    img {
      transition: all 0.3s linear;
      width: 100%;
      transform: scale(0.8);
      border-radius: 8px;
      box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px,
        rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px,
        rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;

      filter: grayscale(50%);
    }
  }
  .podcast-duration {
    display: flex;
    justify-content: space-between;
  }
  .playing {
  }
  .animate-icon {
    width: 32px;
  }
  .controls {
    display: flex;
    justify-content: space-evenly;
    height: 64px;

    &-button {
      border-radius: 4px;
      transition: all 0.1s linear;
      &:hover {
        box-shadow: var(--shadow);
      }
      &:active {
        box-shadow: var(--shadow-inset);
      }
    }
  }
  button:disabled {
    cursor: no-drop;
    img {
      filter: opacity(25%);
    }
  }
`;
const ListWrapper = styled.ul`
  padding: 0;
  h3 {
    display: flex;
    justify-content: space-between;
  }

  .text {
    h5 {
      padding: 0;
      margin: 0;
    }
  }
  li ~ li {
    margin-top: 1rem;
  }
`;
const List = styled.li`
  font-weight: 300;
  box-shadow: var(--shadow);
  list-style: none;
  margin: 0.5rem;
  padding: 0.5rem;
  border: var(--dark) solid 2px;
  border-radius: 4px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  cursor: pointer;

  &.playing {
    font-family: var(--displayFont), sans-serif;
    background: var(--dark);
    color: var(--white);
    &:hover {
      background: var(--darkgray);
    }
  }
  &:hover {
    background: var(--primary);
  }
`;

const Player = ({ playlist, setPlaylist }) => {
  const [musicList, setMusicList] = useState([]);
  const [config, setConfig] = useState({
    playing: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0
  });
  const player = useRef(null);
  useEffect(() => {
    setMusicList((prevFiles) => {
      if (!playlist) {
        return [];
      }
      const playFiles = playlist.map((i) => i.enclosure.url);

      return [...playFiles];
    });
  }, [playlist]);

  const handleEnded = () => {
    setPlaylist((prevList) => prevList.slice(1));
    setMusicList((prevList) => prevList.slice(1));
  };
  const handleSeekMouseDown = (e) => {
    setConfig((prevConfig) => {
      return { ...prevConfig, seeking: true };
    });
  };
  const handleSeekChange = (e) => {
    setConfig((prevConfig) => {
      return { ...prevConfig, played: parseFloat(e.target.value) };
    });
  };
  const handleSeekMouseUp = (e) => {
    setConfig((prevConfig) => {
      return { ...prevConfig, seeking: false };
    });
    player.current.seekTo(parseFloat(e.target.value));
  };
  const handleProgress = (state) => {
    // We only want to update time slider if we are not currently seeking
    if (!config.seeking) {
      setConfig((prevConfig) => {
        return { ...prevConfig, ...state };
      });
    }
  };
  const handleDuration = (duration) => {
    setConfig((prevConfig) => {
      return { ...prevConfig, duration };
    });
  };
  const handlePutTopPlaylist = (e) => {
    const index = e.currentTarget.dataset.index;

    if (index === 0) return;

    setPlaylist((prevlist) => {
      let temp = [prevlist[index]];
      prevlist.map((i) => {
        return i === prevlist[index] ? null : temp.push(i);
      });
      console.log(temp);
      return temp;
    });
  };
  const handleControl = (control) => {
    switch (control) {
      case 'playpause':
        setConfig((prevConfig) => {
          return { ...prevConfig, playing: !prevConfig.playing };
        });
        break;
      case 'next':
        setConfig((prevConfig) => {
          return { ...prevConfig, playing: false };
        });
        setPlaylist((prevList) => prevList.slice(1));
        setMusicList((prevList) => prevList.slice(1));
        break;
      case 'clear':
        setPlaylist(null);
        break;
      case 'forward':
        player.current.seekTo(config.playedSeconds + 30);
        break;
      case 'backward':
        player.current.seekTo(config.playedSeconds - 30);
        break;

      default:
        console.log(`Something went wrong!`);
    }
  };

  return (
    <Wrapper className={clsx({ playing: config.playing })}>
      {playlist && playlist.length > 0 ? (
        <>
          <ReactPlayer
            className="react-player"
            ref={player}
            url={musicList}
            width="0"
            height="0"
            controls="true"
            playing={config.playing}
            played={config.played}
            loaded={config.loaded}
            duration={config.duration}
            playbackRate={config.playbackRate}
            onProgress={handleProgress}
            onDuration={handleDuration}
            onEnded={handleEnded}
            config={{
              file: {
                forceAudio: true
              }
            }}
          />

          <div className="podcast-cover">
            <img src={playlist[0].image} alt="" />
          </div>
          <div className="podcast-duration">
            <small>{secondsToMinutes(config.playedSeconds)}</small>
            <small>{secondsToMinutes(config.duration)}</small>
          </div>
          <CustomInput
            type="range"
            min={0}
            max={0.999999}
            step="any"
            value={config.played}
            onMouseDown={handleSeekMouseDown}
            onChange={handleSeekChange}
            onMouseUp={handleSeekMouseUp}
          />

          <div className="controls">
            <button
              className="btn-reset controls-button"
              onClick={() => handleControl('backward')}
            >
              <img
                src={backwardSVG}
                alt="backward"
                style={{ transform: 'scale(0.8)' }}
              />
            </button>
            <button
              className="btn-reset controls-button"
              onClick={() => handleControl('playpause')}
            >
              <img
                src={config.playing ? pauseSVG : playSVG}
                alt="play and pause"
              />
            </button>
            <button
              className="btn-reset controls-button"
              disabled={playlist.length < 2}
              onClick={() => handleControl('next')}
            >
              <img src={skipSVG} alt="skip" />
            </button>
            <button
              className="btn-reset controls-button"
              onClick={() => handleControl('forward')}
            >
              <img
                src={forwardSVG}
                alt="forward"
                style={{ transform: 'scale(0.8)' }}
              />
            </button>
          </div>

          <ListWrapper>
            <h3 className="text-center">
              Playlist
              <small>
                <button
                  disabled={playlist.length < 1}
                  className="btn-reset btn-with-icon"
                  onClick={() => {
                    handleControl('clear');
                  }}
                >
                  <img src={deleteSVG} alt="" />
                  Clear
                </button>
              </small>
            </h3>
            {playlist &&
              playlist.map((i, index) => {
                return (
                  <List
                    className={clsx({
                      playing: index === 0 && config.playing
                    })}
                    key={i.pubDate}
                    onClick={(e) => handlePutTopPlaylist(e)}
                    data-index={index}
                  >
                    {/* {index === 0 && config.playing ? (
                      <img className="animate-icon" src={playingGif} alt="" />
                    ) : (
                      ''
                    )} */}
                    <div className="text">
                      <h5>{i.host}</h5>
                      <p style={{ margin: '0' }}>{i.title}</p>
                      {/* <div className="duration"> */}
                      <small>
                        {secondsToMinutes(i.duration)} ·{' '}
                        {dayjs(i.pubDate).format('DD MMMM YYYY')}
                      </small>
                      {/* </div> */}
                    </div>
                  </List>
                );
              })}
          </ListWrapper>
        </>
      ) : (
        <>
          <div className="podcast-cover"></div>
          <div className="podcast-duration">
            <small>00:00</small>
            <small>00:00</small>
          </div>
          <CustomInput
            type="range"
            min={0}
            max={0.999999}
            step="any"
            value="0"
          />
          <div className="controls">
            <button className="btn-reset controls-button" disabled>
              <img
                src={backwardSVG}
                alt="backward"
                style={{ transform: 'scale(0.8)' }}
              />
            </button>
            <button className="btn-reset controls-button" disabled>
              <img src={pauseSVG} alt="play and pause" />
            </button>
            <button className="btn-reset controls-button" disabled>
              <img src={skipSVG} alt="skip" />
            </button>
            <button className="btn-reset controls-button" disabled>
              <img
                src={forwardSVG}
                alt="forward"
                style={{ transform: 'scale(0.8)' }}
              />
            </button>
          </div>
          <ListWrapper>
            <h3 className="text-center">
              Playlist
              <small>
                <button className="btn-reset btn-with-icon" disabled>
                  <img src={deleteSVG} alt="" />
                  Clear
                </button>
              </small>
            </h3>
          </ListWrapper>{' '}
          <p className="text-center">Please Add Podcasts into Playlist</p>
        </>
      )}
      <hr />

      {/*  */}
    </Wrapper>
  );
};

export default Player;
