import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NavController } from "@ionic/angular";
import { Convocatoria } from "src/app/models/convocatoria.model";
import { ConvocatoriaService } from "src/app/services/convocatoria.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-convocatoria",
  templateUrl: "./convocatoria.page.html",
  styleUrls: ["./convocatoria.page.scss"],
})
export class ConvocatoriaPage implements OnInit {
  public convocatoria: Convocatoria[] = [];

  constructor(private convocatoriaService: ConvocatoriaService) {}

  ngOnInit(): void {
    this.getConvocatorias();
  }

  getConvocatorias() {
    this.convocatoriaService.getConvocatorias().subscribe((convocatoria) => {
      this.convocatoria = convocatoria;

      console.log(this.convocatoria);
    });
  }
}
