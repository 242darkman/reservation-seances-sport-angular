import { Component, OnInit } from '@angular/core';
import { Establishment } from '@/app/establishment/domain/establishment';
import { EstablishmentFacadeService } from '@/app/establishment/application/facade/establishment-facade.service';
import filter from 'lodash/filter';
import get from 'lodash/get';
import { MatDialog } from '@angular/material/dialog';
import { EstablishmentEditComponent } from '@/app/establishment/vue/components/establishment-edit/establishment-edit.component';

@Component({
  selector: 'app-establishment-page',
  templateUrl: './establishment-page.component.html',
  styleUrls: ['./establishment-page.component.scss'],
})
export class EstablishmentPageComponent implements OnInit {
  establishments: Establishment[] = [];
  constructor(
    private establishmentService: EstablishmentFacadeService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getEstablishmens();
  }

  getEstablishmens(): void {
    this.establishmentService
      .getEstablishments()
      .subscribe((establishments: Establishment[]) => {
        this.establishments = establishments;
      });
  }

  addEstablishment(establishment: Establishment) {
    if (!establishment) {
      return;
    }
    this.establishmentService.addEstablishment(establishment).subscribe();
  }

  // updateEstablishment(establishment: Establishment) {
  //   this.establishmentService.updateEstablishment(establishment).subscribe();
  // }

  updateEstablishment(establishment: any): void {
    const dialogRef = this.dialog.open(EstablishmentEditComponent, {
      width: '400px',
      data: { establishment: { ...establishment } }, // Passez une copie de l'établissement à éditer
    });

    dialogRef.afterClosed().subscribe((editedEstablishment: any) => {
      if (editedEstablishment) {
        // Mettez à jour la liste d'établissements avec les modifications
        // Vous pouvez implémenter ici la logique pour mettre à jour la liste avec les modifications
      }
    });
  }

  deleteEstablishment(establishment: Establishment) {
    this.establishments = filter(
      this.establishments,
      (e: Establishment) => e !== establishment
    );
    const id = get(establishment, 'id');
    this.establishmentService.deleteEstablishment(id).subscribe();
  }
}
