import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Genero, Pelicula } from '../../../dashboard/interfaces/peliculas.interface';
import { PeliculaService } from '../../../services/pelicula.service';
import { Router, RouterModule } from '@angular/router';
import { NgbHighlight } from '@ng-bootstrap/ng-bootstrap';
import { GeneroService } from '../../../services/genero.service';

@Component({
  selector: 'app-tabla-generos',
  standalone: true,
  imports: [
    CommonModule,
    NgbHighlight,
    RouterModule
  ],
  templateUrl: './tabla-generos.component.html',
  styleUrl: './tabla-generos.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class TablaGenerosComponent implements OnInit {
  public busqueda: string = '';
  public generos: Genero[] = [];
  private copGeneros: Genero[] = [];

  constructor(private generoService: GeneroService, private router: Router) {
  }

  ngOnInit(): void {
    this.generoService.obtenerGeneros().subscribe(resp => {
      this.generos = resp;
      this.copGeneros = resp;
    });
  }

  public onKeyPress(value: string) {
    this.generos = this.buscar(value);
  }

  buscar(text: string): Genero[] {
    if (!text) {
      return this.copGeneros;
    }

    return this.generos.filter((peli) => {
      const term = text.toLowerCase();
      return peli.nombre.toLowerCase().includes(term);
    });
  }

  public eliminarGenero(id: string) {
    this.generoService.eliminarGenero(id).subscribe(() => {
      window.location.reload();
    })
  }
}
