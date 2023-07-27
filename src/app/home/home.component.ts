import { Component } from '@angular/core';
import { ESTABLISHMENTS } from '@/app/establishment/mock/mock-establishment';
import { Establishment } from '@/app/establishment/domain/establishment';

/**
 * Component HomeComponent
 *
 * Ce composant affiche une liste des établissements sur la page d'accueil de l'application.
 * Les établissements sont importés à partir d'un mock et sont de type Establishment.
 *
 * @Component
 */
@Component({
  /**
   * Le sélecteur 'app-home' permet d'insérer ce composant dans une page HTML en utilisant <app-home></app-home>.
   */
  selector: 'app-home',
  /**
   * Chemin vers le fichier HTML qui contient le template pour ce composant.
   */
  templateUrl: './home.component.html',
  /**
   * Chemin vers le fichier CSS qui contient les styles pour ce composant.
   */
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  /**
   * Liste des établissements affichés sur la page d'accueil.
   * Les données sont importées à partir d'un fichier mock.
   */
  establishments: Establishment[] = ESTABLISHMENTS;
}
