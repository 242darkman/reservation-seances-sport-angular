import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Establishment } from '../../../domain/establishment';

@Component({
  selector: 'app-establishment-list',
  templateUrl: './establishment-list.component.html',
  styleUrls: ['./establishment-list.component.scss'],
})
export class EstablishmentListComponent {
  @Input() establishments: Establishment[] = [];
  @Output() add = new EventEmitter<Establishment>();
  @Output() update = new EventEmitter<Establishment>();
  @Output() delete = new EventEmitter<Establishment>();

  displayedColumns: string[] = [
    'nom',
    'address',
    'opening',
    'close',
    'phoneNumber',
    'imgUrl',
    'action',
  ];

  onAdd() {
    this.add.emit();
  }

  onUpdate(establishment: Establishment) {
    this.update.emit(establishment);
  }

  onDelete(establishment: Establishment) {
    this.delete.emit(establishment);
  }
}
