import { Component, OnInit } from '@angular/core';
import { EstablishmentFacadeService } from '../../application/facade/establishment-face.service';
import { Establishment } from '../../domain/establishment';

@Component({
  selector: 'app-establishment',
  templateUrl: './establishment.component.html',
  styleUrls: ['./establishment.component.scss'],
})
export class EstablishmentComponent implements OnInit {
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
