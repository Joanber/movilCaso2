import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    canActivate: [AuthGuard],
    pathMatch: "full",
  },

  {
    path: "inicio",
    canActivate: [AuthGuard],
    loadChildren: "./pages/inicio/inicio.module#InicioPageModule",
  },

  {
    path: "slides",
    loadChildren: "./pages/slides/slides.module#SlidesPageModule",
  },
  { path: "login", loadChildren: "./pages/login/login.module#LoginPageModule" },

  {
    path: "informacion",
    canActivate: [AuthGuard],
    children: [
      {
        path: "convocatoria",
        loadChildren: () =>
          import("./pages/informacion/convocatoria/convocatoria.module").then(
            (m) => m.ConvocatoriaPageModule
          ),
      },
      {
        path: "info-procesos",
        loadChildren: () =>
          import("./pages/informacion/info-procesos/info-procesos.module").then(
            (m) => m.InfoProcesosPageModule
          ),
      },
      {
        path: "instructivo",
        loadChildren: () =>
          import("./pages/informacion/instructivo/instructivo.module").then(
            (m) => m.InstructivoPageModule
          ),
      },
      {
        path: "info-carrera",
        loadChildren: () =>
          import("./pages/informacion/info-carrera/info-carrera.module").then(
            (m) => m.InfoCarreraPageModule
          ),
      },
      {
        path: "carrera",
        loadChildren: () =>
          import("./pages/informacion/carrera/carrera.module").then(
            (m) => m.CarreraPageModule
          ),
      },
      //{ 
      //  path: 'detalle', 
      //loadChildren:()=>
      //import("./pages/informacion/detalle/detalle.module").then(
        //(m) => m.DetallePageModule
    //  ) },

    ],
  },

  {
    path: "gestion-vinculacion",
    children: [
      {
        path: "estado-procesos",
        loadChildren: () =>
          import(
            "./pages/gestion-vinculacion/estado-procesos/estado-procesos.module"
          ).then((m) => m.EstadoProcesosPageModule),
      },
      {
        path: "acreditacion-ppp",
        loadChildren: () =>
          import(
            "./pages/gestion-vinculacion/acreditacion-ppp/acreditacion-ppp.module"
          ).then((m) => m.AcreditacionPppPageModule),
      },
      {
        path: "historial-procesos",
        loadChildren: () =>
          import(
            "./pages/gestion-vinculacion/historial-procesos/historial-procesos.module"
          ).then((m) => m.HistorialProcesosPageModule),
      },

    ],
  },
  {
    path: "reporte",
    loadChildren:
      "./pages/gestion-vinculacion/reporte/reporte.module#ReportePageModule",
  },
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
