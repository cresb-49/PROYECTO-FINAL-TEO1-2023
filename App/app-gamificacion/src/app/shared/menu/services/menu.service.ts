import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SesionService } from "src/app/services/sesion.service";

@Injectable({
    providedIn: 'root'
})
export class MenuService {

    readonly API_ENDPOINT = "http://localhost:5000/api/imgPerfil";

    constructor(private httpClient: HttpClient, private sesionService: SesionService) { }

    public getPic() {
        let username: string | null = this.sesionService.obtenerUsername();
        return this.httpClient.get(this.API_ENDPOINT + `?username=${username}`);
    }
}