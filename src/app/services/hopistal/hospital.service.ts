import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Hospital } from '../../models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  totalHospitales: number = 0;

  constructor(public http: HttpClient,
    public _usuarioServive: UsuarioService) { }

  url = URL_SERVICIOS;

  cargarHospitales() {
    return this.http.get(this.url + '/hospital')
      .pipe(map((res: any) => {

        this.totalHospitales = res.conteo;
        return res.hospitales;

      }));
  }

  obtenerHospital(id: string) {
   return this.http.get(this.url + '/hospital/' + id)
    .pipe(map((res: any) => res.hospital));
  }

  borrarHospital(id: string) {
   return this.http.delete(this.url + '/hospital/' + id + '?token=' + this._usuarioServive.token)
    .pipe(map((resp) => {
        swal('Hospital Borrado', 'Eliminado Correctamente', 'success');
    }));
  }

  crearHopital(nombre: string) {
   return this.http.post(this.url + '/hospital?token=' + this._usuarioServive.token, {nombre})
   .pipe(map((resp: any) => {

    swal('Hospital Creado', resp.hospital.nombre + 'Creado Correctamente', 'success');
     return resp.hospital;
    }));
  }

  buscarHopital(termino: string) {
    return this.http.get(this.url + '/busqueda/coleccion/hospitales/' + termino)
    .pipe(map((res: any) => res.hospitales));
  }

  actualizarHospital(hospital: Hospital) {
   return this.http.put(this.url + '/hospital/' + hospital._id + '?token=' + this._usuarioServive.token, hospital)
    .pipe(map((resp: any) => {

      swal('Hospital Actualizado ', hospital.nombre + ' Actualizado Correctamente', 'success');
      return resp.hospital;
      }));
  }

}
