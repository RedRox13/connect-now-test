import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[requiredAsterisk]',
})
export class RequiredAsteriskDirective implements OnInit {

  constructor(
    private renderer: Renderer2,
    private elRef: ElementRef,
    private control: NgControl
  ) {}

  ngOnInit() {
    if (this.control.errors?.['required']) {
      const parent = this.renderer.parentNode(this.elRef.nativeElement);

      if (parent.getElementsByTagName('LABEL').length) {
        const label = parent.getElementsByTagName('LABEL')[0];
        const asterisk = this.renderer.createElement('span');

        this.renderer.setAttribute(asterisk, 'class', 'required-asterisk');
        this.renderer.appendChild(label, asterisk);
      }
    }
  }
}
