import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablishmentAddComponent } from './establishment-add.component';

describe('EstablishmentAddComponent', () => {
  let component: EstablishmentAddComponent;
  let fixture: ComponentFixture<EstablishmentAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstablishmentAddComponent],
    });
    fixture = TestBed.createComponent(EstablishmentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
