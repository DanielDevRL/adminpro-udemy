import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { MedicoService, HospitalService } from 'src/app/services/service.index';
import { Medico } from '../../models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';



@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '' );
  hospital: Hospital = new Hospital('');

  constructor(public _medicoService: MedicoService,
    public _hospitalService: HospitalService,
    public router: Router,
    public activateRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService) {
      activateRoute.params.subscribe(params => {
        let id = params['id'];

        if (id !== 'nuevo') {
          this.cargarMedico(id);
        }

      });
     }

  ngOnInit() {

    this._modalUploadService.notificacion
    .subscribe(resp => {

        console.log(resp);
        this.medico.img = resp.medicoActualizado.img;
    });

    this._hospitalService.cargarHospitales()
    .subscribe(hospitales => this.hospitales = hospitales);

  }

  cambioHospital(id: string) {

    this._hospitalService.obtenerHospital(id)
    .subscribe(hospital => this.hospital = hospital);

  }

  guardarMedico(f: NgForm) {

    if (f.invalid) {
        return;
    }

    this.activateRoute.params.subscribe(params => {
      let id = params['id'];

      if (id === 'nuevo') {

        this._medicoService.guardarMedico(this.medico)
        .subscribe(medico => {
          this.medico._id = medico._id;
        this.router.navigate(['/medico', medico._id]);
          });
      } else {

        this._medicoService.actualizarMedico(this.medico)
        .subscribe();

      }

    });


  }

  cargarMedico(id: string) {
    this._medicoService.obtenerMedico(id)
    .subscribe(medico => {
      console.log(medico);
      this.medico = medico;
      this.medico.hospital = medico.hospital._id;
      this.cambioHospital(this.medico.hospital);
    });
  }

  cambiarFoto() {
      this._modalUploadService.mostarModal('medicos', this.medico._id);
  }


}
