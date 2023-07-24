import { Component, EventEmitter, Output } from '@angular/core';
import { TrainingSession } from '@/app/session/domain/session';

@Component({
  selector: 'session-filter',
  templateUrl: 'session-filter.component.html',
  styleUrls: ['session-filter.component.scss'],
})
export class SessionFilterComponent {
  @Output() filterChange = new EventEmitter<{
    type: string;
    title: string;
    date: Date;
  }>();

  selectedType = '';
  searchTitle = '';

  sessionTypes: string[] = Object.values(TrainingSession);

  filterSessions(): void {
    const filterData = {
      type: this.selectedType,
      title: this.searchTitle,
      date: new Date(),
    };

    this.filterChange.emit(filterData);
  }
}
