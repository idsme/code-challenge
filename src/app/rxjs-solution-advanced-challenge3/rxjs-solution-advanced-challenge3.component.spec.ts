import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsSolutionAdvancedChallenge3Component } from './rxjs-solution-advanced-challenge3.component';

describe('RxjsSolutionAdvancedChallenge3Component', () => {
  let component: RxjsSolutionAdvancedChallenge3Component;
  let fixture: ComponentFixture<RxjsSolutionAdvancedChallenge3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RxjsSolutionAdvancedChallenge3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RxjsSolutionAdvancedChallenge3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Add Tests... for this components.
});
