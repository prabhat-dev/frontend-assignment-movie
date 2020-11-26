import { Component, OnInit } from '@angular/core';
import {MovieServiceService} from '../../service/movie-service.service'
import {IMovie} from '../../interface/movie'
import {MatTableDataSource} from '@angular/material/table';
import { FormControl, Validators } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  dataSource;
  records = false;
  isMovie = true;
  error: string;
  list: IMovie[];
  displayedColumns: string[] = [ 'select','Title', 'Type', 'Year', 'Poster', 'Watch'];
  selection = new SelectionModel<IMovie>(true, []);
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  constructor(private movieService: MovieServiceService) { }
  title = new FormControl('', [Validators.required]);
  ngOnInit() {
    
  }

  searchMovie() {
    if(this.title.valid) {
      this.movieService.getMovies(this.title.value).subscribe((res:any) => {
        if(!res.Error) {
        this.list = res.Search;
        this.dataSource = new MatTableDataSource(this.list);
        this.records = true;
        this.isMovie = true;
        } else {
          this.isMovie = false;
          this.records = false;
          this.error = res.Error;
        }
      })
    }
    
  }
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: IMovie): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.Title}`;
  }
}
