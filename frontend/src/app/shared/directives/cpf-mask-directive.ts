import { Directive, HostListener, ElementRef, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appCpfMask]',
  standalone: true,
})
export class CpfMaskDirective {
  private el: ElementRef = inject(ElementRef);
  private ngControl: NgControl = inject(NgControl);

  @HostListener('input', ['$event.target.value'])
  onInput(value: string): void {
    let onlyNumbers = (value ?? '').replace(/\D/g, '').substring(0, 11);

    const part1 = onlyNumbers.substring(0, 3);
    const part2 = onlyNumbers.substring(3, 6);
    const part3 = onlyNumbers.substring(6, 9);
    const part4 = onlyNumbers.substring(9, 11);

    let maskedValue = part1;
    if (part2) maskedValue += `.${part2}`;
    if (part3) maskedValue += `.${part3}`;
    if (part4) maskedValue += `-${part4}`;

    this.ngControl.control?.setValue(maskedValue, { emitEvent: false });
    this.el.nativeElement.value = maskedValue;
  }
}
