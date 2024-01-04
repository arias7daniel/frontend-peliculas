import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of, switchMap, tap } from 'rxjs';
import { Actor, Api } from '../dashboard/interfaces/peliculas.interface';

@Injectable({
  providedIn: 'root'
})
export class ActorService {
  private http = inject(HttpClient);
  protected apiUrl: string = 'https://api-rest-git-express-ariasdaniel7.vercel.app';
  protected token: string = '';

  constructor() { }

  private obtenerToken(): Observable<Api | undefined> {
    return this.http.get<Api>(this.apiUrl)
      .pipe(
        tap(api => {
          this.token = api.token || '';
        })
      )
      .pipe(
        catchError(error => of(undefined))
      )
  }

  public obtenerActores(): Observable<Actor[]> {
    return this.obtenerToken().pipe(
      switchMap(() => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
        return this.http.get<Actor[]>(`${this.apiUrl}/api/actores`, { headers });
      })
    );
  }

  public obtenerActor(id: string): Observable<Actor | undefined> {
    return this.obtenerToken().pipe(
      switchMap(() => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
        return this.http.get<Actor>(`${this.apiUrl}/api/actores/${id}`, { headers }).pipe(
          catchError(error => of(undefined))
        );
      })
    );
  }

  public eliminarActor(id: string): Observable<boolean> {
    return this.obtenerToken().pipe(
      switchMap(() => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
        return this.http.delete(`${this.apiUrl}/api/actores/eliminar/${id}`, { headers })
          .pipe(
            map(resp => true),
            catchError(err => of(false))
          );
      })
    );
  }

  public crearActor(actor: Actor): Observable<Actor> {
    return this.obtenerToken().pipe(
      switchMap(() => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
        return this.http.post<Actor>(`${this.apiUrl}/api/actores/crear`, actor, { headers })
      })
    );
  }

  public actualizarActor(id: string, actor: Actor): Observable<Actor> {
    return this.obtenerToken().pipe(
      switchMap(() => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
        return this.http.put<Actor>(`${this.apiUrl}/api/actores/actualizar/${id}`, actor, { headers })
      })
    );
  }
}
