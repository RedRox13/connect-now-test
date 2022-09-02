import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { GameData } from '../../interfaces/game-data.interface';

@Injectable({
  providedIn: 'root'
})
export class GamesApiService {

  constructor(private http: HttpClient) {}

  getGames$(): Observable<GameData[]> {
    return this.http.get<GameData[]>(environment.api);
  }
}
