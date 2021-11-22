import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap} from 'rxjs/operators';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  
  httpOptions ={
    headers: new HttpHeaders({'Content-Type':'application/json'})

  }

  addHero(hero: Hero): Observable<Hero> {
    return this.httpProperty.post<Hero>(this.heroesUrl,hero,this.httpOptions)
      .pipe(
        tap((newHero:Hero)=>this.log(`added hero with id=${newHero.id}`)),
        catchError(this.handleError<Hero>('addHero'))
      );
  }
  
  updateHero(hero: Hero):Observable<any> {
    return this.httpProperty.put(this.heroesUrl,hero,this.httpOptions)
      .pipe(
        tap(_=>this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
      );
  }

  deleteHero(id: number): Observable<Hero> {
    const url=`${this.heroesUrl}/${id}`;
    return this.httpProperty.delete<Hero>(url,this.httpOptions)
      .pipe(
        tap(_ => this.log(`deleted hero id=${id}`)),
        catchError(this.handleError<Hero>('deleteHero'))
      );
  }


  private heroesUrl ='api/heroes';

  constructor(private httpProperty:HttpClient,private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    /*const heroesObservable = of(HEROES);
    this.messageService.add('HeroService: fetched heroes');
    return heroesObservable;*/
    return this.httpProperty.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes',[]))
      );
  }
  
/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
 private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
  
  getHero(id: number):Observable<Hero> {
    /*const hero=HEROES.find(h=>h.id===id)!;
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero);*/
    const url=`${this.heroesUrl}/${id}`;
    return this.httpProperty.get<Hero>(url)
    .pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))

    );
  }

  private log(message:string){
    this.messageService.add(`HeroService: ${message}`)
  }

}
