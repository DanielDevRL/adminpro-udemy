import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  url = URL_SERVICIOS;
  totalMedicos: number = 0;

  constructor(public http: HttpClient,
    public _usuarioService: UsuarioService) { }

  cargarMedicos() {
   return this.http.get(this.url + '/medico')
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

}
