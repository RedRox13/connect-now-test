import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RangeSliderComponent } from './components/range-slider/range-slider.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RequiredAsteriskDirective } from './directives/required-asterisk/required-asterisk.directive';


@NgModule({
  declarations: [
    MenuComponent,
    RangeSliderComponent,
    RequiredAsteriskDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,

    // Components
    MenuComponent,
    RangeSliderComponent,

    // Directives
    RequiredAsteriskDirective
  ]
})
export class SharedModule { }
