import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AppComponent } from '@/app/app.component';
import { AppRoutingModule } from '@/app/app-routing.module';
import { InMemoryDataService } from '@/app/in-memory-data.service';
import { UserModule } from '@/app/user/user.module';
import { HomeModule } from '@/app/home/home.module';
import { LoginModule } from '@/app/auth/application/login/login.module';
import { RegisterModule } from './auth/application/register/register.module';
import { BookingModule } from './booking/booking.module';
import { EstablishmentModule } from '@/app/establishment/establishment.module';

@NgModule({
  declarations: [AppComponent],
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
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
