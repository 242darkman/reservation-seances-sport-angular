import { CommonModule } from '@angular/common';
import { EstablishmentModule } from '../establishment/establishment.module';
import { HomeComponent } from '@/app/home/home.component';
import { HomeRoutingModule } from '@/app/home/home-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NgModule } from '@angular/core';
import { SessionModule } from '@/app/session/session.module';

/**
 * Module HomeModule
 *
 * Ce module fournit le composant Home et les routes associées.
 * Il importe également les modules nécessaires, comme les modules Material pour les composants d'interface utilisateur, et le module HomeRoutingModule pour le routage.
 * Le module SessionModule pour gérer les sessions et le module EstablishmentModule pour gérer les établissements sont également importés.
 *
 * @NgModule
 */
@NgModule({
  /**
   * Les composants déclarés par ce module. Le seul composant est HomeComponent.
   */
  declarations: [HomeComponent],
  /**
   * Les modules importés par ce module. Cela inclut les modules nécessaires pour les composants d'interface utilisateur, le module HomeRoutingModule pour le routage,
   * le module SessionModule pour la gestion des sessions et le module EstablishmentModule pour la gestion des établissements.
   */
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    HomeRoutingModule,
    SessionModule,
    EstablishmentModule,
  ],
})
export class HomeModule {}
