import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratsDialogComponent } from './contrats-dialog.component';

describe('ContratsDialogComponent', () => {
  let component: ContratsDialogComponent;
  let fixture: ComponentFixture<ContratsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContratsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
