import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongeDialogs2Component } from './conge-dialogs2.component';

describe('CongeDialogs2Component', () => {
  let component: CongeDialogs2Component;
  let fixture: ComponentFixture<CongeDialogs2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CongeDialogs2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CongeDialogs2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
