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
  { path: 'gestion-vinculacion', loadChildren: './pages/gestion-vinculacion/gestion-vinculacion.module#GestionVinculacionPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
