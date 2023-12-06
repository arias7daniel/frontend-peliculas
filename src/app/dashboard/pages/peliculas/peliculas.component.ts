import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MainComponent } from '../../components/main/main.component';

@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [
    CommonModule,
    MainComponent
  ],
  templateUrl: './peliculas.component.html',
  styleUrl: './peliculas.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export default class PeliculasComponent {

}
