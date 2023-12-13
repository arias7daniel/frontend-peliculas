import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TablaGenerosComponent } from '../../components/tabla-generos/tabla-generos.component';

@Component({
  selector: 'app-generos',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TablaGenerosComponent
  ],
  templateUrl: './generos.component.html',
  styleUrl: './generos.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export default class GenerosComponent { }
