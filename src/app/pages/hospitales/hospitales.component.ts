import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from 'src/app/services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
declare var swal: any;
@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {


  hospitales: Hospital[] = [];

  constructor(public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService) { }

  ngOnInit() {

    this.cargarHospitales();

    this._modalUploadService.notificacion.subscribe(() => this.cargarHospitales());

  }

  cargarHospitales() {
      this._hospitalService.cargarHospitales()
      .subscribe(hospitales => this.hospitales = hospitales);
  }

  buscarHospital(termino: string) {

    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }

    this._hospitalService.buscarHopital(termino)
    .subscribe(hospitales => this.hospitales = hospitales);
  }

  guardarHospital(hospital: Hospital) {
      this._hospitalService.actualizarHospital(hospital)
        .subscribe();
  }

  borrarHospital(hospital: Hospital) {

    swal({
      title: 'Esta seguro',
      text: 'Esta Apunto de borrar a ' + hospital.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then(borrar => {


      if (borrar) {

      this._hospitalService.borrarHospital(hospital._id)
      .subscribe(() => this.cargarHospitales() );

    }

  });

  }
  crearHospital() {
    swal({
      title: 'Crear hospital',
      text: 'Ingrese Nombre del hospital',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    }).then((valor: string) => {
      if (!valor || valor.length === 0) {
        return;
      }

      this._hospitalService.crearHopital(valor)
      .subscribe(() => this.cargarHospitales());

    });
  }

  actualizarImagen(hospital: Hospital) {
    this._modalUploadService.mostarModal('hospitales', hospital._id);
  }

}
