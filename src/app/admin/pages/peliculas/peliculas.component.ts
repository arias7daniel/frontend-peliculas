import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TablaPeliculasComponent } from '../../components/tabla-Peliculas/tabla-Peliculas.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [
    CommonModule,
    TablaPeliculasComponent,
    RouterModule
  ],
  templateUrl: './peliculas.component.html',
  styleUrl: './peliculas.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export default class PeliculasComponent {
}
