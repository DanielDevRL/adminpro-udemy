import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

import { Router } from '@angular/router';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any = [];

   url = URL_SERVICIOS;
  constructor(public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService) {

    this.cargarStorage();
  }

  estaLogueado() {
    return(this.token.length > 5) ? true : false;
  }

  cargarStorage() {

    if ( localStorage.getItem('token')) {
        this.token = localStorage.getItem('token');
        this.usuario = JSON.parse(localStorage.getItem('usuario'));
        this.menu = JSON.parse(localStorage.getItem('menu'));

      } else {

      this.token = '';
      this.usuario = null;
      this.menu = [null];
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));
    this.usuario = usuario;
    this.token = token;
    this.menu = menu;

  }

  logout() {
    this.usuario = null;
    this.token = '';
    this.menu = [];

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    this.router.navigate(['/login']);

  }

  loginGoogle(token: string) {

    return this.http.post(this.url + '/login/google', {token})
        .pipe(map((res: any) => {
            this.guardarStorage(res.id, res.token, res.usuario, res.menu);

            return true;
        }));

  }


  login(usuario: Usuario, recordar: boolean = false) {


    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    return this.http.post(this.url + '/login', usuario)
      .pipe(map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
        return true;
      }), catchError( err => {

        swal('Error de inicio de Session', err.error.mensaje, 'error');
        return throwError(err);
      })
      );
  }

  crearUsuario(usuario: Usuario) {

     return this.http.post( this.url + '/usuario', usuario )
       .pipe(map((resp: any) => {

        swal('Usuario creado', usuario.email, 'success');
        return resp.usuario;

       }),
       catchError(err => {

         swal(err.error.mensaje, err.error.errors.message, 'error');
            return throwError(err);
       })
       );
  }

  actualizarUsuario(usuario: Usuario) {

    return this.http.put(this.url + '/usuario/' + usuario._id + '?token=' + this.token, usuario).
        pipe(map((res: any) => {

        if (usuario._id === this.usuario._id) {
          let usuarioDB: Usuario = res.usuarios;

          this.guardarStorage(usuarioDB._id, this.token, usuarioDB, this.menu);
        }

          swal('Usuario Actulizado', usuario.nombre, 'success');

          return true;

        }),
        catchError(err => {

          swal(err.error.mensaje, err.error.errors.message, 'error');
             return throwError(err);
        })
        );

  }

  cambiarImagen(archivo: File, id: string) {
      this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
      .then((res: any) => {

       this.usuario.img = res.usuarioActualizado.img;
       swal('Imangen Actualizada', this.usuario.nombre, 'success');
       this.guardarStorage(id, this.token, this.usuario, this.menu);
      })
      .catch(res => {


      });
    }

    cargarUsuarios( desde: number = 0) {


      return this.http.get(this.url + '/usuario?desde=' + desde);

    }

    buscarUsuario( termino: string ) {

     return this.http.get(this.url + '/busqueda/coleccion/usuarios/' + termino)
     .pipe(map((res: any) => res.usuarios));

    }

    boorarUsuario(id: string) {

        return this.http.delete(this.url + '/usuario/' + id + '?token=' + this.token)
        .pipe(map((resp) => {
            swal('Usuario Borrado', 'Usuario Eliminado Correctamente', 'success');
            return true;
        }));
    }

}
