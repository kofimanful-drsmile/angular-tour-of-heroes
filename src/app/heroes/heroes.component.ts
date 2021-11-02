import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  selectedHero?: Hero; 

  heroesProperty: Hero[] = [];

  constructor(private heroService:HeroService, private messageServiceProperty: MessageService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero:Hero){
    this.selectedHero=hero;
    this.messageServiceProperty.add(`HeroesComponent: Selected hero: ${hero.name} `);
  }

  getHeroes(): void{
    this.heroService.getHeroes().subscribe(heroes=>this.heroesProperty=heroes);
  }

}
