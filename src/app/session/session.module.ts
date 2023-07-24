import { NgModule } from '@angular/core';
import { SessionListingPageComponent } from '@/app/session/vue/containers/session-listing-page/session-listing-page.component';
import { SessionComponent } from '@/app/session/vue/components/session/session.component';
import { MatCardModule } from '@angular/material/card';
import { DatePipe, NgClass, NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { SessionFilterComponent } from '@/app/session/vue/components/session-filter/session-filter.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { RouterLink } from '@angular/router';
import { SessionDetailComponent } from '@/app/session/vue/containers/session-detail/session-detail.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [SessionListingPageComponent, SessionComponent, SessionFilterComponent, SessionDetailComponent],
  imports: [
    MatCardModule,
    NgForOf,
    NgClass,
    NgOptimizedImage,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    RouterLink,
    NgIf,
    MatButtonModule,
    DatePipe,
  ],
  providers: [],
  exports: [SessionListingPageComponent],
})
export class SessionModule {}
