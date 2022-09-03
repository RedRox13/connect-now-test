import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, debounceTime, distinctUntilChanged, finalize, map, Observable, startWith, switchMap, tap, shareReplay } from 'rxjs';
import { GameData } from '../../core/interfaces/game-data.interface';
import { GamesApiService } from '../../core/services/games-api/games-api.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GamesComponent {
  public games$: Observable<GameData[]>;
  public loading$ = new BehaviorSubject<boolean>(false);
  public filterController: FormControl = new FormControl({
    name: '',
    score: [0, 10],
    isAscending: true,
    orderBy: 'name'
  });
  private cache$!: Observable<GameData[]>;

  constructor(private gameApi: GamesApiService) {
    if (!this.cache$) {
      this.cache$ = this.gameApi.getGames$().pipe(
        shareReplay(1)
      );
    }

    this.games$ = this.filterController.valueChanges.pipe(
      debounceTime(200),
      startWith(null),
      distinctUntilChanged(),
      tap(() => this.loading$.next(true)),
      switchMap(() =>
      this.cache$.pipe(
          startWith([]),
          finalize(() => this.loading$.next(false))
        )
      ),
      map((games: GameData[]) => {
        const formValue = this.filterController.value;

        return games.filter((game: GameData) => {
          return game.name.trim().toLocaleLowerCase().includes(
            formValue.name.trim().toLocaleLowerCase()
          ) && game.rating >= formValue.score[0] * 10
          && game.rating <= formValue.score[1] * 10;
        });
      }
      ),
      map((games: GameData[]) => {
        let chosenOrder: string = this.filterController.value.orderBy;

        return games.sort((a: GameData, b: GameData) => {
          let result: number = 0;
          const firstValue = a[chosenOrder];
          const secondValue = b[chosenOrder];

          if (typeof firstValue === 'string' && typeof secondValue === 'string') {
            result = firstValue.localeCompare(secondValue);
          } else {
            result = firstValue as number - (secondValue as number);
          }

          return result;
        });
      }),
      map((games: GameData[]) =>
        this.filterController.value.isAscending ? games : games.reverse()
      )
    );
  }

  public trackById = (index: number, item: GameData): number => item.id;
}
