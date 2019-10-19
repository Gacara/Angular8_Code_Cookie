import { Component, OnInit, Output } from '@angular/core';
import indices from '../indices.json';
import { CookieService } from 'ngx-cookie-service';
import { trigger, state, style, transition, animate, stagger } from '@angular/animations';
import { delay } from 'q';

interface Indice {
  id: number;
  code: string;
  solution: string;
  image: string;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('simpleFadeAnimation', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({opacity: 1, background: "none", transform: 'translateY(0)'})),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({opacity: 0, background: "red", transform: 'translateY(-50%)'}),
        animate(600)
      ]), 

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate(600, style({opacity: 0})))
    ])
  ]
})
export class GameComponent implements OnInit {

  constructor(private cookieService: CookieService) { }

  debloque: any = [];

  inputcode: any = '';

  indices: Indice[] = indices;
  ngOnInit() {
    if (this.getCoockie() != null){
      this.debloque = this.getCoockie();
    }
  }
  
  

  setCoockie(){
    this.cookieService.set("tab",JSON.stringify(this.debloque));
  }
  getCoockie(){
    this.debloque = (JSON.parse(this.cookieService.get('tab')));
  }
  deleteCoockie(){
    this.cookieService.delete("tab");
  }

  searchIndice(code) {
    for (var i = 0; i < indices.length; i++) {
      if (code == indices[i].code) {
        this.searchDebloque(i);
      }
    }
  }

  searchDebloque(i) {
    let counter = 0;
    for (var j = 0; j < this.debloque.length; j++) {
      if (JSON.stringify(indices[i]) == JSON.stringify(this.debloque[j])) {
        counter++;
      }
    }
    if (counter == 0) {
      this.debloque.push(indices[i]);
      this.setCoockie();
    }
  }
}