import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameComponent } from './game/game.component';
import { HistoireComponent } from './histoire/histoire.component';
import { PersoComponent } from './perso/perso.component';
import { FilmComponent } from './film/film.component';
import { NotfoundComponent } from './notfound/notfound.component';


const routes: Routes = [
  { path: 'jeu', component: GameComponent },
  { path: 'histoire', component: HistoireComponent },
  { path: 'personnages', component: PersoComponent },
  { path: 'infos', component: FilmComponent },
  { path: '', redirectTo: '/jeu', pathMatch: 'full' },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
