import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  getReadingList,
  removeFromReadingList,
  UndoremoveFromReadingList,
} from '@tmo/books/data-access';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalConstant } from '../../constants';

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
    const snackBarRef = this._snackBar.open(
      GlobalConstant.Removed,
      GlobalConstant.Undo,
      {
        duration: GlobalConstant.FiveThousand,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      }
    );
    snackBarRef.onAction().subscribe(() => {
      this.store.dispatch(UndoremoveFromReadingList({ item }));
    });
  }
}
