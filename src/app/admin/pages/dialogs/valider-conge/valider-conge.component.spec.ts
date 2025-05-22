import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValiderCongeComponent } from './valider-conge.component';

describe('ValiderCongeComponent', () => {
  let component: ValiderCongeComponent;
  let fixture: ComponentFixture<ValiderCongeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValiderCongeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValiderCongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
