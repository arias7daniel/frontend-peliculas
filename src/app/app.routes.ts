import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dashboard/pages/principal/principal.component'),
    pathMatch: 'full',
  },
  {
    path: 'peliculas',
    loadComponent: () => import('./dashboard/pages/peliculas/peliculas.component'),
    title: 'Peliculas'
  },
  {
    path: 'generos',
    loadComponent: () => import('./dashboard/pages/generos/generos.component'),
    title: 'Generos'
  },
  {
    path: 'actores',
    loadComponent: () => import('./dashboard/pages/actores/actores.component'),
    title: 'Actores'
  },
  {
    path: 'admin',
    children: [
      {
        path: 'peliculas',
        title: 'Peliculas',
        loadComponent: () => import('./admin/pages/admin/admin.component'),
        children: [
          {
            path: 'crear',
            loadComponent: () => import('./admin/pages/crear-pelicula/crear-pelicula.component'),
          },
          {
            path: '',
            loadComponent: () => import('./admin/pages/peliculas/peliculas.component'),
            pathMatch: 'full',
          },
        ],
      },
      {
        path: '**',
        redirectTo: 'peliculas'
      }
    ]
  },
];
