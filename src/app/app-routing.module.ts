import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "inicio", pathMatch: "full" },
  {
    path: "inicio",
    loadChildren: "./pages/inicio/inicio.module#InicioPageModule",
  },

  {
    path: "slides",
    loadChildren: "./pages/slides/slides.module#SlidesPageModule",
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
