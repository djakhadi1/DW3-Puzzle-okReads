import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  ReadingListBook,
  searchBooks,
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book } from '@tmo/shared/models';
import { Observable, Subject } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';


@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss'],
})
export class BookSearchComponent implements OnInit, OnDestroy {
  books: Observable<ReadingListBook[]>;
  searchTextChanged = new Subject<string>();

  searchForm = this.fb.group({
    term: '',
  });

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder
  ) { }

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit(): void {
    this.books = this.store.select(getAllBooks);
    this.searchTextChanged
      .pipe(debounceTime(500), filter(res => res.length > 2), distinctUntilChanged())
      .subscribe((searchstring) => {
        this.setSearchText(searchstring);
      });
  }

  formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
  }

  setSearchText(searchstring) {
    this.searchForm.controls.term.setValue(searchstring);
  }

  searchBooks() {
    if (this.searchForm.value.term) {
      this.store.dispatch(searchBooks({ term: this.searchTerm }));
    } else {
      this.store.dispatch(clearSearch());
    }
  }
  ngOnDestroy() {
    if (this.books) {
      this.store.dispatch(clearSearch());
    }
  }

  autoSearch(searchCriteria: any) {
    this.searchTextChanged.next(searchCriteria.target.value);
  }
}
