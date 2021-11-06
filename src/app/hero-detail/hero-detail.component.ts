import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  selectedHero: Hero | undefined; 

  constructor(
    private routeProperty:ActivatedRoute, 
    private heroServiceProperty:HeroService, 
    private locationProperty:Location
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void{
    const id=Number(this.routeProperty.snapshot.paramMap.get('id'));
    this.heroServiceProperty.getHero(id).subscribe(hero=>this.selectedHero=hero);
  }

  goBack(): void{
    this.locationProperty.back();
  }

}
