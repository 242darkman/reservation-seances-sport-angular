import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Session } from '@/app/session/domain/session';
import { SessionService } from '@/app/session/application/services/session.service';
import get from 'lodash/get';
import parseInt from 'lodash/parseInt';

@Component({
  selector: 'session-detail',
  templateUrl: 'session-detail.component.html',
  styleUrls: ['session-detail.component.scss'],
})
export class SessionDetailComponent implements OnInit {
  session!: Session;
  sessionId!: number;
  selectedDays!: string[];
  constructor(private route: ActivatedRoute, public sessionService: SessionService) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      const id: string = get(param, 'id');
      this.sessionId = parseInt(id);
      this.session = this.sessionService.getSessionById(this.sessionId);
    });

    this.selectedDays = [this.session.openingHours[0].dayOfWeek];
  }

  onReserve() {
    return;
  }
}
