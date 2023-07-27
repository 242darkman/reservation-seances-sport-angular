import { Component, EventEmitter, Output } from '@angular/core';
import { TrainingSession } from '@/app/session/domain/session';
import { SessionService } from '@/app/session/application/services/session.service';

export interface FilterPayload {
  [key: string]: string;
  type: string;
  title: string;
  date: string;
}
@Component({
  selector: 'session-filter',
  templateUrl: 'session-filter.component.html',
  styleUrls: ['session-filter.component.scss'],
})
export class SessionFilterComponent {
  @Output() filterChange: EventEmitter<FilterPayload> =
    new EventEmitter<FilterPayload>();

  selectedType = '';
  searchTitle = '';

  sessionTypes: string[] = Object.values(TrainingSession);
  selectedDate!: string;

  constructor(private sessionService: SessionService) {}

  filterSessions(): void {
    const filterData: FilterPayload = {
      type: this.selectedType ?? '',
      title: this.searchTitle,
      date: this.selectedDate ?? '',
    };

    for (const key in filterData) {
      if (filterData[key] !== '') {
        this.sessionService.isFilter = true;
        break;
      } else {
        this.sessionService.isFilter = false;
      }
    }

    this.filterChange.emit(filterData);
  }
}
