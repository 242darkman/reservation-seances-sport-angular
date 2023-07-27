import { Component, OnInit } from '@angular/core';

import { Establishment } from '@/app/establishment/domain/establishment';
import { EstablishmentEditComponent } from '@/app/establishment/vue/components/establishment-edit/establishment-edit.component';
import { EstablishmentFacadeService } from '@/app/establishment/application/facade/establishment-facade.service';
import { MatDialog } from '@angular/material/dialog';
import get from 'lodash/get';

/**
 * @description Page principale du module établissement.
 * Cette page contient la logique de gestion des établissements, y compris l'ajout, la modification et la suppression d'établissements.
 *
 * @selector app-establishment-page
 * @component
 */
@Component({
  selector: 'app-establishment-page',
  templateUrl: './establishment-page.component.html',
  styleUrls: ['./establishment-page.component.scss'],
})
export class EstablishmentPageComponent implements OnInit {
  establishments$ = this.establishmentService.establishment$;

  /**
   * @description Constructeur du composant.
   *
   * @param establishmentService Service de façade pour la gestion des établissements.
   * @param dialog Service de dialogue de Material Angular pour afficher les formulaires de modification d'établissement.
   */
  constructor(
    private establishmentService: EstablishmentFacadeService,
    public dialog: MatDialog
  ) {}

  /**
   * @description Méthode ngOnInit du cycle de vie du composant Angular.
   * Récupère la liste des établissements à l'initialisation du composant.
   */
  ngOnInit(): void {
    this.getEstablishmens();
  }

  /**
   * @description Récupère la liste des établissements du service.
   */
  getEstablishmens(): void {
    this.establishmentService.getEstablishments();
  }

  /**
   * @description Ajoute un nouvel établissement.
   *
   * @param establishment L'établissement à ajouter.
   */
  addEstablishment(establishment: Establishment) {
    if (!establishment) {
      return;
    }
    this.establishmentService.addEstablishment(establishment).subscribe();
  }

  /**
   * @description Met à jour un établissement existant.
   * Ouvre un dialogue pour modifier l'établissement et met à jour l'établissement dans le service après la fermeture du dialogue.
   *
   * @param establishment L'établissement à mettre à jour.
   */
  updateEstablishment(establishment: Establishment): void {
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
                return;
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

  /**
   * @description Supprime un établissement existant.
   *
   * @param establishment L'établissement à supprimer.
   */
  deleteEstablishment(establishment: Establishment) {
    const id: number = get(establishment, 'id');
    this.establishmentService.deleteEstablishment(id, (success: boolean) => {
      if (success) {
        this.getEstablishmens();
      } else {
        console.log(`Failed to delete establishment with id ${id}`);
      }
    });
  }
}
