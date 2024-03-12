import { Component } from '@angular/core';
import { Reserva } from '../../models/reserva';
import { ActivatedRoute, Router } from '@angular/router';
import { DatosCompartidosService } from '../../services/datos-compartidos.service';
import { ReservaService } from '../../services/reserva.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-actualizacion-exitosa',
  templateUrl: './actualizacion-exitosa.component.html',
  styleUrl: './actualizacion-exitosa.component.css'
})
export class ActualizacionExitosaComponent {

  reserva: Reserva;//Para guardar los datos de la reserva
  cargando: boolean = true;//Para mostrar el spinner de carga

  constructor(
    private router: Router,
    private datosCompartidosService: DatosCompartidosService,
    private activatedRoute: ActivatedRoute,//Servicio para obtener la ruta activa
    private reservaService: ReservaService
  ){
    this.datosCompartidosService.esconderBuscador.next(true);
    this.datosCompartidosService.esconderFooter.next(true)
    this.reserva = new Reserva("","","","",new Date(),new Date(),0,[],[],[]);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async params => {
      let id = params['id'];
      await this.detallesReserva(id);
      this.cargando = false;
      this.datosCompartidosService.esconderFooter.next(false);
    });
  }

  //Método para obtener los detalles de la reserva
  async detallesReserva(id: string) {
    try {
      let response = await firstValueFrom(this.reservaService.detallesReserva(id));
      this.reserva = response;
      //console.log(this.reserva);
    } catch (error) {
      console.log(error);
    }
  }

  detalles(){
    this.router.navigate(['/detalles-reserva', this.reserva._id]);
  }

  inicio(){
    this.router.navigate(['/about-us']); 
  }

}
