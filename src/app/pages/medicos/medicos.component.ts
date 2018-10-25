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

  constructor(public _medicoService: MedicoService) { }

  ngOnInit() {
    this.cargarMedicos();
  }

cargarMedicos() {
  this._medicoService.cargarMedicos()
    .subscribe(medicos => this.medicos = medicos);
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
