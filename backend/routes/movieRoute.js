import express from 'express';
import { Movie,Genre } from '../models/movieModel.js';

const router = express.Router()

const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTE1MWRkYTBmOGRkZjVjYjY3ZGViYTIzNTYyMmU2NSIsIm5iZiI6MTczMDMwMzAwMS4yNDI5NjY0LCJzdWIiOiI2NzIxYmUwMzBjZDhhMmE1MDNhY2NiYzMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.3R9KEKtWrvPIkmjmKhvQTv_YQs5YnRHBM-r9R8rKRAo'
  }
};

fetch(url, options)
  .then(res => res.json())
  .then(json => for)
  .catch(err => console.error(err));