import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from 'src/app/models/medico.model';


@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  url = URL_SERVICIOS;
  totalMedicos: number = 0;

  constructor(public http: HttpClient,
    public _usuarioService: UsuarioService
    ) { }

  cargarMedicos(desde: number = 0) {
   return this.http.get(this.url + '/medico?desde=' + desde)
   .pipe(map((resp: any) => {
        this.totalMedicos = resp.conteo;
        return resp.medicos;
   }));
  }

  buscarMedico(termino: string) {
    return this.http.get(this.url + '/busqueda/coleccion/medicos/' + termino)
    .pipe(map((res: any) => res.medicos));
  }

  borrarMedico(id: string) {
    return this.http.delete(this.url + '/medico/' + id + '?token=' + this._usuarioService.token)
    .pipe(map((resp) => {
        swal('Medico Borrado', 'Eliminado Correctamente', 'success');
    }));
  }

  guardarMedico(medico: Medico) {
     return this.http.post(this.url + '/medico?token=' + this._usuarioService.token, medico)
      .pipe(map((resp: any) => {

        swal('Medico creado', medico.nombre, 'success');
          return resp.medico;
      }));
  }

  obtenerMedico(id: string) {
    return this.http.get(this.url + '/medico/' + id)
    .pipe(map((res: any) => res.medico));
  }

  actualizarMedico(medico: Medico) {
    return this.http.put(this.url + '/medico/' + medico._id + '?token=' + this._usuarioService.token, medico)
     .pipe(map((resp: any) => {

       swal('Medico Actualizado ', medico.nombre + ' Actualizado Correctamente', 'success');
       return resp.medico;
       }));
   }

}
