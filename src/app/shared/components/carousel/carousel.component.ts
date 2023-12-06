import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgbCarouselConfig, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { Pelicula } from '../../../dashboard/interfaces/peliculas.interface';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [
    CommonModule,
    NgbCarouselModule
  ],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgbCarouselConfig]
})
export class CarouselComponent {
  @Input() peliculas?: Pelicula[];

  constructor(config: NgbCarouselConfig) {
    config.wrap = true;
    config.showNavigationIndicators = false;
  }

}
