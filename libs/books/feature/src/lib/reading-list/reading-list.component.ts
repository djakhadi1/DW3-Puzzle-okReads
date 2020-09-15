import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  getReadingList,
  removeFromReadingList,
  UndoremoveFromReadingList,
  markedAsFinished,
  loadReadingListSuccess,
  init,
} from '@tmo/books/data-access';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss'],
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(private readonly store: Store, private _snackBar: MatSnackBar) {}

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
    const snackBarRef = this._snackBar.open('Removed', 'Undo', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
    snackBarRef.onAction().subscribe(() => {
      this.store.dispatch(UndoremoveFromReadingList({ item }));
    });
    this.store.dispatch(init());
  }

  finishReadingList(item) {
    this.store.dispatch(markedAsFinished({ item }));

    this.store.dispatch(init());
  }
}
