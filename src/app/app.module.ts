import { AppComponent } from '@/app/app.component';
import { AppRoutingModule } from '@/app/app-routing.module';
import { BookingModule } from './booking/booking.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { EstablishmentModule } from '@/app/establishment/establishment.module';
import { FormsModule } from '@angular/forms';
import { HomeModule } from '@/app/home/home.module';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryDataService } from '@/app/in-memory-data.service';
import { LoginModule } from '@/app/auth/application/login/login.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { RegisterModule } from './auth/application/register/register.module';
import { UserModule } from '@/app/user/user.module';

/**
 * `AppModule` est le module racine de l'application.
 * Il déclare le composant `AppComponent` et importe divers autres modules nécessaires pour le fonctionnement de l'application.
 *
 * @NgModule déclare que cette classe est un module et fournit la métadonnée qui détermine comment compiler et lancer l'application.
 */
@NgModule({
  /**
   * `declarations` est la liste des composants, directives, etc. qui appartiennent à ce module.
   */
  declarations: [AppComponent],
  /**
   * `imports` est la liste des modules dont les composants exportés sont nécessaires pour les templates des composants de ce module.
   */
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
    }),
    UserModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    HomeModule,
    LoginModule,
    RegisterModule,
    BookingModule,
    EstablishmentModule,
  ],
  /**
   * `providers` est la liste des services, valeurs ou autres dépendances que les composants de l'application ont besoin.
   */
  providers: [],
  /**
   * `bootstrap` est la liste des composants qui devraient être amorcés (bootstrap) lorsque ce module est amorcé.
   */
  bootstrap: [AppComponent],
})
/**
 * La classe exportée, `AppModule`, est la classe du module racine.
 * Elle peut être utilisée ailleurs dans l'application pour des importations.
 */
export class AppModule {}
