import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/medico/medico.service';
import { Medico } from '../../models/medico.model';
declare var swal: any;
@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  desde: number = 0;
  totalRegistro: number = 0;
  constructor(public _medicoService: MedicoService) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  cambiarDesde(valor: number) {
    let desde = this.desde + valor;
      if (desde >= this.totalRegistro) {
        return;
      }
      if (desde < 0) {
        return;
      }
      this.desde += valor;
      this.cargarMedicos();
  }

cargarMedicos() {
  this._medicoService.cargarMedicos(this.desde)
    .subscribe(medicos => {
       this.medicos = medicos;
       this.totalRegistro = this._medicoService.totalMedicos;
      });
}

buscarMedico(termino: string) {

  if (termino.length <= 0) {
    this.cargarMedicos();
    return;
  }

  this._medicoService.buscarMedico(termino)
  .subscribe(medicos => this.medicos = medicos);
}

editarMedico(medico: Medico) {

}

borrarMedico(medico: Medico) {

  swal({
    title: 'Esta seguro',
    text: 'Esta Apunto de borrar a ' + medico.nombre,
    icon: 'warning',
    buttons: true,
    dangerMode: true,
  })
  .then(borrar => {


    if (borrar) {

    this._medicoService.borrarMedico(medico._id)
    .subscribe(() => this.cargarMedicos() );

  }

});

}

}


