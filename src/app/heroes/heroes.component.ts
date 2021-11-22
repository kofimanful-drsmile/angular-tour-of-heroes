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


  heroesProperty: Hero[] = [];

  constructor(private heroService:HeroService, private messageServiceProperty: MessageService) { }

  ngOnInit(): void {
    this.getHeroes();
  }


  getHeroes(): void{
    this.heroService.getHeroes().subscribe(heroes=>this.heroesProperty=heroes);
  }

  add(name:string): void{
    name=name.trim();
    if (!name) {return;}
    this.heroService.addHero({ name } as Hero)
      .subscribe(
        hero=>{this.heroesProperty.push(hero)}
      )
  }

  delete(hero:Hero): void{
    this.heroesProperty=this.heroesProperty.filter(h=> h!==hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
  
}
