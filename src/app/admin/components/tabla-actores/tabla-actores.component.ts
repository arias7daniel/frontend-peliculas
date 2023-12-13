import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Actor } from '../../../dashboard/interfaces/peliculas.interface';
import { Router, RouterModule } from '@angular/router';
import { NgbHighlight } from '@ng-bootstrap/ng-bootstrap';
import { ActorService } from '../../../services/actor.service';

@Component({
  selector: 'app-tabla-actores',
  standalone: true,
  imports: [
    CommonModule,
    NgbHighlight,
    RouterModule
  ],
  templateUrl: './tabla-actores.component.html',
  styleUrl: './tabla-actores.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class TablaActoresComponent {
  public busqueda: string = '';
  public actores: Actor[] = [];
  private copActores: Actor[] = [];

  constructor(private actorService: ActorService, private router: Router) {
  }

  ngOnInit(): void {
    this.actorService.obtenerActores().subscribe(resp => {
      this.actores = resp;
      this.copActores = resp;
    });
  }

  public onKeyPress(value: string) {
    this.actores = this.buscar(value);
  }

  buscar(text: string): Actor[] {
    if (!text) {
      return this.copActores;
    }

    return this.actores.filter((peli) => {
      const term = text.toLowerCase();
      return peli.nombre.toLowerCase().includes(term);
    });
  }

  public eliminarActor(id: string) {
    this.actorService.eliminarActor(id).subscribe(() => {
      window.location.reload();
    })
  }
}
