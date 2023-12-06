import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MainComponent } from '../../components/main/main.component';
import { CarouselComponent } from '../../../shared/components/carousel/carousel.component';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [
    CommonModule,
    MainComponent,
    CarouselComponent
  ],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export default class PrincipalComponent {
}
