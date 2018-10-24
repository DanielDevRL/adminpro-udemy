import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SubirArchivoService, UsuarioService } from 'src/app/services/service.index';
import { ModalUploadService } from './modal-upload.service';


@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalalUploadComponent implements OnInit {

  usuario: Usuario;

  imagenSubir: File;

  imagenTem: string;


  constructor(public _subirArchivoService: SubirArchivoService,
    public _modalUploadService: ModalUploadService,
    public _usuarioService: UsuarioService) {

   }

  ngOnInit() {
  }


  seleccionImagen(archivo: File) {

    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    if (archivo.type.indexOf('image') < 0) {

      swal('Solo Imagen', 'El archivo seleccionado no es una Imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTem = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTem = reader.result.toString();
  }

  subirImagen() {
      this._subirArchivoService.subirArchivo( this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id )
      .then((res: any) => {

        if (this._modalUploadService.id === this._usuarioService.usuario._id) {

          this._usuarioService.usuario.img = res.usuarioActualizado.img;
          localStorage.setItem('usuario', JSON.stringify(res.usuarioActualizado));
        }
          this._modalUploadService.notificacion.emit( res );
          this.cerrarModal();
      })
      .catch(err => {
        console.log('Error en la Carga... ');
      });
  }

  cerrarModal() {
    this.imagenTem = null;
    this.imagenSubir = null;
    this._modalUploadService.ocultarModal();
  }



}
