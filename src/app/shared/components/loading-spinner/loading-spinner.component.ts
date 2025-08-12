import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  template: `
    <div class="spinner-container" [class.overlay]="overlay">
      <div class="spinner" [style.width.px]="size" [style.height.px]="size">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
      </div>
      <p *ngIf="message" class="spinner-message">{{ message }}</p>
    </div>
  `,
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent {
  @Input() size: number = 40;
  @Input() message: string = '';
  @Input() overlay: boolean = false;
}
