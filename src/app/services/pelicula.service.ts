import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Api, Pelicula, Actor, Genero } from '../dashboard/interfaces/peliculas.interface';
import { Observable, catchError, of, tap, switchMap, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {
  private http = inject(HttpClient);
  protected apiUrl: string = 'https://api-rest-git-express-ariasdaniel7.vercel.app';
  protected token: string = '';


  constructor() {
  }

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

  public obtenerPeliculas(): Observable<Pelicula[]> {
    return this.obtenerToken().pipe(
      switchMap(() => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
        return this.http.get<Pelicula[]>(`${this.apiUrl}/api/peliculas`, { headers });
      })
    );
  }

  public obtenerPelicula(id: string): Observable<Pelicula | undefined> {
    return this.obtenerToken().pipe(
      switchMap(() => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
        return this.http.get<Pelicula>(`${this.apiUrl}/api/peliculas/${id}`, { headers }).pipe(
          catchError(error => of(undefined))
        );
      })
    );
  }

  public obtenerActoresPorPelicula(pelicula: Pelicula): Observable<Actor[]> {
    return this.obtenerToken().pipe(
      switchMap(() => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
        return this.http.get<Actor[]>(`${this.apiUrl}/api/peliculas/${pelicula?._id}/actores`, { headers });
      })
    );
  }

  public obtenerActoresPorPeliculaById(id: string): Observable<Actor[]> {
    return this.obtenerToken().pipe(
      switchMap(() => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
        return this.http.get<Actor[]>(`${this.apiUrl}/api/peliculas/${id}/actores`, { headers });
      })
    );
  }

  public obtenerGenerosPorPelicula(pelicula: Pelicula): Observable<Genero[]> {
    return this.obtenerToken().pipe(
      switchMap(() => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
        return this.http.get<Genero[]>(`${this.apiUrl}/api/peliculas/${pelicula?._id}/generos`, { headers });
      })
    );
  }

  public obtenerGenerosPorPeliculaById(id: string): Observable<Genero[]> {
    return this.obtenerToken().pipe(
      switchMap(() => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
        return this.http.get<Genero[]>(`${this.apiUrl}/api/peliculas/${id}/generos`, { headers });
      })
    );
  }

  public obtenerActores(): Observable<Actor[]> {
    return this.obtenerToken().pipe(
      switchMap(() => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
        return this.http.get<Actor[]>(`${this.apiUrl}/api/actores`, { headers });
      })
    );
  }

  public obtenerGeneros(): Observable<Genero[]> {
    return this.obtenerToken().pipe(
      switchMap(() => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
        return this.http.get<Genero[]>(`${this.apiUrl}/api/generos`, { headers });
      })
    );
  }

  public eliminarPelicula(id: string): Observable<boolean> {
    return this.obtenerToken().pipe(
      switchMap(() => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
        return this.http.delete(`${this.apiUrl}/api/peliculas/eliminar/${id}`, { headers })
          .pipe(
            map(resp => true),
            catchError(err => of(false))
          );
      })
    );
  }

  public agregarPelicula(pelicula: Pelicula): Observable<Pelicula> {
    return this.obtenerToken().pipe(
      switchMap(() => {

        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
        return this.http.post<Pelicula>(`${this.apiUrl}/api/peliculas/crear`, pelicula, { headers })
      })
    );
  }

  public actualizarPelicula(id: string, pelicula: Pelicula): Observable<Pelicula> {
    return this.obtenerToken().pipe(
      switchMap(() => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
        return this.http.put<Pelicula>(`${this.apiUrl}/api/peliculas/actualizar/${id}`, pelicula, { headers })
      })
    );
  }
}
