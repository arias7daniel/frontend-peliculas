import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PeliculaService } from '../../../dashboard/services/pelicula.service';
import { Actor, Genero, Pelicula } from '../../../dashboard/interfaces/peliculas.interface';
import { delay } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-pelicula',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './crear-pelicula.component.html',
  styleUrl: './crear-pelicula.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export default class CrearPeliculaComponent implements OnInit {
  public generosApi?: Genero[] = [];
  public actores?: Actor[] = [];
  public invalido: 'nada' | 'incompleto' | 'guardar' = 'nada';
  public datosSeleccion: string[] = ['si', 'no'];
  public generosSeleccionados: Genero[] = [];
  public actoresSeleccionados: Actor[] = [];

  public myForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    descripcion: ['', [Validators.required, Validators.minLength(3)]],
    imagen: ['', [Validators.required, Validators.minLength(3)]],
    fechaEstreno: ['', [Validators.required, Validators.minLength(3)]],
    taquilla: [0, [Validators.required]],
    enCines: ['', [Validators.required]],
    trailer: ['', [Validators.required, Validators.minLength(3)]],
    poster: ['', [Validators.required, Validators.minLength(3)]],
    generos: [this.generosSeleccionados],
    actores: [this.actoresSeleccionados],
  });

  constructor(private peliculaService: PeliculaService, private fb: FormBuilder, private router: Router) {
    this.invalido = 'nada';
  }

  get nuevaPelicula(): Pelicula {
    const peliNueva = this.myForm.value as Pelicula;
    return peliNueva;
  }

  ngOnInit(): void {
    this.peliculaService.obtenerGeneros().subscribe(resp => {
      this.generosApi = resp;
    })

    this.peliculaService.obtenerActores().subscribe(resp => {
      this.actores = resp;
    });
  }

  verificarGeneros(genero: Genero) {
    const pos = this.generosSeleccionados?.indexOf(genero);

    if (pos === -1) {
      this.generosSeleccionados.push(genero);
    } else {
      this.generosSeleccionados.splice(pos!, 1);
    }
  }

  verificarActores(actor: Actor) {
    const pos = this.actoresSeleccionados.indexOf(actor);

    if (pos === -1) {
      this.actoresSeleccionados.push(actor);
    } else {
      this.actoresSeleccionados.splice(pos!, 1);
    }

  }

  onSave(): void {
    if (this.myForm.value.enCines === 'si') {
      this.myForm.value.enCines = true;
    } else {
      this.myForm.value.enCines = false;
    }

    if (this.myForm.invalid) {
      this.invalido = 'incompleto';
      return;
    }

    this.invalido = 'guardar';

    this.peliculaService.agregarPelicula(this.nuevaPelicula).pipe(
      delay(2000)
    ).subscribe(() => {
      this.router.navigate(['/admin/peliculas']);
    });
  }
}
