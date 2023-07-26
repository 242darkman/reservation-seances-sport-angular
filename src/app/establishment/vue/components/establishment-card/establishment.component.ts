import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges, OnInit,
  SimpleChanges,
} from '@angular/core';
import { Establishment } from '../../../domain/establishment';
import {EstablishmentService} from "@/app/establishment/application/services/establishment.service";

@Component({
  selector: 'app-establishment',
  templateUrl: './establishment.component.html',
  styleUrls: ['./establishment.component.scss'],
})
export class EstablishmentComponent implements OnChanges, OnInit {
  @Input() establishment!: Establishment;

  establishmentElt!: Establishment;
  protected readonly Error = Error;

  constructor(private cdr: ChangeDetectorRef, private establishmentService: EstablishmentService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['establishment']) {
      return;
    }
  }

  ngOnInit() {

  }
}
