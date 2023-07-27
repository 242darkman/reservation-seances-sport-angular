import { Injectable } from '@angular/core';
import { EstablishmentService } from '../services/establishment.service';
import { Establishment } from '../../domain/establishment';

@Injectable({
  providedIn: 'root',
})
export class EstablishmentFacadeService {
  establishment$ = this.establishmentService.establishment$;
  constructor(private establishmentService: EstablishmentService) {}

  getEstablishments() {
    this.establishmentService.getEstablishments();
  }

  getEstablishment(id: number) {
    const establishment = this.establishmentService.getEstablishment(id);
    return establishment;
  }

  addEstablishment(establishment: Establishment) {
    return this.establishmentService.addEstablishment(establishment);
  }

  updateEstablishment(
    establishment: Establishment,
    callback: (success: boolean) => void
  ) {
    this.establishmentService.updateEstablishment(establishment, callback);
  }

  deleteEstablishment(id: number, callback: (success: boolean) => void) {
    this.establishmentService.deleteEstablishment(id, callback);
  }

  generateId() {
    return this.establishmentService.generateId();
  }
}
