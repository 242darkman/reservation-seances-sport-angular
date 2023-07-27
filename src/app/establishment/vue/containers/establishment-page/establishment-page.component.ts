import { Component, OnInit } from '@angular/core';
import { Establishment } from '@/app/establishment/domain/establishment';
import { EstablishmentFacadeService } from '@/app/establishment/application/facade/establishment-facade.service';

import { MatDialog } from '@angular/material/dialog';
import { EstablishmentEditComponent } from '@/app/establishment/vue/components/establishment-edit/establishment-edit.component';
import get from 'lodash/get';

@Component({
  selector: 'app-establishment-page',
  templateUrl: './establishment-page.component.html',
  styleUrls: ['./establishment-page.component.scss'],
})
export class EstablishmentPageComponent implements OnInit {
  establishments$ = this.establishmentService.establishment$;

  constructor(
    private establishmentService: EstablishmentFacadeService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getEstablishmens();
  }

  getEstablishmens(): void {
    this.establishmentService.getEstablishments();
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

  updateEstablishment(establishment: Establishment): void {
    console.log(
      '🚀 ~ file: establishment-page.component.ts:41 ~ EstablishmentPageComponent ~ updateEstablishment ~ establishment:',
      establishment
    );
    const dialogRef = this.dialog.open(EstablishmentEditComponent, {
      data: { establishment: { ...establishment } },
    });

    dialogRef.afterClosed().subscribe((editedEstablishment: any) => {
      if (editedEstablishment) {
        this.establishmentService.updateEstablishment(
          establishment,
          (success: boolean) => {
            try {
              if (success) {
                console.log(
                  `establishment with id ${establishment.id} updated successfully`
                );
                //this.updateEstablishment;
              } else {
                console.log(
                  `Failed to update establishment with id ${establishment.id}`
                );
              }
            } catch (error) {
              console.error(error);
            }
          }
        );
      }
    });
  }

  // updateEstablishment(establishment: Establishment) {
  //   this.establishmentService.updateEstablishment(
  //     establishment,
  //     (success: boolean) => {
  //       if (success) {
  //         console.log(
  //           `establishment with id ${establishment.id} updated successfully`
  //         );
  //         this.updateEstablishment;
  //       } else {
  //         console.log(
  //           `Failed to update establishment with id ${establishment.id}`
  //         );
  //       }
  //     }
  //   );
  // }

  deleteEstablishment(establishment: Establishment) {
    const id: number = get(establishment, 'id');
    this.establishmentService.deleteEstablishment(id, (success: boolean) => {
      if (success) {
        console.log(`establishment with id ${id} deleted successfully`);
        this.getEstablishmens();
      } else {
        console.log(`Failed to delete establishment with id ${id}`);
      }
    });
  }
}
