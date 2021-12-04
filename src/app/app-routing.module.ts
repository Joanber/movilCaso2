import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },

  {
    path: "inicio",
    loadChildren: "./pages/inicio/inicio.module#InicioPageModule",
  },

  {
    path: "slides",
    loadChildren: "./pages/slides/slides.module#SlidesPageModule",
  },

  {
    path: 'gestion-vinculacion', children: [
      {
        path: 'estado-procesos',
        loadChildren: () =>
          import('./pages/gestion-vinculacion/estado-procesos/estado-procesos.module').then((m) => m.EstadoProcesosPageModule),
      },
      {
        path: 'acreditacion-ppp',
        loadChildren: () =>
          import('./pages/gestion-vinculacion/acreditacion-ppp/acreditacion-ppp.module').then((m) => m.AcreditacionPppPageModule),
      },
      {
        path: 'historial-procesos',
        loadChildren: () =>
          import('./pages/gestion-vinculacion/historial-procesos/historial-procesos.module').then((m) => m.HistorialProcesosPageModule),
      },
    ],
  },

  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
