import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
    StraigtForwardSolutionChallengeComponent
} from './straigt-forward-solution-challenge3/straigt-forward-solution-challenge.component';
import {
    RxjsSolutionBasicChallengeComponent
} from './rxjs-solution-basic-challenge/rxjs-solution-basic-challenge.component';
import {
    RxjsSolutionAdvancedChallenge3Component
} from './rxjs-solution-advanced-challenge3/rxjs-solution-advanced-challenge3.component';

const routes: Routes = [
    {path: '', pathMatch: 'full', component: RxjsSolutionAdvancedChallenge3Component},
    {path: 'sfsc', pathMatch: 'full', component: StraigtForwardSolutionChallengeComponent},
    {path: 'rsbc', pathMatch: 'full', component: RxjsSolutionBasicChallengeComponent},
    {path: 'rsac', pathMatch: 'full', component: RxjsSolutionAdvancedChallenge3Component},
    {path: '**', pathMatch: 'full', component: StraigtForwardSolutionChallengeComponent},

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
