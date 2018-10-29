import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];

  constructor(public activateRoute: ActivatedRoute,
    public http: HttpClient) {
    activateRoute.params.subscribe(params => {
          let termino = params['termino'];
          this.buscar(termino);
    });
  }

  ngOnInit() {
  }

  buscar(termino: string) {

    let url = URL_SERVICIOS + '/busqueda/todo/' + termino;

    this.http.get(url)
    .subscribe((resp: any) => {

      this.usuarios = resp.usuarios;
      this.medicos = resp.medicos;
      this.hospitales = resp.hospitales;

    });

  }

}
