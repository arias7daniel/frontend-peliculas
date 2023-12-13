import { Actor, Genero, Pelicula } from './../../interfaces/peliculas.interface';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
import { PeliculaService } from '../../../services/pelicula.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class CardComponent implements OnInit {
  @Input({ required: true })
  public peli!: Pelicula;
  public actores!: Actor[];
  public generos!: Genero[];
  private peliculaService = inject(PeliculaService);

  constructor() {
  }

  ngOnInit(): void {
    this.peliculaService.obtenerActoresPorPelicula(this.peli).subscribe(resp => {
      this.actores = resp;
    });

    this.peliculaService.obtenerGenerosPorPelicula(this.peli).subscribe(resp => {
      this.generos = resp;
    });
  }
}
