import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { Subject, takeUntil } from 'rxjs';
import { FilterFormValue } from '../../../../core/interfaces/filter-form-value.interface';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FilterComponent),
    multi: true
  }],
  animations: [
    trigger('fadeSlideInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0, transform: 'translateY(10px)' })),
      ]),
    ]),
  ]
})
export class FilterComponent implements ControlValueAccessor, OnInit, OnDestroy {
  public filterForm: FormGroup;
  public isScoreInputShown: boolean = false;
  public faArrowUp = faArrowUp;
  public faCaretDown = faCaretDown;
  private _destroy$: Subject<void> = new Subject();
  private _value!: FilterFormValue;

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      name: '',
      score: [[0, 10]],
      isAscending: true,
      orderBy: 'name'
    });
  }

  onChange: Function = () => {}
  onTouch: Function = () => {}

  set value(val: any) {
    this._value = val;
    this.onChange(val);
    this.onTouch(val);
  }

  get value(): FilterFormValue {
    return this._value;
  }

  ngOnInit(): void {
    this.filterForm.valueChanges.pipe(
      takeUntil(this._destroy$)
    ).subscribe((value: FilterFormValue) => {
      this.value = value;
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public clear(): void {
    const defaultValue = {
      name: '',
      score: [0, 10],
      isAscending: true,
      orderBy: 'name'
    }

    this.filterForm.reset(defaultValue);
    this.value = defaultValue;
  }

  public toggleDirection(): void {
    this.filterForm.patchValue({ isAscending: !this.filterForm.value.isAscending });
  }

  public writeValue(value: FilterFormValue) {
    this.value = value;
    this.filterForm.patchValue(value);
  }

  public registerOnTouched(fn: Function) {
    this.onTouch = fn;
  }

  public registerOnChange(fn: Function) {
    this.onChange = fn;
  }
}
