import { CardActorComponent } from './../../components/cardActor/cardActor.component';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Actor } from '../../interfaces/peliculas.interface';
import { PeliculaService } from '../../services/pelicula.service';

@Component({
  selector: 'app-actores',
  standalone: true,
  imports: [
    CommonModule,
    CardActorComponent
  ],
  templateUrl: './actores.component.html',
  styleUrl: './actores.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export default class ActoresComponent implements OnInit {
  public actores?: Actor[];

  constructor(private service: PeliculaService) { }

  ngOnInit(): void {
    this.service.obtenerActores().subscribe(resp => {
      this.actores = resp;

    });
  }
}
