import { Injectable } from '@angular/core';
import { EstablishmentService } from '../services/establishment.service';
import { Establishment } from '../../domain/establishment';

@Injectable({
  providedIn: 'root',
})
export class EstablishmentFacadeService {
  constructor(private establishmentService: EstablishmentService) {}

  getEstablishments() {
    const establishments = this.establishmentService.getEstablishments();
    return establishments;
  }

  getEstablishment(id: number) {
    const establishment = this.establishmentService.getEstablishment(id);
    return establishment;
  }

  addEstablishment(establishment: Establishment) {
    return this.establishmentService.addEstablishment(establishment);
  }

  updateEstablishment(establishment: Establishment) {
    return this.establishmentService.updateEstablishment(establishment);
  }

  deleteEstablishment(id: number) {
    return this.establishmentService.deleteEstablishment(id);
  }

  generateId() {
    return this.establishmentService.generateId();
  }
}
