import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of, switchMap, tap } from 'rxjs';
import { Api, Genero } from '../dashboard/interfaces/peliculas.interface';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {
  private http = inject(HttpClient);
  protected apiUrl: string = 'https://api-rest-peliculas-git-master-ariasdaniel7.vercel.app';
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

  public obtenerGeneros(): Observable<Genero[]> {
    return this.obtenerToken().pipe(
      switchMap(() => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
        return this.http.get<Genero[]>(`${this.apiUrl}/api/generos`, { headers });
      })
    );
  }

  public obtenerGenero(id: string): Observable<Genero | undefined> {
    return this.obtenerToken().pipe(
      switchMap(() => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
        return this.http.get<Genero>(`${this.apiUrl}/api/generos/${id}`, { headers }).pipe(
          catchError(error => of(undefined))
        );
      })
    );
  }

  public eliminarGenero(id: string): Observable<boolean> {
    return this.obtenerToken().pipe(
      switchMap(() => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
        return this.http.delete(`${this.apiUrl}/api/generos/eliminar/${id}`, { headers })
          .pipe(
            map(resp => true),
            catchError(err => of(false))
          );
      })
    );
  }

  public crearGenero(genero: Genero): Observable<Genero> {
    return this.obtenerToken().pipe(
      switchMap(() => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
        return this.http.post<Genero>(`${this.apiUrl}/api/generos/crear`, genero, { headers })
      })
    );
  }

  public actualizarGenero(id: string, genero: Genero): Observable<Genero> {
    return this.obtenerToken().pipe(
      switchMap(() => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
        return this.http.put<Genero>(`${this.apiUrl}/api/generos/actualizar/${id}`, genero, { headers })
      })
    );
  }
}
