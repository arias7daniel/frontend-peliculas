import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Genero } from '../../interfaces/peliculas.interface';
import { PeliculaService } from '../../services/pelicula.service';

@Component({
  selector: 'app-generos',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './generos.component.html',
  styleUrl: './generos.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export default class GenerosComponent implements OnInit {
  public generos?: Genero[];

  constructor(private service: PeliculaService) { }

  ngOnInit(): void {
    this.service.obtenerGeneros().subscribe(resp => {
      this.generos = resp;
    })
  }
}
