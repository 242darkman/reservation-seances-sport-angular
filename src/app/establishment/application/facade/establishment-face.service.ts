import { Injectable } from '@angular/core';
import { EstablishmentService } from '../services/establishment.service';

@Injectable({
  providedIn: 'root',
})
export class EstablishmentFacadeService {
  constructor(private establishmentService: EstablishmentService) {}

  getEstablishments() {
    const establishments = this.establishmentService.getEstablishments();
    return establishments;
  }
}
