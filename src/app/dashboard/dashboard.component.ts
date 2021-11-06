import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  heroesProperty: Hero[]=[];
  constructor(private heroServiceProperty: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroServiceProperty.getHeroes().subscribe(heroes=>this.heroesProperty=heroes.slice(1,5));
  }

}
