import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  UndoAddToReadingList,
  clearSearch,
  getAllBooks,
  ReadingListBook,
  UndoremoveFromReadingList,
  searchBooks,
  init,
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book } from '@tmo/shared/models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss'],
})
export class BookSearchComponent implements OnInit, OnDestroy {
  books: any;

  searchForm = this.fb.group({
    term: '',
  });

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit(): void {
    this.books = this.store.select(getAllBooks);
  }

  formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
    const snackBarRef = this._snackBar.open('Added', 'Undo', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
    snackBarRef.onAction().subscribe(() => {
      this.store.dispatch(UndoAddToReadingList({ book }));
    });
    this.store.dispatch(init());
  }

  searchExample() {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks();
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
      this.books.unsubscribe();
      this.store.dispatch(clearSearch());
    }
  }
}
