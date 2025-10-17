import { Directive, HostListener, ElementRef, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appCnpjMask]',
  standalone: true,
})
export class CnpjMaskDirective {
  private el: ElementRef = inject(ElementRef);
  private ngControl: NgControl = inject(NgControl);

  @HostListener('input', ['$event.target.value'])
  onInput(value: string): void {
    let onlyNumbers = value.replace(/\D/g, '');
    onlyNumbers = onlyNumbers.substring(0, 14);

    let maskedValue = onlyNumbers;
    if (onlyNumbers.length > 2) {
      maskedValue = `${onlyNumbers.substring(0, 2)}.${onlyNumbers.substring(2)}`;
    }
    if (onlyNumbers.length > 5) {
      maskedValue = `${maskedValue.substring(0, 6)}.${maskedValue.substring(6)}`;
    }
    if (onlyNumbers.length > 8) {
      maskedValue = `${maskedValue.substring(0, 10)}/${maskedValue.substring(10)}`;
    }
    if (onlyNumbers.length > 12) {
      maskedValue = `${maskedValue.substring(0, 15)}-${maskedValue.substring(15)}`;
    }

    this.ngControl.control?.setValue(maskedValue, { emitEvent: false });
    this.el.nativeElement.value = maskedValue;
  }
}