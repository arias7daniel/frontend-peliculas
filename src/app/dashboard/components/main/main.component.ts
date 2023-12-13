import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { PeliculaService } from '../../../services/pelicula.service';
import { Actor, Genero, Pelicula } from '../../interfaces/peliculas.interface';
import { CarouselComponent } from '../../../shared/components/carousel/carousel.component';
import { CardComponent } from '../card/card.component';
import { CardActorComponent } from '../cardActor/cardActor.component';
import GenerosComponent from '../../pages/generos/generos.component';
import ActoresComponent from '../../pages/actores/actores.component';

@Component({
  selector: 'app-main-principal',
  standalone: true,
  imports: [
    CommonModule,
    CarouselComponent,
    CardComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class MainComponent implements OnInit {
  public peliculas?: Pelicula[];
  private service = inject(PeliculaService);

  constructor() {
  }

  ngOnInit(): void {
    this.service.obtenerPeliculas().subscribe(pelis => {
      this.peliculas = pelis;
    });
  }

}
