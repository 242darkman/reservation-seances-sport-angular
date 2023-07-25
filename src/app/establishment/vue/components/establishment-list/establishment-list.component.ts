import { Component, OnInit } from '@angular/core';
import { EstablishmentFacadeService } from '../../../application/facade/establishment-face.service';
import { Establishment } from '../../../domain/establishment';

@Component({
  selector: 'app-establishment',
  templateUrl: './establishment-list.component.html',
  styleUrls: ['./establishment-list.component.scss'],
})
export class EstablishmentListComponent implements OnInit {
  establishments: Establishment[] = [];

  displayedColumns: string[] = ['id', 'nom', 'address', 'opening', 'close'];
  constructor(private EstablishmentFacade: EstablishmentFacadeService) {}

  ngOnInit(): void {
    this.getEstablishmens();
  }

  getEstablishmens(): void {
    this.EstablishmentFacade.getEstablishments().subscribe(
      (establishments: Establishment[]) => {
        this.establishments = establishments;
        console.log(`All establishments => ${this.establishments}`);
      }
    );
  }
}
