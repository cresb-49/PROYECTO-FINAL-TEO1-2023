import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SesionService } from '../services/sesion.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard {
  
  constructor(private sesionService: SesionService) {
    
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if(this.sesionService.verificarSesion()){
      if(this.sesionService.obtenerRol() == "1"){
        return true;
      }
    } 
      return false;
  }
  
}
