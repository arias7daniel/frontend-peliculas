import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Actor, Genero, Pelicula } from '../../../../dashboard/interfaces/peliculas.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PeliculaService } from '../../../../services/pelicula.service';
import { delay, switchMap } from 'rxjs';

@Component({
  selector: 'app-edit-pelicula',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-pelicula.component.html',
  styleUrl: './edit-pelicula.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export default class EditPeliculaComponent implements OnInit {
  public generos?: Genero[] = [];
  public actores?: Actor[] = [];
  public invalido: 'nada' | 'incompleto' | 'guardar' = 'nada';
  public datosSeleccion: string[] = ['si', 'no'];
  public generosSeleccionados: Genero[] = [];
  public actoresSeleccionados: Actor[] = [];
  public pelicula?: Pelicula;

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

  constructor(
    private peliculaService: PeliculaService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.peliculaService.obtenerPelicula(id))
      ).subscribe(pelicula => {
        if (!pelicula) return this.router.navigate(['/admin/peliculas']);
        this.pelicula = pelicula;
        this.pelicula.fechaEstreno = this.fechaFormato();
        this.myForm.reset(this.pelicula);
        if (this.pelicula.enCines) {
          this.myForm.setValue({
            ...this.myForm.value,
            enCines: 'si'
          })
        } else {
          this.myForm.setValue({
            ...this.myForm.value,
            enCines: 'no'
          })
        }
        return;
      });

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.peliculaService.obtenerActoresPorPeliculaById(id))
      ).subscribe(resp => {
        this.actoresSeleccionados = resp;
        this.myForm.setValue({
          ...this.myForm.value,
          actores: this.actoresSeleccionados
        })
      });

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.peliculaService.obtenerGenerosPorPeliculaById(id))
      ).subscribe(resp => {
        this.generosSeleccionados = resp;
        this.myForm.setValue({
          ...this.myForm.value,
          generos: this.generosSeleccionados
        });

      });

    this.peliculaService.obtenerActores().subscribe(resp => {
      this.actores = resp;
    });

    this.peliculaService.obtenerGeneros().subscribe(resp => {
      this.generos = resp;
    });


  }

  get nuevaPelicula(): Pelicula {
    const peliNueva = this.myForm.value as Pelicula;
    return peliNueva;
  }

  seleccionActores(actor: Actor): boolean {
    const actorEstaSeleccionado = this.actoresSeleccionados.some(a => a._id === actor._id);
    return actorEstaSeleccionado;
  }

  seleccionGeneros(genero: Genero): boolean {
    const generoEstaSeleccionado = this.generosSeleccionados.some(a => a._id === genero._id);
    return generoEstaSeleccionado;
  }

  verificarGeneros(genero: Genero) {
    const indice = this.generosSeleccionados.findIndex(a => a._id == genero._id);
    if (indice === -1) {
      this.generosSeleccionados.push(genero);
    } else {
      this.generosSeleccionados.splice(indice!, 1);
    }
  }

  verificarActores(actor: Actor) {
    const indice = this.actoresSeleccionados.findIndex(a => a._id == actor._id);
    if (indice === -1) {
      this.actoresSeleccionados.push(actor);
    } else {
      this.actoresSeleccionados.splice(indice!, 1);
    }
  }

  fechaFormato(): string {
    const fecha = new Date(this.pelicula!.fechaEstreno);
    let year = fecha.getUTCFullYear();
    let month = ("0" + (fecha.getUTCMonth() + 1)).slice(-2);
    let day = ("0" + fecha.getUTCDate()).slice(-2);
    return `${year}-${month}-${day}`;
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

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.peliculaService.actualizarPelicula(id, this.nuevaPelicula))
      ).subscribe(() => {
        this.router.navigate(['/admin/peliculas']);
      });
  }
}
