import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'games',
    loadChildren: () => import('./pages/games/games.module').then(
      m => m.GamesModule
    )
  },
  {
    path: 'contact',
    loadChildren: () => import('./pages/contact/contact.module').then(
      m => m.ContactModule
    )
  },
  { path: '', redirectTo: 'games', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
