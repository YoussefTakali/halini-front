import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective {
  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event.target'])
  public onClick(target: HTMLElement): void {
    const clickedInside = this.elementRef.nativeElement.contains(target);
    if (!clickedInside) {
      // Emit custom event that components can listen to
      const event = new CustomEvent('clickOutside');
      this.elementRef.nativeElement.dispatchEvent(event);
    }
  }
}
