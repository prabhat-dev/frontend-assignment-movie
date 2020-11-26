import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMovie } from '../interface/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {

  constructor(private http: HttpClient) { }

  getMovies(title) {
    const apiKey = 'Your key';
    return this.http.get<IMovie[]>(`http://www.omdbapi.com/?apikey=${apiKey}&s=${title}`);
  }
}
