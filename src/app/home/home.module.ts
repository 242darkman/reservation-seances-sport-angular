import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { HomeComponent } from '@/app/home/home.component';

import { HomeRoutingModule } from '@/app/home/home-routing.module';
import { SessionModule } from '@/app/session/session.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    HomeRoutingModule,
    SessionModule,
  ],
})
export class HomeModule {}
