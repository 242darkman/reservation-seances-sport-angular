import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Establishment } from '@/app/establishment/domain/establishment';
import { EstablishmentAddComponent } from '@/app/establishment/vue/components/establishment-add/establishment-add.component';
import { MatDialog } from '@angular/material/dialog';

/**
 * @description Composant de la liste des établissements.
 * Ce composant affiche une liste des établissements et permet l'ajout, la mise à jour et la suppression des établissements.
 *
 * @selector app-establishment-list
 * @component
 */
@Component({
  selector: 'app-establishment-list',
  templateUrl: './establishment-list.component.html',
  styleUrls: ['./establishment-list.component.scss'],
})
export class EstablishmentListComponent {
  /**
   * @description Constructeur du composant.
   *
   * @param dialog Dialogue Material Angular pour afficher le formulaire d'ajout d'établissement.
   */
  constructor(private dialog: MatDialog) {}

  /**
   * @description Établissements à afficher.
   */
  @Input() establishments: Establishment[] = [];
  /**
   * @description Émetteur d'événements pour l'ajout d'un établissement.
   */
  @Output() add = new EventEmitter<Establishment>();
  /**
   * @description Émetteur d'événements pour la mise à jour d'un établissement.
   */
  @Output() update = new EventEmitter<Establishment>();
  /**
   * @description Émetteur d'événements pour la suppression d'un établissement.
   */
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

  /**
   * @description Méthode pour déclencher l'événement d'ajout d'un établissement.
   */
  onAdd() {
    this.add.emit();
  }

  /**
   * @description Méthode pour déclencher l'événement de mise à jour d'un établissement.
   *
   * @param establishment L'établissement à mettre à jour.
   */
  onUpdate(establishment: Establishment) {
    this.update.emit(establishment);
  }

  /**
   * @description Méthode pour déclencher l'événement de suppression d'un établissement.
   *
   * @param establishment L'établissement à supprimer.
   */
  onDelete(establishment: Establishment) {
    this.delete.emit(establishment);
  }

  /**
   * @description Méthode pour ouvrir le dialogue d'ajout d'un établissement.
   */
  openAddDialog(): void {
    this.dialog.open(EstablishmentAddComponent, {});
  }
}
