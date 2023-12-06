export interface Api {
  message: string;
  urls: string[];
  token: string;
}

export interface Pelicula {
  _id:          string;
  nombre:       string;
  descripcion:  string;
  imagen:       string;
  fechaEstreno: string;
  taquilla:     number;
  enCines:      boolean;
  trailer:      string;
  poster:       string;
  generos:      Actore[];
  actores:      Actore[];
}

export interface Actore {
  _id:  string;
  _url: string;
}

export interface Genero {
  _id:    string;
  nombre: string;
}

export interface Actor {
  _id:             string;
  nombre:          string;
  fechaNacimiento: string;
  foto:            string;
  biografia:       string;
}
