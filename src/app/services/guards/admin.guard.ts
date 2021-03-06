import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from 'src/app/services/service.index';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(public _usuarioService: UsuarioService,
    public router: Router) {}

  canActivate() {


    if (this._usuarioService.usuario.role === 'ADMIN_ROLE') {
      return true;
    } else {

      this._usuarioService.logout();
    }


    return true;
  }
}
