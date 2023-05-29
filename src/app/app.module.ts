import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppComponent } from '@/app/app.component';
import { AppRoutingModule } from '@/app/app-routing.module';
import { InMemoryDataService } from '@/app/in-memory-data.service';
import { UserModule } from '@/app/user/user.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false }),
    UserModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
