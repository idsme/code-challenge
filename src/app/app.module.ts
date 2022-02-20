import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import { StraigtForwardSolutionChallengeComponent } from './straigt-forward-solution-challenge3/straigt-forward-solution-challenge.component';
import { RxjsSolutionBasicChallengeComponent } from './rxjs-solution-basic-challenge/rxjs-solution-basic-challenge.component';
import { RxjsSolutionAdvancedChallenge3Component } from './rxjs-solution-advanced-challenge3/rxjs-solution-advanced-challenge3.component';
import {
    StraigtForwardSolutionChallenge3ComponentReactiveForm
} from './straigt-forward-solution-challenge3_reactive/straigt-forward-solution-challenge3-component-reactive.component';

@NgModule({
    declarations: [AppComponent, StraigtForwardSolutionChallengeComponent, StraigtForwardSolutionChallengeComponent, RxjsSolutionBasicChallengeComponent, RxjsSolutionAdvancedChallenge3Component, StraigtForwardSolutionChallenge3ComponentReactiveForm],
    imports: [BrowserModule, CommonModule, AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
