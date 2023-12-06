import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Actor } from '../../interfaces/peliculas.interface';

@Component({
  selector: 'app-card-actor',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './cardActor.component.html',
  styleUrl: './cardActor.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class CardActorComponent {
  @Input({ required: true })
  public actor!: Actor;
}
