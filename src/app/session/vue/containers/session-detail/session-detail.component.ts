import { Component, OnInit } from '@angular/core';
import { Session } from '@/app/session/domain/session';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from '@/app/session/application/services/sessionService';
import { parseInt } from 'lodash';

@Component({
  selector: 'session-detail',
  templateUrl: 'session-detail.component.html',
  styleUrls: ['session-detail.component.scss'],
})
export class SessionDetailComponent implements OnInit {
  session!: Session;
  sessionId!: number;

  constructor(private route: ActivatedRoute, public sessionService: SessionService) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.sessionId = parseInt(param['id']);
      this.session = this.sessionService.getSessionById(this.sessionId);
      console.log(this.session);
    });
  }

  onReserve() {}
}
