import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SesionService } from 'src/app/services/sesion.service';

@Injectable({
  providedIn: 'root'
})
export class ProfesorGuard {
  
  constructor(private sesionService: SesionService) {
    
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.sesionService.verificarSesion()){
        if(this.sesionService.obtenerRol() == "2"){
          return true;
        }
      } 
        return false;
  }
  
}
