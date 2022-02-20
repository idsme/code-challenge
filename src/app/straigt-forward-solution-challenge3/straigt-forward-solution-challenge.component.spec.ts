import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StraigtForwardSolutionChallengeComponent } from './straigt-forward-solution-challenge.component';

describe('StraigtForwardSolutionChallenge3Component', () => {
  let component: StraigtForwardSolutionChallengeComponent;
  let fixture: ComponentFixture<StraigtForwardSolutionChallengeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StraigtForwardSolutionChallengeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StraigtForwardSolutionChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
