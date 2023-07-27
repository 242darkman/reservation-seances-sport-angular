import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Establishment } from '@/app/establishment/domain/establishment';
import { MatDialog } from '@angular/material/dialog';
import { EstablishmentAddComponent } from '@/app/establishment/vue/components/establishment-add/establishment-add.component'


@Component({
  selector: 'app-establishment-list',
  templateUrl: './establishment-list.component.html',
  styleUrls: ['./establishment-list.component.scss'],
})
export class EstablishmentListComponent {
  constructor(private dialog: MatDialog) {}
  
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

  openAddDialog(): void {
    const dialogRef = this.dialog.open(EstablishmentAddComponent, {
    
    });
    console.log("🚀 ~ file: establishment-list.component.ts:46 ~ EstablishmentListComponent ~ openAddDialog ~ dialogRef:", dialogRef)
  }
}
