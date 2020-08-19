import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppMaterialModule} from '../../../app-material.module';
import {QuoteComponent} from './components/quotes/section/quote/quote.component';
import {QuotesComponent} from './components/quotes/quotes.component';
import {SectionComponent} from './components/quotes/section/section.component';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PipesModule} from '../../../pipes-module/pipes.module';

@NgModule({
    declarations: [
        // Components
        QuoteComponent,
        SectionComponent,
        QuotesComponent
    ],
    providers: [
    ],
    imports: [
        CommonModule,
        BrowserModule,
        AppMaterialModule,
        BrowserAnimationsModule,
        PipesModule
    ],
    exports: [
        QuotesComponent,
        QuoteComponent
    ],
    entryComponents: [
        QuoteComponent
    ]

})
export class QuotesModule {
}