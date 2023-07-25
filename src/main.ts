import { AppModule } from './app/app.module';
import { ApplicationRef } from '@angular/core';
import { enableDebugTools } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

/**
 * Ce script démarre l'application Angular en instanciant le module AppModule,
 * puis active les outils de débogage Angular sur la première composante de l'application.
 *
 * @example Pour lancer l'application, appelez simplement ce script à partir de votre fichier `main.ts`.
 *
 * @throws {Error} une exception est levée si le module d'application ne peut pas être démarré.
 */
platformBrowserDynamic()
  .bootstrapModule(AppModule) // Démarrage de l'application avec AppModule.
  .then(module => {
    // Récupération de la référence de l'application et de la première composante.
    const applicationRef = module.injector.get(ApplicationRef);
    const componentRef = applicationRef.components[0];

    // Activation des outils de débogage sur la première composante.
    enableDebugTools(componentRef);
  })
  .catch(err => console.error(err)); // Enregistrement d'une erreur en cas de problème de démarrage.
