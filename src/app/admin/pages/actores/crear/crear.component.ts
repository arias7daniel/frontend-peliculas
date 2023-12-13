import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Actor } from '../../../../dashboard/interfaces/peliculas.interface';
import { delay, switchMap } from 'rxjs';
import { ActorService } from '../../../../services/actor.service';

type Validar = 'invalido' | 'completado' | 'editado' | 'nada';

@Component({
  selector: 'app-crear',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './crear.component.html',
  styleUrl: './crear.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export default class CrearComponent implements OnInit {
  public titulo: string = 'Editar Actor';
  public textoBTN: string = 'Editar';
  public actor?: Actor;
  public valido: Validar = 'nada';

  public myForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    fechaNacimiento: ['', [Validators.required, Validators.minLength(3)]],
    foto: ['', [Validators.required, Validators.minLength(3)]],
    biografia: ['', [Validators.required, Validators.minLength(3)]],
  });

  constructor(
    private actorService: ActorService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

  }

  get nuevoActor(): Actor {
    const actorNuevo = this.myForm.value as Actor;
    return actorNuevo;
  }

  ngOnInit(): void {
    if (!this.router.url.includes('editar')) {
      this.titulo = 'Crear Actor';
      this.textoBTN = 'Crear';
      return;
    }

    this.activatedRoute.params.pipe(
      switchMap(({ id }) => this.actorService.obtenerActor(id))
    ).subscribe(resp => {
      this.actor = resp;
      this.actor!.fechaNacimiento = this.fechaFormato();
      this.myForm.reset(this.actor);
    })
  }

  fechaFormato(): string {
    const fecha = new Date(this.actor!.fechaNacimiento);
    let year = fecha.getUTCFullYear();
    let month = ("0" + (fecha.getUTCMonth() + 1)).slice(-2);
    let day = ("0" + fecha.getUTCDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  onSave(): void {
    if (this.myForm.invalid) {
      this.valido = 'invalido';
      return;
    }

    if (this.actor) {
      this.valido = 'editado';
      this.activatedRoute.params
        .pipe(
          switchMap(({ id }) => this.actorService.actualizarActor(id, this.nuevoActor)),
          delay(2000)
        ).subscribe(() => {
          this.router.navigate(['/admin/actores']);
        });
    } else {
      this.valido = 'completado';
      this.actorService.crearActor(this.nuevoActor).pipe(
        delay(2000)
      ).subscribe(() => {
        this.router.navigate(['/admin/actores']);
      });
    }

  }
}
