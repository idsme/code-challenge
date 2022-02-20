import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsSolutionBasicChallengeComponent } from './rxjs-solution-basic-challenge.component';

describe('RxjsSolutionBasicChallengeComponent', () => {
  let component: RxjsSolutionBasicChallengeComponent;
  let fixture: ComponentFixture<RxjsSolutionBasicChallengeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RxjsSolutionBasicChallengeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RxjsSolutionBasicChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
