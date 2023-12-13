import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TablaActoresComponent } from '../../components/tabla-actores/tabla-actores.component';

@Component({
  selector: 'app-actores',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TablaActoresComponent
  ],
  templateUrl: './actores.component.html',
  styleUrl: './actores.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export default class ActoresComponent { }
