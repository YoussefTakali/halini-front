import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Components
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

// Directives
import { HighlightDirective } from './directives/highlight.directive';
import { ClickOutsideDirective } from './directives/click-outside.directive';

// Pipes
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    ConfirmDialogComponent,
    HighlightDirective,
    ClickOutsideDirective,
    CapitalizePipe,
    TruncatePipe,
    TimeAgoPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    LoadingSpinnerComponent,
    ConfirmDialogComponent,
    HighlightDirective,
    ClickOutsideDirective,
    CapitalizePipe,
    TruncatePipe,
    TimeAgoPipe
  ]
})
export class SharedModule { }
