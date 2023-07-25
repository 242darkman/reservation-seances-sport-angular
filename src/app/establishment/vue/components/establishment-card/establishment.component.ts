import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Establishment } from '../../../domain/establishment';

@Component({
  selector: 'app-establishment',
  templateUrl: './establishment.component.html',
  styleUrls: ['./establishment.component.scss'],
})
export class EstablishmentComponent implements OnChanges {
  @Input() establishment!: Establishment;

  establishmentElt!: Establishment;
  protected readonly Error = Error;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['establishment']) {
      return;
    }
  }
}
