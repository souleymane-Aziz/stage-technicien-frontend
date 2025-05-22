import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongeDialogComponent } from './conge-dialog.component';

describe('CongeDialogComponent', () => {
  let component: CongeDialogComponent;
  let fixture: ComponentFixture<CongeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CongeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CongeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
