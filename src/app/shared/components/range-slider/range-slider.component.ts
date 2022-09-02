import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, forwardRef, OnDestroy, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RangeSliderComponent),
    multi: true
  }]
})
export class RangeSliderComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {
  public form: FormGroup;
  private _value: number[] = [];
  private _destroy$: Subject<void> = new Subject();

  @ViewChild('progressRef') progressRef!: ElementRef;

  constructor(private cdr: ChangeDetectorRef, private fb: FormBuilder) {
    this.form = this.fb.group({
      left: 0,
      right: 10
    });
  }

  onChange: Function = () => {}
  onTouch: Function = () => {}

  set value(val: number[]) {
    this._value = val;
    this.onChange(val);
    this.onTouch(val);
  }

  get value(): number[] {
    return this._value;
  }

  ngAfterViewInit() {
    this.drowProgress(this.value);

    this.form.valueChanges.pipe(
      takeUntil(this._destroy$)
    ).subscribe(({left, right}) => {
      if (left > right) {
        this.form.patchValue({left: right, right: left});
      }

      this.value = [left, right];
      this.drowProgress(this.value);
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private drowProgress([leftValue, rightValue]: number[]): void {
    if (!this.progressRef) return;
    const progressDiv: HTMLElement = this.progressRef.nativeElement;

    progressDiv.style.left = `${leftValue * 10}%`;
    progressDiv.style.right = `${100 - (rightValue * 10)}%`;

    this.cdr.markForCheck();
  }

  public writeValue(value: number[]) {
    this.value = value;

    this.form.patchValue({left: value[0], right: value[1]});
    this.drowProgress(value);
  }

  public registerOnTouched(fn: Function) {
    this.onTouch = fn;
  }

  public registerOnChange(fn: Function) {
    this.onChange = fn;
  }
}
