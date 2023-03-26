import axios from 'axios';
import podcastFeedParser from 'podcast-feed-parser';

import { genresData, placeholderGenre } from './genres';

const corsURL = 'https://cors-anywhere-4bjy.onrender.com/';

export const SEARCH_LIMIT = 50;

// Search podcasts from iTunes end points
export const fetchItunes = async (string) => {
  const text = string.split(' ').join('+');

  const url = encodeURI(
    `${corsURL}https://itunes.apple.com/search?term=${text}&entity=podcast&limit=${SEARCH_LIMIT}`
  );

  const results = await fetch(url, {
    method: 'GET'
  })
    .then((res) => res.json())
    .then((data) => data.results)
    .catch((err) => console.log(err));

  // get genres icon image url put into object
  return results.map((result) => {
    let genresIcon = result.genres
      .filter((genre) => genresData[genre])
      .map((genre) => genresData[genre])[0];
    if (!genresIcon) {
      genresIcon = { ...placeholderGenre };
    }
    return { ...result, ...genresIcon };
  });
};

// Get XML from feedUrl and parse RSS feed
export const fetchPodcastData = async (feedUrl) => {
  if (!feedUrl) return;

  let url = `${corsURL}${feedUrl}`;

  if (
    feedUrl.endsWith('.xml') ||
    feedUrl.endsWith('rss') ||
    feedUrl.endsWith('podcast')
  ) {
  } else {
    url += `?format=xml`;
  }

  return await axios
    .get(url)
    .then((res) => {
      return parsePodcastData(res.data);
    })
    .catch((err) => {
      console.log(url);
      console.log(err);
    });
};

// Parse XML and return we need
const parsePodcastData = (xml) => {
  const podcast = podcastFeedParser.getPodcastFromFeed(xml),
    podcastDetails = {};

  podcastDetails.description = podcast.meta.description;
  podcastDetails.image = podcast.meta.imageURL;
  podcastDetails.host = podcast.meta.author;
  podcastDetails.title = podcast.meta.title;
  podcastDetails.episodes = podcast.episodes;

  return podcastDetails;
};
