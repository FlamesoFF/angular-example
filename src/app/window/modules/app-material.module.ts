import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule, MatChipsModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule
} from '@angular/material';


@NgModule({
    exports: [
        MatAutocompleteModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatOptionModule,
        MatTabsModule,
        MatToolbarModule,
        MatSnackBarModule,
        MatCardModule,
        MatTooltipModule,
        MatExpansionModule,
        MatDividerModule,
        MatListModule,
        MatDialogModule,
        MatTableModule,
        MatBadgeModule,
        MatProgressSpinnerModule,
        MatChipsModule
    ]
})
export class AppMaterialModule {
}