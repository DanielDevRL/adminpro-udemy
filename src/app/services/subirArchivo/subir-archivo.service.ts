import { Injectable } from '@angular/core';
import { resolve } from 'url';
import { reject } from 'q';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }


  subirArchivo( archivo: File, tipo: string, id: string) {

    // tslint:disable-next-line:no-shadowed-variable
    return new Promise((resolve, reject) => {

      let fromData = new FormData();
      let xhr = new XMLHttpRequest();

      fromData.append('imagen', archivo, archivo.name);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {

          if (xhr.status === 200) {



            resolve(JSON.parse(xhr.response));

          } else {


            reject(xhr.response);

          }
        }
    };

    let url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;

    xhr.open('PUT', url, true);
    xhr.send(fromData);

    });


}



}
