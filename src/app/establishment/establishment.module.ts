import { NgModule } from '@angular/core';
import { EstablishmentRouting } from '@/app/establishment/establishment-routing';
import { EstablishmentComponent } from '@/app/establishment/vue/establishment.component';
import { MatCardModule } from '@angular/material/card';
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [EstablishmentComponent],
  imports: [MatCardModule, NgIf, NgOptimizedImage, MatIconModule, MatButtonModule, NgForOf],
  providers: [],
  exports: [EstablishmentComponent],
})
export class EstablishmentModule {}
