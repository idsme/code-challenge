import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StraigtForwardSolutionChallenge3ComponentReactiveForm } from './straigt-forward-solution-challenge3-component-reactive.component';

describe('StraigtForwardSolutionChallenge3Component', () => {
  let component: StraigtForwardSolutionChallenge3ComponentReactiveForm;
  let fixture: ComponentFixture<StraigtForwardSolutionChallenge3ComponentReactiveForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StraigtForwardSolutionChallenge3ComponentReactiveForm ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StraigtForwardSolutionChallenge3ComponentReactiveForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO IDSME JIRA-XXX1 Add tests here.

});
