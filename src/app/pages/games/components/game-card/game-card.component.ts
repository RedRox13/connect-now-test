import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { GameData } from '../../../../core/interfaces/game-data.interface';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameCardComponent {
  @Input() game!: GameData;

  public oneDigitRating(): number {
    return Math.floor(this.game.rating / 10);
  }
}
