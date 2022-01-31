/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
const API_KEY = process.env.API_KEY;

// eslint-disable-next-line import/no-anonymous-default-export
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
interface props {
  fetchTreding: { title: string; url: string };
  fetchTopRated: { title: string; url: string };
  fetchActionMovies: { title: string; url: string };
  fetchCommedyMovies: { title: string; url: string };
  fetchHorrorMovies: { title: string; url: string };
  fetchRomanceMovies: { title: string; url: string };
  fetchMystery: { title: string; url: string };
  fetchScifi: { title: string; url: string };
  fetchWestern: { title: string; url: string };
  fetchAnimation: { title: string; url: string };
  fetchTv: { title: string; url: string };
}
export default {
  fetchTreding: {
    title: 'Trending',
    url: `/trending/all/week?api_key=${API_KEY}&language=en_US`,
  },
  fetchTopRated: {
    title: 'Top Rated',
    url: `/movie/top_rated?api_key=${API_KEY}&language=en_US`,
  },
  fetchActionMovies: {
    title: 'Action',
    url: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  },
  fetchCommedyMovies: {
    title: 'Commedy',
    url: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  },
  fetchHorrorMovies: {
    title: 'Horror',
    url: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  },
  fetchRomanceMovies: {
    title: 'Romance',
    url: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  },
  fetchMystery: {
    title: 'Mystery',
    url: `/discover/movie?api_key=${API_KEY}&with_genres=9648`,
  },
  fetchScifi: {
    title: 'Scifi',
    url: `/discover/movie?api_key=${API_KEY}&with_genres=878`,
  },
  fetchWestern: {
    title: 'Western',
    url: `/discover/movie?api_key=${API_KEY}&with_genres=37`,
  },
  fetchAnimation: {
    title: 'Animation',
    url: `/discover/movie?api_key=${API_KEY}&with_genres=16`,
  },
  fetchTv: {
    title: 'TV Movie',
    url: `/discover/movie?api_key=${API_KEY}&with_genres=10770`,
  },
};
