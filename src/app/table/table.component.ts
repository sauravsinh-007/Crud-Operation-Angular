import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() data: any[] = []
  @Output() isFromTrue: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() editFromData: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _Dataservice: DataService) {

  }

  onEdit(item: any): void {
    console.log('Edit:', item);
    this.isFromTrue.emit(true);
    this.editFromData.emit(item);
  }

  onDelete(item: any): void {
    if (confirm('Are you sure you want to delete this item?')) {
      console.log('Delete:', item);
      this._Dataservice.deleteUser(item._id).subscribe({
        next: () => {
          console.log('user deleted successfully')
          this.data = this.data.filter(i => i._id !== item._id);
        },
        error(err) {
          console.log('err', err)

        },
      })
    }
  }
}