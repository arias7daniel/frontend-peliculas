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
        children: [
          {
            path: 'crear',
            loadComponent: () => import('./admin/pages/peliculas/crear-pelicula/crear-pelicula.component'),
          },
          {
            path: 'editar/:id',
            loadComponent: () => import('./admin/pages/peliculas/edit-pelicula/edit-pelicula.component'),
          },
          {
            path: '',
            loadComponent: () => import('./admin/pages/peliculas/peliculas.component'),
            pathMatch: 'full',
          },
        ],
      },
      {
        path: 'generos',
        title: 'Generos',
        children: [
          {
            path: 'crear',
            loadComponent: () => import('./admin/pages/generos/crear/crear.component'),
          },
          {
            path: 'editar/:id',
            loadComponent: () => import('./admin/pages/generos/crear/crear.component'),
          },
          {
            path: '',
            loadComponent: () => import('./admin/pages/generos/generos.component'),
            pathMatch: 'full',
          },
        ],
      },
      {
        path: 'actores',
        title: 'Actores',
        children: [
          {
            path: 'crear',
            loadComponent: () => import('./admin/pages/actores/crear/crear.component'),
          },
          {
            path: 'editar/:id',
            loadComponent: () => import('./admin/pages/actores/crear/crear.component'),
          },
          {
            path: '',
            loadComponent: () => import('./admin/pages/actores/actores.component'),
            pathMatch: 'full',
          },
        ],
      },
      {
        path: '',
        title: 'Admin',
        loadComponent: () => import('./admin/pages/admin/admin.component'),
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
