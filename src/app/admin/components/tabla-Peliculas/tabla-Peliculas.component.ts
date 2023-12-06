import { Pelicula } from './../../../dashboard/interfaces/peliculas.interface';
import { AsyncPipe, CommonModule, DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, PipeTransform } from '@angular/core';
import { PeliculaService } from '../../../dashboard/services/pelicula.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgbHighlight } from '@ng-bootstrap/ng-bootstrap';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-tabla-peliculas',
  standalone: true,
  imports: [
    CommonModule,
    NgbHighlight,
  ],
  templateUrl: './tabla-Peliculas.component.html',
  styleUrl: './tabla-Peliculas.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [DecimalPipe]
})
export class TablaPeliculasComponent implements OnInit {
  public busqueda: string = '';
  public peliculas: Pelicula[] = [];
  private copPeliculas: Pelicula[] = [];

  constructor(private peliculaService: PeliculaService, private router: Router) {
  }

  ngOnInit(): void {
    this.peliculaService.obtenerPeliculas().subscribe(pelis => {
      this.peliculas = pelis;
      this.copPeliculas = this.peliculas;
    });
  }

  public onKeyPress(value: string) {
    this.peliculas = this.buscar(value);
  }

  buscar(text: string): Pelicula[] {
    if (!text) {
      return this.copPeliculas;
    }

    return this.peliculas?.filter((peli) => {
      const term = text.toLowerCase();
      return peli.nombre.toLowerCase().includes(term);
    });
  }

  public eliminarPelicula(id: string) {
    this.peliculaService.eliminarPelicula(id).subscribe(() => {
      window.location.reload();
    })
  }
}
