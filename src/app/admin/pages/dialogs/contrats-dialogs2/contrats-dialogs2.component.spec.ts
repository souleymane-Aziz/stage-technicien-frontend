import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratsDialogs2Component } from './contrats-dialogs2.component';

describe('ContratsDialogs2Component', () => {
  let component: ContratsDialogs2Component;
  let fixture: ComponentFixture<ContratsDialogs2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContratsDialogs2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratsDialogs2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
