import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GeneroService } from '../../../../services/genero.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Genero } from '../../../../dashboard/interfaces/peliculas.interface';
import { delay, switchMap } from 'rxjs';

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
  public valido: Validar = 'nada';
  public titulo: string = 'Editar Genero';
  public textoBtn: string = 'Editar';
  public genero?: Genero;

  public myForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
  });

  constructor(
    private generoService: GeneroService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  get nuevoGenero(): Genero {
    const generoNuevo = this.myForm.value as Genero;
    return generoNuevo;
  }

  ngOnInit(): void {
    if (!this.router.url.includes('editar')) {
      this.titulo = 'Crear Genero';
      this.textoBtn = 'Crear';
      return;
    }

    this.activatedRoute.params.pipe(
      switchMap(({ id }) => this.generoService.obtenerGenero(id))
    ).subscribe(resp => {
      this.genero = resp;
      this.myForm.reset(resp);
    })
  }

  onSave(): void {
    if (this.myForm.invalid) {
      this.valido = 'invalido';
      return;
    }

    if (this.genero) {
      this.valido = 'editado';
      this.activatedRoute.params
        .pipe(
          switchMap(({ id }) => this.generoService.actualizarGenero(id, this.nuevoGenero)),
          delay(2000)
        ).subscribe(() => {
          this.router.navigate(['/admin/generos']);
        });
    } else {
      this.valido = 'completado';
      this.generoService.crearGenero(this.nuevoGenero).pipe(
        delay(2000)
      ).subscribe(() => {
        this.router.navigate(['/admin/generos']);
      });
    }
  }
}
