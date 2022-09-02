import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule } from './games-routing.module';
import { GamesComponent } from './games.component';
import { GameCardComponent } from './components/game-card/game-card.component';
import { FilterComponent } from './components/filter/filter.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    GamesComponent,
    GameCardComponent,
    FilterComponent
  ],
  imports: [
    GamesRoutingModule,
    SharedModule
  ]
})
export class GamesModule { }
