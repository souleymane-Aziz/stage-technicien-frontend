import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprimerCongeDialogsComponent } from './imprimer-conge-dialogs.component';

describe('ImprimerCongeDialogsComponent', () => {
  let component: ImprimerCongeDialogsComponent;
  let fixture: ComponentFixture<ImprimerCongeDialogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImprimerCongeDialogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImprimerCongeDialogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
